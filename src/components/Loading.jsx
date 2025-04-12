import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center m-10 mb-4">
      <Loader type="Rings" color="#3b82f6" height={80} width={80} />
    </div>
  );
};

export default Loading;
