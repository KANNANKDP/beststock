import { Component, OnInit } from '@angular/core';
 import {MatCardModule} from '@angular/material/card';
 import {MatTabsModule} from '@angular/material/tabs';
 import {MatTableModule} from '@angular/material/table';
 import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
 import * as pluginDataLabels from 'chartjs-plugin-datalabels';
 import { Label } from 'ng2-charts';
 import {FormBuilder, FormGroup, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
 import {AuthService} from '../../home/auth.service';
 import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

 export interface semesters{
   value:string;
 };

 export interface semesters{
   value:string;
 }

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
  results;myob;subs=[];Ress;courses;semm:string="kr";seer:string="khsdgf";

  forGetFile:FormGroup;
  fromGetFile:any;
  fromGetFileData:any;
  Series:semesters[]=[
    {value:'first'},
    {value:'second'}
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{     ticks: {
          max : 100,
          min : 0,
        }}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Marks' }
  ];
  colors = [

  { // 2nd Year.
    backgroundColor: 'rgba(30, 169, 224, 0.8)'
  }
  ]



  constructor(private authService:AuthService,private http: HttpClient,private _formBuilder: FormBuilder) {
    this.fromGetFile="ok";
    this.fromGetFileData="ok";
  this.results=this.authService.getUserData()['analysis'];
  console.log(this.results);
  this.myob=Object.keys(this.results);
  console.log(this.myob);
  for(let a in this.myob){
          this.subs.push(Object.keys(this.results[this.myob[a]]['res']));
  }
  console.log(this.subs[0]);


}

  ngOnInit() {

    this.forGetFile=this._formBuilder.group(
      {seriesNum:['',Validators.required]
    });
  }
  setRes(res:any){
      this.semm=res.sem;
      this.seer=res.series;
      this.Ress=res;
      this.courses=Object.keys(this.Ress['res']);
      console.log(this.Ress['sem']);

  }

  getfilelist(){
    let filePut=this.authService.getUserData();
    this.http.get('http://127.0.0.1:5002/getfile/'+filePut['batch']+'/'+filePut['sem']+'/'+this.forGetFile.value.seriesNum).subscribe((val) => {

      this.fromGetFile=val;


    });

  }
  showAnaly(filename:string){
    let filePut2=this.authService.getUserData();
    this.http.get('http://127.0.0.1:5002/analysis/'+filePut2['regno']+'/'+filePut2['batch']+'/'+filePut2['sem']+'/'+this.forGetFile.value.seriesNum+'/'+filename).subscribe((val) => {

      this.fromGetFileData=val;
      //this.authService.updateAnaly2(this.fromGetFileData['analy'],this.forGetFile.value.seriesNum,this.fromGetFileData['subname']);

    });

    //this.authService.updateAnaly2(this.fromGetFileData['analy'],this.forGetFile.value.seriesNum,this.fromGetFileData['subname']);

  }
  saveAnalysis(){
    console.log(this.fromGetFileData);
    this.authService.updateAnaly2(this.fromGetFileData['analy'],this.forGetFile.value.seriesNum,this.fromGetFileData['subname']);
  }

}
