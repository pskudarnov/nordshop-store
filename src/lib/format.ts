import type {AppLocale} from './i18n';
import {formatCurrency} from './currency';

export function formatPrice(value: number, locale: AppLocale) {
  return formatCurrency(value, locale);
}
