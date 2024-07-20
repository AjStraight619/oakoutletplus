import { BLUR_DATA_URL } from '@/constants/constants';
import Image from 'next/image';

export default function ProjectImageAfter() {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">After</span>
      <Image
        src="/after-test.png"
        alt="After"
        height={300}
        width={300}
        priority={true}
        quality={95}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        // className="object-fill"
      />
    </div>
  );
}
