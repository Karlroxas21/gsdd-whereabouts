import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-monthly-attendance',
    templateUrl: './monthly-attendance.component.html',
    styleUrls: ['./monthly-attendance.component.css']
})
export class MonthlyAttendanceComponent {
    
    rangeDates!: Date[];

    constructor(private datePipe: DatePipe){}


    date(){
       let jsonDateRange = {
        startDate: this.datePipe.transform(this.rangeDates[0], 'MM/dd/yy'),
        endDate: this.datePipe.transform(this.rangeDates[1], 'MM/dd/yyyy')
       };

       console.log(jsonDateRange);
    }

   

}
