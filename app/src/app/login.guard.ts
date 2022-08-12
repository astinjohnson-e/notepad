import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Route, UrlSegment, CanActivateChild, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
   providedIn: 'root'
})
export class LoginGuard implements CanActivate {

   constructor(private authService: AuthService, private router: Router) { }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;

      return this.checkLogin(url);
   }

   checkLogin(url: string): true | UrlTree {
      console.log("Url: " + url)
      let val: string | null = localStorage.getItem('isUserLoggedIn');

      if (val != null && val == "true") {
         if (url == "/login")
            this.router.parseUrl('/notes');
         else
            return true;
      }
      else if ( val != null && val == "false" ) { 

         alert("Session expired Please login ");
         
      }
      else if ( val == null ) {
         if (url == "/logout") {
            alert("logged out")
         }
         else {
            alert ("Please login to use the page");
         }     
      }
      return this.router.parseUrl('/login');
   }
}