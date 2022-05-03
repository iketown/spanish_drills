import { useSnackbar } from "notistack";

export const useToast = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const toast = (
    text: string,
    variant?: "default" | "success" | "error" | "warning" | "info"
  ) => {
    enqueueSnackbar(text, { variant });
  };
  return { toast };
};
