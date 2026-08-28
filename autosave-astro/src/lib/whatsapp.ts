import type { Language } from './i18n';

export const WHATSAPP_NUMBER = '966537133080';
export const WHATSAPP_DISPLAY_NUMBER = '+966 53 713 3080';

/** Formal Arabic greeting prepended to every WhatsApp message on Arabic pages. */
export const ARABIC_GREETING = 'السلام عليكم ورحمه الله وبركاته';

/**
 * Prepends the Arabic greeting to a message.
 * - If the message already starts with "السلام عليكم", the short form is
 *   upgraded to the full greeting (السلام عليكم ورحمه الله وبركاته).
 * - If the message is empty, only the greeting is returned.
 */
export function prependArabicGreeting(message?: string): string {
  if (!message) {
    return ARABIC_GREETING;
  }
  var shortGreeting = /^السلام عليكم/;
  if (shortGreeting.test(message)) {
    return message.replace(shortGreeting, ARABIC_GREETING);
  }
  return ARABIC_GREETING + '\n' + message;
}

const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function getWhatsAppComposeUrl(message?: string): string {
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

export function getDropOffMessage(lang: Language): string {
  return lang === 'ar'
    ? 'مرحباً فريق أوتو سيف، أرغب في حجز خدمة التسليم للورشة لسيارتي. الرجاء تزويدي بالخطوات المتاحة.'
    : 'Hello Auto Save team, I would like to book the Drop-Off service for my car. Please share the available steps and the earliest suitable appointment.';
}

export function getPickupReturnMessage(lang: Language): string {
  return lang === 'ar'
    ? 'مرحباً فريق أوتو سيف، أرغب في طلب خدمة الاستلام والإرجاع لسيارتي. الرجاء تزويدي بالخطوات المتاحة وأقرب موعد مناسب.'
    : 'Hello Auto Save team, I would like to request Pickup & Return service for my car. Please share the available steps and the earliest suitable appointment.';
}

export function getGeneralContactWhatsAppUrl(lang: Language): string {
  return getWhatsAppComposeUrl(getContactInquiryMessage(lang));
}

export function getDropOffWhatsAppUrl(lang: Language): string {
  return getWhatsAppComposeUrl(getDropOffMessage(lang));
}

export function getPickupReturnWhatsAppUrl(lang: Language): string {
  return getWhatsAppComposeUrl(getPickupReturnMessage(lang));
}