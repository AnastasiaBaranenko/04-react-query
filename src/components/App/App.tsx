import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type {Movie, MovieResponsePropse} from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../ReactPaginate/ReactPaginate';

export default function App() { 
  const [page, setPage] = useState(1);
   const [searchFilm, setSearchFilm] = useState('');
   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { data, isLoading, isError } = useQuery<MovieResponsePropse>({ 
    queryKey: ['films', searchFilm, page ],
    queryFn: () => fetchMovies(searchFilm, page),
   enabled: searchFilm !== "",
  });

  const handleSearch = (queryValue: string) => {
   setSearchFilm(queryValue);
  setPage(1);
 };
  const handleMovie = (movie:Movie) => {
  setSelectedMovie(movie);
};

  return(
    <div className={css.app}>
  <Toaster 
  position="top-center"
  reverseOrder={false}
  />
      <SearchBar onSubmit={handleSearch}/>
        {isLoading && <Loader />}
       {isError && <ErrorMessage/>}
          {data && data.total_pages > 1 &&
    (<Pagination totalPages={data.total_pages} 
      currentPage={page}
    onPageChange={setPage}
    />)}
       {data && data.results.length > 1 &&
     
      (
    <MovieGrid movies={data.results} onSelect={handleMovie}
    />)}
     {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />} 
  </div>
  )
}
