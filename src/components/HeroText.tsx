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
          style={{ borderColor: buttonColour, border: '4px solid' }}
          className="text-text py-3 px-8 rounded-md shadow-md uppercase font-bold text-shadow-emerald-900 text-shadow-md transition-colors duration-300 s border-2"
        >
          Reveal Ferns <span className="pl-1">↓</span>
        </button>
      </a>
    </div>
  );
}
