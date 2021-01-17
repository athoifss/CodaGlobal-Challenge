import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import style from "./Sidebar.module.css";

import trophy from "./images/trophy.png";
import bet from "./images/bet.png";
import coin from "./images/coin.png";

export default function Sidebar() {
  const context = useContext(Context);
  const [usersSelected, setUsersSelected] = useState([]);

  function handleSidebarCollapse() {
    let newSidebar = { ...context.sidebar };
    if (newSidebar.isOpen) {
      newSidebar.isOpen = false;
      newSidebar.style = style.sidebarClose;
      context.handleSidebar(newSidebar);
    }
  }

  function handleGameStart() {
    context.handleIsGameStart(true);
  }

  useEffect(() => {
    let newSidebar = { ...context.sidebar };
    newSidebar.isOpen = true;
    newSidebar.style = style.sidebarOpen;
    context.handleSidebar(newSidebar);
  }, []);

  useEffect(() => {
    let arrUsersSelected = context.usersSearchedSorted.filter((user) => user.isSelected);
    setUsersSelected(arrUsersSelected);
  }, [context.usersSearchedSorted]);

  return (
    <div className={`${style.wrapper} ${context.sidebar.style}`}>
      <div
        className={`${style.ham} ${context.sidebar.isOpen ? style.displayFlex : style.displayNone}`}
        onClick={handleSidebarCollapse}
      >
        <div className={style.line}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>

      <h2 className={style.header}>Playing 9</h2>
      {usersSelected.map((item) => {
        return (
          <div key={item.id} className={style.userWrapper}>
            <div className={style.imageContainer}>
              <img src={item["Profile Image"]} alt="" />
            </div>
            <div className={style.midContainer}>
              <div className={style.top}>{item["Name"]}</div>
              <div className={style.bottom}>
                <div>
                  <img src={trophy} alt="" />
                  <span>{item.Wins}</span>
                </div>
                <div>
                  <img className={style.bet} src={bet} alt="" />
                  <span>{item.Bet}</span>
                </div>
              </div>
            </div>
            <div className={style.priceContainer}>
              <img src={coin} alt="" />
              {item["Price"]}
            </div>
          </div>
        );
      })}

      {context.isGameStart ? null : (
        <Link className={style.buttonContainer} to="/play">
          <button onClick={handleGameStart}>Start Game</button>
        </Link>
      )}
    </div>
  );
}
