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
  title = 'content-calender';

  displayHistory = false;

  contentData: IContent[] = [];
  filteredContent: IContent[] = [];

  typeFilter: any = [];
  statusFilter: any = [];
  test = 'version3'

  searchValue = '';
  checkRoute = '/historyLogs'

  constructor(private dataService: DataService, public messageService: MessageService, private events: EventService, public router: Router) { }

  ngOnInit(): void {
    this.dataService.getContent().subscribe(list => this.contentData = list);

    this.events.listen('typeFilter', (value: any) => {
      this.typeFilter = value;
    });

    this.events.listen('statusFilter', (value: any) => {
      this.statusFilter = value;
    });

  }

  toggleHistory() {
    this.displayHistory = !this.displayHistory;
  }

  getSearchValue(value: string) {
    this.searchValue = value;
  }

  addNewContent(content: IContent) {
    this.dataService.addContent(content).subscribe(value => this.filteredContent.push(value));
    this.contentData.push(content);
  }

  deleteContent(content:IContent){
    this.contentData = this.contentData.filter(c => c!==content);
    this.dataService.deleteContent(content.id).subscribe();
  } 
}