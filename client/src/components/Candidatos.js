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
      <TextField
        id="outlined-basic"
        label="Codigo de votacion"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <Button variant="contained" onClick={handleAdd}>
        <AddIcon></AddIcon>Añadir
      </Button>

      <Button variant="contained" onClick={handleReset}>
        <AddIcon></AddIcon>Reset
      </Button>
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
