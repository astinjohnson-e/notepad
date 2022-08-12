import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit, OnDestroy {
  title = 'Currency Converter';
  products: any = [];
  code: any = [];
  country: any = [];
  value: any;

  constructor(private httpClient: HttpClient, private jwtService : JwtService) { }
  ngOnInit() {
    this.httpClient.get("assets/countries.json").subscribe(data => {
      this.products = data;
      this.products.countries.country.forEach((element: { currencyCode: string; countryName: string; }) => {
        if (element.currencyCode != "" && element.countryName != "" ) {
          this.code.push(element.currencyCode);
          this.country.push(element.countryName);
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.jwtService.check(); 
  }
  currencyForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
    amount : new FormControl('', [Validators.required, Validators.pattern('[0-9 ]*')]),
  });
  
  form(){
    let myHeaders = new Headers();
    myHeaders.append("apikey", "GEXQ95F6V8LtPjpz81Ok52UxARi1tqij");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };    

  fetch(`https://api.apilayer.com/fixer/convert?to=${this.currencyForm.value.to}&from=${this.currencyForm.value.from}&amount=${this.currencyForm.value.amount}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      this.value = JSON.parse(result).result;
    })
    .catch(error => console.log('error', error));
  }

  get amount() {
    return this.currencyForm.get('amount');
  }

}


