
import { EnglishDTO } from "./EnglishDTO";
import { UkraineDTO } from "./UkraineDTO";

export default function SideBarData(language : string){
    if(language == "En")
    return EnglishDTO;
return UkraineDTO;
} 