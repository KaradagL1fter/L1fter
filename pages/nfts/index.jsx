import { async } from '@firebase/util';
import { Contract } from 'ethers';
import { MissingStaticPage } from 'next/dist/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import mintContract from '../../blockchain/minter';
import styles from './nfts.module.css';
import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
const imageUrl = 'https://thispersondoesnotexist.com/image';
const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX2lkIjo1NjE2MTQsIndzaWQiOiI0MjgwNzk3MDQiLCJlbWFpbCI6ImFzenVkZW1vQGdtYWlsLmNvbSIsImF1ZCI6IjEwZTNkOGQ2MjQ5YjI0Yzc5YTFhMjI0ODBjNDg2NGUxIiwiZXhwIjoxOTc5NjQ5MTU1LCJqdGkiOiIzMzcxMDE5MTg1OTZjOGZhNjZmZDJhZDhiNmE2ODc1NCIsImlhdCI6MTY2NDI4OTE1NSwiaXNzIjoibWVkaWEuaW8iLCJuYmYiOjE2NjQyODgxNTUsInN1YiI6ImVlNjJlNGNkMWNiMTA5MDIwYjQ5MmMxNzYwYjVhZTZmIn0.5gpzE4t5mxP2zmsAk_BnQRMztLaPcOJwGuBrpwjDNH4';

const Nfts = () => {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [mcContract, setMcContract] = useState();
  const [maxSupply, setMaxSupply] = useState();
  const [name, setName] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [mintEnabled, setMintEnabled] = useState();
  const [balance, setBalance] = useState();
  const [hasMinted, setHasMinted] = useState(false);
  const [tokenInWallet, setTokenInWallet] = useState([]);
  const [image, setImg] = useState();
  const [profileImage, setProfileImage] = useState();
  const [loading, setLoading] = useState(true);

  // const getUserImage = async () => {
  //   let res = await axios({
  //     method: 'get',
  //     responseType: 'blob',
  //     url: imageUrl,
  //   });
  //   let reader = new window.FileReader();
  //   reader.readAsDataURL(res.data);
  //   reader.onload = function () {
  //     let imageDataUrl = reader.result;
  //     //console.log(imageDataUrl);
  //     cookie.set('image', imageDataUrl);
  //     setProfileImage(imageDataUrl);
  //     setLoading(false);
  //   };
  // };

  // const fetchImage = async () => {
  //   const res = await fetch(imageUrl, {
  //     mode: 'no-cors',
  //   });
  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   console.log(imageObjectURL);
  //   setImg(imageObjectURL);
  // };
  async function fetchImage() {
    const url = imageUrl;

    const options = {
      method: 'GET',
      mode: 'no-cors',
    };
    console.log(imageUrl);
    let response = await fetch(url, options);
    console.log(response);
    if (response.status === 200) {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);

      const image = document.createElement('img');
      image.src = imageObjectURL;

      const container = document.getElementById('fetteContainer');
      container.append(image);
    } else {
      console.log('HTTP-Error: ' + response.status);
    }
  }

  const connectWalletHandler = async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        const mc = mintContract(web3);
        console.log(mc);
        setMcContract(mc);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert('Please install Metamask');
    }
  };
  useEffect(() => {
    // connectWalletHandler();
    fetchImage();
    // getUserImage();
  }, []);
  useEffect(() => {
    console.log('11');
    if (mcContract) {
      console.log('112');
      getMaxSupply();
      getName();
      getTotalSupply();
      // getTokenInWallet();
      // getMintEnabled();
    }
  }, [mcContract]);
  const getMaxSupply = async () => {
    const supply = await mcContract.methods.maxSupply().call();
    setMaxSupply(supply);
  };
  const getTokenInWallet = async () => {
    const supply = await mcContract.methods.balanceOf(address).call();
    const tokensInWallet = [];
    for (let i = 0; i < supply; i++) {
      const tokenId = await mcContract.methods
        .tokenOfOwnerByIndex(address, i)
        .call();
      let tokenMetadataURI = await mcContract.methods.tokenURI(tokenId).call();
      if (tokenMetadataURI.startsWith('ipfs://')) {
        tokenMetadataURI = `https://ipfs.io/ipfs/${
          tokenMetadataURI.split('ipfs://')[1]
        }`;
      }
      console.log(tokenMetadataURI + `.json`);
      let tokenMetadata = await fetch(tokenMetadataURI + `.json`).then(
        (response) => {
          // await fetch(response.json().image);
          return response.json();
        }
      );
      if (tokenMetadata.image.startsWith('ipfs://')) {
        tokenMetadata = `https://ipfs.io/ipfs/${
          tokenMetadata.image.split('ipfs://')[1]
        }`;
      }
      console.log(tokenMetadata);
      let tokenImageURI = await fetch(tokenMetadata).then((response) => {
        // await fetch(response.json().image);
        return response.url;
      });
      console.log(tokenImageURI);
      console.log(tokenInWallet);
      tokensInWallet.push(tokenImageURI);
    }
    setTokenInWallet(tokensInWallet);
    setBalance(supply);
  };
  const getName = async () => {
    const supply = await mcContract.methods.name().call();
    setName(supply);
  };
  const getTotalSupply = async () => {
    const supply = await mcContract.methods.totalSupply().call();
    setTotalSupply(supply);
  };
  // const getMintEnabled = async () => {
  //   const supply = await mcContract.methods.allowListMintOpen().call();
  //   console.log(supply);
  //   setMintEnabled(supply);
  // };
  const handlePublicMint = async () => {
    // console.log(mcContract.options.jsonInterface);
    if (parseInt(totalSupply) < parseInt(maxSupply)) {
      const supply = await mcContract.methods
        .publicMint()
        .send({ from: address, value: 10000000000000000 });
      console.log(supply);
      setHasMinted(true);
    } else {
      alert('Unfortunately we are sold out');
    }
  };
  const handleListMint = async () => {
    // console.log(mcContract.options.jsonInterface);
    if (totalSupply < maxSupply) {
      const supply = await mcContract.methods
        .allowListMint()
        .send({ from: address, value: 1000000000000000 });
      console.log(supply);
      setHasMinted(true);
    } else {
      alert('Unfortunately we are sold out');
    }
  };
  // useEffect(() => {
  //   window.ethereum
  //     ? ethereum
  //         .request({ method: 'eth_requestAccounts' })
  //         .then((accounts) => {
  //           console.log(accounts);
  //           setAddress(accounts[0]);
  //           let w3 = new Web3(ethereum);
  //           setWeb3(w3);
  //           console.log(address);
  //         })
  //         .catch((err) => console.log(err))
  //     : console.log('Please install MetaMask');
  // }, []);
  return (
    <div className={styles.NftCont}>
      <h1 className={styles['titleNfts']}>{name} - NFT COLLECTION</h1>
      <h2>Max supply: {maxSupply}</h2>
      <h2>Total supply: {totalSupply}</h2>
      <div className='ImageCont'>
        {/* <Image
          key={12}
          cache='reload'
          src={imageUrl}
          width={200}
          height={200}
        /> */}
        <img src={imageUrl} alt='' width={200} height={200} />

        {loading && <div>loading...</div>}
        {!loading && <img width='100' alt='' src={image} />}
      </div>

      {/* <h2>Mint enabled: {mintEnabled.toString()}</h2> */}
      <button
        style={address ? { background: 'var(--blue)' } : {}}
        className='signUpButton'
        onClick={connectWalletHandler}
      >
        {address ? 'Connected to metamask' : 'Connect to metamask'}
      </button>
      <button
        style={address ? { background: 'var(--blue)' } : {}}
        className='signUpButton'
        onClick={() => {
          console.log('Hello');
        }}
      >
        getIMage
      </button>
      <h2 style={{ marginTop: '4vh' }}>Mint our NFTS</h2>
      {hasMinted ? (
        <h3>Thank you for minting L1FT</h3>
      ) : parseInt(totalSupply) < parseInt(maxSupply) ? (
        <div className='buttonCont'>
          {' '}
          <button className='signUpButton' onClick={handlePublicMint}>
            Public mint <br /> (0.01 Eth)
          </button>
          <button className='signUpButton' onClick={handleListMint}>
            Private mint <br /> (0.001 Eth)
          </button>
        </div>
      ) : (
        <div className='contSoldOut'>
          <button className='signUpButton' onClick={handlePublicMint}>
            Sold out
          </button>
        </div>
      )}
      <h2 style={{ marginTop: '4vh' }}>Your NFTS</h2>
      {tokenInWallet.map((x, i) => {
        return (
          <div className='WalletNftCont' key={i}>
            <Image src={x} width={200} height={200} />
          </div>
        );
      })}
      <div id='fetteContainer'></div>
    </div>
  );
};

export default Nfts;
