import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useSelector } from "@xstate/react";
import React from "react";
import JTree from "~/utils/JTree";

import { useBucketCtx } from "~/contexts/BucketCtx";
import BoxWrap from "./BoxWrap";
import {
  format,
  formatDistance,
  formatRelative,
  formatDistanceToNow,
} from "date-fns";
const getLastThreeAttempts = (phrase: Phrase): AttemptRecord[] => {
  const attempts = phrase.attempts;
  if (!attempts) return [];
  const timeKeys = Object.keys(attempts).sort((a, b) => Number(b) - Number(a));
  let fastestTime = Infinity;
  let fastestKey = "";
  Object.entries(attempts).forEach(([timeKey, attempt]) => {
    if (attempt.answerDuration < fastestTime) {
      fastestKey = timeKey;
      fastestTime = attempt.answerDuration;
    }
  });
  return timeKeys.slice(0, 3).map((timeKey) => ({
    ...attempts[timeKey],
    timeKey,
    isFastest: timeKey === fastestKey,
  }));
};

const ReportBox = () => {
  const { phraseSvc } = useBucketCtx();
  const phrases = useSelector(phraseSvc, ({ context }) => context.phrases);
  const phrasesWithLatest: Phrase[] = Object.entries(phrases).map(
    ([phrase_id, phrase]) => {
      return { phrase_id, ...phrase };
    }
  );
  return (
    <BoxWrap>
      <List sx={{ width: 400 }}>
        {phrasesWithLatest.map((phrase) => {
          const lastThreeAttempts = getLastThreeAttempts(phrase);
          return (
            <ListItem key={phrase.id} dense divider>
              <ListItemText
                primary={phrase.spanish}
                secondary={phrase.english}
              />
              <Box>
                {lastThreeAttempts.map((attempt, i) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: attempt.isCorrect ? "InfoText" : "red",
                      }}
                    >
                      <Typography
                        key={i}
                        variant="caption"
                        sx={{
                          fontWeight: attempt.isFastest ? "bold" : "",
                        }}
                      >
                        {Math.round(attempt.answerDuration / 100) / 10} s
                      </Typography>
                      <Typography mx={1}>/</Typography>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: attempt.isFastest ? "bold" : "" }}
                      >
                        {formatDistanceToNow(Number(attempt.timeKey), {
                          addSuffix: true,
                        })}
                        :
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </ListItem>
          );
        })}
      </List>
      <JTree data={phrasesWithLatest} />
    </BoxWrap>
  );
};

export default ReportBox;
