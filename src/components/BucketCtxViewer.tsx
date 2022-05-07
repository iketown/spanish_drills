import React from "react";
import { Drawer, Button, Box } from "@mui/material";
import { useState } from "react";
import JTree from "~/utils/JTree";
import { useBucketCtx } from "~/contexts/BucketCtx";
import { useSelector } from "@xstate/react";

const BucketCtxViewer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { phraseSvc } = useBucketCtx();
  const bucketCtx = useSelector(phraseSvc, ({ context }) => context);
  return (
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ minWidth: 300 }}>
          <JTree data={bucketCtx} />
        </Box>
      </Drawer>
      <Button
        disabled={!bucketCtx}
        variant="outlined"
        onClick={() => setDrawerOpen(true)}
      >
        CTX
      </Button>
    </>
  );
};

export default BucketCtxViewer;
