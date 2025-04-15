import { useEffect, useState } from 'react';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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

  const fetchFerns = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=fern&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    setFerns((prev) => [...prev, ...data.results]);
  };

  useEffect(() => {
    fetchFerns();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY + 200 >=
      document.body.offsetHeight
    ) {
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-background dark:bg-dark-background md:mt-5">
      {ferns.map((img, i) => (
        <img
          key={`${img.id}-${i}`}
          src={img.urls.small}
          alt={img.alt_description || 'fern'}
          className="w-full md:w-1/5 h-80 object-cover rounded-md"
        />
      ))}
    </div>
  );
}
