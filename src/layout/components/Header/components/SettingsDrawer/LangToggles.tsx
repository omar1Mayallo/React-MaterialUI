import { Box, Button } from "@mui/material";
import { LanguagesE, useLangStore } from "../../../../../store/language.store";

const LanguageToggles = () => {
  const { lang, setLang } = useLangStore();
  const handleToggleLang = (nextLang: LanguagesE) => {
    setLang(nextLang);
  };

  return (
    <Box className="flex">
      <Button
        sx={{ borderRadius: "22px 0px 0px 22px" }}
        fullWidth
        onClick={() => handleToggleLang(LanguagesE.EN)}
        variant={lang === LanguagesE.EN ? "contained" : "outlined"}
      >
        English
      </Button>
      <Button
        sx={{ borderRadius: "0px 22px 22px 0px" }}
        fullWidth
        onClick={() => handleToggleLang(LanguagesE.AR)}
        variant={lang === LanguagesE.AR ? "contained" : "outlined"}
      >
        العربية
      </Button>
    </Box>
  );
};
export default LanguageToggles;
