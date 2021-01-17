import React, { useContext, useEffect, useState } from "react";
import Context from "./Context";
import style from "./Game.module.css";
import styleSidebar from "./Sidebar.module.css";

import trophy from "./images/trophy.png";
import bet from "./images/bet.png";
import coin from "./images/coin.png";

export default function Game() {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const context = useContext(Context);
  const [users, setUsers] = useState({ usersTop: [], usersBottom: [] });
  const [allUsersSelected, setAllUsersSelected] = useState([]);
  const [randomBet, setRandomBet] = useState(null);

  function handleSidebarOpen() {
    let newSidebar = { ...context.sidebar };
    if (!newSidebar.isOpen) {
      newSidebar.isOpen = true;
      newSidebar.style = styleSidebar.sidebarOpen;
      context.handleSidebar(newSidebar);
    }
  }

  function playGame(arrUsers) {
    let randomNumber = getRandomNumber(1, 9);
    setRandomBet(randomNumber);
    arrUsers.forEach((user) => {
      if (parseInt(user["Bet"]) === randomNumber) {
        context.handleUsersWin(user.id);
      }
    });
  }

  useEffect(() => {
    let selectedUsers = context.usersSearchedSorted.filter((user) => user.isSelected);
    let newUsersTop = selectedUsers.slice(0, 5);
    let newUsersBottom = selectedUsers.slice(5, 11);
    let arrAllUsersSelected = context.users.filter((user) => user.isSelected);
    setUsers({ usersTop: newUsersTop, usersBottom: newUsersBottom });
    setAllUsersSelected(arrAllUsersSelected);
    playGame(arrAllUsersSelected);
  }, []);

  return (
    <div className={style.wrapper}>
      <button className={style.buttonPlay} onClick={playGame.bind(this, allUsersSelected)}>
        Bet Again
      </button>
      <div
        className={`${style.ham} ${context.sidebar.isOpen ? style.displayNone : style.displayFlex}`}
        onClick={handleSidebarOpen}
      >
        <div className={style.line}></div>
        <div className={style.line}></div>
        <div className={style.line}></div>
      </div>
      <div className={style.cardsContainer}>
        {users.usersTop.map((user) => {
          return (
            <div className={style.cardWrapper}>
              <div className={style.top}>
                <div className={style.imageContainer}>
                  <img src={user["Profile Image"]} alt="" />
                </div>
                <div className={style.details}>
                  <div>{user["Name"]}</div>
                  <div>Level {user["Level"]}</div>
                </div>
              </div>
              <div className={style.bottom}>
                <div className={style.item}>
                  <span>
                    <img src={coin} alt="" />
                  </span>
                  <span>{user["Price"]}</span>
                </div>
                <div className={style.item}>
                  <span>
                    <img src={bet} alt="" />
                  </span>
                  <span>{user["Bet"]}</span>
                </div>
                <div className={style.item}>
                  <span>
                    <img src={trophy} alt="" />
                  </span>
                  <span>{user["Wins"]}</span>
                </div>
              </div>
              <button
                className={`${
                  randomBet == null
                    ? null
                    : randomBet == user["Bet"]
                    ? style.fateWin
                    : style.fateLoose
                } ${style.fateButton}`}
              >
                {randomBet == null ? "Pending" : randomBet == user["Bet"] ? "Win" : "Loose"}
              </button>
            </div>
          );
        })}
      </div>
      <div className={style.midContainer}>
        <div className={style.number}>{randomBet}</div>
      </div>
      {/* TO-DO . Make user card a seperate component */}
      <div className={style.cardsContainer}>
        {users.usersBottom.map((user) => {
          return (
            <div className={style.cardWrapper}>
              <div className={style.top}>
                <div className={style.imageContainer}>
                  <img src={user["Profile Image"]} alt="" />
                </div>
                <div className={style.details}>
                  <div>{user["Name"]}</div>
                  <div>Level {user["Level"]}</div>
                </div>
              </div>
              <div className={style.bottom}>
                <div className={style.item}>
                  <span>
                    <img src={coin} alt="" />
                  </span>
                  <span>{user["Price"]}</span>
                </div>
                <div className={style.item}>
                  <span>
                    <img src={bet} alt="" />
                  </span>
                  <span>{user["Bet"]}</span>
                </div>
                <div className={style.item}>
                  <span>
                    <img src={trophy} alt="" />
                  </span>
                  <span>{user["Wins"]}</span>
                </div>
              </div>
              <button
                className={`${
                  randomBet == null
                    ? null
                    : randomBet == user["Bet"]
                    ? style.fateWin
                    : style.fateLoose
                } ${style.fateButton}`}
              >
                {randomBet == null ? "Pending" : randomBet == user["Bet"] ? "Win" : "Loose"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
