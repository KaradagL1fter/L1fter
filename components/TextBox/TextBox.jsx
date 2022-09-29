import React, { useEffect, useState } from 'react';
import styles from './textBox.module.css';
import Link from 'next/link';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
const TextBox = ({ h1, h2, h3, b1, b2, b3, b4, b5 }) => {
  return (
    <div className={styles['bounce-in-top']}>
      <div className={styles.contTextHeadOnlyH}>
        <h1>{h1}</h1>
        <h2>{h2}</h2>
        <h3>{h3}</h3>
      </div>
      <div className={styles['contCTA']}>
        <h3 style={{ width: '340px' }}>Book an online meeting today</h3>
        <button
          className='signUpButton'
          // style={{
          //   color: 'white',
          //   backgroundColor: 'var(--blue)',
          // }}
        >
          Contact us{' '}
        </button>
      </div>
      {/* <div className={styles['buttonCont']}>
        {' '}
        <Link href={`/contact`}>
          <button
            style={{ margin: '10vh 0' }}
            className='signUpButton'
            type='button'
          >
            {b1}
          </button>
        </Link>
        <Link href={`/contact`}>
          <button
            style={{ margin: '10vh 0' }}
            className='signUpButton'
            type='button'
          >
            {b2}
          </button>
        </Link>
        <Link href={`/contact`}>
          <button
            style={{ margin: '10vh 0' }}
            className='signUpButton'
            type='button'
          >
            {b3}
          </button>
        </Link>
        <Link href={`/contact`}>
          <button
            style={{ margin: '10vh 0' }}
            className='signUpButton'
            type='button'
          >
            {b4}
          </button>
        </Link>
        <Link href={`/contact`}>
          <button
            style={{ margin: '10vh 0' }}
            className='signUpButton'
            type='button'
          >
            {b5}
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default TextBox;
