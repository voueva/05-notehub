import { useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSubmit: (value: string) => void;
}

function SearchBox({ onSubmit }: SearchBoxProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSubmit(value); 
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />  
  );
}

export default SearchBox;
