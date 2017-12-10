import {Component} from '@angular/core';
import {ProductsServices} from '../../../services/products.service';
import {DataService} from "../../../services/dataService.service";
import {Router} from "@angular/router";
@Component({
    selector: 'super_all_products',
    templateUrl: '../../templates/products/super_all_products.component.html',
    styleUrls: ['../../stylesheets/products/super_all_products.component.css'],
    providers: [ProductsServices]
})
export class SuperAllProductsComponent {
    product: Products[];
    username: string;
    flag: any;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private productService: ProductsServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.flag = this.dataService.data;
        this.flag = localStorage.getItem("companyid");
        this.productService.getCompanyProducts(this.flag).subscribe(data => {

            this.product = data;
        });
    }
  /*
   Edit the product from the particular company and it's argument store the information
   */
    editProduct(i) {
        localStorage.setItem("productinfo", JSON.stringify(i));
        this.router.navigate(['/super_edit_products']);
    }
  /*
   delete the product from the particular company
   */
    deleteProduct(i) {

        this.productService.deleteCompanyCompany(this.dataService.data, i.product_id).subscribe(data => {
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
interface Products {
    product_id: number;
    product_name: string;
    product_weight: string;
    product_quantity: number;
    product_unitprice: number;
    product_totalprice: number;
    company_id: number;
}

