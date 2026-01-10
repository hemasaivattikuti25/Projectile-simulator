import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { solveRK4, type State } from '../../lib/physics/rk4Solver';
import * as THREE from 'three';
import './Analytics.css';

export const Analytics = () => {
    const { launchAngle, launchVelocity, gravity, windSpeed } = useStore();
    
    // Derived values for physics solver since they aren't in store yet
    const windVector = { x: windSpeed, y: 0, z: 0 };
    const dragCoefficient = 0.47; // Standard sphere drag coefficient

    const data = useMemo(() => {
        const angleRad = THREE.MathUtils.degToRad(launchAngle);
        const initialState: State = {
            x: 0,
            y: 0.5,
            z: 0,
            vx: 0,
            vy: launchVelocity * Math.sin(angleRad),
            vz: launchVelocity * Math.cos(angleRad),
        };

        const trajectory = solveRK4(
            initialState,
            gravity,
            windVector,
            dragCoefficient,
            1,
            0.1, // dt for graph (sparser)
            200
        );

        return trajectory.map((s, i) => ({
            time: (i * 0.1).toFixed(1),
            height: Math.max(0, s.y).toFixed(2),
            velocity: Math.sqrt(s.vx * s.vx + s.vy * s.vy + s.vz * s.vz).toFixed(2),
        }));
    }, [launchAngle, launchVelocity, gravity, windSpeed]);

    return (
        <div className="analytics-panel glass">
            <div className="chart-container">
                <h4>Height vs Time</h4>
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} />
                        <Tooltip
                            contentStyle={{ 
                                background: 'rgba(10, 10, 10, 0.9)', 
                                border: '1px solid rgba(0, 242, 255, 0.3)', 
                                borderRadius: '12px', 
                                fontSize: '11px',
                                padding: '8px 12px',
                                boxShadow: '0 8px 32px rgba(0, 242, 255, 0.2)'
                            }}
                            itemStyle={{ color: '#00f2ff', fontWeight: '600' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="height" 
                            stroke="#00f2ff" 
                            dot={false} 
                            strokeWidth={3}
                            filter="drop-shadow(0 0 8px rgba(0, 242, 255, 0.5))"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h4>Velocity vs Time</h4>
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} />
                        <Tooltip
                            contentStyle={{ 
                                background: 'rgba(10, 10, 10, 0.9)', 
                                border: '1px solid rgba(255, 68, 68, 0.3)', 
                                borderRadius: '12px', 
                                fontSize: '11px',
                                padding: '8px 12px',
                                boxShadow: '0 8px 32px rgba(255, 68, 68, 0.2)'
                            }}
                            itemStyle={{ color: '#ff4444', fontWeight: '600' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="velocity" 
                            stroke="#ff4444" 
                            dot={false} 
                            strokeWidth={3}
                            filter="drop-shadow(0 0 8px rgba(255, 68, 68, 0.5))"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
