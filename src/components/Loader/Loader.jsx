import { TailSpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import React from 'react';

const Loader = ({ isLoading }) => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={isLoading}
    />
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
