<div align="center">

<img src="https://raw.githubusercontent.com/hemasaivattikuti25/Projectile-simulator/main/public/vite.svg" width="80" alt="Projectile Simulator Logo" />

# 🎯 Projectile Simulator

**A real-time 3D physics engine — built for the browser.**

[![Live Demo (Vercel)](https://img.shields.io/badge/🚀%20Live%20Demo-Vercel-00f2ff?style=for-the-badge)](https://projectile-simulator-rho.vercel.app)
[![Live Demo (GitHub Pages)](https://img.shields.io/badge/🚀%20Live%20Demo-GitHub%20Pages-24292f?style=for-the-badge)](https://hemasaivattikuti25.github.io/Projectile-simulator/)
[![GitHub Stars](https://img.shields.io/github/stars/hemasaivattikuti25/Projectile-simulator?style=for-the-badge&color=yellow)](https://github.com/hemasaivattikuti25/Projectile-simulator/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-FF4500?style=flat-square)
![Rapier](https://img.shields.io/badge/Rapier_Physics-1a1a2e?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📸 Preview

> *Launch a cannon, watch the arc, analyse the data — all in real-time 3D.*

| 3D Scene & Controls | Live Motion Graphs |
|:---:|:---:|
| Fire projectiles across realistic terrain with adjustable parameters | Real-time velocity & height charts plotted during flight |

---

## ✨ What It Does

Projectile Simulator is an interactive, physics-accurate 3D ballistics tool. Set your parameters, fire the cannon, and watch a real-time trajectory unfold — powered by a custom **RK4 numerical integrator** for laboratory-grade accuracy.

Whether you're exploring kinematics, building intuition for physics, or just want to fire things across the Moon — this is the tool.

---

## 🚀 Features at a Glance

| Feature | Details |
|:---|:---|
| 🧪 **Accurate Physics** | RK4 integrator with air drag (Cd = 0.47), wind force, and mass |
| 🌍 **Multi-Planet Gravity** | Earth (9.81), Moon (1.62), Mars (3.71), or Anti-Gravity |
| 🎚️ **Full Control Panel** | Angle, velocity, wind speed, mass — all live sliders |
| 📊 **Live Analytics** | Velocity vs Time & Height vs Time charts during flight |
| 📏 **Real-time Display** | Distance travelled & max height shown mid-flight |
| 🎥 **360° Camera** | Free orbit with mouse drag, zoom, auto-track on fire |
| ⌨️ **Keyboard Shortcuts** | Space to fire, R to reset, ↑↓ to adjust angle |
| 🎨 **Premium Dark UI** | Glassmorphism panels, glowing accents, micro-animations |

---

## 🌍 Gravity Modes

| 🌍 Earth | 🌕 Moon | 🔴 Mars | ⬆️ Anti-Gravity |
|:---:|:---:|:---:|:---:|
| 9.81 m/s² | 1.62 m/s² | 3.71 m/s² | Gravity reversed |

---

## 🎮 Controls

| Input | Action |
|:---|:---|
| `SPACE` | 🔥 Fire the cannon |
| `R` | 🔄 Reset simulation |
| `↑` / `↓` | 📐 Adjust launch angle |
| Mouse Drag | 🎥 Orbit camera (360°) |
| Scroll Wheel | 🔍 Zoom in / out |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|:---|:---|
| **React 19 + TypeScript** | UI & application logic |
| **Vite 7** | Lightning-fast build tool & dev server |
| **Three.js** | 3D rendering engine |
| **@react-three/fiber** | React declarative wrapper for Three.js |
| **@react-three/drei** | Camera, Grid, Environment, Trail helpers |
| **Rapier (WASM)** | Real-time physics engine |
| **Zustand** | Lightweight global state management |
| **Recharts** | Responsive data visualization charts |
| **Lucide React** | Modern icon library |
| **Vanilla CSS3** | Glassmorphism styling & animations |

---

## ⚡ Run Locally

```bash
# Clone the repository
git clone https://github.com/hemasaivattikuti25/Projectile-simulator.git
cd Projectile-simulator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open → **http://localhost:5173**

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

### Vercel (Recommended)

This project is deployed on **Vercel** with zero-config. Simply push to `main` and Vercel auto-deploys.

- **Live URL**: [projectile-simulator-rho.vercel.app](https://projectile-simulator-rho.vercel.app)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

A [`vercel.json`](vercel.json) is included with SPA rewrites and asset caching headers.

### GitHub Pages

GitHub Pages deployment is handled automatically via GitHub Actions on push to `main`.

- **Live URL**: [hemasaivattikuti25.github.io/Projectile-simulator](https://hemasaivattikuti25.github.io/Projectile-simulator/)
- The workflow sets the proper `base` path for sub-directory hosting via the `GITHUB_PAGES` environment variable.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── Scene.tsx              # Root 3D canvas + lighting + camera
│   │   ├── Cannon.tsx             # 3D cannon mesh with angle rotation
│   │   ├── Projectile.tsx         # Flying projectile with trail effect
│   │   ├── Trajectory.tsx         # Predicted arc path (dashed line)
│   │   ├── Explosion.tsx          # Impact particle effect (instanced)
│   │   ├── DistanceMarkers.tsx    # Distance markers every 50m
│   │   ├── CameraController.tsx   # Multi-mode camera system
│   │   ├── CameraRig.tsx          # Gunner/Bullet camera logic
│   │   └── FollowCam.tsx          # Projectile follow camera
│   └── ui/
│       ├── ControlPanel.tsx       # Physics input sliders & actions
│       ├── ControlPanel.css       # Control panel styles
│       ├── Analytics.tsx          # Pre-launch RK4 chart preview
│       ├── Analytics.css          # Analytics panel styles
│       ├── MotionGraphs.tsx       # Live flight data graphs
│       ├── DistanceDisplay.tsx    # Real-time distance & height HUD
│       ├── HUD.tsx                # Velocity/Angle top bar
│       ├── HUD.css                # HUD styles
│       ├── LoadingScreen.tsx      # Animated loading screen
│       ├── LoadingScreen.css      # Loading screen styles
│       ├── KeyboardHints.tsx      # Keyboard shortcut overlay
│       └── KeyboardHints.css      # Keyboard hints styles
├── lib/
│   └── physics/
│       └── rk4Solver.ts           # Custom RK4 integration engine
├── store/
│   └── useStore.ts                # Zustand global state
├── utils/
│   └── physicsUtils.ts            # Physics helper functions
├── App.tsx                        # Root component with keyboard shortcuts
├── App.css                        # App layout & glassmorphism styles
├── main.tsx                       # React entry point
└── index.css                      # CSS variables & global styles
```

---

## 🧠 Physics Engine

Trajectories are computed using the **4th-order Runge-Kutta (RK4) method**:

```
State vector: [x, y, z, vx, vy, vz]

Forces applied per step:
  Gravity  →  F = -m × g
  Wind     →  F = windVector × m
  Drag     →  F = -½ × Cd × ρ × A × |v|² × v̂
```

RK4 averages four slope estimates per step, making it significantly more accurate than basic Euler integration — especially over long trajectories.

### Why RK4?

| Method | Accuracy | Error per Step |
|:---|:---|:---|
| Euler | 1st order | O(h²) |
| RK2 (Midpoint) | 2nd order | O(h³) |
| **RK4** | **4th order** | **O(h⁵)** |

---

## 🧩 Key Implementation Details

- **State Management**: Zustand store with typed actions for all simulation parameters
- **Real-time Rendering**: `useFrame` hooks for 60fps projectile position updates
- **Dual Analytics**: Pre-launch RK4 prediction charts + live flight data graphs
- **Camera System**: Auto-tracking OrbitControls that follow the projectile in flight
- **Trail Effect**: `@react-three/drei` Trail component for motion visualization
- **Responsive UI**: Glassmorphism panels with CSS custom properties for theming

---

## 👨‍💻 Author

<div align="center">

**Hemasai Vattikuti**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemsaivattikuti)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hemasaivattikuti25)

</div>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with precision. Rendered with passion. Physics never looked this good. ⚡</sub>
</div>
