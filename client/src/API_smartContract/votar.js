import BasicModal from '../components/MetamaskDialog';
import { init } from './contractConstRequirement';

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
    console.log(accounts[0].toString());
    console.log(element);
  });

  await contract.methods
    .crearVotacion(web3.utils.asciiToHex(nombre), arrayHashCandidatos)
    .send({ from: accounts[0] });
}

export async function getVotacion() {
  const { contract } = await init();
  return await contract.methods.getCandidatos().call();
}

/**
 export async function vote(votacion, opcion) {
  const { contract } = await init();
  await contract.methods.vote(votacion, opcion).call();
}*/
