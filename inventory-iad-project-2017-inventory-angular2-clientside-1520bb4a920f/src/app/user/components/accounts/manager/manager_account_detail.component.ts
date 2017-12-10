import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'manager_account_detail',
  templateUrl: '../../../templates/accounts/manager/manager_account_detail.component.html',
  styleUrls: ['../../../stylesheets/accounts/manager/manager_account_detail.component.css']
})
export class ManagerAccountDetailComponent {
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
constructor(private router: Router) {this.username = localStorage.getItem("username");}
  /*
   designation method route to the specific page after checking the designation of CEO,Manager,Employee
   */
  designation() {
    this.username = localStorage.getItem("username");
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

  }
}
