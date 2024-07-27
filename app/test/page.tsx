import { shimmer, toBase64, wait } from '@/lib/utils';
import Image from 'next/image';

export default async function TestPage() {
  return <FlexboxTest />;
}

function FlexboxTest() {
  return (
    <div>
      {/* <div className="flex container border rounded-md border-green-600">
        <div className="flex-1 bg-blue-500 text-white">Flex 1</div>
        <div className="flex-grow bg-green-500 text-white">Flex Grow</div>
        <div className="flex-shrink-0 bg-red-500 text-white">Flex Shrink 0</div>
      </div> */}
      {/* <Shimmer /> */}
    </div>
  );
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
