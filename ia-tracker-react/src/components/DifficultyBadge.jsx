import "./DifficultyBadge.css";

const DifficultyBadge = ({ level }) => {
  const map = {
    EASY:   "easy",
    MEDIUM: "medium",
    HARD:   "hard",
  };
  const cls = map[(level || "MEDIUM").toUpperCase()] || "medium";
  const label = level ? level.charAt(0) + level.slice(1).toLowerCase() : "Medium";

  return <span className={`diff-badge diff-badge--${cls}`}>{label}</span>;
};

export default DifficultyBadge;
