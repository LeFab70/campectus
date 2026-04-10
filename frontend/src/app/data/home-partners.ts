/** Niveaux inspirés de la page partenaires Camp Ectus (logos réels via CMS / assets plus tard). */
export type PartnerTier = 'or' | 'argent' | 'bronze' | 'ami';

export interface HomePartner {
  readonly id: string;
  readonly name: string;
  readonly shortLabel: string;
  readonly tier: PartnerTier;
  /** Ex. `/assets/partners/uni.png` — si absent, affichage des initiales dans le cercle. */
  readonly logoUrl?: string | null;
}

/** Ordre et libellés alignés sur la capture fournie. */
export const HOME_PARTNERS: readonly HomePartner[] = [
  { id: 'uni', name: 'UNI', shortLabel: 'UNI', tier: 'or' },
  { id: 'uct', name: 'United Commercial Travelers', shortLabel: 'UCT', tier: 'or' },
  { id: 'kin', name: 'KIN Canada', shortLabel: 'KIN', tier: 'or' },
  { id: 'mcd', name: 'McDonald’s', shortLabel: 'McD', tier: 'argent' },
  { id: 'rotary', name: 'Rotary Club of Bathurst', shortLabel: 'Rotary', tier: 'argent' },
  { id: 'richelieu', name: 'Richelieu — Petit-Rocher', shortLabel: 'Richelieu', tier: 'argent' },
  { id: 'inter', name: 'L’Inter Marché', shortLabel: 'Inter', tier: 'bronze' },
  { id: 'sthubert', name: 'St-Hubert', shortLabel: 'St-H', tier: 'bronze' },
  { id: 'dixie', name: 'Dixie Lee / Pizza Shack', shortLabel: 'Dixie', tier: 'bronze' },
  { id: 'elhatton', name: 'Elhatton’s', shortLabel: 'Elh.', tier: 'ami' },
] as const;
