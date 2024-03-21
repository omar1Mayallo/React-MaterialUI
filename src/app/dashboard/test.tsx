import {
  Add,
  Delete,
  FileDownload,
  FilterList,
  ArrowDropDown,
  ArrowDropUp,
} from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { blue, green, red } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import CustomPagination from "./pagination";
import SortIcons from "../../shared/components/Icons/SortIcons";
import SearchInput from "./SearchField";
import StatusButton from "./StatusButton";
import FilterTable from "./StatusButton";
import { useScreenSizeStyle } from "../../shared/hooks/useStyle";
import { getData } from "../../api/methods";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// function createData(
//   id: number,
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData(1, "Cupcake", 305, 3.7, 67, 4.3),
//   createData(2, "Donut", 452, 25.0, 51, 4.9),
//   createData(3, "Eclair", 262, 16.0, 24, 6.0),
//   createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
//   createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
//   createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
//   createData(9, "KitKat", 518, 26.0, 65, 7.0),
//   createData(10, "Lollipop", 392, 0.2, 98, 0.0),
//   createData(11, "Marshmallow", 318, 0, 81, 2.0),
//   createData(12, "Nougat", 360, 19.0, 9, 37.0),
//   createData(13, "Oreo", 437, 18.0, 63, 4.0),
// ];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key,
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string },
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number,
// ) {
//   const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis?.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
  sortable: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
    sortable: false,
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
    sortable: true,
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
    sortable: true,
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
    sortable: true,
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
    sortable: true,
  },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: "Created At",
    sortable: true,
  },
];

interface EnhancedTableProps {
  numSelected: number;
  // onRequestSort: (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof User,
  // ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // order: Order;
  // orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    // order,
    // orderBy,
    numSelected,
    rowCount,
    // onRequestSort,
  } = props;
  // const createSortHandler =
  //   (property: keyof User) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              // direction={
              //   !headCell.sortable
              //     ? undefined
              //     : orderBy === headCell.id
              //       ? order
              //       : "asc"
              // }
              // onClick={createSortHandler(headCell.id)}
              disabled={!headCell.sortable}
              // IconComponent={() =>
              //   headCell.sortable ? (
              //     <SortIcons
              //       activeAsc={order === "asc"}
              //       activeDesc={order === "desc"}
              //       disabled={orderBy !== headCell.id}
              //     />
              //   ) : (
              //     <></>
              //   )
              // }
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

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
        <SearchInput onSearch={(val) => console.log(val)} />
      )}
      {numSelected > 0 ? (
        <Tooltip title={"Delete Selected"}>
          <IconButton
            aria-label="delete"
            sx={{
              color: (theme) => theme.palette.getContrastText(red[500]),
              backgroundColor: red[500],
              "&:hover": {
                backgroundColor: red[700],
              },
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <FilterTable />
      )}
    </Toolbar>
  );
}
export default function EnhancedTable() {
  // const [order, setOrder] = React.useState<Order>("asc");
  // const [orderBy, setOrderBy] = React.useState<keyof User>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof User,
  // ) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // ____________________ GET ____________________ //
  async function getAllUsers() {
    const res = await getData<any>("/users?page=1&limit=4");
    return res.data;
  }

  const { data, isLoading, isError, error } = useQuery<any, AxiosError<any>>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const users = isLoading || data.data;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n: User) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(data?.data, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage,
  //     ),
  //   [order, orderBy, page, rowsPerPage],
  // );

  return (
    <Box sx={{ width: "100%" }}>
      {users && (
        <Paper sx={{ width: "100%" }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          {/* <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                // order={order}
                // orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                // onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {users.map((row, index) => {
                  const isItemSelected = isSelected(+row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(+row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onChange={() => handleClick(+row.id)}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.username}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.created_at}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer> */}
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: useScreenSizeStyle("column-reverse", "row"),
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              pl: { sm: 1 },
              pr: { xs: 1, sm: 1 },
              py: 2,
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"space-evenly"}
              gap={2}
              width={useScreenSizeStyle("100%", undefined)}
            >
              <TextField
                disabled
                id="outlined-disabled"
                label="Total"
                defaultValue={"20 Items"}
                size={"small"}
                sx={{
                  maxWidth: 90,
                }}
              />
              <FormControl size="small" sx={{ minWidth: 90 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Per Page
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Per Page"
                  value={rowsPerPage}
                  onChange={(e) => console.log(e.target.value)}
                  autoWidth
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <CustomPagination />
          </Toolbar>
        </Paper>
      )}
    </Box>
  );
}
