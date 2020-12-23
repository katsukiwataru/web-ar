import Head from 'next/head';

export const AppHead = () => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>web ar</title>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js"></script>
      <script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"></script>
      <script
        defer
        src="https://rawcdn.githack.com/AR-js-org/AR.js/a5619a021e6ff40427ff8f9c62169e99a390f56b/three.js/examples/marker-training/threex-arpatternfile.js"
      ></script>
    </Head>
  );
};
