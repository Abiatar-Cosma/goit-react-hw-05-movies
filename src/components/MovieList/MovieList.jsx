import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation(); // Păstrează locația pentru navigare corectă

  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, title }) => (
        <li key={id} className={styles.movieItem}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default MovieItem;