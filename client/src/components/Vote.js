import { Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';
import Web3 from 'web3';
import { getIds, getVotacion } from '../API_smartContract/votar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Route, useHistory } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import { addVotacion } from '../redux/actions';
import Spinner from './Spinner';

let __index = 0;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export const RenderVotes = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [votaciones, setVotaciones] = React.useState([]);
  // const [isExecutable, setIsExecutable] = React.useState([]);
  const [nombre, setNombre] = React.useState([]);
  const [votacionData, setVotacionData] = React.useState([]);
  const [id, setId] = React.useState([]);
  const regex = '\\s*\\b0\\b\\s*';
  let proposal = [];
  let proposalData = [];
  let candidatosUtf8 = [];
  let handleClick = 0;
  let isExecutable = false;
  console.log(history);
  React.useEffect(() => {
    handleClick = async (index) => {
      try {
        //get data things
        proposalData = await getVotacion(index);
        if (proposalData.length != 0) {
          proposalData.name = Web3.utils.hexToAscii(proposalData.name);
          let _candidatos = [];
          proposalData.candidatos.forEach((candidato) =>
            _candidatos.push(Web3.utils.hexToAscii(candidato))
          );
          proposalData.candidatos = _candidatos;
          setVotacionData(proposalData);
          //Votacion => Redux
          add_Votacion(proposalData);
          //Router things
          history.push('/votar');
        }
      } catch (err) {
        console.log(err);
      }
      // history.push('/votacionDetalle');
      return proposalData;
    };
  });
  const add_Votacion = (votacionData) => dispatch(addVotacion(votacionData));

  React.useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        isExecutable = true;
        proposal = await getIds();

        if (proposal.length != 0) {
          setVotaciones(proposal);
          console.log(
            '🚀 ~ file: Vote.js ~ line 94 ~ fetchData ~ proposal',
            proposal
          );
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
      return proposal;
    }

    fetchData().then((result) => result.forEach((elem) => setNombre(elem)));

    console.log(__index);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner className={classes.root} />
      ) : (
        <>
          {votaciones.map((votacion, index) => (
            <div>
              <Grid spacing={1} direction="row">
                <Card className={classes.root}>
                  <CardActionArea
                    onClick={(event) => {
                      handleClick(index);
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {votacion}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
