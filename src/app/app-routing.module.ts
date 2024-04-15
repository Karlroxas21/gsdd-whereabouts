import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { AccountComponent } from './account/account.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SetstatusComponent } from './setstatus/setstatus.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimeinoutComponent } from './timeinout/timeinout.component';
import { TimesheetComponent } from './dashboard/timesheet/timesheet.component';
import { TeamComponent } from './team/team.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ReportsHomeComponent } from './admin/reports-home/reports-home.component';
import { MonthlyAttendanceComponent } from './admin/monthly-attendance/monthly-attendance.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { RulesComponent } from './admin/rules/rules.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { component: HomeDashboardComponent, path: '' },
      { component: AccountComponent, path: 'account' },
      { component: SetstatusComponent, path: 'setstatus' },
      { component: TimesheetComponent, path: 'timesheet' },
      { component: TimeinoutComponent, path: 'timeinout' },
      { component: TeamComponent, path: 'team' },
      { component: NotificationsComponent, path:'notification'},
      { component: AdminComponent, path: 'admin_dashboard'},
      { component: ReportsHomeComponent, path: 'admin_reports-home'},
      { component: MonthlyAttendanceComponent, path: 'admin_monthly_attendance'},
      { component: AccountsComponent, path: 'admin_accounts'},
      { component: NotificationComponent, path:'admin_notification'},
      { component: RulesComponent, path: 'admin_rules'}
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
