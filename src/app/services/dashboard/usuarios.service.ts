import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuario'; // Cambia esta URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-usuarios`);
  }

  // Crear usuario
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-usuario`, user);
  }

  // Actualizar usuario
  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/mis-usuarios/${userId}`, user);
  }

  // Eliminar usuario
  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/mis-usuarios/${id}`);
  }

}
