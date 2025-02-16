import { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovieDetails } from '../../services/api';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p className={styles.loading}>Loading...</p>;

  // URL-ul de bază pentru imaginile filmelor
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{movie.title}</h1>
      
      {/* Container pentru poster + descriere */}
      <div className={styles.movieContent}>
        {movie.poster_path && (
          <img
            src={`${imageBaseUrl}${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
            className={styles.poster}
          />
        )}
        <p className={styles.overview}>{movie.overview}</p>
      </div>

      {/* Link-uri pentru distribuție și recenzii */}
      <div className={styles.links}>
        <Link to="cast" className={styles.link}>Distribuție</Link>
        <Link to="reviews" className={styles.link}>Recenzii</Link>
      </div>

      <Outlet />
    </div>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired, // Titlul filmului este un string și este obligatoriu
    poster_path: PropTypes.string, // Calea poster-ului este un string (poate fi null)
    overview: PropTypes.string.isRequired, // Descrierea filmului este un string și este obligatorie
  }),
};

export default MovieDetails;