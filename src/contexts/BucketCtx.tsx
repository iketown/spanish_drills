import { useInterpret } from "@xstate/react";
import { createContext, useContext } from "react";
import { ActorRefFrom } from "xstate";
import { useBucketFxns } from "~/hooks/useBucketFxns";
import { phraseMachine } from "~/xstate/phrase_machine/phraseMachine";
import type { PhraseMachineType } from "~/xstate/phrase_machine/phraseMachine";

// https://dev.to/mpocock1/how-to-manage-global-state-with-xstate-and-react-3if5

interface BucketCtxI {
  bucketPhrases: {
    [phrase_id: string]: Phrase;
  };
  bucket?: Bucket;
  phraseSvc: ActorRefFrom<PhraseMachineType>;
}
const BucketCtx = createContext({} as BucketCtxI);

export const BucketCtxProvider: React.FC = ({ children }) => {
  const { bucketPhrases, bucket } = useBucketFxns();
  const phraseSvc = useInterpret(phraseMachine);
  return (
    <BucketCtx.Provider value={{ bucketPhrases, bucket, phraseSvc }}>
      {children}
    </BucketCtx.Provider>
  );
};

export const useBucketCtx = () => useContext(BucketCtx);
