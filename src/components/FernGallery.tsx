import { useEffect, useState } from 'react';
import { useRandomButtonColour } from '../hooks/useRandomButtonColour';
import fetchFerns from '../api/fetchFerns';

type UnsplashImage = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
};

export default function FernGallery() {
  const [ferns, setFerns] = useState<UnsplashImage[]>([]); // stores fetched fern images. starts off empty and gets filled as we fetch
  const [page, setPage] = useState(1); // tracks the current page for API pagination. Unsplash gives us images in pages.
  const [showButton, setShowButton] = useState(false); // controls whether the "Back to Top" button is showing or hidden
  const buttonColour = useRandomButtonColour(); // Custom hook that gives us a random colour each time

  // Fetches ferns whenever the page state changes
  useEffect(() => {
    const loadFerns = async () => {
      try {
        // Calls the function that talks to the API and gets more fern images based on what page we're on
        const newFerns = await fetchFerns(page);
        // keeps the old ferns and add the new ones to the end
        setFerns((prev) => [...prev, ...newFerns]);
      } catch (error) {
        console.error(error);
      }
    };
    loadFerns(); // run the fetch when page changes
  }, [page]);

  // Watches for scroll events to either load more ferns or show the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      // Checks if you've scrolled close to the bottom of the page — adds a bit of buffer so it starts loading before you fully hit the bottom
      const haveScrolledDown =
        window.innerHeight + window.scrollY + 200 >= document.body.offsetHeight;

      if (haveScrolledDown) {
        // If we are near the bottom, go to the next page — which will trigger the fetch above
        setPage((prevPage) => prevPage + 1);
      }

      // If we’ve scrolled down far enough (like 300px), we want to show the "Back to Top" button
      setShowButton(window.scrollY > 300);
    };

    // Add the scroll event to the window — so now whenever the user scrolls, we run our handleScroll function
    window.addEventListener('scroll', handleScroll);

    // When this component is removed from the page (like if you go to a different route or screen), we clean up the scroll listener
    // Otherwise, it would keep running even though this component is no longer visible.
    // The DOM is like a live tree of what’s on the page — so when this component "unmounts", it’s being removed from that tree
    return () => {
      window.removeEventListener('scroll', handleScroll); // this removes the scroll check once we’re no longer using it
    };
  }, []);

  // Called when you click the "Back to Top" button — scrolls smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Goes through all the fern images we’ve loaded and shows them on the screen */}
      <div className="flex flex-wrap justify-center gap-4 p-4 bg-background dark:bg-dark-background md:mt-5">
        {ferns.map((img, i) => (
          <img
            key={`${img.id}-${i}`}
            src={img.urls.small}
            alt={img.alt_description || 'fern'}
            className="w-full md:w-1/5 h-80 object-cover rounded-md"
            loading="lazy" // waits until the image is close to view before loading — improves performance
          />
        ))}
      </div>
      {/* This button only shows if showButton is true (meaning the user has scrolled down) */}
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{ background: buttonColour }} // sets the background using our random colour hook
          className="fixed bottom-6 right-6 text-white px-4 py-2 rounded-md border-4 shadow-md uppercase font-bold text-shadow-emerald-900 text-shadow-md transition-colors duration-300"
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
}
