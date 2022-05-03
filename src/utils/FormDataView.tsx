import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";
import { JSONTree } from "react-json-tree";

interface FormDataViewI {
  data: any;
}

const FormDataView: React.FC<FormDataViewI> = ({ data }) => {
  const [dataOpen, setDataOpen] = useState(false);

  return (
    <>
      <Drawer
        open={dataOpen}
        onClose={() => setDataOpen(false)}
        sx={{ minWidth: "50vw" }}
      >
        FormDataView hey hi hello
        <JSONTree data={data} />
      </Drawer>
      <Button
        variant={dataOpen ? "outlined" : "contained"}
        color="info"
        size="small"
        onClick={() => setDataOpen((o) => !o)}
      >
        data
      </Button>
    </>
  );
};

export default FormDataView;
