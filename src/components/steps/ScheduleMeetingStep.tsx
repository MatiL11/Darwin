import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TransitionContainer from "components/common/TransitionContainer";
import whatsappIcon from "assets/images/schedule/whatsapp.png";
import instagramIcon from "assets/images/schedule/instagram.png";
import imessageIcon from "assets/images/schedule/imessage.png";
import phoneIcon from "assets/images/schedule/phone.png";
import { aiWorkers, WorkerMetric } from "constants/workers";
import { useForm } from "contexts/FormContext";

// Declare Calendly type for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: any;
        utm?: any;
      }) => void;
    };
  }
}

const integrationIconsMap = {
  'whatsapp': whatsappIcon,
  'instagram': instagramIcon,
  'imessage': imessageIcon,
  'phone': phoneIcon
};

interface ScheduleMeetingStepProps {
  onSubmit: (data: { meetingTime: string }) => void;
}

const ScheduleMeetingStep: React.FC<ScheduleMeetingStepProps> = ({ 
  onSubmit,
}) => {
  const { t, i18n } = useTranslation();
  const {form} = useForm();
  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';
  const profileRef = useRef<HTMLDivElement>(null);
  const metricsContainerRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [scaleLevel, setScaleLevel] = useState(0.75);
  const [topMargin, setTopMargin] = useState('-3vh');
  const [profileHeight, setProfileHeight] = useState<number | null>(null);

  // Determine the scale level based on viewport dimensions
  useEffect(() => {
    const updateScaleLevel = () => {
      const width = window.innerWidth;
      // Scale levels for different viewport sizes
      if (width <= 1054) {
        // Laptop (1050x950)
        setScaleLevel(0.45);
        setTopMargin('-3vh');
      } else if (width <= 1200) {
        // Laptop (1200x950)
        setScaleLevel(0.55);
        setTopMargin('-3.5vh');
      } else if (width <= 1440) {
        // Laptop (1440x900)
        setScaleLevel(0.65);
        setTopMargin('-4vh');
      } else if (width <= 1680) {
        // Desktop (1680x1050)
        setScaleLevel(0.75);
        setTopMargin('-3.5vh');
      } else if (width <= 1920) {
        // Desktop (1920x1080)
        setScaleLevel(0.78);
        setTopMargin('-3vh');
      } else if(width <= 2100) {
        // Desktop (2100x1200)
        setScaleLevel(0.90);
        setTopMargin('-3vh');
      } else if (width <= 2560) {
        // Desktop (2560x1440)
        setScaleLevel(1.0);
        setTopMargin('-6vh');
      } else {
        // Default for other resolutions
        setScaleLevel(1.0);
        setTopMargin('-3vh');
      }
    };
    updateScaleLevel();
    window.addEventListener('resize', updateScaleLevel);
    return () => {
      window.removeEventListener('resize', updateScaleLevel);
    };
  }, []);

  useEffect(() => {
    const updateMetricsHeight = () => {
      if (profileRef.current && metricsContainerRef.current) {
        const height = profileRef.current.offsetHeight;
        setProfileHeight(height);
      }
    };
    updateMetricsHeight();
    window.addEventListener('resize', updateMetricsHeight);
    const observer = new MutationObserver(updateMetricsHeight);
    if (profileRef.current) {
      observer.observe(profileRef.current, { attributes: true, childList: true, subtree: true });
    }
    return () => {
      window.removeEventListener('resize', updateMetricsHeight);
      observer.disconnect();
    };
  }, []);

  // Add Calendly script when component mounts and set up event listener for scheduling completion
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    // Listen for Calendly script load
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/d/cngc-xjy-yfc/agenda-tu-demo-ahora',
          parentElement: calendlyRef.current,
          prefill: {},
          utm: {}
        });
      }
    };
    document.body.appendChild(script);
    // Listen for Calendly events
    window.addEventListener('message', handleCalendlyEvent);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleCalendlyEvent);
    };
  }, []);

  // Handle Calendly events to detect when a meeting is scheduled
  const handleCalendlyEvent = (e: MessageEvent) => {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
      if (e.data.event === 'calendly.event_scheduled') {
        // Auto-navigate to next step when meeting is scheduled
        onSubmit({ meetingTime: 'scheduled' });
      }
    }
  };

  return (
    <div className="h-full w-full relative pb-[10vh]">
      {/* Main Content with flex grid layout */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[95vw] flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-[1vw] items-center">
          {/* Left Side - Worker Info - Flex Grid with 2 columns */}
          <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-[1vw] items-start">
            {/* First column: Image and Profile Card */}
            <TransitionContainer delay={0.1} className="flex flex-col gap-6 md:gap-[1vw] 2xl:gap-[0.3vw] h-full" ref={profileRef}>
              {/* Worker Image */}
              <div className="w-full aspect-[2/1] rounded-xl md:rounded-[1vw] bg-[#EEEEEE] overflow-hidden">
                <img
                  src={aiWorkers.find(worker => worker.key === form.worker)?.imageSchedule}
                  alt={form.worker}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Worker Profile Card */}
              <div className="bg-[#EEEEEE] rounded-xl md:rounded-[1vw] p-6 md:p-[1.5vw] flex-grow">
                <h2 className="text-[#3A58ED] font-bold lg:text-[1.8vw] 2xl:text-[1.5vw]">
                  {form.worker.slice(0, 1).toUpperCase() + form.worker.slice(1)}
                </h2>
                <h3 className="mb-4 md:mb-[1vw]">
                  {isEnglish ? (
                    <>
                      <span className="text-[#3957ED] font-bold lg:text-[1.5vw] 2xl:text-[1.2vw]">{t(`common.roles.${aiWorkers.find(worker => worker.key === form.worker)?.roleKey || ''}`)} </span>
                      <span className="font-medium lg:text-[1.5vw] 2xl:text-[1.2vw]">{t(`schedule.genderPrefixes.${aiWorkers.find(worker => worker.key === form.worker)?.gender || 'M'}`)}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-medium lg:text-[1.5vw] 2xl:text-[1.2vw]">{t(`schedule.genderPrefixes.${aiWorkers.find(worker => worker.key === form.worker)?.gender || 'M'}`)} </span>
                      <span className="text-[#3957ED] font-bold lg:text-[1.5vw] 2xl:text-[1.2vw]">{t(`common.roles.${aiWorkers.find(worker => worker.key === form.worker)?.roleKey || ''}`)}</span>
                    </>
                  )}
                </h3>
                
                {/* Quote */}
                <p className="italic font-medium lg:text-[1vw] 2xl:text-[0.8vw] mb-4 md:mb-[1vw]">
                  "{t(`schedule.workerInfo.${form.worker}.quote`)}"
                </p>
                
                {/* Abilities */}
                <div className="mb-4 md:mb-[1vw]">
                  {(aiWorkers.find(worker => worker.key === form.worker)?.abilities || []).map((ability: string, index: number) => (
                    <div key={index} className="flex items-base gap-2 md:gap-[0.5vw] mb-2 md:mb-[0.5vw]">
                      <span className="text-[#3957ED] font-bold">•</span>
                      <p className="font-medium text-base lg:text-[1vw] 2xl:text-[0.8vw]">
                        {t(`schedule.workerInfo.${form.worker}.abilities.${index}`)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Integrations */}
                <div>
                  <p className="font-medium text-lg md:text-[1.2vw] 2xl:text-[1vw] mb-2 md:mb-[0.5vw]">
                    {t('schedule.integration.canIntegrate')} <span className="text-[#3957ED] font-bold text-lg md:text-[1.2vw] 2xl:text-[1vw]">{(t('schedule.integration.integrateWith', { returnObjects: true }) as Record<string, string>)[(aiWorkers.find(worker => worker.key === form.worker)?.gender || 'M')]}</span> {t('schedule.integration.with')}
                  </p>
                  <div className="flex gap-3 md:gap-[0.8vw]">
                    {(aiWorkers.find(worker => worker.key === form.worker)?.integrations || []).map((integration: string, index: number) => (
                      <img 
                        key={index}
                        src={integrationIconsMap[integration as keyof typeof integrationIconsMap]}
                        alt={integration}
                        className="w-10 h-10 md:w-[2.5vw] md:h-[2.5vw]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TransitionContainer>

            {/* Metrics */}
            <TransitionContainer 
              delay={0.2}
              ref={metricsContainerRef}
              className="h-full flex flex-col gap-6 md:gap-[1vw] lg:gap-[0.5vw] xl:gap-[1vw] 2xl:gap-[0.3vw]"
              style={profileHeight ? { height: `${profileHeight}px` } : {}}
            >
              {(aiWorkers.find(worker => worker.key === form.worker)?.metrics || []).map((metric: WorkerMetric, index: number) => (
                <div 
                  key={index}
                  className="bg-[#EEEEEE] rounded-xl md:rounded-[1vw] p-6 md:px-[3vw] lg:px-[2vw] xl:px-[3vw] flex-col justify-center items-center flex flex-1"
                >
                  <div className="text-[#3957ED] font-medium text-4xl md:text-[3vw] text-center mb-4 md:mb-[1vw] align-middle">
                    {metric.value}
                  </div>
                  <div className="flex items-center gap-3 md:gap-[0.8vw]">
                    <img
                      src={metric.icon}
                      alt=""
                      className="w-10 h-10 md:w-[2.5vw] md:h-[2.5vw]"
                    />
                    <p className="text-black font-medium text-base md:text-[1vw]">
                      {t(`schedule.workerInfo.${form.worker}.metrics.${index}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </TransitionContainer>
          </div>

          {/* Booking Form */}
          <TransitionContainer delay={0.3} className="w-full flex flex-col items-center mt-6 lg:mt-0 self-center">
            <div className="text-center mb-4 md:mb-[1vw]">
              <h2 className="font-satoshi-medium text-2xl md:text-[2vw] mb-2 lg:mb-[0.5vw] xl:mb-[1vw] 2xl:mb-[2vw]">
                {t('schedule.scheduleHeader')} <span className="text-[#3957ED] font-satoshi-bold text-2xl md:text-[2vw]">{t('schedule.aiEmployee')}</span>
              </h2>
              <p className="text-gray-600 font-satoshi-medium text-base lg:text-[1vw] xl:text-[1vw] 2xl:text-[1.2vw]">
                {t('schedule.discoverFeatures')}
              </p>
            </div>
            {/* Calendly */}
            <div 
              className="w-full overflow-hidden" 
              style={{ 
                height: profileHeight ? `${profileHeight}px` : '60vh',
                position: 'relative' 
              }}
            >
              <div 
                ref={calendlyRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: profileHeight ? `${profileHeight * (1/scaleLevel)}px` : `${60 * (1/scaleLevel)}vh`,
                  width: `${100 * (1/scaleLevel)}%`,
                  transform: `scale(${scaleLevel})`,
                  transformOrigin: 'top left',
                  marginTop: topMargin,
                }}
              ></div>
            </div>
          </TransitionContainer>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingStep;