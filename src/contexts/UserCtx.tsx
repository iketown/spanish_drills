import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { db } from "~/utils/firebase/clientApp";
import { useAuthCtx } from "./AuthCtx";

interface UserCtxI {
  userInfo?: StudentUserInfo;
}
const UserCtx = createContext<UserCtxI>({} as UserCtxI);

export const UserCtxProvider: React.FC = ({ children }) => {
  const { user_id } = useAuthCtx();
  const [userInfo, setUserInfo] = useState<StudentUserInfo>();
  useEffect(() => {
    if (!user_id) return;
    const unsub = onSnapshot(doc(db, "users", user_id), (snap) => {
      const _userInfo = snap.data() as StudentUserInfo;
      setUserInfo(_userInfo);
    });
    return unsub;
  }, [user_id]);

  return <UserCtx.Provider value={{ userInfo }}>{children}</UserCtx.Provider>;
};

export const useUserCtx = () => useContext(UserCtx);
