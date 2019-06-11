import * as firebase from 'firebase';
import {Http} from '@angular/http';
import {Injectable } from '@angular/core';

@Injectable()
export class DataFetchService{
 userData:JSON;
  public fireAuth:firebase.auth.Auth;
 public userProfileRef:firebase.database.Reference;

 constructor(public http: Http ) {
   this.fireAuth = firebase.auth();
   this.userProfileRef = firebase.database().ref('/userProfile'); //linked to firebase node userProfile

 }
    getUserData() : any {
      this.userProfileRef.child(this.fireAuth.currentUser.uid).on('value',snapshot=>{
        this.userData = snapshot.val();
      });
      return this.userData;
}

}
