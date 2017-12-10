import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupServices {
  constructor(private http: Http) {
    console.log('Signup Services Initialized');
  }


  signup(username: string, password: string, fn: string, ln: string, des: string, sal: number, sales:number, b:number){

    let header : Headers = new Headers({
      'Content-type':'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("myToken")
    });

    let options = new RequestOptions({headers: header});


    let url = 'http://localhost:3000/signup';

    let jsonsend = {
      username: username,
      password: password,
      first_name: fn,
      last_name: ln,
      designation: des,
      salary: sal,
      sales: sales,
      branchid: b
    };

    return this.http.post(url, jsonsend, options)
      .map(res => res.json());
  }
}
