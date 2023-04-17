import EN from '@/locales/en.json';
import VI from '@/locales/vi.json';

export type LangsType = 'vi' | 'en';

type TParams = {
  lang?: LangsType;
  key: string;
  values?: any[];
};

const T = ({ lang = 'vi', key, values }: TParams): string => {
  const langs: { [key: string]: { [key: string]: string } } = {
    vi: VI,
    en: EN
  };
  let stringLocal = langs[lang][key];
  if (values?.length != null && values?.length > 0) {
    values.forEach((value) => {
      stringLocal = stringLocal.replace('${value}', value);
    });
  }
  return stringLocal;
};

export default T;
