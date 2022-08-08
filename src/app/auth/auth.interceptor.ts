import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import {exhaustMap, Observable} from 'rxjs';
import {map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";

import {AuthService} from "./auth.service";
import * as fromApp from "../store/app.reducer";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {
  }

  /**
   * take operator here is to tell that we wanna user once and then do unsubscribe automatically!
   *
   * take(1) --> this.store.select('auth').subscribe().unsubscribe();
   *
   * exhaustMap operator, once we have more than one the observable, and we need to return one at the end. lecture 302
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }

        const modifiedRequest = request.clone({params: new HttpParams().set('auth', user!.token)});

        return next.handle(modifiedRequest);
      })
    );
  }
}
