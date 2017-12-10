import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {InvoicesServices} from "../../../../services/invoices.service";

@Component({
    selector: 'manager_invoice_detail',
    templateUrl: '../../../templates/invoices/manager/manager_invoice_detail.component.html',
    styleUrls: ['../../../stylesheets/invoices/manager/manager_invoice_detail.component.css'],
  providers: [InvoicesServices]
})
export class ManagerInvoiceDetailComponent {
  username: string;
  invoice: Invoiceinfo[];
  invoices: string;
  flag: AboutInvoice;
  total_price: number;
  total_items: number;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private router: Router, private invoiceService: InvoicesServices) {
    this.username = localStorage.getItem("username");
    this.invoices = localStorage.getItem("invoiceid");
    this.flag = JSON.parse(this.invoices);

    this.invoiceService.getInvoiceDetail(this.flag.invoice_id).subscribe(data => {
      this.invoice = data.invoice;
      this.total_price = data.invoice_price;
      this.total_items = data.invoice_items;
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
interface Invoice {
  product_id: number;
  product_name: string;
  product_unit_price: number;
  product_quantity: number;
  product_total_price: number;
}
/*
 this interface is use to catch the data from service and show in that format
 */
interface Invoiceinfo {
  invioce: Invoice ;
  invoice_price: number;
  invoice_items: number;
}
/*
 this interface is use to catch the data from service and show in that format
 */
interface AboutInvoice {
  invoice_id: number;
  invoice_date: string;
  total_price: number;
  total_item: number;
  branch_id: number;
}
