export type FakePageKey = 'information' | 'contact' | 'inscription' | 'emploi' | 'financement';

export interface InfoSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  /** Icône PrimeIcons (ex. pi pi-book). */
  readonly icon: string;
  /** Image illustrative (remplaçable via CMS plus tard). */
  readonly imageUrl: string;
  readonly imageAlt: string;
}

/** Aperçu type « dernier numéro » d’infolettre (démo). */
export interface NewsletterPreviewItem {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly imageUrl: string;
  readonly dateLabel: string;
}

/** Image bannière / zone média du hero (remplaçable CMS). */
export interface PageHeroImage {
  readonly heroImageUrl: string;
  readonly heroImageAlt: string;
}

export interface InformationContent extends PageHeroImage {
  readonly key: 'information';
  readonly title: string;
  readonly intro: string;
  readonly sections: readonly InfoSection[];
  readonly facts: readonly { readonly label: string; readonly value: string; readonly icon: string }[];
  readonly newsletterPreviews: readonly NewsletterPreviewItem[];
}

export interface ContactContent extends PageHeroImage {
  readonly key: 'contact';
  readonly title: string;
  readonly intro: string;
}

export interface CampSession {
  readonly id: string;
  readonly name: string;
  readonly dates: string;
  readonly ageRange: string;
  /** Icône à côté de la tranche d’âge (PrimeIcons). */
  readonly ageIcon: string;
  /** Image illustrative (cercle à droite sur la carte). */
  readonly imageUrl: string;
  readonly spotsTotal: number;
  readonly spotsLeft: number;
  readonly feeCad: number;
  /** Ex. « 5 jours » — affiché sur la carte session. */
  readonly durationLabel?: string;
  /** Titre de groupe (cohorte) affiché au-dessus de cette session. */
  readonly sessionGroupTitle?: string;
}

export interface InscriptionContent extends PageHeroImage {
  readonly key: 'inscription';
  readonly title: string;
  readonly intro: string;
  readonly sessions: readonly CampSession[];
  readonly steps: readonly string[];
  readonly documentsNeeded: readonly string[];
  readonly contactBlurb: string;
  /** « Le Camp Ectus s’adresse à qui ? » + réponse. */
  readonly publicCibleQuestion: string;
  readonly publicCibleAnswer: string;
  readonly siteLocauxParagraphs: readonly string[];
  readonly objectifs: readonly string[];
  readonly activites: string;
  readonly locationIntro: string;
  readonly locationBullets: readonly string[];
}

export interface JobPosting {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly location: string;
  readonly salaryHint: string;
  readonly postedAt: string;
  readonly deadline: string;
  readonly excerpt: string;
  readonly tags: readonly string[];
  readonly icon: string;
  readonly imageUrl: string;
}

export interface EmploiContent extends PageHeroImage {
  readonly key: 'emploi';
  readonly title: string;
  readonly intro: string;
  readonly postings: readonly JobPosting[];
}

export interface FinanceObjective {
  readonly title: string;
  readonly description: string;
}

export interface RevenueSlice {
  readonly label: string;
  readonly percent: number;
  readonly detail: string;
}

export interface FinancementContent extends PageHeroImage {
  readonly key: 'financement';
  readonly title: string;
  readonly intro: string;
  readonly goalCad: number;
  readonly raisedCad: number;
  readonly objectives: readonly FinanceObjective[];
  readonly revenueSources: readonly RevenueSlice[];
  readonly donorNote: string;
}

export type FakePageContent =
  | InformationContent
  | ContactContent
  | InscriptionContent
  | EmploiContent
  | FinancementContent;
