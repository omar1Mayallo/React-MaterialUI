import useUserStore from "../../../../store/user.store";
import SquareIcon from "@mui/icons-material/Square";

const usePermissionsList = () => {
  const permissions = useUserStore((s) => s.userPermissions);
  console.log("permissions >>>>>>", permissions);

  const getMenuItems = (entities: any) => {
    return entities.map((entity: any) => {
      if (entity.entity_url) {
        // If entity has a URL, it's a leaf node in the menu
        return {
          name: entity.entity_en_name, // Assuming you want to use English name
          url: `/${entity.entity_url}`, // Assuming URL follows this pattern
          Icon: entity.entity_icon, // Assuming DefaultIcon is defined somewhere
          entity_key: entity.entity_key,
        };
      } else if (entity.entities && entity.entities.length > 0) {
        // If entity has sub-entities, recursively build subItemsMenu
        return {
          name: entity.module_en_name, // Assuming you want to use English name
          module_key: entity.module_key,
          Icon: entity.module_icon, // Assuming DefaultIcon is defined somewhere
          url: entity.entities[0].entity_url,
          subItemsMenu: getMenuItems(entity.entities),
        };
      }
    });
  };

  const menuList = getMenuItems(permissions.entities);
  console.log("menuList>>>", menuList);

  return { menuList };
};

export default usePermissionsList;
