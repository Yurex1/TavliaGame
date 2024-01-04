import EnglishDto from "./EnglishDTO";
import UkraineDTO from "./UkraineDTO";

export default function InformationData(language : string){
    if(language == "En")
    return EnglishDto();
return UkraineDTO();
} 