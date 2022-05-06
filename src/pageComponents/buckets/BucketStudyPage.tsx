import { Divider } from "@mui/material";
import React from "react";
import { JSONTree } from "react-json-tree";
import { BucketCtxProvider, useBucketCtx } from "~/contexts/BucketCtx";
import Layout from "~/layout/Layout";

const BucketStudyPage = () => {
  const { bucketPhrases } = useBucketCtx();
  return (
    <Layout>
      BucketStudyPage
      <Divider />
      <JSONTree data={bucketPhrases} />
    </Layout>
  );
};

const WrappedBucketStudyPage = () => {
  return (
    <BucketCtxProvider>
      <BucketStudyPage />
    </BucketCtxProvider>
  );
};

export default WrappedBucketStudyPage;
