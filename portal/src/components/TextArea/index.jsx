import './textarea.css';
const TextArea = ({ placeHolder = '', onChange }) => {
  return (
    <>
      <textarea
        onChange={onChange}
        className="custom-textarea rounded-md"
        placeholder={placeHolder}
      ></textarea>
    </>
  );
};

export default TextArea;
