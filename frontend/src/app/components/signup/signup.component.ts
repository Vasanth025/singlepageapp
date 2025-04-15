import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,  // Enable standalone mode
  imports: [FormsModule, CommonModule],  // Import required modules
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    userId: '',
    password: '',
    role: 'General User',  // Default role
  };

  // Available roles for selection
  roles = ['General User', 'Admin', 'Editor']; // Add/modify as needed

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    if (!this.user.userId || !this.user.password) {
      alert('Please fill in all required fields');
      return;
    }

    this.auth.signup(this.user).subscribe({
      next: (res) => {
        alert('Signup successful!');
        this.router.navigate(['/login']);  // Redirect to login after signup
      },
      error: (err) => {
        console.error('Signup error:', err);
        alert(err.error?.message || 'Signup failed!');
      },
    });
  }
}