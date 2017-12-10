import {Component} from '@angular/core';
import {ProductsServices} from "../../../services/products.service";
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_edit_products',
    templateUrl: '../../templates/products/super_edit_products.component.html',
    styleUrls: ['../../stylesheets/products/super_edit_products.component.css'],
    providers: [ProductsServices]
})
export class SuperEditProductsComponent {
    products: Products;
    product: string;
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private productService: ProductsServices, private dataService: DataService) {
        this.product = localStorage.getItem("productinfo");
        this.products = JSON.parse(this.product);
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        console.log(this.products.product_name);
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
   edit the product onclick
   */
    editProduct(product_name, product_weight, product_unitprice) {
        console.log('sdfds' + this.products.company_id + this.products.product_id);
        this.productService.editCompanyProductDetail(this.products.company_id, this.products.product_id, product_name, product_weight, product_unitprice).subscribe(data => {
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
/*
 this interface is use to catch the data from service and show in that format
 */
interface Products {
    product_id: number;
    product_name: string;
    product_weight: string;
    product_unitprice: number;
    company_id: number;
}


