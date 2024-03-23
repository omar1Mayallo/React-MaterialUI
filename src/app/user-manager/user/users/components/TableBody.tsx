import {
  TableBody as MUITableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import IconButtonTooltip from "../../../../../shared/components/Buttons/IconButtonTooltip";
import TableActions from "./TableActions";
import { useGetUserActions } from "../../../permissions/services/permissions.service";
import useUserActions from "../../../../../shared/hooks/useUserActions";

interface TableBodyProps {
  data: any[];
  isSelected: (id: number) => boolean;
  handleClick: (id: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  data,
  isSelected,
  handleClick,
}) => {
  const { userActions, isHaveNotDeleteAction } = useUserActions("users");

  return (
    <MUITableBody>
      {data.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            // onClick={() => handleClick(row.id)}
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
                onChange={() => handleClick(row.id)}
                disabled={isHaveNotDeleteAction}
              />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row">
              {row.id}
            </TableCell>
            <TableCell align="center">{row.username}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
            <TableCell align="center">{row.status}</TableCell>
            <TableCell align="center">{row.type}</TableCell>
            <TableCell align="center">{`${row.created_at}`}</TableCell>
            <TableCell align="center">
              <TableActions userActions={userActions!} />
            </TableCell>
          </TableRow>
        );
      })}
    </MUITableBody>
  );
};

export default TableBody;
