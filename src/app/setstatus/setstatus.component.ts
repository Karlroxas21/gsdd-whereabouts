import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { StatusService } from 'src/service/status.service';
@Component({
  selector: 'app-setstatus',
  templateUrl: './setstatus.component.html',
  styleUrls: ['./setstatus.component.css'],
})
export class SetstatusComponent implements OnInit {
    private baseUrlAPI = `${environment.WSSUrl}`;

    constructor(private statusService: StatusService){}

    socket = new WebSocket(`ws://${this.baseUrlAPI}`);
    statuses: any = [];
    date: any;
    time: any;

    statusForm = new FormGroup({
        status: new FormControl({ label: '', value: '' }, Validators.required),
    })

    status!: SelectItem[];

    ngOnInit(): void {
        this.socket.addEventListener('open', function(event){
            console.log("Connected to WS Server");
        });

        this.socket.addEventListener('message', (event)=> {
            // this.statuses.push(JSON.parse(event.data));
            const newStatus = JSON.parse(event.data);
            
            this.date = new Date(newStatus.date_and_time).toISOString() 
            .split("T")[0]
            .split(".")[0];

            this.time = new Date(newStatus.date_and_time).toISOString() 
            .split("T")[1]
            .split(".")[0];
            
            this.statuses.push(newStatus);
        })
        this.getAllLatestStatus();

        this.status = [
            {label: 'Sick Leave', value: 'Sick Leave'},
            {label: 'Mandatory Leave', value: 'Mandatory Leave'},
            {label: 'Vacation Leave', value: 'Vacation Leave'},
            {label: 'Do not disturb', value: 'Do not disturb'},
            {label: 'Sick Leave', value: 'Sick Leave'},
            {label: 'In a meeting', value: 'In a meeting'},
        ]
    }

    getAllLatestStatus(){
        this.statusService.getAllLatestStatus().subscribe((data)=>{
            console.log(data);
        })
    }

    onSetStatusSubmit(){
        console.log(this.statusForm.value.status?.value)
    }
}
