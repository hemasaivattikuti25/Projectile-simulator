import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const FollowCam = ({ projectileRef }: { projectileRef: any }) => {
    const { isFired } = useStore();
    const targetPos = useRef(new THREE.Vector3(10, 5, 10));
    const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

    useFrame((state) => {
        if (isFired && projectileRef.current) {
            // Get projectile world position
            const projPos = new THREE.Vector3();
            projectileRef.current.getWorldPosition(projPos);

            // Follow from behind and slightly above
            // Dynamic offset based on velocity could be cool, but fixed is stable
            // We want to see it moving away, so camera should be behind launch

            // Allow camera to move with projectile but keep relative distance

            // Lerp target focus to projectile
            lookAtPos.current.lerp(projPos, 0.1);

            // Calculate ideal camera position (relative to projectile)
            // But if we want "move from launched and stop and fall", maybe we just track lookAt?
            // "it was moving the ball it shold move from lached and stop and fall"
            // Interpreting as: Camera follows the ball.

            targetPos.current.copy(projPos).add(new THREE.Vector3(10, 5, 10)); // Side/back view

            state.camera.position.lerp(targetPos.current, 0.1);
            state.camera.lookAt(lookAtPos.current);
        } else {
            // When not fired, don't force camera reset immediately if we want 360 view
            // OrbitControls handles the default view.
            // But if we want to reset *after* a shot, we might need logic.
            // For now, let OrbitControls take over when not isFired.
            // We only override camera when isFired.
            // This allows the user to rotate freely when not firing.
            return;
        }
    });

    return null;
};
