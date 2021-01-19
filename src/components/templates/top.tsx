import React, { memo } from 'react';
import { Input } from '../input';

interface Props {
  screenName: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  cameraClick: () => void;
  markerClick: () => void;
}

export const TopTemplate = memo<Props>(({ screenName, onChange, onKeyDown, onBlur, cameraClick, markerClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 45 + '%',
        left: 50 + '%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: 18,
        }}
      >
        WEBセレンディピティ
      </p>
      <div>
        <Input screenName={screenName} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />
      </div>
      <div>
        <button
          disabled={!screenName}
          type="button"
          style={{
            padding: 10,
            margin: 10,
          }}
          onClick={markerClick}
        >
          Marker
        </button>
        <button
          disabled={!screenName}
          type="button"
          style={{
            padding: 10,
            margin: 10,
          }}
          onClick={cameraClick}
        >
          Camera
        </button>
      </div>
    </div>
  );
});
