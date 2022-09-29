import React from 'react';
import styles from './header.module.css';
const Header = ({ h1, h2 }) => {
  return (
    <div className={styles['HeaderCont']}>
      <h1 className={styles['heading1Charts']}>{h1}</h1>
      <h4 className={styles['heading2Charts']}>{h2} </h4>
    </div>
  );
};

export default Header;
