import { Component, OnInit } from '@angular/core';
import { IContent } from '../../model/content';
import { DataService } from '../../core/data.service';
import { MessageService } from '../../core/message.service';
import { EventService } from '../../core/event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-result',
  templateUrl: './content-result.component.html',
  styleUrls: ['./content-result.component.css']
})
export class ContentResultComponent implements OnInit {
  contentResult:IContent[] = [];

  searchValue = '';

  typeFilter:any = [];
  statusFilter:any= [];
  titleFilter=''

  constructor(private dataService: DataService,private messageService: MessageService,private events: EventService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.searchValue = String(this.route.snapshot.paramMap.get('searchValue'));
    if(this.searchValue.length!==0){
      this.dataService.searchContent(this.searchValue).subscribe(list => this.contentResult = list);
    }

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

  filterResult():IContent[]{
    let filterResult:IContent[] = this.contentResult;

    if (this.titleFilter.length!==0) {
      filterResult = filterResult.filter(x =>{
        return x.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      })
    }

    if (this.typeFilter.length > 0) {
      filterResult = filterResult.filter(x => {
        const t = this.typeFilter.find((v: any) => v.name === x.contentType);
        return t != null;
      })
    }

    if (this.statusFilter.length > 0) {
      filterResult = filterResult.filter(x => {
        const t = this.statusFilter.find((v: any) => v.name === x.status);
        return t != null;
      })
    }

    return filterResult;
  }

  deleteContent(content: IContent){
    if(confirm(`Are you sure you want to delete Content with ID: ${content.id} and Title: ${content.title}`)){
      this.contentResult = this.contentResult.filter(c => c!==content);
      this.dataService.deleteContent(content.id).subscribe();
    }else this.messageService.add(`Cancel deletion of content with ID ${content.id} and Title ${content.title}`);
  }
  
  trackByContentId(index:number,content:any){
    return content.id;
  }
}
