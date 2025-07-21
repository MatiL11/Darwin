// Flag SVG URLs
export const flags = {
  en: 'https://flagcdn.com/w80/gb.png', // UK flag for English
  es: 'https://flagcdn.com/w80/es.png', // Spain flag for Spanish
  pt: 'https://flagcdn.com/w80/br.png'  // Brazil flag for Portuguese
};

export const getFlag = (language: string): string => {
  return flags[language as keyof typeof flags] || flags.en;
}; 