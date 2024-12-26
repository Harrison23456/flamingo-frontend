import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrl: './loginadmin.component.css'
})
export class LoginadminComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (res: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', res.token);

          // Redirigir según el tipo de usuario
          if (res.user.type === 'user') {
            this.router.navigate(['/dashboard']);
          } else if (res.user.type === 'userweb') {
            this.router.navigate(['/dashboard-user']);
          }
        },
        (err) => {
          this.error = err.error.error;
        }
      );
    }
  }
}

