import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubmitContactFormRequest } from '../Models/submit-contact-form.model';

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  constructor(private http: HttpClient) {}

  submitContactForm(submitContactFormRequest: SubmitContactFormRequest): Observable<any> {
    return this.http.post('/contact-form', submitContactFormRequest);
  }
}
