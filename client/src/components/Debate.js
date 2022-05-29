import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import { addDebate } from '../redux/actions';
import { selectDebate } from '../selectors';

export default function () {
  const dispatch = useDispatch();
  const add_Debate = (debate) => dispatch(addDebate(debate));

  const debate = useSelector(selectDebate);
  return (
    <>
      <TextField
        className=""
        id="outlined-basic"
        label="Nombre votacion"
        defaultValue="Esto es una propuesta"
        variant="outlined"
        fullWidth
        padding="5%"
        multiline
        style={{ marginTop: 10, width: 700 }}
        rows={8}
        value={debate}
        onChange={(event) => add_Debate(event.target.value)}
      />
    </>
  );
}
