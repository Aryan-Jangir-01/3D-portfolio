# 🚀 Aryan Jangir - Ultra-Modern Interactive Portfolio Roadmap (GSD Plan)

## 📌 Vision & Architecture
A next-generation, high-performance, and futuristic developer portfolio featuring:
- **Design Language**: Futuristic Glassmorphism, Neon Cyberpunk accents, Smooth Bento Grid layout.
- **Tech Stack**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas-confetti, Web Audio API sound synthesis.
- **Dynamic Capabilities**:
  1. **Theme Switcher**: 5 futuristic themes (Cyber Neon, Deep Space Obsidian, Matrix Glow, Retro Synthwave, Minimal Clean).
  2. **Custom Interactive Canvas**: Fluid constellation & magnetic particle starfield responding to cursor movement.
  3. **Retro/Cyber Sound FX Engine**: Web Audio API (zero external heavy assets) with mute toggle & audio feedback on clicks/hovers.
  4. **Interactive Terminal Mode (`AryanOS CLI`)**: Real command line with `help`, `about`, `skills`, `projects`, `sudo hire`, `matrix`, `cat resume`, `clear`.
  5. **Command Palette (`Ctrl + K`)**: Quick keyboard spotlight navigation across sections and settings.
  6. **Interactive Skill Cosmos**: Categorized skill cards with proficiency, tech badges, and filtering.
  7. **Showcase Projects with 3D Tilt Cards**: Bento grid cards with tags, live demo links, source code, and full-detail modal drawer.
  8. **Experience & Milestones Timeline**: Animated interactive career path and education cards.
  9. **Interactive Arcade / Mini-Game**: Built-in playable retro game (Space Dodger) with high-score tracking & mobile controls.
  10. **Interactive AI Portfolio Assistant ("AryanBot")**: Floating virtual assistant with instant responses for recruiters.
  11. **Contact Hub & Confetti Celebration**: Direct message form with validation, one-click copy email with sound, and celebratory confetti.
  12. **Single Source of Truth (`src/data/portfolioData.ts`)**: Easily editable configuration for personal info, links, projects, and experiences.

---

## 📅 Execution Phases

### Phase 1: Project Initialization & Core Scaffolding
- [x] Initialize Vite React + TypeScript project
- [x] Install and configure Tailwind CSS & Autoprefixer
- [x] Install required packages (`lucide-react`, `canvas-confetti`, `@types/canvas-confetti`, `clsx`, `tailwind-merge`)
- [x] Setup folder structure (`components/`, `data/`, `hooks/`, `types/`, `utils/`)
- [x] Verification: Build test (`npm run build`) runs cleanly without errors

### Phase 2: Design System, Themes & Sound Engine
- [x] Configure Tailwind theme colors, glow utilities, glassmorphism backdrops, and custom scrollbars
- [x] Implement Sound FX synthesizer using Web Audio API (`utils/sound.ts`)
- [x] Implement Particle Starfield Canvas (`components/StarfieldCanvas.tsx`)
- [x] Implement Custom Cursor with particle glow & magnetic hover states (`components/CustomCursor.tsx`)
- [x] Implement Theme Context & Switcher (Cyber Neon, Obsidian, Matrix, Synthwave, Minimal)
- [x] Verification: Sound toggling, theme switching, and smooth 60fps canvas animation verified

### Phase 3: Central Config & Navigation System
- [x] Create `src/data/portfolioData.ts` with Aryan Jangir's profile, links, skills, projects, and experiences
- [x] Build Futuristic Navbar with live time indicator (IST), sound toggle, theme selector, and mobile drawer
- [x] Implement Command Palette (`Ctrl + K` / `Cmd + K`) for instant navigation and actions
- [x] Build Floating macOS / Sci-Fi Glass Dock for quick social links
- [x] Verification: Command palette triggers on shortcut, links navigate cleanly

### Phase 4: Hero, About & Skills Ecosystem
- [x] Build Hero Section with Glitch/Typewriter title, live availability status, and quick CTA buttons
- [x] Build Bento-grid About Section with live status badge, Spotify vibe card, and tech philosophy
- [x] Build Interactive Skills Matrix with category filters (Frontend, Backend, DevOps/Cloud, AI/Tools)
- [x] Verification: Responsive layout check, filter interactions, and smooth transitions

### Phase 5: Projects Showcase & Interactive Case Studies
- [x] Build 3D Tilt Project Cards with tech stack tags, preview thumbnails, and status badges
- [x] Build Project Details Modal with architecture breakdown, highlights, and demo links
- [x] Add project search & category filter (Fullstack, AI, Web3, Systems)
- [x] Verification: Modal opens with backdrop blur, all links active and responsive

### Phase 6: Experience Timeline & Interactive Mini-Game Arcade
- [x] Build Experience & Education Milestones Timeline with interactive expandable cards
- [x] Build "The Arcade" - Playable Retro Cyber Mini-Game (`Space Dodger`) with keyboard/touch controls and score tracker
- [x] Verification: Game runs smoothly, resets cleanly, controls are intuitive

### Phase 7: Interactive AI Assistant & Contact Hub
- [x] Build "AryanBot" floating AI Assistant with interactive quick questions, recruiter tips, and friendly answers
- [x] Build Contact Form with validation, sound trigger, and confetti explosion on submit
- [x] Add direct email copy button with tooltip and audio feedback
- [x] Build Footer with terminal status, copyright, and back-to-top button
- [x] Build AryanOS Terminal toggle modal with functional commands
- [x] Verification: Tested interactive features, form validation, terminal commands, and AI chat replies

### Phase 8: CodeRabbit Quality Gate & Build Verification
- [x] Review all code for edge cases, performance, accessibility, and zero TypeScript warnings
- [x] Run full production build (`npm run build`)
- [x] Verify clean console logs, responsive design for mobile, tablet, and desktop
- [x] Provide user instructions for customizing content and running/deploying the portfolio
