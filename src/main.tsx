import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'i18n';
import { LanguageProvider } from 'contexts/LanguageContext.tsx';
import { FormProvider } from 'contexts/FormContext.tsx';
import { StepProvider } from 'contexts/StepContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <StepProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </StepProvider>
    </LanguageProvider>
  </StrictMode>
);
