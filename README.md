# BlocNote

Bloc-notes Markdown en ligne, rapide et sans inscription.

## Site public

- Production: https://blocnote.arthurp.fr

## Stack technique

- Next.js 16 (App Router)
- React 19
- TypeScript
- ESLint

## Fonctionnalites

- Edition Markdown avec apercu en temps reel
- Sauvegarde automatique des notes
- Recherche et tri des notes
- Notes epinglees
- Export d'une note
- Mode clair / sombre
- Raccourcis clavier

## Lancement local

Pre-requis:

- Node.js 22+
- npm

Installation et demarrage:

```bash
npm ci
npm run dev
```

Application disponible sur http://localhost:3000

## Scripts

```bash
npm run dev    # mode developpement
npm run lint   # verification lint
npm run build  # build production
npm run start  # lancer le build production
```

## Variables d'environnement

Le projet peut utiliser:

- NEXT_PUBLIC_SITE_URL (exemple: https://blocnote.arthurp.fr)

## Docker

Un environnement Docker est disponible via [docker-compose.yml](docker-compose.yml).

```bash
docker compose up -d
```
