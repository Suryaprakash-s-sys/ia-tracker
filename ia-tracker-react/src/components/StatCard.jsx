import Icon from "./Icon";
import "./StatCard.css";

const StatCard = ({ icon, label, count, color }) => (
  <div className="stat-card">
    <div className="stat-card-icon" style={{ background: `${color}18` }}>
      <Icon d={icon} size={18} color={color} />
    </div>
    <div>
      <div className="stat-card-count" style={{ color }}>{count}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  </div>
);

export default StatCard;
