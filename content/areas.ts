export interface Area {
  name: string;
  slug: string;
  intro: string;
  landmarks: string[];
  postcodes: string[];
  seoTitle: string;
  seoDescription: string;
}

export const areas: Area[] = [
  {
    name: "City Centre",
    slug: "city-centre",
    intro:
      "Covering the heart of Peterborough city centre including Cathedral Square, Queensgate, and the surrounding streets. Whether you live in a flat above the high street or a period property near the Embankment, our engineers are just minutes away.",
    landmarks: ["Cathedral Square", "Queensgate Shopping Centre", "Key Theatre", "Peterborough Cathedral"],
    postcodes: ["PE1 1", "PE1 2", "PE1 3", "PE1 4", "PE1 5"],
    seoTitle: "Plumber in Peterborough City Centre | Fast Response",
    seoDescription:
      "Local plumber serving Peterborough city centre (PE1). Boiler service, emergency repairs, heating, and gas safety. Gas Safe registered. Call today.",
  },
  {
    name: "Orton",
    slug: "orton",
    intro:
      "Serving the Orton townships including Orton Waterville, Orton Goldhay, Orton Southgate, and Orton Longueville. Our plumbers know this area well and provide fast, reliable service to all Orton residents.",
    landmarks: ["Orton Mere", "Nene Park", "Orton Centre", "The Cresset"],
    postcodes: ["PE2 5"],
    seoTitle: "Plumber in Orton, Peterborough | Fast Local Service",
    seoDescription:
      "Local plumber serving Orton, Peterborough. Boiler service, repairs, heating, and emergency plumbing. Gas Safe registered. Call today.",
  },
  {
    name: "Werrington",
    slug: "werrington",
    intro:
      "Providing comprehensive plumbing services to Werrington and surrounding areas. From boiler servicing to emergency repairs, our local engineers are just minutes away.",
    landmarks: ["Werrington Centre", "Werrington Sports Centre", "Ken Stimpson Academy"],
    postcodes: ["PE4 5", "PE4 6"],
    seoTitle: "Plumber in Werrington, Peterborough | Trusted Local Engineers",
    seoDescription:
      "Trusted local plumber in Werrington, Peterborough. Boilers, heating, bathrooms, and emergency call-outs. 30+ years experience.",
  },
  {
    name: "Hampton",
    slug: "hampton",
    intro:
      "Covering all areas of Hampton including Hampton Vale, Hampton Hargate, and Hampton Gardens. Modern homes need modern plumbing solutions — we deliver both.",
    landmarks: ["Hampton Leisure Centre", "Serpentine Green", "Hampton Lakes"],
    postcodes: ["PE7 8"],
    seoTitle: "Plumber in Hampton, Peterborough | Reliable Service",
    seoDescription:
      "Reliable plumber serving Hampton, Peterborough. New-build plumbing, boiler service, heating repairs, and bathroom installations.",
  },
  {
    name: "Bretton",
    slug: "bretton",
    intro:
      "Established plumbing service covering Bretton, Westwood, and Ravensthorpe. We've been helping Bretton residents with their plumbing needs for over three decades.",
    landmarks: ["Bretton Centre", "Bretton Gate", "Peterborough Regional College"],
    postcodes: ["PE3 8", "PE3 9"],
    seoTitle: "Plumber in Bretton, Peterborough | 30+ Years Experience",
    seoDescription:
      "Experienced plumber in Bretton, Peterborough. Gas safe registered for boilers, heating, plumbing repairs, and installations.",
  },
  {
    name: "Market Deeping",
    slug: "market-deeping",
    intro:
      "Providing plumbing and heating services to Market Deeping, Deeping St James, and the surrounding villages. Quality workmanship and reliable service for this growing community.",
    landmarks: ["Market Deeping Town Centre", "The Deepings Leisure Centre", "Deeping Gate"],
    postcodes: ["PE6 8"],
    seoTitle: "Plumber in Market Deeping | Local Gas Safe Engineers",
    seoDescription:
      "Local plumber serving Market Deeping and Deeping St James. Boiler service, central heating, emergency plumbing, and gas safety.",
  },
  {
    name: "Yaxley",
    slug: "yaxley",
    intro:
      "Trusted plumbing services for Yaxley and Farcet residents. Our engineers provide a full range of plumbing, heating, and gas services to this thriving village community.",
    landmarks: ["Yaxley Village Centre", "The Recreation Ground", "St Peter's Church"],
    postcodes: ["PE7 3"],
    seoTitle: "Plumber in Yaxley, Peterborough | Trusted Village Plumber",
    seoDescription:
      "Trusted plumber in Yaxley, Peterborough. Heating, plumbing, boilers, and emergency repairs. Serving Yaxley and Farcet.",
  },
  {
    name: "Whittlesey",
    slug: "whittlesey",
    intro:
      "Serving Whittlesey and the surrounding Fenland area with professional plumbing and heating services. From historic properties to modern homes, we handle it all.",
    landmarks: ["Whittlesey Market Place", "The Buttercross", "Must Farm"],
    postcodes: ["PE7 1", "PE7 2"],
    seoTitle: "Plumber in Whittlesey | Professional Plumbing & Heating",
    seoDescription:
      "Professional plumber serving Whittlesey. Boiler servicing, central heating, bathroom installations, and emergency plumbing.",
  },
  {
    name: "Stamford",
    slug: "stamford",
    intro:
      "Premium plumbing services for Stamford's beautiful Georgian properties and modern developments alike. Our experienced team understands the unique requirements of Stamford's diverse housing stock.",
    landmarks: ["Stamford Town Centre", "Burghley House", "Stamford Meadows"],
    postcodes: ["PE9 1", "PE9 2"],
    seoTitle: "Plumber in Stamford | Premium Local Plumbing Service",
    seoDescription:
      "Premium plumbing service in Stamford. Specialist care for period and modern properties. Boilers, heating, bathrooms, and emergency repairs.",
  },
];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((a) => a.slug);
}
