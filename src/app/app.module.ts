import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './home/auth.service';
import {AuthGuard} from './home/auth-guard.service';
import {AuthGuard2} from './home/auth-guard2.service';
import {DataFetchService} from './dashboard/data-fetch.service';
import * as $ from 'jquery';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatIconModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { ParticlesComponent } from './particles/particles.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './dashboard/forms/forms.component';
import { ResultViewComponent } from './dashboard/result-view/result-view.component';
import { DashNavComponent } from './dashboard/dash-nav/dash-nav.component';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { TaketestComponent } from './dashboard/taketest/taketest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
   import { ChartsModule } from 'ng2-charts';
   import {MatRadioModule} from '@angular/material/radio';
   import {MatCardModule} from '@angular/material/card';
   import {MatSelectModule} from '@angular/material/select';
import { FacultyComponent } from './faculty/faculty.component';
import { FacNavComponent } from './faculty/fac-nav/fac-nav.component';
import { FacHomeComponent } from './faculty/fac-home/fac-home.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import { PredictedComponent } from './dashboard/predicted/predicted.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FacSignupComponent } from './fac-signup/fac-signup.component';
import { RecordsComponent } from './faculty/records/records.component';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { AdminFacComponent } from './admin/admin-fac/admin-fac.component';
import { AdminResultComponent } from './admin/admin-result/admin-result.component';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    ParticlesComponent,
    LoginComponent,
    DashboardComponent,
    FormsComponent,
    ResultViewComponent,
    DashNavComponent,
    HomeComponent,
    TaketestComponent,
    HomepageComponent,
    FacultyComponent,
    FacNavComponent,
    FacHomeComponent,
    PredictedComponent,
    FacSignupComponent,
    RecordsComponent,
    AdminComponent,
    AdminNavComponent,
    AdminHomeComponent,

    AdminFacComponent,
    AdminResultComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,
        BrowserAnimationsModule,
        MatChipsModule,
        MatTabsModule,
        MatFormFieldModule,
        MatTableModule,
        MatRadioModule,
        MatIconModule,
        ChartsModule,
        MatCardModule,
        ShowHidePasswordModule,
        HttpModule,
        HttpClientModule,
        MatSelectModule,
        NgxUiLoaderModule,
        MatExpansionModule,
        MatDividerModule,
  ],
  providers: [AuthService,AuthGuard,DataFetchService,AuthGuard2],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
