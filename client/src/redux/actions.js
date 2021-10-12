import {
  ADD_DEBATE,
  ADD_NOMBRE,
  ADD_DATES,
  ADD_CANDIDATOS,
  ADD_CONTRACT,
  ADD_ACCOUNTS,
  ADD_VOTACION,
  ADD_Web3,
} from './types';

export const addDebate = (debate) => ({ type: ADD_DEBATE, data: debate });
export const addNombre = (nombre) => ({ type: ADD_NOMBRE, data: nombre });
export const addDates = (fechas) => ({ type: ADD_DATES, data: fechas });
export const addCandidato = (candidato) => ({
  type: ADD_CANDIDATOS,
  data: candidato,
});

export const addContract = (contract) => ({
  type: ADD_CONTRACT,
  data: contract,
});
export const addAccounts = (accounts) => ({
  type: ADD_ACCOUNTS,
  data: accounts,
});
export const addVotacion = (votacion) => {
  return {
    type: ADD_VOTACION,
    data: votacion,
  };
};
export const addWeb3 = (web3) => {
  return {
    type: ADD_Web3,
    data: web3,
  };
};
