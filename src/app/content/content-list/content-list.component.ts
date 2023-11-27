import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContent } from '../../model/content';
import { DataService } from '../../core/data.service';
import { MessageService } from '../../core/message.service';
import { EventService } from '../../core/event.service';
import { Status } from '../../model/status';
import { Type } from '../../model/type';
import { fadeAnimation } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class ContentListComponent implements OnInit {
  @Input()contentList: IContent[] = [];
  filteredContent: IContent[] = [];

  typeFilter: any = [];
  statusFilter: any = [];
  titleFilter='';
  searchValue = '';
  searchResult: IContent[] = [];

  displayHistory = false;

  newContent:IContent = {title:'',description:'',status: Status.COMPLETED, contentType: Type.ARTICLE,url: '', dateCreated:new Date};

  constructor(private dataService: DataService,public messageService: MessageService,private events: EventService){}

  pages: Array<Number> = [];
  pageNumber: number = 0;

  ngOnInit(): void {
    // this.dataService.getContent().subscribe(list => this.contentList = list);

    this.getContents();

    this.events.listen('typeFilter', (value: any) => {
      this.typeFilter = value;
    });

    this.events.listen('statusFilter', (value: any) => {
      this.statusFilter = value;
    });

    this.events.listen('titleFilter', (value:any)=>{
      this.titleFilter = value;
    });

  }

  minusPage(event:any){
    event.preventDefault();
    this.pageNumber--;
    this.getContents();
  }

  plusPage(event:any){
    event.preventDefault();
    this.pageNumber++;
    this.getContents();
  }

  getContents(){
    this.dataService.getContentByPage(this.pageNumber).subscribe((list:any) => {
      this.contentList = list['content'];
      this.pages = new Array(list['totalPages']);
    });
  }

  setPage(pageNumber:number, event:any){
    event.preventDefault();
    this.pageNumber = pageNumber;
    this.getContents();
  }

  getSearchValue(){
    this.events.listen('searchValue', (value: any) => {
      this.searchValue = value;
    });
  }

  getSearchResult(){
    this.events.listen('searchResult', (value: any) =>{
      this.searchResult = value;
    });
  }

  getNewContent(){
    this.events.listen('newContent', (value: any) => {
      this.newContent = value;
    })
  }

  public filterData(): IContent[] {
    let filteredContent = this.contentList;

    if (this.titleFilter.length!==0) {
      filteredContent = filteredContent.filter(x =>{
        return x.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      })
    }

    if (this.typeFilter.length > 0) {
      filteredContent = filteredContent.filter(x => {
        const t = this.typeFilter.find((v: any) => v.name === x.contentType);
        return t != null;
      })
    }

    if (this.statusFilter.length > 0) {
      filteredContent = filteredContent.filter(x => {
        const t = this.statusFilter.find((v: any) => v.name === x.status);
        return t != null;
      })
    }
    return filteredContent;
  }

  addContent(content: IContent){
    this.dataService.addContent(content).subscribe(value => {this.contentList.push(value)});
  }

  deleteContent(content: IContent){
    if(confirm(`Are you sure you want to delete Content with ID: ${content.id} and Title: ${content.title}`)){
      this.contentList = this.contentList.filter(c => c!==content);
      this.dataService.deleteContent(content.id).subscribe();
    }else this.messageService.add(`Cancel deletion of content with ID ${content.id} and Title ${content.title}`);
    
  }

  trackByContentId(index:number,content:any){
    return content.id;
  }

  toggleHistory() {
    this.displayHistory = !this.displayHistory;
  }
}
