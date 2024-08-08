import './input.css';

const Input = ({
  className = '',
  type = 'text',
  onChange,
  onKeydown,
  placeHolder,
  value,
  min,
  disabled,
  required,
  id,
  name,
  onKeyDown,
  refe,
}) => {
  return (
    <input
      className={`custom-input ${className} rounded-md`}
      placeholder={placeHolder}
      min={min}
      value={value}
      disabled={disabled}
      onChange={onChange}
      type={type}
      id={id}
      name={name}
      required={required}
      autoComplete="on"
      onKeyDown={onKeyDown}
      ref={refe}
    />
  );
};

export default Input;
