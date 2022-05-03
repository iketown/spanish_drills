interface Phrase {
  id: string;
  user_id: string;
  updated_at: number;
  created_at: number;
  spanish: string;
  english: string;
  helper_info?: string;
  formal?: boolean;
  sp_words: WordEntry[];
}

interface WordEntry {
  word: string;
  optional?: boolean;
}
