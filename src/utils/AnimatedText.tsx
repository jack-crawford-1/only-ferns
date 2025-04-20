import { ColourfulLetter } from './ColourfulLetter';

export default function AnimatedText({ children }: { children: string }) {
  return (
    <span>
      {/* First, split the entire string into words */}
      {children.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="md:mr-4 inline-flex ">
          {/* Then, for each word, split it into letters and wrap each one in a ColourfulLetter component*/}
          {word.split('').map((letter, letterIndex) => (
            <ColourfulLetter letter={letter} key={letterIndex} />
            // each letter gets its own animated component so they all update independently
          ))}
        </span>
      ))}
    </span>
  );
}
