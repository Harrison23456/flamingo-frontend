import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserwebService {

  private baseUrl = 'http://localhost:3000/api/sala';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/mis-salas`);
  }

  create(sala: any) {
    return this.http.post(`${this.baseUrl}/crear-sala`, sala);
  }

  update(id: string, sala: any) {
    return this.http.put(`${this.baseUrl}/mis-salas/${id}`, sala);
  }

  getAlldos() {
    return this.http.get<any[]>(`${this.baseUrl}/salas`);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/mis-salas/${id}`);
  }
}
