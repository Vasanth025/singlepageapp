import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // Required for *ngIf, *ngFor, and routerLink
  templateUrl: './dashboard.components.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  loading = true;
  records: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // Get user data from AuthService
    const userData = this.auth.getUser();
    
    // Parse if user data is a string (from localStorage)
    this.user = typeof userData === 'string' ? JSON.parse(userData) : userData;

    // Load records immediately without delay
    this.loadRecords();
    this.loading = false;
  }

  private loadRecords() {
    if (this.user?.role === 'Admin') {
      this.records = [
        { userId: 'bob', role: 'General User' },
        { userId: 'alice', role: 'Admin' },
      ];
    } else {
      this.records = [{
        userId: this.user?.userId || 'N/A',
        role: this.user?.role || 'Unknown'
      }];
    }
  }

  logout() {
    this.auth.logout();
    // Note: You might want to navigate to the login page here
    // Inject Router and add: this.router.navigate(['/login']);
  }
}
