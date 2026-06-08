import type { Language } from './i18n';

//export const WHATSAPP_NUMBER = '966537133080';

/*
export const WHATSAPP_NUMBER = '';
export const DROP_OFF_CALENDLY_URL = 'https://calendly.com/autosave45/30min';

const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppUrl(message?: string): string {
  if (!message) {
    return WHATSAPP_BASE_URL;
  }

  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function getContactInquiryMessage(lang: Language): string {
  return lang === 'ar'
    ? 'مرحباً فريق أوتو سيف، لدي استفسار وأرغب بالتواصل عبر واتساب.'
    : 'Hello Auto Save team, I have an inquiry and would like to connect via WhatsApp.';
}

export function getPickupReturnMessage(lang: Language): string {
  return lang === 'ar'
    ? 'مرحباً فريق أوتو سيف، أرغب في طلب خدمة الاستلام والإرجاع لسيارتي. الرجاء تزويدي بالخطوات المتاحة وأقرب موعد مناسب.'
    : 'Hello Auto Save team, I would like to request Pickup & Return service for my car. Please share the available steps and the earliest suitable appointment.';
}

export function getGeneralContactWhatsAppUrl(lang: Language): string {
  return getWhatsAppComposeUrl(getContactInquiryMessage(lang));
}

export function getPickupReturnWhatsAppUrl(lang: Language): string {
  return getWhatsAppComposeUrl(getPickupReturnMessage(lang));
}

export function getWhatsAppComposeUrl(message?: string): string {
  const base = `https://wa.me/`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DISPLAY_NUMBER = '';
*/

// TEMPORARY COMING SOON MODE
export const WHATSAPP_DISPLAY_NUMBER = '';

export const WHATSAPP_MESSAGE = {
  ar: 'هناك تحديث قادم قريباً وسنعود للتواصل معكم قريباً.',
  en: 'There is an update coming soon and we will be back in touch with you soon.',
};

export function getWhatsAppComposeUrl(
  message: string = `${WHATSAPP_MESSAGE.en}\n\n${WHATSAPP_MESSAGE.ar}`
): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// Keep compatibility with existing imports
export function getGeneralContactWhatsAppUrl(_: Language): string {
  return getWhatsAppComposeUrl();
}

export function getPickupReturnWhatsAppUrl(_: Language): string {
  return getWhatsAppComposeUrl();
}