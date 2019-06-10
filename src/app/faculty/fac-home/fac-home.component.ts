import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { FormControl,FormGroup, Validators,ReactiveFormsModule,FormBuilder } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label,MultiDataSet } from 'ng2-charts';
import {AuthService} from '../../home/auth.service';


export interface semesters{
  value:string;
}

@Component({
  selector: 'app-fac-home',
  templateUrl: './fac-home.component.html',
  styleUrls: ['./fac-home.component.scss']
})
export class FacHomeComponent implements OnInit {

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
  Batches: semesters[] = [
   {value: '2015-2019'},
   {value: '2016-2020'},
   {value: '2017-2021'},
   {value: '2018-2022'}
 ];

  CourseDetails:FormGroup;
  message;
  courseDataFetched:any;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{ticks:{
        fontColor:'white'
    }}], yAxes: [{     ticks: {
          max : 70,
          min : 0,
          fontColor: 'white'

        }}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'

      }
    },
    legend: {
  display: true,
  labels: {
    fontColor: 'white' // legend color (can be hexadecimal too)
  },
  }

  };

  public doughnutChartLabels: Label[] = ['pass','fail'];
 public doughnutChartData: MultiDataSet = [
   [350, 450, 100]
 ];
 public doughnutChartType: ChartType = 'doughnut';

  public barChartLabels: Label[] = ['0-10', '10-20', '20-30', '30-40', '40-50','50-60'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Marks' }
  ];
  colors = [

  { // 2nd Year.
   backgroundColor: 'rgba(30, 169, 224, 0.8)',
   borderColor: 'rgba(225,10,24,0.2)',
     pointBackgroundColor: 'rgba(225,10,24,0.2)',
     pointBorderColor: '#fff',
     pointHoverBackgroundColor: '#fff',
     pointHoverBorderColor: 'rgba(225,10,24,0.2)',

  }
];
  facDATA:any;
  courseDataFetchedKeys;

  constructor(private authservice:AuthService,private _formBuilder:FormBuilder) {


  }

  ngOnInit() {
    this.facDATA=this.authservice.getUserData();
    if (this.facDATA['facultyData']){
      this.courseDataFetched=this.facDATA['facultyData'];
      this.courseDataFetchedKeys=Object.keys(this.courseDataFetched);
  }
    this.CourseDetails=this._formBuilder.group({
      batch:['',Validators.required],
      sem:['',Validators.required],
      course_code:['',Validators.required],
      course_name:['',Validators.required],

    });
    this.authservice.fileData.subscribe(message => this.message = message);
    console.log(this.message);
    //this.barChartData=[{data:this.message['total_mark_distrib'],label:'distribution'}];

  }
  courseDetailsAdd(){
    let getDetails=this.CourseDetails.value;
    this.authservice.courseDetailsAddFirebase(getDetails.batch,getDetails.sem,getDetails.course_code,getDetails.course_name);
    this.facDATA=this.authservice.getUserData();
    if (this.facDATA['facultyData']) this.courseDataFetched=this.facDATA['facultyData'];
    this.courseDataFetchedKeys=Object.keys(this.courseDataFetched);

  }
  toActive(i:number){
    this.authservice.updateCourseStatus(this.courseDataFetchedKeys[i],'active');
    this.facDATA=this.authservice.getUserData();
    this.courseDataFetched=this.facDATA['facultyData'];
    this.courseDataFetchedKeys=Object.keys(this.courseDataFetched);
  }
  toComplete(i:number){
    this.authservice.updateCourseStatus(this.courseDataFetchedKeys[i],'complete');
    this.facDATA=this.authservice.getUserData();
    this.courseDataFetched=this.facDATA['facultyData'];
    this.courseDataFetchedKeys=Object.keys(this.courseDataFetched);
  }
  saveAnalysis(){
    this.authservice.saveAnalysisToDB(this.message);
  }

}
