import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import PhraseList from "~/components/phrase/PhraseList";
import PhraseForm from "~/components/phrase/phrase_form/PhraseForm";
import Layout from "~/layout/Layout";
import JTree from "~/utils/JTree";
import { PhraseCtxProvider, usePhraseCtx } from "../../contexts/PhraseCtx";

const PhraseIndexPage = () => {
  const { phrases } = usePhraseCtx();
  const [selectedPhrase, setSelectedPhrase] = useState<string>();
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <PhraseForm
            cardTitle="NEW PHRASE"
            initialValues={selectedPhrase ? phrases[selectedPhrase] : null}
            onCancel={() => setSelectedPhrase("")}
          />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <PhraseList
            phrases={phrases}
            onClickPhrase={console.log}
            buttons={([phrase_id, phrase]) => {
              return (
                <Button onClick={() => setSelectedPhrase(phrase_id)}>
                  Edit
                </Button>
              );
            }}
          />
        </Grid>
        <Grid item>
          <JTree data={phrases} />
        </Grid>
      </Grid>
    </Layout>
  );
};

const WrappedPhraseIndexPage = () => {
  return (
    <PhraseCtxProvider>
      <PhraseIndexPage />
    </PhraseCtxProvider>
  );
};

export default WrappedPhraseIndexPage;
