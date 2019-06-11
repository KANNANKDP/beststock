import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {AuthService} from '../../home/auth.service';

export interface semesters{
  value:string;
}

@Component({
  selector: 'app-fac-nav',
  templateUrl: './fac-nav.component.html',
  styleUrls: ['./fac-nav.component.scss']
})

export class FacNavComponent implements OnInit {

  percentDone: number;
    uploadSuccess: boolean;
    fileupload:FormGroup;
    fileToUpload;
    formData;
    upMsg:string="";
    Semester:semesters[]=[
      {value:'s1'},
      {value:'s2'},
      {value:'s3'},
      {value:'s4'},
      {value:'s5'},
      {value:'s6'},
      {value:'s7'},
      {value:'s8'}
    ];
    Ser:semesters[]=[
      {value:'first'},
      {value:'second'}
    ];
    Batches: semesters[] = [
     {value: '2015-2019'},
     {value: '2016-2020'},
     {value: '2017-2021'},
     {value: '2018-2022'}
   ];

  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('http://localhost:4200/', formData)
      .subscribe(event => {
        console.log('done')
      })
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){
    this.http.post('https://file.io', file)
      .subscribe(event => {
        console.log('done')
      })
  }

  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))

    this.http.post('http://localhost:4200/', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){
    this.http.post('http://localhost:4200/', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }

  constructor(private http: HttpClient,private _formBuilder: FormBuilder,private authservice:AuthService ) { }





  ngOnInit() {

    this.fileupload=this._formBuilder.group(
      {uplo:['',Validators.required],
       batch:['',Validators.required],
       sem:['',Validators.required],
       coursecode:['',Validators.required],
       series:['',Validators.required]
    });
  }
  navbarOpen = false;

    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }

    postMethod(files: FileList) {
            this.fileToUpload = files.item(0);
            this.formData = new FormData();
            this.formData.append('file', this.fileToUpload, this.fileToUpload.name);
            console.log(this.formData);
            //return false;
  }
  uploadFunc(){
  /*  const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
    })
  };*/
  let options=this.fileupload.value;
  this.authservice.updateKeyForAnalysis(options.batch+'_'+options.sem+'_'+options.series+'_'+options.coursecode);
  this.upMsg="";
    this.http.post('http://127.0.0.1:5002/upload/'+options.batch+'/'+options.sem+'/'+options.series+'/'+options.coursecode+'/', this.formData).subscribe((val) => {

      console.log(val);
      this.authservice.filedata(val);
      this.upMsg="success";

    });

  }
}
