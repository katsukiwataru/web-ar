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
      <Input screenName={screenName} onChange={onChange} onKeyDown={onKeyDown} onBlur={onBlur} />
      <button
        disabled={!screenName}
        type="button"
        style={{
          padding: 10 + 'px',
        }}
        onClick={markerClick}
      >
        Marker
      </button>
      <button
        disabled={!screenName}
        type="button"
        style={{
          padding: 10 + 'px',
        }}
        onClick={cameraClick}
      >
        Camera
      </button>
    </div>
  );
});
