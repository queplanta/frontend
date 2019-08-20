import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: handleChange
  }
}

export function clearFormInput(input) {
  input.onChange({target: {value: ''}})
}
