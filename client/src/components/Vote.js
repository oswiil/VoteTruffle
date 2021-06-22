import React from 'react';

import Radio from '@material-ui/core/Radio';
import Candidatos from './Candidatos';

import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

export default function Vote() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Radio
      checked={selectedValue === 'a'}
      onChange={handleChange}
      value="a"
      name="radio-button-demo"
      inputProps={{ 'aria-label': 'A' }}
    >
      {Candidatos.map((item) => (
        <CardActionArea key={item.id}>
          <CardContent>{item.name}</CardContent>
        </CardActionArea>
      ))}
    </Radio>
  );
}
