import { Component, Input } from '@angular/core';
import { AccountService } from 'src/service/employee-account.service';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-user-button',
    templateUrl: './user-button.component.html',
    styleUrls: ['./user-button.component.css']
})
export class UserButtonComponent {
    @Input() user: any;
    visible: boolean = false;
    pinControl = new FormControl('');
    loginAttempt: number = 0;

    constructor(
        private messageService: MessageService,
        private accountService: AccountService) {

    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {

    }

    signIn() {
        const pin = this.pinControl.value;
        const first_name = this.user.first_name;
        const last_name = this.user.last_name;

        if (!pin) {
            return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Pin is required'
            });
        }

        const lastFailedLoginTime = localStorage.getItem('lastFailedLoginTime');

        if (lastFailedLoginTime) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(lastFailedLoginTime, 10);

            //If less than 20minutes show error and return
            if (timeDifference < 20 * 60 * 1000) {
                const remainingTime = Math.ceil(20 * 60 * 1000 - timeDifference / 1000);

                this.messageService.add({
                    severity: 'error',
                    summary: 'Login failed',
                    detail: `Too many login attempts. Try again in ${remainingTime} seconds`
                });
                return;
            }
        }

        this.accountService.loginTablet(first_name, last_name, pin).subscribe(
            (account) => {
                if (!account.verified) {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Login failed',
                        detail: 'Account not verified.'
                    });
                    return;
                }

                if (account.verified === 'Disabled') {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Login failed',
                        detail: 'Account is disabled. Contact your administrator'
                    });
                    return;
                }

                this.loginAttempt = 0;
                localStorage.removeItem('lastFailedLoginTime');

                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Login success'
                });

                console.log(account);
                // Navigate to MODAL

            }, (err) => {
                this.loginAttempt++;

                if (this.loginAttempt == 5) {
                    localStorage.setItem(
                        'lastFailedLoginTime',
                        new Date().getTime().toString(),
                    );

                    this.messageService.add({
                        severity: 'error',
                        summary: 'Login Failed',
                        detail: 'Too many login attempts. Try again in 20minutes'
                    });
                } else {
                    console.error(err);
                    
                this.messageService.add({
                    severity: 'error',
                    summary: 'Login Failed',
                    detail: 'User is not authenticated. Please try again'
                });
                   
                }
            }
        );

        // if (this.pinControl.value === "123") {
        //     console.log("Pin is correct!");
        //     console.log(this.user);
        //     this.visible = false;
        // } else {
        //     console.log('Pin is incorrect');
        // }
    }

    
}
