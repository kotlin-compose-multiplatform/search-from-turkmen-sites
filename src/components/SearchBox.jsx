import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchResultsContext } from '../contexts/SearchResultsContext';
import NavLinks from './NavLinks';

const SearchBox = () => {
  // states
  const [text, setText] = useState('Yodkwtf');
  const { setSearchItem } = useSearchResultsContext();

  const [debouncedValue] = useDebounce(text, 1000);

  // useEffect
  useEffect(() => {
    if (debouncedValue) setSearchItem(debouncedValue);
  }, [debouncedValue, setSearchItem]);

  // jsx
  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        type="text"
        value={text}
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-md"
        placeholder="Gözleg sözi..."
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button
          className="absolute top-1.5 right-4 text-2xl text-gray-500 pr-2 "
          onClick={() => setText('')}
        >
          x
        </button>
      )}
      <NavLinks />
    </div>
  );
};

export default SearchBox;
