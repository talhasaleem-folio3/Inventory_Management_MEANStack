import {Component} from '@angular/core';
import {DataService} from "../../../../services/dataService.service";
import {StockOrderServices} from "../../../../services/stock_order.service";
import {InvoicesServices} from "../../../../services/invoices.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_add_order',
    templateUrl: '../../../templates/stock_order/super/super_add_order.component.html',
    styleUrls: ['../../../stylesheets/stock_order/super/super_add_order.component.css'],
    providers: [StockOrderServices, InvoicesServices]
})
export class SuperAddOrderComponent {
    username: string;
    stockdata: StockData[] = [];
    stockarray: StockArray[] = [];
    total: any = 0;
    total_price: number = 0;
    message: number = 0;
    quantity: number = 0;
    date: any = new Date();

    constructor(private router: Router, private invoiceService: InvoicesServices, private stockOrder: StockOrderServices, private dataService: DataService) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
    }

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

    add(branchid, product_id, product_qty) {
        console.log(product_id + '  ' + product_qty);
        this.invoiceService.getBranchProductsAvailablity(branchid, product_id, 0).subscribe(data => {
            this.total = product_qty * data.unit_price;
            this.quantity = this.quantity + parseInt(product_qty);
            console.log(data.unit_price + ' s ');
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

    addtostock(x, y) {
        this.stockOrder.orderNewStock(x, y, this.stockdata, this.quantity).subscribe(data => {
        });
        location.reload();
    }

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
interface StockArray {
    product_id: number;
    product_name: string;
    product_qty: number;
    product_unitprice: number;
    product_totalprice: number;
}
interface StockData {
    product_id: number;
    quantity: number;
    unit_price: number;
    total_price: number;
}
