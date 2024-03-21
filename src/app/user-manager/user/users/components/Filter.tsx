import { FilterList } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import useGetAllUsersParamsStore from "../store/useGetAllUsersParams.store";

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleStatus } = useGetAllUsersParamsStore();

  const [checkedItems, setCheckedItems] = React.useState<string[]>(["ALL"]);

  React.useEffect(() => {
    if (checkedItems.filter((item) => item !== "ALL").length) {
      handleStatus(checkedItems.join(","));
    } else {
      handleStatus("");
    }
  }, [checkedItems]);

  const handleMenuItemClick = (value: string) => {
    if (value === "ALL") {
      setCheckedItems(["ALL"]);
    } else {
      if (checkedItems.includes("ALL")) {
        setCheckedItems([
          ...checkedItems.filter((val) => val !== "ALL"),
          value,
        ]);
      } else {
        const itemExist = checkedItems.includes(value);
        itemExist
          ? setCheckedItems([...checkedItems.filter((val) => val !== value)])
          : setCheckedItems([...checkedItems, value]);
      }
    }
  };
  if (!checkedItems.length) {
    setCheckedItems(["ALL"]);
  }

  const menuItems = [
    { label: "All", value: "ALL" },
    { label: "Active", value: "ACTIVE" },
    { label: "In Active", value: "INACTIVE" },
  ];

  return (
    <Box>
      <Tooltip title="Filter">
        <IconButton onClick={handleClick}>
          <FilterList />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          padding: "10px",
          "& .MuiTypography-root": {
            fontSize: "1rem",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
          },
        }}
      >
        {menuItems.map(({ label, value }) => (
          <MenuItem
            key={value}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: 1,
              py: 0,
            }}
          >
            <FormControlLabel
              disabled={value === "ALL" && checkedItems.includes("ALL")}
              control={
                <Checkbox
                  onClick={() => handleMenuItemClick(value)}
                  checked={checkedItems.includes(value)}
                />
              }
              label={label}
              sx={{ width: "100%", m: 0 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
