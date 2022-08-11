import {Component, Inject, InjectionToken, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<any>) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoSignIn();
    }
  }
}
