import { useRouter } from 'next/router';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import styles from './Layout.module.css';
export default function Layout({ children }) {
  const router = useRouter();
  let length;
  if (router.pathname == '/') {
    length = 2;
  } else if (router.pathname == '/dailyfitna') {
    length = 4;
  } else if (router.pathname == '/dailyfitna') {
    length = 4;
  }
  return (
    <div className={styles.layoutCont}>
      <Navbar className={styles.NavCont} />

      <div className={styles['mainSection']}>
        <main className={styles.mainContent}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
