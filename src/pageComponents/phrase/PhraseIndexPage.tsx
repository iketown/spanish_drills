import { Grid } from "@mui/material";
import React from "react";
import { JSONTree } from "react-json-tree";
import PhraseList from "~/components/phrase/PhraseList";
import PhraseForm from "~/components/phrase/phrase_form/PhraseForm";
import { usePhraseFxns } from "~/hooks/usePhraseFxns";
import Layout from "~/layout/Layout";
import { PhraseCtxProvider, usePhraseCtx } from "../../contexts/PhraseCtx";

const PhraseIndexPage = () => {
  const { phrases } = usePhraseCtx();
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <PhraseForm cardTitle="NEW PHRASE" />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <PhraseList phrases={phrases} />
        </Grid>
        <Grid item>
          <JSONTree data={phrases} hideRoot />
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

export default PhraseIndexPage;
