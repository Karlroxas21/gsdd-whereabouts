import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StatusService } from 'src/service/status.service';
import { EmployeeStatus } from 'src/domain/employee-status';

@Component({
    selector: 'app-org-chart',
    templateUrl: './org-chart.component.html',
    styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent implements OnInit {

    constructor(private statusService: StatusService){}

    private baseUrlAPI = `${environment.WSSUrl}`;

    visible: boolean = false;

    csFlow: boolean = false;

    socket = new WebSocket(`ws://${this.baseUrlAPI}`);

    statusData: any = [];

    statusNiKarl: any;

    employeeStatuses: EmployeeStatus[] = [];
    ngOnInit(): void {
        this.socket.addEventListener('open', function (event) {
            console.log("Connected to WS Server");
        });

        this.socket.addEventListener('message', (event) => {
            // this.statuses.push(JSON.parse(event.data));
            const newStatus = JSON.parse(event.data);

            this.statusData.push(newStatus);
            // console.log("Org chart", newStatus);

            const employeeStatus: EmployeeStatus = {
                first_name: newStatus.first_name,
                last_name: newStatus.last_name,
                status: newStatus.setStatus.status
            }

            this.employeeStatuses.push(employeeStatus);

            console.log(this.employeeStatuses);

            this.statusNiKarl = newStatus.first_name + newStatus.last_name;
            // PUT Push new status in DB
        });

        this.getAllLatestStatus();
    }

    getAllLatestStatus(){
        this.statusService.getAllLatestStatus().subscribe((res) =>{
            return res;
        })
    }

    getStatus(first_name: string, last_name: string) {
        const employees = this.employeeStatuses.filter(e => e.first_name === first_name && e.last_name === last_name);

        return employees.length > 0 ? employees[employees.length -1].status : null;
    }
    getStatusOfUser(first_name: string, last_name: string){
        // Iterate in data of latest status and assign it to specific user
// for (let item of data) {
//     let user = item.user;
//     if (user.first_name === X.first_name && user.last_name === X.last_name) {
//         console.log(`Match found: ${JSON.stringify(user)}`);
//     }
// }
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }

    csFlowShow() {
        this.csFlow = true;
    }

    csFlowClose() {
        this.csFlow = false;
    }

}
