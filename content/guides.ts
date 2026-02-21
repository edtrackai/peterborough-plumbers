export interface Guide {
  name: string;
  slug: string;
  excerpt: string;
  category: "costs" | "diy" | "boilers" | "heating" | "emergencies";
  readTime: number; // minutes
  publishedAt: string;
  content: string; // HTML
}

export const guides: Guide[] = [
  // ── COSTS ──────────────────────────────────────────────────────────────────
  {
    name: "How Much Does a Boiler Service Cost in Peterborough?",
    slug: "how-much-does-a-boiler-service-cost",
    excerpt:
      "Boiler service costs in Peterborough typically range from £79 to £120. Find out exactly what's included, when to book, and how to avoid being overcharged.",
    category: "costs",
    readTime: 4,
    publishedAt: "2025-09-01",
    content: `<h2>Typical Boiler Service Costs in Peterborough</h2>
<p>A standard annual boiler service in Peterborough costs between <strong>£79 and £120</strong> when booked with a Gas Safe registered engineer. The exact price depends on your boiler type, its age, and whether any minor work is needed on the day.</p>
<p>At Peterborough Plumbers, we charge a fixed rate starting from <strong>£79 for a standard combi boiler service</strong> — no hidden call-out fees, no surprises on the invoice.</p>

<h2>What Affects the Price?</h2>
<ul>
<li><strong>Boiler type:</strong> Combi boilers are the most common and quickest to service. System and conventional boilers take slightly longer and may cost a little more.</li>
<li><strong>Boiler age:</strong> Older boilers (10+ years) sometimes require extra time to access components safely.</li>
<li><strong>Additional repairs:</strong> If the engineer identifies a fault — such as a faulty valve or corroded component — repairs are quoted separately before any work is carried out.</li>
<li><strong>Your location:</strong> Engineers serving Peterborough city centre may have slightly different rates to those covering rural Cambridgeshire villages.</li>
</ul>

<h2>What's Included in a Boiler Service?</h2>
<p>A thorough service by a Gas Safe registered engineer covers all safety-critical components:</p>
<ul>
<li>Visual inspection of the boiler, flue, and pipework</li>
<li>Gas pressure and flow rate checks</li>
<li>Combustion analysis and emissions testing</li>
<li>Controls, thermostat, and safety device testing</li>
<li>Burner and heat exchanger cleaning</li>
<li>Condensate and drainage check</li>
<li>Written service record</li>
</ul>

<h2>Is It Worth Getting an Annual Service?</h2>
<p>Yes — for several reasons. A serviced boiler runs up to 10% more efficiently, which cuts your gas bills. Annual servicing is also a requirement of most manufacturer warranties. Most importantly, a boiler service checks for carbon monoxide risks, which can be life-threatening if left undetected.</p>

<h2>How to Book a Boiler Service in Peterborough</h2>
<p>We cover the whole Peterborough area, including Orton, Werrington, Hampton, Bretton, and surrounding villages. Book online or call us directly for a same-week appointment in most cases.</p>`,
  },

  {
    name: "How Much Does a New Boiler Cost in 2025?",
    slug: "how-much-does-a-new-boiler-cost",
    excerpt:
      "New boiler supply and installation costs range from £1,800 to £4,000+ in Peterborough. Compare combi, system, and heat-only options to find the right boiler for your home.",
    category: "costs",
    readTime: 5,
    publishedAt: "2025-09-05",
    content: `<h2>New Boiler Costs in Peterborough (2025)</h2>
<p>A new boiler fully supplied and installed in Peterborough typically costs between <strong>£1,800 and £4,000</strong>, depending on the boiler type, brand, and complexity of the installation. Here's a typical cost breakdown:</p>
<ul>
<li><strong>Budget combi boiler (e.g. Baxi, Ideal):</strong> £1,800 – £2,400 installed</li>
<li><strong>Mid-range combi (e.g. Worcester Bosch, Vaillant):</strong> £2,400 – £3,200 installed</li>
<li><strong>Premium or high-output combi:</strong> £3,000 – £4,000+ installed</li>
<li><strong>System boiler replacement:</strong> £2,500 – £4,500 installed</li>
</ul>

<h2>What's Included in the Installation?</h2>
<p>A proper boiler installation quote from a Gas Safe engineer should include:</p>
<ul>
<li>Removal and disposal of the old boiler</li>
<li>Supply of the new boiler unit</li>
<li>All fittings, pipework modifications, and flue materials</li>
<li>Gas connection and pressure testing</li>
<li>System flush and inhibitor dose</li>
<li>Commissioning and controls setup</li>
<li>Building Regulations notification (Gas Safe certificate)</li>
</ul>

<h2>Which Boiler Brand Should I Choose?</h2>
<p>Worcester Bosch and Vaillant consistently score highest in reliability surveys. Baxi and Ideal offer solid value for budget-conscious homeowners. We install all major brands and can advise on the best fit for your property size and hot water demand.</p>

<h2>Can I Get Finance for a New Boiler?</h2>
<p>Yes — we offer 0% interest finance options on qualifying boiler installations, allowing you to spread the cost over 12 to 48 months. Ask us about current finance offers when you call for a quote.</p>

<h2>How Long Does Installation Take?</h2>
<p>A straightforward like-for-like combi boiler replacement takes one full working day. More complex installations (e.g. changing from a system to a combi, or moving the boiler location) may take two days.</p>`,
  },

  {
    name: "Emergency Plumber Call-Out Cost: What to Expect",
    slug: "emergency-plumber-call-out-cost",
    excerpt:
      "Emergency plumber call-out fees in Peterborough range from £99 to £200. Learn what's included, when you'll pay more, and how to avoid being overcharged in a crisis.",
    category: "costs",
    readTime: 4,
    publishedAt: "2025-09-08",
    content: `<h2>Emergency Plumber Costs in Peterborough</h2>
<p>A genuine emergency plumber call-out in Peterborough typically costs between <strong>£99 and £200</strong> for the call-out itself, with labour charged separately at around <strong>£60–£90 per hour</strong>. Always ask for the total cost (call-out plus first hour's labour) before authorising work.</p>

<h2>What Counts as an Emergency?</h2>
<p>True plumbing emergencies that warrant a same-day or out-of-hours call-out include:</p>
<ul>
<li>Burst pipes with active water damage</li>
<li>Complete loss of heating in winter</li>
<li>Blocked drains causing sewage backup</li>
<li>Gas leak (call National Gas Emergency Service 0800 111 999 first)</li>
<li>No hot water with vulnerable occupants present</li>
<li>Overflowing toilet that cannot be isolated</li>
</ul>

<h2>Why Are Emergency Call-Outs More Expensive?</h2>
<p>Emergency work attracts a premium because engineers must drop everything and respond immediately, often outside standard working hours. Weekend, bank holiday, and out-of-hours rates are typically 25–50% higher than standard daytime rates — which is industry-standard.</p>

<h2>How to Avoid Being Overcharged</h2>
<ul>
<li>Always ask for a clear written or verbal quote before work begins</li>
<li>Confirm whether the call-out fee includes the first hour of labour</li>
<li>Check that the engineer is Gas Safe registered (for any gas or heating work)</li>
<li>Avoid companies that refuse to give a price estimate over the phone</li>
</ul>

<h2>Our Emergency Call-Out Pricing</h2>
<p>We charge a transparent call-out fee from £99, which includes the first 30 minutes of assessment. We explain all costs before starting work — no surprises on the invoice.</p>`,
  },

  {
    name: "Central Heating Power Flush Cost (2025 Guide)",
    slug: "central-heating-power-flush-cost",
    excerpt:
      "Power flush costs in Peterborough range from £299 to £500 depending on the number of radiators. Find out what's included and whether your system needs one.",
    category: "costs",
    readTime: 4,
    publishedAt: "2025-09-10",
    content: `<h2>Power Flush Costs in Peterborough</h2>
<p>A professional power flush in Peterborough typically costs between <strong>£299 and £500</strong>. The price varies based on the number of radiators in your system:</p>
<ul>
<li><strong>Up to 5 radiators:</strong> £299 – £350</li>
<li><strong>6–10 radiators:</strong> £350 – £450</li>
<li><strong>10+ radiators:</strong> £450 – £600</li>
</ul>

<h2>What Is a Power Flush?</h2>
<p>A power flush is a deep-clean of your central heating system. A specialist pump forces water and cleaning chemicals through the system at high pressure to remove sludge, rust, and limescale deposits. These deposits build up over time and reduce efficiency.</p>

<h2>What's Included in a Power Flush?</h2>
<ul>
<li>Connection of power flush machine to the system</li>
<li>Chemical descaler and sludge remover treatment</li>
<li>Individual radiator flushing with manual agitation</li>
<li>System neutralisation and corrosion inhibitor dose</li>
<li>Magnetic filter clean (or installation if not present)</li>
<li>Report on system condition</li>
</ul>

<h2>Does My System Need a Power Flush?</h2>
<p>Signs your system may need a power flush include: cold spots at the bottom of radiators, radiators that take a long time to heat up, discoloured or brown water when bleeding radiators, repeated boiler pressure problems, or a noisy boiler (kettling sound).</p>

<h2>How Long Does It Take?</h2>
<p>A typical power flush takes 4–8 hours depending on system size and the severity of contamination. Most jobs are completed in a single day.</p>`,
  },

  {
    name: "Bathroom Installation Cost in Peterborough (2025)",
    slug: "bathroom-installation-cost-peterborough",
    excerpt:
      "Bathroom installation costs in Peterborough range from £2,500 for a basic re-fit to £7,000+ for a full luxury renovation. Find out what affects the price.",
    category: "costs",
    readTime: 5,
    publishedAt: "2025-09-12",
    content: `<h2>Bathroom Installation Costs in Peterborough</h2>
<p>A complete bathroom installation in Peterborough costs between <strong>£2,500 and £7,000+</strong> depending on the bathroom size, specification of fittings, and whether any structural work is required.</p>

<h2>Typical Cost Breakdown</h2>
<ul>
<li><strong>Basic suite swap (bath, toilet, basin, tiling):</strong> £2,500 – £3,500</li>
<li><strong>Mid-range bathroom renovation:</strong> £3,500 – £5,500</li>
<li><strong>En-suite installation:</strong> £2,000 – £4,500</li>
<li><strong>Wet room conversion:</strong> £3,500 – £6,000</li>
<li><strong>Full luxury bathroom renovation:</strong> £6,000 – £10,000+</li>
</ul>

<h2>What's Included?</h2>
<p>A full bathroom installation typically covers: strip-out and disposal of existing suite, waterproofing (tanking), floor preparation, new suite supply and fit, tiling (labour only, unless agreed otherwise), plumbing connections, and final testing.</p>

<h2>What Affects the Cost?</h2>
<ul>
<li><strong>Size of the bathroom</strong> — more floor and wall area means more tiling and waterproofing</li>
<li><strong>Quality of sanitaryware</strong> — budget vs designer suites vary enormously in price</li>
<li><strong>Tiles</strong> — large format, natural stone, and mosaic tiles cost more to fit</li>
<li><strong>Layout changes</strong> — moving soil pipes, relocating the bath, or adding an en-suite all add cost</li>
<li><strong>Electrics</strong> — extractor fan, heated towel rail, and underfloor heating wiring</li>
</ul>

<h2>How Long Does a Bathroom Installation Take?</h2>
<p>A standard bathroom replacement takes 5–7 working days. Complex renovations with structural changes may take up to two weeks.</p>`,
  },

  {
    name: "How Much Does a Plumber Cost Per Hour in the UK?",
    slug: "plumber-cost-per-hour",
    excerpt:
      "Plumbers in Peterborough charge £50–£90 per hour. Discover what affects labour rates, typical call-out fees, and how to get a fair price.",
    category: "costs",
    readTime: 3,
    publishedAt: "2025-09-15",
    content: `<h2>Plumber Hourly Rates in Peterborough</h2>
<p>Local plumbers in Peterborough typically charge between <strong>£50 and £90 per hour</strong> for standard work. Gas Safe registered engineers — needed for boiler and gas work — tend to sit at the higher end of that range.</p>

<h2>What Else Will I Pay?</h2>
<p>Most plumbers charge a <strong>call-out fee</strong> in addition to their hourly rate. This covers travel time and initial assessment, and typically ranges from £50 to £99. Some engineers include the first 30 minutes of labour in the call-out fee — always confirm this before they arrive.</p>

<h2>Standard vs Emergency Rates</h2>
<p>Out-of-hours (evenings, weekends, bank holidays) emergency call-outs typically cost 25–50% more than standard daytime rates. For non-urgent work, booking during normal weekday hours is always cheaper.</p>

<h2>How to Get a Fair Price</h2>
<ul>
<li>Get at least two or three quotes for larger jobs</li>
<li>Ask whether the quote is fixed-price or time-and-materials</li>
<li>Confirm what's included (parts, disposal, call-out fee)</li>
<li>Check the engineer is Gas Safe registered for any gas work</li>
<li>Be wary of unusually cheap quotes — quality plumbing work has a minimum cost</li>
</ul>`,
  },

  {
    name: "Gas Safety Certificate Cost — What Landlords Need to Know",
    slug: "gas-safety-certificate-cost",
    excerpt:
      "A Gas Safety Certificate (CP12) costs £65–£90 in Peterborough. Landlords must have one issued annually. Here's everything you need to know.",
    category: "costs",
    readTime: 3,
    publishedAt: "2025-09-18",
    content: `<h2>Gas Safety Certificate Costs in Peterborough</h2>
<p>A Gas Safety Certificate (officially a CP12) costs between <strong>£65 and £90</strong> in Peterborough when carried out by a Gas Safe registered engineer. The inspection covers all gas appliances in the property: boiler, gas hobs, gas fires, and any other gas appliances.</p>

<h2>Who Needs a Gas Safety Certificate?</h2>
<p>Gas Safety Certificates are a <strong>legal requirement for all landlords</strong> in England, Scotland, and Wales. You must obtain a new certificate every 12 months and provide a copy to tenants within 28 days of the check, or before they move in if it's a new tenancy.</p>

<h2>What Does the Check Include?</h2>
<ul>
<li>Inspection of all gas appliances (boiler, hobs, fires)</li>
<li>Flue and ventilation checks</li>
<li>Gas pressure and tightness testing</li>
<li>Identification of any immediately dangerous (ID) or at-risk (AR) defects</li>
<li>Issue of a signed CP12 certificate (which you're legally required to keep for two years)</li>
</ul>

<h2>What Happens if a Fault Is Found?</h2>
<p>If the engineer identifies an immediately dangerous fault, they are legally required to disconnect the appliance. You'll receive a written report with any required remedial work before a certificate can be issued.</p>

<h2>Book Your Annual Gas Safety Check</h2>
<p>We carry out CP12 inspections across all Peterborough postcodes, including PE1 through PE7 and surrounding areas. Call us to arrange a certificate — we can often attend within 48 hours.</p>`,
  },

  {
    name: "Radiator Replacement Cost — Supply & Fit Prices 2025",
    slug: "radiator-replacement-cost",
    excerpt:
      "Replacing a radiator in Peterborough costs £150–£400 per unit including supply and fit. Find out what affects the price and when to replace vs repair.",
    category: "costs",
    readTime: 3,
    publishedAt: "2025-10-01",
    content: `<h2>Radiator Replacement Costs in Peterborough</h2>
<p>Supplying and fitting a replacement radiator in Peterborough typically costs <strong>£150 to £400 per radiator</strong> including labour and the new unit. The variation depends on radiator size, type, and accessibility.</p>

<h2>Typical Radiator Prices</h2>
<ul>
<li><strong>Standard single-panel radiator (small):</strong> £150 – £220 fitted</li>
<li><strong>Standard double-panel radiator (medium):</strong> £200 – £300 fitted</li>
<li><strong>Large or designer radiator:</strong> £300 – £500+ fitted</li>
<li><strong>Towel radiator (bathroom):</strong> £180 – £350 fitted</li>
</ul>

<h2>When Should You Replace a Radiator?</h2>
<p>Replace rather than repair when: the radiator has a persistent leak at the body (not just a valve), there are significant rust patches, cold spots can't be resolved by bleeding, or the radiator is more than 15–20 years old. A new radiator is also more efficient if upgrading to a newer type.</p>

<h2>Can I Move a Radiator to a Different Wall?</h2>
<p>Yes, though this adds to the cost as the plumber needs to re-route pipework. Expect to add £100–£200 to the above prices for a simple relocation. Moving a radiator to a completely different room is a larger job — ask for a specific quote.</p>`,
  },

  // ── DIY / HOW-TO ───────────────────────────────────────────────────────────
  {
    name: "How to Bleed a Radiator — Step-by-Step Guide",
    slug: "how-to-bleed-a-radiator",
    excerpt:
      "Bleeding a radiator takes about 5 minutes and can restore heat to cold spots. Follow our step-by-step guide to bleed your radiators safely.",
    category: "diy",
    readTime: 4,
    publishedAt: "2025-09-20",
    content: `<h2>Why Do Radiators Need Bleeding?</h2>
<p>Over time, air builds up inside radiators and prevents them from filling with hot water properly. The result is a cold top section while the bottom stays warm — meaning your boiler is working harder than it needs to. Bleeding releases the trapped air.</p>

<h2>What You'll Need</h2>
<ul>
<li>A radiator bleed key (available from any hardware shop for under £2, or sometimes stored near your boiler)</li>
<li>A cloth or small container to catch water drips</li>
</ul>

<h2>Step-by-Step: How to Bleed a Radiator</h2>
<ol>
<li><strong>Turn the heating on</strong> and let the system reach full temperature. Feel which radiators have cold spots near the top.</li>
<li><strong>Turn the heating off</strong> and let it cool for 20–30 minutes before starting. This prevents scalding.</li>
<li><strong>Locate the bleed valve</strong> — it's the small square fitting at one end of the radiator, usually near the top.</li>
<li><strong>Place a cloth or container</strong> below the valve to catch any water that drips out.</li>
<li><strong>Insert the bleed key</strong> and turn anticlockwise (about a quarter turn). You'll hear a hissing sound — that's the air escaping.</li>
<li><strong>Wait until water appears</strong> — a steady drip or trickle of water means all the air has escaped. Close the valve by turning clockwise. Don't overtighten.</li>
<li><strong>Check your boiler pressure.</strong> Bleeding reduces system pressure. If the pressure gauge drops below 1 bar, top up the system via the filling loop.</li>
</ol>

<h2>How Often Should You Bleed Radiators?</h2>
<p>Once a year — ideally before the heating season starts (October/November) — is usually sufficient. If radiators are consistently cold at the top, or your system is noisy, bleed them more frequently and consider a system inhibitor treatment.</p>

<h2>When to Call a Plumber</h2>
<p>If you bleed the radiators but cold spots return quickly, or if your boiler pressure keeps dropping, there's likely a more underlying issue — such as a system leak or a failing seal. Give us a call and we can diagnose the problem properly.</p>`,
  },

  {
    name: "How to Fix a Dripping Tap — DIY Repair Guide",
    slug: "how-to-fix-a-dripping-tap",
    excerpt:
      "A dripping tap wastes up to 5,500 litres of water a year. Most dripping taps can be fixed in under an hour with basic tools. Here's how.",
    category: "diy",
    readTime: 5,
    publishedAt: "2025-09-22",
    content: `<h2>Why Fix a Dripping Tap Quickly?</h2>
<p>A single dripping tap can waste <strong>5,500 litres of water per year</strong> — adding £30–£50 to your annual water bill. Beyond the cost, limescale build-up from drips can damage your basin and fittings. Most dripping taps are a straightforward DIY fix.</p>

<h2>The Most Common Cause</h2>
<p>In traditional taps (with separate hot and cold handles), the most common culprit is a worn <strong>jumper washer</strong> — a small rubber disc that wears out over time. Replacing it costs pence and takes about 30 minutes.</p>

<h2>What You'll Need</h2>
<ul>
<li>Replacement jumper washers (a pack of assorted sizes from a hardware shop)</li>
<li>An adjustable spanner and flat-head screwdriver</li>
<li>PTFE tape</li>
<li>A cloth to catch water</li>
</ul>

<h2>Step-by-Step: Replacing a Tap Washer</h2>
<ol>
<li><strong>Turn off the water supply</strong> to the tap — either the isolation valve under the basin (turn with a flathead screwdriver) or the main stopcock.</li>
<li><strong>Turn the tap on</strong> to release any remaining pressure and drain the supply pipe.</li>
<li><strong>Remove the tap handle.</strong> Most have a decorative cap on top — prise it off to expose a screw beneath. Remove the screw and lift off the handle.</li>
<li><strong>Undo the packing nut</strong> with your adjustable spanner and lift out the headgear assembly.</li>
<li><strong>Find the washer</strong> at the bottom of the headgear. It may be held by a small screw. Replace with a matching washer.</li>
<li><strong>Reassemble in reverse order</strong> and restore the water supply. Test for drips.</li>
</ol>

<h2>Monobloc and Mixer Taps</h2>
<p>Modern mixer taps use ceramic cartridges rather than rubber washers. When these fail, the entire cartridge must be replaced — they're tap-specific and usually cost £15–£40. If you're unsure of the brand and model, call us and we'll identify the correct part.</p>

<h2>When to Call a Plumber</h2>
<p>Call us if: the leak is from the tap body or base (not the spout), you can't isolate the water supply, the tap is seized, or you have a leak behind the wall. These all require professional attention.</p>`,
  },

  {
    name: "How to Re-pressurise Your Boiler — Step-by-Step",
    slug: "how-to-repressurise-your-boiler",
    excerpt:
      "If your boiler pressure has dropped below 1 bar, you can usually re-pressurise it yourself in under 5 minutes. Here's the safe, step-by-step method.",
    category: "diy",
    readTime: 4,
    publishedAt: "2025-09-25",
    content: `<h2>What Is Boiler Pressure?</h2>
<p>Your boiler maintains a pressurised closed loop of water that circulates through the radiators and back. Normal operating pressure is <strong>1–1.5 bar</strong> when cold, rising to around 2 bar when fully heated. If pressure drops below 1 bar, most modern boilers will lock out and display an error code (commonly F22 on Baxi, A1 on Worcester Bosch).</p>

<h2>Why Does Pressure Drop?</h2>
<p>A small pressure drop after bleeding radiators is normal. Other causes include: a minor system leak (often at a radiator valve), a faulty pressure relief valve, or simply natural pressure loss over time. If pressure drops repeatedly without bleeding, there's likely a leak somewhere in the system — call us for a diagnostic check.</p>

<h2>How to Repressurise Your Boiler</h2>
<p><strong>Step 1:</strong> Turn the boiler off and let it cool completely.</p>
<p><strong>Step 2:</strong> Find the filling loop — a flexible grey or silver hose with small valves at each end, usually located under the boiler.</p>
<p><strong>Step 3:</strong> Open both valves on the filling loop (turn the handles to align with the hose direction). You'll hear water entering the system.</p>
<p><strong>Step 4:</strong> Watch the pressure gauge on the boiler. Stop when it reads <strong>1.0–1.5 bar</strong>.</p>
<p><strong>Step 5:</strong> Close both valves fully. Remove the filling loop if it's a removable type and store it safely.</p>
<p><strong>Step 6:</strong> Switch the boiler back on. The error code should clear. If not, refer to your boiler manual.</p>

<h2>What If the Pressure Keeps Dropping?</h2>
<p>If you need to re-pressurise more than once a month, you have a leak. This could be as simple as a weeping radiator valve or as complex as a faulty heat exchanger. Don't ignore persistent pressure loss — call us for an inspection before the situation worsens.</p>`,
  },

  {
    name: "How to Unblock a Drain — Methods That Actually Work",
    slug: "how-to-unblock-a-drain",
    excerpt:
      "A blocked drain can usually be cleared without calling a plumber. We cover the most effective DIY methods — and when you need professional help.",
    category: "diy",
    readTime: 5,
    publishedAt: "2025-10-05",
    content: `<h2>Types of Blocked Drains</h2>
<p>The right approach depends on where the blockage is. Kitchen drains are typically blocked by grease and food. Bathroom drains most often block with hair and soap scum. Outside drains may be blocked by leaves, sediment, or in older properties, tree root ingress.</p>

<h2>Method 1: Boiling Water (Grease Blockages)</h2>
<p>For kitchen sink blockages caused by grease, carefully pour a full kettle of boiling water directly down the drain. Repeat two or three times. This melts fat deposits and is often enough for a minor blockage. <em>Do not use boiling water in toilets — it can crack the porcelain.</em></p>

<h2>Method 2: Plunger</h2>
<p>Fill the sink or basin with a little water to create suction. Place the plunger over the drain, ensuring a good seal. Push down firmly and pull up sharply — repeat 10–15 times. This works well for partial blockages.</p>

<h2>Method 3: Bicarbonate of Soda and Vinegar</h2>
<p>Pour half a cup of bicarbonate of soda down the drain, followed by half a cup of white vinegar. Let it fizz for 30 minutes, then flush with hot water. This breaks down organic matter effectively and leaves the drain fresh.</p>

<h2>Method 4: Drain Snake / Auger</h2>
<p>For deeper blockages, a drain snake (flexible rod) can reach further than a plunger. Feed it into the drain until you feel resistance, then twist and push to break up the blockage. Available to hire from most tool hire shops.</p>

<h2>Chemical Drain Cleaners</h2>
<p>Caustic soda and other chemical unblockers can be effective but should be used with caution — they can damage older pipework and are harmful to skin and eyes. Always follow the manufacturer's instructions and wear gloves.</p>

<h2>When to Call a Plumber</h2>
<p>Call us if: multiple drains in the property are blocked simultaneously (suggesting a main drain issue), there is sewage backing up, the blockage cannot be cleared after trying the above methods, or you notice foul smells with no visible blockage.</p>`,
  },

  {
    name: "How to Fix a Leaking Radiator Valve",
    slug: "how-to-fix-a-leaking-radiator",
    excerpt:
      "A leaking radiator valve is a common problem. Some drips can be fixed with a simple tighten — others need a valve replacement. Here's how to tell the difference.",
    category: "diy",
    readTime: 4,
    publishedAt: "2025-10-08",
    content: `<h2>Finding the Source of the Leak</h2>
<p>Before you start, identify exactly where the water is coming from. Common leak points on a radiator include: the valve at the base of the radiator (manual or TRV), the union nut joining the radiator to the pipework, or the radiator body itself. Leaks from the radiator body usually mean a replacement is needed.</p>

<h2>Tightening a Dripping Valve</h2>
<p>If water is dripping from the valve gland (the nut just above the valve body), try tightening the gland nut <strong>a quarter turn clockwise</strong> with an adjustable spanner. Don't overtighten — if it still drips after a quarter turn, stop and reassess. Overtightening can damage the valve permanently.</p>

<h2>Replacing Valve Packing</h2>
<p>If the gland nut is already tight but still leaking, the packing inside the valve has worn out. Turn off the water supply to the radiator (close both valves), wrap PTFE tape around the spindle beneath the gland nut, and re-tighten. This often stops the leak without a full valve replacement.</p>

<h2>Replacing a Radiator Valve</h2>
<p>If the valve body is cracked or the leak is at the union fitting, the valve needs replacing. This involves:</p>
<ol>
<li>Isolating the radiator by closing both valves</li>
<li>Draining the radiator into a container</li>
<li>Removing the old valve and replacing with a matching type (manual, TRV, or lockshield)</li>
<li>Reconnecting with fresh PTFE tape and re-pressurising</li>
</ol>
<p>This job is straightforward for a plumber but can be messy if you don't have experience draining radiators. Call us if you'd rather have it done cleanly and correctly.</p>`,
  },

  {
    name: "How to Prevent Frozen Pipes This Winter",
    slug: "how-to-prevent-frozen-pipes",
    excerpt:
      "Frozen pipes can burst and cause thousands of pounds of damage. Follow these steps to protect your plumbing before temperatures drop below zero.",
    category: "diy",
    readTime: 4,
    publishedAt: "2025-10-15",
    content: `<h2>Why Frozen Pipes Are Dangerous</h2>
<p>Water expands as it freezes. In a confined pipe, this creates enormous pressure — enough to split copper and plastic pipework. When the pipe thaws, water floods through the split. A burst pipe can cause significant structural damage and invalidate home insurance if basic precautions weren't taken.</p>

<h2>Pipes Most at Risk</h2>
<p>Pipes most likely to freeze are those in unheated areas: loft spaces, garages, under raised floors, and in external walls. Pipes running on external walls are also at risk, as are outdoor taps and any exposed pipework in outbuildings.</p>

<h2>How to Protect Your Pipes</h2>
<ul>
<li><strong>Insulate exposed pipes</strong> with foam lagging sleeves — available from any DIY shop. Pay particular attention to loft pipes and those in unheated garages.</li>
<li><strong>Keep heating on low</strong> when the property is empty during cold snaps. Setting the thermostat to 10–12°C is sufficient to prevent freezing while keeping energy costs low.</li>
<li><strong>Open loft hatch</strong> on very cold nights to allow warm air from the house to circulate around loft pipes.</li>
<li><strong>Drain outdoor taps</strong> for the winter by closing the isolation valve inside and opening the external tap to release remaining water.</li>
<li><strong>Know where your stopcock is.</strong> In an emergency, you need to turn off the water quickly. Check it turns freely now, before you need it.</li>
</ul>

<h2>What to Do If a Pipe Freezes</h2>
<p>Never use a blowtorch. Apply gentle heat with a hairdryer, working from the tap end of the pipe back towards the source. Open the nearest tap to allow water to flow as it thaws. If you can't locate the frozen section, or if any pipe has already burst, turn off the stopcock immediately and call us.</p>`,
  },

  {
    name: "How to Check If a Plumber Is Gas Safe Registered",
    slug: "how-to-check-plumber-is-gas-safe",
    excerpt:
      "Only Gas Safe registered engineers can legally work on gas appliances in the UK. Here's how to check in under 30 seconds — before you let anyone through your door.",
    category: "diy",
    readTime: 3,
    publishedAt: "2025-10-20",
    content: `<h2>Why This Matters</h2>
<p>It is illegal for any engineer to carry out gas work unless they are registered with the Gas Safe Register — the official body appointed by the Health and Safety Executive. Unregistered gas work is dangerous, invalidates your home insurance, and is a criminal offence for the person carrying it out. Each year, dozens of people in the UK die from carbon monoxide poisoning linked to poorly fitted gas appliances.</p>

<h2>How to Check the Gas Safe Register</h2>
<p><strong>Online:</strong> Visit <a href="https://www.gassaferegister.co.uk" target="_blank" rel="noopener noreferrer">gassaferegister.co.uk</a> and search by the engineer's name, company name, or licence number. The search is free and instant.</p>
<p><strong>By phone:</strong> Call Gas Safe Register on 0800 408 5500.</p>
<p><strong>Check the ID card:</strong> Every Gas Safe registered engineer carries a photo ID card. The back of the card lists the appliances they're registered to work on. Ask to see it before any work begins.</p>

<h2>What to Look for on the ID Card</h2>
<ul>
<li>A unique licence number</li>
<li>The Gas Safe Register logo</li>
<li>An expiry date (cards must be renewed annually)</li>
<li>A list of "appliance categories" — this shows which gas work the engineer is qualified to carry out</li>
</ul>

<h2>Our Registration Details</h2>
<p>Peterborough Plumbers Gas Safe Registration No. {gasSafeNumber}. You can verify this on the Gas Safe Register website at any time. We're happy to show our ID cards before starting any job.</p>`,
  },

  // ── BOILERS ────────────────────────────────────────────────────────────────
  {
    name: "Combi Boiler vs System Boiler — Which Is Right for Your Home?",
    slug: "combi-boiler-vs-system-boiler",
    excerpt:
      "Choosing between a combi and system boiler depends on your home's size, hot water demand, and existing setup. This guide cuts through the jargon.",
    category: "boilers",
    readTime: 5,
    publishedAt: "2025-09-28",
    content: `<h2>What Is a Combi Boiler?</h2>
<p>A combination (combi) boiler heats water on demand directly from the mains — there's no hot water cylinder or cold water tank required. When you turn on a hot tap, the boiler fires and heats the water instantly. Combi boilers are compact, efficient, and ideal for most modern homes.</p>

<h2>What Is a System Boiler?</h2>
<p>A system boiler heats water and stores it in a separate hot water cylinder. Components like the expansion vessel and pump are built into the boiler unit itself, making installation cleaner than older conventional systems. Ideal for larger homes with multiple bathrooms where several people may need hot water simultaneously.</p>

<h2>Combi Boiler: Pros and Cons</h2>
<ul>
<li>✅ No hot water cylinder — saves space</li>
<li>✅ Instant hot water (no waiting for a tank to heat up)</li>
<li>✅ Generally cheaper to install</li>
<li>✅ More efficient — only heats water you use</li>
<li>❌ Flow rate can drop when multiple taps run simultaneously</li>
<li>❌ Not ideal for homes with more than 2 bathrooms in constant use</li>
<li>❌ Relies on good mains water pressure</li>
</ul>

<h2>System Boiler: Pros and Cons</h2>
<ul>
<li>✅ Can supply hot water to multiple outlets simultaneously</li>
<li>✅ Better suited to larger families and homes with multiple bathrooms</li>
<li>✅ Compatible with solar thermal panels</li>
<li>❌ Requires space for a hot water cylinder</li>
<li>❌ You can run out of hot water if the cylinder empties</li>
<li>❌ Slightly more complex installation</li>
</ul>

<h2>Which Is Right for Your Home?</h2>
<p>For most Peterborough homes — typically 2–4 bedrooms with one or two bathrooms — a modern combi boiler is the right choice. If you have three or more bathrooms, a large family, or an existing cylinder setup you want to retain, a system boiler may serve you better. Call us for a free recommendation based on your specific property.</p>`,
  },

  {
    name: "7 Signs Your Boiler Needs Replacing",
    slug: "signs-boiler-needs-replacing",
    excerpt:
      "Most boilers last 10–15 years. These seven warning signs suggest it's time to replace rather than repair — and could save you money in the long run.",
    category: "boilers",
    readTime: 4,
    publishedAt: "2025-10-02",
    content: `<h2>How Long Do Boilers Last?</h2>
<p>A well-maintained boiler should last <strong>10–15 years</strong>. Beyond this, parts become harder to source, efficiency drops significantly, and the cost of repairs begins to outweigh the cost of replacement. Here are the key signs your boiler is past its best.</p>

<h2>1. Your Boiler Is Over 10 Years Old</h2>
<p>Modern condensing boilers are up to 94% efficient. An older boiler might be running at 70–80% efficiency — costing you hundreds of pounds extra in gas bills each year. If yours is over 10 years old, a replacement will likely pay for itself within 5–8 years in energy savings.</p>

<h2>2. Frequent Breakdowns</h2>
<p>If your boiler has needed repair more than once in the past two years, or if you're spending more than £300–£400 a year on repairs, replacement is usually more economical.</p>

<h2>3. Rising Energy Bills With No Change in Usage</h2>
<p>As boilers age, they become less efficient — burning more gas to produce the same amount of heat. If your bills are rising but your usage hasn't changed, your boiler's efficiency may be declining.</p>

<h2>4. Yellow or Orange Flame Instead of Blue</h2>
<p>A healthy boiler produces a clean blue flame. A yellow or orange flame indicates incomplete combustion — potentially producing carbon monoxide. This requires an immediate safety inspection.</p>

<h2>5. Strange Noises — Banging, Whistling, or Kettling</h2>
<p>Banging, kettling (a rumbling sound like a kettle boiling), or whistling can indicate limescale build-up, pump failure, or a heat exchanger problem — often expensive to repair in older boilers.</p>

<h2>6. Frequent Pressure Loss</h2>
<p>If your boiler pressure keeps dropping despite there being no obvious leak, it may indicate a failing heat exchanger or pressure relief valve — which can be costly to replace on an older unit.</p>

<h2>7. Spare Parts Are Discontinued</h2>
<p>Manufacturers stop producing parts for older boiler models. If your engineer can't source parts, replacement is your only option. Ask us to check parts availability for your model.</p>`,
  },

  {
    name: "Boiler Not Working? A Step-by-Step Troubleshooting Guide",
    slug: "boiler-not-working-guide",
    excerpt:
      "Before calling a plumber, check these common boiler issues. Many lockouts and faults can be resolved in minutes without engineer attendance.",
    category: "boilers",
    readTime: 5,
    publishedAt: "2025-10-10",
    content: `<h2>Check These First</h2>
<p>Don't panic — the majority of boiler "faults" are caused by simple issues you can resolve yourself in a few minutes. Work through these checks before calling an engineer.</p>

<h2>1. Check the Boiler Pressure</h2>
<p>Look at the pressure gauge on the front of the boiler. It should read between <strong>1 and 1.5 bar</strong>. Below 1 bar, the boiler will usually lock out with a low-pressure error code. See our guide on re-pressurising your boiler — it's a 5-minute job.</p>

<h2>2. Check the Error Code</h2>
<p>Modern boilers display an error or fault code when they lock out. Common codes include:</p>
<ul>
<li><strong>Worcester Bosch:</strong> A1 = low water pressure, E9 = overheating, H07 = fan fault</li>
<li><strong>Vaillant:</strong> F22 = low pressure, F29 = ignition failure, F75 = pressure sensor</li>
<li><strong>Baxi:</strong> E1 = low pressure, E119 = low water pressure</li>
</ul>
<p>Search the code with your boiler model for the specific meaning.</p>

<h2>3. Try a Boiler Reset</h2>
<p>After fixing the underlying issue (e.g. re-pressurising), most boilers need a manual reset. Hold the reset button for 3–5 seconds. If the boiler fires and runs normally for several minutes before locking out again, call us — there's an underlying fault.</p>

<h2>4. Check the Thermostat and Timer</h2>
<p>Confirm the room thermostat is set above the current room temperature. Check the programmer/timer to ensure the heating is set to "on" — they can accidentally be knocked to "off".</p>

<h2>5. Check for a Frozen Condensate Pipe</h2>
<p>In freezing weather, the condensate pipe (a small plastic pipe that exits the boiler through an external wall) can freeze solid. The fix: pour warm (not boiling) water over the pipe where it exits the wall, then reset the boiler.</p>

<h2>When to Call Us</h2>
<p>Call us immediately if: you suspect a gas leak (smell of gas), there is any visible damage to the boiler, the boiler is making loud banging or crackling sounds, or you cannot resolve the fault after the above steps.</p>`,
  },

  {
    name: "How Long Does a Boiler Service Take?",
    slug: "how-long-does-boiler-service-take",
    excerpt:
      "A standard boiler service takes 30–60 minutes. Find out what the engineer does during the visit and how to prepare.",
    category: "boilers",
    readTime: 3,
    publishedAt: "2025-10-12",
    content: `<h2>How Long to Allow for a Boiler Service</h2>
<p>A thorough annual boiler service typically takes <strong>30 to 60 minutes</strong> for a standard combi boiler. System and conventional boilers take slightly longer — up to 90 minutes — due to additional components.</p>

<h2>What Happens During the Service?</h2>
<p>A Gas Safe engineer will carry out a systematic inspection covering:</p>
<ul>
<li>Visual check of the boiler casing, flue, and pipework</li>
<li>Gas pressure and flow tests</li>
<li>Combustion efficiency analysis using a flue gas analyser</li>
<li>Testing of controls, safety devices, and thermostat</li>
<li>Cleaning of the burner and heat exchanger if accessible</li>
<li>Condensate and drainage check</li>
</ul>
<p>If any issues are found during the service, the engineer will explain them clearly and provide a written quote before carrying out any additional work.</p>

<h2>How to Prepare for Your Service Visit</h2>
<ul>
<li>Ensure the engineer has clear access to the boiler — move any storage from in front of it</li>
<li>Know where your boiler manual is (especially if it's a relatively new boiler)</li>
<li>Note down any issues you've noticed: strange noises, pressure drops, slow heating</li>
<li>Ensure someone over 18 is present for the duration of the visit</li>
</ul>

<h2>How Often Should a Boiler Be Serviced?</h2>
<p>Once per year — ideally before the heating season starts in autumn. Annual servicing maintains your manufacturer's warranty, keeps your boiler running safely, and typically pays for itself through improved efficiency.</p>`,
  },

  {
    name: "Boiler Repair vs Replacement — How to Decide",
    slug: "boiler-replacement-vs-repair",
    excerpt:
      "When your boiler breaks down, repair or replace? Use our simple decision guide to work out which option makes financial sense for your situation.",
    category: "boilers",
    readTime: 4,
    publishedAt: "2025-10-18",
    content: `<h2>The £500 Rule of Thumb</h2>
<p>A commonly used guideline: <strong>multiply the boiler's age by the repair cost</strong>. If the result is over £500, replacement is likely more economical. For example, a 10-year-old boiler needing a £60 repair: 10 × 60 = 600 — probably worth replacing. A 4-year-old boiler needing the same repair: 4 × 60 = 240 — worth repairing.</p>

<h2>When to Repair</h2>
<p>Repair makes sense when:</p>
<ul>
<li>The boiler is under 7–8 years old</li>
<li>The boiler is still under manufacturer's warranty</li>
<li>The repair cost is below £300–£400</li>
<li>This is the first significant breakdown</li>
<li>Parts are still readily available</li>
</ul>

<h2>When to Replace</h2>
<p>Replacement makes sense when:</p>
<ul>
<li>The boiler is 10+ years old</li>
<li>Repair costs exceed £500</li>
<li>You've had two or more breakdowns in the past two years</li>
<li>The efficiency rating is below 90% (costing extra on energy bills)</li>
<li>Parts are discontinued or difficult to source</li>
</ul>

<h2>The Energy Savings Calculation</h2>
<p>Modern A-rated condensing boilers operate at 92–94% efficiency. An older boiler running at 75% efficiency on a £1,200/year gas bill wastes around £240 per year in comparison. A new boiler installation at £2,500 could pay for itself in energy savings within 10 years — before accounting for reduced repair bills.</p>

<h2>Get an Honest Assessment</h2>
<p>Call us for a free assessment. We'll tell you honestly whether repair or replacement makes more sense for your specific boiler and circumstances — without trying to upsell you on a replacement you don't need.</p>`,
  },

  // ── HEATING ────────────────────────────────────────────────────────────────
  {
    name: "Central Heating Not Working? How to Diagnose the Problem",
    slug: "central-heating-not-working",
    excerpt:
      "If your central heating has stopped working, the cause is usually one of a handful of common faults. This guide helps you diagnose the issue before calling a plumber.",
    category: "heating",
    readTime: 5,
    publishedAt: "2025-10-22",
    content: `<h2>Start With the Basics</h2>
<p>Before concluding there's a serious fault, work through this quick checklist:</p>
<ul>
<li>Is the boiler switched on and showing power?</li>
<li>Is the thermostat set above the current room temperature?</li>
<li>Is the heating timer set correctly?</li>
<li>Is the boiler pressure between 1 and 1.5 bar?</li>
</ul>

<h2>All Radiators Cold — Likely Causes</h2>
<p>If no radiators are heating at all, the issue is usually at the boiler or central components:</p>
<ul>
<li><strong>Boiler lockout:</strong> Check the error code display and follow the troubleshooting steps for that code</li>
<li><strong>Frozen condensate pipe:</strong> In very cold weather, the condensate pipe can freeze, shutting the boiler down</li>
<li><strong>Pump failure:</strong> The circulating pump moves hot water through the system. A failed pump means no circulation — a professional repair</li>
<li><strong>Zone valve failure:</strong> Most systems have motorised zone valves for heating and hot water separately. A stuck valve can block flow to the heating circuit</li>
</ul>

<h2>Some Radiators Cold — Likely Causes</h2>
<ul>
<li><strong>Air in the system:</strong> Bleed the cold radiators</li>
<li><strong>Sludge build-up:</strong> Cold spots at the bottom of radiators suggest sludge — a power flush may be needed</li>
<li><strong>TRV (thermostatic radiator valve) stuck:</strong> The pin inside the TRV valve can seize. Try removing the TRV head and lifting the pin manually</li>
<li><strong>Lockshield valve closed:</strong> The lockshield valve (on the return side of the radiator) may have been closed accidentally. Open it gradually</li>
</ul>

<h2>Radiators Hot But House Still Cold</h2>
<p>If radiators are hot to the touch but the house doesn't heat up, the heating output may simply be insufficient for the property size. This could indicate an undersized boiler, poor insulation, or a need for additional radiators. Call us for a heating assessment.</p>`,
  },

  {
    name: "What Is a Power Flush and Does Your System Need One?",
    slug: "what-is-a-power-flush",
    excerpt:
      "A power flush removes sludge and rust from your central heating system. Find out how it works, what it costs, and whether your system needs one.",
    category: "heating",
    readTime: 4,
    publishedAt: "2025-10-25",
    content: `<h2>What Is a Power Flush?</h2>
<p>A power flush is a deep-clean of your central heating system. A specialist machine is connected to the system and forces a high-pressure flow of water mixed with chemical cleaning agents through the pipework and radiators. This dislodges and carries away sludge, rust particles, and limescale that accumulate over time.</p>

<h2>Why Does Heating Systems Accumulate Sludge?</h2>
<p>Over time, small amounts of oxygen enter the system through radiator bleed points and other connections. This oxidises the inside surfaces of steel radiators and cast-iron components, producing rust. The rust mixes with water to form black sludge (magnetite) that settles at the lowest points of the system — typically at the bottom of radiators and in the boiler heat exchanger.</p>

<h2>Signs Your System May Need a Power Flush</h2>
<ul>
<li>Cold spots at the bottom of radiators (sludge settling there)</li>
<li>Radiators taking a long time to heat up</li>
<li>Discoloured or brown water when you bleed radiators</li>
<li>A noisy boiler (kettling, banging)</li>
<li>Boiler losing pressure repeatedly</li>
<li>High heating bills relative to previous years</li>
</ul>

<h2>What Happens During a Power Flush?</h2>
<p>The engineer connects the power flush machine to the system (usually via a radiator valve or the pump). Cleaning chemicals are circulated, then each radiator is isolated and flushed individually. The system is finally neutralised and a corrosion inhibitor added to prevent future build-up. A magnetic filter is also cleaned or installed if not already present.</p>

<h2>Is a Power Flush Worth It?</h2>
<p>For systems showing sludge contamination, yes — a power flush typically improves efficiency by 15–25%, extends boiler life, and is often required by boiler manufacturers as a condition of warranty when fitting a new boiler.</p>`,
  },

  {
    name: "Radiators Not Heating Up Properly — Causes and Fixes",
    slug: "radiators-not-heating-up",
    excerpt:
      "Radiators that are cold at the top, cold at the bottom, or completely cold all have different causes. This guide helps you pinpoint and fix the problem.",
    category: "heating",
    readTime: 5,
    publishedAt: "2025-11-01",
    content: `<h2>Diagnosing Radiator Problems</h2>
<p>The location of the cold area on your radiator tells you a lot about the underlying cause:</p>

<h2>Cold at the Top — Air Trapped in the Radiator</h2>
<p>This is the most common radiator problem and the easiest to fix: bleed the radiator. See our full guide on how to bleed a radiator. After bleeding, check the boiler pressure and top up if it's dropped below 1 bar.</p>

<h2>Cold at the Bottom — Sludge Build-Up</h2>
<p>Black or brown magnetic sludge settles at the bottom of radiators, blocking the circulation of hot water. Bleeding won't fix this — the radiator needs to be removed and flushed, or the whole system may need a power flush. The water that drains when you bleed the radiator will look dark brown or black if sludge is present.</p>

<h2>Completely Cold Radiator</h2>
<p>If an individual radiator is completely cold while others heat normally, check:</p>
<ul>
<li><strong>TRV (thermostatic radiator valve):</strong> Try turning it up. If the head is stuck, remove it and check that the pin underneath moves freely — sometimes it seizes in the closed position.</li>
<li><strong>Lockshield valve:</strong> The valve on the return side may be fully closed. Open it a quarter turn and see if the radiator heats.</li>
<li><strong>Air lock:</strong> Bleed the radiator even if you can't hear air — sometimes the bleed point needs to be opened for water to flow properly.</li>
</ul>

<h2>All Radiators Cold</h2>
<p>If all radiators are cold, the problem is likely with the boiler, circulation pump, or zone valve rather than individual radiators. See our guide on central heating not working for a full diagnostic checklist.</p>`,
  },

  {
    name: "Underfloor Heating Cost — Installation Guide for Peterborough Homes",
    slug: "underfloor-heating-cost",
    excerpt:
      "Underfloor heating installation costs £500–£2,500 per room depending on system type. Electric vs wet systems explained, with full cost breakdown.",
    category: "heating",
    readTime: 5,
    publishedAt: "2025-11-05",
    content: `<h2>Underfloor Heating Installation Costs</h2>
<p>The cost of installing underfloor heating in Peterborough depends significantly on the system type:</p>
<ul>
<li><strong>Electric underfloor heating (mat system):</strong> £500 – £1,200 per room, installed</li>
<li><strong>Wet (water) underfloor heating — screed system:</strong> £1,500 – £2,500 per room</li>
<li><strong>Wet underfloor heating — overlay system (retrofit):</strong> £1,000 – £2,000 per room</li>
</ul>

<h2>Electric vs Wet Underfloor Heating</h2>
<p><strong>Electric underfloor heating</strong> uses a mat of resistance wires laid under tiles or other flooring. It's cheaper to install but more expensive to run — best suited to bathrooms and kitchens where it's used intermittently for comfort rather than as a primary heat source.</p>
<p><strong>Wet underfloor heating</strong> circulates warm water through a network of pipes connected to your boiler. It's more expensive to install but significantly cheaper to run, and works well as a primary heat source for an entire home or extension.</p>

<h2>Is Underfloor Heating Compatible With My Flooring?</h2>
<p>Most flooring types work with underfloor heating. Tiles and stone are the most efficient as they conduct heat well. Engineered wood is suitable. Solid hardwood must be a species rated for UFH use. Thick carpet significantly reduces efficiency and is not recommended.</p>

<h2>How Long Does Installation Take?</h2>
<p>Electric mat installation in a standard bathroom typically takes 1–2 days including floor preparation and tiling. Wet system installation for a full ground floor may take a week or more.</p>`,
  },

  // ── EMERGENCIES ────────────────────────────────────────────────────────────
  {
    name: "What to Do If a Pipe Bursts — Step-by-Step Emergency Guide",
    slug: "what-to-do-burst-pipe",
    excerpt:
      "A burst pipe can cause serious damage within minutes. Follow these steps immediately to limit the damage — then call an emergency plumber.",
    category: "emergencies",
    readTime: 4,
    publishedAt: "2025-10-28",
    content: `<h2>Act Immediately — Every Minute Counts</h2>
<p>A burst pipe can release dozens of litres of water per minute. Fast action limits the damage and reduces the risk of structural damage, electrical hazards, and mould growth. Follow these steps in order.</p>

<h2>Step 1: Turn Off the Water Stopcock</h2>
<p>The mains water stopcock is usually found under the kitchen sink, in a utility room, or in a downstairs toilet. Turn it clockwise until it stops to shut off the mains supply. If you can't find it, call your water company — they can locate it via the external stopcock in the pavement outside your property.</p>
<p><em>Everyone in your household should know where the stopcock is before an emergency occurs.</em></p>

<h2>Step 2: Turn Off the Heating</h2>
<p>Switch your boiler and central heating off to stop hot water circulating near the burst.</p>

<h2>Step 3: Open All Cold Taps</h2>
<p>Open all cold taps in the property to drain the remaining water from the pipes quickly. Flush toilets to clear the cisterns.</p>

<h2>Step 4: Deal With the Immediate Flood</h2>
<ul>
<li>Contain the water with towels and buckets</li>
<li>Move valuables and electronics away from affected areas</li>
<li>Turn off electricity at the consumer unit if water is near any electrical fittings</li>
<li>Take photos of the damage for insurance purposes before cleaning up</li>
</ul>

<h2>Step 5: Call an Emergency Plumber</h2>
<p>Call us immediately. We provide emergency call-outs across Peterborough and can typically arrive within 1–2 hours. While waiting, keep the stopcock closed and continue containing the water.</p>

<h2>Step 6: Contact Your Insurer</h2>
<p>Report the incident to your home insurer as soon as possible. Most policies cover burst pipe damage as an "escape of water" claim. Keep all receipts for any emergency costs.</p>`,
  },
];

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}

export const guideCategories = {
  costs: "Costs & Pricing",
  diy: "DIY Guides",
  boilers: "Boilers",
  heating: "Central Heating",
  emergencies: "Emergencies",
} as const;
