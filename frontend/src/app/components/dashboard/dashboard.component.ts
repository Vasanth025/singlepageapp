import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service'; // Add UserService
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.components.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  user: any;
  loading = true;
  records: any[] = [];
  error: string | null = null;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get user data 
    const userData = this.auth.getUser();
    this.user = typeof userData === 'string' ? JSON.parse(userData) : userData;

    this.loadRecords();
  }

  private loadRecords() {
    if (this.user?.role === 'Admin') {
      this.userService.getAllUsers().subscribe({
        next: (users: any) => {
          this.records = users;
          this.loading = false;
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    } else {
      
      this.userService.getCurrentUser().subscribe({
        next: (userDetails: any) => {
          this.records = [userDetails]; 
          this.loading = false;
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    }
  }

  private handleError(err: any) {
    this.error = 'Failed in fetching user records';
    this.loading = false;
    console.error('Error fetching user data:', err);
    
    this.records = [{
      userId: this.user?.userId || 'Unknown',
      role: this.user?.role || 'Unknown'
    }];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}