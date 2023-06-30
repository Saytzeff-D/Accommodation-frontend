import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NodeServerService } from '../services/node-server.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth_token:any = ''
  constructor(public server: NodeServerService) {
    server.auth_token.subscribe(jwt=>{
      if (jwt == '') {
        this.auth_token = localStorage.getItem('JWT')
      } else {
        this.auth_token = jwt
      }
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({setHeaders: {Authorization: 'Bearer ' + this.auth_token}})
    return next.handle(request);
  }
}
