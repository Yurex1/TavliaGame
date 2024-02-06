import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import dropDownData from "@/Data/DropDown";

export default function Dropdown({n} : {n : number}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event:  MouseEvent) => {
    // @ts-expect-error becouse of typescript
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const DTO = dropDownData();
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="game-button" onClick={handleOpen}>
        <b>{DTO.Play} {n}x{n}</b>
      </button>
      {open && (
        <div className="menu">
          <div className="menu-items">
            <Link className="menu-link" href={`/game?n=${n}`}>
              <b>{DTO.PlayOnline}</b>
            </Link>
          </div>
          {/* <div className="menu-items">
            <Link className="menu-link" href={`/game?n=${n}`}>
              <b>Play vs computer</b>
            </Link>
          </div> */}
          <div className="menu-items">
            <Link className="menu-link" href={`/gameOneDesk?n=${n}`}>
              <b>{DTO.PlayOnOneDesk}</b>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
