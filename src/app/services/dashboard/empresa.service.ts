import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl = 'http://localhost:3000/api/empresa';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.baseUrl}/mis-empresas`);
  }

  create(company: any) {
    return this.http.post(`${this.baseUrl}/crear-empresa`, company);
  }

  update(id: string, company: any) {
    return this.http.put(`${this.baseUrl}/mis-empresas/${id}`, company);
  }

  getAlldos() {
    return this.http.get<any[]>(`${this.baseUrl}/empresas`);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/mis-empresas/${id}`);
  }

  
}
