import React from 'react';
import style from './loading.module.css';
export default function Loader() {
  return <div className={style['lds-dual-ring']}></div>;
}
