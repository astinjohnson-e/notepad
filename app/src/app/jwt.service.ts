import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  token = localStorage.getItem('token') !== null ? localStorage.getItem('token') : '' ;

  constructor( private authService : AuthService, private route : Router) {
  }

  check () {
    const helper = new JwtHelperService();
    if (this.token) {
       localStorage.setItem('token', this.token);
       const decodedToken = helper.decodeToken(this.token);
       const expirationDate = helper.getTokenExpirationDate(this.token);
       const isExpired = helper.isTokenExpired(this.token);
       localStorage.setItem('isUserLoggedIn', isExpired ? "false" : "true" );
       if (isExpired) {
          this.authService.logout();
          window.location.reload();
       }
    }
  }
}
