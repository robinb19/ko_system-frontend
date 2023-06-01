import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FavoriteTeamDetailComponent } from './pages/favorite-team-detail/favorite-team-detail.component';
import { TournamentDetailComponent } from './pages/tournament-detail/tournament-detail.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { TeamsListComponent } from './pages/teams-list/teams-list.component';
import { TeamsDetailComponent } from './pages/teams-detail/teams-detail.component';
import {AppRoles} from '../app.roles';
import {AppAuthGuard} from './guard/app.auth.guard';

const routes: Routes = [
/** route hier rein zb.
 * {path: 'employees', component: EmployeeListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Read]}},
 * einfacher   {path: 'car', component: CarListComponent}
*/
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'favorite-team', component: FavoriteTeamDetailComponent},
{path: 'tournament', component: TournamentDetailComponent},
{path: 'member', component: MemberDetailComponent},
{path: 'teams-list', component: TeamsListComponent, canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Read]}},
{path: 'teams-detail', component: TeamsDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
data: {roles: [AppRoles.Update]}},
{path: 'teams-detail/:id', component: TeamsDetailComponent, pathMatch: 'full', canActivate: [AppAuthGuard],
    data: {roles: [AppRoles.Update]}},
/*{path: 'noaccess', component: NoAccessComponent},*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
