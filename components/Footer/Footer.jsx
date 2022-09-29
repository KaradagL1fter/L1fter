import React from 'react';
import styles from './footer.module.css';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';
import { FaTelegramPlane } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <div className={styles['section2']}>
        <Link href={'/'}>
          <a>
            <FiInstagram size={'6vw'} />
          </a>
        </Link>
        <Link href={'/'}>
          <a>
            <SiTiktok size={'6vw'} />
          </a>
        </Link>
        <Link href={'/'}>
          <a>
            <FiTwitter size={'6vw'} />
          </a>
        </Link>
        <Link href={'/'}>
          <a>
            <FaTelegramPlane size={'6vw'} />
          </a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
