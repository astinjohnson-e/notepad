import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-logout',
   templateUrl: './logout.component.html',
   styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

   constructor(private authService : AuthService, private router: Router) { 
   }
   ngOnDestroy(): void {
      window.location.reload();
   }

   ngOnInit() {
      localStorage.clear();
      this.authService.logout();
      this.router.navigate(['']);
   }

}
