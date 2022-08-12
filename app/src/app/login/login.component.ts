import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {

  userName!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    window.location.reload();
  }

  formData = new FormGroup({
    userName: new FormControl(("astin"), [Validators.required, this.customValidator]),
    password: new FormControl("astin"),
  });

  customValidator(control:AbstractControl){

    const value = control.value;

    if ( value == "astin") {
        return {invalid : false};
    }

    return {invalid : true};
}

  onClickSubmit(data: any) {

    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
      .subscribe(data => {
        console.log("Is Login Success: " + data);

        if (data) {
          this.router.navigate(['/notes']);
        }
      });
  }
}

