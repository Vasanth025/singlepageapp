// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
// user.service.ts
@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'http://localhost:3000/api/users';
  
    constructor(private http: HttpClient, private auth: AuthService) {}
  
    //get all users
    getAllUsers() {
      return this.http.get(`${this.apiUrl}/admin/users`, {
        headers: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
  
    //get current user
    getCurrentUser() {
      return this.http.get(`${this.apiUrl}/me`, {
        headers: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }
  }