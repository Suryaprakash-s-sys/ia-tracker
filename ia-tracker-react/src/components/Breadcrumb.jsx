import { useNavigate } from "react-router-dom";
import Icon, { ICONS } from "./Icon";
import "./Breadcrumb.css";

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumb-item">
          {index > 0 && (
            <Icon d={ICONS.chevron} size={13} color="var(--border)" />
          )}
          <span
            className={`breadcrumb-label ${item.active ? "breadcrumb-label--active" : item.onClick ? "breadcrumb-label--link" : ""}`}
            onClick={item.onClick ? item.onClick : undefined}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
