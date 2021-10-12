import React from 'react';
import { TextField } from '@material-ui/core';
import { init } from '../API_smartContract/contractConstRequirement';

export default async function () {
  const { web3, contract, accounts } = await init();

  return (
    <>
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        value={contract}
      />
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        value={web3}
      />
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        value={accounts}
      />
    </>
  );
}
