# Aerospace Engineering Portfolio — Ayushman Srivastava

> Production-ready, premium personal portfolio website engineered for **Ayushman Srivastava** (B.Tech Aeronautical Engineering Student at FGIET Rae Bareli, Class of 2027). Built with React 19, TypeScript, Vite, Tailwind CSS v4, Three.js WebGL, Recharts, and React Router.

---

## 🚀 Key Engineering Highlights

- **Interactive 3D Aerospace Canvas (Three.js):** Real-time procedural delta-wing interceptor with orbit/attitude controls (Pitch/Roll/Yaw telemetry), coordinate reticle, grid ground plane, and graceful blueprint fallback for mobile/non-WebGL browsers.
- **Closed-Loop PID Flight Controller:** Canvas-based dynamic altitude physics simulation with $K_p$ and $K_d$ gain parameter tuning, step command targeting, and wind turbulence disturbance modes.
- **Atmospheric Density Explorer Widget:** International Standard Atmosphere (ICAO ISA) mathematical model calculating temperature ($T$), pressure ($P$), air density ($\rho$), and speed of sound ($a$) from sea level up to 20 km.
- **Orbital Mechanics Visualizer (3D Earth + Keplerian LEO):** Two-body circular Low Earth Orbit propagator with adjustable orbital altitude ($h$) and inclination ($i$), displaying velocity ($v = \sqrt{\mu/r}$) and orbital period ($T$).
- **Aerospace Unit Converter:** Standard conversions for airspeed (knots $\leftrightarrow$ m/s), altitude (ft $\leftrightarrow$ m), angular velocity (RPM $\leftrightarrow$ rev/s), and distance.
- **Verified Engineering Case Studies:**
  - **UAV Propeller Aerodynamic Analysis:** ANSYS Fluent CFD, k-omega SST model at 6000 RPM, $C_l = 0.35$, $C_d = 0.095$, tip speed 41.4 m/s, with interactive Recharts force convergence history.
  - **1U CubeSat LEO Mission:** NASA GMAT orbital trajectory propagation with 10g quasi-static launch load FEA and solar/eclipse radiative thermal equilibrium in ANSYS Mechanical.
  - **Aerospace CAD Modelling:** Parametric assemblies and orthographic drawings in SolidWorks, AutoCAD, and Onshape.
  - **MATLAB Flight Dynamics:** Vertical altitude state-space model and Simulink PID control loop.
  - **CardioGuard IoT Health Monitor:** ESP8266, MAX30102 PPG, AD8232 ECG, ThingSpeak cloud analytics, Telegram bot emergency broadcasts, and bespoke 3D-printed enclosure.
  - **Sudden Contraction Pipe Flow CFD:** ANSYS Fluent transient study across an 80 mm to 40 mm diameter throat constriction.
- **Multi-Theme System:**
  - **Theme A: Deep Space** (Default, dark navy with cyan accents)
  - **Theme B: Aerospace Light** (Clean laboratory presentation with aerospace blue)
  - **Theme C: Midnight Violet** (Dark charcoal research aesthetic)
  - LocalStorage persistence and automatic OS color scheme detection.
- **Procedural Web Audio Engine:** Zero-dependency synthetic cockpit sound feedback synthesized on-the-fly via Web Audio API.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Core** | React 19, TypeScript, Vite 6 |
| **Routing** | React Router v7 (`react-router-dom`) with client-side SPA redirects |
| **Styling & Design System** | Tailwind CSS v4, Custom CSS Custom Properties |
| **Interactive 3D / WebGL** | Three.js (Procedural geometries, OrbitControls, PBR materials) |
| **Charts & Data Viz** | Recharts (Force convergence & time-series step responses) |
| **Form & Validation** | React Hook Form, Zod schema validation, Formspree API |
| **Typography** | Space Grotesk (Headings), Inter (Body), IBM Plex Mono (Technical HUD) |
| **Icons & Audio** | Lucide React, Custom Web Audio API synthesizer |

---

## 📁 Project Architecture

```text
ayushman-portfolio/
├── public/
│   ├── projects/          # High-resolution CFD, FEA, CAD, and circuit imagery
│   │   ├── quadcopter/    # UAV assembly, ANSYS pressure contours, convergence plots
│   │   ├── cubesat/       # 1U CubeSat CAD, 10g FEA stress, thermal hot/cold cases
│   │   ├── cardioguard/   # Hardware prototype, ThingSpeak dashboard, Telegram alerts
│   │   └── pipeflow/      # CFD streamlines, velocity pathlines, solver convergence
│   ├── resume/            # Verified downloadable resume PDF (Ayushmanresume.pdf)
│   ├── favicon.svg        # Custom delta-wing SVG monogram favicon
│   ├── _redirects         # Netlify SPA routing fallback
│   ├── robots.txt         # Search engine crawler permissions
│   └── sitemap.xml        # Complete sitemap for all routes
├── src/
│   ├── components/
│   │   ├── 3d/            # Three.js 3D scenes (AerospaceHeroCanvas, OrbitVisualizer3D)
│   │   ├── cards/         # ProjectCard, ExperienceCard, SkillCategoryCard, CertificationCard
│   │   ├── common/        # Navbar, Footer, MonogramLogo, ThemeSwitcher, CockpitAudioControl
│   │   └── widgets/       # UnitConverter, AtmosphericExplorer, OrbitVisualizer, PidFlight, Lightbox
│   ├── context/           # ThemeContext (Deep Space, Aerospace Light, Midnight Violet)
│   ├── data/              # Centralized data files: profile.ts, projects.ts, experience.ts, skills.ts, etc.
│   ├── pages/             # All routing pages: Home, About, Projects, ProjectDetail, Resume, Contact, 404
│   ├── types/             # Strong TypeScript interfaces and schemas
│   ├── utils/             # audio.ts (Web Audio synthesizer), seo.ts (Document meta titles)
│   ├── App.tsx            # Main application router and theme wrapper
│   ├── index.css          # Design tokens, themes, technical grid backgrounds
│   └── main.tsx           # Application entry point
├── netlify.toml           # Netlify build and redirect configuration
├── vercel.json            # Vercel rewrite configuration for SPA routing
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite build configuration
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### 1. Install dependencies:
```bash
npm install
```

### 2. Run the local development server:
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to interact with the application.

### 3. Build for production:
```bash
npm run build
```
Generates an optimized, tree-shaken static production bundle in the `dist/` directory.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. The included `vercel.json` will automatically configure client-side SPA routing.
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository on [Netlify](https://netlify.com).
2. The included `netlify.toml` and `public/_redirects` will automatically handle build settings (`dist/`) and route all requests to `/index.html`.
3. Click **Deploy Site**.

---

## 📝 Central Content Management

All portfolio information can be customized directly in `src/data/`:
- **`profile.ts`**: Update your contact email, phone, LinkedIn, GitHub, bio, and availability status.
- **`projects.ts`**: Add, update, or edit engineering case studies, numerical results, and images.
- **`experience.ts`**: Add new internships, research positions, or engineering roles.
- **`skills.ts`**: Update software tools, CAE packages, and programming capabilities.
- **`certifications.ts`**: Add new ISRO, NPTEL, or professional certifications.
- **`education.ts`**: Update academic achievements, SGPA, and coursework.

---

## ⚖️ License
Released under the Apache-2.0 License. © 2026 Ayushman Srivastava. All engineering rights reserved.
