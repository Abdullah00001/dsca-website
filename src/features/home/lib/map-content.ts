/**
 * @fileoverview Home map band (reference post-areas map block).
 * @module features/home/lib/map-content
 */

/**
 * “Find DSCA on the Map” — live embed + visit copy + directions CTA.
 */
export const MAP_CONTENT = {
  titleBefore: "Find DSCA on the Map —",
  titleAccent: "Indira Road, Farmgate",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d70539.571324586!2d90.3459808!3d23.7283141!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa159f633b571e0d1%3A0x522a9b6813621bc7!2sDhaka%20Specialty%20Coffee%20Academy!5e1!3m2!1sen!2sbd!4v1795151255551!5m2!1sen!2sbd",
  embedTitle:
    "Map of Dhaka Specialty Coffee Academy, Indira Road, Farmgate",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=Dhaka+Specialty+Coffee+Academy",
  directionsLabel: "Get Direction",
  panel: {
    eyebrow: "Visit the academy",
    name: "Dhaka Specialty Coffee Academy (DSCA)",
    address:
      "Kazi & Chitra Square, 34/A Indira Road, Lift-5, Farmgate, Dhaka-1215, Bangladesh",
    phoneLabel: "+880 1810-545545",
    phoneHref: "tel:+8801810545545",
    hours: "Saturday to Friday, 9:00 am to 9:00 pm",
  },
} as const;
