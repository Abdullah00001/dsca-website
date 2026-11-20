/**
 * @fileoverview Home training-video band (reference post-map video block).
 * @module features/home/lib/video-content
 */

const VIDEO_ID = "7Ey5SAtQvNg";

/**
 * “See DSCA’s Barista Training in Action” — looping 16:9 YouTube embed.
 * Mute is required for autoplay; `playlist` is the same id so `loop` repeats.
 */
export const VIDEO_CONTENT = {
  titleLine1: "See DSCA's Barista",
  titleLine2: "Training in Action —",
  titleAccent: "Dhaka",
  lead: "Watch DSCA students learn espresso preparation, milk steaming, latte art and café workflow in a real café setup in Farmgate, Dhaka.",
  embedSrc: `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&rel=0&modestbranding=1`,
  embedTitle: "DSCA barista training in Farmgate, Dhaka",
} as const;
