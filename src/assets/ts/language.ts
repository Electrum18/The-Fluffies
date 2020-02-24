import { ref, computed } from '@vue/composition-api';

type Object = { [index: string]: any }

function getLocale() {
  const rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'];
  const lang: string = navigator.language;

  const locale = computed(() => {
    return rus.indexOf(lang[0] + lang[1]) >= 0 ? 'ru' : 'en';
  });

  return {
    locale
  }
}

function getLanguage(en: Object, ru: Object) {
  const locales = ref({ en, ru });

  const { locale } = getLocale();

  const lang = computed(() => locales.value[locale.value]);

  return {
    lang
  }
}

export { getLocale, getLanguage }