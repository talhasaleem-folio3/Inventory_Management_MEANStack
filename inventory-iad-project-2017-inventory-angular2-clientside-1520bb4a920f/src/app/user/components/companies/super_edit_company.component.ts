import {Component} from '@angular/core';
import {DataService} from "../../../services/dataService.service";
import {AllCompaniesServices} from "../../../services/all_companies.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_edit_company',
    templateUrl: '../../templates/companies/super_edit_company.component.html',
    styleUrls: ['../../stylesheets/companies/super_edit_company.component.css'],
    providers: [AllCompaniesServices]
})
export class SuperEditCompanyComponent {
    company: Company;
    username: string;
    comp: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private  router: Router, private dataService: DataService, private companies: AllCompaniesServices) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.comp = localStorage.getItem("companyinfo");
        this.company = JSON.parse(this.comp);
    }
  /*
   edit into the company info which change in all company info
   */
    editCompany(companyname, companyphone, companyaddress) {
        this.companies.editCompanyDetail(parseInt(this.company.company_id), companyname, companyphone, companyaddress).subscribe(data => {
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
interface Company {
    company_id: string;
    company_name: string;
    company_phone: string;
    company_address: string;
}
