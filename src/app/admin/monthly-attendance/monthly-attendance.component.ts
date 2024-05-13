import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeAttendance } from 'src/domain/employee-attendance';
import { EmployeeAttendanceService } from 'src/service/employee-attendance.service';
import { Table } from 'primeng/table';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrls: ['./monthly-attendance.component.css'],
})
export class MonthlyAttendanceComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  employeeAttendance!: EmployeeAttendance[];

  selectedEmployee!: EmployeeAttendance;

  employeeNames!: any[];

  rangeDates!: Date[];

  cols!: any[];

  exportColumns!: any[];

  loading: boolean = true;

  constructor(
    private datePipe: DatePipe,
    private employeeAttendanceService: EmployeeAttendanceService,
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

    this.employeeAttendanceService.getEmployeeAttendance().then((data) => {
      this.loading = false;
      this.employeeAttendance = data.map((item) => ({
        ...item,
        time_in: new Date(item.time_in),
        time_out: new Date(item.time_out),
      }));

      this.employeeNames = this.employeeAttendance.map((item) => item.name);
    });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'time_in', header: 'Time in' },
      { field: 'time_out', header: 'Time out' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  date() {
    let jsonDateRange = {
      startDate: this.datePipe.transform(this.rangeDates[0], 'MM/dd/yy'),
      endDate: this.datePipe.transform(this.rangeDates[1], 'MM/dd/yyyy'),
    };

    console.log(jsonDateRange);
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const data = this.employeeAttendance.map((item) => ({
        ...item,
        time_in: item.time_in.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
        }),
        time_out: item.time_out.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
        }),
      }));
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'employee-attendance');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION,
    );
  }

  exportCSV() {
    let selectedRows = this.dt.selection;

    let exportData = selectedRows.map((row: EmployeeAttendance) => {
      return {
        ...row,
        time_in: row.time_in.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
        }),
        time_out: row.time_out.toLocaleString('en-US', {
          timeZone: 'Asia/Manila',
        }),
      };
    });

    this.dt.exportCSV({ data: exportData, selectionOnly: true });
  }
}
