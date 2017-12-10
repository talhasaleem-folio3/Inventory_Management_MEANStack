import {Component} from '@angular/core';
import {AllCompaniesServices} from "../../../services/all_companies.service";
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
    selector: 'super_add_company',
    templateUrl: '../../templates/companies/super_add_company.component.html',
    styleUrls: ['../../stylesheets/companies/super_add_company.component.css'],
    providers: [AllCompaniesServices]
})
export class SuperAddCompanyComponent {
    message: string = '';
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private  router: Router, private companyService: AllCompaniesServices, private dataService: DataService) {
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
   Add the company to the inventory compsny table
   */
    addcompany(companyid, companyname, companyphonenumber, companyaddress) {
        this.companyService.createCompany(companyid, companyname, companyphonenumber, companyaddress).subscribe(data => {

            if (data[0].status === 201) {
                this.message = 'Company Created';
            }
        }, error => {
            if (error.status === 400) {
                // Invalid Password
                this.message = 'Companyid is not unique';

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

