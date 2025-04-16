import { ColourfulLetter } from './ColourfulLetter';

export default function AnimatedText({ children }: { children: string }) {
  return (
    <span>
      {children.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="md:mr-4 inline-flex ">
          {word.split('').map((letter, letterIndex) => (
            <ColourfulLetter letter={letter} key={letterIndex} />
          ))}
        </span>
      ))}
    </span>
  );
}
