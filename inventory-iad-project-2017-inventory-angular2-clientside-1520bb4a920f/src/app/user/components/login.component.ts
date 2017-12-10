import {Component, OnInit} from '@angular/core';
import {LoginServices} from '../../services/login.service';
import {Router} from "@angular/router";
import {DataService} from "../../services/dataService.service";
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'login',
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../stylesheets/login.component.css'],
  styles: ['input.ng-invalid{border-left: 5px solid red;}' +
  'input.ng-valid{border-left:5px solid green;}'],
  providers: [LoginServices]
})
export class LoginComponent {
  message: string;
  designation: string;
  branch_id: number;
  username: string;
  user: User;
  token: any;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private loginService: LoginServices, private route: Router, private dataService: DataService) {
    localStorage.getItem("branchid");
  }
  /*
   onlogin check user password is valid or not if yes then login and decode the jwt comming from server and store the user information
    on local storage.
   */
  userlogin(username, password) {
    localStorage.setItem("username", username);
    this.dataService.username = localStorage.getItem("username");
// tokens receive from back end
    let jwtHelper: JwtHelper = new JwtHelper();
      //
      // this.dataService.login(username, password).subscribe((result) => {
      //   if (result) {
      //     this.route.navigate(['']);
      //   }
      // });
      //
    //method to check user or validate
    this.loginService.login(username, password).subscribe(data => {
      localStorage.setItem("myToken", data);
      this.token = jwtHelper.decodeToken(data);
      localStorage.setItem("aboutuser", JSON.stringify(this.token.val));
      localStorage.setItem("designation", this.token.val.designation);
      localStorage.setItem("branchid", this.token.val.branch_id);
      this.dataService.branch_id = this.token.val.branch_id;
      this.designation = this.token.val.designation;
      this.branch_id = this.token.val.branch_id;
      localStorage.setItem("loggedIn",'true');
        if(this.dataService.loggedIn){
          this.route.navigate(['']);
        }
        else {
          this.route.navigate(['/login']);
        }
      if (this.designation === 'CEO') {
        this.dataService.designation= true;
        this.route.navigate(['/superDashboard']);
      }
      if (this.designation === 'Manager') {
        this.dataService.designation =true;
        this.route.navigate(['/managerDashboard']);
      }
      if (this.designation === 'Employee') {
        this.dataService.designation = true;
        this.route.navigate(['/employeeDashboard']);
      }

    }, error => {
      this.route.navigate(['/login']);
      if (error.status === 400) {
        // Invalid Password
        this.message = 'Invalid Password';
      }

      else if (error.status === 404) {
        // No such user
        this.message = 'No such user';
      }
    });
  }

  /*
   logout method remove the all localstorage variable
   */
  Logout() {
    // method to remove all localStorage variable
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

