import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { JSONTree } from "react-json-tree";
import PhraseDialog from "~/components/phrase/PhraseDialog";
import PhraseList from "~/components/phrase/PhraseList";
import PhraseForm from "~/components/phrase/phrase_form/PhraseForm";
import { useBucketFxns } from "~/hooks/useBucketFxns";
import Layout from "~/layout/Layout";
import { PhraseCtxProvider, usePhraseCtx } from "~/contexts/PhraseCtx";

const BucketEditPage = () => {
  const { query: routerQuery } = useRouter();
  const { addPhraseToBucket, removePhraseFromBucket, bucket, bucketPhrases } =
    useBucketFxns();

  const { phrases } = usePhraseCtx();
  const [phraseDialogOpen, setPhraseDialogOpen] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<Phrase | null>(null);
  const bucket_id = routerQuery.bucket_id as string;

  const handleEditPhrase = (phrase_id: string) => {
    setEditingPhrase(phrases[phrase_id]);
    setPhraseDialogOpen(true);
  };
  const isSelectedFxn = (phrase_id: string) =>
    !!bucket?.phrases[phrase_id]?.included;
  return (
    <Layout>
      <PhraseDialog
        open={phraseDialogOpen}
        handleClose={() => setPhraseDialogOpen(false)}
        editingPhrase={editingPhrase}
      />
      <Typography variant="h5">{bucket?.title}</Typography>
      <Grid container spacing={2}>
        <PhraseList
          phrases={phrases}
          filter={([phrase_id, phrase]) => !!bucket?.phrases[phrase_id]}
          isSelected={isSelectedFxn}
          buttons={([phrase_id, phrase]) => {
            const isSelected = isSelectedFxn(phrase_id);
            return (
              <>
                {isSelected ? (
                  <Button
                    onClick={() => removePhraseFromBucket(phrase_id)}
                    size="small"
                    variant="outlined"
                    color="warning"
                  >
                    remove
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => addPhraseToBucket(phrase_id)}
                  >
                    ADD
                  </Button>
                )}
                <Button
                  onClick={() => handleEditPhrase(phrase_id)}
                  size="small"
                  variant="outlined"
                >
                  edit
                </Button>
              </>
            );
          }}
        />
      </Grid>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          New Phrase
        </AccordionSummary>
        <AccordionDetails>
          <PhraseForm phraseIdCallback={addPhraseToBucket} />
        </AccordionDetails>
      </Accordion>
      <Box sx={{ pt: 20, mt: 5, bgcolor: "gainsboro" }} />
      <JSONTree data={bucketPhrases} hideRoot />
      <JSONTree data={phrases} hideRoot />
      <JSONTree data={bucket} hideRoot />
    </Layout>
  );
};

const WrappedBuckedEditPage = () => {
  return (
    <PhraseCtxProvider>
      <BucketEditPage />
    </PhraseCtxProvider>
  );
};

export default WrappedBuckedEditPage;
