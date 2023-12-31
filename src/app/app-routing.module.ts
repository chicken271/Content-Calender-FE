import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  {path: '', redirectTo:'/user/login', pathMatch:'full'},
  {path:'admin', loadChildren: () => import("./admin/admin.module").then((m) => m.AdminModule)},
  {path: 'content', loadChildren: () => import("./content/content.module").then((m) => m.ContentModule)},
  { path:'**',component:NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
