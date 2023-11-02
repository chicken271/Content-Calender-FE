import { Component, OnInit } from '@angular/core';
import { IContent } from './model/content';
import { DataService } from './core/data.service';
import { MessageService } from './core/message.service';
import { EventService } from './core/event.service';
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations/slideInAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {

  checkRoute = '/historyLogs'

  constructor(private contexts: ChildrenOutletContexts) { }

  ngOnInit(): void {}

  getRouteAnimationData(){
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}