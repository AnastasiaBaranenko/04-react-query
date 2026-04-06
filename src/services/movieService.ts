import type {Movie} from '../types/movie';
import axios from "axios";

export interface Movies{
    results: Movie[];
    total_pages: number;
    total_results: number;
}

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const url = import.meta.env.VITE_BASE_URL;
export async function fetchMovies(searchFilm: string, page: number): Promise<Movies>{

   const response = await axios.get<Movies>(`${url}/movie`,{
  params: {
    query: searchFilm, 
    page: page
  },
  headers: {
    Authorization: `Bearer ${myKey}`,
  }});
   return response.data;
}
