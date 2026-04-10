import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-newsletter-signup',
  imports: [FormsModule, Button, InputText, Message],
  templateUrl: './newsletter-signup.html',
  styleUrl: './newsletter-signup.scss',
})
export class NewsletterSignupComponent {
  /** Bandeau sombre (footer) ou claire (section page). */
  readonly variant = input<'dark' | 'light'>('dark');

  /**
   * `stacked` : colonnes empilées et champs pleine largeur (page Information).
   * `horizontal` : mise en ligne large écran (footer, accueil).
   */
  readonly layout = input<'horizontal' | 'stacked'>('horizontal');

  readonly email = signal('');
  readonly feedback = signal<'idle' | 'ok' | 'err'>('idle');

  submit(): void {
    const e = this.email().trim();
    if (!e.includes('@') || e.length < 5) {
      this.feedback.set('err');
      return;
    }
    this.feedback.set('ok');
    this.email.set('');
  }
}
