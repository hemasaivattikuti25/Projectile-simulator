import { useStore } from '../../store/useStore';
import { Crosshair, Eye, Video } from 'lucide-react';
import './HUD.css';

export const HUD = () => {
    const { cameraMode, setCameraMode, launchVelocity, launchAngle } = useStore();

    return (
        <div className="hud-container">
            {/* Top Stats Bar */}
            <div className="hud-stats">
                <div className="stat-item">
                    <span className="stat-label">VELOCITY</span>
                    <span className="stat-value">{launchVelocity} <small>m/s</small></span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">ANGLE</span>
                    <span className="stat-value">{launchAngle}°</span>
                </div>
            </div>

            {/* Bottom Camera Controls */}
            <div className="camera-controls glass-panel">
                <button
                    className={`cam-btn ${cameraMode === 'GUNNER' ? 'active' : ''}`}
                    onClick={() => setCameraMode('GUNNER')}
                    title="Gunner View"
                >
                    <Crosshair size={20} />
                    <span>GUNNER</span>
                </button>
                <button
                    className={`cam-btn ${cameraMode === 'SPECTATOR' ? 'active' : ''}`}
                    onClick={() => setCameraMode('SPECTATOR')}
                    title="Spectator View"
                >
                    <Eye size={20} />
                    <span>SPECTATOR</span>
                </button>
                <button
                    className={`cam-btn ${cameraMode === 'BULLET' ? 'active' : ''}`}
                    onClick={() => setCameraMode('BULLET')}
                    title="Bullet Cam"
                >
                    <Video size={20} />
                    <span>BULLET</span>
                </button>
            </div>
        </div>
    );
};
