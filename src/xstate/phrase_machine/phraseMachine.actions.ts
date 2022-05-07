import { assign } from "xstate";
import type { AssignAction } from "xstate";
import invariant from "tiny-invariant";

import type {
  PhraseMachineAction,
  PhraseMachineCtx,
} from "./phraseMachine.types";
type PhraseAssign = AssignAction<PhraseMachineCtx, PhraseMachineAction>;

const whatever: PhraseAssign = assign((ctx, evt) => {
  return ctx;
});
const loadUser: PhraseAssign = assign((ctx, evt) => {
  invariant(evt.type === "LOAD_USER");
  return { ...ctx, user_id: evt.payload.user_id };
});
const loadPhrases: PhraseAssign = assign((ctx, evt) => {
  invariant(evt.type === "LOAD_PHRASES");
  const { phrases } = evt.payload;
  return { ...ctx, phrases };
});
const shuffle: PhraseAssign = assign((ctx, evt) => {
  const phraseIds =
    ctx.phrases && Object.keys(ctx.phrases).sort(() => Math.random() - 0.5);
  console.log("shuffled", phraseIds);
  return { ...ctx, phraseIds };
});
const loadPhrase: PhraseAssign = assign((ctx, evt) => {
  const { phraseIds, phraseIndex, phrases } = ctx;
  const answerStart = new Date().valueOf();
  const currentPhraseId = phraseIds[phraseIndex];
  const currentPhrase = phrases[currentPhraseId];
  return { ...ctx, currentPhrase, currentPhraseId, answerStart };
});
const recordAnswer: PhraseAssign = assign((ctx, evt) => {
  invariant(evt.type === "SUBMIT_ANSWER");
  const endTime = new Date().valueOf();
  const { answerStart } = ctx;
  const answerDuration = endTime - answerStart;
  const { answerText } = evt.payload;
  return { ...ctx, answerText, answerDuration };
});

const recordSuccess: PhraseAssign = assign((ctx) => ({
  ...ctx,
  isCorrect: true,
}));
const recordFail: PhraseAssign = assign((ctx) => ({
  ...ctx,
  isCorrect: false,
}));
const addPhraseToEndOfQueue: PhraseAssign = assign((ctx) => {
  const { currentPhraseId, phraseIds } = ctx;
  return { ...ctx, phraseIds: [...phraseIds, currentPhraseId] };
});
const incrementPhrase: PhraseAssign = assign((ctx) => {
  const { phraseIndex } = ctx;
  return { ...ctx, phraseIndex: phraseIndex + 1 };
});
const resetInfo: PhraseAssign = assign((ctx) => {
  return {
    ...ctx,
    answerText: "",
    answerDuration: 0,
    isCorrect: false,
  };
});

export const actions = {
  loadUser,
  loadPhrases,
  shuffle,
  loadPhrase,
  recordAnswer,
  incrementPhrase,
  resetInfo,
  recordSuccess,
  recordFail,
  addPhraseToEndOfQueue,
};
