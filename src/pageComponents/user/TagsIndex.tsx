import { Delete, DeleteOutline } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { JSONTree } from "react-json-tree";
import TagAutocomplete from "~/components/tags/TagAutocomplete";
import { useUserCtx } from "~/contexts/UserCtx";
import { useTagFxns } from "~/hooks/useTagFxns";
import Layout from "~/layout/Layout";

const TagsIndex = () => {
  const { userInfo } = useUserCtx();
  const { removeTag } = useTagFxns();
  return (
    <Layout>
      TagsIndex
      <List>
        {userInfo?.myTags &&
          Object.entries(userInfo.myTags).map(([tag_id, tag]) => {
            return (
              <ListItem divider key={tag_id}>
                <ListItemText primary={tag.tag_text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      removeTag(tag_id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        <ListItem>
          <TagAutocomplete
            onTagChosen={(tag_id) => console.log("new tag chosen", tag_id)}
          />
        </ListItem>
      </List>
      <JSONTree data={userInfo} />
    </Layout>
  );
};

export default TagsIndex;
