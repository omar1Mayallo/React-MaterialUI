import { Box, CircularProgress } from "@mui/material";
import React from "react";

const FullPageLoading: React.FC = () => {
  return (
    <Box
      component={"main"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullPageLoading;
