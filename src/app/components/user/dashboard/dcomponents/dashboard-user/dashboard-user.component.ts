import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css'
})
export class DashboardUserComponent {
  constructor(private router: Router) {}

  onLogout(): void {
    // Limpia el token del localStorage o sesión
    localStorage.removeItem('token');
    // Redirige al login
    this.router.navigate(['/login']);
  }
}
