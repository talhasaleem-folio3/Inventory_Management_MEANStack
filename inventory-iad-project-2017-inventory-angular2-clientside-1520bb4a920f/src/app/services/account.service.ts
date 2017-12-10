import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountServices {
  constructor(private http: Http) {
    console.log('Account Services Initialized');
  }

  getAccounts(branchid: number){

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let url = 'http://localhost:3000/accounts';

    let jsonsend = {
      "branch_id":branchid
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  createAccount(accountid: number, cash: number) {

    let url = 'http://localhost:3000/accounts/create';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      "account_id":accountid,
      "cash":cash
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  deleteAccount(accountid: number) {

    let url = 'http://localhost:3000/accounts/' + accountid + '/delete';
    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
        .map(res => res.json());
  }

  addCash(accountid: number, cash: number) {

    let url = 'http://localhost:3000/accounts/addcash';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      "account_id":accountid,
      "cash":cash
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  withDrawCash(accountid: number, cash: number) {

    let url = 'http://localhost:3000/accounts/withdrawcash';
    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      "account_id":accountid,
      "cash":cash
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

}
