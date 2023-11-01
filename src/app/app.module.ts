import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventEmittertService } from './core/event.emitter.service';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContentModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [EventEmittertService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
