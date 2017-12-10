import {Component} from '@angular/core';
import {InvoicesServices} from "../../../../services/invoices.service";
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
    selector: 'manager_view_invoice',
    templateUrl: '../../../templates/invoices/manager/manager_view_invoice.component.html',
    styleUrls: ['../../../stylesheets/invoices/manager/manager_view_invoice.component.css'],
    providers: [InvoicesServices]
})
export class ManagerViewInvoiceComponent {
    invoice: Invoice;
    username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private invoiceServices: InvoicesServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.invoiceServices.getBranchInvoices(parseInt(localStorage.getItem("branchid"))).subscribe(data => {
            this.invoice = data;
        });
    }
  /*
   which delete  the invoice
   */
  deleteInvoice(i) {
    this.invoiceServices.deleteInvoice(i.invoice_id).subscribe(data => {
    });
    location.reload();
  }
  /*
   get the invoice id and all it's info
   */
  getInvoiceId(i){
    localStorage.setItem("invoiceid", JSON.stringify(i));
    this.router.navigate(['/manager_invoice_detail']);
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
    invoice_id: number;
    invoice_date: string;
    total_price: number;
    total_item: number;
    branch_id: number;
}
