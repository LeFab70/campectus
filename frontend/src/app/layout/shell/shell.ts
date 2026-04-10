import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { ChatWidgetComponent } from '../../shared/chat-widget/chat-widget';
import { NewsletterSignupComponent } from '../../shared/newsletter-signup/newsletter-signup';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, Menubar, ChatWidgetComponent, NewsletterSignupComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent {
  readonly navItems = signal<MenuItem[]>([
    { label: 'Accueil', routerLink: '/', routerLinkActiveOptions: { exact: true } },
    { label: 'Information', routerLink: '/information' },
    { label: 'Inscription', routerLink: '/inscription' },
    { label: 'Emploi', routerLink: '/emploi' },
    { label: 'Campagne de financement', routerLink: '/financement' },
    { label: 'Contact', routerLink: '/contact' },
  ]);
}
