import { useState, useRef, useEffect } from 'react';

type VapeItem = {
  id: number;
  imageUrl: string;
  name: string;
};

interface VapeDisplayProps {
  selectedVape: VapeItem | null;
}

const VapeDisplay = ({ selectedVape }: VapeDisplayProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTime, setPressTime] = useState(0);
  const [showVapor, setShowVapor] = useState(false);
  const timerRef = useRef<number | null>(null);
  const vaporTimeoutRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    if (!selectedVape) return;
    
    setIsPressed(true);
    setPressTime(0);
    
    timerRef.current = window.setInterval(() => {
      setPressTime(prev => prev + 0.1);
    }, 100);
  };

  const handleMouseUp = () => {
    if (!selectedVape || !isPressed) return;
    
    setIsPressed(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Показываем эффект пара
    setShowVapor(true);
    
    // Скрываем эффект через 3 секунды
    vaporTimeoutRef.current = window.setTimeout(() => {
      setShowVapor(false);
    }, 3000);
  };

  // Очистка таймеров при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (vaporTimeoutRef.current) clearTimeout(vaporTimeoutRef.current);
    };
  }, []);

  if (!selectedVape) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-gray-400">Выберите вейп снизу</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center relative h-full">
      {/* Vapor effect overlay */}
      {showVapor && (
        <div className="vapor-container">
          <img 
            src="https://cdn.poehali.dev/files/14786bff-9104-4cc3-9cd0-c89f29303d5e.jpg" 
            alt="Vapor effect" 
            className="vapor-effect"
          />
        </div>
      )}
      
      {/* Vape display */}
      {!showVapor && (
        <div 
          className="relative cursor-pointer"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <img 
            src={selectedVape.imageUrl} 
            alt={selectedVape.name}
            className="max-h-[60vh] max-w-[80%] mx-auto object-contain" 
          />
          <div className="vape-button"></div>
        </div>
      )}
      
      {/* Timer display */}
      <div className={`vape-timer mt-6 ${isPressed ? 'active' : ''}`}>
        <span className="text-vape-accent">ДРАГ ТЯГА</span> • {pressTime.toFixed(1)}с
      </div>
    </div>
  );
};

export default VapeDisplay;
