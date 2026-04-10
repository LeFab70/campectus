import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  imports: [RouterLink, FormsModule, Button, Card, InputText, Password],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLoginComponent {
  readonly email = signal('');
  readonly password = signal('');

  submit(): void {
    // Connexion JWT / Spring Security — phase backend
  }
}
