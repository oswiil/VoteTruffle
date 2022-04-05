import { Card } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';
import Web3 from 'web3';
import { getIds } from '../API_smartContract/votar';
import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';

// import { getVotacion } from '../API_smartContract/votar';
// const candidatos = await getVotacion();
// console.log("🚀 ~ file: Vote.js ~ line 6 ~ candidatos", candidatos)
// componentDidMount();
// {
//   this.RenderVotes();
// }
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 250,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
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
  const classes = useStyles();
  const theme = useTheme();
  const [votaciones, setVotaciones] = React.useState([]);
  const [nombre, setNombre] = React.useState([]);
  const [candidatos, setCandidatos] = React.useState([]);

  const [id, setId] = React.useState([]);
  const regex = '\\s*\\b0\\b\\s*';
  let proposal = [];
  let candidatosUtf8 = [];
  let w;

  React.useEffect(() => {
    async function fetchData() {
      try {
        proposal = await getIds();
        if (proposal.length != 0) {
          setVotaciones(proposal);
        }
      } catch (err) {
        console.log(err);
      }
      return proposal;
    }
    fetchData().then(
      (result) => result.forEach((elem) => setNombre(elem))
      // setNombre(

      //   Web3.utils.n(result),
      //   result.candidatos.forEach((elem) =>
      //     candidatosUtf8.push(Web3.utils.hexToUtf8(elem))
      //   ),
      // setCandidatos(candidatosUtf8)
    );
  }, []);

  return (
    <div>
      {votaciones.map((votacion) => (
        <div>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {votacion}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {candidatos.map((candidato) => (
                    <div>{candidato}</div>
                  ))}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
};
