import React, { useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Popover } from "@mui/material";
import { Add } from "@mui/icons-material";

interface WordAlternatesI {
  onChange: (alternates: string[]) => void;
  savedAlts: string[];
  mainWord: string;
}

const WordAlternates: React.FC<WordAlternatesI> = ({
  savedAlts,
  onChange,
  mainWord,
}) => {
  const [alternates, setAlternates] = useState<string[]>(savedAlts);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [text, setText] = useState("");
  const open = !!anchorEl;
  const handleSave = () => {
    const newAlts = [...alternates, text];
    onChange(newAlts);
    setAlternates(newAlts);
    setText("");
    setAnchorEl(null);
  };
  const handleDelete = (alt: string) => {
    const newAlts = alternates.filter((word) => word !== alt);
    setAlternates(newAlts);
    onChange(newAlts);
  };
  const id = open ? "simple-popover" : undefined;
  return (
    <Box>
      {alternates?.map((alt, i) => (
        <Chip key={alt + i} label={alt} onDelete={() => handleDelete(alt)} />
      ))}
      <Chip
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        icon={<Add />}
      />
      {!!anchorEl && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Stack sx={{ p: 1 }} spacing={1}>
            <TextField
              fullWidth
              label={`alternate for ${mainWord}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Box>
              <Button variant="outlined" fullWidth onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Stack>
        </Popover>
      )}
    </Box>
  );
};

export default WordAlternates;
