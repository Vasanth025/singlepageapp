import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: "./login.component.html",
  styleUrls:["./login.component.css"],
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
        this.auth.saveUser(res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(err?.error?.message || 'Login failed!');
      },
    });
  }
}
