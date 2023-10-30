import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';  
import { IContent } from '../model/content';

@Injectable({
  providedIn: 'root',
})
export class EventEmittertService{
  invokeComponentFunction = new EventEmitter();
  subsVar: Subscription = new Subscription();

  onComponentButtonClick(content: IContent){
    this.invokeComponentFunction.emit(content);
  }

}