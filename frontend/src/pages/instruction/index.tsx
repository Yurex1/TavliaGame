import React from "react";
import instruction from "@/Data/Instruction";

export default function Instruction() {
  const DTO = instruction();
  return (
    <>
      <div className="instruction">
        <div className="instruction-wrapper">
          <div>
            <h1 className="instruction-title">{DTO.Title}</h1>
            <div className="instruction-section">
              <h3 className="instruction-subtitle">{DTO.FirstSubTitle}</h3>
              <ol>
                <li>{DTO.FirstSubTitleFirstLable}</li>
                <li>{DTO.FirstSubTitleSecondLable}</li>
                <li>{DTO.FirstSubTitleThirdLable}</li>
              </ol>
            </div>
            <div className="instruction-section">
              <h3 className="instruction-subtitle">{DTO.SecondSubTitle}</h3>
              <ol>
                <li>
                  {DTO.SecondSubTitleFirstLable}
                  <div className="center">
                    <img
                      className="instruction-image"
                      src="instruction/game-board.jpg"
                    />
                  </div>
                </li>
                <li>{DTO.SecondSubTitleSecondLable}</li>
                <li>{DTO.SecondSubTitleThirdLable}</li>
                <li>{DTO.SecondSubTitleFourthLable}</li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: DTO.SecondSubTitleFifthLable,
                  }}
                ></li>
                <div className="center">
                  <img
                    className="instruction-image"
                    src="instruction/move.jpg"
                  />
                </div>
                <li
                  dangerouslySetInnerHTML={{
                    __html: DTO.SecondSubTitleSixthLable,
                  }}
                ></li>
                <div className="center">
                  <img
                    className="instruction-image"
                    src="instruction/kill-before.jpg"
                  />
                  <img
                    className="instruction-image"
                    src="instruction/kill-after.jpg"
                  />
                </div>
                <li>
                  {DTO.SecondSubTitleSeventhLable}
                  <div className="center">
                    <img
                      className="instruction-image"
                      src="instruction/king-win.jpg"
                    />
                  </div>
                </li>
                <li>{DTO.SecondSubTitleEighthLable}</li>
                <li>
                  {DTO.SecondSubTitleNinthLable}
                  <div className="center">
                    <img
                      className="instruction-image"
                      src="instruction/black-win.jpg"
                    />
                  </div>
                </li>
                <li>{DTO.SecondSubTitleTenthLable}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
