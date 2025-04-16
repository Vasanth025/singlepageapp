import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: { userId: string; password: string } = {
    userId: '',
    password: '',
  };
  loading = false;
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (!this.user.userId || !this.user.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = null;

    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        console.log('Login successful, response:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = err.error?.message || 'Login failed. Please try again.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}