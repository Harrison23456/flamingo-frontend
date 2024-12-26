import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:3000/api/cliente';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/mis-clientes`);
  }

  create(company: any) {
    return this.http.post(`${this.baseUrl}/crear-cliente`, company);
  }

  update(id: string, company: any) {
    return this.http.put(`${this.baseUrl}/mis-clientes/${id}`, company);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/mis-clientes/${id}`);
  }
  
}
