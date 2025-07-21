import { blockedEmailDomains } from "constants/blockedEmailDomains";
import { CompanySize } from "constants/companySizeOptions";
import { industryOptions, Industries } from "constants/industryConstants";

// Validate website format
export const validateWebsite = (website: string): boolean => {
  // Allow URLs with or without protocol
  const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  return urlRegex.test(website);
};

// Validate if email is a business email (not from common personal domains)
export const validateBusinessEmail = (email: string): boolean => {
  if (!email.includes('@')) return false;
  
  const domain = email.split('@')[1].toLowerCase();
  return !blockedEmailDomains.includes(domain);
};

// Validate email format
export const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate company name (alphanumeric characters only)
export const validateCompanyName = (name: string): boolean => {
  // Allow alphanumeric characters, spaces, and common punctuation
  const nameRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\.,&'-]+$/;
  return name.trim().length > 0 && nameRegex.test(name);
};

// Validate industry (must be one of the predefined options)
export const validateIndustry = (industry: string): boolean => {
  return industryOptions.some(option => option.name === industry) || 
         Object.values(Industries).includes(industry as Industries);
};
  
// Validate company size (must be one of the predefined options)
export const validateCompanySize = (size: string): boolean => {
  // Check if size is one of the values from CompanySize enum
  return Object.values(CompanySize).includes(size as CompanySize);
};