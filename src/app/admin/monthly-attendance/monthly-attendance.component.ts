import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeAttendance } from 'src/domain/employee-attendance';
import { EmployeeAttendanceService } from 'src/service/employee-attendance.service';
import { Table } from 'primeng/table';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-monthly-attendance',
    templateUrl: './monthly-attendance.component.html',
    styleUrls: ['./monthly-attendance.component.css']
})
export class MonthlyAttendanceComponent implements OnInit {
    @ViewChild('dt') dt!: Table;

    employeeAttendance!: EmployeeAttendance[];

    selectedEmployee!: EmployeeAttendance;

    employeeNames!: any[];

    rangeDates!: Date[];

    loading: boolean = true;

    constructor(private datePipe: DatePipe, private employeeAttendanceService: EmployeeAttendanceService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.filterMatchModeOptions = {
            text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
            numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
            date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
        };
        
        this.employeeAttendanceService.getEmployeeAttendance().then((data) => {
            
            this.loading = false;
            this.employeeAttendance = data.map(item => ({
                ...item,
                time_in: new Date(item.time_in),
                time_out: new Date(item.time_out)
            }));

            this.employeeNames = this.employeeAttendance.map(item => item.name);

        });


    }

    date() {
        let jsonDateRange = {
            startDate: this.datePipe.transform(this.rangeDates[0], 'MM/dd/yy'),
            endDate: this.datePipe.transform(this.rangeDates[1], 'MM/dd/yyyy')
        };

        console.log(jsonDateRange);
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    clear(table: Table) {
        table.clear();
    }


}
