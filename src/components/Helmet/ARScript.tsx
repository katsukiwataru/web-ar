import React from 'react';
import { Helmet } from 'react-helmet';

export const ARScript = () => {
  return (
    <Helmet>
      <script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-nft.js"></script>
    </Helmet>
  );
};
