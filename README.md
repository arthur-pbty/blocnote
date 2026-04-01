# BlocNote

Bloc-notes Markdown en ligne, rapide, sans inscription et pensé pour l'auto-hébergement.

## Site

- Production: https://blocnote.arthurp.fr
- Contact: https://contact.arthurp.fr ou contact@arthurp.fr

## Stack technique

- Next.js 16 (App Router)
- React 19
- TypeScript
- ESLint

## Fonctionnalités

- Édition Markdown avec aperçu en temps réel
- Sauvegarde automatique des notes
- Recherche et tri des notes
- Notes épinglées
- Export d'une note
- Mode clair / sombre
- Raccourcis clavier

## Lancement local

Prérequis:

- Node.js 22+
- npm

Installation et démarrage:

```bash
npm ci
npm run dev
```

Application disponible sur http://localhost:3000

## Docker

Deux services sont fournis via [docker-compose.yml](docker-compose.yml):

- blocnote-dev pour le développement sur le port 3000
- blocnote-prod pour l'exécution de production sur le port 3016

```bash
docker compose --profile dev up
docker compose --profile prod up -d
```

## Variables d'environnement

- NEXT_PUBLIC_SITE_URL (exemple: https://blocnote.arthurp.fr)
