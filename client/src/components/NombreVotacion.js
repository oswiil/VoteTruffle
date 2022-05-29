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
      <h4>Rellenar datos votacion</h4>
      <TextField
        className=""
        id="outlined-basic"
        label="Nombre votacion"
        variant="outlined"
        value={nombre}
        fullWidth
        padding="5%"
        style={{ marginTop: 10, width: 700 }}
        rows={1}
        defaultValue="Propuesta 1"
        onChange={(event) => add_Nombre(event.target.value)}
      />
    </>
  );
}
