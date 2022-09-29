import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth, sendPasswordReset } from '../../firebaseResetPW';
import style from './reset.module.css';

function Reset() {
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (user) router.push('/');
  }, [user, loading, router]);

  return (
    <div className={style['reset']}>
      <div className={style['reset__container']}>
        <input
          type='text'
          className={style['reset__textBox']}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail Address'
        />
        <button
          className={style['reset__btn']}
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>

        <div>
          Don&apos;t have an account?{' '}
          <Link href='/register/home' style={{ textDecoration: 'underline' }}>
            Register
          </Link>{' '}
          now.
        </div>
      </div>
    </div>
  );
}

export default Reset;
