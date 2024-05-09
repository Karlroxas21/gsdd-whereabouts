import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

    check_time_in?: boolean;
    check_time_out?: boolean;

    constructor(private tabService: TabService, private timeInOutModalService: TimeInOutModalService, private timeInOutService: TimeInOutService, private cdr: ChangeDetectorRef) {
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

        this.isTimeIn().then(result => {
            if (result) {
                this.check_time_in = result;
            } else {
                this.check_time_in = result;
            }
        }).catch(err => {
            console.error("Error in isTimeIn", err);
        });

        this.isTimeOut().then(result => {
            if (result) {
                this.check_time_out = result;
            } else {
                this.check_time_out = result;
            }
        }).catch(err => {
            console.error("Error in isTimeOut", err);
        });

        console.log("time in check: ", this.check_time_in);
        console.log("time out check: ", this.check_time_out);
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

    getId() {
        return this.Id;
    }

    timeOutId = '';

    timeIn() {

        this.timeInOutModalService.closeModal();
        this.setTimeIn(this.timeDisplay);
        this.timeInDate = this.currentDate;

        let timeInDateTime = new Date(`${this.timeInDate} ` + this.getTimeIn());

        if (this.Id) {
            this.timeInOutService.timeIn(this.Id, timeInDateTime).subscribe(res => {
                this.timeOutId = res.Id;

            }, (err => {
                console.log(err);
            }))
        } else {
            console.error('No Id');
        }
    }

    timeOut() {
        this.timeInOutModalService.closeModal();
        this.setTimeOut(this.timeDisplay);
        this.timeOutDate = this.currentDate;

        let timeOutDateTime = new Date(`${this.timeOutDate} ` + this.getTimeOut());

        if (this.getTimeIn() !== '--') {

            console.log("time out id: ", this.timeOutId);

            this.timeInOutService.timeOut(this.timeOutId.toString(), timeOutDateTime).subscribe(res => {
                console.log("Time out success: ", res);
            }, (err) => {
                console.log(err);
            });

            this.timeInOutService.getTotalTime(this.timeOutId).subscribe(res => {

                this.timeInOutService.setTotalTime(this.timeOutId, res.total_time).subscribe(res_total_time => {
                    console.log("Total time inside setTotal:", res_total_time);

                }, (err) => {
                    console.log(err);
                });

            }, (err) => {
                console.log(err);
            });

        } else {
            console.error('Invalid Id1');
        }
    }

    isTimeIn(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                this.timeInOutService.isTimeIn(this.Id).subscribe(res => {
                    if (res.dataOfTimeIn) {
                        this.setTimeIn(res.dataOfTimeIn);
                        this.timeOutId = res.Id;

                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        })
    };

    isTimeOut(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {

                this.timeInOutService.isTimeOut(this.Id).subscribe(res => {
                    if (res.dataOfTimeOut) {
                        this.setTimeOut(res.dataOfTimeOut);
                        resolve(true);
                    }
                    resolve(false);
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        })
    };

    goToTimeSheet() {
        this.tabService.changeTab(1);
    }

}
