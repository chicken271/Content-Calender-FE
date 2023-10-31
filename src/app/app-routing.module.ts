import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './content-list/content-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { HistoryComponent } from './history/history.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentResultComponent } from './content-result/content-result.component';

const routes: Routes = [
  // {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'home', component:ContentListComponent},
  // {path:'addContent',component: AddContentFormComponent},
  // {path:'contentDetails/:id',component:ContentDetailsComponent},
  // {path:'search/:searchValue', component:ContentResultComponent},
  // {path:'historyLogs',component:HistoryComponent},
  // {path:'**', component: NotfoundComponent},
  {path: '', redirectTo:'/content', pathMatch:'full'},
  {
    path: 'content',
    children: [
      { path: '', component: ContentListComponent },
      { path: 'add', component:AddContentFormComponent },
      { path: 'details/:id', component: ContentDetailsComponent},
      { path: 'search/:searchValue', component:ContentResultComponent},
      { path: 'history', component: HistoryComponent },
      { path: '**',component: NotfoundComponent}
    ]
  },
  { path:'**',component:NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
