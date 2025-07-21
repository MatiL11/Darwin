import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Form, FormErrors } from 'types/Form';
import { t } from 'i18next';

interface FormContextType {
  form: Form;
  setForm: (form: Form) => void;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
  handleFieldChange: (field: keyof Form, value: string, step: string, error?: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [form, setForm] = useState<Form>({
    website: '',
    email: '',
    companyName: '',
    industry: '',
    companySize: '',
    worker: 'bruno',
    meetingTime: '', 
    phoneNumber: '',
    contactMethod: 'whatsapp',
  });
  const [errors, setErrors] = useState<FormErrors>({
    website: '',
    email: '',
    companyName: '',
    industry: '',
    companySize: '',
    worker: '',
    meetingTime: '',
    phoneNumber: '',
    contactMethod: '',
  });

  const handleFieldChange = (field: keyof Form, value: string, step: string, error?: string) => {
    setForm(prevForm => ({ ...prevForm, [field]: value }));
    if (!value && error) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: t(`${step}.errors.${error}`) || '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    }
  };

  const changeForm = (form: Form) => {
    setForm(form);
  };

  const changeErrors = (errors: FormErrors) => {
    setErrors(errors);
  };

  return (
    <FormContext.Provider value={{ form, setForm: changeForm, errors, setErrors: changeErrors, handleFieldChange }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}; 