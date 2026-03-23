import type {Movie, MovieResponsePropse} from '../types/movie';
import axios from "axios";

export interface Movies{
    results: Movie[];
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
export async function fetchMovies(searchFilm: string, page: number): Promise<MovieResponsePropse>{

   const response = await axios.get<MovieResponsePropse>('https://api.themoviedb.org/3/search/movie',{
  params: {
    query: searchFilm, 
    page: page
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }});
   return response.data;
}
