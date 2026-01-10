import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const CameraController = ({ projectileRef }: { projectileRef: any }) => {
    const { cameraMode, isFired, launchAngle } = useStore();
    const targetPos = useRef(new THREE.Vector3());
    const lookAtPos = useRef(new THREE.Vector3());
    const orbitRef = useRef<any>(null);

    useFrame((state, delta) => {
        const damp = 5 * delta;

        // Mode 1: SPECTATOR (Iso View)
        if (cameraMode === 'SPECTATOR') {
            // Fixed Isometric View: Top-Right
            targetPos.current.set(30, 25, 40);
            lookAtPos.current.set(0, 0, 0); // Look at cannon base/field center

            state.camera.position.lerp(targetPos.current, damp);
            state.camera.lookAt(lookAtPos.current);

            // Disable user orbit for consistency in "Spectator View"
            if (orbitRef.current) orbitRef.current.enabled = false;
        }

        // Mode 2: GUNNER (Back View)
        if (cameraMode === 'GUNNER') {
            if (orbitRef.current) orbitRef.current.enabled = false;

            // Rotate with cannon
            // Behind the cannon (-Z direction relative to rotated barrel?)
            // Cannon shoots towards +Z. So we want to be at -Z.
            // But we want to rise with the barrel pitch.

            const x = 0;
            const y = 3 + (launchAngle / 20);
            const z = -6;

            targetPos.current.set(x, y, z);

            // Look forward along prediction line
            lookAtPos.current.set(0, 5 + (launchAngle / 10), 30);

            state.camera.position.lerp(targetPos.current, damp * 2);
            state.camera.lookAt(lookAtPos.current);
        }

        // Mode 3: BULLET (Follow View)
        if (cameraMode === 'BULLET') {
            if (orbitRef.current) orbitRef.current.enabled = false;

            // Check if we have a valid mesh ref
            if (isFired && projectileRef.current) {
                const projPos = projectileRef.current.position;

                // Offset: Behind and above
                const offset = new THREE.Vector3(0, 3, -8);

                const desiredPos = new THREE.Vector3().copy(projPos).add(offset);
                const desiredLook = new THREE.Vector3().copy(projPos).add(new THREE.Vector3(0, 0, 10));

                // Damping factor of 0.1 for smoothness
                state.camera.position.lerp(desiredPos, 0.1);
                state.camera.lookAt(desiredLook);
            }
            else {
                // Return to Gunner view if not actively following
                const targetBase = new THREE.Vector3(0, 3 + (launchAngle / 20), -6);
                const lookBase = new THREE.Vector3(0, 5, 30);

                state.camera.position.lerp(targetBase, damp);
                state.camera.lookAt(lookBase);
            }
        }
    });

    return (
        <OrbitControls
            ref={orbitRef}
            makeDefault
            enabled={cameraMode === 'SPECTATOR'}
            maxPolarAngle={Math.PI / 2}
        />
    );
};
