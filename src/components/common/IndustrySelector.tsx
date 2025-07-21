import React from 'react';
import { PurpleDropdown } from 'components/common/PurpleDropdown';
import { useTranslation } from 'react-i18next';
import { industryOptions } from 'constants/industryConstants';
import { useForm } from 'contexts/FormContext';

interface IndustrySelectorProps {
  handleIndustryChange: (value: string) => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ handleIndustryChange }) => {
  const { t } = useTranslation();
  const { form } = useForm();

  const mappedOptions = industryOptions.map(industry => ({
    name: industry.name,
    label: t('common.industries.' + industry.name),
    icon: industry.icon
  }));

  const currentIndustry = industryOptions.find(industry => industry.name === form.industry);
  const currentLabel = currentIndustry ? t('common.industries.' + currentIndustry.name) : '';

  return (
    <PurpleDropdown
        options={mappedOptions}
        value={form.industry}
        label={currentLabel}
        onChange={handleIndustryChange}
        icon={currentIndustry?.icon || ''}
        isClickToOpen={false}
    />
  );
};

export default IndustrySelector;