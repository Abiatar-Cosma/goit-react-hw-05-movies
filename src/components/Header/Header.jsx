// components/Header.js
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importă stilurile

const Header = () => {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/search" className={styles.navLink}>Search</Link> {/* Ruta Search */}
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  
  export default Header;