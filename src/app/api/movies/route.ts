import { NextResponse } from "next/server";
import axios from "axios";

const MOVIE_DB_API_KEY = process.env.MOVIE_DB_KEY;

const moodToGenre = {
  Happy: 35, // Comedy
  Sad: 18, // Drama
  Excited: 28, // Action
  Calm: 10749, // Romance
  Romantic: 10749, // Romance
  Adventurous: 12, // Adventure
  Scared: 27, // Horror
  Nostalgic: 10770, // TV Movie
  Motivated: 99, // Documentary
  Curious: 878, // Science Fiction
};

const genreToMood = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get("mood");
  const page = searchParams.get("page") || 1;

  if (!mood || !moodToGenre[mood]) {
    return NextResponse.json(
      { error: "Invalid mood specified." },
      { status: 400 }
    );
  }

  const genreId = moodToGenre[mood];
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_DB_API_KEY}&with_genres=${genreId}&page=${page}`;

  try {
    const response = await axios.get(url, {
      headers: { accept: "application/json" },
    });

    const movies = response.data.results.map((movie) => ({
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "Unknown",
      rating: movie.vote_average.toFixed(1),
      duration: `${movie.runtime} min`,
      description: movie.overview,
      genres: movie.genre_ids.map((genreId) => genreToMood[genreId]),
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

    return NextResponse.json({ mood, movies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching movies:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to fetch movies." },
      { status: 500 }
    );
  }
}
