import {Component, OnInit} from '@angular/core';
import {BranchesServices} from '../../../services/branches.service';
import {DataService} from '../../../services/dataService.service';
import {Router} from "@angular/router";

@Component({
  selector: 'super_edit_branch',
  templateUrl: '../../templates/branches/super_edit_branch.component.html',
  styleUrls: ['../../stylesheets/branches/super_edit_branch.component.css'],
  providers: [BranchesServices]
})

export class SuperEditBranchComponent  {
  branch: string;
  branche: Branch;
  arr: any;
  message: string;
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private branchesService: BranchesServices, private dataService: DataService, private router: Router) {


    this.branch = localStorage.getItem("branch");
    this.branche = JSON.parse(this.branch);
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
   add branch into branch table
   */
  branchadd(branchname, branchphonenumber, branchaddress, account_id) {
    this.branchesService.editBranchDetail(this.branche.branch_id, branchname, branchphonenumber, branchaddress, account_id).subscribe(data => {
      if (data[0].status === 200) {

      } else if (data[0].status === 500) {
        this.message = 'Internal Server Error';
      }
    }, error => {
      if (error.status === 204) {
        this.message = 'Account doesnot exist First create Account ';
      }
    });
    location.reload();
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
interface Branch {
  branch_id: number;
  branch_name: string;
  branch_phone: string;
  branch_address: string;
  accounts_id: number;
}
