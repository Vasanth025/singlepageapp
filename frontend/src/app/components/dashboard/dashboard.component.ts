import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', // Ensure this path is correct
  styleUrls: ['./dashboard.component.css']  // Ensure this path is correct
})
export class DashboardComponent implements OnInit {
  user: any;
  loading = true;
  records: any[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getUser();

    // simulate API delay
    setTimeout(() => {
      if (this.user.role === 'Admin') {
        this.records = [
          { userId: 'bob', role: 'General User' },
          { userId: 'alice', role: 'Admin' },
        ];
      } else {
        this.records = [{ userId: this.user.userId, role: this.user.role }];
      }
      this.loading = false;
    }, 2000);
  }

  logout() {
    this.auth.logout();
  }
}
