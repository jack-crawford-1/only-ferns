import { useState, useEffect } from 'react';
import { GetNatureColour } from '../utils/getRandomColour';

export function useRandomButtonColour() {
  const [buttonColour, setButtonColour] = useState('#fffff');

  useEffect(() => {
    setButtonColour(GetNatureColour());
  }, []);

  return buttonColour;
}
