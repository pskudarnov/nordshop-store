"use client";

import { ProductImage } from "@/components/products/ProductImage";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const gallery = images.length ? images : ["/images/products/fallback-product.webp"];

  const getAltText = (idx: number) => {
    if (idx === 0) return `${name} main catalog image`;
    if (idx === 1) return `${name} angled product view`;
    if (idx === 2) return `${name} setup context view`;
    return `${name} material detail view`;
  };

  return (
    <div className="space-y-2.5">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 176, damping: 23 }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[radial-gradient(circle_at_50%_18%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_34%),linear-gradient(145deg,color-mix(in_srgb,var(--background-elevated)_78%,var(--card)),var(--muted))]"
        aria-label={`${name} preview image`}
      >
        <motion.div
          key={active}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-7"
        >
          <ProductImage
            src={gallery[active]}
            alt={getAltText(active)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain drop-shadow-[0_30px_38px_rgba(0,0,0,0.3)]"
            priority={active === 0}
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-x-16 bottom-5 h-10 rounded-full bg-black/20 blur-3xl" />
      </motion.div>

      <div className="grid grid-cols-4 gap-2.5" role="list" aria-label="Product thumbnails">
        {gallery.map((item, idx) => (
          <button
            key={`${item}-${idx}`}
            onClick={() => setActive(idx)}
            className={`relative h-20 overflow-hidden rounded-xl border bg-[linear-gradient(145deg,color-mix(in_srgb,var(--background-elevated)_82%,var(--card)),var(--muted))] transition ${active === idx ? "border-[var(--accent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_40%,transparent)]" : "border-[var(--border)] hover:border-[color-mix(in_srgb,var(--accent)_55%,var(--border))]"}`}
            aria-label={`Show image ${idx + 1}`}
            aria-pressed={active === idx}
          >
            <div className="absolute inset-2">
              <ProductImage
                src={item}
                alt={getAltText(idx)}
                fill
                sizes="96px"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
