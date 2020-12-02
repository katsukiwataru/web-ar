import React, { memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export const RootComponent = memo(() => {
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
    <div>
      <p>ARでSPAを作る</p>
      <input type="text" value={id} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
});
