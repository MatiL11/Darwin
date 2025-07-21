import React from 'react';
import darwinLogo from 'assets/logos/darwin-ai-logo.svg';
import { useStep } from 'contexts/StepContext';

interface FooterProps {
  showLogo?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ showLogo = true }) => {
  const { step } = useStep();
  
  const getLogoContainerStyles = () => {
    switch (step) {
      case 'schedule':
        return 'flex justify-end py-3vh px-5vw';
      case 'worker':
        return 'hidden';
      case 'contact':
        return 'flex justify-end py-3vh px-3vw';
      default:
        return 'flex justify-end py-3vh px-3vw';
    }
  };

  
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-transparent">
      <div className={`w-full ${getLogoContainerStyles()}`}>
        {showLogo && (
          <img
            src={darwinLogo}
            alt="Darwin AI Logo"
            className="w-[8vw] min-w-[120px] max-w-[197px] transition-all"
          />
        )}
      </div>
    </div>
  );
}; 