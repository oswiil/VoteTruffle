import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function InsertLink() {
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Codigo de votacion"
        variant="outlined"
      />
      <Button variant="contained">Entrar</Button>
    </div>
  );
}
