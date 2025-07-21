import React from 'react';
import { PurpleButtonWithArrow } from 'components/common/PurpleButtonWithArrow';
import { validateEmailFormat, validateBusinessEmail, validateWebsite } from 'utils/formValidations';
import { welcomeLogos } from 'constants/welcomeLogos';
import darwinLogo from 'assets/logos/darwin-ai-logo.svg';
import siteIcon from 'assets/icons/site.svg';
import mailIcon from 'assets/icons/mail.svg';
import welcomeImage from 'assets/images/welcome/welcome-image.png';
import { getIconFilter } from 'utils/iconManipulation';
import { useTranslation } from 'react-i18next';
import { useForm } from 'contexts/FormContext';
import { Form } from 'types/Form';
import { Step } from 'types/Step';

interface WelcomeStepProps {
  onSubmit: (data: Form) => void;
}

const step = Step.WELCOME;

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { form, errors, handleFieldChange } = useForm();

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let errorKey = '';
    if (!value) {
      errorKey = "websiteRequired";
    } else if (!validateWebsite(value)) {
      errorKey = "websiteInvalid";
    }
    handleFieldChange('website', value, step, errorKey);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let errorKey = '';
    if (!value) {
      errorKey = "emailRequired";
    } else if (!validateEmailFormat(value)) {
      errorKey = "emailInvalid";
    } else if (!validateBusinessEmail(value)) {
      errorKey = "emailBusiness";
    }
    handleFieldChange('email', value, step, errorKey);
  };

  const isFormValid = validateWebsite(form.website) && 
                     validateEmailFormat(form.email) && 
                     validateBusinessEmail(form.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(form);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="z-10 flex flex-col lg:flex-row w-full h-full items-center pl-[2.76vw] lg:gap-[6.93vw]">
        <div className="w-full lg:w-auto flex items-center justify-center py-8 lg:py-0 hidden lg:flex">
          <div 
            className="bg-white rounded-[31.61px] shadow-[0px_4px_30px_rgba(0,0,0,0.1)]"
            style={{ 
              width: '51.4vw', 
              maxWidth: 'calc(100vw - 106px)',
              height: 'auto',
              minHeight: '60vh',
              maxHeight: 'calc(100vh - 100px)',
              padding: '2.76vw 2.08vw'
            }}
          >
            <h1 className="font-medium" style={{ 
              fontSize: 'clamp(32px, 2.78vw, 53.33px)', 
              lineHeight: 'clamp(48px, 4.17vw, 80px)', 
              fontWeight: 500 
            }}>
              {t('welcome.title')} <span className="text-[#3A58ED]" style={{ fontWeight: 700 }}>{t('welcome.titleHighlight')}</span>
            </h1>
            
            <p className="mt-4" style={{ 
              fontSize: 'clamp(18px, 1.25vw, 24px)', 
              lineHeight: 'clamp(24px, 1.67vw, 32px)', 
              fontWeight: 500, 
              verticalAlign: 'middle' 
            }}>
              {t('welcome.subtitle')} <span className="text-[#3A58ED] font-bold" style={{ fontWeight: 700 }}>{t('welcome.subtitleHighlight')}</span> {t('welcome.subtitleContinue')}
            </p>

            <div className="mt-8">
              <img
                src={welcomeImage}
                alt="AI Evolution"
                className="w-full h-auto object-cover rounded-3xl"
                style={{ maxHeight: '30vh' }}
              />
            </div>

            <p className="mt-8" style={{ 
              fontSize: 'clamp(18px, 1.25vw, 24px)', 
              lineHeight: 'clamp(24px, 1.67vw, 32px)', 
              fontWeight: 500, 
              verticalAlign: 'middle' 
            }}>{t('welcome.joinCompanies')}</p>

            <div 
              className="logos mt-4 overflow-hidden"
              style={{ width: '100%', height: 'auto', minHeight: '80px', maxHeight: '100px' }}
            >
              <div className="logos-slide inline-block">
                {welcomeLogos.map((logo, index) => {
                  return (
                    <img 
                      key={index} 
                      src={logo.src} 
                      alt={logo.alt} 
                      className={`object-contain inline-block`}
                      style={{ 
                        margin: '0 1.5vw', 
                        maxWidth: '10vw',
                        maxHeight: '70px',
                        height: 'auto'
                      }}
                    />
                  );
                })}
              </div>
              <div className="logos-slide inline-block">
                {welcomeLogos.map((logo, index) => {
                  return (
                    <img 
                      key={index} 
                      src={logo.src} 
                      alt={logo.alt} 
                      className={`object-contain inline-block`}
                      style={{ 
                        margin: '0 1.5vw', 
                        maxWidth: '10vw',
                        maxHeight: '70px',
                        height: 'auto'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Form */}
        <div className="w-full lg:w-auto flex items-center lg:items-start justify-center lg:justify-start">
          <div 
            className="hidden lg:block w-full"
            style={{ maxWidth: '26.35vw' }}
          >
            <div className="mb-[5vh]">
              <img
                src={darwinLogo}
                alt="Darwin Logo"
                className="w-[40%]"
                style={{ maxWidth: '10.26vw' }}
              />
            </div>

            <h2 className="mb-[4vh] text-left" style={{ 
              fontSize: 'clamp(24px, 1.67vw, 32px)', 
              fontWeight: 500, 
              verticalAlign: 'middle' 
            }}>
              {t('welcome.createYourOwn')} <span className="text-[#3A58ED]" style={{ 
                fontSize: 'clamp(24px, 1.67vw, 32px)', 
                fontWeight: 700, 
              }}>{t('welcome.aiEmployee')}</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-[25px] w-full text-left">
              <div className="relative">
                <img 
                  src={siteIcon} 
                  alt="" 
                  className="absolute left-4 top-[50%] -translate-y-1/2 w-5 h-5 transition-colors z-10"
                  style={{ 
                    filter: getIconFilter(form.website, !!errors.website, false)
                  }}
                />
                <input
                  type="text"
                  name="website"
                  placeholder={t('welcome.websitePlaceholder')}
                  value={form.website}
                  onChange={handleWebsiteChange}
                  className={`w-full px-12 py-[19px] rounded-[200px] border focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] transition-colors placeholder-[#C2C2C5] ${form.website ? (errors.website ? 'border-red-500' : 'border-black') : 'border-[#C2C2C5]'}`}
                  style={{ 
                    height: 'clamp(50px, 3.44vw, 66px)', 
                    width: '100%',
                    fontFamily: 'Satoshi',
                    fontWeight: 400,
                    fontSize: 'clamp(16px, 1.11vw, 21.33px)',
                    verticalAlign: 'middle'
                  }}
                  onFocus={(e) => {
                    const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                    if (img) {
                      img.style.filter = "invert(29%) sepia(93%) saturate(1465%) hue-rotate(227deg) brightness(94%) contrast(98%)";
                    }
                  }}
                  onBlur={(e) => {
                    const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                    if (img) {
                      const hasError = !!errors.website;
                      img.style.filter = getIconFilter(e.currentTarget.value, hasError, false);
                    }
                  }}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1 ml-4 absolute">{errors.website}</p>
                )}
              </div>

              <div className="relative">
                <img 
                  src={mailIcon} 
                  alt="" 
                  className="absolute left-4 top-[50%] -translate-y-1/2 w-5 h-5 transition-colors z-10"
                  style={{ 
                    filter: getIconFilter(form.email, !!errors.email, false)
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('welcome.emailPlaceholder')}
                  value={form.email}
                  onChange={handleEmailChange}
                  className={`w-full px-12 py-[19px] rounded-[200px] border focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] transition-colors placeholder-[#C2C2C5] ${form.email ? (errors.email ? 'border-red-500' : 'border-black') : 'border-[#C2C2C5]'}`}
                  style={{ 
                    height: 'clamp(50px, 3.44vw, 66px)', 
                    width: '100%',
                    fontFamily: 'Satoshi',
                    fontWeight: 400,
                    fontSize: 'clamp(16px, 1.11vw, 21.33px)',
                    verticalAlign: 'middle'
                  }}
                  onFocus={(e) => {
                    const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                    if (img) {
                      img.style.filter = "invert(29%) sepia(93%) saturate(1465%) hue-rotate(227deg) brightness(94%) contrast(98%)";
                    }
                  }}
                  onBlur={(e) => {
                    const img = e.currentTarget.previousElementSibling as HTMLImageElement;
                    if (img) {
                      const hasError = !!errors.email;
                      img.style.filter = getIconFilter(e.currentTarget.value, hasError, false);
                    }
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-4 absolute">{errors.email}</p>
                )}
              </div>

              <div className="mt-[40px]">
                <PurpleButtonWithArrow
                  label={t('welcome.getButton')}
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
    </div>
  );
};