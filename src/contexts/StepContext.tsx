import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Step } from 'types/Step';

interface StepContextType {
  step: string;
  setStep: (step: Step) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<Step>(Step.WELCOME);

  const changeStep = (step: Step) => {
    setStep(step);
  };

  return (
    <StepContext.Provider value={{ step, setStep: changeStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 