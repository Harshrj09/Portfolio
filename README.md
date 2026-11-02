# Harshraj Shrivastava — Portfolio

A bold, interactive single-page portfolio built with React, Tailwind CSS, Framer Motion, and Recharts.

## Tech Stack

- **Vite + React + TypeScript** — fast dev + type safety
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — animations (scroll reveal, counters, hover effects)
- **Recharts** — ready for data visualisations
- **Lucide React** — icons

## Getting Started

```bash
# Install dependencies
cd portfolio
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
portfolio/
├── public/
│   └── assets/           ← Drop your files here
│       ├── profile.jpg       Professional photo (hero section)
│       ├── resume.pdf        Résumé for download button
│       ├── amazon-mvp.pdf    Amazon MVP case study
│       └── capstone-dashboard.png  Capstone dashboard screenshot
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          Fixed nav with dark/light toggle
│   │   ├── ScrollProgress.tsx  Top scroll progress bar
│   │   ├── Hero.tsx            Hero with animated name + gradient ring
│   │   ├── About.tsx           Stats counters + bio
│   │   ├── FunnelChart.tsx     Demand generation funnel (animated)
│   │   ├── CampaignImpact.tsx  Before/after campaign visuals
│   │   ├── Experience.tsx      Interactive timeline (expand/collapse)
│   │   ├── Projects.tsx        Project cards with modal
│   │   ├── Skills.tsx          Animated pill chips
│   │   ├── Education.tsx       Education, achievements, POR, extras
│   │   ├── Contact.tsx         Contact info + form
│   │   ├── Footer.tsx          Footer
│   │   ├── SectionHeading.tsx  Animated section heading
│   │   └── AnimatedCounter.tsx Count-up animation
│   ├── context/
│   │   └── ThemeContext.tsx     Dark/light mode provider
│   ├── hooks/
│   │   ├── useInView.ts        IntersectionObserver hook
│   │   └── useReducedMotion.ts Prefers-reduced-motion hook
│   ├── data/
│   │   └── content.ts          All portfolio content (edit this!)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               Tailwind + custom animations
├── vite.config.ts
├── package.json
└── README.md
```

## Where to Drop Assets

| File | Location | Status |
|------|----------|--------|
| `profile.jpg` | `public/assets/profile.jpg` | ✅ Copied from workspace |
| `resume.pdf` | `public/assets/resume.pdf` | ✅ Copied from `Accenture_Resume.pdf` |
| `amazon-mvp.pdf` | `public/assets/amazon-mvp.pdf` | ✅ Copied from `Amazon FITNESS.pdf` |
| `capstone-dashboard.png` | `public/assets/capstone-dashboard.png` | ✅ Copied from `tableau.png` |

## Personal Details Used

| Field | Value |
|-------|-------|
| Email | hrs091201@gmail.com |
| Alt Email | Harshraj.ft272017@greatlakes.edu.in |
| LinkedIn | https://www.linkedin.com/in/harshraj-shrivastava/ |
| City | Bangalore |

Edit all content in `src/data/content.ts`.

## Features

- **Dark/Light mode** — animated toggle, persisted in localStorage
- **Animated stat counters** — count up when scrolled into view
- **Demand Generation Funnel** — animated horizontal bar chart
- **Campaign Impact** — before/after comparison bars
- **Interactive timeline** — expand/collapse experience details
- **Project modals** — click cards for Problem → Approach → Result
- **Skills chips** — animated pills that glow on hover
- **Scroll progress bar** — gradient bar at top of page
- **Smooth scroll** — nav links scroll smoothly
- **Reduced motion** — respects `prefers-reduced-motion`
- **Fully responsive** — bento grid collapses to single column on mobile

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Framework: Vite
4. Build command: `npm run build`
5. Output dir: `dist`
6. Deploy

### Netlify

1. Push to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Customisation

- **Content**: Edit `src/data/content.ts`
- **Colours**: Edit CSS variables in `src/index.css`
- **Fonts**: Change Google Fonts link in `index.html`
- **Animations**: Tweak Framer Motion props in components
