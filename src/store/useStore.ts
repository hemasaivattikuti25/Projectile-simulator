import { create } from 'zustand';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface SimulationState {
  launchAngle: number;
  launchVelocity: number;
  gravity: number;
  windSpeed: number;
  projectileMass: number;
  isFired: boolean;
  cannonPosition: Vector3;
  startTime: number | null;
  isAntiGravity: boolean;

  setLaunchAngle: (angle: number) => void;
  setLaunchVelocity: (velocity: number) => void;
  setGravity: (gravity: number) => void;
  setIsAntiGravity: (isAnti: boolean) => void;
  setWindSpeed: (wind: number) => void;
  setProjectileMass: (mass: number) => void;
  fire: () => void;
  reset: () => void;
}

export const useStore = create<SimulationState>((set) => ({
  launchAngle: 45,
  launchVelocity: 50,
  gravity: 9.81,
  windSpeed: 0,
  projectileMass: 1,
  isFired: false,
  cannonPosition: { x: 0, y: 0.5, z: 0 },
  startTime: null,
  isAntiGravity: false,

  setLaunchAngle: (angle) => set({ launchAngle: angle }),
  setLaunchVelocity: (velocity) => set({ launchVelocity: velocity }),
  setGravity: (gravity) => set({ gravity }),
  setIsAntiGravity: (isAntiGravity) => set({ isAntiGravity }),
  setWindSpeed: (wind) => set({ windSpeed: wind }),
  setProjectileMass: (mass) => set({ projectileMass: mass }),
  fire: () => set({ isFired: true, startTime: performance.now() }),
  reset: () => set({ isFired: false, startTime: null }),
}));
