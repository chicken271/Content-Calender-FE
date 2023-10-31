import { Component, Output, EventEmitter, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Type } from '../../model/type';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../core/data.service';
import { IContent } from '../../model/content';
import { convertToDateDisplayFormat, convertToDateSqlFormat } from '../../shared/convertDate';
import { EventService } from '../../core/event.service';
import { ContentListComponent } from '../content-list/content-list.component';
import { EventEmittertService } from '../../core/event.emitter.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'add-content-form',
  templateUrl: './add-content-form.component.html',
  styleUrls: ['./add-content-form.component.css']
})
export class AddContentFormComponent implements OnInit{
  currentDate = new Date();
  Date = convertToDateSqlFormat(this.currentDate);
  displayDate = convertToDateDisplayFormat(this.currentDate);

  constructor(private fb: FormBuilder, private dataService: DataService, private events: EventService, private eventEmitterService: EventEmittertService, private message: MessageService){}

  addContentForm = this.fb.group({
    contentTitleControl: ['',[Validators.required,Validators.minLength(3)]],
    contentUrlControl: ['',[Validators.required, Validators.minLength(10)]],
    contentDescriptionControl: ['',[Validators.required, Validators.minLength(10)]],
    contentTypeControl: ['',[Validators.required]],
    contentStatusControl: ['',[Validators.required]]
  });

  @Output()addContent= new EventEmitter<IContent>();
  @ViewChild(ContentListComponent) home:any;

  ngOnInit(): void {
      
  }

  submitForm(){
    const title = this.addContentForm.get(['contentTitleControl'])!.value;
    const typetype = this.addContentForm.get(['contentTypeControl'])!.value;
    const status = this.addContentForm.get(['contentStatusControl'])!.value;
    const url = this.addContentForm.get(['contentUrlControl'])!.value;
    const description = this.addContentForm.get(['contentDescriptionControl'])!.value;
    const addDate = convertToDateSqlFormat(this.currentDate);
    const newContent:IContent = {title:title,description: description,status: status, contentType: typetype, dateCreated: this.currentDate,dateUpdated: null,url:url}

    let contentListComponentClone = new ContentListComponent(this.dataService,this.message,this.events,this.eventEmitterService);

    contentListComponentClone.addContent(newContent);
    this.addContentForm.reset();
    this.addContentForm.get(['contentTypeControl'])!.setValue('');
    this.addContentForm.get(['contentStatusControl'])!.setValue('');
    this.displayMessage();
  }

  displayMessage(){
    let successMessage =document.querySelector('.js-add-content-message');
    successMessage!.innerHTML = 'New Content is added successfully !!';
    successMessage!.className='alert alert-success mt-3';
    setTimeout(()=>{
      successMessage!.innerHTML= '';
      successMessage!.className='js-add-content-message';
    },4000);
  }
}
