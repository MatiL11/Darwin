import React from 'react';
import waves1 from 'assets/icons/waves-1.svg';
import waves2 from 'assets/icons/waves-2.svg';
import waves3 from 'assets/icons/waves-3.svg';
import waves4 from 'assets/icons/waves-4.svg';
import waves5 from 'assets/icons/waves-5.svg';
import { useStep } from 'contexts/StepContext';

interface BackgroundProps {
  children?: React.ReactNode;
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  const { step } = useStep();
  const getWaveSvg = () => {
    switch (step) {
      case 'welcome': return waves1;
      case 'form': return waves2;
      case 'worker': return waves3;
      case 'schedule': return waves4;
      case 'contact': return waves5;
      default: return waves1;
    }
  };

  const waveSvg = getWaveSvg();

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Dynamic Wave SVG based on current step */}
      <div className="absolute z-0" 
        style={{
          top: 'calc(430px * (100vh / 1081))',
          left: 'calc(210px * (100vw / 1920))',
          width: '100%',
          maxWidth: 'none'
        }}>
        <img 
          src={waveSvg} 
          alt={`Wave pattern for ${step} step`}
          className="w-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}; 