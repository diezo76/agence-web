# Compte rendu - Projet Agence Web

**Date :** 19 février 2025  
**Projet :** agence-web - Next.js 15 avec architecture modulaire

---

## Dernière mise à jour (19 février 2025)

### Hero Section – exemples d'utilisation

- **HeroSection** refaite avec FadeIn, SlideIn, ParallaxSection, GradientText, StaggerContainer
- **FadeIn** : prop `direction` (up | down | none)
- **SlideIn** : prop `direction` (up | down | left | right)
- **GradientText** : prop `animate` pour animation au scroll
- **StatsSection** : section stats avec AnimatedCounter (150+, 98%, 12+, 24h)
- **Variants** : slideInUp, slideInDown ajoutés

### Structure des dossiers – composants réutilisables

- **components/animations/** : FadeIn, SlideIn, ParallaxSection, ScrollReveal, ScaleIn, RotateIn, StaggerContainer
- **components/layout/** : NavLink, MobileMenu (Header, Footer existants)
- **components/sections/** : Stats, StatCard, NewsletterForm
- **components/shared/** : SocialLinks, FooterLinks, BackToTop, LoadingSpinner, GradientText, FloatingCard (+ AnimatedCounter, MagneticButton)
- **lib/hooks/** : useScrollProgress, useMousePosition, useInView, useMediaQuery, useWindowSize, useScrollDirection, useScrollLock
- **lib/animations/** : variants.ts, transitions.ts

### Formulaire de contact – refonte complète

- **Design :** glassmorphism 2 colonnes (form gauche, infos droite), rounded-3xl, backdrop-blur-xl
- **Champs :** Nom, Email, Téléphone, Message (textarea) — React Hook Form + Zod
- **Micro-interactions :**
  - Focus : border glow gradient, label slide up + scale, icône animation
  - Validation : check ✓ si valide, shake animation si erreur
  - Submit : MagneticButton, loading spinner, confetti (canvas-confetti) au succès
  - Toast : success (slide, auto-dismiss), error (shake, stay)
- **Validation Zod :** email, phone (optionnel, regex), message min 10 chars
- **API /api/contact :** phone au lieu de subject, rate limiting (5 req/min par IP)
- **Fichiers :** contact-form.tsx, contact-form-field.tsx, lib/rate-limit.ts

### Timeline – processus de travail

- **Fichiers créés :**
  - `src/components/sections/timeline/TimelineStep.tsx` — card glassmorphism par étape
  - `src/components/sections/timeline/TimelineDot.tsx` — point avec pulse + particles
  - `src/components/sections/timeline/TimelineLine.tsx` — ligne gradient animée au scroll
  - `src/components/sections/Timeline.tsx` — composant principal
  - `src/features/home/sections/timeline-section.tsx`
- **6 étapes :** Découverte, Design, Développement, Tests, Lancement, Support
- **Layout :** ligne verticale centrale, alternance gauche/droite (desktop), vertical (mobile)
- **Design cards :** backdrop-blur-xl, bg-white/5, border-white/10, rounded-3xl, numéro gradient (text-8xl)
- **Animations :** ligne scaleY 0→100% (useScroll), cards fadeIn+slideIn (useInView), dots scale 0→1 + pulse
- **Interactions :** hover rotation+scale, glow gradient, nav smooth scroll (#decouverte, #design, etc.)

### Hero moderne – refonte complète

- **Structure modulaire :**
  - `src/components/sections/hero/HeroBackground.tsx` — gradient purple-900 → blue-900 → black + radial animé
  - `src/components/sections/hero/HeroTitle.tsx` — titre avec animation par mot (fadeIn + slideUp)
  - `src/components/sections/hero/HeroScrollIndicator.tsx` — indicateur bounce infini
  - `src/components/sections/hero/index.ts` — exports
- **Design :**
  - Fond : gradient animé + radial gradient qui se déplace (ellipse 12s loop)
  - Typographie : text-7xl → text-8xl → text-9xl (responsive)
  - Titre : "Votre" (blanc) + "Agence Web Créative" (gradient purple → pink → blue)
  - Layout : max-w-6xl, centré
- **Animations Framer Motion :**
  - Titre : fadeIn + slideUp par mot (delay échelonné 0.12s)
  - Paragraphe : fadeIn + slideUp (delay 0.7s)
  - Boutons : fadeIn + slideUp (delay 0.9s) + MagneticButton
  - Parallax : useTransform(scrollYProgress) → y 0→50%, opacity 1→0
  - Scroll indicator : bounce [0, 12, 0] infini
- **Interactions :** MagneticButton sur les 2 CTA, CustomCursor, Lenis (déjà en place)

### AnimatedCounter – compteur animé

- **Fichier créé :** `src/components/shared/AnimatedCounter.tsx`
- **Props :** `value` (nombre cible), `duration` (défaut 2s), `suffix` (ex: "+", "%")
- **Fonctionnement :** compte de 0 à `value` quand l’élément entre dans le viewport (useInView)
- **Implémentation :** `animate()` de Framer Motion pour durée contrôlée (useSpring ne gère pas duration)
- **Format :** `toLocaleString("fr-FR")` pour le formatage des nombres
- **Exemple :** `<AnimatedCounter value={500} suffix="+" />`

### CustomCursor – curseur personnalisé

- **Fichier créé :** `src/components/layout/CustomCursor.tsx`
- **Fonctionnalités :**
  - Curseur principal (32×32) avec bordure blanche, mix-blend-difference
  - Point de traînée (8×8) avec spring plus lent (damping: 40, stiffness: 400)
  - Détection hover sur boutons/liens → scale ×2
  - Masqué sur appareils tactiles (ontouchstart, maxTouchPoints, pointer: coarse)
  - `cursor: none` sur body quand actif (desktop uniquement)
  - Opacité 0 hors viewport (mouseleave sur document)
- **Corrections :** useSpring pour la traînée déplacé au top-level (hooks), centrage du point (translateX/Y: 12)
- **Intégration :** dans `layout.tsx` via LenisProvider

### ServicesGlass – section services glassmorphism (refonte)

- **Fichier :** `src/components/sections/ServicesGlass.tsx`
- **Design global :** fond gradient purple-900 → black, overlay radial-gradient circles animé
- **Grid 2×2** : 4 services (Design UI/UX, Dev Web, SEO, Web3)
- **Cards glassmorphism :** backdrop-blur-xl, bg-white/5, border-white/10, rounded-3xl, p-8
- **Hover :** border-white/20, scale 1.02, translateY -5px
- **Gradient glow :** purple/pink blur-xl derrière la card, opacity 0→1 (500ms)
- **Contenu :** emoji (text-6xl), titre (text-3xl), description (text-gray-400), pills (bg-white/10 backdrop-blur)
- **Animations :** fadeIn + slideUp au scroll (delay échelonné), icon scale 0→1, features scale 0→1 séquentiel

### BentoGrid – section réalisations (refonte)

- **Fichier :** `src/components/sections/BentoGrid.tsx`
- **Type :** `BentoProject` (id, title, category, image, color, size, href)
- **Layout :** grid-cols-1 (mobile) → md:grid-cols-2 → lg:grid-cols-3, auto-rows-[300px], gap-6, rounded-3xl
- **4 projets** avec tailles variées : 2×2, 1×1, 1×2, 2×1
- **Design :** image fond + overlay gradient (60%→80% hover), glassmorphism au hover (backdrop-blur, bg-white/5)
- **Animations :** scale 0.8→1, rotateX 45°→0° au scroll (useInView), delay index×0.1
- **Hover :** image scale 1→1.1 (700ms), gradient opacity 60→80%, flèche x:-20→0 opacity 0→1
- **Liens :** `/projets#project-{id}` pour deep linking
- **Intégration :** BentoSection ajoutée à la page d'accueil (après Services)

### MagneticButton – refactor

- **Nouveau dossier :** `src/components/shared/` pour composants partagés
- **Fichiers créés :**
  - `src/components/shared/MagneticButton.tsx` — version avec `useState` + `animate` (Framer Motion)
  - `src/components/shared/index.ts` — export du module
- **Implémentation :** `useState` pour la position, `animate={{ x, y }}` avec spring (stiffness: 150, damping: 15), facteur `STRENGTH = 0.3` pour limiter le déplacement
- **Fichiers modifiés :** `src/components/sections/Hero.tsx` — import depuis `@/components/shared`
- **Supprimé :** `src/components/ui/magnetic-button.tsx` (ancienne version avec useMotionValue/useSpring)

### Sécurité et déploiement

- **API Contact :** échappement HTML (XSS), validation renforcée (max lengths)
- **Headers :** HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **.env.example :** template des variables (Supabase, Resend)
- **Déploiement :** Vercel production

### Galerie de projets – optimisations

- **Performance :** React.memo sur ProjectCard et ProjectDetailModal ; useMemo pour filteredProjects et visibleProjects
- **Bundle :** dynamic() pour ProjectDetailModal (chargement différé)
- **Core Web Vitals :** priority sur les 3 premières images (LCP)
- **SEO :** metadata (title, description, openGraph), JSON-LD ItemList

### Galerie de projets

- **Fichiers créés :**
  - `src/config/projects.ts` — données projets, catégories (sites, applications, ecommerce, branding)
  - `src/features/projets/project-card.tsx` — carte avec next/image, hover, animation
  - `src/features/projets/project-detail-modal.tsx` — Dialog détails projet
  - `src/features/projets/projects-gallery.tsx` — galerie avec filtres + infinite scroll
  - `src/features/projets/projects-page-header.tsx` — en-tête animé
- **Fonctionnalités :**
  - Filtrage par catégorie (tabs ARIA)
  - Modal détails au clic (Dialog shadcn)
  - Images optimisées (next/image, sizes responsive)
  - Animations Framer Motion (cards stagger, header fade-in)
  - Infinite scroll (IntersectionObserver) + bouton « Charger plus »
- **next.config.ts :** remotePatterns pour images.unsplash.com, picsum.photos

### Formulaire de contact

- **Fichiers créés :**
  - `src/features/contact/contact-form.tsx` — formulaire avec react-hook-form + Zod
  - `src/features/contact/index.ts`
  - `src/app/api/contact/route.ts` — API POST pour envoi email
- **Composants :** Form, Input, Textarea, Button (shadcn), toast (sonner)
- **Validation Zod :** name (min 2), email, subject (min 3), message (min 10)
- **Email :** Resend (si `RESEND_API_KEY` dans .env.local). Sinon log en console.
- **Variables optionnelles :** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`
- **Accessibilité :** aria-label, aria-describedby, aria-busy, aria-required, sr-only

### Client Supabase type-safe

- **Packages :** `@supabase/supabase-js`, `@supabase/ssr`
- **Fichiers :**
  - `src/lib/supabase/client.ts` — client browser (singleton)
  - `src/lib/supabase/server.ts` — client serveur (par requête)
  - `src/lib/supabase/errors.ts` — SupabaseError, toResult, handleSupabaseError
  - `src/types/database.ts` — types auto-générés (minimal, régénérer avec `npm run supabase:types`)
- **Usage :**
  - Client : `import { createClient } from "@/lib/supabase/client"`
  - Server : `import { createClient } from "@/lib/supabase/server"`
  - Errors : `import { toResult } from "@/lib/supabase"`

### Configuration Tailwind – palette brand & animations

- **Fichier modifié :** `src/app/globals.css`
- **Tailwind v4** : configuration via `@theme` (pas de tailwind.config.js)
- **Palette brand** (cyan/bleu) : `brand-50` à `brand-950` — classes `bg-brand-500`, `text-brand-600`, etc.
- **Animations** : `animate-fade-in`, `animate-slide-up` — classes `animate-fade-in`, `animate-slide-up`

### Composants shadcn de base

- **Composants ajoutés :** form, label, navigation-menu, sheet, dialog, sonner
- **Fichiers créés :**
  - `src/components/ui/form.tsx`
  - `src/components/ui/label.tsx`
  - `src/components/ui/navigation-menu.tsx`
  - `src/components/ui/sheet.tsx`
  - `src/components/ui/dialog.tsx`
  - `src/components/ui/sonner.tsx`
- **Note :** `toast` est déprécié par shadcn → **sonner** utilisé à la place. Le Toaster est intégré dans `layout.tsx`
- **Déjà présents :** button, card, input

### Footer complet

- **Packages ajoutés :** `next-themes`, composant `Input` (shadcn)
- **Fichiers créés :** `src/components/theme-provider.tsx`
- **Fichiers modifiés :**
  - `src/components/layout/footer.tsx` — refonte complète
  - `src/config/site.ts` — ajout `socialLinks`, `footerColumns`
  - `src/app/layout.tsx` — intégration ThemeProvider
- **Fonctionnalités du Footer :**
  - **Newsletter :** formulaire email + bouton, état success simulé
  - **Liens sociaux :** Twitter, LinkedIn, GitHub (icônes Lucide)
  - **Layout multi-colonnes :** grid responsive (lg:2 cols, xl:4 cols)
  - **Dark mode :** ThemeProvider (next-themes), toggle Soleil/Lune dans le footer
  - Colonnes : Brand+Newsletter | Navigation | Services | Légal

### Section Services améliorée

- **Fichier modifié :** `src/features/home/sections/services-section.tsx`
- **Fonctionnalités :**
  - Grid responsive : `sm:grid-cols-2 lg:grid-cols-3` avec gaps adaptatifs
  - Cards shadcn/ui avec hover : translate-y, border, shadow, gradient overlay
  - Icônes Lucide : Globe (Sites Web), Layout (Applications), BarChart3 (Stratégie)
  - Animations Framer Motion : stagger au scroll, fade-in du header
  - TypeScript strict : interface `Service` avec `LucideIcon`

### Composant Hero moderne

- **Package ajouté :** `framer-motion` pour les animations
- **Fichiers créés :**
  - `src/components/hero/Hero.tsx` — composant Hero principal
  - `src/components/hero/index.ts` — export du module
- **Fichiers modifiés :**
  - `src/features/home/sections/hero-section.tsx` — utilise désormais le composant Hero
- **Fonctionnalités du Hero :**
  - Animations Framer Motion (fade-in, slide-up, stagger)
  - Arrière-plans en dégradé (violet, cyan, rose)
  - Badge « Agence web créative » avec icône Sparkles
  - Titre avec gradient text (violet → fuchsia)
  - CTA buttons avec hover (scale, glow, flèche animée)
  - Design responsive (mobile-first, breakpoints sm/md/lg)
  - TypeScript strict (props typées, interfaces HeroProps, HeroCTA)
- **Note :** Pour les variants Framer Motion, utiliser `as const` sur les `ease` (cubic-bezier) pour satisfaire le typage strict

---

## Résumé des tâches effectuées

### 1. Création du projet Next.js
- **Commande utilisée :** `npx create-next-app@latest agence-web --typescript --tailwind --eslint --app --src-dir --turbopack --no-git --import-alias "@/*"`
- **Stack :** Next.js 16.1.6, React 19, TypeScript 5, Tailwind CSS 4
- **Structure :** App Router avec répertoire `src/`

### 2. Tailwind CSS 4
- Déjà configuré par create-next-app
- PostCSS avec `@tailwindcss/postcss`
- Fichier : `postcss.config.mjs`
- Variables CSS dans `src/app/globals.css` avec `@theme inline`

### 3. shadcn/ui
- **Commande :** `npx shadcn@latest init -y -d --src-dir`
- Composants ajoutés : Button, Card
- Fichiers créés :
  - `src/components/ui/button.tsx`
  - `src/components/ui/card.tsx`
  - `src/lib/utils.ts`
  - `components.json` (config)
- Thème : new-york, base-color: neutral

### 4. ESLint + Prettier
- **Packages :** eslint-config-prettier, eslint-plugin-prettier, prettier, prettier-plugin-tailwindcss
- **Fichiers :**
  - `.prettierrc` : config Prettier (semi, singleQuote, tabWidth 2, etc.)
  - `.prettierignore` : node_modules, .next, etc.
  - `eslint.config.mjs` : intégration Prettier via eslint-config-prettier
- **Scripts package.json :**
  - `npm run format` : formater tout le code
  - `npm run format:check` : vérifier le formatage

### 5. Aliases d'import
- **tsconfig.json :** `"@/*": ["./src/*"]` (couvre @/components, @/lib, @/hooks, etc.)
- **components.json (shadcn) :** aliases pour components, utils, ui, lib, hooks

### 6. Structure modulaire - Agence Web

```
src/
├── app/                    # App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── services/page.tsx
│   ├── projets/page.tsx
│   ├── a-propos/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── theme-provider.tsx   # next-themes pour dark mode
│   ├── hero/                # Composant Hero moderne
│   │   ├── Hero.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── index.ts
│   └── ui/                 # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── label.tsx
│       ├── navigation-menu.tsx
│       ├── sheet.tsx
│       ├── dialog.tsx
│       └── sonner.tsx
├── config/
│   └── site.ts             # Configuration du site (nav, liens)
├── features/
│   └── home/
│       ├── sections/
│       │   ├── hero-section.tsx
│       │   └── services-section.tsx
│       └── index.ts
├── hooks/
│   └── use-media-query.ts
├── lib/
│   └── utils.ts
└── types/
    └── index.ts
```

### 7. Pages créées
- **/** : Accueil avec Hero + Services
- **/services** : Placeholder
- **/projets** : Placeholder
- **/a-propos** : Placeholder
- **/contact** : Placeholder

---

## Instructions pour le prochain agent

1. **Démarrer le projet :** `cd agence-web && npm run dev`
2. **Ajouter des composants shadcn :** `npx shadcn@latest add [component-name] -y`
3. **Structure à respecter :**
   - Nouveaux composants UI → `src/components/ui/` ou `src/components/[nom]/`
   - Nouvelles features → `src/features/[feature-name]/`
   - Configuration → `src/config/`
   - Types → `src/types/`
4. **Formatage :** Exécuter `npm run format` avant commit
5. **Build :** `npm run build` pour vérifier la compilation

---

## Fichiers de configuration importants

| Fichier | Rôle |
|---------|------|
| `components.json` | Config shadcn/ui (style, aliases) |
| `tsconfig.json` | TypeScript + path aliases |
| `eslint.config.mjs` | ESLint flat config |
| `.prettierrc` | Prettier |
| `postcss.config.mjs` | Tailwind CSS 4 |

---

## État du projet

✅ Build réussi  
✅ Toutes les pages compilent  
✅ Navigation fonctionnelle  
✅ shadcn/ui opérationnel  
