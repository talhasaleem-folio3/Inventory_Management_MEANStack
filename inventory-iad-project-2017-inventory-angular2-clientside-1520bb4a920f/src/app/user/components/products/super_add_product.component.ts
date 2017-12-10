import { Component } from '@angular/core';
import {ProductsServices} from '../../../services/products.service';
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
  selector: 'super_add_product',
  templateUrl: '../../templates/products/super_add_product.component.html',
  styleUrls: ['../../stylesheets/products/super_add_product.component.css'],
  providers: [ProductsServices]
})
export class SuperAddProductComponent {
    username: string;
  message: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor (private router: Router, private ProductService: ProductsServices, private dataService: DataService) {
      this.username = this.dataService.username;
      this.username = localStorage.getItem("username");
  }
  /*
   add the product to the company product
   */
  addProduct( product_id, product_name, product_weight, unit_price) {

     this.ProductService.addCompanyProducts(product_id, product_name, product_weight, unit_price, this.dataService.data).subscribe(data => {
      if (data[0].status === 201) {

        this.message = 'Product added successfully';
      } else if (data[0].status === 204) {
        // No such username
        this.message = 'No such username';
      }
    }, error => {
      if (error.status === 400) {
        // Invalid Password
        this.message = 'Product not added , Product_id not unique';
      } else if (error.status === 404) {
        // No such user
        this.message = 'No such user';
      }
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
