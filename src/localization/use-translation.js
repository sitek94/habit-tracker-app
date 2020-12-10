import { useLocale } from './use-locale';

export function useTranslation(source = {}) {
  const { code } = useLocale();

  return (key) => {
    if (!source[key]) {
      throw new Error(`There is no translation for ${key} provided`);
    }

    // Return translation if exists otherwise default to English
    return source[key][code] ?? source[key].en;
  }
}