import React from 'react';
import NotFound from './NotFound';

const ImageSearch = ({ results }) => {
  if (!results) return <NotFound />;
  if (results.length === 0) return <NotFound />;

  return (
      <section className="flex flex-wrap justify-center items-start gap-6 p-4">
        {results.map((result, index) => {
          // Image from cse_image or fallback to og:image
          const cseImage = result.pagemap?.cse_image?.[0]?.src;
          const ogImage = result.pagemap?.metatags?.[0]?.['og:image'];
          const imageUrl = cseImage || ogImage;

          // Fallbacks
          if (!imageUrl) return null;

          return (
              <a
                  key={index}
                  href={result.link}
                  className="w-40 hover:scale-105 transition-transform"
                  target="_blank"
                  rel="noreferrer"
              >
                <img
                    src={imageUrl}
                    alt={result.title}
                    loading="lazy"
                    className="rounded-lg shadow-md object-cover h-40 w-full"
                />
                <p className="text-sm mt-2 text-center break-words">{result.title}</p>
              </a>
          );
        })}
      </section>
  );
};

export default ImageSearch;
