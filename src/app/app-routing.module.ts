import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaketestComponent} from './dashboard/taketest/taketest.component';
import {FormsComponent} from './dashboard/forms/forms.component';
import {PredictedComponent} from './dashboard/predicted/predicted.component';
import {ResultViewComponent} from './dashboard/result-view/result-view.component';
import {HomepageComponent} from './dashboard/homepage/homepage.component';
import {AuthGuard} from './home/auth-guard.service';
import {AuthGuard2} from './home/auth-guard2.service';
import {FacultyComponent} from './faculty/faculty.component';
import {FacHomeComponent} from './faculty/fac-home/fac-home.component';
import {RecordsComponent} from './faculty/records/records.component';
import {FacSignupComponent} from './fac-signup/fac-signup.component';
import {AdminComponent} from './admin/admin.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';
import {AdminFacComponent} from './admin/admin-fac/admin-fac.component';
import {AdminResultComponent} from './admin/admin-result/admin-result.component';



const routes: Routes = [

  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'facSignup',component:FacSignupComponent},
  {path:'admin',component:AdminComponent,children:[
      {path:'',redirectTo:'admin-home',pathMatch:'full'},
      {path:'admin-home' , component:AdminHomeComponent},
      {path:'admin-fac',component:AdminFacComponent},
      {path:'admin-result',component:AdminResultComponent}


  ]},
  {path: 'faculty',component:FacultyComponent, children:[
    {path:'',redirectTo:'fac-home',pathMatch:'full'},
    {path:'fac-home',component:FacHomeComponent,canActivate:[AuthGuard2]},
      {path:'records',component:RecordsComponent,canActivate:[AuthGuard2]},
  ]},
  {path:'dashboard',component:DashboardComponent,  children:[
      {path:'forms',component:FormsComponent},
      {path:'',redirectTo:'homepage',pathMatch:'full'},
      {path:'homepage',component:HomepageComponent},
      {path:'taketest',component:TaketestComponent},
      {path:'predicted',component:PredictedComponent},
      {path:'result-view',component:ResultViewComponent},

    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
