import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SignupServices} from "../../../../services/signup.service";

@Component({
    selector: 'manager_signup',
    templateUrl: '../../../templates/users/manager/manager_signup.component.html',
    styleUrls: ['../../../stylesheets/users/manager/manager_signup.component.css'],
    providers: [SignupServices]
})
export class ManagerSignupComponent {
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private userService: SignupServices) {
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
   add the user in employee table
   */
    addUser(Username, Password, Firstname, lastname, designation, Salary, Sales, Branch_id) {
        this.userService.signup(Username, Password, Firstname, lastname, designation, Salary, Sales, Branch_id).subscribe(data => {
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
