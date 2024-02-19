import { create } from "zustand";

export interface SideNavStateI {
  isOpen: boolean;
  menuList: MenuItemI[];
  toggleSideNav: () => void;
}

export interface MenuItemI {
  route: string;
  literal: string;
}

const useSideDrawerStore = create<SideNavStateI>((set) => ({
  isOpen: true,
  toggleSideNav: () => set((state) => ({ isOpen: !state.isOpen })),
  menuList: [
    // Add your menu items here
    { route: "/dashboard", literal: "Dashboard" },
    // Add more items as needed
  ],
}));

export default useSideDrawerStore;
