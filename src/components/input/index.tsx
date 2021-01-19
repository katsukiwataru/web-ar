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
        width: 280,
        fontSize: 16,
        paddingInline: 10,
        height: 30,
        marginBottom: 30,
        textAlign: 'center',
      }}
      type="text"
      placeholder="興味の知りたい人のtwitter idを入力してください"
      value={screenName}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
});
