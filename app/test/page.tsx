import OldOrder from '@/components/dashboard/old-order';
import ReorderItems from '@/components/dashboard/reorder';
import { InfiniteMovingCardsDemo } from '@/components/test/infinite-cards';
import { shimmer, toBase64, wait } from '@/lib/utils';
import Image from 'next/image';
import SlickCarousel from './slick-carousel';

export default async function TestPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <SlickCarousel />
    </div>
  );
}

function FlexboxTest() {
  return <InfiniteMovingCardsDemo />;
}

const Shimmer = () => (
  <div>
    <h1>Image Component With Shimmer Data URL</h1>
    <h2>Pushed to prod url</h2>
    <Image
      alt="Mountains"
      src="/before-test.png"
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 400))}`}
      width={300}
      height={400}
      style={{
        maxWidth: '300px',
        height: '400px',
      }}
    />
  </div>
);
