import { useEffect, useState } from 'react';
import { Keyboard } from 'lucide-react';
import './KeyboardHints.css';

export const KeyboardHints = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 8000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="keyboard-hints">
            <div className="hint-header">
                <Keyboard size={16} />
                <span>Keyboard Shortcuts</span>
            </div>
            <div className="hint-list">
                <div className="hint-item">
                    <kbd>Space</kbd>
                    <span>Fire</span>
                </div>
                <div className="hint-item">
                    <kbd>R</kbd>
                    <span>Reset</span>
                </div>
                <div className="hint-item">
                    <kbd>↑↓</kbd>
                    <span>Adjust Angle</span>
                </div>
            </div>
        </div>
    );
};
