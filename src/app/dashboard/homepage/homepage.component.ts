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
   
 
  constructor(private authservice:AuthService) {}



  ngOnInit() {
  		this.Data=this.authservice.getUserData();

	this.prefOptions=this.Data.preference;



  }
  toggleOption(i:number){
  	this.prefOptions[i]=!this.prefOptions[i];
  	this.authservice.updatePref(this.prefOptions);
  	console.log(this.prefOptions);
  }


}
