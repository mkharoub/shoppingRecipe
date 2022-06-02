import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

import {SignInResponse, SignUpResponse} from "./auth.model";
import {ConstantsService} from "../shared/constants.service";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpEndPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private signInEndPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private firebaseApiKey = 'AIzaSyDgzeg1PeemoCx8bITmYYx1xv6aTwHEaY0';
  private autoLogoutTimerId: any = null;

  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private constantsService: ConstantsService,
    private router: Router) {
  }

  signIn(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    const options = {
      params: {
        key: this.firebaseApiKey
      }
    }

    return this.http.post<SignInResponse>(this.signInEndPoint, body, options).pipe(
      catchError(this.handleError.bind(this)),
      tap(response => this.handleAuthUser(response.email, response.localId, response.idToken, response.expiresIn))
    );
  }

  signUp(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    };

    const options = {
      params: {
        key: this.firebaseApiKey
      }
    };

    return this.http.post<SignUpResponse>(this.signUpEndPoint, body, options).pipe(
      catchError(this.handleError.bind(this)),
      tap(response => this.handleAuthUser(response.email, response.localId, response.idToken, response.expiresIn))
    );
  }

  autoSignIn() {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const tokenExpirationDate = new Date(parsedUserData._tokenExpirationDate);
    const user = new User(
      parsedUserData.email,
      parsedUserData.localId,
      parsedUserData._token,
      tokenExpirationDate
    );

    if (user.token) {
      this.user.next(user);

      const expirationDuration = tokenExpirationDate.getTime() - new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');

    if (this.autoLogoutTimerId) {
      clearTimeout(this.autoLogoutTimerId);

      this.autoLogoutTimerId = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.autoLogoutTimerId = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: any) {
    return throwError(() => {
      return new Error(this.constantsService.getErrorMessage(errorRes?.error?.error?.message));
    });
  }

  private handleAuthUser(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);

    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }
}
