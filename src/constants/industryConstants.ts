import automotiveIcon from 'assets/icons/industries/automotive.svg';
import educationIcon from 'assets/icons/industries/education.svg';
import realEstateIcon from 'assets/icons/industries/real-estate.svg';
import retailIcon from 'assets/icons/industries/retail.svg';
import healthcareIcon from 'assets/icons/industries/healthcare.svg';
import insuranceIcon from 'assets/icons/industries/insurance.svg';
import servicesIcon from 'assets/icons/industries/services.svg';

export type Industry = {
  name: string;
  label: string;
  icon: string;
}

export enum Industries {
  AUTOMOTIVE = 'automotive',
  EDUCATION = 'education',
  REAL_ESTATE = 'realEstate',
  RETAIL = 'retail',
  HEALTHCARE = 'healthcare',
  INSURANCE = 'insurance',
  SERVICES = 'services'
}

export const industriesMap: Record<Industries, Industry> = {
  [Industries.AUTOMOTIVE]: {
    name: 'automotive',
    label: 'Automotive',
    icon: automotiveIcon
  },
  [Industries.EDUCATION]: {
    name: 'education',
    label: 'Education',
    icon: educationIcon
  },
  [Industries.REAL_ESTATE]: {
    name: 'realEstate',
    label: 'Real Estate',
    icon: realEstateIcon
  },
  [Industries.RETAIL]: {
    name: 'retail',
    label: 'Retail',
    icon: retailIcon
  },
  [Industries.HEALTHCARE]: {
    name: 'healthcare',
    label: 'Healthcare',
    icon: healthcareIcon
  },
  [Industries.INSURANCE]: {
    name: 'insurance',
    label: 'Insurance',
    icon: insuranceIcon
  },
  [Industries.SERVICES]: {
    name: 'services',
    label: 'Services',
    icon: servicesIcon
  }
}

export const industryOptions: Industry[] = Object.values(industriesMap);