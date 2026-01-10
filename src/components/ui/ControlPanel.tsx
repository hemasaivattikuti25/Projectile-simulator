import { useStore } from '../../store/useStore';
import { Play, RotateCcw, Gauge, Rocket, Wind, Weight } from 'lucide-react';
import { MotionGraphs } from './MotionGraphs';
import { DistanceDisplay } from './DistanceDisplay';
import './ControlPanel.css';

export const ControlPanel = () => {
    const {
        launchAngle,
        launchVelocity,
        gravity,
        setLaunchAngle,
        setLaunchVelocity,
        setGravity,
        fire,
        reset,
        isFired,
        isAntiGravity,
        setIsAntiGravity,
        windSpeed,
        setWindSpeed,
        projectileMass,
        setProjectileMass
    } = useStore();

    return (
        <>
            <MotionGraphs />
            <DistanceDisplay />
            {/* View Switcher Bottom Bar */}
            {/* Removed View Switcher - Single Smart View Active */}

            {/* Right Side Control Panel */}
            <div className="control-panel glass-panel" style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="panel-header">
                    <h2 className="panel-title" style={{ color: '#fff' }}>NEWTON'S LAB</h2>
                    <div className="panel-status">LIVE</div>
                </div>

                {/* Physics Controls */}
                <div className="control-section">
                    <div className="control-group">
                        <label className="control-label" style={{ color: '#e5e7eb' }}>
                            <Gauge size={14} /> LAUNCH ANGLE
                        </label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="180"
                                value={launchAngle}
                                onChange={(e) => setLaunchAngle(Number(e.target.value))}
                            />
                            <span className="value-badge" style={{ color: '#fff' }}>{launchAngle}°</span>
                        </div>
                    </div>

                    <div className="control-group">
                        <label className="control-label" style={{ color: '#e5e7eb' }}>
                            <Rocket size={14} /> VELOCITY
                        </label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="300"
                                value={launchVelocity}
                                onChange={(e) => setLaunchVelocity(Number(e.target.value))}
                            />
                            <span className="value-badge" style={{ color: '#fff' }}>{launchVelocity} m/s</span>
                        </div>
                    </div>

                    <div className="control-group">
                        <label className="control-label" style={{ color: '#e5e7eb' }}>
                            <Wind size={14} /> WIND SPEED
                        </label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="-20"
                                max="20"
                                step="0.5"
                                value={windSpeed}
                                onChange={(e) => setWindSpeed(Number(e.target.value))}
                            />
                            <span className="value-badge" style={{ color: '#fff' }}>{windSpeed} m/s</span>
                        </div>
                    </div>

                    <div className="control-group">
                        <label className="control-label" style={{ color: '#e5e7eb' }}>
                            <Weight size={14} /> PROJECTILE MASS
                        </label>
                        <div className="range-wrapper">
                            <input
                                type="range"
                                min="0.1"
                                max="10"
                                step="0.1"
                                value={projectileMass}
                                onChange={(e) => setProjectileMass(Number(e.target.value))}
                            />
                            <span className="value-badge" style={{ color: '#fff' }}>{projectileMass} kg</span>
                        </div>
                    </div>

                    <div className="control-group">
                        <label className="control-label">GRAVITY ({gravity} m/s²)</label>
                        <div className="button-group">
                            <button className={gravity === 9.81 ? 'btn-active' : ''} onClick={() => setGravity(9.81)}>EARTH</button>
                            <button className={gravity === 1.62 ? 'btn-active' : ''} onClick={() => setGravity(1.62)}>MOON</button>
                            <button className={gravity === 3.71 ? 'btn-active' : ''} onClick={() => setGravity(3.71)}>MARS</button>
                        </div>
                    </div>

                    <button
                        className={`toggle-btn ${isAntiGravity ? 'bg-red-500' : 'bg-gray-200'}`}
                        onClick={() => setIsAntiGravity(!isAntiGravity)}
                    >
                        {isAntiGravity ? 'ANTI-GRAVITY ACTIVE' : 'ENABLE ANTI-GRAVITY'}
                    </button>
                </div>

                {/* Main Actions */}
                <div className="action-buttons">
                    <button className="btn-launch" onClick={fire} disabled={isFired}>
                        <Play size={20} fill="currentColor" /> LAUNCH
                    </button>
                    <button className="btn-reset" onClick={reset}>
                        <RotateCcw size={18} /> RESET
                    </button>
                </div>
            </div>
        </>
    );
};
