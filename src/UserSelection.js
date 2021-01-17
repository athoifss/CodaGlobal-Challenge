import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "./api";
import Context from "./Context";

import style from "./UserSelection.module.css";
import styleSidebar from "./Sidebar.module.css";

import Checkbox from "@material-ui/core/Checkbox";
import Searchbar from "./Searchbar";
import { withStyles } from "@material-ui/core/styles";

const CustomCheckbox = withStyles({
  root: {
    color: "#0015ff",
    "&$checked": {
      color: "#0015ff",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Container() {
  const context = useContext(Context);

  const [sortType, setSortType] = useState({
    Name: "asc",
    Level: "asc",
    Bet: "asc",
    Wins: "asc",
    Price: '"asc',
  });

  const [lastSorted, setLastSorted] = useState({ name: "", type: "" });

  function handleSort(sortBy) {
    let newSortType = { ...sortType };
    context.sorted(sortBy, newSortType[sortBy]);
    newSortType[sortBy] = newSortType[sortBy] === "asc" ? "dsc" : "asc";
    setSortType(newSortType);

    // let sortType = newSortType[sortBy]
    setLastSorted({ name: sortBy, type: newSortType[sortBy] });
  }

  function handleSidebarOpen() {
    let newSidebar = { ...context.sidebar };
    if (!newSidebar.isOpen) {
      newSidebar.isOpen = true;
      newSidebar.style = styleSidebar.sidebarOpen;
      context.handleSidebar(newSidebar);
    }
  }

  function handleUserSelection(userId) {
    context.handleUserSelection(userId);
  }

  function getUserData() {
    getRequest("/bets7747a43.json").then((resp) => {
      context.handleUsers(resp.data);
    });
  }

  function handleGameStart() {
    context.handleIsGameStart(true);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.buttonContainer}>
        <Link className={style.buttonContainer} to="/play">
          <button onClick={handleGameStart}>Start Game</button>
        </Link>
      </div>
      <Searchbar />
      <div className={style.tableContainer}>
        <div
          className={`${style.ham} ${
            context.sidebar.isOpen ? style.displayNone : style.displayFlex
          }`}
          onClick={handleSidebarOpen}
        >
          <div className={style.line}></div>
          <div className={style.line}></div>
          <div className={style.line}></div>
        </div>
        <table className={style.tableWrapper}>
          <thead>
            <tr className={style.rowHeader}>
              <th className={style.checkbox}>Select</th>
              <th onClick={handleSort.bind(this, "Name")} className={style.playerName}>
                Player Name
                {lastSorted.name === "Name" ? (
                  lastSorted.type === "asc" ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </th>
              <th onClick={handleSort.bind(this, "Level")}>
                Level{" "}
                {lastSorted.name === "Level" ? (
                  lastSorted.type === "asc" ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </th>
              <th>Avatar</th>
              <th onClick={handleSort.bind(this, "Bet")}>
                Bet
                {lastSorted.name === "Bet" ? (
                  lastSorted.type === "asc" ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </th>
              <th onClick={handleSort.bind(this, "Wins")}>
                Wins{" "}
                {lastSorted.name === "Wins" ? (
                  lastSorted.type === "asc" ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </th>
              <th>Loss</th>
              <th onClick={handleSort.bind(this, "Price")}>
                {" "}
                Price{" "}
                {lastSorted.name === "Price" ? (
                  lastSorted.type === "asc" ? (
                    <span>&uarr;</span>
                  ) : (
                    <span>&darr;</span>
                  )
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {context.usersSearchedSorted.map((user) => {
              return (
                <tr key={user.id}>
                  <td className={style.checkbox}>
                    <CustomCheckbox
                      color="primary"
                      checked={user.isSelected}
                      onChange={handleUserSelection.bind(this, user.id)}
                    />
                  </td>
                  <td className={style.playerName}>{user.Name}</td>
                  <td>{user.Level}</td>
                  <td>
                    <img src={user["Profile Image"]} alt="" />
                  </td>
                  <td>{user.Bet}</td>
                  <td>{user.Wins}</td>
                  <td>{user.Losses}</td>
                  <td>{user.Price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
