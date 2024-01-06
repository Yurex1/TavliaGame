import { useLanguage } from "@/hooks/useLanguage";
import { UkraineData } from "./UkraineData";
import { EnglishData } from "./EnglishData"

export default function instructionData() {
  const { language } = useLanguage();
  if (language == "En") return EnglishData;
  return UkraineData;
}
