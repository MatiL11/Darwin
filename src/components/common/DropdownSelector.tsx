import React from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

type DropdownOptions = string[] | DropdownOption[];

interface DropdownProps {
  options: DropdownOptions;
  value: string;
  onChange: (value: string) => void;
  label: string;
  getIcon?: (value: string) => string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label, getIcon, error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Helper function to determine if options is an array of strings or objects
  const isStringArray = (opt: DropdownOptions): opt is string[] => {
    return typeof opt[0] === 'string';
  };

  // Get the display value for the current selection
  const getDisplayValue = () => {
    if (!value) return label;
    
    if (isStringArray(options)) {
      return value;
    } else {
      const selectedOption = options.find(opt => opt.value === value);
      return selectedOption ? selectedOption.label : value;
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-7 py-[19px] rounded-[200px] border xl:text-[21px] lg:text-[1.5vw] appearance-none focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] transition-colors bg-transparent flex items-center justify-between ${
          !value 
            ? 'text-[#C2C2C5] border-[#C2C2C5]' 
            : error 
              ? 'text-black border-red-500' 
              : 'text-black border-black'
        }`}
      >
        <span>{getDisplayValue()}</span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L8 8.5L15 1.5" stroke={value ? "black" : "#C2C2C5"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {error && (
        <p className="relative text-red-500 text-sm mt-1 ml-4">{error}</p>
      )}

      {isOpen && (
        <div className="absolute mt-[-0.5vh] top-full left-0 w-full bg-white rounded-xl shadow-lg py-2 z-50">
          {isStringArray(options) ? (
            // Render string options
            options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-7 py-2 hover:bg-[#3957ED]/10 transition-colors ${
                  value === option ? 'bg-[#3957ED]/5 text-[#3957ED]' : ''
                }`}
              >
                <div className="flex items-center">
                  {getIcon && (
                    <img 
                      src={getIcon(option)} 
                      alt={`${option} icon`} 
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  {option}
                </div>
              </button>
            ))
          ) : (
            // Render complex options
            options.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-7 py-2 hover:bg-[#3957ED]/10 transition-colors ${
                  value === option.value ? 'bg-[#3957ED]/5 text-[#3957ED]' : ''
                }`}
              >
                <div className="flex items-center">
                  {getIcon && (
                    <img 
                      src={getIcon(option.value)} 
                      alt={`${option.label} icon`} 
                      className="w-5 h-5 mr-2"
                    />
                  )}
                  {option.label}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};