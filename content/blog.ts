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
<p>The best time to <a href="/contact">book a boiler service</a> is during the summer months when demand is low and you won't miss your heating if a repair is needed. Don't wait until the first cold snap — by then, plumbers are at their busiest. Our <a href="/services/central-heating-services">central heating engineers</a> serve the whole of Peterborough and surrounding areas.</p>`,
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
<p>Call a professional if the tap continues dripping after washer replacement, if you have a mixer or ceramic tap, or if you're not confident working with plumbing. Our <a href="/services/plumbing-repairs">plumbing repairs</a> team handles dripping taps quickly and affordably — most fixed on the first visit. <a href="/contact">Book a repair online</a> or give us a call.</p>`,
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
<p>Water softeners are the most effective solution. We install and maintain water softeners throughout Peterborough as part of our <a href="/services/plumbing-installation">plumbing installation</a> service. Alternatively, regular descaling of appliances and using limescale inhibitors can help manage the effects. <a href="/contact">Get in touch</a> to discuss the right solution for your home.</p>`,
    seoTitle: "Is Peterborough Water Hard or Soft? | Local Water Guide",
    seoDescription:
      "Peterborough has hard water. Learn how it affects your plumbing and appliances, and what solutions are available. Local advice from Peterborough plumbers.",
    status: "Published",
    publishedAt: "2025-08-15",
  },
  {
    title: "What Is a Power Flush and Does Your Heating Need One?",
    slug: "what-is-power-flush",
    category: "Boiler & Heating",
    excerpt:
      "Cold radiators, noisy pipes, and sluggish heating are often signs of sludge build-up. Here's everything you need to know about power flushing.",
    content: `<h2>What Is a Power Flush?</h2>
<p>A power flush is a deep clean for your central heating system. Over time, sludge, rust, and limescale build up inside your radiators, pipework, and boiler. This debris restricts water flow, reduces efficiency, and can eventually cause components to fail. A power flush forces clean water through the entire system at high velocity, removing that build-up and restoring proper circulation.</p>
<p>It's one of the most effective forms of <a href="/services/central-heating-services">central heating maintenance</a> — and in many cases, it noticeably improves heating performance within hours of completion.</p>

<h3>Signs Your System Needs a Power Flush</h3>
<p>Your heating system is telling you it needs attention if you notice:</p>
<ul>
<li>Radiators cold at the bottom but warm at the top — classic sludge build-up</li>
<li>Some radiators heating up much slower than others</li>
<li>Banging, gurgling, or kettling noises from the boiler or pipes</li>
<li>The boiler cutting out more often than it used to</li>
<li>Higher gas bills without any obvious change in usage</li>
<li>Discoloured (dark or rusty) water when you bleed a radiator</li>
</ul>
<p>If you're ticking more than two of these boxes, a power flush is likely to make a real difference.</p>

<h3>What Happens During a Power Flush?</h3>
<p>Our engineer connects a specialist pump to your system — usually at the pump head or a convenient connection point. A powerful flow of clean water mixed with chemical cleaner is pushed through every radiator and section of pipework in turn. The debris is flushed out and collected in a filter. Fresh inhibitor is then added to protect the system going forward.</p>
<p>The process takes between 4 and 8 hours depending on the size of your system and the severity of the build-up. Your home stays warm throughout — we keep disruption to an absolute minimum.</p>

<h3>Does a New Boiler Need One?</h3>
<p>Yes — almost always. If you're having a new boiler installed onto an existing system, a power flush beforehand is strongly recommended. Most boiler manufacturers, including Worcester Bosch and Vaillant, require a clean system to validate their warranty. Fitting a new boiler onto a dirty system introduces sludge into the new heat exchanger from day one, which can cause faults within months and void your warranty entirely.</p>
<p>We include a power flush recommendation with every <a href="/services/boiler-service">boiler service</a> assessment where the system shows signs of contamination.</p>

<h3>Power Flush vs Magnetic Filter</h3>
<p>A magnetic filter (such as a Magna Clean) is fitted to your system to capture iron oxide particles before they reach the boiler. It's an excellent preventative measure — but it won't clear a system that's already heavily contaminated. Think of it this way: a power flush clears the existing problem, and a magnetic filter prevents it coming back. We recommend fitting one after every power flush as standard.</p>

<h3>How Much Does a Power Flush Cost in Peterborough?</h3>
<p>Pricing depends on the number of radiators and the condition of the system. Most domestic properties in Peterborough fall within a predictable range. We'll always give you a clear, fixed price before we start — no hourly rates, no hidden charges. <a href="/contact">Book a heating assessment</a> and we'll advise whether a power flush is the right solution for your system.</p>

<h3>Get Your Heating Working Properly Again</h3>
<p>If your heating has felt sluggish or inefficient this winter, don't just put up with it. A power flush can restore performance you may not have had in years. Call us on 01733797074 or <a href="/contact">book online</a> — our <a href="/services/central-heating-services">central heating team</a> covers the whole of Peterborough and surrounding areas.</p>`,
    seoTitle: "What Is a Power Flush? | Peterborough Heating Guide",
    seoDescription:
      "Find out if your central heating needs a power flush. Signs, process, costs, and when it's essential. Expert advice from Peterborough heating engineers.",
    status: "Published",
    publishedAt: "2025-10-14",
  },
  {
    title: "How to Prepare Your Plumbing for Winter in Peterborough",
    slug: "prepare-plumbing-for-winter",
    category: "Emergency & Repairs",
    excerpt:
      "Frozen pipes are one of the most common and costly plumbing emergencies in winter. Here's how to protect your home before the cold hits.",
    content: `<h2>Winter Plumbing — Don't Wait for a Burst Pipe</h2>
<p>Every winter, Peterborough plumbers deal with a surge of emergency call-outs for frozen and burst pipes. Most of them are entirely preventable. Spending an hour preparing your home in autumn can save you hundreds — or thousands — in damage and repair costs when temperatures drop.</p>
<p>Here's what to do before winter arrives.</p>

<h3>1. Know Where Your Stopcock Is</h3>
<p>Your main stopcock is the single most important thing to locate before a pipe bursts. It's usually found under the kitchen sink, in the downstairs toilet, or where the water main enters the property near the front door. Turn it off and on now to make sure it moves — a seized stopcock is useless in an emergency. If yours is seized or difficult to operate, <a href="/services/plumbing-repairs">get it replaced</a> before winter.</p>

<h3>2. Insulate Exposed Pipes</h3>
<p>Any pipes in unheated spaces — loft spaces, garages, outbuildings, or along external walls — are at risk of freezing when temperatures drop below zero. Foam lagging (pipe insulation) is inexpensive and available at any DIY store. Pay particular attention to the pipe leading to an outdoor tap, pipes in the loft near the cold water tank, and any pipework running through a garage or extension without heating.</p>

<h3>3. Service Your Boiler Before You Need It</h3>
<p>The worst time to discover your boiler isn't working is on the coldest day of the year, when every engineer in the area is fully booked. Book your <a href="/services/boiler-service">annual boiler service</a> in September or October — before the rush starts. A service will catch any issues before they become breakdowns, and our Gas Safe registered engineers will check the boiler is running safely and efficiently for the season ahead.</p>

<h3>4. Check Your Heating Controls</h3>
<p>Test your thermostat and programmer now rather than in December. Set the heating to come on and check every radiator gets warm. If any are slow to heat or have cold spots, they may need bleeding or the system may need a <a href="/blog/what-is-power-flush">power flush</a>. Smart thermostats like Nest or Hive make it easy to set a frost protection temperature that keeps the pipes safe even when you're away.</p>

<h3>5. Protect Outdoor Taps</h3>
<p>Outdoor tap pipes are particularly vulnerable to freezing. Fit an insulating cover over the tap, and turn off the outdoor supply using the isolation valve inside the house before the first frost. If you don't have an indoor isolation valve for your outdoor tap, it's a simple job — ask us to add one during your next visit.</p>

<h3>6. Keep Some Heat On If You Go Away</h3>
<p>If you're leaving the property for more than a few days during the winter — even overnight during a cold snap — keep the heating set to a minimum of 12–15°C. This is enough to prevent pipes from freezing without costing much to run. Turning the heating off completely when it's below zero is the single most common cause of burst pipes in empty properties.</p>

<h3>7. Check Your Loft</h3>
<p>Cold water storage tanks in loft spaces are particularly vulnerable. Make sure the tank has a properly fitting lid and that the loft hatch is insulated. Leaving the loft hatch slightly open in very cold weather allows warm air from the house to rise into the loft, which helps prevent freezing — though this isn't a substitute for properly insulated pipework.</p>

<h3>What to Do If a Pipe Freezes</h3>
<p>If you find a frozen pipe, turn off the water at the stopcock immediately. Gently warm the pipe using a hairdryer or hot water bottle — never an open flame. Work from the tap end back towards the frozen section. If the pipe has already cracked, you'll need an <a href="/services/emergency-plumber">emergency plumber</a> to repair it before you restore the water supply.</p>

<h3>Need Help Getting Ready for Winter?</h3>
<p>Our engineers carry out winter plumbing checks across Peterborough, covering boiler servicing, pipe insulation advice, and system testing. <a href="/contact">Book online</a> or call us on 01733797074 — and sort it before the cold weather catches you out.</p>`,
    seoTitle: "How to Prepare Your Plumbing for Winter | Peterborough Guide",
    seoDescription:
      "Prevent frozen pipes and winter plumbing emergencies in Peterborough. Practical steps to protect your home before temperatures drop.",
    status: "Published",
    publishedAt: "2025-11-03",
  },
  {
    title: "Buying a New Build in Peterborough? Here's What to Check First",
    slug: "new-build-peterborough-plumbing-guide",
    category: "Local Guides",
    excerpt:
      "New builds aren't always problem-free. Here's what Peterborough buyers should check about their plumbing and heating before completion.",
    content: `<h2>New Build Plumbing — Don't Assume It's All Fine</h2>
<p>Peterborough has seen substantial new build development over the past decade — Hampton, Cardea, Stanground South, and the newer phases of Orton are all well-established communities with thousands of relatively new homes. But "new build" doesn't always mean "no problems". Plumbing and heating defects are among the most common snagging issues, and many aren't picked up in the standard handover process.</p>
<p>Here's what to check — and what to do if something isn't right.</p>

<h3>Get a Full Snagging Inspection</h3>
<p>A snagging inspection is a detailed check of a new build property before or shortly after you complete. For plumbing and heating, a proper inspection should cover:</p>
<ul>
<li>All taps, toilets, and showers — testing flow, temperature, and drainage</li>
<li>The boiler — make, model, age, and a functional test of heating and hot water</li>
<li>Radiator balance and heat output across every room</li>
<li>Water pressure at multiple points</li>
<li>Visible pipework — are joints properly made and supported?</li>
<li>Waste connections — are they sealed, correctly fall-graded, and odour-free?</li>
<li>The external drainage — manholes, connections, and soakaways</li>
</ul>
<p>Our <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a> can be adapted for new builds and carried out before you complete — giving you a written record of any issues to raise with the developer under the NHBC warranty.</p>

<h3>Understand Your Warranty Cover</h3>
<p>Most new builds in Peterborough come with an NHBC Buildmark warranty (or similar). In the first two years, the developer is responsible for fixing defects reported to them. From years 3–10, structural defects are covered by the insurer. Plumbing and heating defects in the first two years should be reported directly to the developer in writing — keep copies of everything.</p>
<p>It's worth noting that the warranty doesn't cover fair wear and tear, cosmetic issues, or anything caused by the homeowner. This is why it matters to get defects documented promptly, before the property has been lived in.</p>

<h3>Common New Build Plumbing Issues</h3>
<p>Based on our work across Peterborough's newer developments, the plumbing issues we see most often in new builds include:</p>
<ul>
<li><strong>Unbalanced heating systems</strong> — some radiators get much hotter than others, making the heating uncomfortable and inefficient. The system needs balancing by a heating engineer.</li>
<li><strong>Low water pressure</strong> — particularly in homes at the end of a supply run. If pressure is consistently low, it's worth having it measured and reported.</li>
<li><strong>Shower temperature fluctuations</strong> — often caused by thermostatic valves that haven't been properly set, or pressure issues in the hot water supply.</li>
<li><strong>Slow waste drainage</strong> — poor gradient on waste pipes causes slow drainage in sinks and showers. This becomes worse over time as debris accumulates.</li>
<li><strong>Boiler pressure dropping</strong> — new systems sometimes need the inhibitor topped up and the pressure re-set after the first few months of use.</li>
</ul>

<h3>The Boiler: What to Check</h3>
<p>Most new build developers in Peterborough fit Worcester Bosch or Baxi boilers as standard. Before you complete, make sure you receive:</p>
<ul>
<li>The boiler manual and warranty documentation</li>
<li>A demonstration of how to operate the controls, re-pressurise, and reset the boiler</li>
<li>The first service date — most manufacturers require an annual service to maintain the warranty</li>
</ul>
<p>Book your first <a href="/services/boiler-service">boiler service</a> within 12 months of completion. This is required to maintain the manufacturer's warranty and ensures the engineer can spot any installation issues early.</p>

<h3>Adding Plumbing to Your New Build</h3>
<p>Many new build buyers want to add outdoor taps, appliance connections, or additional heating controls shortly after moving in. We carry out all types of <a href="/services/plumbing-installation">plumbing installations</a> in new build properties across Peterborough — and we know the common builders' configurations well, which makes the work faster and tidier.</p>

<h3>Based in Peterborough — We Know the New Developments</h3>
<p>We've worked on new build properties across Hampton, Cardea, Orton, and the newer Stanground developments. If you've recently moved in or you're about to complete, <a href="/contact">book a plumbing check</a> or call us on 01733797074. It's the best way to start your time in a new home with complete confidence in your plumbing and heating.</p>`,
    seoTitle: "New Build Plumbing Peterborough | What to Check Before Completion",
    seoDescription:
      "Buying a new build in Peterborough? Here's what to check about plumbing and heating before completion. Snagging advice from local Gas Safe engineers.",
    status: "Published",
    publishedAt: "2026-01-20",
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
