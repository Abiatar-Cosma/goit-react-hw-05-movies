import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMovieReviews } from '../../services/api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.title}>Recenzii</h2>
      {reviews.length ? (
        <ul className={styles.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <strong className={styles.author}>{author}</strong>
              </div>
              <p
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>Fără recenzii disponibile.</p>
      )}
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // id-ul recenziei
      author: PropTypes.string.isRequired, // autorul recenziei
      content: PropTypes.string.isRequired, // conținutul recenziei
    })
  ),
};

export default Reviews;