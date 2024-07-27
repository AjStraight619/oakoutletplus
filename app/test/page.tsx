import { AppleCardsCarouselDemo } from '@/components/test/carousel-demo';
import { InfiniteMovingCardsDemo } from '@/components/test/infinite-cards';
import { shimmer, toBase64, wait } from '@/lib/utils';
import Image from 'next/image';

export default async function TestPage() {
  return <FlexboxTest />;
}

function FlexboxTest() {
  return <InfiniteMovingCardsDemo />;
}

const Shimmer = () => (
  <div>
    <h1>Image Component With Shimmer Data URL</h1>
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
