import { useRouter } from 'next/router';
import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { getUser } from '../lib/api';
import { useUserContext } from '../lib/context/userContext';

export interface UserContext {
  user: Twitter | null;
  setUser: Dispatch<SetStateAction<Twitter | null>>;
}

const Top = () => {
  const { setUser } = useUserContext();
  const [screenName, setScreenName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const videoEl = document.getElementsByTagName('video');
    if (videoEl.length) videoEl[0].remove();
  }, []);

  const onChange = (event: FormEvent<HTMLInputElement>): void => {
    setScreenName(event.currentTarget.value);
  };

  const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const user = await getUser(screenName);
      setUser(user);
      router.push(`/user/${screenName}`);
    }
  };

  const cameraClick = async () => {
    // setMarkerDisplay(false);
    const user = await getUser(screenName);
    setUser(user);
    router.push(`/user/${screenName}`);
  };
  const markerClick = async () => {
    // setMarkerDisplay(true);
    const user = await getUser(screenName);
    setUser(user);
    router.push(`marker/${screenName}`);
  };

  return (
    //   <head>
    //     <meta charSet="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    //     <title>web ar</title>
    //     {/* <style>
    //   body {
    //     margin: 0;
    //     overflow: hidden;
    //   }
    //   body video {
    //     overflow: hidden;
    //   }
    // </style> */}
    //   </head>
    <>
      <div
        style={{
          position: 'absolute',
          top: 45 + '%',
          left: 50 + '%',
          transform: 'translate(-50%, -50%)',
          width: 50 + '%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        <p
          style={{
            fontSize: 18 + 'px',
          }}
        >
          twitter id
        </p>
        <input
          style={{
            paddingInlineEnd: 40,
            paddingInlineStart: 40,
            width: '-webkit-fill-available',
            height: 5 + 'vh',
            marginBottom: 30 + 'px',
            textAlign: 'center',
          }}
          type="text"
          placeholder="your twitter id"
          value={screenName}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          style={{
            width: 30 + '%',
            height: 5 + 'vh',
          }}
          onClick={markerClick}
        >
          Marker
        </button>
        <button
          type="button"
          style={{
            width: 30 + '%',
            height: 5 + 'vh',
          }}
          onClick={cameraClick}
        >
          Camera
        </button>
      </div>
      <script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js"></script>
      <script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"></script>
      <script
        defer
        src="https://rawcdn.githack.com/AR-js-org/AR.js/a5619a021e6ff40427ff8f9c62169e99a390f56b/three.js/examples/marker-training/threex-arpatternfile.js"
      ></script>
    </>
  );
};

export default Top;
