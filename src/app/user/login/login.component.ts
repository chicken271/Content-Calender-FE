import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/storage.service';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router) { }

  loginForm = this.fb.group({
    loginUsernameControl: ['', [Validators.required]],
    loginPasswordControl: ['', [Validators.required]]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngOnInit(): void {
    console.log(this.tokenStorageService.getToken());
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.router.navigateByUrl('/content');
    }
  }

  submitForm() {
    const username = this.loginForm.get(['loginUsernameControl'])!.value;
    const password = this.loginForm.get(['loginPasswordControl'])!.value;
    const loginInfo = { username: username, password: password };
    const userLogin: IUser = { username: username, email: '', password: password, role: '' };
    this.userService.loginUser(loginInfo).subscribe(token => {
      console.log('Token:', token);
      // this.tokenStorageService.saveToken(token);
      if(token !== undefined){
        this.tokenStorageService.saveToken(token);
        this.tokenStorageService.saveUser(loginInfo);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        window.location.reload();
      }else this.isLoginFailed = true;
    });
  }
}
