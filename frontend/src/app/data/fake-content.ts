import type {
  ContactContent,
  EmploiContent,
  FinancementContent,
  InformationContent,
  InscriptionContent,
  FakePageKey,
  FakePageContent,
} from './fake-content.types';

export const FAKE_INFORMATION: InformationContent = {
  key: 'information',
  title: 'Information',
  intro:
    'Le Camp Ectus accueille les jeunes depuis 1961 sur les rives de la baie des Chaleurs. Voici un aperçu factice pour la démo du site — le contenu définitif viendra de l’administration.',
  heroImageUrl: 'https://picsum.photos/id/1018/1800/1000',
  heroImageAlt: 'Forêt et lac — bannière de démo pour la page Information (remplaçable CMS).',
  sections: [
    {
      heading: 'Notre histoire',
      icon: 'pi pi-book',
      paragraphs: [
        'Fondé en 1961 et affilié à l’Association de camping du N.-B., le camp a accueilli plus de 30 000 campeurs et campeuses. Des centaines d’étudiants y ont travaillé comme animateurs et animatrices.',
        'Les bénévoles, les organismes partenaires et les familles ont tous contribué à bâtir une expérience unique en Acadie.',
      ],
      imageUrl: 'https://picsum.photos/id/676/800/520',
      imageAlt: 'Souvenirs et vie au camp — illustration à côté de « Notre histoire » (démo).',
    },
    {
      heading: 'Genre de camp',
      icon: 'pi pi-sun',
      paragraphs: [
        'Chaque équipe planifie sa propre programmation : sports d’équipe, arts, nature, jeux au bord de l’eau et soirées thématiques.',
        'La pédagogie met l’enfant au centre : il participe à la planification, à l’organisation, à la réalisation et à l’évaluation de ses activités.',
      ],
      imageUrl: 'https://picsum.photos/id/1043/800/520',
      imageAlt: 'Activités de plein air et vie en équipe (illustration de démo).',
    },
    {
      heading: 'Arrivée, équipes et départ',
      icon: 'pi pi-clock',
      paragraphs: [
        'Après acceptation, le passeport doit être imprimé à partir du site web et rempli. Vous devrez le présenter à votre entrée au camp.',
        'L’entrée se fait entre 18h00 et 18h30. Les équipes seront formées vers 18h30.',
        'Les campeurs et campeuses seront placés en équipe de 10 enfants du même sexe avec 2 moniteurs-trices.',
        'Le départ se fait à 14h00 le dernier jour de la session.',
      ],
      imageUrl: 'https://picsum.photos/id/1067/800/520',
      imageAlt: 'Arrivée au camp et organisation des équipes (illustration de démo).',
    },
    {
      heading: 'Installations (démo)',
      icon: 'pi pi-building',
      paragraphs: [
        '26 acres de terrain, 13 bâtiments, plage, quai, salles polyvalentes et chalets — données indicatives pour le prototype.',
      ],
      imageUrl: 'https://picsum.photos/id/1078/800/520',
      imageAlt: 'Bâtiments et site (illustration de démo).',
    },
  ],
  newsletterPreviews: [
    {
      id: 'nl1',
      title: 'Ouverture des inscriptions 2026',
      excerpt: 'Dates clés, tranches d’âge et rappel des documents à préparer avant la saison.',
      imageUrl: 'https://picsum.photos/id/225/600/380',
      dateLabel: 'Janvier 2026',
    },
    {
      id: 'nl2',
      title: 'Appel aux bénévoles — fin de semaine',
      excerpt: 'Comment vous impliquer pour une journée de travail communautaire au printemps.',
      imageUrl: 'https://picsum.photos/id/667/600/380',
      dateLabel: 'Décembre 2025',
    },
    {
      id: 'nl3',
      title: 'Souvenirs de la saison',
      excerpt: 'Retour en images sur les activités préférées des campeurs et campeuses.',
      imageUrl: 'https://picsum.photos/id/366/600/380',
      dateLabel: 'Septembre 2025',
    },
  ],
  facts: [
    { label: 'Fondation', value: '1961', icon: 'pi pi-calendar' },
    { label: 'Affiliation', value: 'Association de camping du N.-B.', icon: 'pi pi-flag' },
    { label: 'Ville', value: 'Petit-Rocher, N.-B.', icon: 'pi pi-map-marker' },
    { label: 'Téléphone', value: '(506) 783-2894', icon: 'pi pi-phone' },
  ],
};

export const FAKE_CONTACT: ContactContent = {
  key: 'contact',
  title: 'Contactez-nous',
  intro:
    'Joignez-vous à nous par téléphone ou courriel, consultez nos horaires (démo) et utilisez le formulaire ci-dessous — aucun message n’est envoyé pour l’instant.',
  heroImageUrl: 'https://picsum.photos/id/318/1800/1000',
  heroImageAlt: 'Camp et nature — bannière page Contact (remplaçable CMS).',
};

export const FAKE_INSCRIPTION: InscriptionContent = {
  key: 'inscription',
  title: 'Inscription',
  intro:
    'Sessions 2026, tarifs et informations sur le site du Camp Ectus. La pré-inscription ci-dessous reste une démonstration : l’inscription définitive suivra les modalités du camp.',
  heroImageUrl: 'https://picsum.photos/id/499/1800/1000',
  heroImageAlt: 'Enfants et plein air — bannière page Inscription.',
  publicCibleQuestion: 'Le Camp Ectus s’adresse à qui ?',
  publicCibleAnswer:
    'Le Camp Ectus s’adresse aux jeunes âgés de 6 à 13 ans.',
  siteLocauxParagraphs: [
    '26 acres de terrain au bord de la baie des Chaleurs.',
    '13 bâtiments : 7 chalets, 1 cuisine, 1 salle de jeux, 1 bloc de toilette et douches, 1 remise, 1 atelier, 1 salle de réception.',
    '2 terrains de jeux et un terrain d’hébertisme ; plage et forêt.',
  ],
  objectifs: [
    'Contribution au développement d’une personnalité intégrale et autonome.',
    'Apprentissage de la vie de groupe, dans un cadre de vie démocratique.',
    'Développement du sens des responsabilités face aux exigences fondamentales de la vie quotidienne.',
    'Développement d’habitudes de vie saines et équilibrées.',
    'Développement d’attitudes et d’aptitudes créatives dans les loisirs.',
    'Initiation à la vie de plein air : découverte, appréciation et respect de la nature, utilisation rationnelle du milieu.',
  ],
  activites:
    'Natation, théâtre, jeux, excursions, bricolage, poterie, feux de camp, chant, danse, camping, repas extérieurs, corvées, peinture, canotage, construction de cabanes, sculpture, dessin, mime, spectacles, siestes, etc.',
  locationIntro:
    'Le site accueille aussi des locations pour associations, familles et groupes, en tout temps hors du calendrier régulier des sessions de camp.',
  locationBullets: [
    'Soirée',
    'Fins de semaine',
    'Sur semaine',
  ],
  sessions: [
    {
      id: 's2026-1',
      sessionGroupTitle: 'Nés de 2014 à 2019',
      name: 'Session 1',
      durationLabel: '5 jours',
      dates: '21 au 26 juin 2026',
      ageRange: 'Nés de 2014 à 2019',
      ageIcon: 'pi pi-users',
      imageUrl: 'https://picsum.photos/id/611/400/400',
      spotsTotal: 40,
      spotsLeft: 14,
      feeCad: 440,
    },
    {
      id: 's2026-6',
      name: 'Session 6',
      durationLabel: '5 jours',
      dates: '10 au 15 août 2026',
      ageRange: 'Nés de 2014 à 2019',
      ageIcon: 'pi pi-users',
      imageUrl: 'https://picsum.photos/id/318/400/400',
      spotsTotal: 40,
      spotsLeft: 20,
      feeCad: 440,
    },
    {
      id: 's2026-2',
      sessionGroupTitle: 'Nés de 2012 à 2017',
      name: 'Session 2',
      durationLabel: '6 jours',
      dates: '29 juin au 5 juillet 2026',
      ageRange: 'Nés de 2012 à 2017',
      ageIcon: 'pi pi-compass',
      imageUrl: 'https://picsum.photos/id/1027/400/400',
      spotsTotal: 44,
      spotsLeft: 8,
      feeCad: 480,
    },
    {
      id: 's2026-3',
      name: 'Session 3',
      durationLabel: '6 jours',
      dates: '9 au 15 juillet 2026',
      ageRange: 'Nés de 2012 à 2017',
      ageIcon: 'pi pi-compass',
      imageUrl: 'https://picsum.photos/id/338/400/400',
      spotsTotal: 44,
      spotsLeft: 15,
      feeCad: 480,
    },
    {
      id: 's2026-4',
      name: 'Session 4',
      durationLabel: '6 jours',
      dates: '19 au 25 juillet 2026',
      ageRange: 'Nés de 2012 à 2017',
      ageIcon: 'pi pi-compass',
      imageUrl: 'https://picsum.photos/id/167/400/400',
      spotsTotal: 44,
      spotsLeft: 11,
      feeCad: 480,
    },
    {
      id: 's2026-5',
      name: 'Session 5',
      durationLabel: '7 jours',
      dates: '29 juillet au 5 août 2026',
      ageRange: 'Nés de 2012 à 2017',
      ageIcon: 'pi pi-compass',
      imageUrl: 'https://picsum.photos/id/115/400/400',
      spotsTotal: 40,
      spotsLeft: 6,
      feeCad: 535,
    },
  ],
  steps: [
    'Créer un compte parent (futur portail en ligne).',
    'Choisir une session et remplir le formulaire de santé.',
    'Téléverser le certificat de vaccination (exemple).',
    'Payer l’acompte sécurisé — intégration paiement à venir.',
    'Recevoir la confirmation par courriel.',
  ],
  documentsNeeded: [
    'Pièce d’identité du parent ou tuteur',
    'Contact d’urgence secondaire',
    'Autorisation de baignade (modèle fourni)',
  ],
  contactBlurb: 'Questions : campectus@gmail.com ou (506) 783-2894.',
};

export const FAKE_EMPLOI: EmploiContent = {
  key: 'emploi',
  title: 'Emploi',
  intro:
    'Les offres suivantes sont des données de démonstration. Elles seront remplacées par les vrais postes publiés depuis l’espace admin (API Spring Boot + PostgreSQL).',
  heroImageUrl: 'https://picsum.photos/id/1033/1800/1000',
  heroImageAlt: 'Collaboration en équipe — bannière de démo pour la page Emploi (remplaçable CMS).',
  postings: [
    {
      id: 'j1',
      title: 'Animateur·trice général·e — session été',
      type: 'Saisonnier',
      location: 'Petit-Rocher, N.-B.',
      salaryHint: 'À discuter (subventions étudiant possible)',
      postedAt: '2026-01-15',
      deadline: '2026-03-01',
      excerpt:
        'Encadrement d’un groupe de campeurs, animation d’activités variées et participation à la vie du camp. Expérience avec les jeunes un atout.',
      tags: ['Été 2026', 'Équipe vivante', 'Formation offerte'],
      icon: 'pi pi-megaphone',
      imageUrl: 'https://picsum.photos/id/526/400/400',
    },
    {
      id: 'j2',
      title: 'Spécialiste aquatique / sauveteur',
      type: 'Saisonnier',
      location: 'Site du camp',
      salaryHint: 'Selon expérience',
      postedAt: '2026-01-20',
      deadline: '2026-03-15',
      excerpt:
        'Surveillance de la baignade, initiation au kayak et sécurité nautique. Certificat de sauvetage à jour requis (exemple).',
      tags: ['Certification requise', 'Mi-temps possible'],
      icon: 'pi pi-shield',
      imageUrl: 'https://picsum.photos/id/267/400/400',
    },
    {
      id: 'j3',
      title: 'Cuisinier·ne adjoint·e',
      type: 'Saisonnier',
      location: 'Cuisine centrale',
      salaryHint: 'Horaire compétitif',
      postedAt: '2026-02-01',
      deadline: '2026-04-01',
      excerpt:
        'Préparation des repas pour ~180 personnes en pointe, respect des normes d’hygiène et esprit d’équipe en cuisine.',
      tags: ['Alimentation', 'Équipe 6–8 personnes'],
      icon: 'pi pi-shopping-bag',
      imageUrl: 'https://picsum.photos/id/429/400/400',
    },
    {
      id: 'j4',
      title: 'Coordinateur·rice des bénévoles (court mandat)',
      type: 'Contrat',
      location: 'Hybride / sur place',
      salaryHint: 'Honoraires négociables',
      postedAt: '2026-02-10',
      deadline: '2026-02-28',
      excerpt:
        'Planification des fins de semaine bénévoles, accueil et formation courte des groupes. Durée : mai à août (données fictives).',
      tags: ['Organisation', 'Courte durée'],
      icon: 'pi pi-users',
      imageUrl: 'https://picsum.photos/id/152/400/400',
    },
  ],
};

export const FAKE_FINANCEMENT: FinancementContent = {
  key: 'financement',
  title: 'Campagne de financement',
  intro:
    'Montants d’exemple pour illustrer la page. L’objectif réel du site public était d’environ 24 000 $ — à synchroniser avec le backend.',
  heroImageUrl: 'https://picsum.photos/id/1062/1800/1000',
  heroImageAlt: 'Solidarité et entraide — bannière de démo pour la campagne (remplaçable CMS).',
  goalCad: 24000,
  raisedCad: 15200,
  objectives: [
    {
      title: 'Services aux plus démunis',
      description:
        'Continuer d’offrir nos services en assumant une grande partie du coût réel pour les familles (données de démo).',
    },
    {
      title: 'Compenser les baisses de subventions',
      description: 'Suppléer aux variations des aides gouvernementales et maintenir la qualité du programme.',
    },
    {
      title: 'Fonds de prévoyance',
      description: 'Constituer une réserve pour faire face aux imprévus et aux années difficiles.',
    },
    {
      title: 'Capital pour rénovations',
      description: 'Investir dans l’entretien des bâtiments et les réparations majeures du site.',
    },
  ],
  revenueSources: [
    { label: 'Campeurs et campeuses', percent: 65, detail: 'Frais d’inscription et participation' },
    { label: 'Subsides emploi étudiant', percent: 17, detail: 'Programmes gouvernementaux' },
    { label: 'Dons', percent: 14, detail: 'Chaque tranche de 100 $ aide un enfant (message type site public)' },
    { label: 'Location', percent: 4, detail: 'Familles, clubs, entreprises' },
  ],
  donorNote:
    'Pour toute commandite ou don structuré, un plan détaillé pourra être joint ici (PDF) une fois le contenu géré en admin.',
};

export const FAKE_PAGES: Record<FakePageKey, FakePageContent> = {
  information: FAKE_INFORMATION,
  contact: FAKE_CONTACT,
  inscription: FAKE_INSCRIPTION,
  emploi: FAKE_EMPLOI,
  financement: FAKE_FINANCEMENT,
};

export function getFakePage(key: string | undefined): FakePageContent | null {
  if (!key || !(key in FAKE_PAGES)) {
    return null;
  }
  return FAKE_PAGES[key as FakePageKey];
}
