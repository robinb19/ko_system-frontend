import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment.development';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpXSRFInterceptor } from './interceptor/http.csrf.interceptor';
import { AppAuthGuard } from './guard/app.auth.guard';
import { AppAuthService } from './service/app.auth.service';
import {MatIconModule} from '@angular/material/icon';
import { AppLoginComponent } from './components/app-login/app-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'demoapp',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    OAuthModule.forRoot({resourceServer: {sendAccessToken: true}}),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
  ],
  providers: [{provide: AuthConfig, useValue: authConfig},
    {provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true},
    {
      provide: OAuthStorage, useFactory: storageFactory
    },
    AppAuthGuard,
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AppAuthService) {
    authService.initAuth().finally();
  }
}
