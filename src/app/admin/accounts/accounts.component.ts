import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { Account } from 'src/domain/employee-account';
import { AccountService } from 'src/service/employee-account.service';
import { Table } from 'primeng/table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
    @ViewChild('dtaccounts') dt!: Table;

    account!: Account[];

    accounts!: Account;

    clonedAccounts: { [s: string]: Account } = {};

    selectedAccounts!: Account[];

    verifyOption!: SelectItem[];

    roleOption!: SelectItem[];

    addAccountVisibility!: boolean;

    addAccountForm = new FormGroup({
        first_name: new FormControl(''),
        last_name: new FormControl(''),
        position: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        role: new FormControl(''),
    });

    positions!: SelectItem[];
    
    constructor(
        private accountService: AccountService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit() {
        this.getAccounts();

        this.verifyOption = [
            { label: 'Not verified', value: false },
            { label: 'Verified', value: true },
        ];

        this.roleOption = [
            { label: 'Administrator', value: 'admin' },
            { label: 'User', value: 'user' },
        ];

        this.positions = [
            {label: 'Information Technology Officer II', value: 'IT Officer 1'},
            {label: 'Information Technology Officer II', value: 'IT Officer 2'},
            {label: 'Information System Analyst I', value: 'IS Analyst 1'},
            {label: 'Information System Analyst II', value: 'IS Analyst 2'},
            {label: 'Information System Analyst III', value: 'IS Analyst 3'},
            {label: 'Computer Programmer I', value: 'CP 1'},
            {label: 'Computer Programmer II', value: 'CP 2'},
            {label: 'Computer Programmer III', value: 'CP 3'},
            {label: 'Information System Researcher I', value: 'IS Researcher 1'},
            {label: 'Information System Researcher II', value: 'IS Researcher 2'},
        ]
    }

    getAccounts() {
        this.accountService.getAccountsData().subscribe((data) => {
            this.account = data;
        });
    }

    onRowEditInit(account: Account) {
        this.clonedAccounts[account.Id] = { ...account };
    }

    onRowEditSave(account: Account) {
        if (
            account.first_name === '' ||
            account.last_name === '' ||
            account.position === '' ||
            account.email === '' ||
            account.password === '' ||
            account.role === '' ||
            account.verified === false
        ) {
            delete this.clonedAccounts[account.Id];
            this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: 'Invalid',
            });
        }
        this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Account is updated',
        });
    }

    onRowEditCancel(account: Account, index: number) {
        this.account[index] = this.clonedAccounts[account.Id];
        delete this.clonedAccounts[account.Id];
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    clear(table: Table) {
        table.clear();
    }

    deleteSelectedAccounts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.account = this.account.filter(
                    (val) => !this.selectedAccounts.includes(val),
                );
                this.selectedAccounts = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Accounts Deleted',
                    life: 3000,
                });
            },
        });
    }

    showAddAccountDialog() {
        this.addAccountVisibility = true;
    }

    submitAccount(){
       this.accountService.submitAccount(
        this.addAccountForm.value.first_name ?? '',
        this.addAccountForm.value.last_name ?? '',
        this.addAccountForm.value.email ?? '',
        this.addAccountForm.value.position ?? '',
        this.addAccountForm.value.password ?? '',
        this.addAccountForm.value.role ?? '',
       )
    }
}
