import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TournamentDetailComponent } from './pages/tournament-detail/tournament-detail.component';
import { TeamsListComponent } from './pages/teams-list/teams-list.component';
import { TeamsDetailComponent } from './pages/teams-detail/teams-detail.component';
import {AppRoles} from '../app.roles';
import {AppAuthGuard} from './guard/app.auth.guard';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { TournamentListComponent } from './pages/tournament-list/tournament-list.component';
import { FavoriteDetailComponent } from './pages/favorite-detail/favorite-detail.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';

const routes: Routes = [
/** route hier rein zb.
 * {path: 'employees', component: EmployeeListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Read]}},
 * einfacher   {path: 'car', component: CarListComponent}
*/
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'favorite-list', component: FavoriteListComponent, canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Read]}},
{path: 'favorite-detail', component: FavoriteDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Update]}},
{path: 'favorite-detail/:id', component: FavoriteDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
    data: {roles: [AppRoles.Update]}},
{path: 'tournament-list', component: TournamentListComponent, canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Read]}},
{path: 'tournament-detail', component: TournamentDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Update]}},
{path: 'tournament-detail/:id', component: TournamentDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
    data: {roles: [AppRoles.Update]}},
{path: 'teams-list', component: TeamsListComponent, canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Read]}},
{path: 'teams-detail', component: TeamsDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Update]}},
{path: 'teams-detail/:id', component: TeamsDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
    data: {roles: [AppRoles.Update]}},
{path: 'noaccess', component: NoAccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
