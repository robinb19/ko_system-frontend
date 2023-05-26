import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
/** route hier rein zb.
 * {path: 'employees', component: EmployeeListComponent, canActivate: [AppAuthGuard], data: {roles: [AppRoles.Read]}},
 * einfacher   {path: 'car', component: CarListComponent}
*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
