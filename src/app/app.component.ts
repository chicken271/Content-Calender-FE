import { Component, OnInit } from '@angular/core';
import { IContent } from './model/content';
import { DataService } from './core/data.service';
import { MessageService } from './core/message.service';
import { EventService } from './core/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayHistory = false;

  checkRoute = '/historyLogs'

  constructor(private dataService: DataService, public messageService: MessageService, private events: EventService, public router: Router) { }

  ngOnInit(): void {}

  toggleHistory() {
    this.displayHistory = !this.displayHistory;
  }

}