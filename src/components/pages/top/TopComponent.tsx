import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const TopComponent = memo(() => {
  const [id, setId] = useState('');

  const history = useHistory();

  useEffect(() => {
    const videoEl = document.getElementsByTagName('video');
    if (videoEl.length) videoEl[0].remove();
  }, []);

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setId(event.currentTarget.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      history.push(`/user/${id}`);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <p style={{ textAlign: 'center' }}>twitter id</p>
      <input type="text" value={id} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
});
