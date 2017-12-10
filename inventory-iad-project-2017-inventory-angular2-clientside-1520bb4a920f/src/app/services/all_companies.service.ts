import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AllCompaniesServices {

  constructor(private http: Http) {
    console.log('All Companies Services Initialized');
  }

  getAllCompanies() {

    let url = 'http://localhost:3000/all_companies';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }

  createCompany(c_id: number, c_name: string, c_phn: string, c_add: string) {

    let url = 'http://localhost:3000/all_companies/create';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      "company_id": c_id,
      "company_name": c_name,
      "company_phone": c_phn,
      "company_address": c_add
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  getCompanyDetail(c_id: number) {

    let url = 'http://localhost:3000/all_companies/' + c_id;

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }


  deleteCompany(c_id: number) {

    let url = 'http://localhost:3000/all_companies/' + c_id + '/delete';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
        .map(res => res.json());
  }

  editCompanyDetail(c_id: number, c_name: string, c_phn: string, c_add: string) {

    let url = 'http://localhost:3000/all_companies/' + c_id + '/edit';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      companyid: c_id,
      company_name: c_name,
      company_phone: c_phn,
      company_address: c_add
    };

    return this.http.patch(url, jsonsend, options)
        .map(res => res.json());
  }

}
