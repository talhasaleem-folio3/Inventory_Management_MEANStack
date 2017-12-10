import {Component} from '@angular/core';
import {BranchCompaniesServices} from "../../../services/branch_companies.service";
import {Router} from "@angular/router";
import {DataService} from "../../../services/dataService.service";

@Component({
  selector: 'branch_companies',
  templateUrl: '../../templates/branches/branch_companies.component.html',
  styleUrls: ['../../stylesheets/branches/branch_companies.component.css'],
  providers: [BranchCompaniesServices]
})
export class BranchCompaniesComponent {
  company: Company;
  username: string;
  comp: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private branch2companies: BranchCompaniesServices, private router: Router, private dataService: DataService) {
    this.username = localStorage.getItem("username");
    this.branch2companies.getBranchCompanies(parseInt(localStorage.getItem("branchid"))).subscribe(data => {
      localStorage.setItem("companyinfo", JSON.stringify(data));
    });
    this.comp = localStorage.getItem("companyinfo");
    this.company = JSON.parse(this.comp);

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
   on click to the particular company get the company id , which is use to show it's product
   */
  getCompanyid(i) {
    this.dataService.data = i;
    localStorage.setItem("companyid", i);
    location.reload();
    this.router.navigate(['/branch_products']);
  }
  /*
   on click to the particular company get the company id and delete the particular company from it's branch
   */
  deleteCompanyid(i) {
    this.branch2companies.removeBranchCompany(parseInt(localStorage.getItem("branchid")), i).subscribe(data => {
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
/*
 this interface is use to catch the data from service and show in that format
 */
interface Company {
  company_id: string;
  company_name: string;
  company_phone: string;
  company_address: string;
}

