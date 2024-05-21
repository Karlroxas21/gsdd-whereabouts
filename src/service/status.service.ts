import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class StatusService{
    private baseUrlAPI = `${environment.apiUrl}`;

    constructor(private http: HttpClient){}

    getAllLatestStatus(): Observable<any>{
        return this.http.get<any>(`${this.baseUrlAPI}all_latest_status`);
    }
}