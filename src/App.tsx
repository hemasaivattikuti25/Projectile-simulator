import { HUD } from './components/ui/HUD';
import { Scene } from './components/canvas/Scene';
import { ControlPanel } from './components/ui/ControlPanel';
import { Analytics } from './components/ui/Analytics';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { KeyboardHints } from './components/ui/KeyboardHints';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import './App.css';

function App() {
  const {
    isFired,
    fire,
    reset,
    launchAngle,
    setLaunchAngle
  } = useStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Prevent default for specific keys
      if (['Space', 'KeyR', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.code) {
        case 'Space':
          if (!isFired) fire();
          break;
        case 'KeyR':
          reset();
          break;
        case 'ArrowUp':
          setLaunchAngle(Math.min(180, launchAngle + 1)); // Updated max to 180
          break;
        case 'ArrowDown':
          setLaunchAngle(Math.max(0, launchAngle - 1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFired, launchAngle, fire, reset, setLaunchAngle]);

  return (
    <>
      <LoadingScreen />
      <div className="app-container">
        <Scene />
        <HUD />

        <div className="ui-overlay">
          <div className="header-section">
            <div className="title-container-dark">
              <h1 className="title-dark">PROJECTILE SIMULATOR</h1>
              <p className="subtitle-dark">Developed by Hemasai Vattikuti</p>
            </div>
          </div>

          <ControlPanel />
          <Analytics />
          <KeyboardHints />
        </div>
      </div>
    </>
  );
}

export default App;

