import NotificationsIcon from "@mui/icons-material/Notifications";
import { Box, Button, Divider, Paper, Tooltip } from "@mui/material";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationIconDropDown = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? "notifications" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledBadge badgeContent={11} color="error" max={9}>
            <NotificationsIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="notifications"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              maxHeight: "40ch",
              maxWidth: "40ch",
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Paper
          sx={{
            overflowY: "scroll",
            maxHeight: "40ch",
            maxWidth: "40ch",
            borderRadius: 0,
            background: theme.palette.background.paper,
          }}
        >
          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew Your Subscription The Plan Will Consume And You Need To Renew Your Subscription" />
          </MenuItem>

          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew Your Subscription The Plan Will Consume And You Need To Renew Your Subscription" />
          </MenuItem>

          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew Your Subscription" />
          </MenuItem>

          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew" />
          </MenuItem>

          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew Your Subscription The Plan Will Consume And You Need To Renew Your Subscription" />
          </MenuItem>
          <MenuItem sx={{ p: 1 }} onClick={handleClose}>
            <NotificationItem text="The Plan Will Consume And You Need To Renew Your Subscription The Plan Will Consume And You Need To Renew Your Subscription" />
          </MenuItem>
        </Paper>

        <Divider />

        <Box
          sx={{
            borderRadius: "0px 0px 20px 20px",
            background: theme.palette.background.paper,
            overflow: "hidden",
            p: 1,
          }}
        >
          <Button fullWidth variant="text" size="small">
            View All
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationIconDropDown;

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 1,
    top: 2,
  },
}));
