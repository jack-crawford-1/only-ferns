import './styles/App.css';
import FernGallery from './components/FernGallery';
import AnimatedText from './utils/AnimatedText';

function App() {
  return (
    <div className="bg-dark-background w-full">
      <div className="relative h-screen flex flex-col justify-center items-center ">
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[13rem] font-bold uppercase text-center z-10">
            <AnimatedText>Only Ferns</AnimatedText>
          </p>
          <a href="#ferns" className="z-20">
            <button className="text-text bg-emerald-600 py-3 px-8 mt-10 rounded-md  shadow-md shadow-emerald-50  uppercase font-bold text-shadow-emerald-900 text-shadow-lg">
              Reveal Ferns
              <span className="pl-1">↓</span>
            </button>
          </a>
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="./herofern.png"
              className="w-full h-full object-cover md:object-contain"
              alt="Hero Fern"
            />
          </div>
        </div>
      </div>
      <div className="min-h-screen" id="ferns">
        <FernGallery />
      </div>
    </div>
  );
}

export default App;
