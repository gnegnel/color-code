const SelectColor = ({ options, title, onChange }) => {
    return (
      <select onChange={onChange}>
        <option value="">{title}</option>
        {options.map(option => 
          <option key={option.id} value={option.id}>{option.color}</option>)
        }
      </select>
    );
  };
  
  export default SelectColor;