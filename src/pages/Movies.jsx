import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieList from "../components/MovieList/MovieList";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <div>
      <h1>Caută un film</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Caută</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default Movies;
