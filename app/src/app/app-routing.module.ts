import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinComponent } from './bin/bin.component';
import { CurrencyComponent } from './currency/currency.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path : 'login', component : LoginComponent},
  { path : 'currency', component : CurrencyComponent, canActivate : [ LoginGuard ] },
  { path : 'notes', component : NotesComponent, canActivate : [ LoginGuard ]},
  { path : 'bin', component : BinComponent, canActivate : [ LoginGuard ]},
  { path : 'logout', component : LogoutComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
