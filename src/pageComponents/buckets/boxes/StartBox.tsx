import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useBucketCtx } from "~/contexts/BucketCtx";
import BoxWrap from "./BoxWrap";

const StartBox = () => {
  const { phraseSvc, bucket } = useBucketCtx();
  const bucketTitle = bucket?.title;
  return (
    <BoxWrap>
      {bucketTitle && <Typography variant="h4">{bucketTitle}</Typography>}
      <Box sx={{ mt: 2 }} />
      <Typography>information about this quiz: blah blah</Typography>
      <Button
        onClick={() => phraseSvc.send({ type: "START_QUIZ" })}
        size="large"
        variant="contained"
        sx={{ mt: 4 }}
      >
        START
      </Button>
    </BoxWrap>
  );
};

export default StartBox;
