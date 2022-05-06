import { createContext, useContext } from "react";
import { useBucketFxns } from "~/hooks/useBucketFxns";

interface BucketCtxI {
  bucketPhrases: {
    [phrase_id: string]: Phrase;
  };
  bucket?: Bucket;
}
const BucketCtx = createContext({} as BucketCtxI);

export const BucketCtxProvider: React.FC = ({ children }) => {
  const { bucketPhrases, bucket } = useBucketFxns();
  return (
    <BucketCtx.Provider value={{ bucketPhrases, bucket }}>
      {children}
    </BucketCtx.Provider>
  );
};

export const useBucketCtx = () => useContext(BucketCtx);
