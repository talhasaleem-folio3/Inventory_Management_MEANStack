import {Component} from '@angular/core';
import {AccountServices} from "../../../../services/account.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_view_accounts',
    templateUrl: '../../../templates/accounts/super/super_view_accounts.component.html',
    styleUrls: ['../../../stylesheets/accounts/super/super_view_accounts.component.css'],
    providers: [AccountServices]
})
export class SuperViewAccountsComponent {
    username: string;
    account: Account[];
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private  service: AccountServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.service.getAccounts(0).subscribe(act => {
            this.account = act;
        });
    }
  /*
   delete account delete the account completely
   */
    deleteAccount(i) {
        this.service.deleteAccount(i.account_id).subscribe(data => {
        });
        console.log(i);
        location.reload();
    }
  /*
   edit account use to edit the details of account
   */
    editAccount(i,j) {
        this.dataService.data = i;
      console.log(i+ ' '+j);
      if(j == 'wc'){ localStorage.setItem("cond", 'false'); }
      if(j == 'ac'){ localStorage.setItem("cond", 'true');}
        localStorage.setItem("accountinfo", JSON.stringify(i));
        this.router.navigate(['/super_account_detail']);
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

  }s
}

interface Account {
    account_id: number;
    cash: number;
}
