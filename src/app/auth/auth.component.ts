import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "./auth.service";
import {SignInResponse, SignUpResponse} from "./auth.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authService.signIn(email, password).subscribe({
        next: (response: SignInResponse) => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error: (error: string) => {
          this.error = error;
          this.isLoading = false;
        }
      })
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (response: SignUpResponse) => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error: (error: string) => {
          this.isLoading = false;
          this.error = error;
        }
      })
    }

    form.reset();
  }
}
