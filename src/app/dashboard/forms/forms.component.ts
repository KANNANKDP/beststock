import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../../home/auth.service';

export interface jobs {
  value: string;
  viewValue: string;
}
export interface semesters{
  value:string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],

})


export class FormsComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  ptype:JSON;

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
  Batches: jobs[] = [
   {value: '2015-2019', viewValue: '2015-2019'},
   {value: '2016-2020', viewValue: '2016-2020'},
   {value: '2017-2021', viewValue: '2017-2021'},
   {value: '2018-2022', viewValue: '2018-2022'}
 ];
  Jobs1: jobs[] = [
   {value: 'gvt', viewValue: 'Government Job'},
   {value: 'pvt', viewValue: 'Private Job'},
   {value: 'abroad', viewValue: 'Abroad'},
   {value: 'other', viewValue: 'Other'}
 ];
 Jobs2: jobs[] = [
  {value: 'gvt', viewValue: 'Government Job'},
  {value: 'pvt', viewValue: 'Private Job'},
  {value: 'abroad', viewValue: 'Abroad'},
  {value: 'hm', viewValue: 'Home Maker'},
  {value: 'other', viewValue: 'Other'}
];
seasons: number[] = [1, 2, 3, 4 ,5];

  constructor(private _formBuilder: FormBuilder,private httpClient: HttpClient,private authService:AuthService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      gender: ['male', Validators.required],
      mobnum: ['', Validators.required],
      age: ['', Validators.required],
      adrs: ['', Validators.required],
      fath_occup: ['', Validators.required],
      moth_occup: ['', Validators.required],
      daysch_host: ['daysch', Validators.required],
      backlogs: ['', Validators.required],
      Batch: ['', Validators.required],
      sem: ['', Validators.required]
    });



    this.secondFormGroup = this._formBuilder.group({
      rb1_1: [3, Validators.required],
      rb1_2: [3, Validators.required],
      rb1_3: [3, Validators.required],
      rb1_4: [3, Validators.required],
      rb1_5: [3, Validators.required],
      rb1_6: [3, Validators.required],
      rb1_7: [3, Validators.required],
      rb1_8: [3, Validators.required],
      rb1_9: [3, Validators.required],
      rb1_10: [3, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      rb2_1: [3, Validators.required],
      rb2_2: [3, Validators.required],
      rb2_3: [3, Validators.required],
      rb2_4: [3, Validators.required],
      rb2_5: [3, Validators.required],
      rb2_6: [3, Validators.required],
      rb2_7: [3, Validators.required],
      rb2_8: [3, Validators.required],
      rb2_9: [3, Validators.required],
      rb2_10: [3, Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      rb3_1: [3, Validators.required],
      rb3_2: [3, Validators.required],
      rb3_3: [3, Validators.required],
      rb3_4: [3, Validators.required],
      rb3_5: [3, Validators.required],
      rb3_6: [3, Validators.required],
      rb3_7: [3, Validators.required],
      rb3_8: [3, Validators.required],
      rb3_9: [3, Validators.required],
      rb3_10: [3, Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      rb4_1: [3, Validators.required],
      rb4_2: [3, Validators.required],
      rb4_3: [3, Validators.required],
      rb4_4: [3, Validators.required],
      rb4_5: [3, Validators.required],
      rb4_6: [3, Validators.required],
      rb4_7: [3, Validators.required],
      rb4_8: [3, Validators.required],
      rb4_9: [3, Validators.required],
      rb4_10: [3, Validators.required]
    });
    this.sixthFormGroup = this._formBuilder.group({
      rb5_1: [3, Validators.required],
      rb5_2: [3, Validators.required],
      rb5_3: [3, Validators.required],
      rb5_4: [3, Validators.required],
      rb5_5: [3, Validators.required],
      rb5_6: [3, Validators.required],
      rb5_7: [3, Validators.required],
      rb5_8: [3, Validators.required],
      rb5_9: [3, Validators.required],
      rb5_10: [3, Validators.required]
    });
  }


  persData(){
    let pf=this.firstFormGroup.value;
    this.authService.insert(pf.gender,pf.mobnum,pf.age,pf.adrs,pf.fath_occup,pf.moth_occup,
    pf.daysch_host,pf.backlogs,pf.Batch,pf.sem);

  }

  negation(val:number){
    if(val == 1) return 5;
	   else if(val == 2) return 4;
	    else if(val == 4) return 2;
	      else if(val == 5) return 1;
	       else return 3;
  }
  evaluate(){

    let c1,c2,c3,c4,c5:number;
    c1=c2=c3=c4=c5=0;
    let tp11,tp12,tp13,tp14,tp15,tp21,tp22,tp23,tp24,tp25,tp31,tp32,tp33,tp34,tp35,tp41,tp42,tp43,tp44,tp45,tp51,tp52,tp53,tp54,tp55:number;
    let tn11,tn12,tn13,tn14,tn15,tn21,tn22,tn23,tn24,tn25,tn31,tn32,tn33,tn34,tn35,tn41,tn42,tn43,tn44,tn45,tn51,tn52,tn53,tn54,tn55:number;
          let  f1=this.secondFormGroup.value;
          let  f2=this.thirdFormGroup.value;
          let  f3=this.fourthFormGroup.value;
          let  f4=this.fifthFormGroup.value;
          let  f5=this.sixthFormGroup.value;

            tp11 = f1.rb1_1;

            tn11 = f1.rb1_2;

            c1 = c1 + 2*(tp11);
            c1 = c1 + 2*this.negation((tn11));
            tp12 = f1.rb1_3;

            tn12 = f1.rb1_4;

            c1 = c1 + 2*(tp12);
            c1 = c1 + 2*this.negation((tn12));
            tp13 = f1.rb1_5;

            tn13 = f1.rb1_6;

            c1 = c1 + 2*(tp13);
            c1 = c1 + this.negation((tn13));
            tp14 = f1.rb1_7;

            tn14 = f1.rb1_8;

            c1 = c1 + 2*(tp14);
            c1 = c1 + 2*this.negation((tn14));
            tp15 = f1.rb1_9;

            tn15 = f1.rb1_10;

            c1 = c1 + 2*(tp15);
            c1 = c1 + 2*this.negation((tn15));
            //Collecting value for 2 corresponding to agreeableness
            //This is the Thinking attribute observant
            tp21 = f2.rb2_1;

            tn21 = f2.rb2_2;

            c2 = c2 + 2*(tp21);
            c2 = c2 + 2*this.negation((tn21));
            tp22 = f2.rb2_3;

            tn22 = f2.rb2_4;

            c2 = c2 + 2*(tp22);
            c2 = c2 + 2*this.negation((tn22));
            tp23 = f2.rb2_5;

            tn23 = f2.rb2_6;

            c2 = c2 + 2*(tp23);
            c2 = c2 + 2*this.negation((tn23));
            tp24 = f2.rb2_7;

            tn24 = f2.rb2_8;

            c2 = c2 + 2*(tp24);
            c2 = c2 + 2*this.negation((tn24));
            tp25 = f2.rb2_9;

            tn25 = f2.rb2_10;

            c2 = c2 + 2*(tp25);
            c2 = c2 + 2*this.negation((tn25));
            //Collecting value for 3 corresponding to conscientiousness
            //This is the Thinking attribute
            tp31 = f3.rb3_1;

            tn31 = f3.rb3_2;

            c3 = c3 + 2*(tp31);
            c3 = c3 + 2*this.negation((tn31));
            tp32 = f3.rb3_3;

            tn32 = f3.rb3_4;

            c3 = c3 + 2*(tp32);
            c3 = c3 + 2*this.negation((tn32));
            tp33 = f3.rb3_5;

            tn33 = f3.rb3_6;

            c3 = c3 + 2*(tp33);
            c3 = c3 + 2*this.negation((tn33));
            tp34 = f3.rb3_7;

            tn34 = f3.rb3_8;

            c3 = c3 + 2*(tp34);
            c3 = c3 + 2*this.negation((tn34));
            tp35 = f3.rb3_9;

            tn35 = f3.rb3_10;

            c3 = c3 + 2*(tp35);
            c3 = c3 + 2*this.negation((tn35));
            //Collecting value for 4 corresponding to emotional stability
            //This is the assertive/turbulent attribute
            tp41 = f4.rb4_1;

            tn41 = f4.rb4_2;

            c4 = c4 + 2*(tp41);
            c4 = c4 + 2*this.negation((tn41));
            tp42 = f4.rb4_3;

            tn42 = f4.rb4_4;

            c4 = c4 + 2*(tp42);
            c4 = c4 + 2*this.negation((tn42));
            tp43 = f4.rb4_5;

            tn43 = f4.rb4_6;

            c4 = c4 + 2*(tp43);
            c4 = c4 + 2*this.negation((tn43));
            tp44 = f4.rb4_7;

            tn44 = f4.rb4_8;

            c4 = c4 + 2*(tp44);
            c4 = c4 + 2*this.negation((tn44));
            tp45 = f4.rb4_9;

            tn45 = f4.rb4_10;

            c4 = c4 + 2*(tp45);
            c4 = c4 + 2*this.negation((tn45));
            //Collecting value for 5 corresponding to intellect/imagination
            //This is judging/thinking attribute
            tp51 = f5.rb5_1;

            tn51 = f5.rb5_2;

            c5 = c5 + 2*(tp51);
            c5 = c5 + 2*this.negation((tn51));
            tp52 = f5.rb5_3;

            tn52 = f5.rb5_4;

            c5 = c5 + 2*(tp52);
            c5 = c5 + 2*this.negation((tn52));
            tp53 = f5.rb5_5;

            tn53 = f5.rb5_6;

            c5 = c5 + 2*(tp53);
            c5 = c5 + 2*this.negation((tn53));
            tp54 = f5.rb5_7;

            tn54 = f5.rb5_8;

            c5 = c5 + 2*(tp54);
            c5 = c5 + 2*this.negation((tn54));
            tp55 = f5.rb5_9;

            tn55 = f5.rb5_10;

            c5 = c5 + 2*(tp55);
            c5 = c5 + 2*this.negation((tn55));

            this.httpClient.get('http://127.0.0.1:5002/predict/'+c1+'/'+c2+'/'+c3+'/'+c4+'/'+c5).subscribe(data => {
      this.ptype = data as JSON;
      console.log(c1,c2,c3,c4,c5);
      console.log(this.ptype['text']);
      this.authService.updatePtype(this.ptype['text']);
    });

  }


}
