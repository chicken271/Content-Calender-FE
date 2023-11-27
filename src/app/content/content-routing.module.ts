import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ContentListComponent } from './content-list/content-list.component';
import { HistoryComponent } from './history/history.component';
import { ContentResultComponent } from './content-result/content-result.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { exitAddContentGuard, exitEditContentGuard, isLoginGuard } from '../core/guards';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ContentListComponent , data: {animation: 'contentPage'} },
      { path: 'add', component: AddContentFormComponent , data: {animation: 'addContentPage'} , canActivate: [isLoginGuard], canDeactivate:[exitAddContentGuard] },
      { path: 'details/:id', component: ContentDetailsComponent , data: {animation: 'contentDetailsPage'}  ,canActivate:[isLoginGuard], canDeactivate:[exitEditContentGuard] },
      { path: 'search/:searchValue', component: ContentResultComponent , data: {animation: 'searchContentPage'}, canActivate:[isLoginGuard] },
      { path: 'history', component: HistoryComponent, data: {animation: 'historyPage'}, canActivate:[isLoginGuard] },
      { path: '**', component: NotfoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }