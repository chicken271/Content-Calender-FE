import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ContentListComponent } from './content-list/content-list.component';
import { HistoryComponent } from './history/history.component';
import { ContentResultComponent } from './content-result/content-result.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { NotfoundComponent } from '../notfound/notfound.component';

const routes: Routes = [
  {
    path: 'content',
    children: [
      { path: '', component: ContentListComponent, data: {animation: 'contentPage'} },
      { path: 'add', component: AddContentFormComponent, data: {animation: 'addContentPage'} },
      { path: 'details/:id', component: ContentDetailsComponent, data: {animation: 'contentDetailsPage'} },
      { path: 'search/:searchValue', component: ContentResultComponent, data: {animation: 'searchContentPage'} },
      { path: 'history', component: HistoryComponent, data: {animation: 'historyPage'} },
      { path: '**', component: NotfoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }