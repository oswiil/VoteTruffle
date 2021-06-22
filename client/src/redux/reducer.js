import {
  ADD_DATES,
  ADD_DEBATE,
  ADD_NOMBRE,
  ADD_CANDIDATOS,
  ADD_ACCOUNTS,
  ADD_CONTRACT,
  ADD_VOTACION,
  ADD_VOTO,
  ADD_Web3,
} from './types';

const initialState = {};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_NOMBRE:
      return { ...state, name: action.data };

    case ADD_DATES:
      return { ...state, dates: action.date };

    case ADD_DEBATE:
      return { ...state, debate: action.data };

    case ADD_CANDIDATOS:
      return { ...state, candidatos: action.data };

    case ADD_ACCOUNTS:
      return { ...state, accounts: action.data };

    case ADD_CONTRACT:
      return { ...state, contract: action.data };

    case ADD_VOTACION:
      return { ...state, votacion: action.data };
    case ADD_VOTO:
      return { ...state, voto: action.data };

    case ADD_Web3:
      return { ...state, web3: action.data };
    default:
      return state;
  }
}
