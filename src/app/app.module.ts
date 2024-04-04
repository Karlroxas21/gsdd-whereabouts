import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { TimesheetComponent } from './dashboard/timesheet/timesheet.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';

import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { ChangepinComponent } from './dashboard/changepin/changepin.component';
import { AccountComponent } from './account/account.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SetstatusComponent } from './setstatus/setstatus.component';
import { TimeinoutComponent } from './timeinout/timeinout.component';
import { TeamComponent } from './team/team.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    RegisterComponent,
    HomeDashboardComponent,
    TimesheetComponent,
    DashboardComponent,
    ChangepinComponent,
    AccountComponent,
    NotfoundComponent,
    SetstatusComponent,
    TimeinoutComponent,
    TeamComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    CalendarModule,
    FormsModule,
    TabViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
