import {Component} from '@angular/core';
import {InvoicesServices} from "../../../../services/invoices.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'employee_invoice_create',
    templateUrl: '../../../templates/invoices/employee/employee_invoice_create.component.html',
    styleUrls: ['../../../stylesheets/invoices/employee/employee_invoice_create.component.css'],
    providers: [InvoicesServices]
})
export class EmployeeInvoiceCreateComponent {
    username: string;
    invoicedata: Invoicedata[] = [];
    invoicearray: InvoiceArray[] = [];
    total: any = 0;
    total_price: number = 0;
    message: number = 0;
    quantity: number = 0;
    date: any = new Date();
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private invoiceService: InvoicesServices, private router: Router, private dataService: DataService) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
    }
  /*
   Add the products into invoice table
   */
    add(product_id, product_qty) {
        this.invoiceService.getBranchProductsAvailablity(parseInt(localStorage.getItem("branchid")), product_id, product_qty).subscribe(data => {
            this.total = product_qty * data.unit_price;
            this.quantity = this.quantity + parseInt(product_qty);

            if (data.status === 400) {
                this.message = data.json;
            }
            this.total_price = this.total_price + this.total;
            this.invoicearray.push({
                product_id: product_id,
                product_name: data.product_name,
                product_qty: product_qty,
                product_unitprice: data.unit_price,
                product_totalprice: this.total
            });
            this.invoicedata.push({
                productid: product_id,
                quantities: product_qty,
                product_unit_price: data.unit_price
            });
            this.message = this.total_price;
        });
    }
  /*
   Add the complete table into the invoice,which increase account amount and sales of the particular employee which generate the invoice and decrease the product
   quantity.
   */
    addtoinvoice(i) {
        this.invoiceService.createNewInvoice(i, new Date() + '', parseInt(localStorage.getItem("branchid")), this.invoicedata, this.total_price, this.quantity, localStorage.getItem("username")).subscribe(data => {
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
interface InvoiceArray {
    product_id: number;
    product_name: string;
    product_qty: number;
    product_unitprice: number;
    product_totalprice: number;
}
/*
 this interface is use to catch the data from service and show in that format
 */
interface Invoicedata {
    productid: number;
    quantities: number;
    product_unit_price: number;
}
