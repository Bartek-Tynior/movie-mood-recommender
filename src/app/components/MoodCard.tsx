export default function MoodCard({ mood }) {
    return (
      <div className="btn md:btn-lg border-[1.5px] border-primary hover:btn-primary btn-outline nunito ">
        <p>{mood.name}</p>
      </div>
    );
}