import { Component, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-chat-widget',
  imports: [Button, Dialog, Textarea],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.scss',
})
export class ChatWidgetComponent {
  readonly open = signal(false);
  readonly draft = signal('');

  toggle(): void {
    this.open.update((v) => !v);
  }

  onVisibleChange(visible: boolean): void {
    this.open.set(visible);
  }
}
