import {Component} from '@angular/core';
import {UsersServices} from '../../../../services/users.service';
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
    selector: 'super_all_users',
    templateUrl: '../../../templates/users/super/super_all_users.component.html',
    styleUrls: ['../../../stylesheets/users/super/super_all_users.component.css'],
    providers: [UsersServices]
})
export class SuperAllUsersComponent {
    username: string;
    user: User;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private userService: UsersServices, private dataService: DataService, private router: Router) {
        this.username = localStorage.getItem("username");

        this.userService.viewAllUsers(0).subscribe(data => {
            this.user = data;
        });
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
   onclick to particular employee delete button delete the user
   */
    deleteEmployee(i) {

        this.userService.deleteUser(i.username).subscribe(data => {
        });
        location.reload();
    }
  /*
   onclick store user info in argument and stringify
   */
    editEmployee(i) {
        localStorage.setItem("employeeinfo", JSON.stringify(i));
        this.dataService.data = i;
        this.router.navigate(['/super_edit_detail']);
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
    salary: number;
    sales: number;
    branch_id: number;
}
