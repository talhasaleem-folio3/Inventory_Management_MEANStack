import {Component} from '@angular/core';
import {BranchCompaniesServices} from "../../../services/branch_companies.service";
import {Router} from "@angular/router";
import {DataService} from "../../../services/dataService.service";

@Component({
    selector: 'add_branch_companies',
    templateUrl: '../../templates/branches/add_branch_companies.component.html',
    styleUrls: ['../../stylesheets/branches/add_branch_companies.component.css'],
    providers: [BranchCompaniesServices]
})
export class AddBranchCompaniesComponent {
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private branchCompanies: BranchCompaniesServices, private router: Router, private dataService: DataService) {
        this.username = localStorage.getItem("username");
    }
  /*
   add the company into the branch
   */
    addcompany(companyid) {

        this.branchCompanies.addBranchCompany(parseInt(localStorage.getItem("branchid")), companyid).subscribe(data => {
        });
      location.reload();
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

