import CryptoJS from "crypto-js";

// Generate a random fallback secret key if environment variable is not set
const generateFallbackSecretKey = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const keyLength = 32;
  let result = "";
  for (let i = 0; i < keyLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const FALLBACK_SECRET_KEY = generateFallbackSecretKey();

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET ?? FALLBACK_SECRET_KEY;

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
