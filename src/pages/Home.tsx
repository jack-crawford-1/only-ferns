import HeroText from '../components/HeroText';
import HeroImage from '../components/HeroImage';
import FernGallery from '../components/FernGallery';

function Home() {
  return (
    <div className="dark:bg-dark-background bg-background w-full winky">
      <div className="relative h-screen flex flex-col justify-center items-center">
        <HeroText />
        <HeroImage />
      </div>
      <div className="min-h-screen" id="ferns">
        <FernGallery />
      </div>
    </div>
  );
}

export default Home;
