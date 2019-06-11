import * as firebase from 'firebase';
import {Http} from '@angular/http';
import {Injectable,Component,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService{

  AnalyKey:string;
  token: string;
  test: string;
  userData:JSON;
  gradeData:any;
  private gotResult = new BehaviorSubject('ok');
  ResultRcvd=this.gotResult.asObservable();
  private gpaStudent = new BehaviorSubject('ok');
  GpaofStudent=this.gpaStudent.asObservable();
  private errorDatalogin = new BehaviorSubject('ok');
  ErrorLogin=this.errorDatalogin.asObservable();
  private errorDataSignup = new BehaviorSubject('ok');
  ErrorSignup=this.errorDataSignup.asObservable();
  private lsitOfstudents = new BehaviorSubject('ok');
  resultObject=this.lsitOfstudents.asObservable();
  private gpadata = new BehaviorSubject('ok');
  studentsByGpa=this.gpadata.asObservable();
  private errorData = new BehaviorSubject('ok');
  Error=this.errorData.asObservable();
  private messageSource = new BehaviorSubject('nouploads');
  fileData = this.messageSource.asObservable();
  public fireAuth:firebase.auth.Auth;
 public userProfileRef:firebase.database.Reference;
 public gradeRef:firebase.database.Reference;
 public gpaRef:firebase.database.Reference;
 constructor(public http: Http, private router : Router ,private ngzone:NgZone) {
   this.fireAuth = firebase.auth();
   this.userProfileRef = firebase.database().ref('/users'); //linked to firebase node userProfile
   //this.gradeRef= firebase.database().ref('/Grades');
   //this.gpaRef=firebase.database().ref('/StudentGPA2015-2019');
   console.log('firebasel= link ok');
 }
  signupUser(name: string,desig:string,email: string, password: string ): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then( newUser => {
      this.userProfileRef.child(this.fireAuth.currentUser.uid).set({
        name: name,
        designation:desig,
        email:email,
        preference:{
           0:false,
           1:false,
           2:false,
           3:false,
           4:false
        },
      });
      this.errorDataSignup.next('success');
    })
    .catch(
        error => this.errorDataSignup.next(error)


      );
  }

  signupUserFaculty(name: string,facid:string,desig:string,email: string, password: string ): Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then( newUser => {
      this.userProfileRef.child(this.fireAuth.currentUser.uid).set({
        name: name,
        facid:facid,
        email:email,
        designation:desig,
        facultyData:"",
        usertype:'faculty'
      });
      this.errorData.next('success');
    })
    .catch(
        error => this.errorData.next(error)


      );


  }
  signinUser(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {

         /* this.userProfileRef.child(this.fireAuth.currentUser.uid).on('value', dataSnapshot => {

            this.userData = dataSnapshot.val();
            if (this.userData['regno']){
            this.gpaRef.child(this.userData['regno']).on('value', dataSnapshot3 => {

              this.gpaStudent.next(dataSnapshot3.val());



    });}


  });*/


        firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )

            this.errorDatalogin.next('success');



          this.userProfileRef.child(this.fireAuth.currentUser.uid).on('value', dataSnapshot => {

            this.userData = dataSnapshot.val();
            console.log(this.userData);
            this.router.navigate(['/dashboard/homepage']);


  });  //console.log(this.userProfileRef.child(firebase.auth().currentUser.uid));



          
        }
      )
      .catch(
        error => this.errorDatalogin.next(error)
              );

  }

  insert(gender:string,mobnum:string,age:number,adrs:string,fath_occup:string,moth_occup:string,
  daysch_host:string,backlogs:number,batch:string,sem:string){
    this.userProfileRef.child(this.fireAuth.currentUser.uid).update({
      gender:gender,
      mob:mobnum,
      age:age,
      address:adrs,
      foccup:fath_occup,
      moccup:moth_occup,
      dayhos:daysch_host,
      backlogs:backlogs,
      batch:batch,
      sem:sem
    },function(error){
      if(error) console.log(error);
      else console.log('success');
    });
  }
  updatePref(pref:any){
    this.userProfileRef.child(this.fireAuth.currentUser.uid).update({
      preference:pref
    },function(error){
      if(error) console.log(error);
      else console.log('success update pref');
    });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  isAuthenticated() {
   return (this.token != null);
 }

 isFaculty() {
  return (this.token != null&&this.test==null);
 }

 TestTaken() {
   return this.test == 'taken' ;
 }

 getUserData(){
   return this.userData;
 }
 updateAnaly(ana:string){
   this.userProfileRef.child(this.fireAuth.currentUser.uid).child('analysis').update({s6_1:{
     res:{
       compiler:ana
     },
     series:'first',
     sem:'s6'
   }
 },function(error){
     if(error) console.log(error);
     else console.log('success ana update');
   });
 }

 updateAnaly2(ana:string,series:string,subname:string){
   let path:String=this.userData['sem']+'_'+series;
   this.userProfileRef.child(this.fireAuth.currentUser.uid).child('analysis').update({
     [path+"/res/"+subname]:ana,
     [path+"/series"]:series,
     [path+"/sem"]:this.userData['sem']
   },function(error){
     if(error) console.log(error);
     else console.log('success ana update');
   });
 }

FileData:any;
 filedata(data:any){
   this.messageSource.next(data);
   this.FileData=data;
 }

 fetchGrades(unino:string){
      this.gradeRef.child('s4-2015-2019').child(unino).on('value', dataSnapshot => {
        this.gradeData = dataSnapshot.val();
      });
 }
 getGrades(){
   return this.gradeData;
 }
 updateIntrExperFirbase(key:string,value:string){
   this.userProfileRef.child(this.fireAuth.currentUser.uid).update(
     {
       [key]:value
     },function(error){
       if(error) console.log(error);
       else console.log('success intrest/expertise update');
     });

 }
 updateIntrExperFirbase2(intre:string,expert:string){
   this.userProfileRef.child(this.fireAuth.currentUser.uid).update(
     {
       'intrests':intre,
       'expertise':expert
     },function(error){
       if(error) console.log(error);
       else console.log('success intrest&expertise update');
     });
     this.refreshAll();
 }
 refreshAll(){
   this.userProfileRef.child(this.fireAuth.currentUser.uid).on('value', dataSnapshot => {

     this.userData = dataSnapshot.val();

   });
 }
intermediate:any;
res:any[]=[];
 projectGroupByGPA(gpa:number,intrest:string,expertise:string){
        this.res=[];
      this.gpaRef.orderByChild('overall').startAt(gpa).on('value',dataSnapshot=>{
            this.gpadata.next(dataSnapshot.val());
            if(dataSnapshot.val()==null) this.lsitOfstudents.next('null');
            else{
                  let regnos=Object.keys(dataSnapshot.val());
                  this.userProfileRef.orderByChild('expertise').equalTo(expertise).on('value',dataSnapshot2=>{
                  this.intermediate=dataSnapshot2.val();
                  if(dataSnapshot2.val()==null)  this.lsitOfstudents.next('null');
                  else{
                    let keys=Object.keys(this.intermediate);
                    this.res=[];
                    for (let a of keys){
                    if(this.intermediate[a]['intrests'].includes(intrest) && regnos.includes(this.intermediate[a]['regno']) && this.userData['regno']!=this.intermediate[a]['regno']){
                          let data={
                            name:this.intermediate[a]['name'],
                            intrest:this.intermediate[a]['intrests'],
                            gpa:dataSnapshot.val()[this.intermediate[a]['regno']]['overall']

                        }
                          this.res.push(data);
                    }
                  }
                  if(this.res.length==0) this.lsitOfstudents.next('null');
                  else
                  this.lsitOfstudents.next(JSON.stringify(this.res));
                }

            });

          }

      });

  }
  getRes(){
    return this.res;
  }
  getGPAofStudent(){
    return this.GpaofStudent;
  }
  courseDetailsAddFirebase(batch:string,sem:string,ccode:string,cname:string){

    this.userProfileRef.child(this.fireAuth.currentUser.uid).child('facultyData').update(
      {
        [batch+'_'+sem+'_'+ccode]:{
          batch:batch,
          sem:sem,
          c_code:ccode,
          c_name:cname,
          status:'active'
        }
      },function(error){
        if(error) console.log(error);
        else console.log('success course details');
      });
      this.refreshAll();

  }
  updateCourseStatus(key:string,statusValue:string){
    this.userProfileRef.child(this.fireAuth.currentUser.uid).child('facultyData/'+key).update(
      {
        status:statusValue
      },function(error){
        if(error) console.log(error);
        else console.log('success status details');
      });
      this.refreshAll();

  }
  fetchedSemData:any;
  fetchedSemDataArray:any[]=[];
  fetchSemSubjects(sem:string){
    this.userProfileRef.orderByChild('usertype').equalTo('faculty').on('value', dataSnapshot => {

      this.fetchedSemData = dataSnapshot.val();
      //console.log(this.fetchedSemData);
      let keys=Object.keys(this.fetchedSemData);
      //console.log(keys);
      for(let a of keys){
        this.fetchedSemDataArray=[];
        if(this.fetchedSemData[a]['facultyData']){
          let interdata=this.fetchedSemData[a]['facultyData'];
          let course = Object.keys(interdata);
          //console.log(course);
          for(let b of course){
            if(b.includes(sem)&&interdata[b]['status']=='active'){
                    let toPush={[this.fetchedSemData[a]['name']]:interdata[b]};
                    this.fetchedSemDataArray.push(toPush);

            }
          }
        }

      }
        if(this.fetchedSemDataArray.length >0){
            this.gotResult.next('gotit');
            console.log(this.fetchedSemDataArray);
        }
        else{
          this.gotResult.next('null');
        }

    });
  }

  getSemList(){
    return this.fetchedSemDataArray;
  }
  saveAnalysisToDB(data:any){
    this.userProfileRef.child(this.fireAuth.currentUser.uid).child('savedAnalysis').update(
      {
        [this.AnalyKey]:this.FileData
      },function(error){
        if(error) console.log(error);
        else console.log('success Analysis save');
      });
  }

  updateKeyForAnalysis(keyVal:string){
        this.AnalyKey=keyVal;
  }


}
