import React, { useState } from 'react';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { auth, logout } from '../../../firebaseLogin';
import styles from './navUser.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import axios from 'axios';
let Web3 = require('web3');

const NavUser = () => {
  const [user, loading, error] = useAuthState(auth);
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  async function getName() {
    const response = await axios.get('/api/hello');
    console.log(response);
  }
  const handleMeta = () => {
    window.ethereum
      ? ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts) => {
            setAddress(accounts[0]);
            let w3 = new Web3(ethereum);
            setWeb3(w3);
            console.log(address);
          })
          .catch((err) => console.log(err))
      : console.log('Please install MetaMask');
  };

  const LogReg = () => {
    const pathname = useRouter().pathname;
    const route =
      pathname === '/404' ||
      pathname === '/' ||
      '/login/[route]' ||
      '/register/[route]'
        ? '/home'
        : pathname;
    return (
      <div className={styles['Nav-sign']}>
        <button
          className='signUpButton'
          type='button'
          style={{ marginRight: '1vw' }}
          onClick={handleMeta}
        >
          Metamask
        </button>

        <Link href={`/login${route}`}>
          <button
            className='signUpButton'
            type='button'
            style={{ marginRight: '1vw' }}
          >
            Login
          </button>
        </Link>
        <Link href={`/register${route}`}>
          <button className='signUpButton' type='button'>
            Register
          </button>
        </Link>
      </div>
    );
  };
  const User = () => {
    return (
      <div className={styles.NavUserCont}>
        <button
          className='signUpButton'
          type='button'
          style={{ marginRight: '1vw' }}
          onClick={getName}
        >
          Metamask
        </button>
        <div className={styles.NavUserTextCont}>
          <p className={styles.NavUserName}>{user.displayName}</p>
          <a onClick={() => logout()} className={styles.logout}>
            Logout
            <FiLogOut className={styles.logoutButton} />
          </a>
        </div>

        <Image
          className={styles.userPic}
          src={user.photoURL ? user.photoURL : ''}
          alt={user.displayName}
          width={50}
          height={50}
        />
      </div>
    );
  };
  return <div>{user ? <User /> : <LogReg />}</div>;
};

export default NavUser;
