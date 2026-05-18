export const categories = ["Lighting", "Accessories", "Audio", "Furniture", "Power"] as const;

export type Category = (typeof categories)[number];
