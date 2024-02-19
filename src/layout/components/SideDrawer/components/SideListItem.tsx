import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalNavLinkWrapper from "../../../../shared/components/Links/ConditionalNavLinkWrapper";
import useSideDrawerStore from "../../../store/sidebar.store";
import useCustomPath from "../hooks/useCustomizePath";

export interface SideListItemPropsI {
  name: string;
  url?: string;
  Icon?: typeof SvgIcon;
  subPadding?: boolean;
  subItemsMenu?: SideListItemPropsI[];
}

const SideListItem = ({
  name,
  url,
  Icon,
  subPadding,
  subItemsMenu,
}: SideListItemPropsI) => {
  // SideDrawer State
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  // Paths Handler
  const { modulePath, subModulePath, subSubModulePath } = useCustomPath();

  // Collapse State Handlers
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!isOpen) {
      toggleSideNav();
    }
    if (subItemsMenu) {
      navigate(subItemsMenu[0].url!);
    }
    setOpen(!open);
  };
  useEffect(() => {
    if (!isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  // Items Selected
  const selected =
    url === modulePath || url === subModulePath || url === subSubModulePath;

  return (
    <>
      <ConditionalNavLinkWrapper url={url}>
        <Tooltip title={!isOpen && name} placement={"right"} arrow>
          <ListItemButton
            selected={selected}
            onClick={subItemsMenu ? handleClick : undefined}
            sx={{
              minHeight: 45,
              display: "flex",
              justifyContent: "center",
              ...(subPadding ? { pl: 4 } : {}),
            }}
          >
            {Icon && (
              <ListItemIcon
                sx={{
                  minWidth: 45,
                  display: !isOpen ? "flex" : "block",
                  justifyContent: !isOpen ? "center" : "initial",
                }}
              >
                <Icon />
              </ListItemIcon>
            )}
            {isOpen && <ListItemText primary={name} />}
            {subItemsMenu && isOpen && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </Tooltip>
      </ConditionalNavLinkWrapper>
      {subItemsMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" dense={true} disablePadding>
            {subItemsMenu.map((item, idx) => (
              <SideListItem key={idx} {...item} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SideListItem;
