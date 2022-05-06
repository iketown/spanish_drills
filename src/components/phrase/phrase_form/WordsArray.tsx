import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Field, useField } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import WordAlternates from "./WordAlternates";

const WordsArray = () => {
  const { input, meta } = useField("spanish");
  const {
    input: { value: arrVal, onChange: onChangeArr },
  } = useField("sp_words");

  useEffect(() => {
    // update array when spanish changes
    const wordsArray = input.value
      .replace(/[.,/#¿!$%^&*;:{}=-_`~()]/g, "")
      .split(" ")
      .filter((w: string) => !!w)
      .map((word: string, i: number) => {
        if (arrVal[i] && arrVal[i].word === word) return arrVal[i];
        return { word };
      });
    onChangeArr(wordsArray);
  }, [input.value]);

  return (
    <Grid container spacing={2}>
      <FieldArray name="sp_words">
        {({ fields }) => {
          return fields.map((name, index) => {
            return (
              <Grid item key={name}>
                <Card sx={{ p: 1 }}>
                  <Field name={name}>
                    {({ input, meta }) => {
                      return (
                        <Box>
                          <Typography sx={{ textAlign: "center" }}>
                            {input.value.word}
                          </Typography>
                          <WordAlternates
                            onChange={(alts) => {
                              input.onChange({ ...input.value, alts });
                            }}
                            savedAlts={input.value.alts || []}
                            mainWord={input.value.word}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!input.value.optional}
                                onChange={(e, chk) => {
                                  input.onChange({
                                    ...input.value,
                                    optional: chk,
                                  });
                                }}
                              />
                            }
                            label={"opt"}
                          />
                        </Box>
                      );
                    }}
                  </Field>
                </Card>
              </Grid>
            );
          });
        }}
      </FieldArray>
    </Grid>
  );
};

export default WordsArray;
