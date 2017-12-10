import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StockOrderServices {
  stock: StockData[];
  constructor(private http: Http) {
    console.log('StockOrder Services Initialized');
  }
  viewAllStockOrders(b_id: number) {
    let url = 'http://localhost:3000/stock_order/view_orders';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: b_id
  };
    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  viewOrderDetail(order: number) {

    let url = 'http://localhost:3000/stock_order/view_orders/' + order;

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }

  orderNewStock(branch_id: number, order_id: number, products: StockData[], total_qty: number) {
    let url = 'http://localhost:3000/stock_order/order';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: branch_id,
      order_id: order_id,
      products: products,
      total_quantity: total_qty
    };
    return this.http.post(url, jsonsend, options)
        .map(res => res.json());
  }

  deleteOrderdetail(order: number) {

    let url = 'http://localhost:3000/stock_order/view_orders/' + order + '/delete';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
      .map(res => res.json());
  }

  deleteAllorders() {

    let url = 'http://localhost:3000/stock_order/view_orders/delete_all';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
      .map(res => res.json());
  }
}
interface StockData {
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}
