//MATERIAL UI
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import MaterialUIPickers from './DatePicker';

//COMPONENTES
import InsertarCandidato from './Candidatos';
import Debate from './Debate';
import NombreVotacion from './NombreVotacion';

//REDUX
import { useDispatch, useSelector } from 'react-redux';

import { addVotacion } from '../redux/actions';

import { selectDebate } from '../selectors';

//CONTRACT FUNCTIONS

import { crearVotacio } from '../API_smartContract/votar';

let votacion = [];

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

const useStyles1 = makeStyles({
  root: {
    maxWidth: 345,
    alignContent: 1,
  },
  media: {
    height: 140,
  },
});

function getSteps() {
  return [
    'Nombre de la votación',
    'Fecha de publicación',
    'Debate',
    'Opciones',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <NombreVotacion></NombreVotacion>;
    case 1:
      return <MaterialUIPickers />;
    case 2:
      return <Debate></Debate>;
    case 3:
      return <InsertarCandidato />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function Steps() {
  const [list, setList] = React.useState(votacion);

  const classes = useStyles();
  const classes1 = useStyles1();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  //PARA MOSTRAR DATOS DE VOTACIÓN CON HOOKS
  const nombre = useSelector((state) => state.name);
  const fecha = useSelector((state) => state.dates);
  const candidatos = useSelector((state) => state.candidatos);
  votacion = useSelector((state) => state.votacion);

  const dispatch = useDispatch();
  const handleNext = () => {
    if (activeStep !== 4) {
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
  const add_Votacion = (votacion) => dispatch(addVotacion(votacion));

  const handleClick = async () => {
 
    /**votacion = [nombre, votecount, select, selectDebate];
    if (!list.filter(nombre).length > 0) list.push({ votacion });**/

    setList(list);
    //setName('');
    add_Votacion(list);
    await crearVotacio(nombre, candidatos);
    console.log('crear votacion');
  };

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

            <Card className={classes1.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                ></Typography>
                <Typography variant="h5" component="h2">
                  {nombre}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {fecha}
                </Typography>
                <Typography>{selectDebate}</Typography>
                Candidatos
                {candidatos.map((item) => (
                  <CardActionArea className={classes1.root} key={item.id}>
                    <CardContent>{item.name}</CardContent>
                  </CardActionArea>
                ))}
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>

            <Button variant="contained" color="primary" onClick={handleClick}>
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
