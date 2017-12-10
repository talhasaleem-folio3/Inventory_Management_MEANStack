import {Component} from '@angular/core';
import {InvoicesServices} from "../../../../services/invoices.service";
import {Data, Router} from "@angular/router";
import {DataService} from "../../../../services/dataService.service";

@Component({
    selector: 'super_view_invoice',
    templateUrl: '../../../templates/invoices/super/super_view_invoice.component.html',
    styleUrls: ['../../../stylesheets/invoices/super/super_view_invoice.component.css'],
    providers: [InvoicesServices]
})
export class SuperViewInvoiceComponent {
    invoice: Invoice;
    username: string;
  /*
   this interface is use to catch the data from service and show in that format
   */
    constructor(private invoiceService: InvoicesServices, private dataService: DataService, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.invoiceService.getAllBranchInvoices().subscribe(data => {
            this.invoice = data;
        });
    }
  /*
   delete the invoice on click to particular invoice
   */
    deleteInvoice(i) {
        this.invoiceService.deleteInvoice(i.invoice_id).subscribe(data => {
        });
        location.reload();
    }
  /*
   on click to the invoice get the information and stringify it and store it on local storage
   */
    getInvoiceId(i){
        localStorage.setItem("invoiceid", JSON.stringify(i));
        this.router.navigate(['/super_invoice_detail']);

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
