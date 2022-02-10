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
    // console.log(accounts[0].toString());
    // console.log(element);
  });

  await contract.methods
    .crearVotacion(web3.utils.asciiToHex(nombre), arrayHashCandidatos)
    .send({
      from: accounts[0],
      gasPrice: '21000000000',
      gas: 210000,
      chainId: 1,
      networkId: 1,
    });
}

export async function getData() {
  const { contract, accounts } = await init();
  return await contract.methods.getData().send({
    from: accounts[0],
    gasPrice: '21000000000',
    gas: 2100000,
    chainId: 1,
    networkId: 1,
  });
}

/**
 export async function vote(votacion, opcion) {
  const { contract } = await init();
  await contract.methods.vote(votacion, opcion).call();
}*/
