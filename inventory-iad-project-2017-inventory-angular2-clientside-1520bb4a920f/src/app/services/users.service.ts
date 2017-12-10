import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersServices {
  constructor(private http: Http) {
    console.log('Users Services Initialized');
  }

  viewAllUsers(b_id: number) {

    let url = 'http://localhost:3000/users';

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

  viewUser(username: string) {

    let url = 'http://localhost:3000/users/' + username;

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.get(url, options)
      .map(res => res.json());
  }


  deleteUser(username: string) {

    let url = 'http://localhost:3000/users/' + username + '/delete';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    return this.http.delete(url, options)
        .map(res => res.json());
  }

  editUserDetail(username: string, first_name: string, last_name: string, designation: string, salary: number, sales: number) {

    let url = 'http://localhost:3000/users/' + username + '/edit';

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});

    let jsonsend = {
      first_name: first_name,
      last_name: last_name,
      designation: designation,
      salary: salary,
      sales: sales
    };

    return this.http.patch(url, jsonsend, options)
        .map(res => res.json());
  }
}
