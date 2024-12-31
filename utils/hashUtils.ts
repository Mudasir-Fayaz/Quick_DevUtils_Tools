import CryptoJS from 'crypto-js';
import { lib } from 'crypto-js';
type WordArray = lib.WordArray;

export type HashFunction = 'MD5' | 'SHA1' | 'SHA256' | 'SHA224' | 'SHA512' | 'SHA384' | 'SHA3' | 'RIPEMD160';
export type DigestEncoding = 'Hex' | 'Base64' | 'Latin1' | 'Utf8' | 'Utf16' | 'Utf16LE' | 'Base64url';

export const hashFunctions: { [key in HashFunction]: (message: string) => WordArray } = {
  MD5: CryptoJS.MD5,
  SHA1: CryptoJS.SHA1,
  SHA256: CryptoJS.SHA256,
  SHA224: CryptoJS.SHA224,
  SHA512: CryptoJS.SHA512,
  SHA384: CryptoJS.SHA384,
  SHA3: CryptoJS.SHA3,
  RIPEMD160: CryptoJS.RIPEMD160,
};

export const digestEncodings: { [key in DigestEncoding]: (wordArray: WordArray) => string } = {
  Hex: (wordArray) => wordArray.toString(),
  Base64: (wordArray) => wordArray.toString(CryptoJS.enc.Base64),
  Latin1: (wordArray) => wordArray.toString(CryptoJS.enc.Latin1),
  Utf8: (wordArray) => wordArray.toString(CryptoJS.enc.Utf8),
  Utf16: (wordArray) => wordArray.toString(CryptoJS.enc.Utf16),
  Utf16LE: (wordArray) => wordArray.toString(CryptoJS.enc.Utf16LE),
  Base64url: (wordArray) => wordArray.toString(CryptoJS.enc.Base64url),
};

export const generateHash = (text: string, hashFunction: HashFunction, encoding: DigestEncoding): string => {
  const hashWordArray = hashFunctions[hashFunction](text);
  return digestEncodings[encoding](hashWordArray);
};

