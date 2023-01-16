const Input = ({ title, value, onChange }) => {
  return (
    <div>
     {title + ':'} <input value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
