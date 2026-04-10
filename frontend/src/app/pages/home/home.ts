import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';

import { NewsletterSignupComponent } from '../../shared/newsletter-signup/newsletter-signup';
import { HOME_HERO_BANNER } from '../../data/home-hero';
import { HOME_PARTNERS, type HomePartner } from '../../data/home-partners';

export interface StatModel {
  readonly end: number;
  readonly suffix: string;
  readonly label: string;
  /** Classe PrimeIcons (ex. pi pi-users). */
  readonly icon: string;
}

export interface HighlightModel {
  readonly title: string;
  readonly text: string;
  /** Classe PrimeIcons (ex. pi pi-sitemap). */
  readonly icon: string;
}

@Component({
  selector: 'app-home',
  imports: [Button, Card, Tag, RouterLink, NewsletterSignupComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly heroBanner = HOME_HERO_BANNER;

  private static readonly PARTNERS_PER_PAGE = 4;

  readonly partnersReferenceImage = 'assets/partners/camp-ectus-partners-reference.png';

  readonly partnerChunks = computed(() => {
    const list = HOME_PARTNERS as readonly HomePartner[];
    const n = HomeComponent.PARTNERS_PER_PAGE;
    const chunks: HomePartner[][] = [];
    for (let i = 0; i < list.length; i += n) {
      chunks.push([...list.slice(i, i + n)]);
    }
    return chunks;
  });

  readonly partnerSlide = signal(0);

  readonly currentPartnerChunk = computed(() => {
    const slides = this.partnerChunks();
    const i = this.partnerSlide();
    return slides[i] ?? [];
  });

  readonly partnerAtStart = computed(() => this.partnerSlide() <= 0);

  readonly partnerAtEnd = computed(() => {
    const slides = this.partnerChunks();
    return slides.length === 0 || this.partnerSlide() >= slides.length - 1;
  });

  readonly partnerSlideLabel = computed(() => {
    const slides = this.partnerChunks();
    if (slides.length === 0) {
      return '';
    }
    return `Groupe ${this.partnerSlide() + 1} sur ${slides.length}`;
  });

  partnersPrev(): void {
    this.partnerSlide.update((i) => Math.max(0, i - 1));
  }

  partnersNext(): void {
    const max = Math.max(0, this.partnerChunks().length - 1);
    this.partnerSlide.update((i) => Math.min(max, i + 1));
  }

  readonly statsSection = viewChild<ElementRef<HTMLElement>>('statsSection');

  readonly statModels: readonly StatModel[] = [
    {
      end: 30000,
      suffix: '+',
      label: 'Campeurs et campeuses depuis 1961',
      icon: 'pi pi-users',
    },
    {
      end: 700,
      suffix: '+',
      label: 'Employés étudiants depuis 1961',
      icon: 'pi pi-graduation-cap',
    },
    {
      end: 26,
      suffix: '',
      label: 'Acres sur la baie des Chaleurs',
      icon: 'pi pi-map',
    },
    {
      end: 13,
      suffix: '',
      label: 'Bâtiments et locaux',
      icon: 'pi pi-building',
    },
    {
      end: 1800,
      suffix: '',
      label: 'Campeurs et campeuses en saison',
      icon: 'pi pi-sun',
    },
    {
      end: 21,
      suffix: '',
      label: 'Emplois saisonniers (85 % étudiants)',
      icon: 'pi pi-briefcase',
    },
  ];

  /** Valeurs affichées (animation compteur). */
  readonly statValues = signal<number[]>([0, 0, 0, 0, 0, 0]);

  readonly summaryIntroPillars = [
    { label: 'Bénévoles', icon: 'pi pi-heart' },
    { label: 'Organismes', icon: 'pi pi-building-columns' },
    { label: 'Familles', icon: 'pi pi-home' },
  ] as const;

  readonly highlights = signal<HighlightModel[]>([
    {
      title: 'Fonctionnement décentralisé',
      text: 'Chaque équipe est responsable de sa programmation.',
      icon: 'pi pi-sitemap',
    },
    {
      title: 'Méthode pédagogique',
      text: 'Chaque enfant participe à la planification, l’organisation, la réalisation et l’évaluation de ses activités.',
      icon: 'pi pi-list-check',
    },
  ]);

  private statsAnimationStarted = false;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const root = this.statsSection()?.nativeElement;
      if (!root) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          const hit = entries.some((e) => e.isIntersecting);
          if (hit) {
            observer.disconnect();
            this.startStatsAnimation();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(root);
    });
  }

  formatStat(index: number): string {
    const n = this.statValues()[index] ?? 0;
    const suffix = this.statModels[index]?.suffix ?? '';
    const formatted = n.toLocaleString('fr-CA').replace(/\u202f/g, '\u00a0');
    return `${formatted}${suffix}`;
  }

  navigate(path: string, queryParams?: Record<string, string>): void {
    if (queryParams && Object.keys(queryParams).length > 0) {
      void this.router.navigate([path], { queryParams });
    } else {
      void this.router.navigateByUrl(path);
    }
  }

  private startStatsAnimation(): void {
    if (this.statsAnimationStarted) {
      return;
    }
    this.statsAnimationStarted = true;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.statValues.set(this.statModels.map((m) => m.end));
      return;
    }

    const duration = 1400;
    const staggerMs = 95;
    const startWall = performance.now();

    const frame = (now: number) => {
      const models = this.statModels;
      const next = models.map((m, i) => {
        const elapsed = now - startWall - i * staggerMs;
        if (elapsed <= 0) {
          return 0;
        }
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - (1 - t) ** 3;
        return Math.round(m.end * eased);
      });

      this.statValues.set(next);

      const finished = models.every((m, i) => next[i] >= m.end);
      if (!finished) {
        requestAnimationFrame(frame);
      } else {
        this.statValues.set(models.map((m) => m.end));
      }
    };

    requestAnimationFrame(frame);
  }
}
