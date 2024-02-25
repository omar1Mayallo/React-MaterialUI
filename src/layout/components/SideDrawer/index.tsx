import {
  List,
  Drawer as MuiDrawer,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThemeTypeE } from "../../../store/theme.store";
import useSideDrawerStore from "../../store/sidebar.store";
import SideListItem from "./components/SideListItem";
import usePermissionsList from "./hooks/usePermissionsList";

const SideDrawer = () => {
  // SIDE_DRAWER_CONFIGS
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // SIDE_DRAWER_STATE
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  // SIDE_DRAWER_LIST
  const { menuList } = usePermissionsList();

  return (
    <StyledDrawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={!isLargeScreen && isOpen ? true : false}
      onClose={toggleSideNav}
      isOpened={isOpen}
    >
      <List
        sx={{
          width: "100%",
          height: "100%",
          py: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        dense={true}
      >
        {menuList?.map((item: any, idx: number) => (
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
  width: isOpened ? 250 : 75,
  height: "100%",
  overflow: "auto",
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
    color: theme.palette.text.secondary,
    background:
      theme.palette.mode === ThemeTypeE.DARK
        ? theme.palette.background.default
        : theme.palette.background.paper,
    position: "static",
    overflowX: "hidden",
    borderRight: `1px solid ${theme.palette.text.secondary}`,
  },
}));
