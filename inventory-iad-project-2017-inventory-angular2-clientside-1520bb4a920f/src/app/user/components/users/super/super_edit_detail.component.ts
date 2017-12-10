import {Component} from '@angular/core';
import {UsersServices} from "../../../../services/users.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";


@Component({
    selector: 'super_edit_detail',
    templateUrl: '../../../templates/users/super/super_edit_detail.component.html',
    styleUrls: ['../../../stylesheets/users/super/super_edit_detail.component.css'],
    providers: [UsersServices]
})
export class SuperEditDetailComponent {
    username: string;
    user: User;
    userinfo: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private userService: UsersServices, private dataService: DataService) {
        this.userinfo = localStorage.getItem("employeeinfo");
        this.user = this.dataService.data;
        this.user = JSON.parse(this.userinfo);
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
   onclick edit the user info
   */
    editEmployee(username, firstname, lastname, designation, salary, sales) {
        this.userService.editUserDetail(username, firstname, lastname, designation, salary, sales).subscribe(data => {
        });
      location.reload();
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
 */interface User {
    username: string;
    first_name: string;
    last_name: string;
    designation: string;
    salary: string;
    slaes: string;
}
