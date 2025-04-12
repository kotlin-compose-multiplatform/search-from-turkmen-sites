import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { url: '/search', text: 'Hemmesi' },
  { url: '/images', text: '📸 Suratlar' },
  // { url: '/news', text: '📰 News' },
  // { url: '/videos', text: '📽 Videos' },
];

const NavLinks = () => {
  return (
    <article className="flex sm:justify-around justify-between items-center m-4">
      {links.map(({ url, text }, index) => (
        <NavLink
          key={index}
          to={url}
          className="m-2 mb-0"
          activeClassName="text-blue-700 border-b-2 dark:text-blue-100 border-blue-700 dark:border-blue-100"
        >
          {text}
        </NavLink>
      ))}
    </article>
  );
};

export default NavLinks;
