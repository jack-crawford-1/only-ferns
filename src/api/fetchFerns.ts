const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// in Vite, we use `import.meta.env`which pulls the API access key from the environment variables

const fetchFerns = async (page: number) => {
  // takes a page number as an argument so we can fetch different sets of ferns depending on what page we're on
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=fern&per_page=12&page=${page}&client_id=${accessKey}`
  );
  // this calls the Unsplash API with our query set to "fern"
  // `per_page=12` means we want 12 fern images at a time
  // we include the page number so we can paginate through results
  // the `client_id` is our API key to tell Unsplash who we are

  if (!res.ok) {
    throw new Error('failed to fetch ferns');
  }

  const data = await res.json();
  // converts the response into actual JSON we can use — Unsplash sends the images under `results`
  console.log(data.results);
  return data.results;
  // returns just the array of fern image objects — the rest of the response has other metadata we don't need
};

export default fetchFerns;
