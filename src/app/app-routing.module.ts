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
      { component: NotificationsComponent, path:'notification'}
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
