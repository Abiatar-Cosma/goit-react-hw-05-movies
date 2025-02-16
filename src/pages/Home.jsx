import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../services/api';
import MovieList from '../components/MovieList/MovieList';
import styles from './Home.module.css'

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Filme Populare</h1>
    <MovieList movies={movies} />
  </div>
  );
};

export default Home;
