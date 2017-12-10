import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../../services/dataService.service";

@Component({
  selector: 'dash_employee',
  templateUrl: '../../templates/dashboards/dashboard_employee.component.html',
  styleUrls: ['../../stylesheets/dashboards/dashboard_employee.component.css']
})
export class DashboardEmployeeComponent {
  username: string;
  user: User;
  userinfo: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private router: Router, private dataService: DataService) {
    this.userinfo = localStorage.getItem("aboutuser");
    this.user = JSON.parse(this.userinfo);
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
   logout method remove the all localstorage variable
   */

  Logout() {
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
/*
 this interface is use to catch the data from service and show in that format
 */
interface User {
  username: string;
  first_name: string;
  last_name: string;
  designation: string;
  salary: number;
  sales: number;
  branch_id: number;
}

