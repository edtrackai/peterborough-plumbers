export interface Review {
  customerName: string;
  areaName: string;
  rating: number;
  body: string;
  source: "Customer" | "Google" | "Other";
  featured: boolean;
}

export const reviews: Review[] = [
  {
    customerName: "James T.",
    areaName: "Orton",
    rating: 5,
    body: "Brilliant service from start to finish. Called in the morning about a leaking pipe and they were out within the hour. Fixed quickly, cleaned up after themselves, and the price was very fair. Highly recommend.",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "Sarah M.",
    areaName: "Werrington",
    rating: 5,
    body: "Had our full bathroom refitted and the result is stunning. The team was professional, punctual, and kept us informed throughout. Couldn't be happier with the quality of work.",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "David & Claire P.",
    areaName: "Hampton",
    rating: 5,
    body: "We've used Peterborough Plumbers for our annual boiler service for three years now. Always reliable, always thorough. They also spotted a small issue last year that could've become a big problem. Trustworthy and knowledgeable.",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "Karen L.",
    areaName: "Bretton",
    rating: 5,
    body: "Emergency call-out on a Sunday evening for a burst pipe. They arrived within 45 minutes and had it sorted in no time. Professional and friendly even at unsociable hours. Thank you!",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "Mike R.",
    areaName: "Market Deeping",
    rating: 4,
    body: "Great job installing our new central heating system. The team worked efficiently and left the house tidy each day. Good advice on choosing the right boiler for our property too.",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "Angela W.",
    areaName: "Yaxley",
    rating: 5,
    body: "As a landlord with several properties, finding a reliable plumber is essential. Peterborough Plumbers handle all my gas safety certificates and maintenance. Always professional and reasonably priced.",
    source: "Customer",
    featured: true,
  },
  {
    customerName: "Tom H.",
    areaName: "Whittlesey",
    rating: 5,
    body: "Called about a persistent dripping tap that had been driving us mad. Fixed in under an hour at a very reasonable price. Friendly engineer who explained everything clearly.",
    source: "Customer",
    featured: false,
  },
  {
    customerName: "Rachel & Ben S.",
    areaName: "Stamford",
    rating: 5,
    body: "Completed a pre-purchase plumbing survey for us before we bought our Victorian house. The report was incredibly detailed and saved us thousands in negotiations. Invaluable service.",
    source: "Customer",
    featured: true,
  },
];

export function getFeaturedReviews(): Review[] {
  return reviews.filter((r) => r.featured);
}
