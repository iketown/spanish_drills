import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { useUserCtx } from "~/contexts/UserCtx";
import { db } from "~/utils/firebase/clientApp";

export const useUserFxns = () => {
  const { user, user_id } = useAuthCtx();
  const { userInfo } = useUserCtx();
  console.log({ user });

  useEffect(() => {
    if (!user_id) return;
    if (user_id && !userInfo) {
      createBasicUser();
    }
  }, [user_id]);

  const createBasicUser = () => {
    console.log("creating basic user", user);
    if (!user || !user_id) return;
    const { displayName = "", email = "", uid } = user;
    setDoc(
      doc(db, "users", user_id),
      {
        displayName,
        email,
        user_id: uid,
      },
      { merge: true }
    );
  };
};
