import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   constructor(private http: HttpClient, private router: Router) {

   }

   isUserLoggedIn: boolean = false;

   private extractData(res: any) {
      const helper = new JwtHelperService();
      let body = res;
      if (body.valid) {
         localStorage.setItem('token', body.token);
         const decodedToken = helper.decodeToken(body.token);
         const expirationDate = helper.getTokenExpirationDate(body.token);
         const isExpired = helper.isTokenExpired(body.token);
         localStorage.setItem('isUserLoggedIn', isExpired ? "false" : "true" );
         if (isExpired) {
            this.logout;
         }
      }
      else{
         alert("invalid password or username");
         this.router.navigate(['notes']);
      }
      return body;
   }
   private handleErrorObservable(error: any) {
      console.error(error.message || error);
      return throwError(error);
   }

   login(userName: string, password: string): Observable<any> {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
         }),
      };
      return this.http.post("http://localhost:8000/signin", { "username": userName, "password": password }, httpOptions).pipe(
         catchError(this.handleErrorObservable),
         map(this.extractData)
      );
   }
   logout(): void {
      this.isUserLoggedIn = false;
   }

}
