import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { IContent } from '../model/content';
import { Status } from '../model/status';
import { Type } from '../model/type';
import { ActivatedRoute } from '@angular/router';
import { convertToDateDisplayFormat, convertToDateHistoryFormat } from '../shared/convertDate';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css']
})
export class ContentDetailsComponent implements OnInit {
  currentContent:IContent = {title:'',description:'',status:Status.COMPLETED,contentType:Type.ARTICLE,dateCreated:new Date,url:''};

  currentDate = new Date;
  displayDateCreated = '';
  displayDate = convertToDateDisplayFormat(this.currentDate);

  constructor(private dataService: DataService,private route: ActivatedRoute, private fb: FormBuilder, private location: Location){}

  getContent(){
    const contentID = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getContentByID(contentID).subscribe(content => this.currentContent = content);
  }

  ngOnInit(): void {
    this.getContent();
    this.displayDateCreated = convertToDateHistoryFormat(this.currentContent.dateCreated);
  }

  updateContentForm= this.fb.group({
    contentTitleControl: ['',[Validators.required,Validators.minLength(3)]],
    contentUrlControl: ['',[Validators.required, Validators.minLength(10)]],
    contentDescriptionControl: ['',[Validators.required, Validators.minLength(10)]],
    contentTypeControl: ['',[Validators.required]],
    contentStatusControl: ['',[Validators.required]]
  });

  goBack(){
    this.location.back();
  }

  submitUpdateForm(){
    if(this.currentContent){
      this.currentContent.dateUpdated = new Date();
      this.dataService.updateContent(this.currentContent).subscribe(()=>{this.goBack()});
    }
  }

}
