import { useEffect, useState } from 'react';
import { useRandomButtonColour } from '../hooks/useRandomButtonColour';

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

type UnsplashImage = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
};

export default function FernGallery() {
  const [ferns, setFerns] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const buttonColour = useRandomButtonColour();

  useEffect(() => {
    const fetchFerns = async () => {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=fern&per_page=12&page=${page}&client_id=${accessKey}`
      );
      const data = await res.json();
      setFerns((prev) => [...prev, ...data.results]);
    };

    fetchFerns();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 200 >= document.body.offsetHeight;

      if (scrolledToBottom) {
        setPage((p) => p + 1);
      }

      setShowButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-background dark:bg-dark-background md:mt-5">
        {ferns.map((img, i) => (
          <img
            key={`${img.id}-${i}`}
            src={img.urls.small}
            alt={img.alt_description || 'fern'}
            className="w-full md:w-1/5 h-80 object-cover rounded-md"
            loading="lazy"
          />
        ))}
      </div>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{ background: buttonColour }}
          className="fixed bottom-6 right-6 text-white px-4 py-2 rounded-md border-4 shadow-md uppercase font-bold text-shadow-emerald-900 text-shadow-md transition-colors duration-300"
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
}
