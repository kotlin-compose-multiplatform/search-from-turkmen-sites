import { useState } from 'react';
import { Navbar, Routes, Footer } from './components';

const App = () => {
  // states
  const [darkTheme, setDarkTheme] = useState(false);

  // jsx
  return (
    <main className={darkTheme ? 'dark' : ''}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
        <Routes />
        <Footer />
      </div>
    </main>
  );
};

export default App;
