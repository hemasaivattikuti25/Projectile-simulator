import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { getProjectilePosition } from '../../utils/physicsUtils';

export const DistanceDisplay = () => {
    const { isFired, startTime, launchAngle, launchVelocity, gravity, isAntiGravity, cannonPosition, windSpeed, projectileMass } = useStore();
    const [distance, setDistance] = useState(0);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (!isFired || !startTime) {
            setDistance(0);
            setMaxHeight(0);
            return;
        }

        const interval = setInterval(() => {
            const currentTime = (performance.now() - startTime) / 1000;
            const [x, y] = getProjectilePosition(
                currentTime,
                launchVelocity,
                launchAngle,
                gravity,
                [cannonPosition.x, cannonPosition.y, cannonPosition.z],
                isAntiGravity,
                windSpeed,
                projectileMass
            );

            setDistance(Math.abs(x - cannonPosition.x));
            setMaxHeight(prev => Math.max(prev, y));

            if (y < 0 && !isAntiGravity) {
                clearInterval(interval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isFired, startTime, launchAngle, launchVelocity, gravity, isAntiGravity, cannonPosition, windSpeed, projectileMass]);

    if (!isFired) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            border: '2px solid #3b82f6',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>DISTANCE</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#3b82f6' }}>{distance.toFixed(1)}m</div>
            </div>
            <div style={{ width: '1px', height: '50px', backgroundColor: '#374151' }} />
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>MAX HEIGHT</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>{maxHeight.toFixed(1)}m</div>
            </div>
        </div>
    );
};
