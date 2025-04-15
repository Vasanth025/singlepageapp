import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,  // <-- This makes it a standalone component
  imports: [FormsModule, CommonModule],  // <-- Manually import needed modules
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: { userId: string; password: string } = {
    userId: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (!this.user.userId || !this.user.password) {
      alert('Please fill in all fields');
      return;
    }
  
    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        console.log('Full response:', res);
        const userData = res.user || res;
        
        if (userData && (userData.userId || userData._id)) {
          console.log('Login successful, user data:', userData);
          this.auth.saveUser(userData);
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Invalid user data in response:', res);
          alert('Login successful but no valid user data received');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(err?.error?.message || 'Login failed!');
      },
    });
  }
}