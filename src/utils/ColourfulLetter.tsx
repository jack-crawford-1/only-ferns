import { useState, useEffect } from 'react';
import { GetMidtoneColour, GetNatureColour } from './getRandomColour';

export function ColourfulLetter({ letter }: { letter: string }) {
  const [colour, setColour] = useState('#ffffff');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setColour(GetNatureColour());
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setColour(GetMidtoneColour());
  };

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: colour,
        transition: isHovered
          ? 'color 0.3s ease-in-out'
          : 'color 1s ease-in-out',
      }}
    >
      {letter}
    </span>
  );
}
