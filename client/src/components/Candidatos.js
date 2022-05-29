import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import { addCandidato } from '../redux/actions';

const initList = [];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    p: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function () {
  const [name, setName] = React.useState('');
  const classes = useStyles();

  function handleAdd() {
    initList.push(name);
    setName('');
    add_Candidato(initList);
  }
  function handleReset() {
    setName('');
    initList.length = 0;
  }
  const dispatch = useDispatch();
  const add_Candidato = (candidato) => dispatch(addCandidato(candidato));

  return (
    <div>
      <h4>Campo Opcional. Si se quiere elegir candidatos.</h4>
      <TextField
        id="outlined-basic"
        label="Nombre de candidato"
        variant="outlined"
        style={{ marginTop: 10, width: 700 }}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <div>
        <Button onClick={handleAdd}>
          <AddIcon></AddIcon>Añadir
        </Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <ul>
        {initList.map((item) => (
          <Card className={classes.root} key={item.id}>
            {item}
          </Card>
        ))}
      </ul>
    </div>
  );
}
