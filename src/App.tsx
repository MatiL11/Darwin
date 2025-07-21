import { WelcomeStep } from 'components/steps/WelcomeStep';
import { FormPage } from 'components/steps/FormStep';
import { Header } from 'components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { Background } from 'components/layout/Background';
import AIWorkerStep from 'components/steps/AIWorkerStep/AIWorkerStep';
import ScheduleMeetingStep from 'components/steps/ScheduleMeetingStep';
import ContactStep from 'components/steps/ContactStep';
import TransitionContainer from 'components/common/TransitionContainer';
import { Step } from 'types/Step';
import { AnimatePresence } from 'framer-motion';
import { fadeSlideVariants } from 'constants/fadeSlideVariants';
import { useStep } from 'contexts/StepContext';
import { useForm } from 'contexts/FormContext';
import 'i18n';

export default function App() {
  const { step, setStep } = useStep();
  const { form, setForm } = useForm();

  const handleWelcomeSubmit = (data: { website: string; email: string }) => {
    setForm({ ...form, ...data });
    setStep(Step.FORM);
  };

  const handleFormSubmit = (data: { companyName: string; industry: string; companySize: string }) => {
    setForm({ ...form, ...data });
    setStep(Step.WORKER);
  };

  const handleWorkerSubmit = (data: { worker: string; industry: string }) => {
    setForm({ ...form, ...data });
    setStep(Step.SCHEDULE);
  };

  const handleScheduleSubmit = (data: { meetingTime: string }) => {
    setForm({ ...form, ...data });
    setStep(Step.CONTACT);
  };

  const handleContactSubmit = (data: { contactMethod: 'whatsapp' | 'phone', phoneNumber: string }) => {
    setForm({ ...form, ...data });
    // TODO: Handle the final submission and remove the debugger logs
    console.log('Form details:', form);
  };

  const handleBack = () => {
    switch (step) {
      case Step.FORM:
        setStep(Step.WELCOME);
        break;
      case Step.WORKER:
        setStep(Step.FORM);
        break;
      case Step.SCHEDULE:
        setStep(Step.WORKER);
        break;
      case Step.CONTACT:
        setStep(Step.SCHEDULE);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen h-screen bg-white/80">
      <Background>
        <div className="flex flex-col h-full relative">
          <Header onBack={handleBack} showBackButton={step !== Step.WELCOME} />
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 md:px-8">
              <AnimatePresence mode="wait">
                {step === Step.WELCOME && (
                  <TransitionContainer
                    key={Step.WELCOME}
                    variants={fadeSlideVariants}
                    className="w-full h-full flex items-center"
                    exit="exit"
                  >
                    <WelcomeStep onSubmit={handleWelcomeSubmit} />
                  </TransitionContainer>
                )}
                {step === Step.FORM && (
                  <TransitionContainer
                    key={Step.FORM}
                    variants={fadeSlideVariants}
                    className="w-full h-full flex items-center"
                    exit="exit"
                  >
                    <FormPage onSubmit={handleFormSubmit}
                    />
                  </TransitionContainer>
                )}
                {step === Step.WORKER && (
                  <TransitionContainer
                    key={Step.WORKER}
                    variants={fadeSlideVariants}
                    className="w-full h-full flex items-start"
                    exit="exit"
                  >
                    <AIWorkerStep onSubmit={handleWorkerSubmit}
                    />
                  </TransitionContainer>
                )}
                {step === Step.SCHEDULE && (
                  <TransitionContainer
                    key={Step.SCHEDULE}
                    variants={fadeSlideVariants}
                    className="w-full h-full flex items-center"
                    exit="exit"
                  >
                    <ScheduleMeetingStep onSubmit={handleScheduleSubmit} />
                  </TransitionContainer>
                )}
                {step === Step.CONTACT && (
                  <TransitionContainer
                    key={Step.CONTACT}
                    variants={fadeSlideVariants}
                    className="w-full h-full flex items-center"
                    exit="exit"
                  >
                    <ContactStep onSubmit={handleContactSubmit}
                    />
                  </TransitionContainer>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Footer showLogo={step !== Step.WELCOME} />
        </div>
      </Background>
    </div>
  );
}