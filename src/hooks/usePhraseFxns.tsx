import {
  addDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { db } from "~/utils/firebase/clientApp";
import invariant from "tiny-invariant";

import { useBucketFxns } from "./useBucketFxns";
import { useToast } from "./useToast";

export const usePhraseFxns = () => {
  const { user_id } = useAuthCtx();
  const { toast } = useToast();

  const createPhrase = (phrase: Phrase) => {
    if (!user_id) {
      toast("must sign in first", "warning");
      return;
    }
    const created_at = new Date().valueOf();
    const updated_at = created_at;
    return addDoc(collection(db, "users", user_id, "phrases"), {
      ...phrase,
      created_at,
      updated_at,
    }).then(({ id }) => {
      console.log("add doc id", id);
      toast(`created: ${phrase.spanish}`);
      return id;
    });
  };
  const updatePhrase = ({
    phrase_id,
    phrase,
  }: {
    phrase_id: string;
    phrase: Phrase;
  }) => {
    if (!user_id) {
      toast("must sign in first", "warning");
      return;
    }
    invariant(!!phrase_id, "must pass phrase_id");
    return updateDoc(doc(db, "users", user_id, "phrases", phrase_id), {
      ...phrase,
    })?.then((response) => {
      console.log("update response", response);
      toast(`updated: ${phrase.spanish}`);
      return phrase;
    });
  };
  return { createPhrase, updatePhrase };
};
