import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EmployeeAttendanceService } from 'src/service/employee-attendance.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
// Components
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { TimesheetComponent } from './dashboard/timesheet/timesheet.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ChangepinComponent } from './dashboard/changepin/changepin.component';
import { AccountComponent } from './account/account.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SetstatusComponent } from './setstatus/setstatus.component';
import { TimeinoutComponent } from './timeinout/timeinout.component';
import { TeamComponent } from './team/team.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ReportsHomeComponent } from './admin/reports-home/reports-home.component';
import { MonthlyAttendanceComponent } from './admin/monthly-attendance/monthly-attendance.component';
import { TeamMemberStatusComponent } from './admin/team-member-status/team-member-status.component';
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
    AdminComponent,
    ReportsHomeComponent,
    MonthlyAttendanceComponent,
    TeamMemberStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    FormsModule,
    CalendarModule,
    TabViewModule,
    TableModule,
    MultiSelectModule,
    ButtonModule
  ],
  providers: [DatePipe, EmployeeAttendanceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
