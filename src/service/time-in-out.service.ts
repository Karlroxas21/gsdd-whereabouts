import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeInOutService {
  private baseUrlAPI = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  timeIn(user_Id: string, time_in: Date): Observable<any> {
    return this.http.post(`${this.baseUrlAPI}time_in`, { user_Id, time_in });
  }

  timeOut(time_out_Id: string, time_out: Date): Observable<any> {
    return this.http.put(`${this.baseUrlAPI}time_out/${time_out_Id}`, {
      time_out,
    });
  }

  getTotalTime(time_out_Id: string): Observable<any> {
    return this.http.get(`${this.baseUrlAPI}total_time/${time_out_Id}`);
  }

  setTotalTime(time_out_Id: string, total_time: string): Observable<any> {
    return this.http.put(`${this.baseUrlAPI}set_total_time/${time_out_Id}`, {
      total_time,
    });
  }

  isTimeIn(user_Id: string | null): Observable<any> {
    return this.http.get(`${this.baseUrlAPI}check_time_in_today/${user_Id}`);
  }

  isTimeOut(user_Id: string | null): Observable<any> {
    return this.http.get(`${this.baseUrlAPI}check_time_out_today/${user_Id}`);
  }
}
