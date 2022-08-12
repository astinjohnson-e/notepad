import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyComponent } from './currency/currency.component';
import { NotesComponent } from './notes/notes.component';
import { OutputComponent } from './output/output.component';
import { BinComponent } from './bin/bin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    NotesComponent,
    OutputComponent,
    BinComponent,
    NavBarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
