import { Close } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import LanguageToggles from "./LangToggles";
import ThemeToggles from "./ThemeToggles";

const drawerWidth = 280;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SettingsDrawer = ({
  anchor,
  open,
  toggleDrawer,
}: {
  anchor: DrawerProps["anchor"];
  open: boolean;
  toggleDrawer: () => void;
}) => {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerHeader>
        <Typography variant={"h6"} color={"text.secondary"}>
          Settings
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Close />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          p: 1.5,
          background: "background.paper",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack gap={1}>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Theme
          </Typography>
          <ThemeToggles />
        </Stack>

        <Stack gap={1}>
          <Typography variant="subtitle2" color={"text.secondary"}>
            Language
          </Typography>
          <LanguageToggles />
        </Stack>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
