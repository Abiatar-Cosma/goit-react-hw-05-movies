// Search.js
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchMovies } from 'services/api';
import styles from './SearchResults.module.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; // URL pentru imagini de filme

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  const fetchSearchResults = async query => {
    setLoading(true);
    setError('');
    try {
      const data = await searchMovies(query);
      if (data.length === 0) {
        setError('Nu au fost găsite filme pentru căutarea ta.');
      }
      setResults(data);
    } catch (err) {
      setError('A apărut o eroare la căutare.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (query.trim()) {
      fetchSearchResults(query);
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <h2>Rezultatele căutării pentru "{searchQuery || query}"</h2>

      <form className={styles.formInput} onSubmit={handleSearchSubmit}>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Caută filme..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className={styles.inputButton} type="submit">
          Căutare
        </button>
      </form>

      {loading && <p>Se încarcă...</p>}
      {error && <p>{error}</p>}

      <div className={styles.movieList}>
        {results.map(movie => (
          <div key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} className={styles.movieLink}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
              ) : (
                <p>(Imagine indisponibilă)</p>
              )}
              <h3 className={styles.movieTitle}>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Search.propTypes = {
  query: PropTypes.string, // Dacă în viitor adaugi query ca prop
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
    })
  ),
  loading: PropTypes.bool, // Dacă decizi să transmiți loading ca prop
  error: PropTypes.string, // Dacă decizi să transmiți error ca prop
};

export default Search;