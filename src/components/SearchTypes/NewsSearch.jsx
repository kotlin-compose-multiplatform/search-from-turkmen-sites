import React from 'react';
import NotFound from './NotFound';

const NewsSearch = ({ results }) => {
  return (
    <article className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
      {(results?.length === 0 && <NotFound />) ||
        results?.map((result) => {
          // destructure
          const { id, title, link, source } = result;

          return (
            <div
              className="md:w-3/5 w-full border border-gray-300 dark:border-gray-500 rounded p-4"
              key={id}
            >
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {/* title */}
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>

              <div className="flex gap-4">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  title={source.title}
                >
                  {source.href}
                </a>
              </div>
            </div>
          );
        })}
    </article>
  );
};

export default NewsSearch;
