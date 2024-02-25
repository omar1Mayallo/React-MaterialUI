import * as Icons from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConditionalNavLinkWrapper from "../../../../shared/components/Links/ConditionalNavLinkWrapper";
import useSideDrawerStore from "../../../store/sidebar.store";
import useCurrentPath from "../hooks/useCurrentPath";

export interface SideListItemPropsI {
  name: string;
  url?: string;
  Icon?: any;
  subPadding?: boolean;
  subItemsMenu?: SideListItemPropsI[];
  module_key?: string;
  entity_key?: string;
}

const SideListItem = (props: SideListItemPropsI) => {
  const { name, url, Icon, subPadding, subItemsMenu, module_key, entity_key } =
    props;
  // SIDE_DRAWER_STATE
  const { isOpen, toggleSideNav } = useSideDrawerStore();

  // HANDLE_CURRENT_PATH
  const { modulePath, subModulePath, subSubModulePath, subSubSubModulePath } =
    useCurrentPath();

  // HANDLE_COLLAPSE_STATE
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
    if (selected) {
      setOpen(true);
    }
    if (!isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  // ITEM_SELECTED
  const selected =
    modulePath === (module_key || entity_key) ||
    subModulePath.split("/")[1] === (module_key || entity_key) ||
    subSubModulePath.split("/")[2] === (module_key || entity_key) ||
    subSubSubModulePath.split("/")[3] === (module_key || entity_key);

  // ICON_FROM[@mui/icons-material]
  const IconComponent: Icons.SvgIconComponent = (Icons as any)[Icon];

  return (
    <>
      <ConditionalNavLinkWrapper url={url}>
        <Tooltip title={!isOpen && name} placement={"right"} arrow>
          <ListItemButton
            selected={selected}
            onClick={subItemsMenu ? handleClick : undefined}
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 1.5,
              ...(subPadding ? { pl: 4 } : {}),
            }}
          >
            <ListItemIcon
              sx={{
                display: !isOpen ? "flex" : "block",
                justifyContent: !isOpen ? "center" : "initial",
              }}
            >
              {Icon ? (
                <IconComponent />
              ) : module_key ? (
                <img
                  src={`/${module_key}.webp`}
                  alt={"icon"}
                  loading="lazy"
                  width={25}
                  height={25}
                />
              ) : (
                entity_key && (
                  <img
                    src={`/${entity_key}.webp`}
                    alt={"icon"}
                    loading="lazy"
                    width={25}
                    height={25}
                  />
                )
              )}
            </ListItemIcon>

            {isOpen && <ListItemText primary={name} />}

            {subItemsMenu && isOpen && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        </Tooltip>
      </ConditionalNavLinkWrapper>

      {subItemsMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" dense={true} disablePadding>
            {subItemsMenu.map((item, idx) => (
              <SideListItem key={idx} {...item} subPadding />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SideListItem;
