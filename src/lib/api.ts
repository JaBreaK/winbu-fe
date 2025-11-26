
import type { HomeData, AnimeDetail, SeriesDetail, FilmDetail, EpisodeDetail, ServerData } from './types';

const API_BASE_URL = '/api/proxy';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side, use relative path
    return '';
  }
  // Server-side, use absolute path
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
};


async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${API_BASE_URL}${path}`;
    
    const res = await fetch(url, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for path ${path}`);
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Fetch API failed for path ${path}:`, error);
    return null;
  }
}

export const getHomeData = (): Promise<HomeData | null> => fetchAPI('/home');
export const getAnimeDetails = (id: string): Promise<AnimeDetail | null> => fetchAPI(`/anime/${id}`);
export const getSeriesDetails = (id: string): Promise<SeriesDetail | null> => fetchAPI(`/series/${id}`);
export const getFilmDetails = (id: string): Promise<FilmDetail | null> => fetchAPI(`/film/${id}`);
export const getEpisodeDetails = (id: string): Promise<EpisodeDetail | null> => fetchAPI(`/episode/${id}`);
export const getServerUrl = (id: string, nume: string, type: string): Promise<ServerData | null> => fetchAPI(`/server/${id}?nume=${nume}&type=${type}`);
