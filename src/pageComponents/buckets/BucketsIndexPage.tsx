import { addDoc, collection, query, where } from "firebase/firestore";
import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import Layout from "~/layout/Layout";
import { db } from "~/utils/firebase/clientApp";
import { JSONTree } from "react-json-tree";
import {
  Grid,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import BucketForm from "~/components/buckets/BucketForm";
import { Edit, PanoramaFishEye, RemoveRedEye } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useBucketSub } from "~/hooks/useBucketSub";

const BucketsIndexPage = () => {
  const { user_id = "" } = useAuthCtx();
  const { buckets } = useBucketSub();
  const { push } = useRouter();

  const handleStudy = (bucket_id: string) => {
    push("/buckets/[bucket_id]", `/buckets/${bucket_id}`);
  };
  const handleEdit = (bucket_id: string) => {
    push("/buckets/[bucket_id]/edit", `/buckets/${bucket_id}/edit`);
  };
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BucketForm />
        </Grid>
        <Grid item xs={12}>
          <List>
            {buckets &&
              Object.entries(buckets).map(([bucket_id, bucket]) => {
                return (
                  <ListItem key={bucket_id}>
                    <ListItemText primary={bucket.title} />
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => {
                          handleEdit(bucket_id);
                        }}
                        variant="outlined"
                        startIcon={<Edit />}
                      >
                        edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleStudy(bucket_id);
                        }}
                        variant="outlined"
                        startIcon={<RemoveRedEye />}
                      >
                        study
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
          </List>
          {buckets && <JSONTree data={buckets} hideRoot />}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BucketsIndexPage;
