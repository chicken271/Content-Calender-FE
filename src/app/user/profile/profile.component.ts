import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/core/storage.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public tokenStorageService: TokenStorageService){}
}
