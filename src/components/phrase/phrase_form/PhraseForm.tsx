import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormApi } from "final-form";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Field, Form } from "react-final-form";
import TagFormSection from "~/components/tags/TagFormSection";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { usePhraseFxns } from "~/hooks/usePhraseFxns";
import FormDataView from "~/utils/FormDataView";
import FormalModeSwitch from "./FormalModeSwitch";
import { phraseValidator } from "./phraseValidator";
import WordsArray from "./WordsArray";

// TODO handle audio uploads to storage

interface PhraseFormI {
  cardTitle?: string;
  initialValues?: Phrase | null;
  phraseIdCallback?: (phrase_id: string) => void;
  onCancel?: () => void;
}

const PhraseForm: React.FC<PhraseFormI> = ({
  cardTitle,
  initialValues,
  phraseIdCallback,
  onCancel,
}) => {
  const { user, loading, error } = useAuthCtx();
  const { createPhrase, updatePhrase } = usePhraseFxns();
  const onSubmit = (values: Phrase, form: FormApi<Phrase, Partial<any>>) => {
    if (values.id) {
      updatePhrase({ phrase_id: values.id, phrase: values })?.then((res) => {
        console.log("res in form", res);
        onCancel && onCancel();
      });
    } else {
      // todo handle save
      createPhrase(values)?.then((id) => {
        form.restart && form.restart();
        phraseIdCallback && phraseIdCallback(id);
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
        initialValues={initialValues || undefined}
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
                  <Grid item xs={12} container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <FormalModeSwitch />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <TagFormSection />
                    </Grid>
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
                  <Button onClick={onCancel}>cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={hasValidationErrors || pristine}
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
