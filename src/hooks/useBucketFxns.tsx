import {
  addDoc,
  collection,
  arrayUnion,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { db } from "~/utils/firebase/clientApp";
import { useToast } from "./useToast";

export const useBucketFxns = () => {
  const { query } = useRouter();
  const { user_id } = useAuthCtx();
  const { toast } = useToast();
  const [bucketPhrases, setPhrases] = useState<{ [phrase_id: string]: Phrase }>(
    {}
  );
  const [unSubs, setUnSubs] = useState<{ [phrase_id: string]: Unsubscribe }>(
    {}
  );
  const bucket_id = query.bucket_id as string | undefined;
  const [bucket, setBucket] = useState<Bucket>();

  useEffect(() => {
    if (!user_id || !bucket_id) return;
    const newPhraseIds =
      (bucket?.phrases &&
        Object.entries(bucket.phrases)
          .filter(([phrase_id, phrase]) => {
            return phrase.included && !bucketPhrases[phrase_id]; // its new
          })
          .map(([phrase_id]) => phrase_id)) ||
      [];
    const removePhraseIds =
      (bucket?.phrases &&
        Object.entries(bucket.phrases)
          .filter(([phrase_id, phrase]) => {
            return !phrase?.included;
          })
          .map(([phrase_id]) => phrase_id)) ||
      [];

    const newUnsubs: { [phrase_id: string]: Unsubscribe } = {};

    newPhraseIds.forEach((phrase_id) => {
      newUnsubs[phrase_id] = onSnapshot(
        doc(db, "users", user_id, "phrases", phrase_id),
        (snap) => {
          const phraseData = snap.data() as Phrase;
          setPhrases((old) => ({ ...old, [phrase_id]: phraseData }));
        }
      );
    });

    setUnSubs((old) => ({ ...old, ...newUnsubs }));
    setPhrases((old) => {
      const phraseUpdate = { ...old };
      removePhraseIds?.forEach((id) => {
        delete phraseUpdate[id];
      });
      return phraseUpdate;
    });
  }, [bucket?.phrases]);

  useEffect(() => {
    return () =>
      unSubs &&
      Object.entries(unSubs).forEach(([id, unsub]) => {
        console.log("unsubscribing to", id);
        unsub();
      });
  }, [unSubs]);

  useEffect(() => {
    if (!user_id || !bucket_id) return;
    const bucketRef = doc(db, "users", user_id, "buckets", bucket_id);
    const unsub = onSnapshot(bucketRef, (snap) => {
      const bucketData = snap.data() as Bucket;
      setBucket({ ...bucketData, bucket_id: snap.id });
    });
    return unsub;
  }, [user_id, bucket_id]);

  const addPhraseToBucket = (phrase_id: string) => {
    if (!bucket_id || !user_id) return toast("missing bucket id");
    const oldPhrases = bucket?.phrases || {};
    setDoc(
      doc(db, "users", user_id, "buckets", bucket_id),
      {
        phrases: {
          ...oldPhrases,
          [phrase_id]: {
            ...oldPhrases[phrase_id],
            included: true,
          },
        },
      },
      { merge: true }
    );
  };

  const removePhraseFromBucket = (phrase_id: string) => {
    if (!bucket_id || !user_id) return toast("missing bucket id");
    const oldPhrases = bucket?.phrases || {};

    setDoc(
      doc(db, "users", user_id, "buckets", bucket_id),
      {
        phrases: {
          ...oldPhrases,
          [phrase_id]: {
            ...oldPhrases[phrase_id],
            included: false,
          },
        },
      },
      { merge: true }
    );
  };
  return {
    addPhraseToBucket,
    removePhraseFromBucket,
    bucket,
    bucketPhrases,
  };
};
