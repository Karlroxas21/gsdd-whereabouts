import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeStatusService {
    getEmployeeStatusData(){
        return[{
            id: "1",
            name: "Karl Marx",
            status_from_to: [{
                status: "active",
                from:new Date('2022-01-01T09:30:00'),
                to: new Date('2022-01-01T17:00:00')
            },{
                status: "Do not disturb",
                from: new Date('2022-02-01T09:32:00'),
                to: new Date('2022-02-01T18:00:00')
            },{
                status: "In Meeting",
                from: new Date('2022-03-01T08:00:00'),
                to: new Date('2022-03-01T16:00:00')
            }]
        },{
            id: "2",
            name: "Karl Marx",
            status_from_to: [{
                status: "haha",
                from:new Date('2022-01-01T09:30:00'),
                to: new Date('2022-01-01T17:00:00')
            },{
                status: "1",
                from: new Date('2022-02-01T09:32:00'),
                to: new Date('2022-02-01T18:00:00')
            },{
                status: "2",
                from: new Date('2022-03-01T08:00:00'),
                to: new Date('2022-03-01T16:00:00')
            }]
        },{
            id: "3",
            name: "Thea",
            status_from_to: [{
                status: "143",
                from:new Date('2022-01-01T09:30:00'),
                to: new Date('2022-01-01T17:00:00')
            },{
                status: "12",
                from: new Date('2022-02-01T09:32:00'),
                to: new Date('2022-02-01T18:00:00')
            },{
                status: "123",
                from: new Date('2022-03-01T08:00:00'),
                to: new Date('2022-03-01T16:00:00')
            }]
        },{
            id: "4",
            name: "Roxas",
            status_from_to: [{
                status: "Busy",
                from:new Date('2022-01-01T09:30:00'),
                to: new Date('2022-01-01T17:00:00')
            },{
                status: "Busy1",
                from: new Date('2022-02-01T09:32:00'),
                to: new Date('2022-02-01T18:00:00')
            },{
                status: "Busy2",
                from: new Date('2022-03-01T08:00:00'),
                to: new Date('2022-03-01T16:00:00')
            }]
        }
        ]
    }

    getEmployeeStatusMini(){
        return Promise.resolve(this.getEmployeeStatusData().slice(0, 5));
    }

    getEmployeeStatus(){
        return Promise.resolve(this.getEmployeeStatusData());
    }
}