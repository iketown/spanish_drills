import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useAuthCtx } from "~/contexts/AuthCtx";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/utils/firebase/clientApp";
import { useRouter } from "next/router";

const BucketForm = () => {
  const { user_id } = useAuthCtx();
  const [title, setTitle] = useState("");
  const { push } = useRouter();
  const handleSave = () => {
    if (!title || !user_id) return;
    const created_at = new Date().valueOf();
    const updated_at = created_at;
    addDoc(collection(db, "users", user_id, "buckets"), {
      created_at,
      updated_at,
      title,
    })
      .then(({ id }) => {
        push("/buckets/[bucket_id]/edit", `/buckets/${id}/edit`);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };
  return (
    <Card>
      <Typography sx={{ p: 2 }}>New Bucket</Typography>
      <CardContent>
        <TextField
          fullWidth
          label="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleSave}>
          Save & add words
        </Button>
      </CardActions>
    </Card>
  );
};

export default BucketForm;
