import { Routes } from '@angular/router';
import { ContactFormComponent } from './features/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContactFormComponent },
];