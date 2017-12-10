import {Component} from '@angular/core';
import {BranchesServices} from '../../../services/branches.service';
import {Router} from '@angular/router';
import {DataService} from '../../../services/dataService.service';
@Component({
  selector: 'all_branches',
  templateUrl: '../../templates/branches/super_all_branches.component.html',
  styleUrls: ['../../stylesheets/branches/super_all_branches.component.css'],
  providers: [BranchesServices]
})

export class SuperAllBranchesComponent {
    branch: Branch[];
    username: string;
   public branchRow: Branch;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor (private branchesService: BranchesServices, private router: Router, private dataService: DataService) {
    this.username = this.dataService.username;
    this.username = localStorage.getItem("username");
    this.branchesService.getAllBranches().subscribe(data => {
      this.branch = data;
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
   delete branch from branch table
   */
    deleteBranchid(i) {
    this.branchesService.deleteBranch(i.branch_id).subscribe(data => {
      location.reload();
    });
   }
  /*
   Edit branch on click and get all the information of particular branch in argument
   */
  editBranch(i) {
    localStorage.setItem("branch", JSON.stringify(i));
    this.dataService.data = i ;
    this.router.navigate(['/super_edit_branch']);

  }
  /*
   On click select the particular branch and get the information of it
   */
  branchSelect(i){
   this.dataService.branch_id = i.branch_id;
    localStorage.setItem("branchid",i.branch_id);
    location.reload();
    this.router.navigate(['/branch_companies']);
  }

  /*
   logout method remove the localstorage variable
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
interface Branch {
  branch_id: number;
  branch_name: string;
  branch_phone: string;
  branch_address: string;
  accounts_id: number;
}
