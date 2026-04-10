import {
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
  untracked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { Chip } from 'primeng/chip';
import { Dialog } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { Fieldset } from 'primeng/fieldset';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ProgressBar } from 'primeng/progressbar';
import { SelectButton } from 'primeng/selectbutton';
import { Tag } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { Tooltip } from 'primeng/tooltip';

import { getFakePage } from '../../data/fake-content';
import type { CampSession, FakePageKey, JobPosting } from '../../data/fake-content.types';
import { CeRevealScrollDirective } from '../../directives/reveal-scroll.directive';
import { NewsletterSignupComponent } from '../../shared/newsletter-signup/newsletter-signup';
import { ContactUsComponent } from '../../shared/contact-us/contact-us';

type WizardKind = 'inscription' | 'emploi' | 'donation';

@Component({
  selector: 'app-simple-page',
  imports: [
    FormsModule,
    CeRevealScrollDirective,
    NewsletterSignupComponent,
    ContactUsComponent,
    RouterLink,
    Button,
    Card,
    Checkbox,
    Chip,
    Dialog,
    Divider,
    Fieldset,
    IconField,
    InputIcon,
    InputText,
    Message,
    ProgressBar,
    SelectButton,
    Tag,
    Textarea,
    Tooltip,
  ],
  templateUrl: './simple-page.html',
  styleUrl: './simple-page.scss',
})
export class SimplePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  /** Barres financement : valeurs animées (0 → cible au scroll). */
  readonly animatedMainPercent = signal(0);
  readonly animatedRevenuePercents = signal<number[]>([]);
  private financeBarsAnimationPlayed = false;
  /** Évite une double ouverture du don sur /financement?don=1 (effet + navigation). */
  private donateQueryConsumed = false;

  readonly pageKey = toSignal(this.route.data.pipe(map((d) => (d['pageKey'] as string) ?? '')), {
    initialValue: '',
  });

  /** Ouvre le wizard don depuis un lien (ex. /financement?don=1). */
  private readonly donateQueryFlag = toSignal(
    this.route.queryParamMap.pipe(map((q) => q.get('don'))),
    { initialValue: null },
  );

  readonly content = computed(() => getFakePage(this.pageKey()));

  readonly showHero = computed(() => {
    const k = this.content()?.key;
    return (
      k === 'information' ||
      k === 'contact' ||
      k === 'inscription' ||
      k === 'emploi' ||
      k === 'financement'
    );
  });

  readonly financeProgress = computed(() => {
    const c = this.content();
    if (!c || c.key !== 'financement') {
      return 0;
    }
    const { raisedCad, goalCad } = c;
    if (goalCad <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((raisedCad / goalCad) * 100));
  });

  /** ——— Wizard modal ——— */
  readonly wizardOpen = signal(false);
  readonly wizardKind = signal<WizardKind | null>(null);
  readonly wizardStep = signal(0);
  readonly wizardDone = signal(false);
  readonly wizardError = signal<string | null>(null);

  readonly selectedSession = signal<CampSession | null>(null);
  readonly selectedJob = signal<JobPosting | null>(null);

  readonly inscriptionStepLabels = [
    'Session',
    'Parent / tuteur',
    'Enfant',
    'Documents',
    'Paiement',
    'Récapitulatif',
  ] as const;

  readonly emploiStepLabels = [
    'Poste',
    'Coordonnées',
    'Parcours',
    'Motivation',
    'Pièces jointes',
    'Récapitulatif',
  ] as const;

  readonly donationStepLabels = ['Montant', 'Coordonnées', 'Paiement', 'Récapitulatif'] as const;

  readonly donationPresets = [25, 50, 100, 200, 500] as const;
  private static readonly MIN_DONATION_CAD = 5;

  paymentOptions: { label: string; value: 'carte' | 'presentiel' }[] = [
    { label: 'Carte en ligne', value: 'carte' },
    { label: 'Sur place', value: 'presentiel' },
  ];

  parentPrenom = signal('');
  parentNom = signal('');
  parentEmail = signal('');
  parentPhone = signal('');

  childPrenom = signal('');
  childNom = signal('');
  childDob = signal('');

  docAck = signal<Record<string, boolean>>({});

  /** Par défaut « carte » : évite un mode null si l’utilisateur reclique sur le même bouton (SelectButton allowEmpty). */
  paymentMode = signal<'carte' | 'presentiel' | null>('carte');
  cardHolderName = signal('');
  cardNumber = signal('');
  cardExpiry = signal('');
  cardCvc = signal('');

  candPrenom = signal('');
  candNom = signal('');
  candEmail = signal('');
  candPhone = signal('');
  candExperience = signal('');
  candMessage = signal('');
  candCvFile = signal<File | null>(null);
  candLetterFile = signal<File | null>(null);

  donationAmountCad = signal<number | null>(null);
  donationCustom = signal('');
  donationPresetSelected = signal<number | null>(null);
  donorName = signal('');
  donorEmail = signal('');
  donorMessage = signal('');

  constructor() {
    effect(() => {
      const pk = this.pageKey();
      if (pk !== 'financement') {
        untracked(() => {
          this.financeBarsAnimationPlayed = false;
          this.animatedMainPercent.set(0);
          this.animatedRevenuePercents.set([]);
          this.donateQueryConsumed = false;
        });
      }
    });

    effect(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      const pk = this.pageKey();
      const don = this.donateQueryFlag();
      if (pk === 'financement' && don === '1' && !this.donateQueryConsumed) {
        untracked(() => {
          this.donateQueryConsumed = true;
          this.openDonationWizard();
          void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { don: null },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });
        });
      }
    });
  }

  readonly wizardTitle = computed(() => {
    const k = this.wizardKind();
    if (k === 'inscription') {
      const s = this.selectedSession();
      return s ? `Pré-inscription — ${s.name}` : 'Pré-inscription';
    }
    if (k === 'emploi') {
      const j = this.selectedJob();
      return j ? `Candidature — ${j.title}` : 'Candidature';
    }
    if (k === 'donation') {
      return 'Faire un don';
    }
    return '';
  });

  readonly wizardStepLabelsActive = computed(() => {
    const k = this.wizardKind();
    if (k === 'inscription') {
      return this.inscriptionStepLabels;
    }
    if (k === 'emploi') {
      return this.emploiStepLabels;
    }
    if (k === 'donation') {
      return this.donationStepLabels;
    }
    return [];
  });

  readonly wizardLastIndex = computed(() => Math.max(0, this.wizardStepLabelsActive().length - 1));

  readonly wizardProgress = computed(() => {
    const last = this.wizardLastIndex();
    if (last <= 0) {
      return 0;
    }
    return Math.round((this.wizardStep() / last) * 100);
  });

  formatCad(value: number): string {
    return `${new Intl.NumberFormat('fr-CA', { maximumFractionDigits: 0 }).format(value)}\u00a0$`;
  }

  revenueAnimatedPercent(index: number): number {
    const arr = this.animatedRevenuePercents();
    return arr[index] ?? 0;
  }

  onFinanceStatsRevealed(): void {
    const c = this.content();
    if (c?.key !== 'financement' || this.financeBarsAnimationPlayed) {
      return;
    }
    this.financeBarsAnimationPlayed = true;

    const mainTarget = this.financeProgress();
    const srcTargets = c.revenueSources.map((s) => s.percent);

    if (!isPlatformBrowser(this.platformId)) {
      this.animatedMainPercent.set(mainTarget);
      this.animatedRevenuePercents.set([...srcTargets]);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animatedMainPercent.set(mainTarget);
      this.animatedRevenuePercents.set([...srcTargets]);
      return;
    }

    this.animatedRevenuePercents.set(srcTargets.map(() => 0));
    const start = performance.now();
    const dur = 1100;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      this.animatedMainPercent.set(Math.round(mainTarget * eased));
      this.animatedRevenuePercents.set(srcTargets.map((target) => Math.round(target * eased)));
      if (t < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }

  openDonationWizard(): void {
    this.resetForms();
    this.selectedSession.set(null);
    this.selectedJob.set(null);
    this.wizardKind.set('donation');
    this.wizardStep.set(0);
    this.wizardDone.set(false);
    this.wizardError.set(null);
    this.wizardOpen.set(true);
  }

  pickDonationPreset(amount: number): void {
    this.donationPresetSelected.set(amount);
    this.donationAmountCad.set(amount);
    this.donationCustom.set('');
  }

  onDonationCustomInput(value: string): void {
    this.donationCustom.set(value);
    this.donationPresetSelected.set(null);
    const n = parseFloat(value.replace(/\s/g, '').replace(',', '.'));
    if (!Number.isNaN(n) && n >= SimplePageComponent.MIN_DONATION_CAD) {
      this.donationAmountCad.set(Math.round(n * 100) / 100);
    } else if (value.trim() === '') {
      this.donationAmountCad.set(null);
    } else {
      this.donationAmountCad.set(null);
    }
  }

  heroBadge(key: FakePageKey | undefined): string {
    switch (key) {
      case 'information':
        return 'Découvrir le camp';
      case 'contact':
        return 'Écrire au camp';
      case 'inscription':
        return 'Réserver une place';
      case 'emploi':
        return 'Rejoindre l’équipe';
      case 'financement':
        return 'Soutenir la mission';
      default:
        return '';
    }
  }

  openInscriptionWizard(session: CampSession): void {
    this.resetForms();
    this.selectedSession.set(session);
    this.selectedJob.set(null);
    this.wizardKind.set('inscription');
    this.wizardStep.set(0);
    this.wizardDone.set(false);
    this.wizardError.set(null);
    const c = this.content();
    const ack: Record<string, boolean> = {};
    if (c?.key === 'inscription') {
      for (const d of c.documentsNeeded) {
        ack[d] = false;
      }
    }
    this.docAck.set(ack);
    this.wizardOpen.set(true);
  }

  openEmploiWizard(job: JobPosting): void {
    this.resetForms();
    this.selectedJob.set(job);
    this.selectedSession.set(null);
    this.wizardKind.set('emploi');
    this.wizardStep.set(0);
    this.wizardDone.set(false);
    this.wizardError.set(null);
    this.wizardOpen.set(true);
  }

  onWizardVisibleChange(visible: boolean): void {
    this.wizardOpen.set(visible);
    if (!visible) {
      this.wizardKind.set(null);
      this.wizardStep.set(0);
      this.wizardDone.set(false);
      this.wizardError.set(null);
    }
  }

  wizardNext(): void {
    this.wizardError.set(null);
    const msg = this.wizardValidationMessage();
    if (msg) {
      this.wizardError.set(msg);
      return;
    }
    const last = this.wizardLastIndex();
    if (this.wizardStep() < last) {
      this.wizardStep.update((s) => s + 1);
    }
  }

  wizardPrev(): void {
    this.wizardError.set(null);
    if (this.wizardStep() > 0) {
      this.wizardStep.update((s) => s - 1);
    }
  }

  wizardSubmit(): void {
    this.wizardError.set(null);
    const msg = this.wizardValidationMessage();
    if (msg) {
      this.wizardError.set(msg);
      return;
    }
    this.wizardDone.set(true);
  }

  setDocAck(doc: string, checked: boolean): void {
    this.docAck.update((m) => ({ ...m, [doc]: checked }));
  }

  onPickCv(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.candCvFile.set(file);
  }

  onPickLetter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.candLetterFile.set(file);
  }

  triggerFileInput(id: string): void {
    document.getElementById(id)?.click();
  }

  cardDigitsOnly(raw: string): string {
    return raw.replace(/\D/g, '').slice(0, 19);
  }

  formatCardDisplay(digits: string): string {
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  onCardNumberInput(value: string): void {
    const d = this.cardDigitsOnly(value);
    this.cardNumber.set(this.formatCardDisplay(d));
  }

  onExpiryInput(value: string): void {
    const d = value.replace(/\D/g, '').slice(0, 4);
    if (d.length <= 2) {
      this.cardExpiry.set(d);
    } else {
      this.cardExpiry.set(`${d.slice(0, 2)}/${d.slice(2)}`);
    }
  }

  onCvcInput(value: string): void {
    this.cardCvc.set(value.replace(/\D/g, '').slice(0, 4));
  }

  paymentSummary(): string {
    const m = this.paymentMode();
    if (m === 'presentiel') {
      return 'Paiement sur place au camp (aucune carte saisie).';
    }
    if (m === 'carte') {
      const d = this.cardDigitsOnly(this.cardNumber());
      const last = d.slice(-4);
      return `Carte (démo) · **** **** **** ${last || '____'}`;
    }
    return '';
  }

  private resetForms(): void {
    this.parentPrenom.set('');
    this.parentNom.set('');
    this.parentEmail.set('');
    this.parentPhone.set('');
    this.childPrenom.set('');
    this.childNom.set('');
    this.childDob.set('');
    this.docAck.set({});
    this.paymentMode.set('carte');
    this.cardHolderName.set('');
    this.cardNumber.set('');
    this.cardExpiry.set('');
    this.cardCvc.set('');
    this.candPrenom.set('');
    this.candNom.set('');
    this.candEmail.set('');
    this.candPhone.set('');
    this.candExperience.set('');
    this.candMessage.set('');
    this.candCvFile.set(null);
    this.candLetterFile.set(null);
    this.donationAmountCad.set(null);
    this.donationCustom.set('');
    this.donationPresetSelected.set(null);
    this.donorName.set('');
    this.donorEmail.set('');
    this.donorMessage.set('');
  }

  private wizardValidationMessage(): string | null {
    const kind = this.wizardKind();
    const step = this.wizardStep();
    if (!kind) {
      return null;
    }
    if (kind === 'inscription') {
      switch (step) {
        case 0:
          return this.selectedSession() != null ? null : 'Choisissez une session de camp pour continuer.';
        case 1: {
          if (this.parentPrenom().trim().length === 0) {
            return 'Indiquez le prénom du parent ou tuteur.';
          }
          if (this.parentNom().trim().length === 0) {
            return 'Indiquez le nom du parent ou tuteur.';
          }
          if (!this.parentEmail().trim().includes('@')) {
            return 'Entrez une adresse courriel valide pour le parent ou tuteur.';
          }
          return null;
        }
        case 2: {
          if (this.childPrenom().trim().length === 0) {
            return 'Indiquez le prénom de l’enfant.';
          }
          if (this.childNom().trim().length === 0) {
            return 'Indiquez le nom de l’enfant.';
          }
          if (this.childDob().trim().length === 0) {
            return 'Indiquez la date de naissance de l’enfant.';
          }
          return null;
        }
        case 3: {
          const ack = this.docAck();
          if (Object.keys(ack).length === 0) {
            return 'Les documents requis ne sont pas chargés — revenez à l’étape précédente ou rechargez la page.';
          }
          if (!Object.values(ack).every(Boolean)) {
            return 'Cochez toutes les cases pour confirmer avoir pris connaissance des documents requis.';
          }
          return null;
        }
        case 4:
          return this.paymentValidationMessage();
        case 5:
          return null;
        default:
          return null;
      }
    }
    if (kind === 'emploi') {
      switch (step) {
        case 0:
          return this.selectedJob() != null ? null : 'Choisissez un poste pour continuer.';
        case 1: {
          if (this.candPrenom().trim().length === 0) {
            return 'Indiquez votre prénom.';
          }
          if (this.candNom().trim().length === 0) {
            return 'Indiquez votre nom.';
          }
          if (!this.candEmail().trim().includes('@')) {
            return 'Entrez une adresse courriel valide.';
          }
          if (this.candPhone().replace(/\D/g, '').length < 10) {
            return 'Le numéro de téléphone doit contenir au moins 10 chiffres.';
          }
          return null;
        }
        case 2:
          return this.candExperience().trim().length >= 20
            ? null
            : 'Décrivez votre expérience en au moins 20 caractères.';
        case 3:
          return this.candMessage().trim().length >= 20
            ? null
            : 'Rédigez un message de motivation d’au moins 20 caractères.';
        case 4: {
          if (this.candCvFile() == null) {
            return 'Joignez votre CV (fichier PDF ou Word).';
          }
          if (this.candLetterFile() == null) {
            return 'Joignez votre lettre de motivation (fichier PDF ou Word).';
          }
          return null;
        }
        case 5:
          return null;
        default:
          return null;
      }
    }
    if (kind === 'donation') {
      switch (step) {
        case 0: {
          const a = this.donationAmountCad();
          if (a == null) {
            return `Choisissez un montant suggéré ou saisissez un montant personnalisé (minimum ${SimplePageComponent.MIN_DONATION_CAD} $).`;
          }
          if (a < SimplePageComponent.MIN_DONATION_CAD) {
            return `Le montant minimum est de ${SimplePageComponent.MIN_DONATION_CAD} $.`;
          }
          return null;
        }
        case 1: {
          if (this.donorName().trim().length <= 1) {
            return 'Indiquez votre nom complet (au moins 2 caractères).';
          }
          if (!this.donorEmail().trim().includes('@')) {
            return 'Entrez une adresse courriel valide pour le reçu de don.';
          }
          return null;
        }
        case 2:
          return this.paymentValidationMessage();
        case 3:
          return null;
        default:
          return null;
      }
    }
    return null;
  }

  private paymentValidationMessage(): string | null {
    const mode = this.paymentMode();
    if (mode === 'presentiel') {
      return null;
    }
    if (mode !== 'carte') {
      return 'Choisissez « Carte en ligne » ou « Sur place » comme mode de paiement.';
    }
    const name = this.cardHolderName().trim();
    if (name.length < 2) {
      return 'Indiquez le nom figurant sur la carte (au moins 2 caractères).';
    }
    const num = this.cardDigitsOnly(this.cardNumber());
    if (num.length < 15) {
      return 'Le numéro de carte doit comporter au moins 15 chiffres.';
    }
    const exp = this.cardExpiry();
    const cvc = this.cardCvc();
    const mm = exp.slice(0, 2);
    const yy = exp.slice(3, 5);
    const monthOk = mm.length === 2 && Number(mm) >= 1 && Number(mm) <= 12;
    const expComplete = exp.length === 5 && exp[2] === '/' && yy.length === 2;
    if (!expComplete) {
      return 'Indiquez la date d’expiration au format MM/AA (ex. 09/28).';
    }
    if (!monthOk) {
      return 'Le mois d’expiration doit être compris entre 01 et 12.';
    }
    if (cvc.length < 3) {
      return 'Le code de sécurité (CVC) doit comporter au moins 3 chiffres.';
    }
    return null;
  }
}
