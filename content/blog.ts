export interface BlogPost {
  title: string;
  slug: string;
  category: "Boiler & Heating" | "Landlord & Legal" | "Emergency & Repairs" | "Local Guides";
  excerpt: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  status: "Draft" | "Published";
  publishedAt: string | null;
}

export const blogPosts: BlogPost[] = [
  {
    title: "How Often Should You Service Your Boiler?",
    slug: "how-often-service-boiler",
    category: "Boiler & Heating",
    excerpt:
      "Regular boiler servicing keeps your family safe and your heating efficient. Here's everything you need to know about boiler service intervals.",
    content: `<h2>Why Annual Boiler Servicing Matters</h2>
<p>Your boiler is one of the hardest-working appliances in your home, yet it's often forgotten until something goes wrong. An annual <a href="/services/boiler-service">boiler service</a> is the single most important thing you can do to keep your heating system safe, efficient, and reliable.</p>
<h3>Safety First</h3>
<p>A poorly maintained boiler can produce carbon monoxide — a colourless, odourless gas that kills around 30 people in the UK every year. Annual servicing includes combustion analysis to ensure your boiler is burning gas safely.</p>
<h3>Protect Your Warranty</h3>
<p>Almost all boiler manufacturers require an annual service by a Gas Safe registered engineer to maintain your warranty. Skip a service and you could void your warranty entirely.</p>
<h3>Save Money on Energy Bills</h3>
<p>A well-maintained boiler runs more efficiently, using less gas to heat your home. Even a small drop in efficiency can add up to hundreds of pounds in wasted energy over the year.</p>
<h3>When to Book</h3>
<p>The best time to <a href="/book">book a boiler service</a> is during the summer months when demand is low and you won't miss your heating if a repair is needed. Don't wait until the first cold snap — by then, plumbers are at their busiest. Our <a href="/services/central-heating-services">central heating engineers</a> serve the whole of Peterborough and surrounding areas.</p>`,
    seoTitle: "How Often Should You Service Your Boiler? | Expert Advice",
    seoDescription:
      "Find out how often to service your boiler and why annual servicing is essential for safety, efficiency, and warranty. Expert advice from Gas Safe engineers.",
    status: "Published",
    publishedAt: "2025-01-15",
  },
  {
    title: "Landlord Gas Safety Guide: Everything You Need to Know",
    slug: "landlord-gas-safety-guide",
    category: "Landlord & Legal",
    excerpt:
      "A complete guide to gas safety obligations for landlords in England. Stay compliant and protect your tenants.",
    content: `<h2>Your Legal Obligations as a Landlord</h2>
<p>As a landlord, you have a legal duty to ensure all gas appliances in your rental properties are safe. The Gas Safety (Installation and Use) Regulations 1998 set out clear requirements that every landlord must follow.</p>
<h3>Annual Gas Safety Checks</h3>
<p>You must arrange a <a href="/services/gas-safety-certificates">gas safety check</a> on every gas appliance in each of your rental properties every 12 months. This must be carried out by a Gas Safe registered engineer who will issue a Gas Safety Certificate (CP12).</p>
<h3>What Gets Checked?</h3>
<p>The engineer will inspect all gas appliances including boilers, gas fires, gas cookers, and gas hobs. They'll check the condition of pipework, flues, and ventilation, and test for gas tightness.</p>
<h3>Keeping Records</h3>
<p>You must keep a copy of each CP12 certificate for at least 2 years. A copy must be given to existing tenants within 28 days of the check, and to new tenants before they move in.</p>
<h3>Penalties for Non-Compliance</h3>
<p>Failing to comply can result in fines of up to £6,000, imprisonment for up to 6 months, or both. Your insurance may also be invalidated, leaving you personally liable for any incidents. Our <a href="/services/landlord-services">landlord services</a> include CP12 certificates, annual reminders, and direct tenant liaison — making compliance simple.</p>`,
    seoTitle: "Landlord Gas Safety Guide | CP12 Requirements Explained",
    seoDescription:
      "Complete landlord gas safety guide. CP12 certificate requirements, annual checks, record keeping, and penalties. Stay compliant in Peterborough.",
    status: "Published",
    publishedAt: "2025-02-01",
  },
  {
    title: "What to Do in a Plumbing Emergency",
    slug: "plumbing-emergency-guide",
    category: "Emergency & Repairs",
    excerpt:
      "Burst pipe? No hot water? Here's your step-by-step guide to handling a plumbing emergency before the plumber arrives.",
    content: `<h2>Stay Calm and Take Action</h2>
<p>A plumbing emergency can be stressful, but knowing what to do in the first few minutes can prevent thousands of pounds in water damage. Here's your step-by-step guide.</p>
<h3>Step 1: Turn Off the Water</h3>
<p>Your first priority is to stop the flow of water. Find your main stopcock (usually under the kitchen sink or where the water main enters your property) and turn it clockwise to shut off the supply.</p>
<h3>Step 2: Turn Off the Heating</h3>
<p>If you have a leak or burst pipe, turn off your central heating and hot water to prevent more water being pumped through the system.</p>
<h3>Step 3: Drain the System</h3>
<p>Open all cold taps and flush toilets to drain remaining water from the system. This reduces the amount of water that can leak from the damaged area.</p>
<h3>Step 4: Contain the Damage</h3>
<p>Place buckets under leaks, move valuables away from water, and use towels to soak up standing water. If water is near electrics, switch off the electricity at the consumer unit.</p>
<h3>Step 5: Call a Plumber</h3>
<p>Call an <a href="/services/emergency-plumber">emergency plumber</a>. While you wait, take photos of the damage for your insurance and note where the leak is coming from. If you suspect a hidden leak even after the emergency is resolved, our <a href="/services/damp-leak-detection">damp and leak detection</a> service can pinpoint it without ripping up floors or walls.</p>`,
    seoTitle: "What to Do in a Plumbing Emergency | Step-by-Step Guide",
    seoDescription:
      "Step-by-step guide to handling a plumbing emergency. Burst pipes, leaks, no hot water. Expert advice from Peterborough emergency plumbers.",
    status: "Published",
    publishedAt: "2025-03-10",
  },
  {
    title: "Best Areas to Live in Peterborough for Families",
    slug: "best-areas-peterborough-families",
    category: "Local Guides",
    excerpt:
      "Thinking of moving to Peterborough? Here's our local guide to the best family-friendly areas in the city.",
    content: `<h2>Peterborough: A Great Place to Raise a Family</h2>
<p>Peterborough offers an excellent quality of life for families, with good schools, green spaces, and affordable housing compared to many other cities in the South East. Here are some of the best areas to consider.</p>
<h3>Werrington</h3>
<p>A popular choice for families thanks to its excellent primary schools, village feel, and good transport links. The area has plenty of local amenities and is close to the countryside. We provide <a href="/areas/werrington">plumbing and heating services in Werrington</a> for both new and established homes.</p>
<h3>Hampton</h3>
<p>One of Peterborough's newest developments, Hampton offers modern housing, purpose-built schools, and well-planned open spaces. Hampton Lakes and the Hampton Leisure Centre are popular with families. Our team covers <a href="/areas/hampton">all areas of Hampton</a>, including Hampton Vale and Hampton Hargate.</p>
<h3>Orton</h3>
<p>The Orton townships offer a mix of housing types and good access to Nene Park and Ferry Meadows. Well-established schools and a strong community make this a family favourite. We regularly carry out <a href="/areas/orton">plumbing work across Orton</a>.</p>
<h3>Bretton</h3>
<p>With Bretton Woods on the doorstep and good bus links to the city centre, Bretton offers affordable family homes in a green setting. Our engineers are well-known in <a href="/areas/bretton">Bretton and Westwood</a> for reliable, local service.</p>`,
    seoTitle: "Best Areas to Live in Peterborough for Families | Local Guide",
    seoDescription:
      "Discover the best family-friendly areas in Peterborough. Werrington, Hampton, Orton, and more. Local insights from Peterborough's trusted plumbers.",
    status: "Published",
    publishedAt: "2025-04-05",
  },
  {
    title: "Signs Your Boiler Needs Replacing",
    slug: "signs-boiler-needs-replacing",
    category: "Boiler & Heating",
    excerpt:
      "Is your boiler on its last legs? Here are the telltale signs it's time to invest in a new one.",
    content: `<h2>When Repair Isn't Enough</h2>
<p>Boilers don't last forever. Knowing when to replace rather than repair can save you money in the long run and improve your home's energy efficiency. If you're unsure, a quick <a href="/services/boiler-service">boiler service</a> will give you a clear picture of your boiler's condition.</p>
<h3>Age</h3>
<p>Most boilers last 10 to 15 years. If yours is approaching or past this age, replacement should be on your radar even if it's still working.</p>
<h3>Rising Energy Bills</h3>
<p>If your gas bills are climbing despite no change in usage, your boiler's efficiency is likely declining. Modern A-rated boilers are 90%+ efficient compared to 60-70% for older models.</p>
<h3>Frequent Breakdowns</h3>
<p>If you're calling an engineer more than once a year for repairs, the cost of frequent fixes often exceeds the investment in a new boiler. Our <a href="/services/central-heating-services">central heating team</a> can advise on the most cost-effective option for your home.</p>
<h3>Strange Noises</h3>
<p>Banging, clunking, or kettling noises indicate internal problems that may not be economically repairable.</p>
<h3>Yellow Flame</h3>
<p>A healthy boiler flame is blue. A yellow or orange flame could indicate incomplete combustion and potential carbon monoxide risk. This needs immediate attention — call us or use our <a href="/services/emergency-plumber">emergency plumber service</a>.</p>`,
    seoTitle: "Signs Your Boiler Needs Replacing | When to Upgrade",
    seoDescription:
      "Learn the key signs your boiler needs replacing. Age, efficiency, breakdowns, and safety indicators. Expert guidance from Peterborough boiler engineers.",
    status: "Published",
    publishedAt: "2025-05-12",
  },
  {
    title: "EICR vs Gas Safety Certificate: What Landlords Need",
    slug: "eicr-vs-gas-safety-certificate",
    category: "Landlord & Legal",
    excerpt:
      "Confused about EICR and CP12 certificates? Here's a clear breakdown of what each one covers and when you need them.",
    content: `<h2>Understanding Your Landlord Certificates</h2>
<p>Landlords need multiple safety certificates to comply with the law. Two of the most important are the Gas Safety Certificate (CP12) and the Electrical Installation Condition Report (EICR). Here's how they differ.</p>
<h3>Gas Safety Certificate (CP12)</h3>
<p>Required annually for every rental property with gas appliances. Covers boilers, gas fires, cookers, and pipework. Must be carried out by a Gas Safe registered engineer. Find out more about our <a href="/services/gas-safety-certificates">gas safety certificate service</a> in Peterborough.</p>
<h3>EICR</h3>
<p>Required every 5 years (or at change of tenancy) for all rental properties. Covers the fixed electrical installation including wiring, sockets, and the consumer unit. Must be carried out by a qualified electrician.</p>
<h3>Key Differences</h3>
<p>The CP12 is annual and covers gas; the EICR is every 5 years and covers electrics. Both are legal requirements and failure to comply carries significant penalties. Our <a href="/services/landlord-services">landlord services</a> cover gas safety and boiler maintenance across all of Peterborough.</p>`,
    seoTitle: "EICR vs Gas Safety Certificate | Landlord Guide",
    seoDescription:
      "Understand the difference between EICR and gas safety certificates. Landlord legal requirements explained clearly. Peterborough property compliance.",
    status: "Published",
    publishedAt: "2025-06-20",
  },
  {
    title: "How to Stop a Dripping Tap",
    slug: "how-to-stop-dripping-tap",
    category: "Emergency & Repairs",
    excerpt:
      "A dripping tap wastes water and money. Here's what causes it and when to call a professional.",
    content: `<h2>The Annoying Drip</h2>
<p>A dripping tap might seem minor, but it can waste over 5,000 litres of water per year and significantly increase your water bill. Here's what you need to know.</p>
<h3>Common Causes</h3>
<p>The most common cause is a worn washer or ceramic disc inside the tap. Over time, these components degrade through regular use and no longer form a watertight seal.</p>
<h3>Can I Fix It Myself?</h3>
<p>Simple washer replacements on traditional taps are a straightforward DIY job. However, mixer taps, ceramic disc taps, and any work on mains-pressure systems is best left to a professional to avoid making the problem worse.</p>
<h3>When to Call a Plumber</h3>
<p>Call a professional if the tap continues dripping after washer replacement, if you have a mixer or ceramic tap, or if you're not confident working with plumbing. Our <a href="/services/plumbing-repairs">plumbing repairs</a> team handles dripping taps quickly and affordably — most fixed on the first visit. <a href="/book">Book a repair online</a> or give us a call.</p>`,
    seoTitle: "How to Stop a Dripping Tap | Causes & Solutions",
    seoDescription:
      "Fix a dripping tap: common causes, DIY tips, and when to call a plumber. Save water and money with expert advice from Peterborough plumbers.",
    status: "Published",
    publishedAt: "2025-07-08",
  },
  {
    title: "Peterborough's Water: Hard or Soft?",
    slug: "peterborough-water-hard-soft",
    category: "Local Guides",
    excerpt:
      "Peterborough has hard water. Here's what that means for your plumbing, appliances, and what you can do about it.",
    content: `<h2>Hard Water in Peterborough</h2>
<p>Peterborough sits in a hard water area due to the chalk and limestone geology of Cambridgeshire. This means the water contains high levels of calcium and magnesium minerals.</p>
<h3>Effects on Your Plumbing</h3>
<p>Hard water causes limescale build-up in pipes, boilers, and appliances. Over time this reduces efficiency, increases energy costs, and shortens the lifespan of your appliances. An annual <a href="/services/boiler-service">boiler service</a> helps catch limescale build-up before it becomes a problem.</p>
<h3>Signs of Hard Water</h3>
<p>Look for white chalky deposits on taps and showerheads, difficulty lathering soap, dry skin and hair, and kettle limescale. These are all indicators of hard water.</p>
<h3>Solutions</h3>
<p>Water softeners are the most effective solution. We install and maintain water softeners throughout Peterborough as part of our <a href="/services/plumbing-installation">plumbing installation</a> service. Alternatively, regular descaling of appliances and using limescale inhibitors can help manage the effects. <a href="/book">Get in touch</a> to discuss the right solution for your home.</p>`,
    seoTitle: "Is Peterborough Water Hard or Soft? | Local Water Guide",
    seoDescription:
      "Peterborough has hard water. Learn how it affects your plumbing and appliances, and what solutions are available. Local advice from Peterborough plumbers.",
    status: "Published",
    publishedAt: "2025-08-15",
  },
];

export function getPublishedPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => p.status === "Published" && p.publishedAt)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.filter((p) => p.status === "Published").map((p) => p.slug);
}

export function getBlogCategories(): string[] {
  return [...new Set(blogPosts.filter((p) => p.status === "Published").map((p) => p.category))];
}
