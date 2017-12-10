import {Component} from '@angular/core';
import {BranchesServices} from '../../../services/branches.service';
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
  selector: 'super_add_branches',
  templateUrl: '../../templates/branches/super_add_branches.component.html',
  styleUrls: ['../../stylesheets/branches/super_add_branches.component.css'],
  providers: [BranchesServices]
})
export class SuperAddBranchesComponent {
  message: string;
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private branchesService: BranchesServices, private dataService: DataService, private router: Router) {
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
   add branch into the branch table
   */
  branchadd(branchid, branchname, branchphonenumber, branchaddress, account_id) {

    this.branchesService.createNewBranch(branchid, branchname, branchphonenumber, branchaddress, account_id).subscribe(data => {
      this.router.navigate(['/all_branches']);
      // location.reload();
    //   if (data.status === 201) {
    //     this.message = 'Branch Created';
    //     console.log('Branch Created');
    //   }
    // }, error => {
    //   if (error.status === 400) {
    //     this.message = 'Account doesnot exist First create Account or Branch id already exist';
    //     console.log('Account doesnot exist');
    //   }
    });
    location.reload();
  }

  /*
   logout method remove the localstorage variable
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

