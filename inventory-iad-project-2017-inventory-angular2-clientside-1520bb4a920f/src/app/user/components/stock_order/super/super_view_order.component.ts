import {Component} from '@angular/core';
import {DataService} from "../../../../services/dataService.service";
import {StockOrderServices} from "../../../../services/stock_order.service";
import {Router} from "@angular/router";

@Component({
    selector: 'super_view_order',
    templateUrl: '../../../templates/stock_order/super/super_view_order.component.html',
    styleUrls: ['../../../stylesheets/stock_order/super/super_view_order.component.css'],
    providers: [StockOrderServices]
})
export class SuperViewOrderComponent {
    username: string;
    stock: Stock ;
  /*
   constructor is use to call the service and share the data throughout the project.
   */
    constructor(private dataService: DataService, private orderStock: StockOrderServices, private router: Router) {
        this.username = this.dataService.username;
        this.username = localStorage.getItem("username");
        this.orderStock.viewAllStockOrders(parseInt(localStorage.getItem("branchid"))).subscribe(data => {
            this.stock = data;
        });
    }
  /*
   get the order id onclick and store all the info of order in argument
   */
    getorderid(i){
        localStorage.setItem("orderid", JSON.stringify(i));

        this.router.navigate(['/super_order_detail']);
    }
  /*
   onclick delete the order and decrease the stock
   */
    deleteOrder(i) {
        this.orderStock.deleteOrderdetail(i).subscribe(data => {
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

interface Stock {
    order_id: number;
    quantity: number;
    totalprice: number;
    branch_id: number;
}
