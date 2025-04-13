import { motion } from 'framer-motion';
import { ColourfulLetter } from './ColourfulLetter';

export default function AnimatedText({ children }: { children: string }) {
  const text = children.split(' ');

  return (
    <span>
      {text.map((word, wordIndex) => (
        <span key={wordIndex} className="mr-2 inline-flex ">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1, y: [0, -4, 0] }}
              transition={{
                duration: 1,
                delay: wordIndex * 0.1 + letterIndex * 0.05,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <ColourfulLetter letter={letter} />
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
