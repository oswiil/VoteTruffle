import React from 'react';
import Card from '@material-ui/core/Card';
import Radio from '@material-ui/core/Radio';
import Candidatos from './Candidatos';
import { useDispatch, useSelector } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { getData } from '../API_smartContract/votar';

export default async function Vote() {
  // const [selectedValue, setSelectedValue] = React.useState('a');
  // const candidatos = useSelector((state) => state.candidatos);
  const candidatos = await getData();
  console.log('candidatos', candidatos);
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <Card>
      <CardContent>
        {candidatos.map((item) => (
          <CardActionArea key={item.id}>
            <CardContent>{item}</CardContent>
          </CardActionArea>
        ))}
      </CardContent>
    </Card>
  );
}
