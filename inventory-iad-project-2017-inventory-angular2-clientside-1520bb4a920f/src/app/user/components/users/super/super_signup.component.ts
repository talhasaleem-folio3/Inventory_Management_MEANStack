import {Component} from '@angular/core';
import {SignupServices} from "../../../../services/signup.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_signup',
    templateUrl: '../../../templates/users/super/super_signup.component.html',
    styleUrls: ['../../../stylesheets/users/super/super_signup.component.css'],
    providers: [SignupServices]
})
export class SuperSignupComponent {
    username: string;
    // value:string;
    //
    // constructor(private  service: SignupServices) {
    //   this.service.signup("talhasaleem", "12345", "Talha", "Saleem", "CEO", 450000, 0, 1).subscribe(val => {
    //     this.value = val;
    //   });
    //   console.log(this.value)
    // }
    message: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private signUpService: SignupServices, private dataService: DataService) {
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
   onclick add  the new user into the employee
   */
    addUser(Username, Password, Firstname, lastname, designation, Salary, Sales, Branch_id) {
        this.signUpService.signup(Username, Password, Firstname, lastname, designation, Salary, Sales, Branch_id).subscribe(data => {

            if (data[0].status === 200) {

            }
            else if (data[0].status === 204) {
                // No such username
                this.message = 'No such username';

            }
        }, error => {
            if (error.status === 400) {
                // Invalid Password
                this.message = 'Invalid Password';
            }

            else if (error.status === 404) {
                // No such user
                this.message = 'No such user';

            }
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
