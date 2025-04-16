import AnimatedText from '../utils/AnimatedText';
import { useRandomButtonColour } from '../hooks/useRandomButtonColour';

export default function HeroText() {
  const buttonColour = useRandomButtonColour();

  return (
    <div className="flex-1 flex flex-col items-center z-10 py-8">
      <div className="flex-1 flex items-center justify-center">
        <p className="text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[13rem] font-bold uppercase text-center leading-none">
          <AnimatedText>Only Ferns</AnimatedText>
        </p>
      </div>

      <a href="#ferns" className="mt-10 mb-4">
        <button
          style={{
            border: '4px solid',
            backgroundColor: buttonColour,
          }}
          className="text-text dark:text-dark-text bg-dark-background  dark:bg-emerald-800 py-3 px-5 rounded-lg shadow-md uppercase font-bold transition-colors duration-300 "
        >
          See Ferns
          <span className="pl-4">🌿 ↓</span>
        </button>
      </a>
    </div>
  );
}
