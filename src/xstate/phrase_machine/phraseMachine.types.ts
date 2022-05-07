export interface PhraseMachineCtx {
  user_id: string;
  phrases: PhraseObj;
  phraseIds: string[];
  phraseIndex: number;
  currentPhrase: Phrase | null;
  currentPhraseId: string;
  answerText: string | null;
  answerStart: number;
  answerDuration: number;
  isCorrect: boolean;
}

export type PhraseMachineAction =
  | {
      type: "TEST";
      payload: {};
    }
  | {
      type: "LOAD_PHRASES";
      payload: {
        phrases: PhraseObj;
      };
    }
  | {
      type: "LOAD_USER";
      payload: { user_id: string };
    }
  | {
      type: "START_QUIZ";
    }
  | {
      type: "SUBMIT_ANSWER";
      payload: {
        answerText: string;
      };
    };
