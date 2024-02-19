import { ChevronLeft, Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import useSideDrawerStore from "../../store/sidebar.store";
import LangIcon from "./components/LangIcon";
import NotificationIconDropDown from "./components/NotificationIcon";
import ThemeIcon from "./components/ThemeIcon";
import UserIconDropDown from "./components/UserIconDropDown";

export default function Header() {
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  return (
    <AppBar
      component={"header"}
      sx={{
        boxShadow: "none",
        borderBottom: 1,
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          width={"100%"}
        >
          {/* RIGHT_SIDE */}
          <Box className="flex items-center gap-3">
            {/* MENU_ICON */}
            <IconButton color="inherit" onClick={toggleSideNav}>
              {isOpen ? <ChevronLeft /> : <Menu />}
            </IconButton>
            {/* LOGO */}
            <Link to={"/"}>
              <Box
                component={"img"}
                src="/vite.svg"
                alt="logo"
                width={40}
                height={40}
              />
            </Link>
          </Box>

          {/* LEFT_SIDE */}
          <Box className="flex items-center gap-2">
            {/* I18N_ICON */}
            <LangIcon />
            {/* THEME_ICON */}
            <ThemeIcon />
            {/* NOTIFICATIONS_ICON_DROPDOWN */}
            <NotificationIconDropDown />
            {/* USER_ICON_DROPDOWN */}
            <UserIconDropDown />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
