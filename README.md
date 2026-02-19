# Agence Web

Projet Next.js 15+ pour une agence web moderne, avec TypeScript, Tailwind CSS 4, shadcn/ui et architecture modulaire.

## Stack technique

- **Framework :** Next.js 16 (App Router)
- **Langage :** TypeScript
- **Styles :** Tailwind CSS 4
- **Composants :** shadcn/ui
- **Qualité :** ESLint + Prettier

## Démarrage

```bash
# Installation des dépendances (déjà fait)
npm install

# Mode développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer en production |
| `npm run lint` | Vérifier le code avec ESLint |
| `npm run format` | Formater le code avec Prettier |
| `npm run format:check` | Vérifier le formatage |

## Structure du projet

```
src/
├── app/              # Routes et layouts (App Router)
├── components/       # Composants réutilisables
│   ├── layout/       # Header, Footer
│   └── ui/           # Composants shadcn
├── config/           # Configuration (site, etc.)
├── features/         # Modules par fonctionnalité
├── hooks/            # Hooks React personnalisés
├── lib/              # Utilitaires
└── types/            # Types TypeScript
```

## Aliases d'import

- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`
- `@/config` → `src/config`
- `@/types` → `src/types`
- `@/features` → `src/features`

## Ajouter des composants shadcn

```bash
npx shadcn@latest add [nom-du-composant] -y
```

## Documentation

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
