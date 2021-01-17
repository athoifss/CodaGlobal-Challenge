import React, { useState, useContext } from "react";
import Context from "./Context";
import style from "./Searchbar.module.css";
import SearchIcon from "@material-ui/icons/Search";

export default function Searchbar() {
  const context = useContext(Context);
  const [formData, setFormData] = useState({});
  function handleChangeForm(e) {
    let updateFormData = { ...formData };
    updateFormData[e.target.name] = e.target.value;
    setFormData(updateFormData);
    context.handleSearch(updateFormData["search"]);
  }
  return (
    <div className={style.wrapper}>
      <h2 className={style.header}>Select Playing 9</h2>
      <div className={style.inputBox}>
        <SearchIcon className={style.icon} />
        <form onChange={handleChangeForm}>
          <input name="search" type="text" placeholder="Search Players" />
        </form>
      </div>
    </div>
  );
}
