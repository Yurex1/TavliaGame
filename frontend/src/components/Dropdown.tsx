import Link from "next/link";
import React from "react";

export default function Dropdown({ n }: any) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <div className="dropdown" >
            <button className='game-button' onClick={handleOpen}>
                <b>Play {n}x{n}</b>
            </button>
            {open &&
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
            }
        </div>
    );
}