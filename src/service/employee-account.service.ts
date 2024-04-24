import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private baseUrlAPI = `${environment.apiUrl}`;

    constructor(private http: HttpClient){}

    getAccountsData(): Observable<any>{
        return this.http.get<any>(`${this.baseUrlAPI}users`);
    }

    login(email: string, password: string):Observable<any>{
        return this.http.post(`${this.baseUrlAPI}login`, {email, password});
    }

    submitAccount(first_name: string, last_name: string, email: string, position: string, password: string, role: string){
        console.log(first_name, last_name, email, position, password, role)
    }

}