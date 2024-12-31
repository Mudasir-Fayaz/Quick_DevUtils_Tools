declare module 'libphonenumber-js' {
    export interface PhoneNumber {
      number: string;
      country: string;
      isValid(): boolean;
      getType(): string;
    }
  
    export function parsePhoneNumber(phone: string, country?: string): PhoneNumber;
    export function isValidPhoneNumber(phone: string, country?: string): boolean;
  }