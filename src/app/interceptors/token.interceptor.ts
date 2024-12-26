import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class tokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token almacenado en el localStorage
    if(typeof localStorage !== "undefined"){
      const token = localStorage.getItem('token');

      // Clonar la solicitud y añadir el token al encabezado si existe
      if (token) {
        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedRequest);
      }
    }
    

    // Si no hay token, enviar la solicitud original
    return next.handle(req);
  }
}
