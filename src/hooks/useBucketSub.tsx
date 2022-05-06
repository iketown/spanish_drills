import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { db } from "~/utils/firebase/clientApp";

export const useBucketSub = () => {
  const { user_id } = useAuthCtx();

  const [buckets, setBuckets] = useState<{ [bucket_id: string]: Bucket }>({});

  useEffect(() => {
    if (!user_id) return;
    const q = query(collection(db, "users", user_id, "buckets"));
    onSnapshot(q, (snap) => {
      const _newBuckets: { [bucket_id: string]: Bucket } = {};
      snap.docChanges().forEach(({ doc }) => {
        const data = doc.data() as Bucket;
        _newBuckets[doc.id] = { ...data, bucket_id: doc.id };
      });
      setBuckets((old) => ({ ...old, ..._newBuckets }));
    });
  }, [user_id]);

  return { buckets };
};
