import React from "react";
import TagAutocomplete from "./TagAutocomplete";

import { useField } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Box } from "@mui/material";
import { useUserCtx } from "~/contexts/UserCtx";

const TagFormSection = () => {
  const { input, meta } = useField("tags");
  const { userInfo } = useUserCtx();

  const handleChooseTag = (tag_id: string) => {
    const old = input.value || [];
    const newTagArray = Array.from(new Set([...old, tag_id]));
    input.onChange(newTagArray);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <TagAutocomplete onTagChosen={handleChooseTag} />
      <pre>{JSON.stringify(input.value, null, 2)}</pre>
    </Box>
  );
};

export default TagFormSection;
