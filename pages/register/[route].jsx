import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../../firebaseRegister';
import styles from './register.module.css';
import Link from 'next/link';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  const router = useRouter();

  useEffect(() => {
    const route = router.query.route;
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
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
      <div className={styles['form']}>
        <h2>Register</h2>
        <div className={styles['input']}>
          <div className={styles['inputBox']}>
            <label>Name</label>
            <input
              type='text'
              className={styles['login__textBox']}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            />
          </div>
          <div className={styles['inputBox']}>
            <label>Email</label>
            <input
              type='text'
              className={styles['login__textBox']}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail Address'
            />
          </div>
          <div className={styles['inputBox']}>
            <label>Passwort</label>
            <input
              type='password'
              className={styles['login__textBox']}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </div>
          <div className={styles['inputBox']}>
            <input onClick={register} value='Registrieren' type={'submit'} />
          </div>
          <div className={styles['inputBox']}>
            <input
              type={'submit'}
              onClick={signInWithGoogle}
              value='Registrieren mit Google'
            />
          </div>

          <p className={styles['forget']}>
            Du hast schon ein Konto?{' '}
            <Link href='/login/home'>
              <a style={{ textDecoration: 'underline' }}>Klicke Hier</a>
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
