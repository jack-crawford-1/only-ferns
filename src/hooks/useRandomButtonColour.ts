import { useState, useEffect } from 'react';
import { GetNatureDarkColour } from '../utils/getRandomColour';

export function useRandomButtonColour() {
  const [buttonColour, setButtonColour] = useState('#fffff');

  useEffect(() => {
    setButtonColour(GetNatureDarkColour());
  }, []);

  return buttonColour;
}
