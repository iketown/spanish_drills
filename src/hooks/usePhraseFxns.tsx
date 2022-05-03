import { db } from "~/utils/firebase/clientApp";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { useToast } from "./useToast";

export const usePhraseFxns = () => {
  const { user, user_id } = useAuthCtx();
  const { toast } = useToast();
  const createPhrase = (phrase: Phrase) => {
    if (!user_id) {
      toast("must sign in first", "warning");
      return;
    }
    const created_at = new Date().valueOf();
    const updated_at = created_at;
    return addDoc(collection(db, "phrases"), {
      ...phrase,
      user_id,
      created_at,
      updated_at,
    }).then(({ id }) => {
      console.log("add doc id", id);
      toast(`created: ${phrase.spanish}`);
      return id;
    });
  };
  return { createPhrase };
};
