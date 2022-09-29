import React, { useState, Suspense } from 'react';
import styles from './navbar.module.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';
import menuLogo from '../../public/static/lifte.png';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Loader from '../Loading/Loading';
const NavUser = dynamic(() => import('./NavUser/NavUser'), {
  suspense: true,
});

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const router = useRouter();

  const Menu = () => (
    <>
      <p>
        <Link href='/dailyfitna'>
          <a
            onClick={() => setToggleMenu(false)}
            href=''
            className={router.pathname == '/dailyfitna' ? 'active' : ''}
          >
            Home
          </a>
        </Link>
      </p>

      <p>
        <Link href='/charts'>
          <a
            onClick={() => setToggleMenu(false)}
            className={router.pathname == '/charts' ? 'active' : ''}
          >
            Services
          </a>
        </Link>
      </p>
      <p>
        <Link href='/upcoming'>
          <a
            onClick={() => setToggleMenu(false)}
            className={router.pathname == '/upcoming' ? 'active' : ''}
          >
            Partners
          </a>
        </Link>
      </p>
      <p>
        <Link href='/rappers'>
          <a
            onClick={() => setToggleMenu(false)}
            className={router.pathname == '/rappers' ? 'active' : ''}
          >
            About us
          </a>
        </Link>
      </p>
      <p>
        <Link href='/nfts'>
          <a
            onClick={() => setToggleMenu(false)}
            className={router.pathname == '/nfts' ? 'active' : ''}
          >
            NFTS
          </a>
        </Link>
      </p>
    </>
  );

  return (
    <>
      <div className={styles.NavCont}>
        <div className={styles.NavMainMenu}>
          <div className={styles.NavMainMenuLogo}>
            <Link href='/'>
              <a onClick={() => setToggleMenu(false)}>
                <Image
                  src={menuLogo}
                  width={215}
                  height={84}
                  alt='deutschrapClout-logo'
                />
              </a>
            </Link>
          </div>
          <div className={styles.NavMainMenuLinks}>
            <Menu />
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <NavUser />
        </Suspense>

        <div className={styles.ToggleMenuCont}>
          {toggleMenu ? (
            <RiCloseLine
              color='var(--red)'
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color='var(--red)'
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className={styles.ToggleMenuLinksCont}>
              <>
                <p>
                  <Link href='/dailyfitna'>
                    <a
                      onClick={() => setToggleMenu(false)}
                      href=''
                      className={
                        router.pathname == '/dailyfitna' ? 'active' : ''
                      }
                    >
                      Home
                    </a>
                  </Link>
                </p>

                <p>
                  <Link href='/charts'>
                    <a
                      onClick={() => setToggleMenu(false)}
                      className={router.pathname == '/charts' ? 'active' : ''}
                    >
                      Services
                    </a>
                  </Link>
                </p>
                <p>
                  <Link href='/upcoming'>
                    <a
                      onClick={() => setToggleMenu(false)}
                      className={router.pathname == '/upcoming' ? 'active' : ''}
                    >
                      Partners
                    </a>
                  </Link>
                </p>
                <p>
                  <Link href='/rappers'>
                    <a
                      onClick={() => setToggleMenu(false)}
                      className={router.pathname == '/rappers' ? 'active' : ''}
                    >
                      About us
                    </a>
                  </Link>
                </p>
                <p>
                  <Link href='/nfts'>
                    <a
                      onClick={() => setToggleMenu(false)}
                      className={router.pathname == '/nfts' ? 'active' : ''}
                    >
                      NFTS
                    </a>
                  </Link>
                </p>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
