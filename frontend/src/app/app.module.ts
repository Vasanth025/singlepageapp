import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { HttpClientModule } from '@angular/common/http'; // Required for AuthService

import { AppRoutingModule } from './app-routing.module'; // Import the routing module
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule // Add the routing module here
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }