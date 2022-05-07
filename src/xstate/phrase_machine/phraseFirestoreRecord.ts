import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "~/utils/firebase/clientApp";
import { PhraseMachineCtx, PhraseMachineAction } from "./phraseMachine.types";

export const fsRecord = (ctx: PhraseMachineCtx, evt: PhraseMachineAction) => {
  const { answerStart, answerDuration, isCorrect, user_id, currentPhraseId } =
    ctx;
  let update = {
    [`attempts.${answerStart}`]: {
      answerDuration,
      isCorrect,
    },
  };

  return updateDoc(
    doc(db, "users", user_id, "phrases", currentPhraseId),
    update
  );
};
