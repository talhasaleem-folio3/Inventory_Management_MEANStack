import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsServices {
  constructor(private http: Http) {
    console.log('Products Services Initialized');
  }

  getCompanyProducts(c_id: number) {
    let url = 'http://localhost:3000/all_companies/' + c_id + '/products';
    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});
    let jsonsend = {
      companyid: c_id
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }


  addCompanyProducts(p_id: number, p_name: string, p_wg: string, p_price: number, c_id: number) {

    let url = 'http://localhost:3000/all_companies/' + c_id + '/products/add_product';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      product_id: p_id,
      product_name: p_name,
      product_weight: p_wg,
      unit_price: p_price,
      companyid: c_id,
    };

    return this.http.post(url, jsonsend, options)
        .map(res => res.json());
  }


  getCompanyProductDetail(p_id: number, c_id: number) {

    let url = 'http://localhost:3000/all_companies/' + c_id + '/products/' + p_id;

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }

  deleteCompanyCompany(c_id: number, p_id: number) {

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let url = 'http://localhost:3000/all_companies/' + c_id + '/products/' + p_id + '/delete';

    return this.http.delete(url, options)
        .map(res => res.json());
  }

  editCompanyProductDetail(c_id: number, p_id: number, p_name: string, p_wg: string, p_price: number) {

    let url = 'http://localhost:3000/all_companies/' + c_id + '/products/' + p_id + '/edit';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      product_name: p_name,
      product_weight: p_wg,
      unit_price: p_price
    };

    return this.http.patch(url, jsonsend, options)
        .map(res => res.json());
  }
}
