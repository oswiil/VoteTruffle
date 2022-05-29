import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { selectDebate, selectNombre, selectVotacion } from '../selectors';
import { useSelector } from 'react-redux';
import { ButtonGroup, Card } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { getVotacion, voteProposal } from '../API_smartContract/votar';
import Web3 from 'web3';
import Spinner from './Spinner';
export default function RadioButtonChoice() {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [] = React.useState();
  const [helperText, setHelperText] = React.useState('Choose wisely');
  let history = useHistory();
  const [votacion, setVotacion] = React.useState([]);
  const [nombre, setNombre] = React.useState([]);
  const [candidatos, setCandidatos] = React.useState([]);
  const [debate, setDebate] = React.useState([]);
  const params = history.location.pathname;
  // params.get();
  let proposalData = [];
  let voti = 0;
  var regex = /\d+/g;
  var matches = params.match(regex);
  const indx = parseInt(matches[0], 10);

  React.useEffect(() => {
    async function fetchNames() {
      setLoading(true);
      try {
        //get data things
        if (indx >= 0) {
          proposalData = await getVotacion(indx);

          proposalData.name = Web3.utils.hexToAscii(proposalData.name);
          let _candidatos = [];
          proposalData.candidatos.forEach((candidato) =>
            _candidatos.push(Web3.utils.hexToAscii(candidato))
          );
          proposalData.candidatos = _candidatos;
          // idVotacion = proposalData.id;
          proposalData.debate = Web3.utils.hexToAscii(proposalData.debate);

          setLoading(false);
          setVotacion(proposalData);
          setNombre(proposalData.name.replaceAll('\u0000', ''));
          setCandidatos(proposalData.candidatos);
          setDebate(proposalData.debate);
        }
      } catch (err) {
        console.log(err);
      }
      // history.push('/votacionDetalle');
      return proposalData;
    }
    fetchNames();
  }, []);

  const handleRadioChange = (event) => {
    let iyear = parseInt(event.target.value, 10);
    setValue(iyear);

    console.log('value', event.target.value);
    setHelperText(' ');
    setError(false);
    console.log('evvent', event);
  };

  const handleSubmit = async () => {
    console.log('event', value);
    async function voteGo() {
      try {
        await voteProposal(indx, value);
      } catch (err) {
        console.log(err);
      }
    }
    voteGo().then(history.push(`/resultados/${indx}`));
    console.log('HAS VOTADO');

    setHelperText('Has votado!');
    setError(false);
    // } else if (value === 'worst') {
    //   setHelperText('Sorry, wrong answer!');
    //   setError(true);
    // } else {
    //   setHelperText('Please select an option.');
    //   setError(true);
    // }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <>
            <Button style={{ float: 'left' }}>
              <ArrowBackIcon onClick={() => history.goBack()} />
            </Button>
            <Card>
              <h1>{nombre}</h1>
              {/* <form onSubmit={handleClick(value)}> */}
              <FormControl sx={{ m: 3 }} error={error} variant="standard">
                <h4>Informacion de la propuesta</h4>
                <FormLabel>{debate}</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-error-radios"
                  name="candidato"
                  value={value}
                  onChange={handleRadioChange}
                >
                  {candidatos.map((item, index) => (
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={item.replaceAll('\u0000', '')}
                    />
                  ))}

                  <FormHelperText>{helperText}</FormHelperText>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="submit"
                    variant="outlined"
                    onClick={() => handleSubmit()}
                  >
                    VOTE
                  </Button>
                </RadioGroup>
              </FormControl>
              {/* </form> */}
            </Card>
          </>
        </>
      )}
    </div>
  );
}
