import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const Cannon = () => {
    const meshRef = useRef<THREE.Group>(null);
    const { launchAngle, cannonPosition } = useStore();

    useFrame(() => {
        if (meshRef.current) {
            // Rotate around X axis (pointing up/down)
            // Angle is in degrees, convert to radians
            meshRef.current.rotation.x = -THREE.MathUtils.degToRad(launchAngle);
        }
    });

    return (
        <group ref={meshRef} position={[cannonPosition.x, cannonPosition.y + 0.5, cannonPosition.z]}>
            {/* Base - Raised slightly */}
            <mesh position={[0, -0.25, 0]}>
                <boxGeometry args={[1, 0.5, 1]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0.8}
                    roughness={0.3}
                />
            </mesh>

            {/* Barrel */}
            <group position={[0, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
                    <cylinderGeometry args={[0.3, 0.4, 3, 32]} />
                    <meshStandardMaterial
                        color="#007AFF"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>

                {/* Decorative details */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
                    <torusGeometry args={[0.42, 0.05, 16, 32]} />
                    <meshStandardMaterial color="#00ffff" metalness={1} roughness={0.1} emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
            </group>
        </group>
    );
};
