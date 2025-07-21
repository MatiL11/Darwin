import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TransitionContainer from 'components/common/TransitionContainer';
import doubleCheckIcon from 'assets/icons/chat/double-check.svg';
import { aiWorkers } from 'constants/workers';
import { useForm } from 'contexts/FormContext';
import { ChatMessage, chatsByWorkerAndIndustry } from 'constants/chats';
import { Step } from 'types/Step';
import { getTranslatedChatContent } from 'utils/chatTranslations';
import IndustrySelector from 'components/common/IndustrySelector';
import { useLanguage } from 'contexts/LanguageContext';

interface AIWorkerStepProps {
  onSubmit: (data: { worker: string; industry: string }) => void;
}
const step = Step.WORKER;

const AIWorkerStep: React.FC<AIWorkerStepProps> = ({ onSubmit }) => {
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const { form, handleFieldChange } = useForm();
  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Set default values if not already set
  useEffect(() => {
    if (!form.worker) {
      handleFieldChange('worker', 'Bruno', step);
    }
    if (!form.industry) {
      handleFieldChange('industry', 'automotive', step);
    }
  }, []);

  // Load chat data whenever worker, industry, or language changes
  useEffect(() => {
    // Reset scroll position
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
    
    // Convert worker name to lowercase to match keys in chatsByWorkerAndIndustry
    const workerKey = form.worker ? form.worker.toLowerCase() : '';
    
    // Get chat data for the selected worker and industry
    try {
      if (workerKey && form.industry && 
          chatsByWorkerAndIndustry[workerKey] && 
          chatsByWorkerAndIndustry[workerKey][form.industry]) {
        // Chat data found, set it
        setCurrentChat(chatsByWorkerAndIndustry[workerKey][form.industry]);
      } else {
        // No chat data found
        console.warn(`No chat data found for ${workerKey}/${form.industry}`);
        setCurrentChat([]);
      }
    } catch (error) {
      console.error("Error loading chat data:", error);
      setCurrentChat([]);
    }
  }, [form.worker, form.industry, language, i18n.language]);

  // Handle worker selection
  const handleWorkerChange = (value: string) => {
    handleFieldChange('worker', value, step);
  };

  // Handle industry selection  
  const handleIndustryChange = (value: string) => {
    handleFieldChange('industry', value, step);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="z-10 w-full h-full p-4 lg:px-1 xl:px-2 2xl:px-1 flex flex-col lg:flex-row gap-8 lg:gap-[1.5vw] xl:gap-[2vw] 2xl:gap-[5vw] max-w-[95vw] mx-auto">
        <div className="w-full lg:w-[40%] xl:w-[45%] 2xl:w-[40%] flex flex-col">
          {/* Industry Selector */}
          <TransitionContainer delay={0.1} className="lg:mb-2vh xl:mb-3vh 2xl:mb-4vh">
            <IndustrySelector 
              handleIndustryChange={handleIndustryChange}
            />
          </TransitionContainer>

          <TransitionContainer delay={0.2}>
            <h1 className="text-3xl sm:text-2xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-2vh">
              {t('worker.title')}{" "}
              <span className="font-bold text-[#3A58ED]">{t('worker.aiWorker')}</span>
            </h1>
            <p className="mt-4" style={{ 
              fontSize: '21.33px', 
              lineHeight: '26.67px', 
              marginBottom: '2.5vh',
              fontWeight: 500, 
              verticalAlign: 'middle' 
            }}>
              {t('welcome.subtitle')} <span className="text-[#3A58ED] font-bold" style={{ fontWeight: 700 }}>{t('welcome.subtitleHighlight')}</span> {t('welcome.subtitleContinue')}
            </p>
          </TransitionContainer>

          {/* AI-Workers Selector */}
          <TransitionContainer delay={0.3}>
            <div className="grid grid-cols-3 gap-[0.5vw] w-full">
              {aiWorkers.map((worker) => (
                <div 
                  key={worker.key}
                  onClick={() => handleWorkerChange(worker.key)}
                  className={`
                    lg:p-1vw xl:p-1.5vw 2xl:p-[0.8vw] rounded-xl cursor-pointer transition-all
                    ${form.worker === worker.key 
                      ? 'bg-[#3957ED] text-white' 
                      : 'bg-[#EEEEEE] hover:bg-[#E0E0E0]'
                    }
                    w-full
                  `}
                >
                  <h3 className={`lg:text-[1.8vw] xl:text-[1.5vw] 2xl:text-1.2vw font-satoshi-bold ${form.worker === worker.key ? 'text-white' : 'text-[#3957ED]'}`}>
                    {worker.name}
                  </h3>
                  {isEnglish ? (
                    <p className={`lg:text-[0.9vw]/[1.5vh] xl:text-sm/[2vh] 2xl:text-[0.8vw]/[2.2vh] ${form.worker === worker.key ? 'text-white/80' : 'text-gray-600'} lg:min-h-[3vw] xl:min-h-[3.5vh] 2xl:min-h-[3.5vh]`}>
                      <span className={`font-satoshi-bold ${form.worker === worker.key ? 'text-white' : 'text-[#3957ED]'}`}>
                      {t('common.roles.' + worker.roleKey)} </span>
                      {t('worker.specialist.' + worker.gender)}
                    </p>
                  ) : (
                    <p className={`lg:text-[0.9vw]/[1.5vh] xl:text-sm/[2vh] 2xl:text-[0.8vw]/[2.2vh] ${form.worker === worker.key ? 'text-white/80' : 'text-gray-600'} lg:min-h-[3vw] xl:min-h-[3.5vh] 2xl:min-h-[3.5vh]`}>
                    {t('worker.specialist.' + worker.gender)}
                    <span className={`font-satoshi-bold ${form.worker === worker.key ? 'text-white' : 'text-[#3957ED]'}`}> {t('common.roles.' + worker.roleKey)}
                    </span>
                    </p>
                  )}
                  <div className="mt-1vh">
                    <img 
                      src={worker.imageCard} 
                      alt={worker.name} 
                      className="w-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TransitionContainer>
        </div>

        {/* Chat Preview */}
        <TransitionContainer delay={0.4} className="w-full lg:w-[60%] xl:w-[55%] 2xl:w-[50%] bg-white rounded-3xl shadow-lg flex flex-col h-[85vh] mt-0">
          {/* Chat header */}
          <div className="p-1vw border-b flex items-center shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-1vw">
                <img 
                  src={aiWorkers.find(w => w.key === form.worker)?.imageChat || ''} 
                  alt={form.worker} 
                  className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-xl md:text-2vh font-bold text-[#4F46E5]">{form.worker.slice(0, 1).toUpperCase() + form.worker.slice(1)}</h3>
          </div>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 allow-scroll" ref={chatContainerRef}>
            {currentChat.map((message, index) => (
              <div 
                key={index} 
                className="flex w-full mb-1vh"
              >
                {/* Received Messages */}
                <div className="w-1/2 pr-1 flex">
                  {message.type === 'received' ? (
                    message.isContactCard ? (
                      <div className="max-w-[95%] font-roboto">
                        {message.content}
                      </div>
                    ) : (
                      <div className="max-w-[95%] p-1vh rounded-2xl bg-[#F3F2F2] text-gray-800">
                        <div className="text-sm md:text-1vw lg:text-1.5vh xl:text-1.5vh 2xl:text-1.5vh font-roboto">
                          {getTranslatedChatContent(message.content, form.worker, form.industry, index, t)}
                        </div>
                        <span className="text-[1vh] text-gray-500 block text-right mt-[0.5vh] mb-[-0.2vw] font-roboto pr-1">
                          {message.time}
                        </span>
                      </div>
                    )
                  ) : null}
                </div>
                {/* Sent Messages */}
                <div className="w-1/2 pl-1 flex justify-end">
                  {message.type === 'sent' ? (
                    message.isContactCard ? (
                      <div className="max-w-[95%] font-roboto">
                        {message.content}
                      </div>
                    ) : (
                      <div className="max-w-[95%] p-1vh rounded-2xl bg-[#ECEFFE] text-gray-800">
                        <p className="text-sm md:text-1vw lg:text-1.5vh xl:text-1.5vh 2xl:text-1.5vh font-roboto">
                            {getTranslatedChatContent(message.content, form.worker, form.industry, index, t)}
                        </p>
                        <span className="text-[1vh] text-gray-500 block text-right mt-[0.5vh] mr-[-0.5vw] mb-[-0.2vw] font-roboto pr-1">
                          {message.time}
                          <img 
                            src={doubleCheckIcon} 
                            alt="Read" 
                            className="inline-block ml-[0.2vh] w-3 h-3 md:w-[1.5vh] md:h-[1.5vh]"
                          />
                        </span>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2vh border-t mt-auto shrink-0">
            <button
              onClick={() => onSubmit(form)}
              disabled={!form.worker}
              className="w-full py-[1.5vh] bg-[#3957ED] text-white rounded-full font-medium hover:bg-[#2944D1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-2vh"
            >
              {t('worker.continue')} {form.worker.slice(0, 1).toUpperCase() + form.worker.slice(1)}
            </button>
          </div>
        </TransitionContainer>
      </div>
    </div>
  );
};

export default AIWorkerStep;