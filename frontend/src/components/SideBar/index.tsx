import { FC, useEffect} from "react";
import SideBarItem from "./SideBarItem";
import SideBarLogItem from "./SideBarLogItem";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

type SideBareProps = {
  setShowAuth: (showAuth: boolean) => void;
};

type SideBarConfig = {
  text: string;
  hrefText: string;
  img_url: string;
};

const sideBarConfig: SideBarConfig[] = [
  {
    text: "Play",
    hrefText: "../",
    img_url: "Lightning.png",
  },
  {
    text: "Rank",
    hrefText: "../rank",
    img_url: "rank.png",
  },
  {
    text: "Instruction",
    hrefText: "../instruction",
    img_url: "info.png",
  },
];

const SideBare: FC<SideBareProps> = ({ setShowAuth }) => {
  const {language, setLanguage} = useLanguage();
  useEffect(() => {
    const tempLanguage = localStorage.getItem("language");
    if(tempLanguage){
      setLanguage(tempLanguage);
    }
  },[]);

  const change = () => {
    if(language == "En")
    {
      localStorage.setItem("language", "Ua");
    }
    else{
      localStorage.setItem("language", "En");
    }
    const tempLanguage = localStorage.getItem("language");
    if(tempLanguage){
      setLanguage(tempLanguage);
    }
  }

  return (
    <aside>
      <div className="top-items">
        <a href="../" className="name">
          <div>
            <b>T</b>
            <b className="notformobile">avlia</b>
          </div>
        </a>
        {sideBarConfig.map((item, index) => (
          <SideBarItem
            key={index}
            text={item.text}
            hrefText={item.hrefText}
            img_url={item.img_url}
          />
        ))}
        <SideBarLogItem setShowAuth={setShowAuth} />
      </div>
      <div className = "language center" onClick={change}>
        <div className="language-text">language:</div>{language}
      </div>
    </aside>
  );
};

export default SideBare;
