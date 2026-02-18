import { siteSettings } from "@/content/settings";

const googleLetterColors = [
  "#4285F4", // G — blue
  "#EA4335", // o — red
  "#FBBC05", // o — yellow
  "#4285F4", // g — blue
  "#34A853", // l — green
  "#EA4335", // e — red
];

export default function GoogleReviewBadge({
  rating = siteSettings.googleRating,
  reviewCount,
}: {
  rating?: string;
  reviewCount?: number;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 shadow-md border border-white/10">
      {/* Google colored letters */}
      <span className="text-sm font-semibold leading-none" aria-label="Google">
        {"Google".split("").map((letter, i) => (
          <span key={i} style={{ color: googleLetterColors[i] }}>
            {letter}
          </span>
        ))}
      </span>

      {/* Rating */}
      {rating && (
        <span className="text-white font-bold text-sm leading-none">{rating}</span>
      )}

      {/* Stars */}
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-pp-yellow"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Optional review count */}
      {reviewCount !== undefined && (
        <span className="text-white/50 text-xs leading-none">({reviewCount})</span>
      )}
    </div>
  );
}
