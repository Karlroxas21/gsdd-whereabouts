import { Component } from '@angular/core';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css'],
})
export class OrgChartComponent {
  visible: boolean = false;

  csFlow: boolean = false;

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  csFlowShow(){
    this.csFlow = true;
  }

  csFlowClose(){
    this.csFlow = false;
  }

}
