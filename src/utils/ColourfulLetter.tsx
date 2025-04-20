import { useState, useEffect } from 'react';
import { GetMidtoneColour, GetNatureColour } from './getRandomColour';

export function ColourfulLetter({ letter }: { letter: string }) {
  const [colour, setColour] = useState('#ffffff'); // starts off white — this will change every 2 seconds unless hovered
  const [isHovered, setIsHovered] = useState(false); // tracks if the mouse is currently over the letter

  useEffect(() => {
    // every 2 seconds, tries to change the colour if it’s not being hovered over and grabs a random colour
    const interval = setInterval(() => {
      if (!isHovered) {
        setColour(GetNatureColour());
      }
    }, 2000);

    return () => clearInterval(interval);
    // when unmounted, clears the interval so it stops trying to update
  }, [isHovered]); // we include isHovered as a dependency because it affects whether we change the colour

  const handleMouseEnter = () => {
    setIsHovered(true); // now that we’re hovering, stop the auto change
    setColour(GetMidtoneColour()); // set to a more noticeable colour when hovering
  };

  const handleMouseLeave = () => setIsHovered(false); // when the mouse leaves, it can start changing colours again

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: colour, // applies the current colour to the text
        transition: isHovered
          ? 'color 0.3s ease-in-out'
          : 'color 1s ease-in-out',
      }}
    >
      {letter}
    </span>
  );
}
