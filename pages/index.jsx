import React, { useEffect, useState, Suspense, useCallback } from 'react';
import styles from './index.module.css';
import TextBox from '../components/TextBox/TextBox';
import NativeBalance from './nativebalance';
import Illu from '../public/static/Illu_website-Kopie-300x270.png';
import Link from 'next/link';
import Image from 'next/image';
import Arrow from '../components/Arrow/Arrow';
import { getSession, signOut } from 'next-auth/react';
import Floats from '../components/Floats/Floats';
const FollowSection = ({ user }) => {
  const [isMobile, setIsMobile] = useState(true);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setIsMobile(width <= 1026);
  };
  useEffect(() => {
    console.log('Index.jsx --> []');
    console.log(user);
    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className={styles['HomeCont']}>
      <div className={styles['pimg1']}>
        <div className={styles['ptext']}>
          <span className={styles['border']}>
            <TextBox
              h1={'L1fter Digital Marketing'}
              h2={'Desktop, web and blockchain developement | Berlin'}
              b1={'Python'}
              b2={'React'}
              b3={'CMS'}
              b4={'Ads and SEO'}
              b5={'Solidity'}
              b1_desc={['Automation', 'Webscraping']}
            />
            <Arrow />
            <Floats />
          </span>
        </div>
      </div>
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className='textCont'>
          <h2>React and Next developement </h2>
          <h4>Mobile and webapplications with next, react and or express|</h4>
          <h5>Hosted on a VPS running on ubuntu using nginx</h5>
        </div>
        {/* <div
          className='imgContainer'
          style={{ position: 'absolute', left: '66%', top: '22%' }}
        >
          <Image
            className={styles['illustration']}
            layout={'fixed'}
            src={Illu}
          />
        </div> */}
        <div className={styles['buttonGroup']}>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Contact
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Demo
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Github
            </button>
          </Link>
        </div>
      </section>
      <div className={styles['pimg2']}>
        <div className={styles['ptext']}>
          <span className={styles['border']}>
            {/* <TextBox
              h1={'Python developement'}
              h2={'Web scraping | object detection | task automation'}
              h3={'bs4 | pandas | selenium | opencv'}
            />

            <Arrow /> */}
          </span>
        </div>
      </div>
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles['buttonGroup']}>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Contact
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Demo
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Github
            </button>
          </Link>
        </div>
        <div className='textCont'>
          <h2>Python developement </h2>
          <h4>Web scraping | object detection | task automation</h4>
          <h5>bs4 | pandas | selenium | opencv</h5>
        </div>
      </section>
      {/* <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles['firstCol']}>
          <h1>Programming Languages</h1>
          <h2>React / Next </h2>
          <h2>Python</h2>
          <h2>Solidity</h2>
          <h2>Liquid / PHP</h2>
          <h2>Typescript / Node</h2>
        </div>

        <div className={styles['firstCol']}>
          <h1>Digital marketing</h1>
          <h2>SEO</h2>
          <h2>Google / Facebook ads</h2>
          <h2>Graphic design (external)</h2>
        </div>
      </section> */}
      <div className={styles['pimg3']}>
        <div className={styles['ptext']}>
          <span className={styles['border']}>
            {/*   <TextBox
              h1={'Blockchain developement'}
              h2={'DAPPS | NFTS | Web3 Frontend integration '}
              h3={'solidity | web3.js | ethers.js | Remix | Truffle / Ganage'}
            />*/}
          </span>
        </div>
      </div>
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className='textCont'>
          <h2>Blockchain developement </h2>
          <h4>DAPPS | NFTS | Web3 Frontend integration</h4>
          <h5>solidity | web3.js | ethers.js | Remix | Truffle / Ganage</h5>
        </div>
        {/* <div
          className='imgContainer'
          style={{ position: 'absolute', left: '66%', top: '22%' }}
        >
          <Image
            className={styles['illustration']}
            layout={'fixed'}
            src={Illu}
          />
        </div> */}
        <div className={styles['buttonGroup']}>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              <span>C</span>
              <span style={{ color: 'var(--blue)' }} className='second'>
                0
              </span>
              <span>n</span>
              <span>t</span>
              <span>a</span>
              <span>c</span>
              <span>t</span>
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              D<span className='second'>e</span>mo
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              G<span className='second'>1</span>
              thub
            </button>
          </Link>
        </div>
      </section>
      <div className={styles['pimg4']}>
        <div className={styles['ptext']}>
          <span className={styles['border']}>
            {/* <TextBox
              h1={'Node developement'}
              h2={'Full stack or frontend applications '}
              h3={'express | react | next | nginx | ubuntu'}
            /> */}
          </span>
        </div>
      </div>
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles['buttonGroup']}>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Contact
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Demo
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Github
            </button>
          </Link>
        </div>
        <div className='textCont'>
          <h2>Content management systems </h2>
          <h4>Wordpress | Shopify | Payment Gateways</h4>
          <h5>php | mysql | liquid | WooCommerce | Stripe</h5>
        </div>
      </section>
      <div className={styles['pimg5']}>
        <div className={styles['ptext']}>
          <span className={styles['border']}>
            {/* <TextBox
              h1={'Digital marketing'}
              h2={'Google / Facebook ads | SEO | Website optimization'}
              h3={
                'Google Analytics | Google Search Console | lighthouse | ahref '
              }
            /> */}
          </span>
        </div>
      </div>
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className='textCont'>
          <h2>Digital marketing </h2>
          <h4>Google / Facebook ads | SEO | Website optimization</h4>
          <h5>Google Analytics | Google Search Console | lighthouse | ahref</h5>
        </div>
        {/* <div
          className='imgContainer'
          style={{ position: 'absolute', left: '66%', top: '22%' }}
        >
          <Image
            className={styles['illustration']}
            layout={'fixed'}
            src={Illu}
          />
        </div> */}
        <div className={styles['buttonGroup']}>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Contact
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Demo
            </button>
          </Link>
          <Link href={`/contact`}>
            <button
              style={{ margin: '5vh 0' }}
              className='signUpButton'
              type='button'
            >
              Github
            </button>
          </Link>
        </div>
      </section>
      ss
    </div>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      props: { user: 'No User' },
    };
  }

  return {
    props: { user: session.user },
  };
}
export default FollowSection;
