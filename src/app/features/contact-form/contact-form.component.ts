import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContactFormService } from './Services/contact-form.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [ContactFormService],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  contactForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _contactFormService: ContactFormService,
    private _snackBar: MatSnackBar
  ) {
    this.contactForm = this._formBuilder.group({});
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      let submitContactFormRequest = {
        firstName: this.contactForm.get('firstName')?.value,
        lastName: this.contactForm.get('lastName')?.value,
        email: this.contactForm.get('email')?.value,
      };

      this._contactFormService
        .submitContactForm(submitContactFormRequest)
        .pipe(
          finalize(() => {
            this.resetForm();
          })
        )
        .subscribe({
          next: () => {
            this._snackBar.open('User successfully contacted!', 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar'],
            });
          },
          error: (error) => {
            let snacbarMessage = error.error.Message || error.error;

            if (error.status === 429) {
              snacbarMessage = 'Too many requests. Please try again later.';
            }

            this._snackBar.open(snacbarMessage, 'Close', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          },
        });
    }
  }

  isFormValid(): boolean {
    return (
      this.contactForm.valid &&
      this.contactForm.get('firstName')?.value !== null &&
      this.contactForm.get('lastName')?.value !== null &&
      this.contactForm.get('email')?.value !== null
    );
  }

  private initializeForm() {
    this.contactForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(150)]],
      lastName: ['', [Validators.required, Validators.maxLength(150)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(250)],
      ],
    });
  }

  private resetForm() {
    this.contactForm.reset();
    this.contactForm.get('firstName')?.setErrors(null);
    this.contactForm.get('lastName')?.setErrors(null);
    this.contactForm.get('email')?.setErrors(null);
  }
}
