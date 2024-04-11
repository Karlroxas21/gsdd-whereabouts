import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeStatus } from 'src/domain/employee-status';
import { EmployeeStatusService } from 'src/service/employee-status.service';
import { Table } from 'primeng/table';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-team-member-status',
  templateUrl: './team-member-status.component.html',
  styleUrls: ['./team-member-status.component.css'],
})
export class TeamMemberStatusComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  employeeStatus!: EmployeeStatus[];

  selectedEmployee!: EmployeeStatus;

  employeeNames!: any[];

  rangeDates!: Date[];

  cols!: any[];

  loading: boolean = true;

  constructor(
    private datePipe: DatePipe,
    private employeeStatusService: EmployeeStatusService,
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit() {
    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };

    this.employeeStatusService.getEmployeeStatus().then((data) => {
      this.loading = false;
      this.employeeStatus = data.map((item) => ({
        ...item,
        status_from_to: item.status_from_to.map((statusItem) => ({
          ...statusItem,
          from: new Date(statusItem.from),
          to: new Date(statusItem.to),
        })),
      }));

      this.employeeNames = this.employeeStatus.map((item) => item.name);

      this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'status', header: 'Status' },
        { field: 'from_to', header: 'From-to' },
      ];
    });
  }

  date() {
    let jsonDateRange = {
      startDate: this.datePipe.transform(this.rangeDates[0], 'MM/dd/yy'),
      endDate: this.datePipe.transform(this.rangeDates[1], 'MM/dd/yyyy'),
    };

    console.log(jsonDateRange);
  }

}
