import {
  Note,
  People,
  PeopleOutlined,
  Sailing,
  Send,
} from "@mui/icons-material";
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

const SideDrawer = () => {
  // Configs
  const theme = useTheme();
  // SideDrawer State Handlers
  const { isOpen, toggleSideNav } = useSideDrawerStore();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const menuItems = [
    { name: "Home", url: "/", Icon: Sailing },
    { name: "Login", url: "/login", Icon: Sailing },
    { name: "Dashboard", url: "/dashboard", Icon: Send },
    { name: "Short Code", url: "/short-code", Icon: Note },
    { name: "Connection Provider", url: "/connection", Icon: People },
    {
      name: "Billing Manager",
      Icon: PeopleOutlined,
      subItemsMenu: [
        {
          name: "Plans",
          url: "/billing-manager/plans",
          Icon: Sailing,
          subPadding: true,
        },
        {
          name: "Subscriptions",
          url: "/billing-manager/subscriptions",
          Icon: Sailing,
          subPadding: true,
        },
        {
          name: "Analytics",
          Icon: PeopleOutlined,
          subPadding: true,
          subItemsMenu: [
            {
              name: "Orders",
              url: "/billing-manager/analytics/orders",
              // Icon: Sailing,
              subPadding: true,
            },
            {
              name: "Products",
              url: "/billing-manager/analytics/products",
              Icon: Sailing,
              subPadding: true,
            },
          ],
        },
      ],
    },
    {
      name: "Users Manager",
      Icon: PeopleOutlined,
      subItemsMenu: [
        {
          name: "Roles",
          url: "/user-manager/roles",
          Icon: Sailing,
          subPadding: true,
        },
        {
          name: "Group",
          url: "/user-manager/groups",
          // Icon: Sailing,
          subPadding: true,
        },
        {
          name: "Users",
          Icon: PeopleOutlined,
          subPadding: true,
          subItemsMenu: [
            {
              name: "Managers",
              url: "/user-manager/users/managers",
              Icon: Sailing,
              subPadding: true,
            },
            {
              name: "Permissions",
              url: "/user-manager/users/permissions",
              Icon: Sailing,
              subPadding: true,
            },
          ],
        },
      ],
    },
  ];

  return (
    <StyledDrawer
      variant={isLargeScreen ? "permanent" : "temporary"}
      open={!isLargeScreen && isOpen ? true : false}
      onClose={toggleSideNav}
      isOpened={isOpen}
    >
      <List
        sx={{ width: "100%", bgcolor: "background.paper", py: 0 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        dense={true}
      >
        {menuItems.map((item, index) => (
          <SideListItem key={index} {...item} />
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideDrawer;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isOpened",
})<{ isOpened: boolean }>(({ isOpened, theme }) => ({
  width: isOpened ? 240 : 75,
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
