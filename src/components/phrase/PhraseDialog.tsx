import React from "react";
import {
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  DialogActions,
  Card,
  Grid,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { Form, Field } from "react-final-form";
import FormDataView from "~/utils/FormDataView";
import { useState } from "react";
import PhraseForm from "./phrase_form/PhraseForm";

interface PhraseDialogI {
  open: boolean;
  handleClose: () => void;
}
const PhraseDialog: React.FC<PhraseDialogI> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <PhraseForm />
    </Dialog>
  );
};

export default PhraseDialog;
