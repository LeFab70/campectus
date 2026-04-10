# Camp Ectus — refonte (projet de stage)

Refonte du site public inspiré de [Camp Ectus](https://www.campectus.ca/).

## Structure

| Dossier     | Rôle |
|------------|------|
| `frontend` | Application **Angular 21** (signals), **PrimeNG**, **Tailwind CSS v4**, thème centralisé. |
| _(à venir)_ `backend` | API **Spring Boot** + **PostgreSQL** (auth admin, emplois, actualités, contact, chat). |

## Frontend

```bash
cd frontend
npm install
npm start
```

Puis ouvrir `http://localhost:4200/`.

### PostCSS / Tailwind (Angular)

Le CLI Angular ne lit que **`postcss.config.json`** (pas `postcss.config.mjs`). Sans ce fichier, Tailwind ne s’exécute pas et les classes utilitaires (`flex`, `grid`, etc.) ne sont pas générées.

### Thème & couleurs

- **Tokens CSS globaux** : `frontend/src/styles/_tokens.scss`
- **Animations** : `frontend/src/styles/_motion.scss`
- **Preset PrimeNG (teal / nature)** : `frontend/src/app/theme/campectus-preset.ts`

### Fonctionnalités déjà posées

- Shell avec navigation alignée sur le site actuel (accueil, information, inscription, emploi, financement).
- Page d’accueil avec hero, chiffres clés et cartes (contenu basé sur le site public).
- Pages placeholder pour les sections à brancher sur l’API.
- **`/admin/login`** : maquette du futur espace admin (sans auth réelle).
- **Chat flottant** en bas à gauche (UI + dialogue ; envoi désactivé jusqu’au backend).

## Déploiement Render (site statique)

Angular **21** exige **Node ≥ 20.19** (voir `engines` dans `frontend/package.json`). Sans la bonne version, le build échoue avec le code de sortie `1`.

| Réglage | Valeur |
|--------|--------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm ci && npm run build` |
| **Publish Directory** | `dist/frontend/browser` |

Si la **Root Directory** est vide (racine du repo), utilisez plutôt :  
**Build** `cd frontend && npm ci && npm run build` et **Publish** `frontend/dist/frontend/browser`.

Variable d’environnement recommandée : `NODE_VERSION` = `22.12.0` (ou un fichier `frontend/.nvmrc` déjà présent).

Réécritures SPA : règle **Rewrite** `/*` → `/index.html` (voir `render.yaml` à la racine du repo).

## Prochaines étapes suggérées

1. Module Spring Boot (JWT, CORS, PostgreSQL).
2. CRUD emplois / actualités / messages / utilisateurs admin.
3. Brancher le chat (WebSocket ou service tiers).
4. Lazy loading des routes admin et optimisation du bundle PrimeNG.
