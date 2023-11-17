import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/storage.service';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService, private tokenStorageService: TokenStorageService, private router: Router, private route: ActivatedRoute) { }

  loginForm = this.fb.group({
    loginUsernameControl: ['', [Validators.required]],
    loginPasswordControl: ['', [Validators.required]]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  message='';

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.userService.getUserByUsernameAndPassword(this.tokenStorageService.getUser().username,this.tokenStorageService.getUser().password).subscribe(userInfo => {
        this.tokenStorageService.saveUser(userInfo);
      });
      this.router.navigateByUrl('/content');
    }

    this.route.queryParams.subscribe(params => {
      if(params['isLogin'] !== undefined && params['isLogin'] !== 'true') this.message = 'You are logged out !!'
    })
 
  }

  submitForm() {
    const username = this.loginForm.get(['loginUsernameControl'])!.value;
    const password = this.loginForm.get(['loginPasswordControl'])!.value;
    const loginInfo = { username: username, password: password };
    this.userService.loginUser(loginInfo).subscribe(token => {
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
