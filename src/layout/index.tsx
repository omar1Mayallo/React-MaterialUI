import { Box, Toolbar, styled } from "@mui/material";
import { ReactNode } from "react";
import Header from "./components/Header";
import { Main } from "./components/Main";
import SideDrawer from "./components/SideDrawer";

const BaseLayout = ({ children }: { children: ReactNode }) => {
  // const isLargeScreen: boolean = useMediaQuery<Theme>((theme) =>
  //   theme.breakpoints.up("md"),
  // );
  return (
    <OuterContainer>
      <Header />
      <Toolbar />
      <InnerContainer>
        <SideDrawer />
        <Main>{children}</Main>
      </InnerContainer>
      {/* <Footer /> */}
    </OuterContainer>
  );
};

export default BaseLayout;

const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled(Box)`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: inherit;
`;
