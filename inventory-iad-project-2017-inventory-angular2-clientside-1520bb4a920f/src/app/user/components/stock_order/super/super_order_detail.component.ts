import {Component} from '@angular/core';
import {DataService} from "../../../../services/dataService.service";
import {Router} from "@angular/router";
import {StockOrderServices} from "../../../../services/stock_order.service";

@Component({
  selector: 'super_order_detail',
  templateUrl: '../../../templates/stock_order/super/super_order_detail.component.html',
  styleUrls: ['../../../stylesheets/stock_order/super/super_order_detail.component.css'],
  providers: [StockOrderServices]
})
export class SuperOrderDetailComponent {
  username: string;
  order: Order[];
  so: string;
  flag: Stock;
  stock_price: number;
  stock_items: number;

  constructor(private orderStock: StockOrderServices, private dataService: DataService, private router: Router) {
    this.username = this.dataService.username;
    this.so = localStorage.getItem("orderid");
    this.flag = JSON.parse(this.so);
    this.orderStock.viewOrderDetail(this.flag.order_id).subscribe(data => {
      console.log(data.stock_price);
      this.order = data.order;
      this.stock_price = data.stock_price;
      this.stock_items = data.stock_items;
    });
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

interface Stock {
  order_id: number;
  quantity: number;
  totalprice: number;
  branch_id: number;
}

interface Order {
  order: Orderdetails;
  stock_price: number;
  stock_items: number;
}

interface Orderdetails {
  product_id: number;
  product_name: string;
  product_unit_price: number;
  product_quantity: number;
  product_total_price: number;
}
