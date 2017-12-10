import {Component} from '@angular/core';
import {BranchProductsServices} from "../../../services/branch_products.service";
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add_branch_products',
  templateUrl: '../../templates/branches/add_branch_products.component.html',
  styleUrls: ['../../stylesheets/branches/add_branch_products.component.css'],
  providers: [BranchProductsServices]
})
export class AddBranchProductsComponent {
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private router: Router, private branchProduct: BranchProductsServices, private dataService: DataService) {
    this.username = localStorage.getItem("username");
  }
  /*
   add product to the particular company
   */
  addProduct(product_id, product_unitPrice, product_quantity) {
    this.branchProduct.addBranchCompanyProducts(parseInt(localStorage.getItem("branchid")), product_id, product_unitPrice, product_quantity).subscribe(data => {
    });
  }
  /*
   designation method route to the specific page after checking the designation of CEO,Manager,Employee
   */
  designation(){
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

