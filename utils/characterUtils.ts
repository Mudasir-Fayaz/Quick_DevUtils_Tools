export const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
export const numberChars = '0123456789';
export const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const getRandomChar = (chars: string): string => {
  return chars[Math.floor(Math.random() * chars.length)];
};

export const shuffleString = (str: string): string => {
  return str.split('').sort(() => Math.random() - 0.5).join('');
};

export const generateToken = (options: {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}): string => {
  let chars = '';
  if (options.uppercase) chars += uppercaseChars;
  if (options.lowercase) chars += lowercaseChars;
  if (options.numbers) chars += numberChars;
  if (options.symbols) chars += symbolChars;

  if (chars === '') return '';

  let generatedToken = '';
  for (let i = 0; i < options.length; i++) {
    generatedToken += getRandomChar(chars);
  }

  return shuffleString(generatedToken);
};

