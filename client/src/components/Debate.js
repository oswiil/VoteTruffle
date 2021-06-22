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
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        value={debate}
        onChange={(event) => add_Debate(event.target.value)}
      />
    </>
  );
}
