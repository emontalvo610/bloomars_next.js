'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import SaveCancel from '@/components/SaveCancel';
import { updateAnswer } from '@/lib/services';

type TextAreaProps = {
  initialValue?: string;
};

const TextArea: FC<TextAreaProps> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = useCallback(() => {
    updateAnswer(value);
  }, [updateAnswer, value]);

  const handleCancel = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <>
      <textarea
        value={value}
        onChange={handleChange}
        className="w-full h-40 p-4 border border-gray-300 rounded-md"
      />
      <SaveCancel handleCancel={handleCancel} handleSave={handleSave} />
    </>
  );
};

export default TextArea;
