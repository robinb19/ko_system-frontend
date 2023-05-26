import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
/** route hier rein zb.
 * {path: 'employees', component: EmployeeListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Read]}},
 * einfacher   {path: 'car', component: CarListComponent}
*/
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
