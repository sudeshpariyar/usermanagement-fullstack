import "./Button.scss";
interface IProps {
  variant: "primary" | "secondary" | "danger" | "light";
  type: "submit" | "button";
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant,
  type,
  label,
  onClick,
  loading,
  disabled,
}: IProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={variant}
    >
      {loading ? <>Loading</> : label}
    </button>
  );
};

export default Button;
