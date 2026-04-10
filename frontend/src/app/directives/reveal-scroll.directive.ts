import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
  output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Ajoute une apparition douce au scroll : l’élément commence légèrement décalé / transparent,
 * puis la classe `ce-reveal-visible` est appliquée une fois qu’il entre dans le viewport.
 */
@Directive({
  selector: '[ceRevealScroll]',
  standalone: true,
  host: {
    class: 'ce-reveal',
  },
})
export class CeRevealScrollDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  /** Émis une seule fois à la première apparition (ex. lancer d’autres animations). */
  readonly revealed = output<void>();

  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    if (!isPlatformBrowser(this.platformId)) {
      host.classList.add('ce-reveal-visible');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.classList.add('ce-reveal-visible');
      return;
    }

    this.io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          host.classList.add('ce-reveal-visible');
          this.revealed.emit();
          this.io?.disconnect();
          this.io = undefined;
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    this.io.observe(host);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
