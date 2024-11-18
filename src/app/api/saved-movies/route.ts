import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const savedMovies = new Map(); // Temporary storage (replace with DB)

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

    // Save the movie for the user
    if (!savedMovies.has(userId)) {
      savedMovies.set(userId, []);
    }

    savedMovies.get(userId).push(body);

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

export async function GET(req: Request) {

  try {
    // Authenticate the user
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Get the saved movies for the user
    const movies = savedMovies.get(userId) || [];

    return NextResponse.json({ movies }, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved movies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

}