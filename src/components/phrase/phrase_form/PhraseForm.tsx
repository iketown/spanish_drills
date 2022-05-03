import React from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Divider,
  Card,
  CardContent,
  CardActions,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import { FormApi } from "final-form";
import FormDataView from "~/utils/FormDataView";
import { useState } from "react";
import FormalModeSwitch from "./FormalModeSwitch";
import arrayMutators from "final-form-arrays";
import WordsArray from "./WordsArray";
import { phraseValidator } from "./phraseValidator";
import { nanoid } from "nanoid";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { usePhraseFxns } from "~/hooks/usePhraseFxns";

// TODO handle audio uploads to storage

interface PhraseFormI {
  cardTitle?: string;
  initialValues?: Phrase;
}

const PhraseForm: React.FC<PhraseFormI> = ({ cardTitle, initialValues }) => {
  const { user, loading, error } = useAuthCtx();
  const { createPhrase } = usePhraseFxns();
  const onSubmit = (values: Phrase, form: FormApi<Phrase, Partial<any>>) => {
    if (values.id) {
      // todo handle update
      console.log("updating", values);
    } else {
      // todo handle save
      createPhrase(values)?.then((id) => {
        form.restart && form.restart();
      });
    }
  };
  if (!user)
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress sx={{ my: 3 }} />
        getting user
      </Box>
    );
  return (
    <Card>
      {cardTitle && (
        <Typography variant="subtitle1" color="GrayText" sx={{ p: 2 }}>
          {cardTitle}
        </Typography>
      )}
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        validate={phraseValidator}
      >
        {({ handleSubmit, values, hasValidationErrors, pristine }) => {
          return (
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} sm={10}>
                    <Field name="english">
                      {({ input, meta }) => {
                        return (
                          <TextField
                            label="english"
                            fullWidth
                            {...input}
                            error={meta.error && meta.touched}
                            helperText={meta.touched && meta.error}
                          />
                        );
                      }}
                    </Field>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{ display: "flex", alignItems: "center", p: 1 }}
                  >
                    <Button fullWidth variant="outlined">
                      eng audio
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <Field name="spanish">
                      {({ input, meta }) => {
                        return (
                          <TextField
                            label="spanish"
                            fullWidth
                            {...input}
                            error={meta.error && meta.touched}
                            helperText={meta.touched && meta.error}
                          />
                        );
                      }}
                    </Field>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{ display: "flex", alignItems: "center", p: 1 }}
                  >
                    <Button fullWidth variant="outlined">
                      sp audio
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormalModeSwitch />
                  </Grid>
                  <Grid item xs={12}>
                    <WordsArray />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Field name="helper_info">
                      {({ input, meta }) => {
                        return (
                          <TextField
                            label="helper info (opt)"
                            placeholder="primarily used in mexico, etc"
                            fullWidth
                            {...input}
                          />
                        );
                      }}
                    </Field>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <FormDataView data={values} />
                  <Button>cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={hasValidationErrors}
                  >
                    save
                  </Button>
                </Box>
              </CardActions>
            </form>
          );
        }}
      </Form>
    </Card>
  );
};

export default PhraseForm;
