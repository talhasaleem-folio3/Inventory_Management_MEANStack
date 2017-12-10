import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BranchProductsServices {
  constructor(private http: Http) {
    console.log('Branch Products Services Initialized');
  }


  getBranchCompanyProducts(b_id: number, c_id: number) {

    let url = 'http://localhost:3000/branches/companies/products';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: b_id,
      company_id: c_id
    };

    return this.http.post(url, jsonsend, options)
        .map(res => res.json());
  }

  addBranchCompanyProducts(b_id: number, p_id: number, u_price: number, p_qty: number) {

    let url = 'http://localhost:3000/branches/companies/products/addproduct';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: p_id,
      product_id: b_id,
      unit_price: u_price,
      product_quantity: p_qty
    };

    return this.http.post(url, jsonsend, options)
        .map(res => res.json());
  }


  removeBranchCompanyProducts(b_id: number, p_id: number) {

    let url = 'http://localhost:3000/branches/companies/products/removeproduct';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: p_id,
      product_id: b_id
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

}
