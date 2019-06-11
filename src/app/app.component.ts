import { Component ,OnInit,NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Best Stock';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCBP55lGa4P3bKU9eFhLmVOzIZaeA2X1x4",
    authDomain: "best-stock-32b04.firebaseapp.com",
    databaseURL: "https://best-stock-32b04.firebaseio.com"
    }
    );
  }
}
