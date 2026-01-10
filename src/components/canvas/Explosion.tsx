import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Explosion = ({ position }: { position: [number, number, number] }) => {
    const count = 50;
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const speed = 0.5 + Math.random();
            const phi = Math.random() * Math.PI * 2;
            const theta = Math.random() * Math.PI;
            temp.push({
                velocity: new THREE.Vector3(
                    Math.sin(theta) * Math.cos(phi) * speed,
                    Math.sin(theta) * Math.sin(phi) * speed,
                    Math.cos(theta) * speed
                ),
                position: new THREE.Vector3(0, 0, 0),
                active: true
            });
        }
        return temp;
    }, [count]);

    const dummy = new THREE.Object3D();

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        particles.forEach((p, i) => {
            if (!p.active) return;
            p.position.addScaledVector(p.velocity, delta * 10);
            p.velocity.y -= 0.05; // gravity on particles

            dummy.position.copy(p.position);
            dummy.scale.setScalar(Math.max(0, 0.1 - p.position.length() * 0.01));
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={position}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#ffaa00" emissive="#ff4400" emissiveIntensity={2} />
        </instancedMesh>
    );
};
