import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../core/event.service';
import { DataService } from '../../core/data.service';
import { IContent } from '../../model/content';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { MessageService } from '../../core/message.service';
import { TokenStorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  temp = '';
  searchResult: IContent[] = [];

  constructor(private events: EventService, private dataService: DataService, private router: Router,private message: MessageService, public tokenStorageService: TokenStorageService) { }
  
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

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
