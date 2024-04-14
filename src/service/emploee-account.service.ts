import { Injectable } from "@angular/core";

@Injectable()
export class AccountService {
    getAccountsData(){
        return [
            {
                id: '1',
                name: 'Karl Marx',
                verified: true,
                current_status: 'In meeting',
                position: 'Information Tecnology Officer II',
                role: 'admin',
                email: 'karl@karl.com'
            },
            {
                id: '2',
                name: 'Thea',
                verified: true,
                current_status: 'Do not disturb',
                position: 'Information Tecnology Officer III',
                role: 'admin',
                email: 'karl@karl.com'
            }
        ]
    }

    getAccountsMini(){
        return Promise.resolve(this.getAccountsData().slice(0,5));
    }

    getAccounts(){
        return Promise.resolve(this.getAccountsData());
    }
}