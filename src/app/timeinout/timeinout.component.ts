import { Component, OnInit } from '@angular/core';
import { TabService } from 'src/service/tab.service';
import { TimeInOutModalService } from 'src/service/time-in-out-modal.service';
import { TimeInOutService } from 'src/service/time-in-out.service';
@Component({
    selector: 'app-timeinout',
    templateUrl: './timeinout.component.html',
    styleUrls: ['./timeinout.component.css'],
})
export class TimeinoutComponent implements OnInit {
    CURRENT_TIME_DISPLAY_ONLY?: string;
    public currentDate?: string;

    private timeInDate: string | undefined;
    private timeOutDate: string | undefined;
    private timeInTime: string | undefined = '--';
    private timeOutTime: string | undefined = '--';

    timeDisplay = '';
    timeDisplayModified = false;

    Id = localStorage.getItem('id');

    constructor(private tabService: TabService, private timeInOutModalService: TimeInOutModalService, private timeInOutService: TimeInOutService) {
        setInterval(() => {
            this.CURRENT_TIME_DISPLAY_ONLY = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
            if (!this.timeDisplayModified) {
                let date = new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                });

                let time = new Date().toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });

                let hours = new Date().getHours().toString().padStart(2, '0');
                let minutes = new Date().getMinutes().toString().padStart(2, '0');
                let seconds = new Date().getSeconds().toString().padStart(2, '0');

                this.timeDisplay = `${hours}:${minutes}:${seconds}`;

                this.currentDate = `${date}`;
            }

        }, 1000);
    }

    isOpen$ = this.timeInOutModalService.isOpen$;

    ngOnInit(): void {
        this.timeInOutModalService.closeModal();
    }

    openTimeInOutModal() {
        this.timeInOutModalService.openModal();
    }

    closeTimeInOutModal() {
        this.timeDisplayModified = false;
        this.timeInOutModalService.closeModal();
    }

    onTimeChange(event: any) {
        this.timeDisplayModified = true;
        this.timeDisplay = event;
    }

    getTimeIn() {
        return this.timeInTime;
    }

    setTimeIn(timeIn?: string) {
        this.timeInTime = timeIn;
    }

    getTimeOut() {
        return this.timeOutTime;
    }

    setTimeOut(timeOut?: string) {
        this.timeOutTime = timeOut;
    }

    getId(){
        return this.Id;
    }

    timeOutId: string = '';

    timeIn() {
        
        this.timeInOutModalService.closeModal();
        this.setTimeIn(this.timeDisplay);
        this.timeInDate = this.currentDate;
        
        let timeInDateTime = new Date(`${this.timeInDate} ` + this.getTimeIn());
        
        if(this.Id){
            this.timeInOutService.timeIn(this.Id, timeInDateTime ).subscribe(res =>{
                this.timeOutId = res.Id;
    
            }, (err=>{
                console.log(err);
            }))
        }else{
            console.error('No Id');
        }
      
    }

    timeOut() {
        this.timeInOutModalService.closeModal();
        this.setTimeOut(this.timeDisplay);
        this.timeOutDate = this.currentDate;

        let timeOutDateTime = new Date(`${this.timeOutDate} ` + this.getTimeOut());
        
        if(this.timeOutId){
            this.timeInOutService.timeOut(this.timeOutId, timeOutDateTime).subscribe(res =>{
                console.log("Time out success: ", res);
            }, (err) =>{
                console.log(err);
            })
        }else{
            console.error('Invalid Id');
        }
    }

    goToTimeSheet() {
        this.tabService.changeTab(1);
    }

}
