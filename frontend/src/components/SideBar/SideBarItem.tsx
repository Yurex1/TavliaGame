import { FC } from "react";
import React from 'react'

type SideBarItemProps = {
  text: string;
  hrefText: string;
  img_url: string;
};

const SideBareItem: FC<SideBarItemProps> = ({ text, hrefText, img_url }) => (
  <a href={hrefText} className="aside-item">
    <img className="icon" src = {img_url} />
    <div className="text">{text}</div>
  </a>
);

export default SideBareItem;
