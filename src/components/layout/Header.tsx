import React from 'react';
import { LanguageSelector } from 'components/common/LanguageSelector';
import { BackButton } from 'components/common/BackButton';

interface HeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBack, 
  showBackButton = true
}) => {
  return (
    <div className={`w-full py-3vh 2xl:py-2vh px-3vw`}>
      <div className="flex justify-between items-center">
        <div className="header-element">
          {showBackButton && onBack ? (
            <BackButton onBack={onBack} />
          ) : (
            /* Empty space to maintain layout */
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"></div>
          )}
        </div>

        <LanguageSelector />
      </div>
    </div>
  );
}; 