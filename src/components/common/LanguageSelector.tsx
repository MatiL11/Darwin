import { PurpleDropdown } from 'components/common/PurpleDropdown';
import { useLanguage } from 'contexts/LanguageContext';
import { getFlag } from 'assets/flags';
import { useTranslation } from 'react-i18next';
import { Language } from 'i18n/index';

interface LanguageOption {
  code: Language;
  label: string;
}

export const LanguageSelector = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  
  const languageOptions: LanguageOption[] = [
    { code: Language.EN, label: t('languages.' + Language.EN) },
    { code: Language.ES, label: t('languages.' + Language.ES) },
    { code: Language.PT, label: t('languages.' + Language.PT) }
  ];

  const currentLanguageOption = languageOptions.find(option => option.code === language);
  const currentLanguageLabel = currentLanguageOption ? currentLanguageOption.label : t('languages.' + language);

  return (
    <div className="header-element">
      <PurpleDropdown
        options={languageOptions.map(option => ({
          name: option.code,
          label: option.label,
          icon: getFlag(option.code)
        }))}
        value={language}
        label={currentLanguageLabel}
        icon={getFlag(language)}
        onChange={(value: string) => setLanguage(value as Language)}
        buttonClassName="bg-[#3957ED] text-white rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 flex items-center gap-2"
        iconSize="w-5 h-3.5 sm:w-5.5 sm:h-3.5 md:w-6 md:h-4"
        dropdownWidth="w-32 sm:w-36 md:w-40"
      />
    </div>
  );
}; 