import {Component} from '@angular/core';
import {StockOrderServices} from "../../../../services/stock_order.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/dataService.service";

@Component({
  selector: 'manager_view_order',
  templateUrl: '../../../templates/stock_order/manager/manager_view_order.component.html',
  styleUrls: ['../../../stylesheets/stock_order/manager/manager_view_order.component.css'],
  providers: [StockOrderServices]
})
export class ManagerViewOrderComponent {
  order: Order;
  username: string;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private router: Router, private stockorder: StockOrderServices, private dataService: DataService) {
    this.username = this.dataService.username;
    this.username = localStorage.getItem("username");
    this.stockorder.viewAllStockOrders(parseInt(localStorage.getItem("branchid"))).subscribe(data => {
      this.order = data;
    });
  }
  /*
  get the order info
   */
  viewOrder(i) {
    localStorage.setItem("orderid", JSON.stringify(i));

    this.router.navigate(['/manager_order_detail']);
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
   onclick delete to particular order
   */
  deleteOrder(i) {
    this.stockorder.deleteOrderdetail(i).subscribe(data => {
    });
    location.reload();
  }
/*
onclick route to the stock add page
 */
  addStock() {
    this.router.navigate(['/manager_add_order']);
  }
  /*
   logout method remove the all localstorage variable
   */
  Logout() {
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
interface Order {
  order_id: number;
  branch_id: number;
  total_price: number;
  quantity: number;
}
interface Stockorder {
  product_id: number;
  product_name: string;
  product_unit_price: number;
  product_quantity: number;
  product_total_price: number;
}
