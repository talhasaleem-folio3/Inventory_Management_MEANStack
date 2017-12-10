// import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
// import {Injectable} from "@angular/core";
// import {Observable} from "rxjs/Observable";
// import {AuthService} from "./auth.service";
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService , private router: Router) {
//
//   }
//
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     return this.authService.
//     map(authinfo => authinfo.isLoggedIn()).take(1).do(allowed => {
//       if(!allowed) {
//         this.router.navigate(['/login']);
//       }
//     })
//    }
// }
