import Hero from '@/components/landing-page/hero';
import InfiniteImages from '@/components/landing-page/infinite-images';
import Navbar from '@/components/landing-page/navbar';

export default async function Home() {
  const apiKey = process.env.YELP_API_KEY!;
  console.log('API KEY: ', apiKey);
  const url =
    'https://api.yelp.com/v3/businesses/oak-outlet-plus-chula-vista-2';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.YELP_API_KEY!}`,
    },
  };

  await fetch(url, {
    ...options,
    next: { revalidate: 604800 },
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

  // getBusinessReviews(apiKey);

  return (
    <main className="relative flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Navbar />
        <Hero />
        <InfiniteImages />
      </div>
    </main>
  );
}

async function getBusinessReviews(apiKey: string) {
  // Step 1: Get the business ID or alias
  const businessName = 'oak-outlet-plus-chula-vista-2';
  const location = 'Chula Vista, CA';
  const searchUrl = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(
    businessName,
  )}&location=${encodeURIComponent(location)}`;
  const searchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  let businessId;
  try {
    const res = await fetch(searchUrl, searchOptions);
    const data = await res.json();
    if (data.businesses && data.businesses.length > 0) {
      businessId = data.businesses[0].id;
    } else {
      console.log('No business found');
      return;
    }
  } catch (err) {
    console.error('error:' + err);
    return;
  }

  // Step 2: Fetch reviews using the business ID
  const reviewsUrl = `https://api.yelp.com/v3/businesses/${businessId}/reviews?limit=20&sort_by=yelp_sort`;
  const reviewsOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const res = await fetch(reviewsUrl, reviewsOptions);
    const reviewsData = await res.json();
    console.log(reviewsData);
  } catch (err) {
    console.error('error:' + err);
  }
}
