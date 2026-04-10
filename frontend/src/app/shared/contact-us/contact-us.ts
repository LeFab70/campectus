import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';

type ContactFeedback = 'idle' | 'ok' | 'err';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule, Button, Card, InputText, Message, Textarea],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss',
})
export class ContactUsComponent {
  readonly fullName = signal('');
  readonly email = signal('');
  readonly phone = signal('');
  readonly subject = signal('');
  readonly message = signal('');

  readonly feedback = signal<ContactFeedback>('idle');
  readonly errorText = signal<string | null>(null);

  readonly hours = [
    { label: 'Lundi – Vendredi', value: '09h00 – 17h00' },
    { label: 'Samedi', value: 'Sur rendez-vous' },
    { label: 'Dimanche', value: 'Fermé' },
  ] as const;

  submit(): void {
    this.errorText.set(null);
    const nameOk = this.fullName().trim().length >= 2;
    const emailOk = this.email().trim().includes('@');
    const subjectOk = this.subject().trim().length >= 3;
    const msgOk = this.message().trim().length >= 10;
    if (!nameOk) {
      this.feedback.set('err');
      this.errorText.set('Indiquez votre nom complet (au moins 2 caractères).');
      return;
    }
    if (!emailOk) {
      this.feedback.set('err');
      this.errorText.set('Entrez une adresse courriel valide.');
      return;
    }
    if (!subjectOk) {
      this.feedback.set('err');
      this.errorText.set('Entrez un sujet (au moins 3 caractères).');
      return;
    }
    if (!msgOk) {
      this.feedback.set('err');
      this.errorText.set('Votre message doit contenir au moins 10 caractères.');
      return;
    }
    this.feedback.set('ok');
    this.fullName.set('');
    this.email.set('');
    this.phone.set('');
    this.subject.set('');
    this.message.set('');
  }
}

