import invariant from "tiny-invariant";
import { ConditionPredicate } from "xstate";
import type {
  PhraseMachineCtx,
  PhraseMachineAction,
} from "./phraseMachine.types";

type PhraseGuard = ConditionPredicate<PhraseMachineCtx, PhraseMachineAction>;

const phraseIsLoaded: PhraseGuard = (ctx, evt) => {
  const currentPhrase = ctx.currentPhrase;
  return !!currentPhrase;
};

const phraseIsMissing: PhraseGuard = (ctx, evt, meta) =>
  !phraseIsLoaded(ctx, evt, meta);

const answerIsCorrect: PhraseGuard = (ctx, evt) => {
  invariant(evt.type === "SUBMIT_ANSWER");
  const { answerText } = evt.payload;
  const { currentPhrase } = ctx;
  invariant(currentPhrase, "no phrase loaded :/");
  const missingWords = currentPhrase.sp_words.filter((word) => {
    if (!!word.optional) return false;
    if (answerText.includes(word.word)) return false;
    if (word.alts?.find((altWord) => answerText.includes(altWord))) {
      return false;
    }
    return true;
  });
  return !missingWords.length;
};
const userLoaded: PhraseGuard = (ctx) => !!ctx.user_id;
export const guards = {
  phraseIsLoaded,
  phraseIsMissing,
  answerIsCorrect,
  userLoaded,
};
