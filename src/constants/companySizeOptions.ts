export enum CompanySize {
  "1_TO_10" = "1-10",
  "11_TO_50" = "11-50",
  "51_TO_200" = "51-200",
  "201_TO_500" = "201-500",
  "MORE_THAN_500" = ">500"
}

export const companySizeOptions = Object.values(CompanySize).map(size => ({
  value: size,
  key: size
}));