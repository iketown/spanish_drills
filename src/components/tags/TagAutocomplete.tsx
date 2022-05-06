import React, { useMemo } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { nanoid } from "nanoid";

import { useUserCtx } from "../../contexts/UserCtx";
import { JSONTree } from "react-json-tree";
import { useTagFxns } from "~/hooks/useTagFxns";
import { useEffect } from "react";

const filter = createFilterOptions<Tag>();

const createNewTagFromText = (tag_text: string) => {
  return {
    tag_id: nanoid(10),
    tag_text,
    created_at: new Date().valueOf(),
  };
};

interface TagAutocomplete {
  onTagChosen?: (tag_id: string) => void;
}

const TagAutocomplete: React.FC<TagAutocomplete> = ({ onTagChosen }) => {
  const [value, setValue] = React.useState<Tag | null>(null);
  const { createTag, removeTag } = useTagFxns();
  const { userInfo } = useUserCtx();
  const myTags = userInfo?.myTags;
  const userTags = useMemo(() => {
    return myTags
      ? Object.entries(myTags).map(([tag_id, tag]) => ({
          ...tag,
          tag_id,
        }))
      : [];
  }, [myTags]);

  useEffect(() => {
    if (!userInfo) return;
    if (value?.tag_id && !userInfo?.myTags[value?.tag_id]) {
      console.log("CREATING", value);
      createTag(value)?.then(() => {
        setValue(null);
      });
    }
  }, [value, userInfo?.myTags]);
  return (
    <>
      <Autocomplete
        value={value}
        onChange={async (event, newValue) => {
          let newTag;
          if (typeof newValue === "string") {
            newTag = createNewTagFromText(newValue);
            setValue(newTag);
          } else {
            newTag = newValue;
            setValue(newValue);
          }
          newTag && onTagChosen && onTagChosen(newTag.tag_id);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.tag_text
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push(createNewTagFromText(inputValue));
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={userTags}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          return option.tag_text;
        }}
        renderOption={(props, option) => <li {...props}>{option.tag_text}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => {
          return <TextField {...params} label="add tag" />;
        }}
      />
      {/* <JSONTree data={userTags} /> */}
    </>
  );
};

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}
export default TagAutocomplete;
