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
 
  constructor() {}



  ngOnInit() {





  }


}
