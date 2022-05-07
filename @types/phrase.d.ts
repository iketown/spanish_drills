interface PhraseObj {
  [phrase_id: string]: Phrase;
}

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
  attempts?: AttemptLog;
}

interface WordEntry {
  word: string;
  optional?: boolean;
  alts?: string[];
}

interface AttemptLog {
  [timeKey: string]: AttemptRecord;
}

interface AttemptRecord {
  answerDuration: number;
  isCorrect: boolean;
  isFastest?: boolean;
  timeKey?: string;
}
