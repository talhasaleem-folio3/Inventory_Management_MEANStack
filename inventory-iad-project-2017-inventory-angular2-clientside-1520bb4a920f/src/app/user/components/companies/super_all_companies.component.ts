import {Component, Input} from '@angular/core';

import {AllCompaniesServices} from '../../../services/all_companies.service';
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
    selector: 'super_all_companies',
    templateUrl: '../../templates/companies/super_all_companies.component.html',
    styleUrls: ['../../stylesheets/companies/super_all_companies.component.css'],
    providers: [AllCompaniesServices]
})
export class SuperAllCompaniesComponent {
    company: Company[];
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private companyService: AllCompaniesServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.companyService.getAllCompanies().subscribe(data => {
            this.company = data;
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
   edit company info the argument takes all the information of company on click tp the particular company
   */
    editCompany(i) {
        this.dataService.data = i;
        localStorage.setItem("companyinfo", JSON.stringify(i));
        this.router.navigate(['/super_edit_company']);
    }
  /*
   delete company from all branches the argument  takes all the information of company on click tp the particular company
   */
    deleteCompanyid(i) {
        this.companyService.deleteCompany(parseInt(i.company_id)).subscribe(data => {
        });
        location.reload();
    }
/*
to take the company id
 */
    getCompanyid(i) {

        this.dataService.data = i;
        localStorage.setItem("companyid", i);
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
