import React, { Component } from 'react';
//import SimpleStorageContract from './contracts/SimpleStorage.json';
import Urnas from './contracts/Urnas.json';
import getWeb3 from './getWeb3';

import './App.css';
import { useSelector } from 'react-redux';
import { selectCandidatos, selectDebate, selectNombre } from './selectors';

function candidatos() {
  // Rule 2: call hooks in function component

  const candidatos = selectCandidatos; // Rule 1: call hooks in top-level
  return (
    <>
      <>{candidatos}</>
    </>
  );
}

function name() {
  const nombre = selectNombre;
  return { nombre };
}
let votacionCreada = [];
export default class Wallet extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    votacion: null,
    nombre: null,
    debate: null,
    candidatos: null,
  };

  componentDidMount = async () => {
    let candida = candidatos();
    let nombe = name();
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      const deployedNetwork = Urnas.networks[networkId];
      const instance = new web3.eth.Contract(
        Urnas.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          candidatos: candida,
          nombre: nombe,
        },
        this.runExample
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract, candidatos, debate, nombre, web3 } = this.state;
    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    const voteCount = 0;

    // const votacion = useSelector((state) => state.votacion);
    const votacion = await contract.methods
      .crearVotacion(
        web3.utils.asciiToHex(nombre),
        web3.utils.toBN(voteCount),
        candidatos,
        web3.utils.asciiToHex(debate)
      )
      .send({ from: accounts[0] });
    alert('se ha llamado a la funcion');

    const response = await contract.methods
      .getCandidatos(votacion.nombre)
      .call();
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}
