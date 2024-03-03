import {
  List,
  Drawer as MuiDrawer,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ThemeTypeE } from "../../../store/theme.store";
import useSideDrawerStore from "../../store/side-drawer.store";
import SideListItem from "./components/SideListItem";
import useSideMenuList from "./hooks/useSideDrawerList";
import {
  useLangStyle,
  useScreenSizeStyle,
} from "../../../shared/hooks/useStyle";
import i18next from "i18next";
import { LanguagesE } from "../../../store/language.store";

const SideDrawer = () => {
  // SIDE_DRAWER_CONFIGS
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // SIDE_DRAWER_STATE
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  // SIDE_DRAWER_LIST
  const { sideMenuList } = useSideMenuList();

  return (
    <StyledDrawer
      variant={useScreenSizeStyle("permanent", "temporary")}
      anchor={useLangStyle("right", "left")}
      open={!isLargeScreen && isOpen ? true : false}
      onClose={toggleSideNav}
      isOpened={isOpen}
    >
      <List
        sx={{
          width: "100%",
          height: "100%",
          py: 0,
          direction: useLangStyle("rtl", "ltr"),
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        dense={false}
      >
        {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {sideMenuList?.map((item: any, idx: number) => (
          <SideListItem key={idx} {...item} />
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideDrawer;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isOpened",
})<{ isOpened: boolean }>(({ isOpened, theme }) => ({
  width: isOpened ? 260 : 75,
  height: "100%",
  overflow: "auto",
  direction: i18next.language === LanguagesE.AR ? "rtl" : "ltr",
  transition: isOpened
    ? theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })
    : theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  "& .MuiDrawer-paper": {
    position: useScreenSizeStyle("static", undefined),
    overflowX: "hidden",
    border: "none",
    backgroundColor:
      theme.palette.mode === ThemeTypeE.DARK
        ? grey["900"]
        : theme.palette.common.white,
  },
}));
