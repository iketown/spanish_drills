import { createContext, useContext } from "react";
import { usePhraseFxns } from "~/hooks/usePhraseFxns";
import { usePhraseSub } from "~/hooks/usePhraseSub";
interface PhraseCtxI {
  phrases: {
    [phrase_id: string]: Phrase;
  };
}

const PhraseCtx = createContext({} as PhraseCtxI);

export const PhraseCtxProvider: React.FC = ({ children }) => {
  const { phrases } = usePhraseSub();
  return (
    <PhraseCtx.Provider value={{ phrases }}>{children}</PhraseCtx.Provider>
  );
};

export const usePhraseCtx = () => useContext(PhraseCtx);
