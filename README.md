# 🎯 3D Projectile Simulator

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Rapier](https://img.shields.io/badge/Rapier%20Physics-FF4500?style=for-the-badge)

### A high-fidelity, real-time 3D ballistic simulation engine built for curious minds.

[**🚀 Open Live Simulation**](https://projectile-simulator-rho.vercel.app)

</div>

---

## 📖 Overview

**Projectile Simulator** is an interactive 3D physics visualization tool that brings classical mechanics to life in your browser. Whether you're a student learning kinematics, a developer exploring 3D rendering, or just someone who wants to blow things up virtually — this is built for you.

Powered by **React Three Fiber** and a custom **RK4 numerical integrator**, the simulation computes accurate trajectories in real time — factoring in gravity, wind, air resistance, and mass.

---

## ✨ Features

### 🧪 Physically Accurate Engine
- Custom **RK4 (Runge-Kutta 4th Order)** integrator for high-precision trajectory computation
- Realistic **air drag** using a standard sphere drag coefficient (Cd = 0.47)
- Accurate **wind force** modeled as a dynamic force vector

### 🌍 Multi-Planetary Gravity
| Planet | Gravity (m/s²) |
| :---   | :---           |
| 🌍 Earth | 9.81 |
| 🌕 Moon  | 1.62 |
| 🔴 Mars  | 3.71 |
| ⬆️ Anti-Gravity | Reversed! |

### 🎛️ Real-Time Control Panel *(Left Sidebar)*
- **Launch Angle** — 0° to 180° with ↑/↓ arrow keys
- **Initial Velocity** — 0 to 300 m/s
- **Wind Speed** — -20 to +20 m/s (directional)
- **Projectile Mass** — 0.1 to 10 kg

### 📊 Live Analytics *(Left Panel after launch)*
- **Velocity vs Time** chart
- **Height vs Time** chart
- **Distance** and **Max Height** display during flight

### 🎥 Full 3D Camera with Orbit Controls
- 360° free-look with mouse drag
- Zoom in and out to any scale
- Camera auto-tracks the projectile during flight

### 🎨 Premium Dark Glass UI
- Glassmorphism panels with `backdrop-filter` blur
- Glowing cyan accent system (`#00f2ff`)
- Custom-styled range sliders with glow-on-grab effect
- Smooth micro-animations everywhere

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | React 19 + TypeScript + Vite |
| **3D Rendering** | Three.js, @react-three/fiber, @react-three/drei |
| **Physics** | @react-three/rapier (Rapier WASM), Custom RK4 Solver |
| **State Management** | Zustand |
| **Data Visualization** | Recharts |
| **Styling** | Vanilla CSS3 (Variables, Animations, Glassmorphism) |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v18+**
- npm or yarn

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/hemasaivattikuti25/Projectile-simulator.git

# 2. Enter the directory
cd Projectile-simulator

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build
```

---

## 🎮 Controls

| Input | Action |
| :--- | :--- |
| `SPACE` | 🔥 Fire the cannon |
| `R` | 🔄 Reset simulation |
| `↑` / `↓` | 📐 Adjust launch angle |
| `Mouse Drag` | 🎥 Orbit camera (360°) |
| `Scroll Wheel` | 🔍 Zoom in / out |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── canvas/         # Three.js 3D scene components
│   │   ├── Scene.tsx       – Root canvas + lighting
│   │   ├── Cannon.tsx      – 3D cannon model
│   │   ├── Projectile.tsx  – The flying ball
│   │   ├── Trajectory.tsx  – Predicted path arc
│   │   ├── Explosion.tsx   – Impact particle effect
│   │   └── DistanceMarkers.tsx
│   └── ui/             # 2D overlay UI components
│       ├── ControlPanel.tsx  – Left sidebar with all inputs
│       ├── Analytics.tsx     – Real-time charts panel
│       ├── MotionGraphs.tsx  – Live flight data graphs
│       ├── HUD.tsx           – Top velocity/angle display
│       ├── LoadingScreen.tsx
│       └── KeyboardHints.tsx
├── lib/
│   └── physics/
│       └── rk4Solver.ts  – RK4 numerical integration engine
├── store/
│   └── useStore.ts       – Global Zustand state
└── utils/
    └── physicsUtils.ts   – Helper physics calculations
```

---

## 🧠 How the Physics Works

The trajectory is computed using the **RK4 numerical method** at each timestep:

```
State: { x, y, z, vx, vy, vz }

Forces:
  - Gravity:  F = -m × g (downward)
  - Wind:     F = windVector × mass
  - Drag:     F = -0.5 × Cd × ρ × A × v² (opposing velocity)
```

The **RK4 solver** averages four slope estimates per step, giving significantly better accuracy than basic Euler integration — especially for tracking long-range trajectories with air resistance.

---

## 👨‍💻 Developed By

<div align="center">

**Hemasai Vattikuti**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hemsaivattikuti)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hemasaivattikuti25)

</div>

---

<div align="center">
<i>Built with precision. Rendered with passion. Physics never looked this good.</i>
</div>
