import { Injectable} from '@angular/core';
import { convertToDateHistoryFormat } from '../shared/convertDate';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  historyLogs: string[]=['a','b','c','d','e','f','g'];
  currentDate: Date= new Date;

  add(line: string, operation?: string){
    this.historyLogs.push(`${convertToDateHistoryFormat(this.currentDate)} | ${operation} : ${line}`);
  }

  clear(){
    this.historyLogs = [];
  }
}