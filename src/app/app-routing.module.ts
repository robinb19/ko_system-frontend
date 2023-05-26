import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FavoriteTeamDetailComponent } from './pages/favorite-team-detail/favorite-team-detail.component';
import { TournamentDetailComponent } from './pages/tournament-detail/tournament-detail.component';
import { MemberDetailComponent } from './pages/member-detail/member-detail.component';
import { TeamsDetailComponent } from './pages/teams-detail/teams-detail.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';

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
{path: 'teams', component: TeamsDetailComponent},
{path: 'noaccess', component: NoAccessComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
