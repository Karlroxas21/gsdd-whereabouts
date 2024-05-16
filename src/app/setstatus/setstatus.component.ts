import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setstatus',
  templateUrl: './setstatus.component.html',
  styleUrls: ['./setstatus.component.css'],
})
export class SetstatusComponent implements OnInit {
    private baseUrlAPI = `${environment.WSSUrl}`;

    socket = new WebSocket(`ws://${this.baseUrlAPI}`);
    statuses: any = [];

    ngOnInit(): void {
        this.socket.addEventListener('open', function(event){
            console.log("Connected to WS Server");
        });

        this.socket.addEventListener('message', (event)=> {
            // this.statuses.push(JSON.parse(event.data));
            console.log("DATA: "+ event.data);
            const newStatus = JSON.parse(event.data);
            newStatus.date_and_time = new Date(newStatus.date_and_time).toLocaleString();
            
            this.statuses.push(newStatus);
        })
        
    }
}
