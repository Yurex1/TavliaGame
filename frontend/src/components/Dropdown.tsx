import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

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

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="game-button" onClick={handleOpen}>
        <b>Play {n}x{n}</b>
      </button>
      {open && (
        <div className="menu">
          <div className="menu-items">
            <Link className="menu-link" href={`/game?n=${n}`}>
              <b>Play Online</b>
            </Link>
          </div>
          {/* <div className="menu-items">
            <Link className="menu-link" href={`/game?n=${n}`}>
              <b>Play vs computer</b>
            </Link>
          </div> */}
          <div className="menu-items">
            <Link className="menu-link" href={`/game2x2?n=${n}`}>
              <b>Play two in one desk</b>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
