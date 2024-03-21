import {
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import SearchInput from "../../../app/dashboard/SearchField";
import IconButtonTooltip from "../Buttons/IconButtonTooltip";
import { red } from "@mui/material/colors";
import { Delete, Filter, FilterList, Search } from "@mui/icons-material";
import FilterTable from "../../../app/dashboard/StatusButton";
import FilterMenu from "../../../app/user-manager/user/users/components/Filter";

interface TableToolbarProps {
  numSelected: number;
  onSearch: (val: string) => void;
  searchVal: string;
}

export default function TableToolbar({
  numSelected,
  onSearch,
  searchVal,
}: TableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <TextField
          fullWidth
          type="search"
          variant="outlined"
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            sx: {
              border: "none", // Remove borders
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the outlined border on focus
              },
            },
          }}
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
      {numSelected > 0 ? (
        <IconButtonTooltip
          tooltip="Delete Selected"
          variant={red[500]}
          hover={red[700]}
          Icon={Delete}
        />
      ) : (
        <FilterMenu />
      )}
    </Toolbar>
  );
}
