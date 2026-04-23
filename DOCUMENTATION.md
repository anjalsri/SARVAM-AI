# Sarvam AI: Technical Documentation

This document provides in-depth technical details about the Sarvam AI platform, its components, and architecture.

## 📐 Design System Implementation

The design system is centralized in `src/index.css` using the Tailwind CSS v4 `@theme` block.

### CSS Variables
- `--color-primary`: The main brand color (Indigo).
- `--color-secondary`: The secondary brand color (Purple).
- `--color-background`: The base background color (Deep Black).
- `--glass-bg`: Semi-transparent background for card elements.
- `--glass-border`: Light border for glassmorphism effects.

### Utility Classes
- `.text-gradient`: Applies a linear gradient to text (Primary to Secondary).
- `.glass-card`: The standard container for all premium UI elements.
- `.btn-primary`: Glowing, gradient-filled button.
- `.btn-secondary`: Transparent, bordered button with hover glows.

---

## 🏗 Component Architecture

### Public Components (`src/components/home`)

#### 1. `HeroSection.jsx`
- **Purpose**: The first point of contact for users.
- **Key Logic**: Uses `framer-motion` for title reveals and the `NeuralCanvas` component for the background animation.

#### 2. `InteractiveDashboard.jsx`
- **Purpose**: Showcases a preview of the internal platform.
- **Key Logic**: Uses `AnimatePresence` to switch between different dashboard views (Analytics, Users, Security).

#### 3. `WorkflowBuilder.jsx`
- **Purpose**: Demonstrates the autonomous agent orchestration.
- **Key Logic**: Implements a step-by-step visual workflow using interactive node cards.

### Dashboard Components (`src/pages/dashboard`)

#### 1. `Overview.jsx`
- **Purpose**: The main data hub for administrators.
- **Key Logic**: Connects to the Redux store to fetch global stats. Implements Recharts for "Revenue Propagation" (LineChart) and "Node Acquisition" (BarChart).

#### 2. `DashboardLayout.jsx`
- **Purpose**: Manages the persistent navigation and shell of the dashboard.
- **Key Logic**: Implements a glassmorphism sidebar with `motion.div` for slide-in effects on mobile.

---

## 🧠 State Management

The application uses **Redux Toolkit** for complex state management across the dashboard and content management system.

- **Admin Slice**: Manages global stats, user lists, and system alerts.
- **Auth Context**: A React Context provider that handles JWT storage, session persistence, and login/logout logic.

---

## 📡 API Integration

The frontend communicates with a FastAPI backend. All requests are handled via a custom `api` utility that automatically attaches JWT headers.

### Core Endpoints
- `POST /auth/login`: Authenticates user and returns JWT.
- `GET /admin/stats`: Fetches data for the dashboard charts.
- `GET /blog/posts`: Fetches technical articles from the CMS.

---

## 🎨 Branding Guidelines

### Visual Tone
- **Atmospheric**: Use high-contrast dark backgrounds with vibrant glowing accents.
- **Sophisticated**: Avoid rounded corners unless necessary; prefer sharp, geometric shapes with subtle radius (e.g., `rounded-2xl`).
- **Kinetic**: Every interaction should have a subtle micro-animation (e.g., hover scaling, opacity shifts).

### Imagery
- Focus on abstract representations of neural networks, constellations, and geometric meshes.
- Avoid realistic photography unless it is of high-impact technology or futuristic architecture.

---

## 🧪 Testing and Verification

- **Linting**: Run `npm run lint` to check for code consistency.
- **Build**: Run `npm run build` to verify the production bundle.
- **Accessibility**: All interactive elements have been tested for focus states and ARIA label compliance.

---
*Last Updated: April 2026*
