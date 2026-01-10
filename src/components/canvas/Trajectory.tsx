import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import { getTrajectoryPoints } from '../../utils/physicsUtils';
import * as THREE from 'three';

export const Trajectory = () => {
    const { launchAngle, launchVelocity, cannonPosition, gravity, isAntiGravity, windSpeed, projectileMass } = useStore();

    const points = useMemo(() => {
        const startPos: [number, number, number] = [
            cannonPosition.x,
            cannonPosition.y + 2 * Math.sin(THREE.MathUtils.degToRad(launchAngle)), // Match projectile start
            cannonPosition.z
        ];
        return getTrajectoryPoints(launchVelocity, launchAngle, gravity, startPos, isAntiGravity, 10, windSpeed, projectileMass);
    }, [launchAngle, launchVelocity, cannonPosition, gravity, isAntiGravity, windSpeed, projectileMass]);

    return (
        <Line
            points={points}
            color="#ff0000"
            lineWidth={3}
            transparent
            opacity={0.8}
            dashed={true}
            dashScale={5}
            dashSize={0.5}
            gapSize={0.5}
        />
    );
};
