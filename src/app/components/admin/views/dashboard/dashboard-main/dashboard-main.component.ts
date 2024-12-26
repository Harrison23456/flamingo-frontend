import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent {
  hasAccess = false;

  constructor(private authVerification: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authVerification.verifyUser().subscribe(
      (res) => {
        if (res.valid) {
          this.hasAccess = true;
        } else {
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        console.error(err);
        this.router.navigate(['/login']);
      }
    );
  }
  
  onLogout(): void {
    // Limpia el token del localStorage o sesión
    localStorage.removeItem('token');
    // Redirige al login
    this.router.navigate(['/login']);
  }
}
