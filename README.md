<div align="center">

<img src="https://raw.githubusercontent.com/hemasaivattikuti25/Projectile-simulator/main/public/vite.svg" width="80" alt="Projectile Simulator Logo" />

# 🎯 Projectile Simulator

**A real-time 3D physics engine — built for the browser.**

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-00f2ff?style=for-the-badge)](https://hemasaivattikuti25.github.io/Projectile-simulator/)
[![GitHub Stars](https://img.shields.io/github/stars/hemasaivattikuti25/Projectile-simulator?style=for-the-badge&color=yellow)](https://github.com/hemasaivattikuti25/Projectile-simulator/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![React](https://img.shields.io/badge/React_19-20232a?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=flat-square&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-FF4500?style=flat-square)
![Rapier](https://img.shields.io/badge/Rapier_Physics-1a1a2e?style=flat-square)

</div>

---

## 📸 Preview

> *Launch a cannon, watch the arc, analyse the data — all in real-time 3D.*

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

```
React 19 + TypeScript  →  UI & logic
Vite                   →  Build tool
Three.js               →  3D rendering
@react-three/fiber     →  React wrapper for Three.js
@react-three/drei      →  Camera, Grid, Environment helpers
Rapier (WASM)          →  Real-time physics engine
Zustand                →  Global state management
Recharts               →  Data charts
Lucide React           →  Icons
Vanilla CSS3           →  Glassmorphism styling & animations
```

---

## ⚡ Run Locally

```bash
# Clone
git clone https://github.com/hemasaivattikuti25/Projectile-simulator.git
cd Projectile-simulator

# Install
npm install

# Run dev server
npm run dev
```

Open → **http://localhost:5173**

```bash
# Build for production
npm run build
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── Scene.tsx          # Root 3D canvas + lighting
│   │   ├── Cannon.tsx         # 3D cannon mesh
│   │   ├── Projectile.tsx     # Flying projectile mesh
│   │   ├── Trajectory.tsx     # Predicted arc path
│   │   ├── Explosion.tsx      # Impact particle effect
│   │   └── DistanceMarkers.tsx
│   └── ui/
│       ├── ControlPanel.tsx   # All physics input sliders
│       ├── Analytics.tsx      # Pre-launch chart preview
│       ├── MotionGraphs.tsx   # Live flight data graphs
│       ├── HUD.tsx            # Velocity/angle HUD bar
│       ├── LoadingScreen.tsx
│       └── KeyboardHints.tsx
├── lib/physics/
│   └── rk4Solver.ts           # Custom RK4 integration engine
├── store/
│   └── useStore.ts            # Zustand global state
└── utils/
    └── physicsUtils.ts        # Physics helper functions
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

---

## 👨‍💻 Author

<div align="center">

**Hemasai Vattikuti**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemsaivattikuti)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hemasaivattikuti25)

</div>

---

<div align="center">
  <sub>Built with precision. Rendered with passion. Physics never looked this good. ⚡</sub>
</div>
