import React, { useEffect, useState } from 'react';

import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui/skeleton';

type TImgProperties = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLazy?: boolean;
} & ComponentProps<'img'>;

export default function Img({
  src,
  alt,
  width,
  height,
  className,
  isLazy,
  ...otherProperties
}: TImgProperties) {
  const [isImageLoaded, setIsImageLoaded] = useState(isLazy ? false : true);

  useEffect(() => {
    if (isLazy) {
      const image = new Image();
      image.src = src;
      image.addEventListener('load', () => setIsImageLoaded(true));
    }
  }, [src, isLazy]);

  if (!isImageLoaded) {
    return <Skeleton className={cn('', className)} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={isLazy ? 'lazy' : 'eager'}
      className={cn('', className)}
      {...otherProperties}
    />
  );
}
