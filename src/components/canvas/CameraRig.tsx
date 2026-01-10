
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useStore } from '../../store/useStore';
import { useRef } from 'react';

export const CameraRig = () => {
    const { camera } = useThree();
    const cameraMode = useStore((state) => state.cameraMode);
    const cannonPosition = useStore((state) => state.cannonPosition);
    const launchAngle = useStore((state) => state.launchAngle);
    const isFired = useStore((state) => state.isFired);
    const startTime = useStore((state) => state.startTime);
    const launchVelocity = useStore((state) => state.launchVelocity);
    const gravity = useStore((state) => state.gravity);
    const isAntiGravity = useStore((state) => state.isAntiGravity);

    // Ref to track projectile position efficiently if needed, 
    // but for "PROJECTILE" mode we might want to just calculate it
    // or read from a shared ref. For now, since we have deterministic math,
    // we can calculate where the bullet IS right now.

    // Smooth vectors
    const targetLookAt = useRef(new Vector3());

    useFrame((_, delta) => {
        // If in SPECTATOR/360 mode, let OrbitControls handle it. Do NOTHING here.
        if (cameraMode === 'SPECTATOR') return;

        let desiredPos = new Vector3();
        let desiredLookAt = new Vector3();

        if (cameraMode === 'GUNNER') {
            // ... (keep gunner logic)
            // Behind the cannon, tilting with it
            const rad = (launchAngle * Math.PI) / 180;
            desiredPos.set(cannonPosition.x - 4, cannonPosition.y + 2, cannonPosition.z);
            desiredLookAt.set(
                cannonPosition.x + 10 * Math.cos(rad),
                cannonPosition.y + 10 * Math.sin(rad),
                cannonPosition.z
            );
        } else if (cameraMode === 'BULLET' && isFired && startTime) { // Updated to BULLET per user change
            // ... (keep projectile logic)
            // Follow the bullet
            // Follow the bullet
            // Calculate current bullet pos
            const t = (performance.now() - startTime) / 1000;
            const rad = (launchAngle * Math.PI) / 180;
            const vx = launchVelocity * Math.cos(rad);
            const vy = launchVelocity * Math.sin(rad);

            const x = cannonPosition.x + vx * t;
            let y = isAntiGravity
                ? cannonPosition.y + vy * t + 0.5 * gravity * t * t
                : cannonPosition.y + vy * t - 0.5 * gravity * t * t;

            if (y < 0 && !isAntiGravity) y = 0; // clamp

            const currentPos = new Vector3(x, y, cannonPosition.z);

            // Camera trails behind
            desiredPos.copy(currentPos).add(new Vector3(-4, 2, 4));
            desiredLookAt.copy(currentPos);
        } else {
            // Fallback for PROJECTILE mode when not fired (same as Broadcast or Gunner?)
            // Let's default to Broadcast-ish
            desiredPos.set(5, 5, 10);
            desiredLookAt.set(10, 0, 0);
        }

        // Smooth transition (Lerp)
        // Use a factor relative to delta for frame-rate independence
        // damp factor roughly 3-5
        const damp = 4 * delta;

        // Lerp position
        camera.position.lerp(desiredPos, damp);

        // Lerp rotation is tricky, easier to lerp the lookAt target and lookAt every frame
        targetLookAt.current.lerp(desiredLookAt, damp);
        camera.lookAt(targetLookAt.current);
    });

    return null;
};
