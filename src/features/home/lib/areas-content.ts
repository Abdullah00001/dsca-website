/**
 * @fileoverview Home “Find Us” areas band (reference `home-areas` + `AL`).
 * @module features/home/lib/areas-content
 */

/** One Dhaka area link on the home locations band. */
export type AreaItem = {
  /** URL slug under `/locations`. */
  id: string;
  /** Display name in the card title. */
  name: string;
  /** Short line under the title (reference `AL[5]`). */
  blurb: string;
};

/**
 * Reference “Find Us” block after the academy gallery.
 */
export const AREAS_CONTENT = {
  eyebrow: "Find Us",
  titleBefore: "Barista Courses Near You — Training Students",
  titleAccent: "from Across Dhaka",
  lead: "DSCA is on Indira Road in Farmgate, one of the best-connected spots in central Dhaka. Students join us from every part of the city. Find barista training near your area:",
  footerLead: "Not sure which course suits you?",
  links: [
    { label: "Compare all barista courses →", href: "/courses" },
    { label: "Contact our team →", href: "/contact" },
    { label: "See all areas →", href: "/locations" },
  ] as const,
  areas: [
    {
      id: "farmgate",
      name: "Farmgate",
      blurb: "Our home campus. Kazi & Chitra Square, Indira Road.",
    },
    {
      id: "indira-road",
      name: "Indira Road",
      blurb: "Train on the road we are based on. Walk in and see the academy.",
    },
    {
      id: "karwan-bazar",
      name: "Karwan Bazar",
      blurb: "Right next to Farmgate, an easy trip to our campus.",
    },
    {
      id: "dhanmondi",
      name: "Dhanmondi",
      blurb: "Coming from Dhanmondi? Our campus is a straightforward ride away.",
    },
    {
      id: "rajabazar",
      name: "Rajabazar",
      blurb: "Close to our Farmgate campus for students in Rajabazar and nearby.",
    },
    {
      id: "green-road",
      name: "Green Road",
      blurb: "Green Road students can reach DSCA quickly and join a small batch.",
    },
    {
      id: "shahbag",
      name: "Shahbag",
      blurb: "From Shahbag to our Indira Road campus, a short journey.",
    },
    {
      id: "tejgaon",
      name: "Tejgaon",
      blurb: "Working or studying in Tejgaon? Farmgate sits inside Tejgaon Thana.",
    },
    {
      id: "bijoy-sarani",
      name: "Bijoy Sarani",
      blurb:
        "Bijoy Sarani is next door to Farmgate. Easy to attend after work or study.",
    },
    {
      id: "agargaon",
      name: "Agargaon",
      blurb:
        "Agargaon students are two Metro stops from our Indira Road campus.",
    },
    {
      id: "hatirjheel",
      name: "Hatirjheel",
      blurb: "Living or working near Hatirjheel? DSCA is close by.",
    },
  ] as const satisfies readonly AreaItem[],
} as const;
