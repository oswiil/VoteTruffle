import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import {
  Card,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { getVotesById } from '../API_smartContract/votar';
import { init } from '../API_smartContract/contractConstRequirement';
import { GridList } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ResultComponent() {
  const [loading, setLoading] = React.useState(false);
  const [] = React.useState();

  let history = useHistory();
  const [abstencion, setAbstencion] = React.useState([]);
  const [si, setSi] = React.useState([]);
  const [no, setNo] = React.useState([]);
  const [ganador, setWinner] = React.useState([]);
  const [adres, setAdress] = React.useState([]);
  const [max, setMax] = React.useState([]);
  const params = history.location.pathname;
  const addressess = [];
  let proposalData = [];
  let voti = 0;
  var regex = /\d+/g;
  var matches = params.match(regex);
  const indx = parseInt(matches[0], 10);

  React.useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        //get data things
        if (indx >= 0) {
          proposalData = await getVotesById(indx);
          const { accounts } = await init();
          setSi(proposalData.si);
          setNo(proposalData.no);
          setAbstencion(proposalData.abstencion);
          setMax(Math.max(...proposalData.map((obj) => obj)));
          addressess.push(accounts);
          setAdress(proposalData.addresses);

          if (
            proposalData.si > proposalData.no &&
            proposalData.si > proposalData.abstencion
          ) {
            setWinner('Sí, con ' + proposalData.si + ' votos');
          } else if (
            proposalData.no > proposalData.si &&
            proposalData.no > proposalData.abstencion
          ) {
            setWinner('No, con ' + proposalData.no + ' votos');
          } else if (
            proposalData.abstencion > proposalData.si &&
            proposalData.abstencion > proposalData.no
          ) {
            setWinner('Abstención, con ' + proposalData.abstencion + ' votos');
          } else {
            setWinner('Hay empate');
          }
        }
      } catch (err) {
        console.log(err);
      }

      return proposalData;
    }
    fetchResults();
  }, []);

  return (
    <div>
      <>
        <>
          <h2>Resultado mayoritario: {ganador}</h2>
          <Button style={{ float: 'left' }}>
            <ArrowBackIcon onClick={() => history.goBack()} />
          </Button>
          <TableContainer component={Paper}>
            <Card width={'50%'}>
              <div>
                Si:{si}{' '}
                <LinearProgress variant="determinate" value={parseInt(si)} />
              </div>

              <div>
                No:{no}
                <LinearProgress variant="determinate" value={parseInt(no)} />
              </div>
              <div>
                Abstencion:{abstencion}{' '}
                <LinearProgress
                  variant="determinate"
                  value={parseInt(abstencion)}
                ></LinearProgress>
              </div>
            </Card>

            <Table className={useStyles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Direcciones</TableCell>
                  <TableCell>Participantes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adres.map((item) => (
                  <TableRow key="Participantes">
                    <TableCell component="th" scope="row">
                      address
                    </TableCell>
                    <TableCell>{item}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </>
    </div>
  );
}
