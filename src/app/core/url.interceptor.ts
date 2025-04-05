import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../assets/config/config';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if (req.url.includes('/contact-form')) {
      const clonedRequest = req.clone({
        url: `${CONFIG.contactFormServiceUrl}${req.url}`
      });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
