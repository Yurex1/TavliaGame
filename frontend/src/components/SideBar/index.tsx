import { FC, useEffect } from "react";
import SideBarItem from "./SideBarItem";
import SideBarLogItem from "./SideBarLogItem";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import sideBarData from "@/Data/SideBar";

type SideBareProps = {
  setShowAuth: (showAuth: boolean) => void;
};

const SideBare: FC<SideBareProps> = ({ setShowAuth }) => {
  const { language, setLanguage } = useLanguage();
  const DTO = sideBarData();
  useEffect(() => {
    const tempLanguage = localStorage.getItem("language");
    if (tempLanguage) {
      setLanguage(tempLanguage);
    }
  }, []);

  const change = () => {
    if (language == "En") {
      localStorage.setItem("language", "Ua");
    } else {
      localStorage.setItem("language", "En");
    }
    const tempLanguage = localStorage.getItem("language");
    if (tempLanguage) {
      setLanguage(tempLanguage);
    }
  };

  return (
    <aside>
      <div className="top-items">
        <a href="../" className="name">
          <div>
            <b className="formobile">T</b>
            <b className="notformobile">{DTO.Title}</b>
          </div>
        </a>
        {DTO.Config.map((item, index) => (
          <SideBarItem
            key={index}
            text={item.text}
            hrefText={item.hrefText}
            img_url={item.img_url}
          />
        ))}
        <SideBarLogItem
          Login={DTO.Login}
          Logout={DTO.Logout}
          setShowAuth={setShowAuth}
        />
      </div>
      <div className="language center" onClick={change}>
        <div className="language-text">{DTO.Language}</div>
        <b>{language}</b>
      </div>
    </aside>
  );
};

export default SideBare;
