import React, { memo } from 'react';

interface Props {
  screenName: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = memo<Props>(({ screenName, onChange, onKeyDown, onBlur }) => {
  return (
    <input
      style={{
        fontSize: 16 + 'px',
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
      onBlur={onBlur}
    />
  );
});
