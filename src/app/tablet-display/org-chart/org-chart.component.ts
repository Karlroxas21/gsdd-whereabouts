import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StatusService } from 'src/service/status.service';

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
    ngOnInit(): void {
        this.socket.addEventListener('open', function (event) {
            console.log("Connected to WS Server");
        });

        this.socket.addEventListener('message', (event) => {
            // this.statuses.push(JSON.parse(event.data));
            const newStatus = JSON.parse(event.data);

            this.statusData.push(newStatus);
            console.log(newStatus);

            this.statusNiKarl = newStatus.setStatus.status;
        });

        this.getAllLatestStatus();
    }

    getAllLatestStatus(){
        this.statusService.getAllLatestStatus().subscribe((res) =>{
            return res;
        })
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
