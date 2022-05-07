import React, { useState } from "react";
import { Drawer, Button, Box } from "@mui/material";
import { MenuOpen } from "@mui/icons-material";
import JTree from "./JTree";

interface DataDrawerI {
  data?: any;
  title?: string;
}
const DataDrawer: React.FC<DataDrawerI> = ({ data, title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  if (process.env.NODE_ENV === "development") return null;
  if (!data) return <pre>no data: {title || ""}</pre>;
  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box minWidth={300}>
          <JTree data={data} />
        </Box>
      </Drawer>
      <Button
        variant="outlined"
        color="info"
        onClick={() => setDrawerOpen(true)}
        startIcon={<MenuOpen />}
        sx={{ m: 3 }}
      >
        {title || "data"}
      </Button>
    </>
  );
};

export default DataDrawer;
