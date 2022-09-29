import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle } from '../../firebaseLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './login.module.css';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
// import axios from 'axios';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
// import { signIn } from 'next-auth/react';
// import { useMoralis } from 'react-moralis';
function Login() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  // const { isAuthenticated, authenticate } = useMoralis();

  // console.log(isAuthenticated);
  // const { connectAsync } = useConnect();
  // const { disconnectAsync } = useDisconnect();
  // const { isConnected } = useAccount();
  // const { signMessageAsync } = useSignMessage();
  // const { push } = useRouter();

  // const handleAuth = async () => {
  //   if (isConnected) {
  //     await disconnectAsync();
  //   }
  //   const { account, chain } = await connectAsync({
  //     connector: new MetaMaskConnector(),
  //   });
  //   const userData = { address: account, chain: chain.id, network: 'evm' };
  //   const { data } = await axios.post('/api/auth/request-message', userData, {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   });
  //   const message = data.message;
  //   const signature = await signMessageAsync({ message });
  //   // redirect user after success authentication to '/user' page
  //   const { url } = await signIn('credentials', {
  //     message,
  //     signature,
  //     redirect: false,
  //     callbackUrl: '/user',
  //   });
  //   /**
  //    * instead of using signIn(..., redirect: "/user")
  //    * we get the url from callback and push it to the router to avoid page refreshing
  //    */
  //   push(url);
  // };
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     console.log('AUTh');
  //   }
  // }, [isAuthenticated]);
  useEffect(() => {
    console.log('UseEffect');

    const route = router.query.route;
    if (user) {
      if (route === 'home') {
        router.push(`/`);
      } else {
        router.push(`/${route}`);
      }
    }
  }, [user, loading, router]);

  return (
    <div className={styles['login_cont']}>
      <form
        className={styles['form']}
        onSubmit={async (event) => {
          event.preventDefault();
          logInWithEmailAndPassword(
            event.target.email.value,
            event.target.password.value
          );
        }}
      >
        <h2>Login</h2>
        <div className={styles['input']}>
          <div className={styles['inputBox']}>
            <label>Name</label>
            <input
              type='text'
              className={styles['login__textBox']}
              name='email'
              placeholder='E-mail Address'
              required
            />
          </div>
          <div className={styles['inputBox']}>
            <label>Password</label>
            <input
              type='password'
              className={styles['login__textBox']}
              name='password'
              placeholder='Password'
              required
            />
          </div>
          <div className={styles['inputBox']}>
            <input value='Login' type={'submit'} />
          </div>
          <div className={styles['inputBox']}>
            <input
              type={'button'}
              onClick={signInWithGoogle}
              value='Login with Google'
            />
          </div>
          <div className={styles['inputBox']}>
            <input type={'button'} value='Login with Metamask' />
          </div>

          <p className={styles['forget']}>
            Passwort vergessen ?{' '}
            <Link href='/reset'>
              <a style={{ textDecoration: 'underline' }}>Klicke hier</a>
            </Link>
          </p>
          <p className={styles['forget']}>
            Du hast noch kein Konto?{' '}
            <Link href='/register/home'>
              <a style={{ textDecoration: 'underline' }}>Klicke Hier</a>
            </Link>{' '}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
