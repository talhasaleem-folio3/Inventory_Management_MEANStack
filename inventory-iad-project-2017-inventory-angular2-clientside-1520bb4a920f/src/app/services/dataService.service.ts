import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";

@Injectable()
export class DataService {
  public user: User;
  public data: any;
  public username: string;
  public productdetail: Products;
  public branch_id: number;
  public loggedIn = false;
  public designation = false;
  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }


  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        '/login',
        JSON.stringify({ email, password }),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
interface User {
  username: string;
  first_name: string;
  last_name: string;
  designation: string;
  salary: number;
  sales: number;
  branch_id: number;
}
interface Products {
  product_id: number;
  product_name: string;
  product_weight: string;
  product_quantity: number;
  product_unitprice: number;
  product_totalprice: number;
  company_id: number;
}

