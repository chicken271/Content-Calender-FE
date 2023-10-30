import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './content-list/content-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { HistoryComponent } from './history/history.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentResultComponent } from './content-result/content-result.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home', component:ContentListComponent},
  {path:'addContent',component: AddContentFormComponent},
  {path:'contentDetails/:id',component:ContentDetailsComponent},
  {path:'search/:searchValue', component:ContentResultComponent},
  {path:'historyLogs',component:HistoryComponent},
  {path:'**', component: NotfoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
