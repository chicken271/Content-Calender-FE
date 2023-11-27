import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList:IUser[]= [];

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((list:any)=> this.userList = list);
  }
}
