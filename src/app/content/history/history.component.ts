import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent{
  constructor(public messageService: MessageService,public router: Router){}
}
