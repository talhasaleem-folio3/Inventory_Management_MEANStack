import { Component } from '@angular/core';
import {AccountServices} from "../../../../services/account.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
  selector: 'super_create_account',
  templateUrl: '../../../templates/accounts/super/super_create_account.component.html',
  styleUrls: ['../../../stylesheets/accounts/super/super_create_account.component.css'],
  styles:['input.ng-invalid{border-left: 5px solid red;}' +
  'input.ng-valid{border-left:5px solid green;}' ],
  providers: [AccountServices]
})
export class SuperCreateAccountComponent {
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private  dataService: DataService, private accoutService: AccountServices, private router: Router) {
    this.username = this.dataService.username;
    this.username = localStorage.getItem("username");
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
   add the cash into account
   */
  addAccount(account_id, cash){
    this.accoutService.createAccount(account_id, cash).subscribe(data => {
    });
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
