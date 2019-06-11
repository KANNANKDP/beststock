import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
//import {DataFetchService} from '../../dashboard/data-fetch.service';
import {AuthService} from '../../home/auth.service';
import { HttpClient } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})



export class HomepageComponent implements OnInit {

   panelOpenState = false;
   prefOptions:any;
   Data:any;
   content:any;
   contentKeys:any;
   subKeys={};
   prefString:string;
   stat:any;
 
  constructor(private authservice:AuthService,private http:HttpClient) {}



  ngOnInit() {
  		this.Data=this.authservice.getUserData();

	this.prefOptions=this.Data.preference;
	this.prefString=
  		((this.prefOptions[0])?',Pharmaceutical':'')+
  		((this.prefOptions[1])?',Automobile':'')+
  		((this.prefOptions[2])?',Information Technology':'')+
  		((this.prefOptions[3])?',Banking':'')+
  		((this.prefOptions[4])?',Consumer Electronics':'')
  		;
  	this.prefString=this.prefString.substring(1);	


  }
  toggleOption(i:number){
  	this.prefOptions[i]=!this.prefOptions[i];
  	this.authservice.updatePref(this.prefOptions);
  	console.log(this.prefOptions);
  	this.prefString=
  		((this.prefOptions[0])?',Pharmaceutical':'')+
  		((this.prefOptions[1])?',Automobile':'')+
  		((this.prefOptions[2])?',Information Technology':'')+
  		((this.prefOptions[3])?',Banking':'')+
  		((this.prefOptions[4])?',Consumer Electronics':'')
  		;
  	this.prefString=this.prefString.substring(1);	
  	console.log(this.prefString);	
  }

  fetchContent(){
  	this.stat='wait';
  	this.http.get('http://127.0.0.1:5002/StockPred/'+this.prefString+'/').subscribe((val) => {

      this.content=val;
      console.log(this.content);
      this.contentKeys=Object.keys(this.content);
      for(let item of this.contentKeys){
      	this.subKeys[item]=Object.keys(this.content[item]);
      }
      console.log(this.subKeys);
      this.stat='done';

    });
  }


}
