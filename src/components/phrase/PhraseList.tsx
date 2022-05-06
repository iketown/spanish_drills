import { Box, Grid, ListItemText, Popover } from "@mui/material";
import React from "react";
import { blueGrey } from "@mui/material/colors";
interface PhraseListI {
  phrases: { [phrase_id: string]: Phrase };
  filter?: ([phrase_id, phrase]: [string, Phrase]) => boolean;
  isSelected?: (phrase_id: string) => boolean;
  buttons?: ([phrase_id, phrase]: [string, Phrase]) => React.ReactNode;
}

const PhraseList: React.FC<PhraseListI> = ({
  phrases,
  filter,
  isSelected,
  buttons,
}) => {
  return (
    <Grid item xs={12} container spacing={2}>
      {phrases &&
        Object.entries(phrases)
          ?.filter(filter ? filter : () => true)
          .sort(([aId, a], [bId, b]) => b.updated_at - a.updated_at)
          .map(([phrase_id, phrase], i: number) => {
            const selected = isSelected ? isSelected(phrase_id) : false;
            return (
              <Grid xs={4} md={3} item key={i}>
                <Box
                  sx={{
                    p: 1,
                    border: selected ? `1px solid ${blueGrey[300]}` : "",
                    borderRadius: "1rem",
                    position: "relative",
                  }}
                >
                  <ListItemText
                    primary={phrase.spanish}
                    secondary={phrase.english}
                  />
                  <Box
                    sx={{ justifyContent: "space-between", display: "flex" }}
                  >
                    {buttons && buttons([phrase_id, phrase])}
                  </Box>
                </Box>
              </Grid>
            );
          })}
    </Grid>
  );
};

export default PhraseList;
