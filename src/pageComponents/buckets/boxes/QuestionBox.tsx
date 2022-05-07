import { useSelector } from "@xstate/react";
import React, { useState } from "react";

import { useBucketCtx } from "~/contexts/BucketCtx";
import DataDrawer from "~/utils/DataDrawer";
import { TextField, Typography, Button, Box, Divider } from "@mui/material";

import BoxWrap from "./BoxWrap";

const QuestionBox = () => {
  const { phraseSvc } = useBucketCtx();
  const currentPhrase = useSelector(
    phraseSvc,
    ({ context }) => context.currentPhrase
  );
  const [answerText, setAnswerText] = useState("");
  const handleSubmit = () => {
    phraseSvc.send({
      type: "SUBMIT_ANSWER",
      payload: {
        answerText,
      },
    });
  };
  return (
    <>
      <BoxWrap>
        <Typography variant="overline" color="GrayText">
          English:
        </Typography>
        <Typography variant="subtitle1">{currentPhrase?.english}</Typography>
        <Divider />
        <Typography variant="overline" color="GrayText">
          Español:
        </Typography>
        <Box>
          <TextField
            autoFocus
            value={answerText}
            onKeyPress={(e) => {
              if (e.key === "Enter" && answerText.length) {
                handleSubmit();
              }
            }}
            onChange={(e) => {
              setAnswerText(e.target.value);
            }}
          />
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          SUBMIT
        </Button>
      </BoxWrap>
      <DataDrawer data={currentPhrase} title="current Phrase" />
    </>
  );
};

export default QuestionBox;
