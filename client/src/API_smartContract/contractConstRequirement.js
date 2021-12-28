import Urnas from '../contracts/Urnas.json';
import Web3 from 'web3';

const initWeb3 = async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.

  // Modern dapp browsers...
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      window.ethereum.request({ method: 'eth_requestAccounts' });
      // Acccounts now exposed
      return web3;
    } catch (error) {
      throw error;
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(window.ethereum);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
};
let web3;
const getWeb3 = async () => {
  if (!web3) web3 = await initWeb3();
  return web3;
};

let contract;
const getContract = async () => {
  if (!contract) {
    const networkId = await web3.eth.net.getId();
    const network = Urnas.networks[networkId];
    contract = new web3.eth.Contract(Urnas.abi, network && network.address);
  }

  return contract;
};

export const init = async () => {
  const web3 = await getWeb3();
  const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  const contract = await getContract();
  return { web3, contract, accounts };
};
