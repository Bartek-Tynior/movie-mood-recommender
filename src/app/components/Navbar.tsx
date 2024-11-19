import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="min-w-full px-20 py-6">
      <div className="bg-white flex justify-between items-center bg-opacity-10 w-full py-6 px-6 shadow-sm rounded-lg">
        <Link href="/" className="text-4xl font-bold">
          <span className="text-red-500">Mood</span>Flix
        </Link>

        <SignedIn>
          <div className="flex flex-row gap-6">
            <Link
              className="bg-[#0F0F0F] primary-btn-focus flex justify-center items-center text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md"
              href={"/saved-movies"}
            >
              Your Watchlist 🍿
            </Link>
            <UserButton showName />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-[#0F0F0F] shadow-md py-2 px-4 rounded-lg">
              <span className="font-semibold">Sign in</span>
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
