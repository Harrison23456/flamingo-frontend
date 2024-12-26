import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private apiURL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiURL}/login`, credentials);
  }

  verifyUser(): Observable<any> {
    return this.http.get(`${this.apiURL}/signin`);
  }
  
  register(user: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiURL}/register`, user);
  }
  

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
}
