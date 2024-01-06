import { languageContext } from '@/pages/_app';
import { useContext } from 'react';

export const useLanguage = () => useContext(languageContext);