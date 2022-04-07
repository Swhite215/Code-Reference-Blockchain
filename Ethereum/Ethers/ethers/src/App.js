import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// Import Ethers
import { ethers } from "ethers";

function App() {
  useEffect(async () => {
    // Get MetaMask Injected Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Request Permission to Connect User Accounts
    await provider.send("eth_requestAccounts", []);
    // Get Signer
    const signer = provider.getSigner();

    // Querying the Blockchain
    let bnum = await provider.getBlockNumber();
    let balance = await provider.getBalance("ethers.eth");
    let formattedBalance = ethers.utils.formatEther(balance);

    console.log(signer);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
