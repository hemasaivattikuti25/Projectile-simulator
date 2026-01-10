# 3D Projectile Simulator 🎯

A high-fidelity **scientific visualization of projectile motion** built with React, Three.js (Fiber/Drei), and custom physics solvers. This interactive simulation allows users to experiment with ballistics in a real-time 3D environment.

![Project Preview](public/vite.svg) *Add a screenshot here later if you like!*

## 🚀 Features

*   **Real-time 3D Physics**: Custom RK4 (Runge-Kutta 4th Order) integrator for precise trajectory calculation including air resistance and wind.
*   **Interactive Controls**:
    *   Adjust Launch Angle and Velocity 📐
    *   Change Gravity (Earth, Moon, Mars, etc.) or enable Anti-Gravity 🌑
    *   Control Wind Speed and Direction 💨
    *   Modify Projectile Mass ⚖️
*   **Data Analytics**: Real-time graphs showing Height vs. Time and Velocity vs. Time.
*   **Dynamic Cameras**: Switch between "Gunner View", "Spectator View" (Orbit), and "Bullet Cam".
*   **Modern UI**: Sleek, glassmorphism-inspired interface with keyboard shortcuts.

## 🛠️ Tech Stack

*   **Frontend**: React 19, TypeScript, Vite
*   **3D / Graphics**: @react-three/fiber, @react-three/drei, Three.js
*   **Physics**: Custom Physics Engine (RK4 Solver) & Rapier (for collisions)
*   **Styling**: CSS Modules, Lucide React (Icons)
*   **Charting**: Recharts

## 🎮 How to Run

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/hemasaivattikuti25/Projectile-simulator.git
    cd Projectile-simulator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## ⌨️ Controls

*   **Space**: Fire Cannon
*   **R**: Reset Simulation
*   **Arrow Up/Down**: Adjust Angle
*   **Mouse**: Orbit Camera (Spectator Mode)

## 📄 License

MIT License
