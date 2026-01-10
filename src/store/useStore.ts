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
  windSpeed: number; // m/s horizontal wind
  projectileMass: number; // kg
  isPlaying: boolean;
  score: number;
  simulationSpeed: number;
  isFired: boolean;
  cannonPosition: Vector3;
  cameraMode: 'GUNNER' | 'SPECTATOR' | 'BULLET';
  startTime: number | null;
  isAntiGravity: boolean;

  // Actions
  setLaunchAngle: (angle: number) => void;
  setLaunchVelocity: (velocity: number) => void;
  setGravity: (gravity: number) => void;
  setIsAntiGravity: (isAnti: boolean) => void;
  setWindSpeed: (wind: number) => void;
  setProjectileMass: (mass: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSimulationSpeed: (speed: number) => void;
  setCannonPosition: (pos: Vector3) => void;
  setCameraMode: (mode: 'GUNNER' | 'SPECTATOR' | 'BULLET') => void;
  fire: () => void;
  reset: () => void;
  incrementScore: () => void;
}

export const useStore = create<SimulationState>((set) => ({
  launchAngle: 45,
  launchVelocity: 50,
  gravity: 9.81,
  windSpeed: 0,
  projectileMass: 1,
  isPlaying: false,
  score: 0,
  simulationSpeed: 1,
  isFired: false,
  cannonPosition: { x: 0, y: 0.5, z: 0 },
  cameraMode: 'SPECTATOR',
  startTime: null,
  isAntiGravity: false,

  setLaunchAngle: (angle) => set({ launchAngle: angle }),
  setLaunchVelocity: (velocity) => set({ launchVelocity: velocity }),
  setGravity: (gravity) => set({ gravity }),
  setIsAntiGravity: (isAntiGravity) => set({ isAntiGravity }),
  setWindSpeed: (wind) => set({ windSpeed: wind }),
  setProjectileMass: (mass) => set({ projectileMass: mass }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSimulationSpeed: (simulationSpeed) => set({ simulationSpeed }),
  setCannonPosition: (pos) => set({ cannonPosition: pos }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  fire: () => set({ isFired: true, isPlaying: true, startTime: performance.now() }),
  reset: () => set({ isFired: false, isPlaying: false, startTime: null }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
}));
