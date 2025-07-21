import React, { ReactNode, MouseEvent } from 'react';
import whiteArrow from "assets/icons/white-arrow-right-contained.svg";
import whiteArrowDisabled from "assets/icons/white-arrow-right-contained-disabled.svg";

interface PurpleButtonWithArrowProps {
  label: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export const PurpleButtonWithArrow: React.FC<PurpleButtonWithArrowProps> = ({
  label,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`h-[63px] rounded-[200px] font-medium flex items-center transition-colors ${
        disabled
          ? 'bg-[#C2C2C5] text-white cursor-not-allowed'
          : 'bg-[#3957ED] text-white hover:bg-[#2944D1]'
      } ${className} xl:text-[21.33px] lg:text-[1.8vw]`}
      style={{ padding: '6.67px 6.67px 6.67px 24px', fontWeight: 400 }}
    >
      <span className="align-middle">{label}</span>
      <div className="ml-6">
        {disabled ? (
          <img src={whiteArrowDisabled} alt="Arrow" />
        ) : (
          <img src={whiteArrow} alt="Arrow" />
        )}
      </div>
    </button>
  );
}; 