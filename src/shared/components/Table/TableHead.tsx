import {
  Checkbox,
  TableHead as MuiTableHead,
  TableCell,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Key } from "react";
import { TableHeadCell } from "../../types/Interfaces/TableCellHead.interface";
import SortIcons from "../Icons/SortIcons";
import useGetAllUsersParamsStore from "../../../app/user-manager/user/users/store/useGetAllUsersParams.store";

export interface TableHeadProps {
  headCells: TableHeadCell<any>[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function TableHead({
  headCells,
  numSelected,
  rowCount,
  onSelectAllClick,
}: TableHeadProps) {
  const { sort, handleSort } = useGetAllUsersParamsStore();
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as Key}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={sort === headCell.id ? "asc" : false}
          >
            <TableSortLabel
              active={sort.replace(/-/g, "") === headCell.id}
              onClick={() => handleSort(headCell.id as string)}
              disabled={!headCell.sortable}
              IconComponent={() =>
                headCell.sortable ? (
                  <SortIcons
                    activeAsc={!sort.startsWith("-")}
                    activeDesc={sort.startsWith("-")}
                    disabled={sort.replace(/-/g, "") !== headCell.id}
                  />
                ) : (
                  <></>
                )
              }
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
    </MuiTableHead>
  );
}
