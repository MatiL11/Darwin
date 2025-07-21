import React from 'react';

interface IconPurpleButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const IconPurpleButton: React.FC<IconPurpleButtonProps> = ({
  icon,
  label,
  isActive,
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-[13.33px] rounded-[133.33px] font-medium text-[18.67px] transition-all duration-200 ${
        isActive
          ? 'bg-[#3957ED] text-white shadow-md'
          : 'bg-[#E0E0E0] text-[#00000080] hover:bg-[#D0D0D0]'
      }`}
      style={{
        height: '66px',
        paddingTop: '13.33px',
        paddingRight: '40px',
        paddingBottom: '13.33px',
        paddingLeft: '40px',
      }}
    >
      <img
        src={icon}
        alt={label}
        className="w-[40px] h-[40px] object-contain flex-shrink-0"
      />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}; 