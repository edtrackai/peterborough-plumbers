# Schema Templates for Peterborough Master Skill

Complete JSON-LD templates for structured data. Replace [domain], [REAL-NUMBER], [PLACEHOLDER] with actual values. Use UK spelling and formats throughout.

---

## 1. HOMEPAGE (LocalBusiness + WebSite + AggregateRating in @graph)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://[domain]/#business",
      "name": "[PLACEHOLDER Business Name]",
      "image": "https://[domain]/images/logo.webp",
      "description": "[PLACEHOLDER 155-160 char meta description]",
      "url": "https://[domain]",
      "telephone": "[REAL-NUMBER tel link format: +44 1733 XXXXXX]",
      "email": "[PLACEHOLDER contact@domain.uk]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[PLACEHOLDER Street Address]",
        "addressLocality": "Peterborough",
        "addressRegion": "Cambridgeshire",
        "postalCode": "[PLACEHOLDER PE1-PE9]",
        "addressCountry": "GB"
      },
      "priceRange": "[PLACEHOLDER £]",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "[REAL-NUMBER 4.5-5.0]",
        "ratingCount": "[REAL-NUMBER 50+]"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[REAL-NUMBER 52.57-52.63]",
        "longitude": "[REAL-NUMBER -0.24 to -0.18]"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://[domain]/#website",
      "url": "https://[domain]",
      "name": "[PLACEHOLDER Business Name]",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://[domain]/search?q={search_term_string}"
        }
      }
    }
  ]
}
```

---

## 2. SERVICE PAGE (Service + FAQPage + BreadcrumbList in @graph)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://[domain]/services/[service-slug]#service",
      "name": "[PLACEHOLDER Service Name]",
      "description": "[PLACEHOLDER 120-150 words]",
      "url": "https://[domain]/services/[service-slug]",
      "image": "https://[domain]/images/services/[service]-hero.webp",
      "areaServed": {
        "@type": "City",
        "name": "Peterborough",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Cambridgeshire",
          "addressCountry": "GB"
        }
      },
      "provider": {
        "@type": "LocalBusiness",
        "@id": "https://[domain]/#business"
      },
      "priceRange": "[PLACEHOLDER £60-£200+]",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "price": "[REAL-NUMBER starting price]"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://[domain]/services/[service-slug]#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Question 1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER FAQ Answer 1]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Question 2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER FAQ Answer 2]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Question 3]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER FAQ Answer 3]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Question 4]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER FAQ Answer 4]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Question 5]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER FAQ Answer 5]"
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/services/[service-slug]#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://[domain]/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[PLACEHOLDER Service Name]",
          "item": "https://[domain]/services/[service-slug]"
        }
      ]
    }
  ]
}
```

---

## 3. AREA PAGE (Plumber with areaServed + FAQPage + BreadcrumbList)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Plumber",
      "@id": "https://[domain]/areas/[area-slug]#business",
      "name": "[PLACEHOLDER Business Name] - [PLACEHOLDER Area Name]",
      "description": "[PLACEHOLDER 150+ words about service in area]",
      "url": "https://[domain]/areas/[area-slug]",
      "telephone": "[REAL-NUMBER +44 1733 XXXXXX]",
      "areaServed": {
        "@type": "City",
        "name": "[PLACEHOLDER Area Name]",
        "address": {
          "@type": "PostalAddress",
          "postalCode": "[PLACEHOLDER PE1-PE9]",
          "addressCountry": "GB"
        }
      },
      "image": "https://[domain]/images/areas/[area]-hero.webp",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "[REAL-NUMBER 4.5-5.0]",
        "ratingCount": "[REAL-NUMBER 20+]"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://[domain]/areas/[area-slug]#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[PLACEHOLDER Area FAQ Q1: response time or service area]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer mentioning specific area and response time]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER Area FAQ Q2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER Area FAQ Q3]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER Area FAQ Q4]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer]"
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/areas/[area-slug]#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Service Areas",
          "item": "https://[domain]/areas"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[PLACEHOLDER Area Name]",
          "item": "https://[domain]/areas/[area-slug]"
        }
      ]
    }
  ]
}
```

---

## 4. BLOG/ARTICLE PAGE (Article + FAQPage + BreadcrumbList)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://[domain]/blog/[article-slug]#article",
      "headline": "[PLACEHOLDER Article H1 Title (50-60 chars)]",
      "description": "[PLACEHOLDER Meta description 155-160 chars]",
      "image": [
        "https://[domain]/images/blog/[article]-hero.webp"
      ],
      "datePublished": "[REAL-NUMBER YYYY-MM-DD]",
      "dateModified": "[REAL-NUMBER YYYY-MM-DD]",
      "author": {
        "@type": "Organization",
        "name": "[PLACEHOLDER Business Name]",
        "url": "https://[domain]"
      },
      "publisher": {
        "@type": "Organization",
        "name": "[PLACEHOLDER Business Name]",
        "logo": {
          "@type": "ImageObject",
          "url": "https://[domain]/images/logo.webp"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://[domain]/blog/[article-slug]"
      },
      "articleBody": "[PLACEHOLDER Full article body in markdown or plain text]",
      "wordCount": "[REAL-NUMBER 1200-2500]"
    },
    {
      "@type": "FAQPage",
      "@id": "https://[domain]/blog/[article-slug]#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ derived from article content Q1]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer Q1]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Q2]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer Q2]"
          }
        },
        {
          "@type": "Question",
          "name": "[PLACEHOLDER FAQ Q3]",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "[PLACEHOLDER Answer Q3]"
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/blog/[article-slug]#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://[domain]/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "[PLACEHOLDER Article Title]",
          "item": "https://[domain]/blog/[article-slug]"
        }
      ]
    }
  ]
}
```

---

## 5. ABOUT PAGE (Organization + BreadcrumbList)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://[domain]/about#organization",
      "name": "[PLACEHOLDER Business Name]",
      "url": "https://[domain]",
      "telephone": "[REAL-NUMBER +44 1733 XXXXXX]",
      "email": "[PLACEHOLDER contact@domain.uk]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[PLACEHOLDER Street Address]",
        "addressLocality": "Peterborough",
        "addressRegion": "Cambridgeshire",
        "postalCode": "[PLACEHOLDER PE1-PE9]",
        "addressCountry": "GB"
      },
      "sameAs": [
        "https://www.facebook.com/[PLACEHOLDER]",
        "https://www.instagram.com/[PLACEHOLDER]",
        "https://www.trustpilot.com/review/[domain]"
      ],
      "foundingDate": "[REAL-NUMBER YYYY]",
      "description": "[PLACEHOLDER 150+ words about company history]",
      "image": "https://[domain]/images/about-team.webp"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/about#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://[domain]/about"
        }
      ]
    }
  ]
}
```

---

## 6. REVIEWS PAGE (LocalBusiness with AggregateRating + Review[] + BreadcrumbList)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://[domain]/reviews#business",
      "name": "[PLACEHOLDER Business Name]",
      "url": "https://[domain]/reviews",
      "telephone": "[REAL-NUMBER +44 1733 XXXXXX]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[PLACEHOLDER Street Address]",
        "addressLocality": "Peterborough",
        "addressRegion": "Cambridgeshire",
        "postalCode": "[PLACEHOLDER PE1-PE9]",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "[REAL-NUMBER 4.5-5.0]",
        "ratingCount": "[REAL-NUMBER 100+]",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "[REAL-NUMBER 4-5]"
          },
          "author": {
            "@type": "Person",
            "name": "[PLACEHOLDER Reviewer Name]"
          },
          "reviewBody": "[PLACEHOLDER Review text 50-200 words]",
          "datePublished": "[REAL-NUMBER YYYY-MM-DD]"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "[REAL-NUMBER 4-5]"
          },
          "author": {
            "@type": "Person",
            "name": "[PLACEHOLDER Reviewer Name]"
          },
          "reviewBody": "[PLACEHOLDER Review text 50-200 words]",
          "datePublished": "[REAL-NUMBER YYYY-MM-DD]"
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://[domain]/reviews#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://[domain]"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Reviews",
          "item": "https://[domain]/reviews"
        }
      ]
    }
  ]
}
```

---

## Implementation Notes

1. **Replace Markers:**
   - [domain]: e.g., peterboroughplumber.co.uk
   - [REAL-NUMBER]: Actual data (phone, rating, date, price)
   - [PLACEHOLDER]: Template text to fill
   - [service-slug], [area-slug], [article-slug]: URL slugs

2. **UK Format Requirements:**
   - Phone: +44 with area code (e.g., +44 1733 XXXXXX)
   - Postcodes: PE1-PE9 range for Peterborough
   - Addresses: British format (Street, City, Region, Postcode, GB)
   - Spelling: British English (organised, favour, colour, etc.)

3. **Validation:**
   - Use Google Rich Results Test
   - Validate with Schema.org validator
   - Check breadcrumb trail is logical
   - Ensure all URLs match actual pages

4. **SEO Best Practices:**
   - FAQPage for every page type (minimum 5 for services)
   - AggregateRating only where you have real reviews
   - BreadcrumbList on every page
   - image: Use high-quality WebP format URLs
   - Include phone numbers as tel: links in templates
