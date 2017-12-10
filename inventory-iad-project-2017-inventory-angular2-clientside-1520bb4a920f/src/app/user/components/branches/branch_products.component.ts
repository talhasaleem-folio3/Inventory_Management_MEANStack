import {Component} from '@angular/core';
import {BranchProductsServices} from "../../../services/branch_products.service";
import {Router} from "@angular/router";
import {DataService} from "../../../services/dataService.service";

@Component({
  selector: 'branch_products',
  templateUrl: '../../templates/branches/branch_products.component.html',
  styleUrls: ['../../stylesheets/branches/branch_products.component.css'],
  providers: [BranchProductsServices]
})
export class BranchProductsComponent {
  products: Products;
  username: string;
  pro: any;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private branchProduct: BranchProductsServices, private router: Router, private dataService: DataService) {
    this.username = localStorage.getItem("username");
    this.branchProduct.getBranchCompanyProducts(parseInt(localStorage.getItem("branchid")), parseInt(localStorage.getItem("companyid"))).subscribe(data => {
      localStorage.setItem("productinfo", JSON.stringify(data));
    });
    this.pro = localStorage.getItem("productinfo");
    this.products = JSON.parse(this.pro);
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
   delete the product from this company
   */
  deleteProduct(Product) {

    this.branchProduct.removeBranchCompanyProducts(this.dataService.branch_id, Product.product_id).subscribe(data => {
    });
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
interface Products {
  product_id: number;
  product_name: string;
  product_weight: string;
  unit_price: number;
  product_quantity: number;
  company_id: number;
}
