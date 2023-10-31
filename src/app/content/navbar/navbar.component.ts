import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../core/event.service';
import { DataService } from '../../core/data.service';
import { IContent } from '../../model/content';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { ContentListComponent } from '../content-list/content-list.component';
import { MessageService } from '../../core/message.service';
import { EventEmittertService } from '../../core/event.emitter.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  temp = '';
  searchResult: IContent[] = [];

  constructor(private events: EventService, private dataService: DataService, private router: Router,private message: MessageService, private eventEmitterService: EventEmittertService) { }
  
  @ViewChild('customSearch', { static: true }) customSearchElement: ElementRef = {} as ElementRef;

  searchContent(event: any) {
    this.temp = event.value;
    this.redirectTo(`content/search/${this.temp}`);
    this.customSearchElement.nativeElement.value = '';
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=> {
      this.router.navigate([uri]);
    });
  }

}