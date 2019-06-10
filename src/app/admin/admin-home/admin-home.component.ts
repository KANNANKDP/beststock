import { Component, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {AuthService} from '../../home/auth.service';

export interface Semester {
  value: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  resultRcvd;
  semList;
  oddOReven:FormGroup;
  semSubjects:any;
  semester: Semester[] = [
      {value: 's5'},
      {value: 's6'},
      {value: 's7'},
      {value: 's8'},

    ];
    keyList:any[]=[];

  constructor(private _formBuilder:FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.authService.ResultRcvd.subscribe(message=> this.resultRcvd=message);
    this.oddOReven=this._formBuilder.group({
      oddOrEven:['odd',Validators.required]
    })
  }

  getSemSubjects(sem:string){
    this.keyList=[];
    this.semSubjects=this.authService.fetchSemSubjects(sem);
    if(this.resultRcvd=='gotit') {
      this.semList=this.authService.getSemList();
      for(let k of this.semList){
        this.keyList.push(Object.keys(k));
      }
    }
    console.log(this.keyList);
  }


}
