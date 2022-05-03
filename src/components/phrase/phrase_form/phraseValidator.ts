export const phraseValidator = (values: Partial<Phrase>) => {
  const errors: { [fieldName: string]: string } = {};
  if (!values.english) errors.english = "please add english cue";
  if (!values.spanish) errors.spanish = "please add spanish answer";
  return errors;
};
