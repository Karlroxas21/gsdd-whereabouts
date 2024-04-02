import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { TimesheetComponent } from './dashboard/timesheet/timesheet.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    RegisterComponent,
    HomeDashboardComponent,
    TimesheetComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
