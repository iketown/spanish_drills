import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useBucketCtx } from "~/contexts/BucketCtx";

const BoxWrap: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid gainsboro",
        borderRadius: "1rem",
        minHeight: 300,
        position: "relative",
      }}
    >
      <Box textAlign={"center"}>{children}</Box>
    </Box>
  );
};

export default BoxWrap;
