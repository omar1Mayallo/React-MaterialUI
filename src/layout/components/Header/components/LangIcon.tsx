import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

const LangIcon = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Tooltip
      title={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <IconButton
        aria-label="Change Language"
        onClick={changeLanguage}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LangIcon;
