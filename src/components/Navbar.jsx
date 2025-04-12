import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

const Navbar = ({ setDarkTheme, darkTheme }) => {
  return (
    <nav className="max-w-screen-xl mx-auto px-5 py-3 flex flex-wrap justify-center items-center sm:justify-between border-b border-gray-300 dark:border-gray-500">
      <div className="flex justify-between items-center space-x-5 w-screen">
        {/* logo */}
        <Link to="/">
          <p className="text-2xl font-bold bg-green-600 text-white py-1 px-2 rounded dark:bg-green-800">
            TM 🔎
          </p>
        </Link>

        {/* theme btn */}
        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-xl bg-white dark:bg-gray-50 border rounded-full px-2 py-1 shadow-sm hover:shadow-md transition-shadow text-gray-700"
        >
          {darkTheme ? 'Ýagty 🌞' : 'Garaňky 🌚'}
        </button>
      </div>

      <SearchBox />
    </nav>
  );
};

export default Navbar;
