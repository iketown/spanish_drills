import { Box, Divider } from "@mui/material";
import { useSelector } from "@xstate/react";
import React from "react";

import { BucketCtxProvider, useBucketCtx } from "~/contexts/BucketCtx";
import Layout from "~/layout/Layout";
import BucketCtxViewer from "~/components/BucketCtxViewer";
import { useEffect } from "react";
import { isEqual } from "lodash";
import StartBox from "./boxes/StartBox";
import QuestionBox from "./boxes/QuestionBox";
import { useUserCtx } from "~/contexts/UserCtx";
import { useAuthCtx } from "~/contexts/AuthCtx";
import ReportBox from "./boxes/ReportBox";

const BucketStudyPage = () => {
  const { bucketPhrases, phraseSvc } = useBucketCtx();
  const { userInfo } = useUserCtx();
  const { user_id } = useAuthCtx();
  const ctx = useSelector(phraseSvc, ({ context }) => context);
  const stateValue = useSelector(phraseSvc, ({ value }) => value);

  useEffect(() => {
    // keep ctx updated with latest versions of phrases
    if (!bucketPhrases) return;
    const ctxPhrases = ctx?.phrases;
    if (isEqual(bucketPhrases, ctxPhrases)) return;
    console.log("loading phrases", bucketPhrases);
    phraseSvc.send({
      type: "LOAD_PHRASES",
      payload: { phrases: bucketPhrases },
    });
  }, [bucketPhrases, ctx?.phrases]);
  useEffect(() => {
    if (!user_id) return;
    phraseSvc.send({ type: "LOAD_USER", payload: { user_id } });
  }, [user_id]);

  const getContent = () => {
    switch (true) {
      case stateValue === "ready":
        return <StartBox />;
      case stateValue === "init":
        return <div>init</div>;
      case stateValue === "playing":
        return <QuestionBox />;
      case stateValue === "showSuccess":
        return <div>success!</div>;
      case stateValue === "showFail":
        return <div>fail!</div>;
      case stateValue === "showReport":
        return <ReportBox />;
      default:
        return <div>no match</div>;
    }
  };
  return (
    <Layout>
      <Box mt={3} />
      {getContent()}
      <Divider sx={{ mt: 10 }} />
      <BucketCtxViewer />
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
