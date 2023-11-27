import { FC } from "react";
import React from 'react'

type SideBarItemProps = {
  text: string;
  hrefText: string;
};

const SideBareItem: FC<SideBarItemProps> = ({ text, hrefText }) => (
  <a href={hrefText} className="aside-item">
    <div className="icon"></div>
    <div className="text">{text}</div>
  </a>
);

export default SideBareItem;
