import { doc, setDoc, deleteField } from "firebase/firestore";
import invariant from "tiny-invariant";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { useUserCtx } from "~/contexts/UserCtx";
import { db } from "~/utils/firebase/clientApp";
import { nanoid } from "nanoid";

export const useTagFxns = () => {
  const { user_id } = useAuthCtx();
  const { userInfo } = useUserCtx();
  const getUserDoc = () => user_id && doc(db, "users", user_id);
  const createTag = (tagInfo: Tag) => {
    const userDoc = getUserDoc();
    if (!userDoc) return;

    return setDoc(
      userDoc,
      {
        myTags: {
          ...userInfo?.myTags,
          [tagInfo.tag_id]: tagInfo,
        },
      },
      { merge: true }
    );
  };
  const removeTag = (tag_id: string) => {
    const userDoc = getUserDoc();
    if (!userDoc) return;
    setDoc(
      userDoc,
      {
        myTags: { ...userInfo?.myTags, [tag_id]: deleteField() },
      },
      { merge: true }
    );
  };
  return { createTag, removeTag };
};
