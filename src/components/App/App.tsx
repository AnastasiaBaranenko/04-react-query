import {useEffect, useState} from 'react';
import { useQuery,keepPreviousData } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { fetchMovies } from '../../services/movieService';
import type {Movie} from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../ReactPaginate/ReactPaginate';

export default function App() { 
  const [page, setPage] = useState(1);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const { data, isLoading, isError, isSuccess } = useQuery({ 
    queryKey: ['films', searchQuery, page ],
    queryFn: () => fetchMovies(searchQuery, page),
   enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (queryValue: string) => {
   setSearchQuery(queryValue);
  setPage(1);
 };

  useEffect(() => {
    if(isSuccess && data?.results.length === 0){
toast.error('No movies found for your request.');
 }},[isSuccess, data]);

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
    (<Pagination 
      totalPages={data.total_pages} 
      currentPage={page}
    onPageChange={setPage}
    />)}
       {data && data.results.length > 0 &&
      (
    <MovieGrid movies={data.results} onSelect={handleMovie}
    />)}
     {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />} 
  </div>
  )
}
