import { useDispatch } from 'react-redux';
import BasicModal from '../components/MetamaskDialog';
import { addVotacion } from '../redux/actions';
import { init } from './contractConstRequirement';
import React from 'react';
import { TextField } from '@material-ui/core';
import Web3 from 'web3';
/**
 *
 * @param {*} nombre
 * @param {*} candidatos
 */
export async function crearVotacio(id, nombre, debate, candidatos) {
  const { web3, contract, accounts } = await init();
  const arrayHashCandidatos = [];
  candidatos.forEach((element) => {
    arrayHashCandidatos.push(web3.utils.asciiToHex(element));
    // console.log(accounts[0].toString());
    // console.log(element);
  });
  await contract.methods
    .crearVotacion(
      web3.utils.numberToHex(id),
      web3.utils.asciiToHex(nombre),
      web3.utils.asciiToHex(debate),
      arrayHashCandidatos
    )
    .send({
      from: accounts[0],
      gasPrice: '21000000000',
      gas: 350000,
      chainId: 1337,
      networkId: 1,
    });
}

export async function getVotacion(id) {
  console.log('🚀 ~ file: votar.js ~ line 37 ~ getVotacion ~ id', id);
  const { web3, contract, accounts } = await init();
  const idVotacion = Web3.utils.hexToNumber(id);
  const d = contract.methods.showVotacion(idVotacion).call({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 350000,
    chainId: 1337,
    networkId: 1,
  });
  return d;
}

export async function getIds() {
  const { web3, contract, accounts } = await init();
  const d = contract.methods.showIds().call({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 250000,
    chainId: 1337,
    networkId: 1,
  });
  return d;
}

export async function getNames() {
  const { web3, contract, accounts } = await init();
  const d = contract.methods.showNames().call({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 250000,
    chainId: 1337,
    networkId: 1,
  });
  return d;
}

export async function voteProposal(idVotacion, weigth) {
  const { web3, contract, accounts } = await init();
  const _idVotacion = web3.utils.numberToHex(idVotacion);
  const _weigth = web3.utils.numberToHex(weigth);
  await contract.methods.vote(_idVotacion, _weigth).send({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 650000,
    chainId: 1337,
    networkId: 1,
  });
}
/**
 export async function vote(votacion, opcion) {
  const { contract } = await init();
  await contract.methods.vote(votacion, opcion).call();
}*/
