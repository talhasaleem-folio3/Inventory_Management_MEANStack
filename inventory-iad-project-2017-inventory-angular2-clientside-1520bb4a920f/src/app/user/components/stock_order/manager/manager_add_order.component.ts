import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {StockOrderServices} from "../../../../services/stock_order.service";
import {DataService} from "../../../../services/dataService.service";
import {InvoicesServices} from "../../../../services/invoices.service";

@Component({
    selector: 'manager_add_order',
    templateUrl: '../../../templates/stock_order/manager/manager_add_order.component.html',
    styleUrls: ['../../../stylesheets/stock_order/manager/manager_add_order.component.css'],
    providers: [InvoicesServices, StockOrderServices]
})
export class ManagerAddOrderComponent {
    username: string;
    branch_id: number = parseInt(localStorage.getItem("branchid"));
    stockdata: StockData[] = [];
    stockarray: StockArray[] = [];
    total: any = 0;
    total_price: number = 0;
    message: number = 0;
    quantity: number = 0;
    date: any = new Date();
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private router: Router, private invoiceService: InvoicesServices, private stockOrder: StockOrderServices, private dataService: DataService) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");

    }
    /*
    on click to home button designation check either CEO, Manager,Employee
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
 on click to add button productid and productquantity receive and send unitprice and availablity of product
  */
    add(branchid, product_id, product_qty) {

        this.invoiceService.getBranchProductsAvailablity(branchid, product_id, product_qty).subscribe(data => {
            this.total = product_qty * data.unit_price;
            this.quantity = this.quantity + parseInt(product_qty);

            if (data.status === 400) {
                this.message = data.json;
            }
            this.total_price = this.total_price + this.total;
            this.stockarray.push({
                product_id: product_id,
                product_name: data.product_name,
                product_qty: product_qty,
                product_unitprice: data.unit_price,
                product_totalprice: this.total
            });
            this.stockdata.push({
                product_id: product_id,
                quantity: parseInt(product_qty),
                unit_price: data.unit_price,
                total_price: this.total
            });
            this.message = this.total_price;
        });
    }
/*
 on click add to stock array
  */
    addtostock(x, y) {
        this.stockOrder.orderNewStock(x, y, this.stockdata, this.quantity).subscribe(data => {
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
interface StockArray {
    product_id: number;
    product_name: string;
    product_qty: number;
    product_unitprice: number;
    product_totalprice: number;
}
/*
 this interface is use to catch the data from service and show in that format
 */
interface StockData {
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
}


