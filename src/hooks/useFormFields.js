import { useState } from 'react';

export const useFormFields = initialState => {
  const [fields, setValues] = useState(initialState);

  const handleEvent = event => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value,
    });
  };

  const resetValues = () => setValues(initialState);

  return [fields, handleEvent, resetValues];
};
