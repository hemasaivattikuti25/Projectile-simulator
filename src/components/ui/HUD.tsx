import { useStore } from '../../store/useStore';
import './HUD.css';

export const HUD = () => {
    const { launchVelocity, launchAngle } = useStore();

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
        </div>
    );
};
