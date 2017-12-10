import { Component } from '@angular/core';
import {DataService} from "../../services/dataService.service";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: '../templates/home.component.html',
  styleUrls: ['../stylesheets/home.component.css'],
})
export class HomeComponent {
  /*
   constructor is use to call the service and share the data throughout the project.
   */
  constructor(private router: Router, private dataService: DataService){
    if (localStorage.getItem("loggedIn") === 'true'){
      if (localStorage.getItem("designation") === 'CEO') {
        this.router.navigate(['/superDashboard']);
      }
      if (localStorage.getItem("designation") === 'Manager') {
        this.router.navigate(['/managerDashboard']);
      }
      if (localStorage.getItem("designation") === 'Employee') {
        this.router.navigate(['/employeeDashboard']);
      }
    }

  }
}
