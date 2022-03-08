import * as React from 'react';
import { useSelector } from 'react-redux';
import { getVotaciones } from '../API_smartContract/votar';

// import { getVotaciones } from '../API_smartContract/votar';
// const candidatos = await getVotaciones();
// console.log("🚀 ~ file: Vote.js ~ line 6 ~ candidatos", candidatos)
// componentDidMount();
// {
//   this.RenderVotes();
// }

export const RenderVotes = () => {
  // try {

  // this will re render the view with new data
  // this.setState({
  //   Votes: _candidatos,
  // });0
  // } catch (err) {
  //   console.log('🚀 ~ file: Vote.js ~ line 13 ~ RenderVotes ~ err', err);
  // }
  // const candidatos = useSelector((state) => state.candidatos);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  const [votaciones, setVotaciones] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const _candidatos = await getVotaciones();

        console.log(
          '🚀 ~ file: Vote.js ~ line 30 ~ RenderVotes ~ votaciones',
          _candidatos
        );
        setVotaciones(_candidatos);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return <>{votaciones}</>;
};
