
import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getProjectilePosition } from '../../utils/physicsUtils';

export const MotionGraphs = () => {
    const { isFired, startTime, launchAngle, launchVelocity, gravity, isAntiGravity } = useStore();
    const [data, setData] = useState<{ time: number; velocity: number; height: number; }[]>([]);

    useEffect(() => {
        if (!isFired || !startTime) {
            setData([]); // Clear data when reset
            return;
        }

        const interval = setInterval(() => {
            const currentTime = (performance.now() - startTime) / 1000;

            // Calculate current metrics purely analytically
            const rad = (launchAngle * Math.PI) / 180;
            const vy0 = launchVelocity * Math.sin(rad);
            const vx0 = launchVelocity * Math.cos(rad);

            // Current Velocity (magnitude of velocity vector)
            const g = isAntiGravity ? -gravity : gravity;
            const vy = vy0 - g * currentTime;
            const v = Math.sqrt(vx0 * vx0 + vy * vy);

            // Current Height
            const [_, y] = getProjectilePosition(currentTime, launchVelocity, launchAngle, gravity, [0, 0, 0], isAntiGravity);

            if (y < 0 && !isAntiGravity) {
                clearInterval(interval);
                return;
            }

            setData(prev => [...prev, {
                time: Number(currentTime.toFixed(2)),
                velocity: Number(v.toFixed(1)),
                height: Number(y.toFixed(1))
            }]);

        }, 100);

        return () => clearInterval(interval);
    }, [isFired, startTime, launchAngle, launchVelocity, gravity, isAntiGravity]);

    if (!isFired) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            width: '400px',
            backgroundColor: 'rgba(30, 41, 59, 0.9)', // Dark background
            padding: '1rem',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            pointerEvents: 'auto',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#f3f4f6', fontWeight: 800 }}>MOTION ANALYSIS</h3>

            <div style={{ height: '120px' }}>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>Velocity (m/s) vs Time</p>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" hide />
                        <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} width={30} stroke="#4b5563" />
                        <Tooltip
                            contentStyle={{ fontSize: '10px', backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div style={{ height: '120px' }}>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#9ca3af' }}>Height (m) vs Time</p>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9ca3af' }} stroke="#4b5563" />
                        <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} width={30} stroke="#4b5563" />
                        <Tooltip
                            contentStyle={{ fontSize: '10px', backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="height" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
