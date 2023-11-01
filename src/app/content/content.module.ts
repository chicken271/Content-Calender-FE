import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentListComponent } from './content-list/content-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';
import { ContentResultComponent } from './content-result/content-result.component';
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { NotfoundComponent } from '../notfound/notfound.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [
    ContentListComponent,
    NavbarComponent,
    HistoryComponent,
    ContentResultComponent,
    ContentFilterComponent,
    ContentDetailsComponent,
    AddContentFormComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ContentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  exports:[
    ContentListComponent,
    NavbarComponent,
    HistoryComponent,
    ContentResultComponent,
    ContentFilterComponent,
    ContentDetailsComponent,
    AddContentFormComponent,
    NotfoundComponent
  ]
})
export class ContentModule { }
