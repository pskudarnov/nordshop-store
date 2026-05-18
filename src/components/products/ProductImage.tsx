"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK_PRODUCT_IMAGE = "/images/products/fallback-product.webp";
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTYnIGhlaWdodD0nMTInIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEyJyBmaWxsPScjZTRlN2ViJy8+PC9zdmc+";

type ProductImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export function ProductImage({
  src,
  fallbackSrc = FALLBACK_PRODUCT_IMAGE,
  alt,
  ...rest
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}
