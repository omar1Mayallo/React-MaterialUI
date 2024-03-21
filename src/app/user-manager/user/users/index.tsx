import React from "react";
import PageBreadcrumbs from "../../../../shared/components/Breadcrumbs/PageBreadcrumbs";
import PageHead from "../../../../shared/components/Head/PageHead";
import useGetAllUsers from "./services/getAll";
import {
  Box,
  Paper,
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Toolbar,
  Stack,
} from "@mui/material";
import TableToolbar from "../../../../shared/components/Table/TableToolbar";
import TableHead from "../../../../shared/components/Table/TableHead";
import { userBreadcrumbs, usersHeadCells } from "./data";
import useGetAllUsersParamsStore from "./store/useGetAllUsersParams.store";
import { useScreenSizeStyle } from "../../../../shared/hooks/useStyle";
import CustomPagination from "../../../dashboard/pagination";
import TableSkeleton from "../../../../shared/components/Loaders/TableSkeleton";
import TableActions from "./components/TableActions";

const Users = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetAllUsers();

  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data?.data?.map((n) => n.id)!;
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const { pagination, handleChangeLimit, handleSearch, search } =
    useGetAllUsersParamsStore();

  return (
    <>
      {/* PAGE_HEAD */}
      <PageHead title="Users">
        <PageBreadcrumbs breadcrumbs={userBreadcrumbs} />
      </PageHead>

      {/* TABLE */}
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <Box>
          <img src="/file-error.svg" alt="error" width={100} height={100} />
        </Box>
      ) : (
        isSuccess && (
          <Box>
            {/* ACTIONS */}
            <TableActions />
            <Paper sx={{ width: "100%" }}>
              {/* TABLE_SEARCH_FILTERS */}
              <TableToolbar
                numSelected={selected.length}
                onSearch={handleSearch}
                searchVal={search}
              />

              {/* TABLE */}
              <TableContainer>
                <MuiTable
                  sx={{ minWidth: 750 }}
                  aria-labelledby="users-table"
                  size={"medium"}
                >
                  {/* TABLE_HEAD */}
                  <TableHead
                    numSelected={selected.length}
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={data?.data?.length!}
                    headCells={usersHeadCells}
                  />
                  <TableBody>
                    {data.data.map((row, index) => {
                      const isItemSelected = isSelected(+row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          // onClick={() => handleClick(+row.id)}
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
                              // onChange={() => handleClick(+row.id)}
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
                          <TableCell align="center">{`${row.created_at}`}</TableCell>
                        </TableRow>
                      );
                    })}
                    {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
                  </TableBody>
                  {/* TABLE_BODY */}
                </MuiTable>
              </TableContainer>

              {/* TABLE_PAGINATION */}
              <Toolbar
                sx={{
                  display: "flex",
                  // flexDirection: useScreenSizeStyle("column-reverse", "row"),
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
                  // width={useScreenSizeStyle("100%", undefined)}
                >
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Total"
                    defaultValue={data.paginationDetails.totalNumOfItems}
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
                      value={pagination.limit}
                      onChange={(e) => {
                        handleChangeLimit(+e.target.value);
                      }}
                      autoWidth
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <CustomPagination paginationDetails={data.paginationDetails} />
              </Toolbar>
            </Paper>
          </Box>
        )
      )}
    </>
  );
};

export default Users;
