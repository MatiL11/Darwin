import React, { useState } from 'react';
import { IconPurpleButton } from 'components/common/IconPurpleButton';
import { PurpleButtonWithArrow } from 'components/common/PurpleButtonWithArrow';
import { useTranslation } from 'react-i18next';
import TransitionContainer from 'components/common/TransitionContainer';
import { aiWorkers } from 'constants/workers';
import { useForm } from 'contexts/FormContext';
import WorkerSelector from 'components/common/WorkerSelector';
import { Step } from 'types/Step';
import IndustrySelector from 'components/common/IndustrySelector';

interface ContactStepProps {
  onSubmit: (data: { contactMethod: 'whatsapp' | 'phone', phoneNumber: string }) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ 
  onSubmit,
}) => {
  const { t } = useTranslation();
  const { form, handleFieldChange } = useForm();
  const [countryCode, setCountryCode] = useState('+54');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (form.phoneNumber) {
      onSubmit({ 
        contactMethod: form.contactMethod as 'whatsapp' | 'phone', 
        phoneNumber: `${countryCode}${form.phoneNumber}` 
      });
    }
  };

  const handleWorkerChange = (value: string) => {
    handleFieldChange('worker', value, Step.CONTACT);
  };

  const handleIndustryChange = (value: string) => {
    handleFieldChange('industry', value, Step.CONTACT);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      handleFieldChange('phoneNumber', value, Step.CONTACT);
    }
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const renderWorkerMedia = () => {
    const workerVideo = aiWorkers.find(worker => worker.key === form.worker)?.videoLandscape;
    if (workerVideo) {
      return (
        <video
          src={workerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-[35px] shadow-[0px_4px_30px_rgba(0,0,0,0.1)]"
        />
      );
    }
  };

  return (
    <div className="h-full w-full relative">
      {/* Main Content */}
      <div className="w-full h-full flex items-center justify-center px-[54px]">
        <div className="w-full max-w-[1800px] flex flex-col md:flex-row items-center justify-center z-20 scale-content">
          {/* Worker Video/Image */}
          <TransitionContainer delay={0.1} className="w-full md:w-[calc(100%-745px-66px)] lg:min-w-[600px] xl:min-w-[750px] mb-8 md:mb-0 flex items-center justify-center lg:mr-[3vw] xl:mr-[1vw] 2xl:mr-[8vw]">
            <div className="w-full max-w-[986px]">
              {renderWorkerMedia()}
            </div>
          </TransitionContainer>
          {/* Contact Form */}
          <TransitionContainer delay={0.2} className="w-full md:w-[745px] lg:w-[745px] xl:w-[745px] flex flex-col justify-start" style={{ height: '635px' }}>
            <h1 className="font-medium text-[32px] text-center md:text-left mb-[25px]">
              {t('contact.title')} <span className="text-[#3957ED] font-bold text-[32px]">{t('contact.aiEmployee')}</span> {t('contact.inAction')}
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-[25px]">
              <span className="font-medium text-[18.67px] text-center md:text-left">{t('contact.timeToMeet')}</span>
              <WorkerSelector
                handleWorkerChange={handleWorkerChange}
              />
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-[40px]">
              <span className="font-medium text-[18.67px] text-center md:text-left">{t('contact.potentialInIndustry')}</span>
              <IndustrySelector
                handleIndustryChange={handleIndustryChange}
              />
            </div>
            <TransitionContainer delay={0.3} className="w-full flex justify-center">
              <div 
                className="bg-gray-100 rounded-[13.33px] py-[36px] px-4 2xl:px-[78px] xl:px-[58px] lg:px-[38px] flex flex-col mx-auto w-full h-[350px] md:h-[370px] lg:h-[397px]"
                style={{ 
                  maxWidth: '100%',
                  borderRadius: '13.33px',
                  overflow: 'auto'
                }}
              >
                <h2 className="text-center font-medium text-[18.67px] mb-[40px] font-satoshi">
                  {t('contact.chooseContactMethod')}
                </h2>
                <div className="w-full max-w-[585px] mx-auto">
                  <div className="flex flex-col sm:flex-row justify-between mb-[20px] w-full">
                    <div className="flex">
                      <IconPurpleButton
                        icon="https://cdn.builder.io/api/v1/image/assets/847ed3b687684841975b535ae65f504c/93e949dac10031341c4f60edb50218f6e079144c4bbec0b8add89e96e46243bf"
                        label={t('contact.whatsapp')}
                        isActive={form.contactMethod === 'whatsapp'}
                        onClick={() => handleFieldChange('contactMethod', 'whatsapp', Step.CONTACT)}
                      />
                    </div>
                    <div className="flex">
                      <IconPurpleButton
                        icon="https://cdn.builder.io/api/v1/image/assets/847ed3b687684841975b535ae65f504c/99c52c0ef941532b13e8c7da846a9bfb791ae0b0d096692b09d79e0c1f1d973e"
                        label={t('contact.phoneCall')}
                        isActive={form.contactMethod === 'phone'}
                        onClick={() => handleFieldChange('contactMethod', 'phone', Step.CONTACT)}
                      />
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                    <div className="flex gap-[26px] w-full max-w-[585px]">
                      {/* Country Code Select */}
                      <div className="relative" style={{ width: '117px', flexShrink: 0 }}>
                        <select
                          value={countryCode}
                          onChange={handleCountryCodeChange}
                          name="countryCode"
                          className={`bg-white rounded-[200px] px-4 h-[66px] w-full appearance-none pl-4 pr-8 font-normal text-[21.33px] leading-[100%] border transition-colors focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] border-black`}
                        >
                          <option value="+54">+54</option>
                          <option value="+1">+1</option>
                          <option value="+34">+34</option>
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L8 8.5L15 1.5" stroke={"black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        value={form.phoneNumber}
                        onChange={handlePhoneNumberChange}
                        name="phoneNumber"
                        placeholder={t('contact.phoneNumber')}
                        className={`flex-1 bg-white rounded-[200px] px-6 h-[66px] font-normal text-[21.33px] leading-[100%] border transition-colors focus:outline-none focus:border-[#3A58ED] focus:ring-1 focus:ring-[#3A58ED] ${form.phoneNumber ? 'border-black' : 'border-[#C2C2C5] placeholder-[#C2C2C5]'}`}
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <PurpleButtonWithArrow
                        label={`${t('contact.contactMe')} ${form.worker} ${t('header.language') === 'English' ? 'now' : t('header.language') === 'Português' ? 'agora' : 'ahora'}`}
                        onClick={(e) => handleSubmit(e)}
                        disabled={!form.phoneNumber}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </TransitionContainer>
          </TransitionContainer>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;