import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BranchCompaniesServices {
  constructor(private http: Http) {
    console.log('Branch Companies Services Initialized');
  }

  getBranchCompanies(b_id: number) {

    let url = 'http://localhost:3000/branches/companies';

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

  addBranchCompany(b_id: number, c_id: number) {

    let url = 'http://localhost:3000/branches/companies/addcompany';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      b_id: b_id,
      company_id: c_id
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  removeBranchCompany(b_id: number, c_id: number) {

    let url = 'http://localhost:3000/branches/companies/removecompany';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      b_id: b_id,
      company_id: c_id
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }
}
