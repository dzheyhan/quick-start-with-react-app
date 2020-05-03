import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import i18n from "../i18n";

export default function LanguageChange() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const current_lang = i18n.language;
  const open = Boolean(anchorEl);

  const languages = {
    en: "English",
    de: "German",
  };

  const changeLanguage = (event, lng) => {
    const language = lng === "backdropClick" ? current_lang : lng;

    // using Promises
    i18n.changeLanguage(language).then((t) => {
      t("key"); // -> same as i18next.t
    });
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        aria-controls="fade-menu"
        style={{ color: "#fff" }}
        endIcon={<ExpandMoreIcon />}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {languages[current_lang]}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={changeLanguage}
      >
        <MenuItem onClick={(event) => changeLanguage(event, "en")}>
          English
        </MenuItem>
        <MenuItem onClick={(event) => changeLanguage(event, "de")}>
          German
        </MenuItem>
      </Menu>
    </div>
  );
}
