import React from "react";
import TagAutocomplete from "./TagAutocomplete";

import { useField } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { Box } from "@mui/material";

const TagFormSection = () => {
  const { input, meta } = useField("tags");
  const handleChooseTag = (tag_id: string) => {
    const old = input.value || [];
    input.onChange(Array.from(new Set([...old, tag_id])));
    // add tag_id to array
    // update array
  };
  return (
    <Box sx={{ display: "flex" }}>
      <TagAutocomplete onTagChosen={handleChooseTag} />
      <pre>{JSON.stringify(input.value, null, 2)}</pre>
    </Box>
  );
};

export default TagFormSection;
