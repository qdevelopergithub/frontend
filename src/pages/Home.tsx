import axios from 'axios';
import { useEffect, useState } from 'react';
import EmptyState from '../components/homeSectin/EmptyState';
import MovieList from '../components/homeSectin/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('loginToken')
 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Make GET request using axios
        const response = await axios.get('http://localhost:3000/movies?page=1', {
          headers: {
            'accept': '*/*',
            'Authorization':`Bearer ${token}`, // Replace with your access token
            'Content-Type': 'application/json'
          }
        });

        // Assuming the response contains a 'data' property with the movies list
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        // Handle error state if needed
      }
    };

    fetchMovies();
  }, []);

  return (
    <>


      {movies.length === 0 ? (
        <EmptyState />
      ) : (
        <MovieList movie={movies} />
      )}


    </>
  );
};

export default Home;
