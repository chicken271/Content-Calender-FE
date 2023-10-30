import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentListComponent } from './content-list/content-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AddContentFormComponent } from './add-content-form/add-content-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { EventEmittertService } from './core/event.emitter.service';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ContentResultComponent } from './content-result/content-result.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentListComponent,
    NavbarComponent,
    AddContentFormComponent,
    HistoryComponent,
    ContentFilterComponent,
    NotfoundComponent,
    ContentDetailsComponent,
    ContentResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EventEmittertService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
