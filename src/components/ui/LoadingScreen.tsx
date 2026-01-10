import { useEffect, useState } from 'react';
import './LoadingScreen.css';

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    if (isComplete) return null;

    return (
        <div className={`loading-screen ${progress === 100 ? 'fade-out' : ''}`}>
            <div className="loading-content">
                <div className="loading-logo">
                    <div className="trajectory-arc"></div>
                    <div className="projectile-dot"></div>
                </div>
                
                <h2 className="loading-title">PROJECTILE SIMULATOR</h2>
                <div style={{ marginTop: '5px', marginBottom: '15px', color: '#4b5563', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    Developed by Hemasai Vattikuti
                </div>
                
                <div className="loading-bar-container">
                    <div 
                        className="loading-bar" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <div className="loading-text">
                    {progress < 100 ? `Loading... ${Math.floor(progress)}%` : 'Ready!'}
                </div>
            </div>
        </div>
    );
};
