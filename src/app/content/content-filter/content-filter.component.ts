import { Component} from '@angular/core';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.css']
})
export class ContentFilterComponent{

  typeFilter: any = [];
  statusFilter: any = [];
  filterValue='';
  
  constructor(private events: EventService){}

  contentTypes: any = [
    { id: 1, name: 'VIDEO', checked: false },
    { id: 2, name: 'ARTICLE', checked: false },
    { id: 3, name: 'COURSE', checked: false },
    { id: 4, name: 'MEETING', checked: false }
  ]

  contentStatuses: any = [
    { id: 1, name: 'IDEA', checked: false },
    { id: 2, name: 'IN-PROGRESS', checked: false },
    { id: 3, name: 'COMPLETED', checked: false },
    { id: 4, name: 'PUBLISHED', checked: false },
  ]

  filteredContent(value:any){
    this.events.emit('filteredContent',value);
  }

  changeContentTitle(){
    this.events.emit('titleFilter',this.filterValue);
  }

  changeContentType($event: any, type: any) {
    const checked = $event.target.checked;
    if (checked) {
      this.typeFilter = [...this.typeFilter, { ...type }];
    } else {
      this.typeFilter = [...this.typeFilter.filter((x:any) => x.id !== type.id)];
    }
    this.events.emit('typeFilter',this.typeFilter);
  }

  changeContentStatus($event: any, status: any) {
    const checked = $event.target.checked;
    if(checked){
      this.statusFilter = [...this.statusFilter, { ...status }];
    }else{
      this.statusFilter = [...this.statusFilter.filter((x:any) => x.id !== status.id)];
    }
    this.events.emit('statusFilter',this.statusFilter);
  }
}
