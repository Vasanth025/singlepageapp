import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';  // for error handling

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http:HttpClient, private router: Router) {}

  // User registration
  signup(data: { userId: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      catchError(this.handleError)  // Handle any error from the HTTP request
    );
  }

  // User login
login(data: { userId: string; password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, data);
}

saveUser(user: any): void {
  if (user && (user.userId || user._id)) {
    console.log('Saving user to localStorage:', user);
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    console.error('Cannot save invalid user:', user);
    throw new Error('Invalid user object');
  }
}

// Retrieve user info
getUser(): any | null {
  const userStr = localStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
}

  // Logout user
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Optional: get user role
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  // Error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error for debugging
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
