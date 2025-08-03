import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import css from './SearchBox.module.css';

function SearchBox() {
  const [inputValue, setInputValue] = useState('');
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    // Скидає кеш і запускає новий запит з новим `search` параметром
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  }, [inputValue, queryClient]);

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
