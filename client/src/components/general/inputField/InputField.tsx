import { forwardRef, InputHTMLAttributes } from "react";
import "./InputField.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div className="customInput">
      <label className="customInput__label">{label}</label>
      <input className="customInput__field" ref={ref} {...props} />
      {error && <p className="customInput__error">{error}</p>}
    </div>
  )
);

export default InputField;
