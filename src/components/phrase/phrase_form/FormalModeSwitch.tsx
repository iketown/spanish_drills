import React from "react";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";
import { useField } from "react-final-form";

const FormalModeSwitch = () => {
  const { input, meta } = useField("formal");
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={input.value}
            onChange={(e, chk) => {
              input.onChange(chk);
            }}
          />
        }
        label={input.value ? "Formal" : "Informal"}
      />
      {/* <FormControlLabel disabled control={<Switch />} label="Disabled" /> */}
    </FormGroup>
  );
};

export default FormalModeSwitch;
