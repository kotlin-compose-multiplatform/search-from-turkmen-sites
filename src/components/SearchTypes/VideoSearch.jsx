import React from 'react';
import ReactPlayer from 'react-player';
import NotFound from './NotFound';

const VideoSearch = ({ results }) => (
  <article className="flex flex-wrap justify-center items-center">
    {(results?.length === 0 && <NotFound />) ||
      results?.map((result, index) => {
        // desctructure
        const { videoobject: videos } = result.pagemap;

        return videos?.map((video, index) => {
          const { contenturl } = video;
          return (
            <article className="flex flex-wrap" key={index}>
              <div className="p-2">
                <ReactPlayer
                  url={contenturl}
                  controls
                  width="480px"
                  height="270px"
                />
              </div>
            </article>
          );
        });
      })}
  </article>
);
export default VideoSearch;
