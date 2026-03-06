/**
 * Wave 4 — Final 10 blog posts
 * Clusters: Boiler & Heating, Plumbing Repairs, Landlord & Legal, Local Peterborough, Bathrooms
 *
 * Run: npx tsx prisma/seed-wave4-blogs.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const wave4Posts = [
  // ─────────────────────────────────────────────
  // CLUSTER: Boiler & Heating
  // ─────────────────────────────────────────────
  {
    slug: "smart-thermostat-vs-standard-thermostat",
    title: "Smart Thermostat vs Standard Thermostat: Is It Worth the Upgrade?",
    category: "Boiler & Heating",
    excerpt:
      "Wondering whether a Nest, Hive, or tado° is worth fitting? We compare smart and standard thermostats on cost, comfort, and energy savings for Peterborough homes.",
    seoTitle: "Smart Thermostat vs Standard: Worth Upgrading? | Peterborough Plumbers",
    seoDescription:
      "Compare smart thermostats (Nest, Hive, tado°) vs standard thermostats. Costs, energy savings, and whether it's worth upgrading in a Peterborough home.",
    publishedAt: new Date("2026-07-04"),
    content: `<h2>What's the Difference Between a Smart and Standard Thermostat?</h2>
<p>A standard thermostat controls your boiler by setting a fixed temperature. When the room hits that temperature, the boiler cuts out — simple, reliable, and cheap to install. A smart thermostat does the same job but adds remote control via an app, learning algorithms, zone scheduling, weather compensation, and integration with voice assistants.</p>
<p>Whether the upgrade is worth it depends on how you use your heating, how old your current setup is, and what you want from your system.</p>

<h2>Types of Smart Thermostat Available in the UK</h2>
<h3>Nest Learning Thermostat (Google)</h3>
<p>Learns your schedule over a week and builds a programme automatically. Excellent app, works with Google Home. Costs around £180–£220 supplied and fitted. Best for homeowners who want a set-and-forget system.</p>

<h3>Hive Active Heating (British Gas)</h3>
<p>Popular in the UK, widely available through British Gas engineers and independent plumbers. App-controlled scheduling, geofencing (turns heating down when you leave), and integrates with Amazon Alexa. Typically £150–£200 fitted.</p>

<h3>tado° Smart Thermostat</h3>
<p>Strong on zone control and open window detection. Geofencing is particularly accurate. Monthly subscription for some premium features. Around £160–£210 fitted.</p>

<h3>Worcester Bosch Wave</h3>
<p>Designed specifically for Worcester Bosch boilers — a logical choice if you have one. Good reliability and warranty compatibility. Fitted cost around £170–£220.</p>

<h2>What Does a Standard Thermostat Cost?</h2>
<p>A basic programmable room thermostat costs £40–£80 supplied and fitted. It lets you set on/off times and a target temperature but offers no remote control or learning. For many straightforward heating systems, it does everything needed at a fraction of the cost.</p>

<h2>Energy Savings: The Real Numbers</h2>
<p>Smart thermostat manufacturers cite savings of 10–30% on heating bills. Independent research puts the figure closer to 8–15% in typical UK homes. The key driver is behaviour change — people who actively use the app and schedule their heating save more than those who set it and ignore it.</p>
<p>At average UK gas prices (around 5–6p/kWh), a household spending £900/year on gas heating might save £70–£130 per year. At a fitted cost of £180, payback is roughly 18–30 months — reasonable if you stay in the property.</p>

<h2>Compatibility: Will a Smart Thermostat Work With Your Boiler?</h2>
<p>Most smart thermostats work with conventional, combi, and system boilers. However, older boilers without a 240V switched live may need an additional relay, adding £30–£50 to the installation. Your plumber should check compatibility before ordering the unit.</p>
<p>If you have underfloor heating, electric heating, or a heat pump, check manufacturer compatibility carefully — not all smart thermostats support these systems.</p>

<h2>Installation: Is It a DIY Job?</h2>
<p>Some smart thermostats (like Hive and tado°) are marketed as DIY-install. The wiring is straightforward for a competent DIYer who is comfortable with low-voltage electrics. However:</p>
<ul>
<li>Mistakes in thermostat wiring can damage your boiler's control board</li>
<li>If your boiler needs a relay fitted, Gas Safe registration may be required</li>
<li>A Gas Safe engineer fitting the thermostat will check your boiler settings at the same time</li>
</ul>
<p>For most homeowners, having a qualified heating engineer fit it alongside a <a href="/services/boiler-service">boiler service</a> is the most cost-effective approach.</p>

<h2>Smart Thermostat vs Upgrading Your Boiler</h2>
<p>If your boiler is over 12–15 years old, a new A-rated condensing boiler will deliver far greater efficiency gains than any thermostat. A smart thermostat optimises a boiler's runtime — it can't fix an inefficient heat exchanger or a poorly sized system. See our guide on <a href="/blog/signs-boiler-needs-replacing">signs your boiler needs replacing</a> before investing in smart controls.</p>

<h2>Our Verdict for Peterborough Homeowners</h2>
<p>A smart thermostat is worthwhile if:</p>
<ul>
<li>Your boiler is in good condition (under 10 years old)</li>
<li>Your household heating schedule is variable week to week</li>
<li>You travel regularly or want remote control</li>
<li>You already have a basic non-programmable thermostat</li>
</ul>
<p>Stick with a standard programmable thermostat if:</p>
<ul>
<li>Your routine is fixed and predictable</li>
<li>You're on a tight budget</li>
<li>Your boiler is nearing end of life</li>
</ul>

<h2>Get It Fitted Properly in Peterborough</h2>
<p>We supply and fit smart thermostats across Peterborough, including Hive, tado°, Nest, and Worcester Wave. All installations include a system check and boiler pressure test. <a href="/contact">Contact us</a> for a quote, or call to book alongside your next <a href="/services/boiler-service">annual boiler service</a>.</p>`,
    status: "Published",
  },

  {
    slug: "hard-water-boiler-damage-peterborough",
    title: "Hard Water and Your Boiler: What Peterborough Homeowners Need to Know",
    category: "Boiler & Heating",
    excerpt:
      "Peterborough has moderately hard water. Here's how limescale builds up inside boilers and heat exchangers, what damage it causes, and how to protect your system.",
    seoTitle: "Hard Water Boiler Damage in Peterborough: Protection Guide | Plumbers",
    seoDescription:
      "Peterborough has hard water that causes limescale inside boilers and heat exchangers. Learn how to protect your boiler and central heating system.",
    publishedAt: new Date("2026-07-19"),
    content: `<h2>How Hard Is Peterborough's Water?</h2>
<p>Water hardness is measured in milligrams of calcium carbonate per litre (mg/l). Peterborough sits in the moderately hard to hard range — typically 200–250 mg/l — supplied by Anglian Water, which draws from chalk aquifers across the East of England. For context, London water is 250–350 mg/l (very hard), while the North West is typically below 50 mg/l (soft).</p>
<p>At Peterborough's hardness level, limescale accumulation is a real and progressive problem for boilers, heat exchangers, hot water cylinders, and shower heads. Understanding the risk helps homeowners invest in the right preventative measures.</p>

<h2>How Limescale Forms in a Boiler</h2>
<p>When hard water is heated, the dissolved calcium and magnesium salts precipitate out and bond to hot surfaces — particularly the heat exchanger. Over time, this forms a hard, white mineral deposit (limescale) that:</p>
<ul>
<li>Acts as an insulator, reducing heat transfer efficiency</li>
<li>Forces the boiler to work harder to reach target temperatures</li>
<li>Causes hot spots on the heat exchanger that can crack the component</li>
<li>Restricts water flow through narrow heat exchanger channels</li>
</ul>
<p>In a combi boiler — where the heat exchanger heats domestic hot water directly — the problem is particularly acute because tap water (full of dissolved minerals) passes through the exchanger millions of times over the boiler's lifetime.</p>

<h2>Signs Your Boiler Has a Limescale Problem</h2>
<ul>
<li>Kettling — a rumbling or banging noise from the boiler during operation (water boiling in a restricted exchanger)</li>
<li>Reduced hot water flow rate from taps and shower</li>
<li>Boiler taking longer than usual to reach temperature</li>
<li>Higher gas bills without a change in usage</li>
<li>Frequent boiler lockouts, especially error codes related to overheating</li>
</ul>
<p>Kettling is the most distinctive symptom — if your boiler sounds like a kettle boiling, have a Gas Safe engineer inspect the heat exchanger. See our guide on <a href="/blog/boiler-error-codes-explained">boiler error codes</a> for common fault patterns.</p>

<h2>The Cost of Ignoring Limescale</h2>
<p>A limescale-affected heat exchanger loses 10–15% of its efficiency per millimetre of scale buildup. In practical terms:</p>
<ul>
<li>A boiler running at 85% efficiency due to scale costs roughly 15% more to run than a clean boiler</li>
<li>Heat exchanger replacement costs £300–£600 for parts alone, plus labour — often making it more economical to replace the boiler entirely</li>
<li>Severe scale can void manufacturer warranties if annual servicing hasn't been maintained</li>
</ul>

<h2>Prevention: The Most Cost-Effective Approach</h2>
<h3>Scale Reducer (In-Line Filter)</h3>
<p>A scale reducer fitted to the mains cold supply changes the crystal structure of calcium as it enters the system, reducing its ability to bond to surfaces. These cost £30–£70 fitted and require cartridge replacement every 6–12 months. Effective at moderate hardness levels like Peterborough's.</p>

<h3>Water Softener</h3>
<p>A whole-house ion exchange water softener eliminates hardness entirely — soft water produces no scale. The softener requires a salt reservoir, top-ups every 4–8 weeks, and costs £800–£1,500 fitted. A separate hard water tap for drinking is recommended (softened water has elevated sodium content). Overkill for most households but ideal for large families or properties with multiple bathrooms.</p>

<h3>Inhibitor Dosing (Central Heating)</h3>
<p>The central heating circuit (radiators and boiler) is a closed loop — the same water circulates repeatedly, and its hardness minerals precipitate out and settle rather than accumulating on heat exchanger surfaces. Adding a quality inhibitor (Fernox F1 or Sentinel X100) to the heating circuit prevents corrosion and sludge formation.</p>

<h3>Magnetic Filter</h3>
<p>A magnetic system filter traps iron oxide sludge (magnetite) from corroding radiators before it reaches the boiler. Read our guide on <a href="/blog/magnetic-filter-boiler-explained">magnetic filters for boilers</a> for the full explanation. Combined with inhibitor dosing, this keeps the heating circuit clean.</p>

<h2>Annual Servicing: Your First Line of Defence</h2>
<p>An annual <a href="/services/boiler-service">boiler service</a> allows an engineer to check the heat exchanger visually, measure combustion efficiency (which drops as scale builds), and flush or descale minor buildup before it becomes severe. A boiler that is serviced annually in a hard water area will outlast an unserviced boiler by 3–5 years on average.</p>

<h2>Book a Boiler Health Check in Peterborough</h2>
<p>If your boiler is kettling, losing efficiency, or hasn't been serviced in over a year, get it checked before winter. We serve all Peterborough postcodes — <a href="/contact">contact us</a> to arrange a service or scale assessment.</p>`,
    status: "Published",
  },

  // ─────────────────────────────────────────────
  // CLUSTER: Plumbing Repairs
  // ─────────────────────────────────────────────
  {
    slug: "noisy-toilet-cistern-causes-and-fix",
    title: "Noisy Toilet Cistern: Causes, Fixes, and When to Call a Plumber",
    category: "Plumbing Repairs",
    excerpt:
      "Hissing, banging, or gurgling after flushing? We diagnose the most common noisy cistern problems and tell you which ones are DIY fixes vs plumber jobs.",
    seoTitle: "Noisy Toilet Cistern: Causes & Fixes | Peterborough Plumbers",
    seoDescription:
      "Hissing, running, or banging toilet cistern? Find out what's causing the noise and how to fix it — or when to call a plumber in Peterborough.",
    publishedAt: new Date("2026-07-07"),
    content: `<h2>Why Is My Toilet Making Noise?</h2>
<p>A toilet cistern that hisses, runs continuously, bangs, or gurgles after flushing is usually signalling a worn internal component. Most cistern noise issues are inexpensive to fix — parts cost £5–£25 — but left unattended, a faulty fill valve or flapper can waste hundreds of litres of water per day.</p>

<h2>The Most Common Cistern Noises and What They Mean</h2>
<h3>Continuous Hissing or Running Water</h3>
<p>This is almost always the fill valve (also called a ballcock or float valve). When the rubber seal inside wears out, water trickles past it into the overflow or bowl continuously. You'll often see a thin stream of water running down the back of the pan — easy to spot at night when the house is quiet.</p>
<p><strong>Fix:</strong> Replace the fill valve washer or the full fill valve unit. A standard Fluidmaster or Siamp fill valve costs £8–£15 from a plumbers' merchant and takes 20 minutes to swap out.</p>

<h3>Hissing That Stops After the Cistern Fills</h3>
<p>If the hissing stops once the cistern is full, the issue is usually the fill valve struggling to close completely at high mains pressure. Fitting a pressure-reducing valve or adjusting the float arm will solve it.</p>

<h3>Banging or Water Hammer After Flushing</h3>
<p>A loud bang when the fill valve closes is called water hammer — a pressure surge in the supply pipe. It's caused by high mains pressure hitting a fast-closing valve. Solutions include fitting an inline shock arrestor or a pressure-reducing valve on the cold supply. See our guide on <a href="/blog/low-water-pressure-causes-solutions">water pressure problems</a> for context.</p>

<h3>Gurgling From the Pan After Flushing</h3>
<p>Gurgling from the bowl — rather than the cistern — suggests a partial blockage or venting problem in the drain. The toilet is flushing fine but the waste is pulling air back up through the trap. A drain snake or a call to our <a href="/services/drain-blockages">drain unblocking team</a> will sort it.</p>

<h3>Phantom Flushing (Cistern Refills Without Being Flushed)</h3>
<p>If the cistern randomly refills on its own every 20–30 minutes, the flush valve (flapper) is leaking water from the cistern into the pan. Drop a few drops of food dye into the cistern — if colour appears in the pan within 10 minutes without flushing, the flapper needs replacing.</p>
<p><strong>Fix:</strong> Flush valve flappers cost £5–£10 and replace in under 15 minutes with no tools required on most modern close-coupled toilets.</p>

<h2>Is It Safe to Ignore Cistern Noise?</h2>
<p>A hissing or phantom-flushing toilet isn't a safety risk, but it is a financial one. A continuously running toilet wastes 200–400 litres per day — adding £100–£200 per year to a water-metered household's bill. It also signals component wear that, if ignored, can lead to overflow and water damage.</p>

<h2>When to Call a Plumber for a Noisy Toilet</h2>
<ul>
<li>The cistern is cracked or weeping water at the base</li>
<li>The supply stop tap under the cistern won't close fully</li>
<li>The toilet is a concealed cistern (built into the wall) — access panels often require careful removal</li>
<li>Water hammer is severe and affecting other taps in the house</li>
<li>The toilet is part of a new bathroom suite still under warranty</li>
</ul>

<h2>Cistern Repairs in Peterborough</h2>
<p>Our <a href="/services/plumbing-repairs">plumbing repairs</a> team carry standard fill valves, flappers, and shut-off valves on the van. Most toilet repairs are completed in a single visit. We cover all areas including <a href="/areas/city-centre">Peterborough city centre</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/werrington">Werrington</a>, and surrounding villages. <a href="/contact">Book a repair visit</a> today.</p>`,
    status: "Published",
  },

  {
    slug: "washing-machine-leaking-what-to-do",
    title: "Washing Machine Leaking: What to Do and When You Need a Plumber",
    category: "Plumbing Repairs",
    excerpt:
      "A leaking washing machine can cause serious floor damage quickly. Here's how to identify where the leak is coming from and whether it needs a plumber or an appliance engineer.",
    seoTitle: "Washing Machine Leaking: Causes & When to Call a Plumber | Peterborough",
    seoDescription:
      "Washing machine leaking from the front, back, or underneath? Find out the common causes, what you can fix yourself, and when to call a plumber in Peterborough.",
    publishedAt: new Date("2026-07-10"),
    content: `<h2>Where Is the Water Coming From?</h2>
<p>Pinpointing the source of a washing machine leak tells you whether it's a plumbing job, an appliance job, or a DIY fix. Pull the machine forward carefully and look for water during the fill, wash, and spin cycles.</p>

<h3>Leak from the Back of the Machine</h3>
<p>Most back-of-machine leaks originate from the water supply hoses — the two braided hoses connecting your cold (and sometimes hot) supply to the inlet valve. These hoses can crack, perish at the connectors, or lose their rubber washers over time.</p>
<p><strong>Plumbing job:</strong> If the leak is at the wall connection or the stop tap is faulty, that's plumbing. If it's at the hose-to-machine connection, replacement hoses cost £8–£15 and are a simple DIY swap — just turn off the stop tap first.</p>

<h3>Leak from the Front or Door Seal</h3>
<p>A leaking door seal (drum gasket) is an appliance repair — the rubber seal has torn or accumulated debris that prevents a proper seal. This isn't a plumbing issue. Contact a washing machine repair engineer.</p>

<h3>Leak from the Drain Hose or Standpipe</h3>
<p>The drain hose runs from the back of the machine to the standpipe or under-sink trap. Leaks here can be:</p>
<ul>
<li>A split or cracked drain hose (appliance repair)</li>
<li>A loose clip at the standpipe connection (DIY — push the hose in further and secure with a cable tie)</li>
<li>A blocked standpipe overflowing because the drain can't clear fast enough (plumbing or drain issue)</li>
</ul>
<p>A blocked standpipe is common in older homes — water from the machine's pump overwhelms a partially blocked drain. If your sink also drains slowly, the blockage is downstream. Our <a href="/services/drain-blockages">drain clearing team</a> can clear the trap and stack with a jet or snake.</p>

<h3>Leak Underneath the Machine</h3>
<p>Water pooling directly under the machine during the wash cycle usually indicates an internal component — pump, drum seal, or sump hose. This is an appliance engineer issue, not plumbing.</p>

<h2>Water Damage: Act Fast</h2>
<p>Even a slow washing machine leak can cause significant damage to chipboard flooring, kitchen cabinets, and the ceiling of rooms below. If you discover water pooled under or around the machine:</p>
<ol>
<li>Turn off the machine immediately</li>
<li>Turn off the stop tap on the supply hose</li>
<li>Mop up and dry the area thoroughly</li>
<li>Raise the machine on blocks if possible to allow the floor to dry</li>
</ol>
<p>If water has gone through the floor, read our guide on <a href="/blog/water-coming-through-ceiling">what to do when water comes through the ceiling</a>. You may also need to document the damage for an insurance claim — see our post on <a href="/blog/water-damage-insurance-claims-plumber">water damage insurance documentation</a>.</p>

<h2>Stop Taps: The Most Common Plumbing Issue</h2>
<p>Many washing machine supply stop taps — especially in homes over 20 years old — have never been closed. When a leak is discovered and the homeowner tries to close the tap, it either won't turn or leaks from the spindle. This is a plumbing repair: the stop tap needs replacing.</p>
<p>We recommend having accessible, working stop taps for all appliances. Our <a href="/services/plumbing-repairs">plumbing repairs</a> team can replace faulty stop taps and add isolation valves for easy future maintenance.</p>

<h2>When to Call Us in Peterborough</h2>
<p>Call a plumber (rather than an appliance engineer) if:</p>
<ul>
<li>The supply hose is leaking at the wall or the stop tap</li>
<li>The stop tap won't close or is leaking</li>
<li>The standpipe is overflowing due to a drainage blockage</li>
<li>You have water damage through a floor or ceiling</li>
</ul>
<p>We cover <a href="/areas/orton">Orton</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/bretton">Bretton</a>, and all Peterborough postcodes. <a href="/contact">Book a visit</a> or call for same-day availability.</p>`,
    status: "Published",
  },

  // ─────────────────────────────────────────────
  // CLUSTER: Landlord & Legal
  // ─────────────────────────────────────────────
  {
    slug: "gas-safety-multiple-properties-landlord-portfolio",
    title: "Managing Gas Safety Across a Landlord Portfolio: What You Need to Know",
    category: "Landlord & Legal",
    excerpt:
      "Own more than one rental property? Here's how to manage gas safety certificates, boiler servicing, and landlord compliance efficiently across multiple properties.",
    seoTitle: "Gas Safety for Landlord Portfolio: Managing Multiple Properties | Peterborough",
    seoDescription:
      "How to manage Gas Safety Record renewals, boiler services, and CP12 compliance across multiple rental properties in Peterborough. Landlord portfolio guide.",
    publishedAt: new Date("2026-07-13"),
    content: `<h2>Why Portfolio Management Matters for Gas Safety</h2>
<p>Owning a single rental property is straightforward — one Gas Safety Record (GSR) renewal per year, one boiler service, and one set of legal dates to track. But as a portfolio grows to 3, 5, or 15 properties, the admin complexity grows with it. Missing a renewal means an invalid tenancy, potential prosecution, and — in the worst case — an undetected gas fault.</p>
<p>This guide is for Peterborough landlords managing two or more properties who want a reliable, cost-effective compliance system.</p>

<h2>The Legal Baseline: What Every Rental Property Needs</h2>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, every landlord must:</p>
<ul>
<li>Have all gas appliances and flues checked annually by a Gas Safe registered engineer</li>
<li>Obtain a Gas Safety Record (CP12) for each property</li>
<li>Give a copy of the GSR to existing tenants within 28 days of the check</li>
<li>Give a copy to new tenants before they move in</li>
<li>Keep GSR copies for two years</li>
</ul>
<p>Failure can result in a £6,000 fine per offence and up to 6 months imprisonment. See our detailed <a href="/blog/landlord-gas-safety-guide">landlord gas safety guide</a> for the full legal framework.</p>

<h2>Building a Renewal Calendar</h2>
<p>The biggest risk in a portfolio is letting dates drift. Most portfolio landlords use one of these systems:</p>

<h3>Staggered Renewals (Natural Dates)</h3>
<p>Each property renews on its own anniversary. Simpler to start but harder to manage as the portfolio grows — you'll have renewal reminders in every month of the year.</p>

<h3>Aligned Renewals (Batch Scheduling)</h3>
<p>Align all properties to renew in the same month (e.g., October). Easier to manage, allows batch pricing with your engineer, and means one admin push per year. The transition takes 2–3 years to align all properties without breaching any annual requirement.</p>

<h3>Software-Managed (Best for 5+ Properties)</h3>
<p>Property management platforms like Arthur Online, Landlord Studio, or Fixflo have built-in compliance calendars that send automatic reminders at 90, 60, and 30 days before each renewal. Many Gas Safe engineers can integrate directly with these systems.</p>

<h2>Coordinating Boiler Servicing With Gas Safety Checks</h2>
<p>In most rental properties, the annual <a href="/services/boiler-service">boiler service</a> and the Gas Safety Record inspection should be done simultaneously. This:</p>
<ul>
<li>Reduces call-out costs (one visit per property, not two)</li>
<li>Ensures the service record is aligned with the compliance certificate</li>
<li>Gives tenants one disruption per year rather than two</li>
</ul>
<p>Confirm with your engineer that both the service and the statutory inspection are included in the visit — some landlords assume the GSR includes a full service when it only covers a safety inspection (which is faster and cheaper but does not maintain the boiler's warranty or efficiency).</p>

<h2>Batch Pricing: What to Expect in Peterborough</h2>
<p>Most Gas Safe engineers offer volume discounts for portfolio landlords. Typical Peterborough rates:</p>
<ul>
<li>Single property GSR only: £70–£90</li>
<li>GSR + boiler service combined: £100–£140</li>
<li>Portfolio of 5+ properties (combined service + GSR): £90–£120 per property</li>
<li>Portfolio of 10+ properties: £80–£100 per property (negotiable)</li>
</ul>
<p>Establishing an ongoing relationship with a single Gas Safe firm means consistent paperwork, a single point of contact for emergency callouts, and better rates over time.</p>

<h2>Handling Tenant Access</h2>
<p>The biggest practical challenge in portfolio management isn't the engineering — it's gaining access. Tenants are busy, sometimes uncooperative, and occasionally hostile to letting contractors in. Legally, you must give 24 hours' written notice before entry.</p>
<p>Best practice:</p>
<ul>
<li>Build gas safety access requirements into the tenancy agreement</li>
<li>Contact tenants by text, email, and letter — use all three</li>
<li>Offer flexible morning/evening appointments</li>
<li>Document all contact attempts if access is refused</li>
</ul>
<p>If a tenant consistently refuses access, you may need to apply for a court order. Your solicitor or the National Landlords Association can advise on the process.</p>

<h2>HMO Properties: Additional Requirements</h2>
<p>HMOs (Houses in Multiple Occupation) have additional gas and plumbing obligations. Each gas appliance serving the property must be checked, and some local authorities require additional documentation beyond the standard GSR. Read our guide on <a href="/blog/hmo-plumbing-requirements-landlords">HMO plumbing requirements</a> for detail.</p>

<h2>Work With Us Across Your Peterborough Portfolio</h2>
<p>We manage annual compliance programmes for Peterborough portfolio landlords — from 2 properties to 20+. We provide digital GSR copies, batch scheduling, and emergency cover across all PE postcodes. <a href="/contact">Contact us</a> to discuss a portfolio service agreement, or visit our <a href="/services/landlord-services">landlord services page</a>.</p>`,
    status: "Published",
  },

  // ─────────────────────────────────────────────
  // CLUSTER: Local Peterborough
  // ─────────────────────────────────────────────
  {
    slug: "victorian-edwardian-plumbing-older-property-peterborough",
    title: "Victorian & Edwardian Plumbing: What Owners of Older Peterborough Homes Should Know",
    category: "Local Guides",
    excerpt:
      "Own a Victorian or Edwardian property in Peterborough? Here's what the original plumbing looks like, what's typically failed, and how to upgrade it without damaging your home.",
    seoTitle: "Victorian & Edwardian Plumbing Guide for Peterborough Homes | Plumbers",
    seoDescription:
      "Older property in Peterborough? Understand Victorian and Edwardian plumbing — lead pipes, iron drains, tank systems — and how to upgrade safely.",
    publishedAt: new Date("2026-07-16"),
    content: `<h2>Older Peterborough Homes: A Plumbing Overview</h2>
<p>Peterborough has a rich stock of Victorian and Edwardian terraces, particularly in areas like New England, Millfield, Fletton, and the city centre. These properties — built roughly 1840–1920 — have character, solid construction, and often original plumbing that's now well past its intended lifespan.</p>
<p>Understanding what's under the floors and behind the walls is essential before buying, renovating, or experiencing a plumbing fault in an older property.</p>

<h2>Lead Pipework: Is It Still There?</h2>
<p>Lead was the standard material for water supply pipes until the 1970s. In properties built before 1970 and not substantially replumbed since, there's a reasonable chance the supply pipe from the street to the property (the communication pipe) or the internal rising main is still lead.</p>
<p>Lead in drinking water is a health concern, particularly for children and pregnant women. The legal limit for lead in drinking water is 10 micrograms per litre — older lead pipes, especially in soft water areas, can exceed this.</p>
<p><strong>What to do:</strong> Contact Anglian Water to enquire about the street-side connection. For internal pipes, a plumber can identify lead by its dull grey colour, soft texture, and characteristic swelling at joints. Replacement with copper or plastic is the only permanent solution. Read our <a href="/blog/plumbing-problems-peterborough-older-homes">guide to common plumbing problems in older Peterborough homes</a> for more on pipe materials.</p>

<h2>Cast Iron and Clay Drains</h2>
<p>Victorian waste pipes and underground drains were built from cast iron (above ground) and clay (underground). Cast iron is actually very durable — many Victorian cast iron stacks are still in service — but they corrode internally over time and the joints can crack or separate.</p>
<p>Clay underground drains perform well until tree roots find the joints. Peterborough's older areas have mature street trees that have had 100+ years to explore neighbouring drains. Root ingress is the most common drain problem we find in Victorian properties.</p>
<p>A <a href="/services/drain-blockages">CCTV drain survey</a> before buying an older property is one of the best investments a purchaser can make. See our guide on <a href="/blog/cctv-drain-survey-peterborough">what a CCTV drain survey involves</a>.</p>

<h2>Cold Water Storage Tanks</h2>
<p>Edwardian and mid-twentieth century homes typically have a cold water storage tank in the loft — usually a rectangular fibreglass or galvanised steel tank holding 50–200 litres. This feeds cold taps (except the kitchen drinking tap), baths, and the hot water cylinder.</p>
<p>These tank-fed systems are sometimes called "indirect" or "gravity-fed" systems. They work reliably but have lower water pressure than modern unvented systems, and the tanks themselves can:</p>
<ul>
<li>Accumulate sediment and biofilm (including, rarely, Legionella)</li>
<li>Crack or corrode in galvanised steel versions</li>
<li>Have poorly fitted covers allowing contamination</li>
</ul>
<p>Many older homes have been converted to combi boilers, eliminating the tank and cylinder entirely. If you still have a tank-fed system, ensure it has a properly fitting lid, insulation jacket, and is inspected periodically.</p>

<h2>Hot Water Cylinders and Back Boilers</h2>
<p>Older homes often have a hot water cylinder heated by an immersion heater or a back boiler (fitted behind a gas or solid fuel fire). Back boilers are no longer manufactured and are increasingly difficult to service — replacement with a modern combi or system boiler is usually the most sensible long-term decision.</p>
<p>If the cylinder is lagged properly and the immersion element works, a copper cylinder can last 30–40 years. Check the thermostat is set to 60°C (to kill bacteria) and that the pressure/temperature relief valve is functional.</p>

<h2>Low Pressure and Small-Bore Pipes</h2>
<p>Victorian supply pipes were often 15mm or even 12mm bore — smaller than modern 22mm standards. As households have added more showers, appliances, and bathrooms, these small-bore mains struggle to supply adequate flow. If you experience <a href="/blog/low-water-pressure-causes-solutions">low water pressure</a> throughout the house, small-bore pipework may be the culprit rather than mains pressure.</p>

<h2>Planning a Replumb: Key Considerations</h2>
<p>A full replumb of a Victorian terrace in Peterborough typically costs £3,500–£7,000 depending on the number of storeys, bathroom count, and pipe routing complexity. It's a significant job but transformative — modern plastic (PEX or CPVC) or copper throughout, full mains pressure, and no more mystery faults.</p>
<p>If a full replumb isn't in the budget, a targeted approach works well: replace the lead rising main first (highest health priority), then upgrade to a combi boiler, then address the cold water tank.</p>
<p>We can inspect older plumbing systems and provide a prioritised upgrade plan. Our <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing surveys</a> are also popular with buyers of Victorian and Edwardian homes in Peterborough. <a href="/contact">Get in touch</a> to arrange a survey or replumb quote.</p>`,
    status: "Published",
  },

  {
    slug: "period-property-stamford-plumbing-guide",
    title: "Plumbing in Stamford's Period Properties: A Local Owner's Guide",
    category: "Local Guides",
    excerpt:
      "Stamford's limestone terraces and Georgian townhouses are beautiful — but their plumbing needs specialist understanding. Here's what owners of Stamford period homes should know.",
    seoTitle: "Plumbing in Stamford Period Properties: Local Guide | Peterborough Plumbers",
    seoDescription:
      "Own a period property in Stamford? Learn about limestone pipework, low-pressure systems, historic drain layouts, and how to upgrade plumbing without damaging your home.",
    publishedAt: new Date("2026-07-22"),
    content: `<h2>Why Stamford Plumbing Is Different</h2>
<p>Stamford, Lincolnshire — just 12 miles from Peterborough — is one of England's finest stone towns, with a largely intact Georgian and Victorian streetscape built from local Lincolnshire limestone. It's a Conservation Area with many listed buildings, which means any work that affects the external appearance or structural fabric of a property requires listed building consent or permitted development assessment.</p>
<p>This creates unique challenges for plumbing upgrades: routes for new pipework, flue positions for replacement boilers, and drain layouts all need careful planning that wouldn't apply to a standard modern house.</p>

<h2>Common Plumbing Systems in Stamford Period Homes</h2>
<h3>Lead and Early Copper Supply Pipes</h3>
<p>Properties built before 1970 in Stamford frequently retain lead supply pipes — either the communication pipe from the street or internal distribution pipes. Lead is soft, bendable, and dull grey. If you're unsure whether your pipes are lead, a plumber can identify them visually and recommend testing if needed.</p>
<p>Anglian Water serves Stamford and can inspect the street connection. Internal lead pipes should be replaced with copper or plastic, particularly if children or pregnant women live in the property.</p>

<h3>Gravity-Fed Systems with Loft Tanks</h3>
<p>Most pre-1980 Stamford homes have cold water storage tanks in the loft feeding baths and basin cold taps, with a separate hot water cylinder. These gravity-fed systems deliver lower pressure than modern unvented systems — a common complaint from new owners who've moved from a modern property.</p>
<p>Upgrading to a combi boiler removes the tank and cylinder, gives mains-pressure hot water, and frees up significant loft space. In a listed building, the flue position for the new boiler must be agreed with the Conservation Officer — rear or hidden elevations are usually acceptable; front elevations rarely are.</p>

<h3>Stone Flags and Buried Drain Layouts</h3>
<p>Many Stamford properties have original stone flag floors in basements, kitchens, and outbuildings. Underground drains often follow unconventional routes dictated by the original construction rather than modern building regulations. Before any groundworks or drain repair, a <a href="/services/drain-blockages">CCTV drain survey</a> is essential — it shows exactly where the drain runs, avoiding costly and damaging exploratory excavation through period floors.</p>

<h2>Boiler Replacement in a Listed Stamford Property</h2>
<p>Replacing a boiler in a listed building requires considering:</p>
<ul>
<li><strong>Flue position:</strong> Must not emerge on a principal elevation visible from a public highway without consent</li>
<li><strong>Pipe routes:</strong> New pipes must not be surface-mounted on exposed limestone walls without consent</li>
<li><strong>Structural penetrations:</strong> Core drilling through limestone walls requires careful technique to avoid cracking</li>
<li><strong>Historic chimney flues:</strong> Some listed properties can use existing chimney flues for a new boiler — this requires a liner and specialist assessment</li>
</ul>
<p>We recommend contacting South Kesteven District Council's Conservation Officer before booking a boiler replacement in a Stamford listed property. In many cases, the preferred boiler position and flue route is straightforward and consent isn't needed — but it's better to confirm in advance.</p>

<h2>Low Water Pressure: A Stamford-Specific Issue</h2>
<p>Stamford's elevated topography means some properties — particularly on higher streets — can experience lower mains pressure than flat areas. Combined with an aging gravity-fed internal system, this creates noticeably poor flow at upper floor bathrooms.</p>
<p>Solutions include:</p>
<ul>
<li>Installing a mains pressure booster pump on the cold supply</li>
<li>Converting to an unvented hot water cylinder (stores hot water under mains pressure)</li>
<li>Installing a combi boiler which draws directly from the mains</li>
</ul>
<p>Read our full guide on <a href="/blog/low-water-pressure-causes-solutions">low water pressure causes and solutions</a> for more detail.</p>

<h2>Finding a Plumber Who Understands Historic Properties</h2>
<p>Not all plumbing contractors have experience working in listed buildings or Conservation Areas. Key questions to ask:</p>
<ul>
<li>Have you worked in listed buildings in Stamford or similar Conservation Areas before?</li>
<li>Can you advise on pipe routing that avoids surface mounting on limestone?</li>
<li>Do you have experience with gravity-fed system conversion?</li>
</ul>
<p>We cover Stamford and surrounding Lincolnshire villages from our Peterborough base. We've worked on period properties across the area and understand the planning and conservation constraints involved. <a href="/areas/stamford">See our Stamford service area page</a> or <a href="/contact">get in touch</a> to discuss your project.</p>`,
    status: "Published",
  },

  {
    slug: "common-plumbing-callouts-peterborough",
    title: "The 10 Most Common Plumbing Callouts in Peterborough (and How to Prevent Them)",
    category: "Local Guides",
    excerpt:
      "Based on our callout data, these are the plumbing problems Peterborough homeowners call us about most often — and the simple steps that prevent most of them.",
    seoTitle: "10 Most Common Plumbing Callouts in Peterborough | Peterborough Plumbers",
    seoDescription:
      "Discover the most common plumbing emergencies and callouts we attend in Peterborough — from blocked drains to boiler faults — and how to prevent them.",
    publishedAt: new Date("2026-07-25"),
    content: `<h2>What Peterborough Plumbers Actually Get Called Out For</h2>
<p>After years of serving homeowners across Peterborough and surrounding areas, certain faults appear time and again. Some are seasonal, some are property-age related, and some are simply the result of normal wear and tear. Here are the ten most common callouts we attend — and the straightforward steps that prevent most of them.</p>

<h2>1. Blocked Kitchen Drains</h2>
<p>The single most common callout. Fats, oils, and food particles accumulate in the P-trap and waste pipe until the sink won't drain at all. Prevention is simple: never pour cooking fat down the sink, use a drain strainer, and pour a kettle of boiling water down the drain weekly. For persistent grease blockages, a professional jet clean is more effective than chemical drain cleaners, which can damage older pipework.</p>

<h2>2. Boiler Pressure Loss</h2>
<p>Modern combi and system boilers need to operate between 1 and 1.5 bar. A slow pressure drop over weeks usually indicates a minor leak in the system — often at a radiator valve, compression fitting, or the boiler's pressure relief valve. A fast pressure drop (pressure drops overnight) is more urgent. Read our guide on <a href="/blog/how-to-repressurise-your-boiler">how to repressurise your boiler</a> for the DIY fix, or call us if pressure drops again within days of repressurising.</p>

<h2>3. No Hot Water (Combi Boiler Fault)</h2>
<p>The most distressing callout — especially in winter. Common causes include a faulty diverter valve (heating works but no hot water), a failed thermistor, air in the system, or a locked-out boiler displaying an error code. See our guide on <a href="/blog/no-hot-water-emergency-steps">no hot water emergency steps</a> for what to check before calling out.</p>

<h2>4. Leaking Radiator Valves</h2>
<p>Thermostatic radiator valves (TRVs) and lockshield valves can develop small leaks at the compression fitting or the valve body — usually a gradual drip rather than a flood. Left unattended, this causes floorboard damage and reduces system pressure. Valve replacement is a 20-minute job. See our post on <a href="/blog/leaking-radiator-valve-pipe-body">leaking radiator valves</a> to identify the source.</p>

<h2>5. Outdoor Drain Blockages</h2>
<p>Peterborough's autumn leaf fall and garden debris causes outdoor gully and gulley trap blockages every October–November. These are often DIY-clearable with gloves and a drain rod, but deeper blockages in the shared drain require jetting. We see a spike in these callouts every autumn — clearing gutters and drain covers in September prevents most of them.</p>

<h2>6. Running or Leaking Toilet Cisterns</h2>
<p>A hissing cistern or phantom-flushing toilet (see our <a href="/blog/noisy-toilet-cistern-causes-and-fix">noisy cistern guide</a>) is one of the most water-wasteful faults in any home. A continuously running toilet wastes up to 400 litres per day. The fix (fill valve or flapper replacement) is cheap and usually takes under 30 minutes.</p>

<h2>7. Frozen or Burst Pipes</h2>
<p>Peterborough gets hard frosts in January and February — temperatures regularly drop to -5°C or below. Pipes in uninsulated lofts, garages, and external runs are most vulnerable. Prevention: insulate all visible pipework in unheated spaces and keep heating ticking over at 10–12°C minimum when away in winter. If you return to find no water, read our guide on <a href="/blog/frozen-pipe-how-to-thaw">how to thaw a frozen pipe</a>.</p>

<h2>8. Dripping Taps</h2>
<p>Old-style tap washers wear out, and modern ceramic disc cartridges can crack or jam. A single dripping hot tap wastes enough hot water to add £15–£30 to an annual energy bill. Most tap repairs cost £50–£80 to fix professionally — worth it. Read our existing guide on <a href="/blog/how-to-stop-dripping-tap">how to stop a dripping tap</a> for DIY options.</p>

<h2>9. CCTV Drain Surveys Before House Purchase</h2>
<p>This isn't an emergency callout — it's a planned inspection that prevents emergencies. We see a steady stream of Peterborough buyers who've discovered collapsed drains, root ingress, or illegal connections after moving in. A <a href="/services/drain-blockages">CCTV drain survey</a> before exchange costs £150–£250 and can reveal £3,000+ problems while there's still time to renegotiate the purchase price or request repairs.</p>

<h2>10. Boiler Breakdowns During Cold Snaps</h2>
<p>Every January we handle emergency callouts from homeowners with boilers that haven't been serviced in years and have given up on the coldest night of the month. Annual servicing identifies failing components before they cause a breakdown. A <a href="/services/boiler-service">boiler service</a> costs £80–£120 — significantly less than an emergency breakdown callout plus parts in the middle of winter.</p>

<h2>Prevention Is Always Cheaper Than a Callout</h2>
<p>Most of the callouts above are preventable with annual servicing, basic maintenance, and prompt attention to small faults before they become large ones. We cover all Peterborough postcodes — <a href="/areas/city-centre">city centre</a>, <a href="/areas/orton">Orton</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/werrington">Werrington</a>, and surrounding villages. <a href="/contact">Contact us</a> to book a service or discuss a maintenance plan.</p>`,
    status: "Published",
  },

  // ─────────────────────────────────────────────
  // CLUSTER: Bathrooms
  // ─────────────────────────────────────────────
  {
    slug: "bathroom-suite-vs-individual-fixtures-cost-guide",
    title: "Bathroom Suite vs Individual Fixtures: Which Is Better Value in the UK?",
    category: "Bathrooms",
    excerpt:
      "Should you buy a complete bathroom suite or pick individual fixtures separately? We break down the costs, quality differences, and which approach gives better results.",
    seoTitle: "Bathroom Suite vs Individual Fixtures: Cost & Value Guide UK | Peterborough",
    seoDescription:
      "Bathroom suite or individual fixtures? Compare costs, quality, and practicality to decide the best approach for your Peterborough bathroom renovation.",
    publishedAt: new Date("2026-07-28"),
    content: `<h2>The Core Question</h2>
<p>When planning a bathroom renovation, one of the first decisions is whether to buy a matched suite — bath, basin, toilet, and sometimes shower tray sold as a coordinated set — or to select each fixture individually from different ranges or manufacturers. Both approaches have genuine advantages, and the right choice depends on your budget, the size of your bathroom, and your priorities.</p>

<h2>What Is a Bathroom Suite?</h2>
<p>A bathroom suite is a matched set of sanitaryware — typically toilet, basin, and bath — designed to look coordinated. Some suites include a shower tray and enclosure. They're sold by bathroom retailers at a combined price that's usually lower than buying the individual pieces separately from the same range.</p>

<h3>Advantages of a Suite</h3>
<ul>
<li><strong>Design coherence:</strong> Guaranteed to look coordinated — same ceramic glaze, same design language, matching tap holes</li>
<li><strong>Easier planning:</strong> One decision instead of five — reduces the risk of mismatched pieces</li>
<li><strong>Better value at entry/mid level:</strong> Entry-level suites from £200–£600 offer significantly better value per piece than buying equivalent quality separately</li>
<li><strong>Availability:</strong> Usually stocked together, reducing lead times and delivery complexity</li>
</ul>

<h3>Disadvantages of a Suite</h3>
<ul>
<li>Compromise on individual pieces — you might love the bath and find the toilet mediocre</li>
<li>Less flexibility on sizes — a suite basin might not fit your vanity unit width</li>
<li>Suite ranges are discontinued — sourcing replacement pieces years later can be impossible</li>
</ul>

<h2>What About Individual Fixtures?</h2>
<p>Selecting a toilet, basin, and bath from different ranges or manufacturers allows you to optimise each piece independently — a soft-close toilet with a rimless pan, a specific basin size that fits your vanity unit, and a freestanding bath from a specialist manufacturer.</p>

<h3>Advantages of Individual Selection</h3>
<ul>
<li>Optimise for what matters in each fixture — quality, size, features, or aesthetics</li>
<li>Freestanding baths and statement basins rarely come in suite packages</li>
<li>Better replacement sourcing — a standalone toilet model may be available for years</li>
<li>More flexibility for non-standard bathroom layouts</li>
</ul>

<h3>Disadvantages of Individual Selection</h3>
<ul>
<li>More expensive — you lose bundle pricing</li>
<li>Harder to guarantee visual coherence — slight glaze or profile differences can look mismatched</li>
<li>More planning effort — tap holes, basin dimensions, wall fixings, and trap types must be coordinated</li>
<li>Multiple delivery orders, potentially different lead times</li>
</ul>

<h2>Cost Comparison for a Typical Peterborough Bathroom</h2>
<p>For a standard family bathroom (toilet, basin, bath, taps, shower over bath):</p>
<ul>
<li><strong>Entry-level suite:</strong> £250–£450 (basin, toilet, bath — taps extra)</li>
<li><strong>Mid-range suite:</strong> £500–£900</li>
<li><strong>Premium suite:</strong> £1,000–£2,500</li>
<li><strong>Individual selection equivalent quality:</strong> Add 20–40% over suite pricing for mid/premium ranges</li>
</ul>
<p>For most standard bathroom renovations, a mid-range suite delivers the best value. Individual selection makes sense for premium bathrooms where specific design choices justify the extra cost.</p>

<h2>What Your Plumber Needs to Know</h2>
<p>Whether you choose a suite or individual pieces, your installer needs specifications in advance:</p>
<ul>
<li>Basin waste type (pop-up, click-clack, slotted/unslotted)</li>
<li>Toilet trap type (P-trap or S-trap) and pan connector size</li>
<li>Bath waste and overflow type</li>
<li>Tap hole diameters and centres</li>
</ul>
<p>Bring your plumber in during the selection phase rather than after — they can flag sizing or installation issues before you order. See our full guide on <a href="/guides/bathroom-installation-cost-peterborough">bathroom installation costs in Peterborough</a> for a complete cost breakdown.</p>

<h2>Plan Your Bathroom Renovation With Us</h2>
<p>Our <a href="/services/bathroom-installations">bathroom installation team</a> works with customer-supplied sanitaryware or can source it for you through our trade accounts. We cover all Peterborough areas. <a href="/contact">Contact us</a> to discuss your project.</p>`,
    status: "Published",
  },

  {
    slug: "plumbing-problems-peterborough-older-homes",
    title: "Common Plumbing Problems in Peterborough's Older Homes (and How to Fix Them)",
    category: "Local Guides",
    excerpt:
      "Many Peterborough homes were built before 1980 with plumbing systems that are now showing their age. Here are the most common issues and what to do about them.",
    seoTitle: "Plumbing Problems in Older Peterborough Homes: Guide & Fixes | Plumbers",
    seoDescription:
      "From lead pipes to galvanised tanks — the most common plumbing problems in older Peterborough homes and what modern solutions exist. Local plumbing guide.",
    publishedAt: new Date("2026-07-31"),
    content: `<h2>Peterborough's Housing Stock: What You're Working With</h2>
<p>Peterborough has a diverse housing stock — 1930s terraces in Millfield and Fletton, 1960s council estates in Dogsthorpe, 1970s semi-detached in Orton, and post-millennium new builds in Hampton and Stanground. Each era came with its own plumbing conventions, materials, and standards — and each era's problems are now showing up in repair callouts.</p>

<h2>Pre-1970 Properties: The Lead and Iron Era</h2>
<h3>Lead Supply Pipes</h3>
<p>Properties built before 1970 — particularly in older Peterborough areas like New England, Millfield, and the city centre — frequently retain lead supply pipes from the street. Lead is a health risk, especially for children and pregnant women. Replacement is recommended rather than optional.</p>
<p>Identifying lead: dull grey colour, soft enough to scratch with a key, characteristic rounded joints. Copper is shiny orange-brown; plastic is white or grey with smooth joints. If you're unsure, a plumber can identify pipe materials visually within minutes.</p>

<h3>Galvanised Steel Tanks and Pipes</h3>
<p>Galvanised (zinc-coated) steel was used for cold water storage tanks and some pipework until the 1960s. The zinc coating eventually fails, causing rust and flaking — leading to discoloured (brown or orange) cold water, reduced flow as the interior corrodes, and eventually tank failure. A rusty cold water tank should be replaced with a modern plastic tank, which won't corrode and is easier to clean and inspect.</p>

<h3>Cast Iron Waste Pipes</h3>
<p>Victorian cast iron soil stacks and waste pipes are actually very durable — many are still in service. But internal corrosion, joint failure, and cracking at fixings are common in properties over 80 years old. Signs of trouble include persistent damp at the stack, peeling paint on the wall behind the soil pipe, and slow drainage. A CCTV camera can inspect the interior without dismantling anything.</p>

<h2>1950s–1970s Properties: The "Improvement Era" Problems</h2>
<h3>Copper with Soldered Lead Joints</h3>
<p>Post-war replumbing often used copper pipes with soldered lead joints (wiped solder). This is different from lead pipes — the copper is fine, but the lead solder at joints can leach into water, particularly in soft water areas or properties that have been empty. Modern push-fit or compression fittings eliminate the issue entirely when joints need replacement.</p>

<h3>Single-Skin Plastic Pipework</h3>
<p>Early plastic pipes (MDPE and early PVC) installed in the 1970s can become brittle and crack — particularly in loft spaces subject to temperature extremes. If you find plastic pipework in a 1970s loft that hasn't been replaced, have it inspected before the next hard frost.</p>

<h3>Indirect Cold Water Systems Without Proper Insulation</h3>
<p>1960s and 1970s homes typically have loft storage tanks that may be under-insulated. Modern building standards require tanks to be insulated on all sides except the base. An uninsulated loft tank is a freeze risk in Peterborough's winter temperatures. Check the insulation jacket — foam or fibreglass wrap — is intact and covers the lid and all pipes exiting the tank.</p>

<h2>1980s–1990s Properties: The CPVC and TRV Era</h2>
<h3>CPVC and Early Plastic Push-Fit Joints</h3>
<p>Early plastic push-fit fittings (1980s) used different clip mechanisms from modern systems. These can fail — particularly on hot water circuits where thermal cycling stresses the joint. If you have old plastic pipework with unusual-looking push-fit fittings, have them checked when any nearby plumbing work is done.</p>

<h3>Thermostatic Radiator Valves: Original vs Modern</h3>
<p>TRVs fitted in the 1980s and 1990s may have seized pins (from being left in one position for years) or cracked bodies. A seized TRV pin causes a radiator to run continuously on full regardless of the thermostat setting. See our guide on <a href="/blog/radiator-making-noise-causes">noisy radiators</a> for diagnosis. Replacing old TRVs is inexpensive and reduces heating bills noticeably.</p>

<h2>How to Prioritise Plumbing Upgrades in an Older Home</h2>
<p>Not every aging component needs replacing immediately. A sensible priority order:</p>
<ol>
<li><strong>Lead pipes:</strong> Health risk — replace first</li>
<li><strong>Corroded/rusty storage tanks:</strong> Water quality and flood risk</li>
<li><strong>Faulty stop taps:</strong> Safety — you need to be able to isolate water in an emergency</li>
<li><strong>Old boiler (over 15 years):</strong> Efficiency and reliability</li>
<li><strong>Aging TRVs and radiator valves:</strong> Comfort and efficiency</li>
<li><strong>Cosmetic pipe replacements:</strong> Lower priority unless causing problems</li>
</ol>

<h2>Get an Older Home Plumbing Assessment in Peterborough</h2>
<p>If you've bought an older Peterborough property or have concerns about aging plumbing, we offer a comprehensive assessment — checking pipe materials, stop tap function, boiler condition, hot water system, and drain health. We cover <a href="/areas/city-centre">city centre</a>, <a href="/areas/orton">Orton</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/werrington">Werrington</a>, and all surrounding areas. <a href="/contact">Book an assessment</a> or call to discuss your property.</p>

<p>Also read: <a href="/blog/victorian-edwardian-plumbing-older-property-peterborough">Victorian & Edwardian plumbing guide</a> | <a href="/services/pre-purchase-plumbing-survey">Pre-purchase plumbing surveys</a></p>`,
    status: "Published",
  },
];

async function main() {
  console.log("Seeding Wave 4 — 10 blog posts (final wave)...\n");

  for (const post of wave4Posts) {
    const { slug, title, category, excerpt, content, seoTitle, seoDescription, status, publishedAt } = post;
    await prisma.blogPost.upsert({
      where: { slug },
      update: {
        title,
        category,
        excerpt,
        content,
        seoTitle,
        seoDescription,
        status,
        publishedAt,
        updatedAt: new Date(),
      },
      create: {
        slug,
        title,
        category,
        excerpt,
        content,
        seoTitle,
        seoDescription,
        status,
        publishedAt,
      },
    });
    console.log(`  ✓ ${title}`);
  }

  console.log("\nWave 4 complete. 10 posts seeded.");
  console.log("All 50 blog posts now seeded across 4 waves.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
