import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:["./signup.component.css"]
})
export class SignupComponent {
  user = {
    userId: '',
    password: '',
    role: 'General User',
  };

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.user).subscribe({
      next: (res) => {
        alert('Signup successful!');
        this.router.navigate(['/']);
      },
      error: (err) => alert(err.error.message || 'Signup failed!'),
    });
  }
}
