import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';
import styles from './Cast.module.css';

const Cast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
  
    useEffect(() => {
      getMovieCredits(movieId).then(setCast);
    }, [movieId]);
  
    // URL-ul de bază pentru imaginile actorilor
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w200';
  
    return (
      <div className={styles.castContainer}>
        <h2 className={styles.title}>Distribuție</h2>
        <ul className={styles.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={styles.castItem}>
              {profile_path ? (
                <img
                  src={`${imageBaseUrl}${profile_path}`}
                  alt={name}
                  className={styles.actorImage}
                />
              ) : (
                <div className={styles.placeholderImage}>No Image</div>
              )}
              <div className={styles.actorInfo}>
                <strong className={styles.actorName}>{name}</strong>
                <p className={styles.actorCharacter}>{character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Cast;