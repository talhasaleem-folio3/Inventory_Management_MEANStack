import {Component} from '@angular/core';
import {DataService} from "../../../../services/dataService.service";
import {AccountServices} from "../../../../services/account.service";
import {Route, Router} from "@angular/router";

@Component({
    selector: 'super_account_detail',
    templateUrl: '../../../templates/accounts/super/super_account_detail.component.html',
    styleUrls: ['../../../stylesheets/accounts/super/super_account_detail.component.css'],
    providers: [AccountServices]
})
export class SuperAccountDetailComponent {
    message: string;
    account: Account;
    accounts: string;
    username: string;
    condition: string = localStorage.getItem("cond");
  /*
  constructor is use to call the service and share the data throughout the project.
   */
    constructor(private accountService: AccountServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.account = this.dataService.data;
        this.accounts = localStorage.getItem("accountinfo");
        this.account = JSON.parse(this.accounts);
        console.log(this.account.cash);
    }
  /*
   designation method route to the specific page after checking the designation of CEO,Manager,Employee
   */
    designation() {

        if (localStorage.getItem("designation") === 'Manager') {
            this.router.navigate(['/managerDashboard']);
        }
        if (localStorage.getItem("designation") === 'CEO') {
            this.router.navigate(['/superDashboard']);
        }
        if (localStorage.getItem("designation") === 'Employee') {
            this.router.navigate(['/employeeDashboard']);
        }
    }
    /*
    edit account method add the account cash
     */
    editAccount(cash) {
        console.log(cash);
        this.accountService.addCash(this.account.account_id, parseInt(cash)).subscribe(data => {
            //console.log(data[0].status);

            if (data[0].status === 200) {
                console.log('Branch Updated');
            } else if (data[0].status === 500) {
                this.message = 'Internal Server Error';
                console.log('Internal Server Error');
            }
        }, error => {
            if (error.status === 204) {
                this.message = 'Account doesnot exist First create Account ';
                console.log('Account doesnot exist');
            }
        });
     location.reload();
    }
    /*
    withdraw method withdraw the cash from the account
     */
  withdrawAccount(cash){
    console.log(cash);
    this.accountService.withDrawCash(this.account.account_id, parseInt(cash)).subscribe(data => {
    });
    location.reload();
  }
/*
logout method remove the localstorage variable
 */
  Logout()
  {
    localStorage.removeItem("myToken");
    localStorage.removeItem("aboutuser");
    localStorage.removeItem("designation");
    localStorage.removeItem("branchid");
    localStorage.removeItem("username");
    localStorage.removeItem("accountinfo");
    localStorage.removeItem("companyinfo");
    localStorage.removeItem("companyid");
    localStorage.removeItem("branch");
    localStorage.removeItem("invoiceid");
    localStorage.removeItem("orderid");
    localStorage.removeItem("userinfo");

  }
}

interface Account {
    account_id: number;
    cash: number;
}
