interface StudentUserInfo {
  myTags: TagsObj;
}

interface TagsObj {
  [tag_id: string]: Tag;
}

interface Tag {
  tag_id: string;
  tag_text: string;
  created_at: number;
}
