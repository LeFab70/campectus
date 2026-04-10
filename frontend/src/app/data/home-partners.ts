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

/** Image factice par partenaire (Lorem Picsum, seed = visuel stable mais différent par id). */
function partnerDemoLogo(id: string): string {
  return `https://picsum.photos/seed/campectus-partner-${id}/256/256`;
}

/** Ordre et libellés alignés sur la capture fournie. */
export const HOME_PARTNERS: readonly HomePartner[] = [
  { id: 'uni', name: 'UNI', shortLabel: 'UNI', tier: 'or', logoUrl: partnerDemoLogo('uni') },
  { id: 'uct', name: 'United Commercial Travelers', shortLabel: 'UCT', tier: 'or', logoUrl: partnerDemoLogo('uct') },
  { id: 'kin', name: 'KIN Canada', shortLabel: 'KIN', tier: 'or', logoUrl: partnerDemoLogo('kin') },
  { id: 'mcd', name: 'McDonald’s', shortLabel: 'McD', tier: 'argent', logoUrl: partnerDemoLogo('mcd') },
  { id: 'rotary', name: 'Rotary Club of Bathurst', shortLabel: 'Rotary', tier: 'argent', logoUrl: partnerDemoLogo('rotary') },
  { id: 'richelieu', name: 'Richelieu — Petit-Rocher', shortLabel: 'Richelieu', tier: 'argent', logoUrl: partnerDemoLogo('richelieu') },
  { id: 'inter', name: 'L’Inter Marché', shortLabel: 'Inter', tier: 'bronze', logoUrl: partnerDemoLogo('inter') },
  { id: 'sthubert', name: 'St-Hubert', shortLabel: 'St-H', tier: 'bronze', logoUrl: partnerDemoLogo('sthubert') },
  { id: 'dixie', name: 'Dixie Lee / Pizza Shack', shortLabel: 'Dixie', tier: 'bronze', logoUrl: partnerDemoLogo('dixie') },
  { id: 'elhatton', name: 'Elhatton’s', shortLabel: 'Elh.', tier: 'ami', logoUrl: partnerDemoLogo('elhatton') },
] as const;
