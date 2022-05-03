import React from "react";
import Layout from "~/layout/Layout";
import { List, ListItem, ListItemText, Grid, Button } from "@mui/material";
import { useState } from "react";
import PhraseDialog from "~/components/phrase/PhraseDialog";
import PhraseForm from "~/components/phrase/phrase_form/PhraseForm";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "~/utils/firebase/clientApp";
import {
  collection,
  query,
  where,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { JSONTree } from "react-json-tree";

const PhraseIndexPage = () => {
  const { user_id = "" } = useAuthCtx();
  const [data, loading, error, snap] = useCollectionData(
    query(
      collection(db, "phrases"),
      where("user_id", "==", user_id)
      //   orderBy("created_at", "desc")
    ) // crashes if user_id is undefined
  );
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <PhraseForm cardTitle="NEW PHRASE" />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          {data
            ?.sort((a, b) => b.updated_at - a.updated_at)
            .map((p, i: number) => {
              const phrase = p as Phrase;
              return (
                <Grid xs={4} sm={3} md={2} item key={phrase.id}>
                  <ListItemText
                    primary={phrase.spanish}
                    secondary={phrase.english}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid item>
          <JSONTree data={data} hideRoot />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PhraseIndexPage;
