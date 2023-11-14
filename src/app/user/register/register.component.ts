import { SelectorMatcher } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  termsOfService(){
    alert("There is no Terms of Service !!");
  }

  registerUserForm:FormGroup = {} as FormGroup;
  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      usernameControl:['',[Validators.required, Validators.minLength(3)]],
      emailControl:['',[Validators.required, Validators.email], this.uniqueEmail.bind(this)],
      passwordControl:['',[Validators.required, Validators.minLength(3)]],
      confirmPasswordControl:['',[Validators.required]],
      checkTosControl: [false,[Validators.requiredTrue]]
    },{
      validator: this.matchPassword
    });

  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){}

  matchPassword(ac: AbstractControl){
    let password = ac.get('passwordControl')?.value;
    let cPassword = ac.get('confirmPasswordControl')?.value;
    return password === cPassword ? null : {'notMatched': true}; 
  }

  uniqueEmail(ac: AbstractControl){
    let uemail = ac.value;
    return this.userService.getUserByEmail(uemail).pipe(
      map((usedEmail)=>(usedEmail)? {usedEmail: true} : null),
      catchError(()=> of(null))
    );
  }

  redirectTo(uri: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(()=> {
      this.router.navigate([uri]);
    });
  }

  submitForm(){
    const username = this.registerUserForm.get(['usernameControl'])!.value;
    const email = this.registerUserForm.get(['emailControl'])!.value;
    const password = this.registerUserForm.get(['passwordControl'])!.value;
    const role = "USER"
    const newUser:IUser = {username:username,email:email,password:password,role:role};
    this.userService.registerUser(newUser).subscribe();
    this.registerUserForm.reset();
    this.redirectTo("user/login");
  }
}
