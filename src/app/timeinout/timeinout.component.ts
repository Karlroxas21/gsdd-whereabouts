import { Component } from '@angular/core';

@Component({
  selector: 'app-timeinout',
  templateUrl: './timeinout.component.html',
  styleUrls: ['./timeinout.component.css'],
})
export class TimeinoutComponent {
  public now: Date = new Date();

  constructor() {
    setInterval(() => {
      this.now = new Date();
    }, 1000);

   
  }
  timeIn(){
    console.log("TIME IN!");
}
}
