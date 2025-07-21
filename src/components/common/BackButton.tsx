import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowLeft from 'assets/icons/white-arrow-left.svg';

interface BackButtonProps {
  onBack?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#3957ED] hover:text-[#2944D1] transition-colors">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-[#3957ED] rounded-full shadow-md hover:bg-[#2944D1] transition-all duration-200">
        <img src={ArrowLeft} className="w-3.5 h-3.5 fill-white" />
        </div>
        <span className="text-[#3957ED] font-medium text-[16px] sm:text-[17px] md:text-[18.67px]">{t('header.backButton')}</span>
    </button>
  );
};  