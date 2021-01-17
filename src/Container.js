import React, { useEffect, useState, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserSelection from "./UserSelection";
import Game from "./Game";

import style from "./Container.module.css";

export default function Container() {
  return (
    <div className={style.wrapper}>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={UserSelection} />
        <Route exact path="/play" component={Game} />
      </Switch>
    </div>
  );
}
