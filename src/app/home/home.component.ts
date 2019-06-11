import { Component, OnInit } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormControl,FormGroup, Validators,ReactiveFormsModule,FormBuilder } from '@angular/forms';
import {AuthService} from './auth.service';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService,NgxUiLoaderModule } from 'ngx-ui-loader';

export interface Designations {
  value: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hide = true;
  signupform : FormGroup;
  loginform : FormGroup;
  serverData: JSON;
  employeeData: JSON;
  errorLogin;
  errorSignup;
  swiper:any;

  selectedValue: string;

  desig: Designations[] = [
    {value: 'Student'},
    {value: 'Business'},
    {value: 'Govt. Servant'},
    {value: 'Others'}
  ];


//  mailId = new FormControl('', [Validators.email,Validators.required]);
//  passwd1 = new FormControl('', Validators.required);
  //passwd2 = new FormControl('',Validators.required);
  //uniregno = new FormControl('',Validators.required);
  //adno = new FormControl('',Validators.required);
  //uname = new FormControl('',Validators.required);
  //emailLogin = new FormControl('',Validators.required);
  //passwdLogin = new FormControl('',Validators.required);

  constructor(private _formBuilder: FormBuilder,private authService:AuthService,private httpClient: HttpClient, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit() {

      this.authService.ErrorLogin.subscribe(message => this.errorLogin = message);
      this.authService.ErrorSignup.subscribe(message => this.errorSignup = message);

      this.signupform = this._formBuilder.group({
        mailId: ['',[Validators.email,Validators.required]],
        passwd1:['',[Validators.required,Validators.minLength(6)]],
        uname:['',Validators.required],
        des:['',Validators.required]
      });

      this.loginform = this._formBuilder.group({
        emailLogin:['',[Validators.email,Validators.required]],
        passwdLogin:['',[Validators.required,Validators.minLength(6)]]
      });

    
  }
  onSignup(){

      this.ngxLoader.start();
      this.authService.signupUser(this.signupform.value.uname,this.signupform.value.des, this.signupform.value.mailId, this.signupform.value.passwd1);
      this.ngxLoader.stop();
  }
  onSignin(){
    this.ngxLoader.start();
    this.authService.signinUser(this.loginform.value.emailLogin,this.loginform.value.passwdLogin);
    this.ngxLoader.stop();
  }



  /*sayHi() {
    this.httpClient.get('http://127.0.0.1:5002/test').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }*/
}
