export interface Hotline {
  label: string;
  number: string; // display format
  tel: string; // tel: link, international format
}

// Emergency hotlines of the Municipality of Sipocot, Camarines Sur
export const emergencyHotlines: Hotline[] = [
  { label: "Mayor's Office", number: '0949-121-6781', tel: '+639491216781' },
  { label: 'MDRRMO', number: '0907-030-5000', tel: '+639070305000' },
  { label: 'PNP', number: '0998-598-5975', tel: '+639985985975' },
  { label: 'BFP', number: '0999-938-0063', tel: '+639999380063' },
  { label: 'MSWDO', number: '0917-854-5409', tel: '+639178545409' },
];
