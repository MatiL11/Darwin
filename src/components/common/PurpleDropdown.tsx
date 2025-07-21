import { useState, useRef, useEffect } from 'react';
import ChevronDown from 'assets/icons/chevron-down.svg';

interface PurpleDropdownOption {
  name: string;
  label: string;
  icon?: string;
}

interface PurpleDropdownProps {
  options: PurpleDropdownOption[];
  value: string;
  label: string;
  icon?: string;
  onChange: (value: string) => void;
  buttonClassName?: string;
  optionClassName?: string;
  iconSize?: string;
  dropdownWidth?: string;
  isClickToOpen?: boolean;
}

export const PurpleDropdown = ({ 
  options, 
  value, 
  onChange, 
  label,
  icon, 
  buttonClassName,
  optionClassName,
  iconSize = "w-5 h-5",
  dropdownWidth = "w-64",
  isClickToOpen = true,
}: PurpleDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) { document.addEventListener('mousedown', handleClickOutside); }
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [isOpen]);

  const handleMouseEnter = () => { if (!isClickToOpen) { setIsOpen(true); } };
  const handleMouseLeave = () => { if (!isClickToOpen) { setIsOpen(false); } };

  const currentOption = options.find(option => option.name === value );
  const displayLabel = currentOption ? currentOption.label : label;

  return (
    <div 
      className="relative inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => isClickToOpen && setIsOpen(!isOpen)}
        className={buttonClassName || "bg-[#3957ED] text-white rounded-full px-4 py-2 flex items-center justify-between gap-2"}
        type="button"
      >
        {icon && (
          <img 
            src={icon} 
            alt={`${displayLabel} icon`} 
            className={`${iconSize} mr-2`}
          />
        )}
        <span>{displayLabel}</span>
        <img src={ChevronDown} className={`w-2 h-2 font-bold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 ${dropdownWidth} bg-white rounded-xl shadow-lg py-2 z-50`}>
          {options.map((option, index) => {
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.name);
                  setIsOpen(false);
                }}
                className={optionClassName || `w-full text-left px-4 py-2 hover:bg-[#3957ED]/10 transition-colors ${
                  value === option.name ? 'bg-[#3957ED]/5 text-[#3957ED]' : ''
                }`}
                type="button"
              >
                <div className="flex items-center">
                  {option.icon && (
                    <img 
                      src={option.icon} 
                      alt={`${option.label} icon`} 
                      className={`${iconSize} mr-2`}
                    />
                  )}
                  {option.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}; 