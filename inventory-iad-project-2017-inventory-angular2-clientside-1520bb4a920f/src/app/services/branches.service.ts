import {Component , Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BranchesServices {
  constructor(private http: Http) {
    console.log('Branches Services Initialized');
  }
  // Add required methods here
  getAllBranches() {
    let url = 'http://localhost:3000/branches';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }

  createNewBranch(b_id: number, b_name: string, b_phn: string, b_add: string, b_acc: number) {
    let url = 'http://localhost:3000/branches/create';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_id: b_id,
      branch_name: b_name,
      branch_phone: b_phn,
      branch_address: b_add,
      accounts_id: b_acc
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }

  getManagerBranch(b_id: number) {
    let url = 'http://localhost:3000/branches/' + b_id;

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }

  deleteBranch(b_id: number) {

    let url = 'http://localhost:3000/branches/' + b_id + '/delete';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
        .map(res => res.json());
  }

  editBranchDetail(b_id: number, b_name: string, b_phn: string, b_add: string, a_id: number) {

    let url = 'http://localhost:3000/branches/' + b_id + '/edit';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      branch_name: b_name,
      branch_phone: b_phn,
      branch_address: b_add,
      accounts_id: a_id
    };

    return this.http.patch(url, jsonsend, options)
        .map(res => res.json());
  }
}
