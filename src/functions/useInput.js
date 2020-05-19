import { useState } from 'react';

/**
 * Custom react hook for handling inputs
 * @component
 */
const useInput = () => {
  const [input, setInput] = useState({});

  /**
   * Function to change values in input using e.target.name and e.target.value
   * @param {event} e event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  return [input, handleChange, setInput];
};
export default useInput;
