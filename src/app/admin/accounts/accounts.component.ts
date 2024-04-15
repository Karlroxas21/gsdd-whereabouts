import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem, ConfirmationService } from 'primeng/api';
import { Account } from 'src/domain/employee-account';
import { AccountService } from 'src/service/emploee-account.service';
import { Table } from 'primeng/table';

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

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.accountService.getAccounts().then((data) => {
      this.account = data;
    });

    this.verifyOption = [
      { label: 'Not verified', value: false },
      { label: 'Verified', value: true },
    ];

    this.roleOption = [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ];
  }

  onRowEditInit(account: Account) {
    this.clonedAccounts[account.id] = { ...account };
  }

  onRowEditSave(account: Account) {
    if (
      account.name === '' ||
      account.position === '' ||
      account.role === '' ||
      account.email === ''
    ) {
      delete this.clonedAccounts[account.id];
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
    this.account[index] = this.clonedAccounts[account.id];
    delete this.clonedAccounts[account.id];
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
}
