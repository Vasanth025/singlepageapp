import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http:HttpClient, private router: Router) {}

  //user signup
  signup(data: { userId: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data).pipe(
      catchError(this.handleError)  // Handle any error from the HTTP request
    );
  }

//login user
login(data: { userId: string; password: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/login`, data).pipe(
    tap((response: any) => {
      
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        this.saveUser(response.user);
      }
    }),
    catchError(this.handleError)
  );
}

getToken(): string | null {
  return localStorage.getItem('token');
}

//user logout
logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
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

//get user data
getUser(): any | null {
  const userStr = localStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error('Error parsing user data:', e);
    return null;
  }
}


  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); 
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
