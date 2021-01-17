import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "./Container";
import Context from "./Context";

function App() {
  const [users, setUsers] = useState([]);
  const [usersSearchedSorted, setUsersSearchedSorted] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);
  const [countUsersSelected, setCountUsersSelected] = useState(0);
  const [sidebar, setSidebar] = useState({
    isOpen: true,
    style: null,
    data: [],
  });

  const [isGameStart, setIsGameStart] = useState(false);

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleUsers(arrUsers) {
    let newUsers = arrUsers.map((user, i) => {
      let userToAdd = { ...user };
      userToAdd.id = i;
      userToAdd.isSelected = false;
      userToAdd.Level = getRandomNumber(1, 5);
      userToAdd.Wins = 0;
      userToAdd.Losses = 0;
      return userToAdd;
    });

    setUsers(newUsers);
    setUsersSearchedSorted(newUsers);
  }

  function sorted(sortBy, sortType) {
    let usersToSort = [...users];

    if (sortBy === "Name") {
      usersToSort.sort((a, b) => {
        let nameA = a[sortBy].toUpperCase();
        let nameB = b[sortBy].toUpperCase();

        if (sortType === "asc") {
          if (nameA > nameB) {
            return 1;
          }
          if (nameA < nameB) {
            return -1;
          }
          return 0;
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        }
      });
    } else {
      usersToSort.sort((a, b) => {
        let num1 = parseInt(a[sortBy]);
        let num2 = parseInt(b[sortBy]);

        if (sortType === "asc") {
          if (num1 > num2) {
            return 1;
          }

          if (num1 < num2) {
            return -1;
          }
          return 0;
        } else {
          if (num1 > num2) {
            return -1;
          }

          if (num1 < num2) {
            return 1;
          }
          return 0;
        }
      });
    }

    setUsersSearchedSorted(usersToSort);
  }

  function handleIsGameStart(boolValue) {
    setUsers(usersSearchedSorted);
    setIsGameStart(boolValue);
  }

  function handleUsersWin(userId) {
    let newUsers = [...users];
    users.forEach((item) => {
      if (item.id === userId) {
        item.Wins = newUsers[userId].Wins + 1;
        item.Price = newUsers[userId].Price * 2;
      } else {
        item.Losses = newUsers[userId].Losses + 1;
      }
    });
    setUsersSelected(newUsers);
  }

  function handleUserSelection(id) {
    let newUsers = [...usersSearchedSorted];
    newUsers.forEach((user) => {
      if (user.id === id) {
        if (user.isSelected === false) {
          if (countUsersSelected < 9) {
            user.isSelected = true;
            setCountUsersSelected((prev) => prev + 1);
          }
        } else {
          setCountUsersSelected((prev) => prev - 1);
          user.isSelected = false;
        }
      }
    });
    setUsersSearchedSorted(newUsers);
  }

  function handleSidebar(newSidebar) {
    setSidebar(newSidebar);
  }

  function handleSearch(searchString) {
    let searchResult = [];
    users.forEach((user) => {
      if (user.Name.toLowerCase().includes(searchString.toLowerCase())) {
        searchResult.push(user);
      }
    });
    setUsersSearchedSorted(searchResult);
  }

  return (
    <Context.Provider
      value={{
        users,
        usersSearchedSorted,
        sidebar,
        isGameStart,

        sorted,
        handleIsGameStart,
        handleUsers,
        handleUserSelection,
        handleUsersWin,
        handleSearch,
        handleSidebar,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={Container} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
