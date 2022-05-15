//MATERIAL UI
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Spinner from './Spinner';
import MaterialUIPickers from './DatePicker';
//COMPONENTES
import InsertarCandidato from './Candidatos';
import Debate from './Debate';
import NombreVotacion from './NombreVotacion';

//REDUX
import { useDispatch, useSelector } from 'react-redux';

import { selectDebate } from '../selectors';

//CONTRACT FUNCTIONS

import { crearVotacio, getIds } from '../API_smartContract/votar';
import { addIndex } from '../redux/actions';
import { ListItem } from '@material-ui/core';

let votacion = [];
let id = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Nombre de la votación', 'Debate', 'Opciones'];
}
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <NombreVotacion></NombreVotacion>;
    case 1:
      return <Debate></Debate>;
    case 2:
      return <InsertarCandidato />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function Steps() {
  const [list, setList] = React.useState(votacion);
  const index = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //PARA MOSTRAR DATOS DE VOTACIÓN CON HOOKS
  const nombre = useSelector((state) => state.name);

  const fecha = useSelector((state) => state.dates);
  const candidatos = useSelector((state) => state.candidatos);
  const debate = useSelector((state) => state.debate);

  const [loading, setLoading] = useState(false);

  votacion = useSelector((state) => state.votacion);

  const handleNext = () => {
    if (activeStep !== 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = async (candidatos) => {
    /**votacion = [nombre, votecount, select, selectDebate];
    if (!list.filter(nombre).length > 0) list.push({ votacion });**/

    setList(list);
    //setName('');
    setLoading(true);
    let totalVotaciones = await getIds();
    let id = totalVotaciones.length;

    await crearVotacio(id, nombre, debate, candidatos);

    setLoading(false);
  };
  console.log('🚀 ~ file: Stepper.js ~ line 123 ~ handleClick ~ id', id);
  console.log('🚀 ~ file: Stepper.js ~ line 123 ~ handleClick ~ id', nombre);
  console.log(
    '🚀 ~ file: Stepper.js ~ line 123 ~ handleClick ~ id',
    candidatos
  );
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <>
        {activeStep === steps.length ? (
          <>
            <Typography className={classes.instructions}>
              Todos los pasos completados
            </Typography>

            <Card variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h5" component="h2">
                  {nombre}
                </Typography>
                <Typography>{debate}</Typography>
                Candidatos
                {candidatos.map((item) => (
                  <CardActionArea key={item.id}>
                    <CardContent>{item}</CardContent>
                  </CardActionArea>
                ))}
              </CardContent>
            </Card>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick(candidatos)}
            >
              Enviar votación
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </>
          </>
        )}
      </>
    </div>
  );
}
