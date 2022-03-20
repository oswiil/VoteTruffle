import { useDispatch } from 'react-redux';
import BasicModal from '../components/MetamaskDialog';
import { addVotacion } from '../redux/actions';
import { init } from './contractConstRequirement';
import React from 'react';
import { TextField } from '@material-ui/core';
/**
 *
 * @param {*} nombre
 * @param {*} candidatos
 */
export async function crearVotacio(nombre, candidatos) {
  const { web3, contract, accounts } = await init();
  const arrayHashCandidatos = [];
  candidatos.forEach((element) => {
    arrayHashCandidatos.push(web3.utils.asciiToHex(element));
    // console.log(accounts[0].toString());
    // console.log(element);
  });
  console.log(
    '🚀 ~ file: votar.js ~ line 20 ~ candidatos.forEach ~ candidatos',
    arrayHashCandidatos,
    web3.utils.asciiToHex(nombre)
  );

  await contract.methods
    .crearVotacion(web3.utils.asciiToHex(nombre), arrayHashCandidatos)
    .send({
      from: accounts[0],
      gasPrice: '21000000000',
      gas: 210000,
      chainId: 1337,
      networkId: 1,
    });
}

export async function getVotaciones() {
  const { web3, contract, accounts } = await init();
  console.log(
    '🚀 ~ file: votar.js ~ line 34 ~ getVotaciones ~ contract',
    contract
  );

  const d = contract.methods.showAllVotaciones().call({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 210000,
    chainId: 1337,
    networkId: 1,
  });
  console.log('🚀 ~ file: votar.js ~ line 59 ~ d ~ d', d);
  return d;
}

/**
 export async function vote(votacion, opcion) {
  const { contract } = await init();
  await contract.methods.vote(votacion, opcion).call();
}*/
