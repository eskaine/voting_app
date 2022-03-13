import React, { useState, createContext } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { candidates } from '../utils/contracts';

export const BallotContext = createContext({});

export const BallotProvider = ({ children }) => {
    const [account, setAccount] = useState(null);

    const getContract = (abi, address) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
    
        return contract;
    }

    const getWeb3Modal = async () => {
        const web3Modal = new Web3Modal({
          cacheProvider: false,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider,
              options: { 
                infuraId: "your-infura-id"
              },
            },
          },
        });

        return web3Modal;
    }

    const connect = async () => {
        try {
          const web3Modal = await getWeb3Modal()
          const connection = await web3Modal.connect()
          const provider = new ethers.providers.Web3Provider(connection)
          const accounts = await provider.listAccounts()
          setAccount(accounts[0])
        } catch (err) {
          console.error(err)
        }
    }

    const getCandidates = async () => {
        const { abi, address } = candidates;
        const candidatesObj = await getContract(abi, address);
        const candidatesList = await candidatesObj.candidates(1);
        console.log(candidatesList);
    }

    return (
        <BallotContext.Provider value={{ account, connect, getCandidates }}>
            { children }
        </BallotContext.Provider>
    );
}