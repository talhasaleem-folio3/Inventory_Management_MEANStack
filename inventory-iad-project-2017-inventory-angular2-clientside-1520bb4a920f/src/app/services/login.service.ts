import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServices {
  constructor(private http: Http) {
    console.log('Login Services Initialized');
  }

  login(username: string, password: string){

    let url = 'http://localhost:3000/login';

    let header : Headers = new Headers({
      'Content-type':'application/json'
    });

    let jsonsend = {
      username:username,
      password:password
    };

    return this.http.post(url, jsonsend, header)
      .map(res => res.json());
  }

}
