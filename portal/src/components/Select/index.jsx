import './select.css';

const Select = ({
  className = '',
  onChange,
  onKeydown,
  options = [],
  placeHolder = '',
  disabled,
  id,
  name,
  value = '',
  group = '',
}) => {
  return (
    <div>
      <select
        className={`custom-select ${className} rounded-lg `}
        onChange={onChange}
        disabled={disabled}
        autoComplete="on"
        id={id}
        name={name}
        value={value || ''}
      >
        <option className="disableoption" value="" disabled>
          {placeHolder}
        </option>
        {options.map((value, i) => {
          return (
            <option key={i} value={value._id}>
              {group === 'state' ? value.stateName : value.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
