import {Component} from '@angular/core';
import {UsersServices} from "../../../../services/users.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'manager_all_user',
    templateUrl: '../../../templates/users/manager/manager_all_user.component.html',
    styleUrls: ['../../../stylesheets/users/manager/manager_all_user.component.css'],
    providers: [UsersServices]
})
export class ManagerAllUsersComponent {
    username: string;
    user: User;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private userService: UsersServices, private dataService: DataService) {
        this.username = localStorage.getItem("username");
        this.userService.viewAllUsers(parseInt(localStorage.getItem("branchid"))).subscribe(data => {
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
   delete the employee from employee table
   */
    deleteEmployee(i) {
        this.userService.deleteUser(i.username).subscribe(data => {
        });
        location.reload();
    }
  /*
   add the employee into employee table
   */
    addEmployee() {
        this.router.navigate(['/manager_signup']);
    }
  /*
   edit the employee info and store it's information into the argument
   */
    editEmployee(User) {
        localStorage.setItem("userinfo", JSON.stringify(User));
        this.router.navigate(['/manager_edit_detail']);
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

