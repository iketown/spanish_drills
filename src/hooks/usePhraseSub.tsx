import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { db } from "~/utils/firebase/clientApp";
import { useBucketFxns } from "./useBucketFxns";
import { useToast } from "./useToast";

export const usePhraseSub = () => {
  const { user_id } = useAuthCtx();
  const { toast } = useToast();
  const [phrases, setPhrases] = useState<{ [phrase_id: string]: Phrase }>({});

  useEffect(() => {
    if (!user_id) {
      return;
    }
    console.log("getting all phrases");
    const unsub = onSnapshot(
      query(collection(db, "users", user_id, "phrases")),
      (snap) => {
        const updates: { [phrase_id: string]: Phrase } = {};
        if (snap.empty) console.log("SNAP EMPTY");
        snap.docChanges().forEach(({ doc }) => {
          const phrase = doc.data() as Phrase;
          updates[doc.id] = { ...phrase, id: doc.id };
        });
        setPhrases((old) => ({ ...old, ...updates }));
      }
    );
    return unsub;
  }, [user_id]);

  return { phrases };
};
