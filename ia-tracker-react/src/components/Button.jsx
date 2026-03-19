import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? "btn--full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
