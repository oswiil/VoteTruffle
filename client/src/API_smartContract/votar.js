import { init } from '../API_smartContract/contractConstRequirement';

/**
 *
 * @param {*} nombre
 * @param {*} candidatos
 */
export async function crearVotacio(nombre, candidatos) {
  const { web3, contract, accounts } = await init();
  console.log(accounts[0].toString());
  alert('se ha llamado a la funcion');
  await contract.methods
    .crearVotacion(
      web3.utils.asciiToHex(nombre),
      web3.utils.asciiToHex(candidatos)
    )
    .send({ from: accounts[0] })
    .then(function (receipt) {
      // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    });
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
