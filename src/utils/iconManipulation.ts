  // Get icon filter based on input state
  export const getIconFilter = (value: string, hasError: boolean, isFocused: boolean): string => {
    if (isFocused || hasError) {
      return "invert(29%) sepia(93%) saturate(1465%) hue-rotate(227deg) brightness(94%) contrast(98%)"; // Purple
    } else if (value) {
      return "invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"; // Black
    } else {
      return "invert(82%) sepia(4%) saturate(108%) hue-rotate(201deg) brightness(89%) contrast(85%)"; // Gray
    }
  };