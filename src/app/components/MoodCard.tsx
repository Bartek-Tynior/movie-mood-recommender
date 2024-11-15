export default function MoodCard({ mood }) {
    return (
      <div className="border border-solid border-red-500 rounded-md flex justify-center items-center hover:bg-red-500">
        <p className="p-4 font-semibold">{mood.name}</p>
      </div>
    );
}