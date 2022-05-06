import { Dialog } from "@mui/material";
import React from "react";
import PhraseForm from "./phrase_form/PhraseForm";

interface PhraseDialogI {
  open: boolean;
  handleClose: () => void;
  editingPhrase?: Phrase | null;
}
const PhraseDialog: React.FC<PhraseDialogI> = ({
  open,
  handleClose,
  editingPhrase,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <PhraseForm onCancel={handleClose} initialValues={editingPhrase} />
    </Dialog>
  );
};

export default PhraseDialog;
