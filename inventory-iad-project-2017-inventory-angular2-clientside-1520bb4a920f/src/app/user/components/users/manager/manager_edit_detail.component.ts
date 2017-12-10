import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UsersServices} from "../../../../services/users.service";

@Component({
    selector: 'manager_edit_detail',
    templateUrl: '../../../templates/users/manager/manager_edit_detail.component.html',
    styleUrls: ['../../../stylesheets/users/manager/manager_edit_detail.component.css'],
    providers: [UsersServices]
})
export class ManagerEditDetailComponent {
    username: string;
    user: User;
    userinfo: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private userService: UsersServices, private router: Router) {
        this.username = localStorage.getItem("username");
        this.userinfo = localStorage.getItem("userinfo");
        this.user = JSON.parse(this.userinfo);
    }
  /*
   edit into employee information
   */
    editEmployee(username, firstname, lastname, designation, salary, sales) {
        this.userService.editUserDetail(username, firstname, lastname, designation, salary, sales).subscribe(data => {
        });
      location.reload();
    }
  /*
   designation method route to the specific page after checking the designation of CEO,Manager,Employee
   */
    designation() {
        console.log('designation');
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
/*
 this interface is use to catch the data from service and show in that format
 */
interface User {
    username: string;
    first_name: string;
    last_name: string;
    designation: string;
    salary: string;
    slaes: string;
}
