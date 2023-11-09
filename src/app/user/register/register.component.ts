import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  termsOfService(){
    alert("There is no Terms of Service !!");
  }

  constructor(private fb: FormBuilder){}

  registerUserForm = this.fb.group({
    usernameControl:['',[Validators.required, Validators.minLength(3)]],
    emailControl:['',[Validators.required, Validators.email]],
    passwordControl:['',[Validators.required, Validators.minLength(3)]],
    confirmPasswordControl:['',[Validators.required]],
    checkTosControl: [false,[Validators.requiredTrue]]
  },{
    validator: this.matchPassword
  });

  matchPassword(ac: AbstractControl){
    let password = ac.get('passwordControl')?.value;
    let cPassword = ac.get('confirmPasswordControl')?.value;
    console.log(password);
    console.log(cPassword);
    if(password !== cPassword){
      return { notMatch: password };
    }else return null;
  }

  submitForm(){
    const username = this.registerUserForm.get(['usernameControl'])!.value;
    const email = this.registerUserForm.get(['emailControl'])!.value;
    const password = this.registerUserForm.get(['passwordControl'])!.value;
    const role = "USER"

    const newUser:IUser = {name:username,email:email,password:password,role:role};
  }
}
