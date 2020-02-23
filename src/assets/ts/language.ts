import { ref, computed } from '@vue/composition-api'

import en from '../../assets/json/locales/en/index.json'
import ru from '../../assets/json/locales/ru/index.json'

function getLocale() {
  const
      rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'],
      lang: string = navigator.language;

  const locale = computed(() => {
    return rus.indexOf(lang[0] + lang[1]) >= 0 ? 'ru' : 'en';
  });

  return {
    locale
  }
}

function getLanguage() {
  const locales = ref({ en, ru });

  const { locale } = getLocale();

  const lang = computed(() => locales.value[locale.value]);

  return {
    lang
  }
}

export { getLocale, getLanguage }