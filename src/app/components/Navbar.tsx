import Link from "next/link";

export function Navbar() {
    return (
      <nav className="min-w-full px-20 py-6">
        <div className="bg-white flex justify-center items-center bg-opacity-10 w-full py-6 shadow-sm rounded-lg">
          <Link href="/" className="text-4xl font-bold">
            <span className="text-red-500">Mood</span>Flix
          </Link>
        </div>
      </nav>
    );
}