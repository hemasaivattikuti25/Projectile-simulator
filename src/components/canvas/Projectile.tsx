import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { getProjectilePosition } from '../../utils/physicsUtils';
import * as THREE from 'three';

export const Projectile = () => {
    const meshRef = useRef<THREE.Group>(null);
    const {
        isFired,
        launchAngle,
        launchVelocity,
        cannonPosition,
        gravity,
        isAntiGravity,
        startTime,
        windSpeed,
        projectileMass,
        reset
    } = useStore();

    useFrame(() => {
        if (!meshRef.current) return;

        if (isFired && startTime) {
            const currentTime = (performance.now() - startTime) / 1000;
            const startPos: [number, number, number] = [
                cannonPosition.x,
                cannonPosition.y + 2 * Math.sin(THREE.MathUtils.degToRad(launchAngle)), // Adjust for barrel tip
                cannonPosition.z
            ];

            // Deterministic calculation
            const pos = getProjectilePosition(
                currentTime,
                launchVelocity,
                launchAngle,
                gravity,
                startPos,
                isAntiGravity,
                windSpeed,
                projectileMass
            );

            meshRef.current.position.set(...pos);

            // Ground collision check
            if (!isAntiGravity && pos[1] <= 0) {
                // Hit logic could be added here
                reset();
            }
        } else {
            // Stick to start position if not fired
            const angleRad = THREE.MathUtils.degToRad(launchAngle);
            meshRef.current.position.set(
                cannonPosition.x,
                cannonPosition.y + 2 * Math.sin(angleRad),
                cannonPosition.z
            );
        }
    });

    return (
        <group ref={meshRef}>
            {/* Trail only effective when moving */}
            {isFired && (
                <Trail
                    width={1.5}
                    color="#00C2FF"
                    length={10}
                    decay={1}
                    local={false}
                    stride={0}
                    interval={1}
                />
            )}
            {/* Projectile Mesh */}
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#007AFF"
                    emissiveIntensity={2}
                    toneMapped={false}
                />
            </mesh>
        </group>
    );
};
