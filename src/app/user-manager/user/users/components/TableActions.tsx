import { Delete, Edit, MoreVert, Note, Send } from "@mui/icons-material";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import IconButtonTooltip from "../../../../../shared/components/Buttons/IconButtonTooltip";
import useDropDownMenu from "../../../../../shared/hooks/useDropDownMenu";

const TableActions = ({ userActions }: { userActions: string[] }) => {
  const { anchorEl, open, handleClick, handleClose } = useDropDownMenu();

  // console.log(userActions);

  return (
    <>
      <IconButtonTooltip
        tooltip={undefined}
        Icon={MoreVert}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem divider sx={{ py: 1.1 }}>
          <ListItemIcon>
            <Edit fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem divider sx={{ py: 1.1 }}>
          <ListItemIcon>
            <Delete fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem divider sx={{ py: 1.1 }}>
          <ListItemIcon>
            <Send fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Permissions</ListItemText>
        </MenuItem>
        <MenuItem divider={false} sx={{ py: 1.1 }}>
          <ListItemIcon>
            <Note fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Plans</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableActions;
