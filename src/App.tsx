import './styles/App.css';
import FernGallery from './components/FernGallery';
import AnimatedText from './utils/AnimatedText';

function App() {
  return (
    <div className="bg-background dark:bg-dark-background w-full ">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[13rem] font-bold uppercase text-center z-10">
            <AnimatedText>Only Ferns</AnimatedText>
          </p>
          <button className="text-text bg-emerald-600 py-3 px-8 mt-10 rounded-md  shadow-lg shadow-black z-20 uppercase font-bold text-shadow-emerald-900 text-shadow-lg bottom-20 absolute">
            See Ferns
            <span className="pl-1">↓</span>
          </button>
          <div>
            <img
              src={`./herofern.png`}
              className="absolute w-full h-fit md:h-full md:top-0 md:w-fit top-30 left-0 "
            ></img>
          </div>
        </div>
      </div>
      <div className="min-h-screen">
        <FernGallery />
      </div>
    </div>
  );
}

export default App;
