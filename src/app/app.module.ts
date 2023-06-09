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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TeamsDetailComponent } from './pages/teams-detail/teams-detail.component';
import { TeamsListComponent } from './pages/teams-list/teams-list.component';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { TournamentDetailComponent } from './pages/tournament-detail/tournament-detail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IsInRoleDirective } from './dir/is.in.role.dir';
import { IsInRolesDirective } from './dir/is.in.roles.dir';
import { MatInputModule } from '@angular/material/input';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';
import { FavoriteDetailComponent } from './pages/favorite-detail/favorite-detail.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/ILV',
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'Ko_system',
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
    DashboardComponent,
    NoAccessComponent,
    TeamsDetailComponent,
    TeamsListComponent,
    TournamentListComponent,
    TournamentDetailComponent,
    ConfirmDialogComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    FavoriteDetailComponent,
    FavoriteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
