import React from 'react';
import { PurpleButtonWithArrow } from 'components/common/PurpleButtonWithArrow';
import { Dropdown } from 'components/common/DropdownSelector';
import { useTranslation } from 'react-i18next';
import dashboardImageEs from 'assets/images/form/dashboard-es.png';
import dashboardImageEn from 'assets/images/form/dashboard-en.png';
import dashboardImagePt from 'assets/images/form/dashboard-pt.png';
import { useForm } from 'contexts/FormContext';
import { Language } from 'i18n/index';
import { Step } from 'types/Step';
import { companySizeOptions } from 'constants/companySizeOptions';
import { industryOptions } from 'constants/industryConstants';
import { validateCompanyName, validateCompanySize, validateIndustry } from 'utils/formValidations';

interface FormPageProps {
  onSubmit: (data: { companyName: string; industry: string; companySize: string }) => void;
}

const step = Step.FORM;

export const FormPage: React.FC<FormPageProps> = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const { form, errors, handleFieldChange } = useForm();

  const getDashboardImageByLanguage = () => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case Language.ES:
        return dashboardImageEs;
      case Language.PT:
        return dashboardImagePt;
      case Language.EN:
      default:
        return dashboardImageEn;
    }
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let errorKey = '';
    
    if (!value.trim()) {
      errorKey = "companyNameRequired";
    } else if (!validateCompanyName(value)) {
      errorKey = "companyNameInvalid";
    }
    
    handleFieldChange('companyName', value, step, errorKey);
  };

  const handleIndustryChange = (value: string) => {
    let errorKey = '';
    
    if (!validateIndustry(value)) {
      errorKey = "industryRequired";
    }
    
    handleFieldChange('industry', value, step, errorKey);
  };

  const handleCompanySizeChange = (value: string) => {
    let errorKey = '';
    
    if (!validateCompanySize(value)) {
      errorKey = "companySizeRequired";
    }
    
    handleFieldChange('companySize', value, step, errorKey);
  };

  const isFormValid = validateCompanyName(form.companyName) && 
                     validateIndustry(form.industry) && 
                     validateCompanySize(form.companySize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form);
    }
  };

  // Create company size options with translated labels
  const sizeOptions = companySizeOptions.map(option => ({
    value: option.value,
    label: t(`form.companySizes.${option.key}`)
  }));

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-full pr-6 desktop-container">
        {/* Dashboard Image */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-[70vw]">
            <img
              src={getDashboardImageByLanguage()}
              alt="Dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Form */}
        <div className="w-full lg:w-[28%] lg:pl-3 flex items-center">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="xl:text-[32px] lg:text-[2.5vw] font-medium text-black leading-tight">
              {t('form.title')}{" "}
              <span className="font-bold text-[#3A58ED]">{t('form.aiEmployee')}</span>
            </h1>

            <p className="xl:text-[19px] lg:text-[1.5vw] font-medium mt-[13px]">
              {t('form.usingData')}{" "}
              <a
                href="https://www.getdarwin.ai/"
                className="text-[#3A58ED] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.getdarwin.ai/
              </a>
            </p>

            <input
              type="text"
              placeholder={t('form.companyName')}
              value={form.companyName}
              name="companyName"
              onChange={handleCompanyNameChange}
              className={`w-full mt-[26px] px-7 py-[19px] rounded-[200px] border xl:text-[21px] lg:text-[1.5vw] focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] transition-colors placeholder-[#C2C2C5] ${
                form.companyName 
                  ? (errors.companyName ? 'border-red-500' : 'border-black') 
                  : 'border-[#C2C2C5]'
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1 ml-4">{errors.companyName}</p>
            )}

            <div className="mt-[26px]">
              <Dropdown
                options={industryOptions.map((option) => ({
                  value: option.name,
                  label: t('common.industries.' + option.name)
                }))}
                value={form.industry}
                onChange={handleIndustryChange}
                label={t('form.industry')}
                error={errors.industry}
              />
            </div>

            <div className="mt-[27px]">
              <Dropdown
                options={sizeOptions}
                value={form.companySize}
                onChange={handleCompanySizeChange}
                label={t('form.companySize')}
                error={errors.companySize}
              />
            </div>

            <div className="mt-10">
              <PurpleButtonWithArrow
                label={t('form.meetButton')}
                onClick={(e) => {
                  e.preventDefault();
                  if (isFormValid) {
                    onSubmit(form);
                  }
                }}
                disabled={!isFormValid}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};