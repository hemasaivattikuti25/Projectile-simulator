import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Environment, OrbitControls } from '@react-three/drei';
import { Cannon } from './Cannon';
import { Projectile } from './Projectile';
import { Trajectory } from './Trajectory';
import { DistanceMarkers } from './DistanceMarkers';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

// Helper component to update OrbitControls target
const CameraController = () => {
    const { isFired, startTime, launchAngle, launchVelocity, gravity, isAntiGravity, cannonPosition } = useStore();
    const controlsRef = useRef<any>(null);

    useFrame(() => {
        if (!controlsRef.current) return;

        if (isFired && startTime) {
            // Calculate current projectile position analytically
            const t = (performance.now() - startTime) / 1000;
            const rad = (launchAngle * Math.PI) / 180;
            const vx = launchVelocity * Math.cos(rad);
            const vy = launchVelocity * Math.sin(rad);

            const x = cannonPosition.x + vx * t;
            let y = isAntiGravity
                ? cannonPosition.y + vy * t + 0.5 * gravity * t * t
                : cannonPosition.y + vy * t - 0.5 * gravity * t * t;

            if (y < 0 && !isAntiGravity) y = 0; // clamp

            // Smoothly move target to projectile
            controlsRef.current.target.lerp(new THREE.Vector3(x, y, 0), 0.1);
        } else {
            // Reset target to Look at Cannon area
            controlsRef.current.target.lerp(new THREE.Vector3(cannonPosition.x + 5, cannonPosition.y, 0), 0.1);
        }

        controlsRef.current.update();
    });

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault
            minDistance={5}
            maxDistance={2000}
        />
    );
};

const ShootingScene = () => {
    return (
        <>
            {/* Scientific Realism - Dark Mode */}
            <color attach="background" args={['#0f172a']} />
            <fog attach="fog" args={['#0f172a', 20, 100]} />

            <Environment preset="night" blur={1} />
            <ambientLight intensity={0.5} />

            {/* Single Sun as requested */}
            <directionalLight
                position={[-10, 50, 20]}
                intensity={2}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* Mechanics Group */}
            <group>
                <Cannon />
                <Projectile />
                <Trajectory />
                <DistanceMarkers />
            </group>

            {/* Floor and Grid - Dark Surface */}
            <mesh receiveShadow position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.2} />
            </mesh>

            <Grid
                infiniteGrid
                fadeDistance={1000}
                fadeStrength={0.3}
                cellSize={5}
                sectionSize={50}
                cellColor="#3b82f6"
                sectionColor="#60a5fa"
                cellThickness={1.5}
                sectionThickness={3}
            />

            {/* Target Ring */}
            <mesh position={[20, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0, 3, 64]} />
                <meshBasicMaterial color="#3b82f6" opacity={0.1} transparent />
            </mesh>
            <mesh position={[20, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.8, 3, 64]} />
                <meshBasicMaterial color="#3b82f6" />
            </mesh>

            {/* Single Smart Controller */}
            <CameraController />

            {/* Remove old CameraRig if we use OrbitControls for everything? 
                User said "Move anywhere" "360 degree view" -> OrbitControls is best.
                CameraRig forces position. So we remove CameraRig component usage here.
            */}
        </>
    );
};

export const Scene = () => {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#F3F4F6' }}>
            <Canvas shadows camera={{ position: [5, 5, 20], fov: 45 }}>
                <Suspense fallback={null}>
                    <ShootingScene />
                </Suspense>
            </Canvas>
        </div>
    );
};
