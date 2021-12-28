import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { addNombre } from '../redux/actions';

export default function (nombre, add_Nombre) {
  //const nombre = useSelector((state) => state.name);
  const dispatch = useDispatch();
  add_Nombre = (name) => dispatch(addNombre(name));
  nombre = useSelector((state) => state.name);
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Descripcion"
        variant="outlined"
        value={nombre}
        onChange={(event) => add_Nombre(event.target.value)}
      />
    </>
  );
}
