/**
 * refine-blog-posts.ts
 * Refines Wave 1 blog posts to match PeterboroughPlumbers.com tone and structure.
 * Run with: npx tsx prisma/refine-blog-posts.ts
 * Safe to re-run — upserts on slug. Slugs and publishedAt are NOT changed.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const refined = [
  // ── 1. Drain cluster ────────────────────────────────────────────────────────
  {
    slug: "blocked-drain-causes-peterborough",
    title: "Common Causes of Blocked Drains in Peterborough Homes",
    excerpt: "Blocked drains are one of the most common plumbing call-outs in Peterborough. Understanding what causes them helps you prevent them — and know when it's time to call a professional.",
    seoTitle: "Common Causes of Blocked Drains in Peterborough Homes",
    seoDescription: "Find out what causes blocked drains in Peterborough homes — from fat build-up to tree roots — and learn when to call a professional drain specialist.",
    content: `<h2>Why Peterborough Drains Block — and What to Do About It</h2>
<p>Most blocked drains don't happen overnight. They build up gradually over weeks or months until water stops flowing freely. The earlier you catch the signs, the simpler and cheaper the fix. Left too long, a blockage can lead to sewage backing up, damp in walls, and cracked pipes — all of which cost significantly more to put right.</p>

<h3>Fat, Oil, and Grease</h3>
<p>The most common cause of blocked kitchen drains is fat poured down the sink. When it cools in the pipe, it solidifies and sticks to the pipe wall, gradually narrowing the bore. The fix is simple: let fat cool and dispose of it in the bin. If grease has already built up, a professional <a href="/services/drain-blockages">drain jetting service</a> can clear it quickly.</p>

<h3>Hair and Soap Scum</h3>
<p>In bathrooms, hair is the primary culprit. Mixed with soap scum, it forms a fibrous mat that catches everything else passing through. A drain cover costs less than £5 and prevents the problem entirely. If the drain is already slow, a plunger or flexible drain snake can usually clear it without needing a plumber.</p>

<h3>Wet Wipes and Sanitary Products</h3>
<p>Despite "flushable" labelling, wet wipes, cotton buds, and sanitary items do not break down in water. They accumulate in the sewer, combine with grease, and cause serious blockages far enough down the pipe that DIY clearing won't reach. None of these should be flushed — full stop.</p>

<h3>Tree Roots</h3>
<p>Older Peterborough properties — particularly Victorian and Edwardian terraces — often have original clay drainage pipes that are now over a century old. Tree roots are drawn to moisture and can penetrate even hairline cracks. Once inside, they grow rapidly and can collapse the pipe entirely. Root intrusion is usually identified with a <a href="/guides/cctv-drain-survey">CCTV drain survey</a> and treated with root cutting followed by pipe relining.</p>

<h3>Limescale Build-Up</h3>
<p>Peterborough is in a hard water area, which means limescale forms in pipework over time — particularly in hot water pipes. While it rarely causes complete blockages on its own, it narrows the pipe bore and makes other blockages worse. Regular <a href="/services/central-heating-services">central heating servicing</a> and descaling keeps the system flowing freely.</p>

<h3>Collapsed or Displaced Pipes</h3>
<p>In older properties, clay or pitch fibre pipes can collapse or sag due to ground movement or age. Water pools in the low point and collects debris. If your drain keeps blocking despite being cleared, a structural problem is likely — clearing alone won't fix it. A <a href="/guides/signs-drain-blocked">check for the signs of a deeper blockage</a> will tell you whether you're dealing with a pipe problem.</p>

<h3>When to Call a Drain Specialist</h3>
<p>Try a plunger and boiling water for a simple sink blockage. If it doesn't clear after two attempts, or if multiple drains in the house are slow at the same time, call a professional. Multiple slow drains together indicate a blockage in the shared main drain — not something you can clear with a plunger. Call us on <a href="tel:01733797074">01733797074</a> or <a href="/contact">book online</a> and we'll clear it the same day where possible.`,
  },

  {
    slug: "do-you-need-cctv-drain-survey",
    title: "Do You Need a CCTV Drain Survey? Signs to Look For",
    excerpt: "A CCTV drain survey isn't just for buying a new property. There are several situations where a camera inspection is the quickest and cheapest way to diagnose a persistent drain problem.",
    seoTitle: "Do You Need a CCTV Drain Survey? Signs to Look For | Peterborough",
    seoDescription: "Not sure if you need a CCTV drain survey? Here are the key signs a camera inspection is the right next step — advice from Peterborough drain specialists.",
    content: `<h2>CCTV Drain Surveys — Not Just for Buying a House</h2>
<p>Most homeowners associate CCTV drain surveys with property purchases — but there are several everyday situations where a camera inspection is the most efficient way to find out what's happening underground. A survey sends a waterproof camera through your drains via the nearest inspection chamber, recording live footage that pinpoints exactly what's wrong and where.</p>

<h3>1. The Drain Keeps Blocking</h3>
<p>A one-off blockage caused by grease or hair won't come back once cleared. A drain that blocks again within a few weeks of clearing has a structural cause — root intrusion, a displaced pipe section creating a low point, or a partially collapsed pipe. Jetting alone won't fix it permanently. A camera survey finds the cause before we recommend a solution. Read our full <a href="/guides/cctv-drain-survey">guide to CCTV drain surveys</a> for more detail.</p>

<h3>2. Multiple Drains Are Slow</h3>
<p>If your sink, bath, and toilet are all slow simultaneously, the blockage is in the shared main drain, not individual appliance pipes. This is much harder to locate and clear without a camera. A survey identifies the exact position so the engineer can target it precisely rather than guessing.</p>

<h3>3. Persistent Smell</h3>
<p>A sewage smell from drains, or in the garden above the drain run, usually indicates a cracked or displaced pipe allowing gas to escape. A camera survey confirms whether the smell is from a broken pipe or a blocked trap — both have different solutions.</p>

<h3>4. Buying a Property</h3>
<p>A standard homebuyer's survey doesn't inspect the drains. In Peterborough, where many older terraces and semis have original clay drain runs, a pre-purchase survey is strongly recommended. A failed drain is a significant hidden cost — repairs can run to thousands of pounds. Survey findings can be used to renegotiate on price or request repairs before completion.</p>

<h3>5. Planning an Extension</h3>
<p>Before any significant building work, you need to know where your existing drains run. Excavating into an unmarked drain during building works is a common and expensive mistake. A survey maps the run and identifies any existing issues before they become a builder's problem.</p>

<h3>When You Can Skip the Survey</h3>
<p>If it's a straightforward, first-time blockage in a single drain, try <a href="/services/drain-blockages">drain jetting</a> first. A CCTV survey adds cost and isn't necessary for every blocked drain — it becomes worthwhile when the problem is persistent, structural, or unknown. Call us on <a href="tel:01733797074">01733797074</a> and we'll tell you honestly which approach suits your situation.`,
  },

  // ── 2. Leak / damp cluster ──────────────────────────────────────────────────
  {
    slug: "hidden-water-leak-signs-home",
    title: "7 Hidden Water Leak Warning Signs in Your Home",
    excerpt: "Most water leaks are invisible until they've already caused significant damage. These 7 warning signs can help you catch a hidden leak before it becomes an expensive problem.",
    seoTitle: "7 Hidden Water Leak Warning Signs in Your Home | Peterborough Plumbers",
    seoDescription: "Seven signs of a hidden water leak — from unexplained damp patches to rising bills. Expert leak detection advice from Peterborough Plumbers.",
    content: `<h2>Most Leaks Go Unnoticed for Months</h2>
<p>Hidden water leaks develop slowly behind walls, under floors, and inside ceiling voids — often going unnoticed until the damage is already significant. Our <a href="/services/damp-leak-detection">leak detection team in Peterborough</a> regularly finds leaks that homeowners didn't suspect. These are the seven warning signs to watch for.</p>

<h3>1. An Unexplained Rise in Your Water Bill</h3>
<p>If your usage hasn't changed but your bill has gone up noticeably, water is escaping somewhere on your supply side. Even a slow drip from a pinhole in a pipe can waste hundreds of litres a week. Compare bills from the same period last year to rule out seasonal variation.</p>

<h3>2. The Water Meter Moves When Nothing Is On</h3>
<p>Turn off all taps and appliances. Go to your external water meter and watch the dial for 10 minutes without using any water. If it moves, there is a live leak on the supply side. This is the single most reliable way to confirm a hidden pipe leak before calling a plumber.</p>

<h3>3. Damp Patches or Staining on Walls and Ceilings</h3>
<p>Yellow or brown staining on a ceiling below a bathroom, or a damp patch on an internal wall, almost always indicates a leak in the structure above. These are often mistaken for old damage — but if the patch is soft to the touch or growing, the leak is ongoing.</p>

<h3>4. Mould in Unexpected Places</h3>
<p>Condensation-related mould forms in cold corners of rooms. Leak-related mould appears where the water is actually travelling — a bedroom wall adjoining a wet room, a ceiling in a room with no bathroom above, the inside of a fitted wardrobe. If mould is appearing where it has no obvious cause, investigate the structure behind it.</p>

<h3>5. The Sound of Running Water</h3>
<p>If you can hear water running inside walls or under floors when nothing is in use, a supply pipe is leaking under pressure. Listen near internal walls in the kitchen, bathroom, or airing cupboard — it's most audible at night when the house is quiet.</p>

<h3>6. Warm Patches on the Floor</h3>
<p>A warm or hot patch of floor in an isolated area — particularly if the screed feels soft — indicates a leak in an underfloor hot water pipe. These leaks are damaging because the warm water accelerates structural deterioration long before any surface sign appears.</p>

<h3>7. Gradually Reducing Water Pressure</h3>
<p>A slow reduction in pressure across the whole property over several months can indicate a worsening leak on the incoming main. If your shower and taps have been losing pressure gradually and no water company work is taking place nearby, have it investigated.</p>

<h3>What to Do Next</h3>
<p>Start with the meter test above. If it confirms a leak, call a <a href="/services/damp-leak-detection">leak detection specialist</a> before pulling up floors or opening walls. We use acoustic and thermal equipment to locate leaks with precision, minimising damage. <a href="/contact">Contact our Peterborough team</a> or call <a href="tel:01733797074">01733797074</a> — we cover all PE postcodes.`,
  },

  {
    slug: "damp-vs-plumbing-leak",
    title: "Damp vs Plumbing Leak: How to Tell the Difference",
    excerpt: "Damp patches, mould, and wet walls can be caused by rising damp, penetrating damp, or a hidden plumbing leak — and each needs a completely different fix. Here's how to tell them apart.",
    seoTitle: "Damp vs Plumbing Leak: How to Tell the Difference | Peterborough",
    seoDescription: "Is that damp patch structural or a plumbing leak? Learn how to tell the difference — and when to call a plumber vs a damp specialist in Peterborough.",
    content: `<h2>Damp Patch on the Wall? Here's How to Tell What's Causing It</h2>
<p>A wet patch on a wall, mould on a ceiling, or a musty smell in a room can mean several things — rising damp, penetrating damp, condensation, or a hidden plumbing leak. Getting the diagnosis right matters enormously, because the wrong treatment wastes money and leaves the real problem untouched. Our <a href="/services/damp-leak-detection">damp and leak detection team in Peterborough</a> investigates both, and this is how we tell them apart.</p>

<h3>Rising Damp</h3>
<p>Rising damp occurs when moisture from the ground travels upward through masonry — typically because the damp-proof course has failed or was never fitted. In Peterborough, it's most common in Victorian and Edwardian properties. The signs are distinctive: damp confined to the lower metre of a wall, a horizontal tide mark, and white crystalline salt deposits on the plaster surface. The problem worsens in winter and improves in dry summer months.</p>

<h3>Penetrating Damp</h3>
<p>Penetrating damp enters horizontally through a defect in the building fabric — cracked render, failed pointing, a leaking window frame, or blocked guttering. Unlike rising damp, it can appear at any height and always correlates directly with rainfall. The damp patch appears or worsens during or after heavy rain, and is linked to a specific location — below a window, near a downpipe, at a roof junction.</p>

<h3>A Plumbing Leak</h3>
<p>A plumbing leak introduces water from inside the structure — from supply pipes, waste pipes, or appliances. The pattern it creates is different in three important ways: it appears regardless of weather, it's on internal walls or ceilings below a bathroom, and it doesn't come with the white salt deposits typical of rising damp. You may also hear water running inside the wall when nothing is in use. Read our guide on <a href="/guides/hidden-water-leak-signs">hidden water leak signs</a> for the full diagnostic steps.</p>

<h3>The Meter Test</h3>
<p>Turn off all taps and appliances. Read your external water meter and return 30 minutes later without using any water. If the meter has moved, you have a live plumbing leak. If it hasn't moved, the source is external — structural damp or condensation.</p>

<h3>Where the Damp Is Tells You a Lot</h3>
<p>Damp along the lower wall of an external-facing room points to rising damp. Damp at mid-height on an external wall after rain points to penetrating damp. Damp on an internal wall at any height, or on a ceiling below a bathroom, points to a plumbing leak. The water meter test then confirms it.</p>

<h3>Call a Plumber First</h3>
<p>If there's any possibility the damp is caused by a plumbing leak, rule it out first before booking a damp surveyor. Detecting a hidden leak early is far cheaper than stripping back plasterwork based on a misdiagnosis. Our <a href="/services/damp-leak-detection">Peterborough leak detection team</a> can investigate without opening walls unnecessarily. Call <a href="tel:01733797074">01733797074</a> or <a href="/contact">get in touch online</a>.`,
  },

  // ── 3. Bathroom cluster ─────────────────────────────────────────────────────
  {
    slug: "bathroom-installation-time-uk",
    title: "How Long Does a Bathroom Installation Take in the UK?",
    excerpt: "Planning a bathroom refit in Peterborough and wondering how long you'll be without a working bathroom? Here are the realistic timelines for every type of project.",
    seoTitle: "How Long Does a Bathroom Installation Take? | Peterborough Guide",
    seoDescription: "Realistic timelines for bathroom refits in Peterborough — from a simple suite swap to a full wet room. Plus what slows projects down and how to avoid it.",
    content: `<h2>Bathroom Timelines — What's Realistic for Your Project</h2>
<p>The first question almost every homeowner asks before a <a href="/services/bathroom-installations">bathroom installation</a> is how long they'll be without a working bathroom. The honest answer depends on the scope of the work. Here are the realistic timelines for every project type — and the factors that most commonly push them over schedule.</p>

<h3>Like-for-Like Swap: 1–3 Days</h3>
<p>Replacing a toilet, basin, or bath in the same position without moving any pipework is the fastest possible bathroom job. If all three are replaced but the layout stays identical, most standard suites are installed in 1–3 working days with minimal disruption.</p>

<h3>Standard Full Refit: 4–6 Days</h3>
<p>A full bathroom refit — new suite, new tiles, minor plumbing changes — takes most professional teams 4–6 working days. This is the most common project in Peterborough homes. Day 1 is strip-out and first fix plumbing. Days 2–3 cover boarding and tiling. Days 4–5 are second fix plumbing and finishing. You'll have limited bathroom access throughout, so a second toilet is useful if you have one.</p>

<h3>Layout Changes or Replastering: 7–10 Days</h3>
<p>Moving the toilet or bath to a different wall requires rerouting soil and supply pipes — adding 1–3 days. If walls need replastering, add another 5–7 days drying time before tiling can begin. Wet plaster cannot be rushed without producing cracked tiles later.</p>

<h3>Wet Room: 7–12 Days</h3>
<p>A wet room requires full tanking, a graded screed, and careful tile installation — and each layer must cure before the next can begin. Allow 7–12 working days minimum. See our comparison of <a href="/guides/wet-room-vs-shower">wet rooms vs shower enclosures</a> if you're still deciding which option is right for your bathroom.</p>

<h3>New En-Suite from Scratch: 8–14 Days</h3>
<p>Adding a new en-suite requires stud walling, new plumbing runs, electrical work for lighting and extraction, plastering, and a full suite installation. Co-ordinating the plumber, plasterer, tiler, and electrician typically adds days to the schedule.</p>

<h3>What Causes Delays</h3>
<p>The most common causes of bathroom projects running over are: hidden damage found on strip-out (rotted floorboards, failed waterproofing, corroded pipework), materials not on site when work begins, and trades not properly co-ordinated. Having all tiles, sanitaryware, and fittings delivered before day one is the single most effective way to keep a project on track.</p>

<h3>Ready to Plan Your Bathroom?</h3>
<p>Our bathroom team covers Peterborough and all PE postcodes — including <a href="/areas/hampton">Hampton</a>, <a href="/areas/bretton">Bretton</a>, and <a href="/areas/orton">Orton</a>. We provide a written schedule with milestone dates before any work starts. Call <a href="tel:01733797074">01733797074</a> or <a href="/contact">book a free site visit</a> and we'll give you a realistic quote and timeline for your specific project.`,
  },

  {
    slug: "wet-room-vs-shower-enclosure",
    title: "Wet Room vs Shower Enclosure: Which Is Better?",
    excerpt: "Deciding between a wet room and a shower enclosure? Both have genuine advantages. The right choice depends on your bathroom size, budget, and how the space is used day-to-day.",
    seoTitle: "Wet Room vs Shower Enclosure: Which Is Better? | Peterborough Guide",
    seoDescription: "Wet room or shower enclosure for your Peterborough home? Honest comparison of costs, installation time, maintenance, and which is right for your bathroom.",
    content: `<h2>Wet Room or Shower Enclosure — Here's the Honest Answer</h2>
<p>It's one of the most common decisions homeowners face during a bathroom renovation — and both options are popular in Peterborough homes. Our <a href="/services/bathroom-installations">bathroom installation team</a> fits both regularly. Here's an honest comparison so you can make the right call for your specific bathroom.</p>

<h3>What Each One Is</h3>
<p>A shower enclosure is a self-contained unit — a shower tray, glass screen or door, and shower head — that contains water within a defined footprint. It sits on the existing floor and can usually be installed in a day or two. A wet room has no tray or enclosure; the entire floor is waterproofed, graded to a central drain, and tiled. Water is contained by the waterproofing membrane, not by glass or a frame.</p>

<h3>The Case for a Wet Room</h3>
<p>Wet rooms offer level access with no tray lip, making them ideal for anyone with limited mobility. They're visually seamless — no tracks, hinges, or enclosure joints to accumulate mould — and the fully sealed floor eliminates the risk of water escaping under a shower tray. They suit large bathrooms where a defined shower zone can be created without making the room feel wet throughout.</p>

<h3>The Case for a Shower Enclosure</h3>
<p>A quality shower enclosure and stone resin tray costs a fraction of a wet room installation, installs faster, and keeps the rest of the bathroom dry — which matters in a shared family bathroom with different schedules. The main maintenance consideration in Peterborough is limescale on the glass, as we're in a hard water area. A good squeegee habit largely resolves this. See our full <a href="/guides/wet-room-vs-shower">wet room vs shower guide</a> for a detailed cost comparison.</p>

<h3>Cost in Peterborough</h3>
<p>A quality shower enclosure with tray typically costs £500–£2,000 installed. A full wet room installation runs £2,500–£7,000 — the range reflects floor construction requirements, tile specification, and room size. This is not an area to economise: a wet room with any defect in the waterproofing is worse than a failed shower tray, because water penetrates the structure directly.</p>

<h3>Which to Choose</h3>
<p>Choose a wet room if: accessibility matters, you have a large enough bathroom to create a defined shower zone, and you're doing a full renovation with the right budget and an experienced contractor. Choose a shower enclosure if: budget is a priority, your bathroom is shared by multiple people, or you're in an older property where floor construction makes tanking difficult.</p>

<h3>Get a Quote for Either</h3>
<p>Our team installs both — and will give you an honest assessment of which is the better fit for your bathroom before you commit. <a href="/contact">Contact us</a> or call <a href="tel:01733797074">01733797074</a>. We cover Peterborough, <a href="/areas/hampton">Hampton</a>, <a href="/areas/stamford">Stamford</a>, and all surrounding areas.`,
  },

  // ── 4. Landlord cluster ─────────────────────────────────────────────────────
  {
    slug: "landlord-plumbing-safety-checklist",
    title: "Landlord Plumbing Safety Checklist for Rental Properties",
    excerpt: "As a landlord, you have legal and practical obligations to maintain safe plumbing in your rental properties. Here's everything you need to inspect and document.",
    seoTitle: "Landlord Plumbing Safety Checklist for Rental Properties | Peterborough",
    seoDescription: "Complete landlord plumbing checklist for Peterborough rental properties — what to inspect, when to do it, and how to stay legally compliant. Gas Safe engineers.",
    content: `<h2>The Plumbing Check Every Peterborough Landlord Should Do</h2>
<p>Your plumbing and heating obligations as a landlord go well beyond keeping the boiler running. Failing to maintain a safe water and drainage system puts tenants at risk, exposes you to legal liability, and can void your landlord insurance. Use this checklist alongside our <a href="/services/landlord-services">landlord plumbing services</a> to make sure nothing is missed.</p>

<h3>Annual Legal Requirement: Gas Safety Certificate</h3>
<p>The Gas Safety (Installation and Use) Regulations 1998 require an annual check of all gas appliances, pipework, and flues by a Gas Safe registered engineer. The resulting CP12 must be given to existing tenants within 28 days and to new tenants before they move in. Failure to comply is a criminal offence. Our <a href="/services/gas-safety-certificates">Gas Safe engineers</a> issue CP12 certificates across all PE postcodes and can send you automatic annual reminders.</p>

<h3>Before Every New Tenancy</h3>
<p>Run all taps and check pressure throughout the property. Confirm the stopcock is accessible, labelled, and turns freely — tenants need to be able to shut off the water in an emergency. Test all drains. Inspect under-sink cabinets for any signs of moisture or slow leaks. Check toilet cisterns and pans for cracks. Test bath and shower seals — failed silicone allows water to penetrate the floor structure silently.</p>

<h3>Boiler and Hot Water</h3>
<p>Confirm the boiler is serviced and producing hot water at the correct temperature. Between 50°C and 60°C at the cylinder prevents Legionella risk; limiting it to 48°C at the tap protects against scalding where vulnerable tenants are present. Book your <a href="/services/boiler-service">annual boiler service</a> well before the tenancy start date so any issues are resolved in advance.</p>

<h3>Legionella Risk Assessment</h3>
<p>The Health and Safety Executive requires landlords to carry out a Legionella risk assessment. For most standard residential properties with a conventional boiler, this is a simple self-assessment — but it must be documented. Properties with cold water storage tanks, infrequently used outlets, or hot water stored between 20–45°C carry a higher risk and may need professional assessment.</p>

<h3>Your Ongoing Duty</h3>
<p>Under the Landlord and Tenant Act 1985, you must keep all water, heating, and sanitation installations in repair and proper working order throughout the tenancy. For plumbing emergencies — burst pipes, loss of hot water, heating failure — a same-day or next-day response is expected. Delayed responses that result in damage or risk to health can lead to compensation claims.</p>

<h3>Need Help Staying Compliant?</h3>
<p>We work with landlords across Peterborough — from single buy-to-let properties to larger portfolios in <a href="/areas/city-centre">the city centre</a>, <a href="/areas/orton">Orton</a>, and <a href="/areas/werrington">Werrington</a>. Call <a href="tel:01733797074">01733797074</a> or <a href="/contact">get in touch online</a> and we'll set up annual reminders and priority call-outs for your properties.`,
  },

  {
    slug: "gas-safety-vs-plumbing-safety-landlords",
    title: "Gas Safety vs Plumbing Safety: What Landlords Must Check",
    excerpt: "Many landlords understand their gas safety obligations but are less clear on their plumbing responsibilities. This guide covers both — and why getting them confused can leave you legally exposed.",
    seoTitle: "Gas Safety vs Plumbing Safety for Landlords | Peterborough Plumbers",
    seoDescription: "Gas safety and plumbing safety are different obligations for landlords. Here's what's legally required for each, how often, and who must carry it out.",
    content: `<h2>Two Different Obligations — Don't Confuse Them</h2>
<p>Gas safety and plumbing safety are closely related but governed by entirely different legal frameworks — and both matter if you're a landlord in Peterborough. Most landlords understand their gas obligations. Far fewer are clear on what they must do for plumbing. Here's the full picture.</p>

<h3>Gas Safety: Legally Required, Annually</h3>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, you must arrange an annual inspection of all gas appliances, pipework, and flues in your rental property. This must be carried out by a Gas Safe registered engineer, who issues the CP12 Landlord Gas Safety Record. This certificate must be given to existing tenants within 28 days and to new tenants before they move in. Failure to comply is a criminal offence — and critically, it means you cannot serve a Section 21 eviction notice until the certificate is provided. Our <a href="/services/gas-safety-certificates">gas safety team</a> covers all PE postcodes. See the <a href="/guides/gas-safety-certificate-cost">cost of a gas safety certificate</a> for current pricing.</p>

<h3>Plumbing Safety: No Certificate Required — But a Real Legal Duty</h3>
<p>Unlike gas, there is no statutory annual plumbing certificate. But under the Landlord and Tenant Act 1985, you are legally required to keep all water supply, drainage, and heating installations in repair and proper working order throughout the tenancy. This duty cannot be transferred to the tenant. A landlord who ignores reported plumbing disrepair is liable for resulting damage and potential personal injury claims.</p>

<h3>Legionella: A Documented Legal Duty</h3>
<p>The Control of Substances Hazardous to Health Regulations require landlords to carry out and document a Legionella risk assessment. For most standard residential properties, this is a straightforward self-assessment — but it must be in writing. Properties with cold water storage tanks or hot water stored at intermediate temperatures carry a higher risk.</p>

<h3>The Practical Approach</h3>
<p>The most efficient way to manage both obligations is to combine your annual gas safety check with a broader heating and plumbing inspection in a single visit. Our <a href="/services/landlord-services">landlord services team</a> carries out CP12 certificates alongside boiler servicing and plumbing checks — giving you documented evidence of compliance across both areas with one appointment.</p>

<h3>Got a Rental Property in Peterborough?</h3>
<p>We work with landlords across <a href="/areas/orton">Orton</a>, <a href="/areas/werrington">Werrington</a>, <a href="/areas/city-centre">the city centre</a>, and all surrounding areas. We offer annual reminders, priority response, and direct tenant liaison on your behalf. Call <a href="tel:01733797074">01733797074</a> or <a href="/contact">get in touch</a> to discuss your portfolio.`,
  },

  // ── 5. Emergency plumbing ────────────────────────────────────────────────────
  {
    slug: "no-hot-water-emergency-steps",
    title: "No Hot Water in Your Home? Emergency Steps to Take",
    excerpt: "Woken up to no hot water? Before calling an emergency plumber, work through these checks — many of the most common causes can be resolved in minutes without a call-out fee.",
    seoTitle: "No Hot Water? Emergency Steps to Take | Peterborough Plumbers",
    seoDescription: "No hot water in your home? Follow these steps before calling a plumber — covers boiler pressure, fault codes, frozen condensate pipes, and when to call out.",
    content: `<h2>No Hot Water — Work Through These Checks First</h2>
<p>No hot water is one of the most common emergency call-outs in Peterborough — and one of the most frequently unnecessary ones. Many of the most common causes can be resolved in under ten minutes without an engineer. Work through these steps before picking up the phone. Our full step-by-step <a href="/guides/no-hot-water-emergency">no hot water diagnostic guide</a> covers every scenario in detail.</p>

<h3>Step 1: Check the Boiler Display</h3>
<p>Modern boilers display a fault code when they lock out. That code identifies the problem — look it up in your boiler manual or search the model name and code online. An ignition fault or low pressure code is something you may be able to resolve yourself. A gas or combustion fault code is not — don't reset repeatedly without calling an engineer.</p>

<h3>Step 2: Check the Boiler Pressure</h3>
<p>Low pressure is the single most common reason a combi boiler loses hot water. The gauge should read between 1 and 1.5 bar when the system is cold. If it reads below 1 bar, repressurise using the filling loop (a braided hose, usually under the boiler) until it reaches 1.2–1.5 bar, then reset. Our guide to <a href="/guides/how-to-repressurise-your-boiler">repressurising your boiler</a> walks through this step-by-step.</p>

<h3>Step 3: Check the Thermostat and Programmer</h3>
<p>Before assuming a fault, check the hot water schedule hasn't been accidentally changed — this is the first thing to check on smart thermostats after a power cut. Confirm the hot water temperature setting is correct. It sounds obvious, but it's a surprisingly common cause of a call-out.</p>

<h3>Step 4: Test Whether Heating Also Works</h3>
<p>Turn the central heating on and wait 10 minutes. If radiators heat up but there's still no hot water, the fault is in the hot water circuit specifically — likely a failed diverter valve on a combi boiler, or a motorised valve on a system boiler. Both require an engineer.</p>

<h3>Step 5: Check the Condensate Pipe in Cold Weather</h3>
<p>In winter, look for the white plastic pipe that exits your boiler through an external wall and runs down the outside of the house. If it's frozen, the boiler will lock out. Pour warm water along the pipe to thaw it, then reset the boiler. If this keeps happening, the long-term fix is to lag the pipe or reroute it internally.</p>

<h3>Step 6: Reset the Boiler</h3>
<p>Once you've addressed any visible issue, press and hold the reset button for 3 seconds. The boiler should fire up and hot water should return within a few minutes. If it locks out again within a few hours, there's an underlying fault — call an engineer rather than continuing to reset.</p>

<h3>When to Call Us</h3>
<p>Call our <a href="/services/emergency-plumber">emergency plumbing team</a> if you've worked through the steps above and still have no hot water, if the boiler shows a gas or combustion fault code, if you can smell gas (leave immediately and call 0800 111 999 first), or if there's no hot water and no heating in cold weather with vulnerable people in the property. We cover all PE postcodes including <a href="/areas/city-centre">Peterborough City Centre</a>, <a href="/areas/werrington">Werrington</a>, and all surrounding villages. Call <a href="tel:01733797074">01733797074</a> for a same-day response.`,
  },
];

async function main() {
  console.log(`Refining ${refined.length} Wave 1 blog posts...\n`);
  for (const post of refined) {
    await prisma.blogPost.update({
      where: { slug: post.slug },
      data: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        // slug, publishedAt, status, category — NOT touched
      },
    });
    console.log(`  ✓ ${post.slug}`);
  }
  console.log(`\nDone. ${refined.length} posts refined. Slugs, dates, and categories unchanged.`);
  await prisma.$disconnect();
}

main();
