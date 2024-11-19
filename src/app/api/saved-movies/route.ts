import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db/db";
import { savedMovies } from "@/db/schema"; // Update the path to your Drizzle schema
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json();

    if (!body || !body.title) {
      return NextResponse.json(
        { error: "Invalid movie data" },
        { status: 400 }
      );
    }

    // Save the movie to the database
    await db.insert(savedMovies).values({
      title: body.title,
      year: body.year || null,
      rating: body.rating || null,
      genres: JSON.stringify(body.genres || []), // Save genres as a JSON string
      description: body.description || null,
      userId, // Associate the movie with the authenticated user
      poster: body.poster || null,
    });

    return NextResponse.json(
      { message: "Movie saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving movie:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Fetch saved movies for the user from the database
    const usersMovies = await db
      .select()
      .from(savedMovies)
      .where(eq(savedMovies.userId, userId));

    // Parse genres back to arrays before returning
    const moviesWithGenres = usersMovies.map((movie) => ({
      ...movie,
      genres: JSON.parse(movie.genres as string),
    }));

    return NextResponse.json({ movies: moviesWithGenres }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json();

    if (!body || !body.id) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Delete the movie from the database
    await db
      .delete(savedMovies)
      .where(eq(savedMovies.id, body.id) && eq(savedMovies.userId, userId));

    return NextResponse.json(
      { message: "Movie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
