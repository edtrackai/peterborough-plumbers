/**
 * Run: npx tsx prisma/update-services-part2.ts
 * Updates: plumbing-installation, plumbing-repairs, damp-leak-detection,
 *          drain-blockages, pre-purchase-plumbing-survey
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updates = [
  // ── 6. PLUMBING INSTALLATION ──────────────────────────────────────────────
  {
    slug: "plumbing-installation",
    data: {
      heroSubheading:
        "Expert plumbing installations for kitchens, bathrooms, appliances, and new builds. Water Regulations compliant, 12-month guarantee, fully stocked vans across all Peterborough postcodes.",
      shortDescription:
        "Professional plumbing installation for kitchens, bathrooms, appliances, and extensions. Water Regulations compliant, 12-month guarantee, across all Peterborough PE postcodes.",
      seoTitle: "Plumbing Installation Peterborough | Kitchen, Bathroom & New Build",
      seoDescription:
        "Professional plumbing installation in Peterborough. Kitchens, bathrooms, appliances, extensions, and new builds. Water Regulations compliant, 12-month guarantee.",
      content: `<h2>Plumbing Installation Services in Peterborough</h2>
<p>Whether you're fitting a new kitchen, renovating a bathroom, connecting appliances, or building an extension, you need a plumber who installs things correctly from the start. Our experienced plumbing engineers carry out all types of domestic plumbing installations across Peterborough (PE1–PE7) and the surrounding areas — from a single outside tap to complete first and second fix pipework for loft conversions and new builds. Every installation complies with current Water Supply (Water Fittings) Regulations 1999 and is tested before we leave.</p>

<h2>What We Install</h2>
<ul>
<li><strong>Kitchen sinks and taps</strong> — single bowl, Belfast, undermount; including waste connections and overflows</li>
<li><strong>Dishwasher plumbing</strong> — hot and cold connections, waste, and standpipe arrangements</li>
<li><strong>Washing machine plumbing</strong> — including stacking arrangements in utility rooms</li>
<li><strong>American fridge freezers</strong> — ice maker and water dispenser mains connections</li>
<li><strong>Bathroom suites</strong> — bath, shower, basin, and toilet plumbing and waste connections</li>
<li><strong>All shower types</strong> — electric, mixer, thermostatic, digital, power showers, and wetroom drainage</li>
<li><strong>Toilet and cistern replacements</strong> — close-coupled, back-to-wall, and concealed cistern</li>
<li><strong>Unvented hot water cylinders</strong> — G3 qualified installation by our certified engineers</li>
<li><strong>Cold water storage tanks</strong> — loft tank installation and replacement</li>
<li><strong>Outside taps</strong> — frost-resistant with isolating valve</li>
<li><strong>Water softener and filtration systems</strong> — inline softener installation and drinking water filter kits</li>
<li><strong>Mains water upgrades and stopcock replacement</strong></li>
<li><strong>Waste and soil pipe connections</strong></li>
<li><strong>Pipework for extensions, loft conversions, and new builds</strong> — first and second fix</li>
</ul>

<h2>Kitchen Plumbing Installations</h2>
<p>A new kitchen is a significant investment — and the plumbing underpins everything. We work alongside kitchen fitters and joiners to ensure all plumbing is carried out at the right stage, avoiding expensive rework and delays. Whether you're moving the sink position, adding an island with a prep sink, or connecting a full suite of integrated appliances, we'll plan the pipework routes correctly and ensure every connection meets Water Regulations.</p>
<p>Common kitchen plumbing installations in Peterborough homes include:</p>
<ul>
<li>Sink repositioning with extended or rerouted supply and waste</li>
<li>Boiling water taps (Quooker, InSinkErator) — mains connection and under-counter tank fitting</li>
<li>Filtered drinking water tap kits</li>
<li>Waste disposal unit installation</li>
<li>Dishwasher and washing machine connection with correct trap and standpipe arrangements</li>
</ul>

<h2>New Build and Extension Plumbing — First and Second Fix</h2>
<p>Building an extension, converting your loft, or managing a new build in the Peterborough area? We carry out complete first and second fix plumbing installations for residential projects:</p>
<ul>
<li><strong>First fix</strong> — running concealed hot and cold supply pipework, soil and waste pipes, heating flow and return pipework, and underfloor heating manifolds before plastering</li>
<li><strong>Second fix</strong> — connecting all sanitary ware, taps, shower fittings, radiators, and appliances once plastering is complete</li>
</ul>
<p>We work from your architect's plans, coordinate with other trades on site, and produce an as-built record of all concealed pipework routes — useful for future reference and insurance purposes.</p>

<h2>Unvented Hot Water Cylinders</h2>
<p>Unvented hot water cylinders deliver mains-pressure hot water to every tap and shower in your home — eliminating the need for a cold water storage tank in the loft and providing noticeably better shower performance. Our G3-qualified engineers install and commission unvented systems from leading manufacturers including:</p>
<ul>
<li><strong>Megaflo (Heatrae Sadia)</strong> — the UK market leader in unvented cylinders</li>
<li><strong>Telford</strong> — copper cylinders with excellent warranty terms</li>
<li><strong>Gledhill</strong> — twin-coil options for solar integration</li>
<li><strong>Joule</strong> — heat pump ready cylinders</li>
</ul>
<p>G3 Building Regulations require unvented systems to be installed and commissioned by a suitably qualified engineer. Our engineers hold current G3 certification — always ask to see this qualification when getting quotes from any installer.</p>

<h2>Our Installation Standards</h2>
<p>Every installation we carry out meets or exceeds current Water Supply (Water Fittings) Regulations 1999 and, where applicable, Building Regulations. We use quality materials from trusted suppliers — Yorkshire fittings, JG Speedfit, and Wavin Hep2O for plastic pipework. All pipework is neatly run and properly supported — we take pride in work that looks professional, not just work that functions. Every connection is pressure tested before we leave the job.</p>

<h2>Plumbing Installation Pricing — 2026</h2>
<ul>
<li><strong>Outside tap installation</strong> — from £120 supply and fit</li>
<li><strong>Dishwasher or washing machine connection</strong> — from £80</li>
<li><strong>Kitchen sink replacement (like-for-like)</strong> — from £120</li>
<li><strong>Unvented cylinder installation</strong> — from £600 (cylinder not included)</li>
<li><strong>Extension/loft first fix plumbing</strong> — quoted on plans after site visit</li>
</ul>
<p>All prices confirmed in writing before work starts. No hidden fees, no call-out charges. We'll provide an itemised written quote for any job over £200 after an initial assessment.</p>

<h2>Areas We Cover</h2>
<p>We carry out plumbing installations across all Peterborough postcodes and surrounding areas, including <a href="/areas/orton">Orton</a>, <a href="/areas/werrington">Werrington</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/market-deeping">Market Deeping</a>, <a href="/areas/yaxley">Yaxley</a>, <a href="/areas/whittlesey">Whittlesey</a>, and <a href="/areas/stamford">Stamford</a>.</p>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Had a Quooker boiling water tap and new Belfast sink installed in our new kitchen. The plumber worked perfectly alongside our kitchen fitter, everything was connected first time, and the finish is immaculate. Really pleased.&rdquo;</p>
<p><strong>— Emma S., Bretton PE3 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Used Peterborough Plumbers for first and second fix plumbing in our loft conversion. Professional from start to finish — they worked to our architect's plans, coordinated with the builder, and left a written record of all the pipe routes. Thoroughly recommended.&rdquo;</p>
<p><strong>— Gary H., Werrington PE4 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Installations?</h2>
<ul>
<li><strong>30+ years of installation experience</strong> across Peterborough homes and new builds</li>
<li><strong>Water Regulations compliant</strong> — all work meets current Water Fittings Regulations 1999</li>
<li><strong>G3-qualified engineers</strong> for unvented cylinder installations</li>
<li><strong>Every connection pressure tested</strong> before we leave the job</li>
<li><strong>Quality materials</strong> from trusted suppliers — no cheap fittings</li>
<li><strong>12-month workmanship guarantee</strong> on all installations</li>
<li><strong>Happy to work alongside kitchen fitters, builders, and other trades</strong></li>
<li><strong>4.6-star Google rating</strong> from over 120 verified Peterborough reviews</li>
</ul>`,
      faqs: [
        { q: "Can you install a dishwasher or washing machine?", a: "Yes. We install all domestic appliances requiring plumbing connections, including dishwashers, washing machines, fridge freezers with ice dispensers, and waste disposal units. If your existing pipework doesn't have the right connections or valves, we'll modify or extend it to suit. We can also set up stacking arrangements and utility room configurations." },
        { q: "Do you need to notify Building Control for plumbing work?", a: "Most plumbing installations don't require Building Regulations notification. However, installing an unvented hot water cylinder (G3) requires a Building Regulations notification, and any structural work affecting drainage may need approval. We handle all relevant compliance and will advise clearly during our assessment." },
        { q: "What is an unvented hot water cylinder and do I need one?", a: "An unvented cylinder stores hot water at mains pressure — meaning you get much better hot water flow and shower performance compared to a traditional gravity-fed system with a loft tank. It's a popular upgrade in Peterborough homes where shower pressure has always been poor. Our G3-qualified engineers install and commission unvented systems to full Building Regulations standards." },
        { q: "Do you install outside taps?", a: "Yes — outside tap installation is one of our most popular jobs. We fit frost-resistant taps with an inline isolating valve so you can shut off the outside supply in winter to prevent freezing. The installation typically takes around an hour. We position the tap on the most convenient external wall and route the supply pipework internally." },
        { q: "Can you do the plumbing for a house extension or loft conversion?", a: "Yes. We carry out first and second fix plumbing for residential extensions, loft conversions, and new builds in Peterborough. First fix involves running all concealed pipework before plastering. Second fix connects all the fittings and appliances after plastering. We work from your architect's plans and coordinate with the main contractor and other trades on site." },
        { q: "Is there a guarantee on installation work?", a: "Yes — all our installation work comes with a 12-month workmanship guarantee as standard. Manufacturer warranties on products we supply are separate and typically run for 5–25 years depending on the product. If we've installed an unvented cylinder, the G3 commissioning certificate is also provided as documentation." },
      ],
    },
  },

  // ── 7. PLUMBING REPAIRS ───────────────────────────────────────────────────
  {
    slug: "plumbing-repairs",
    data: {
      heroSubheading:
        "Fast, affordable plumbing repairs across Peterborough. Leaking taps, burst pipes, faulty toilets, and more — most repairs fixed on the first visit. 12-month guarantee on all work.",
      shortDescription:
        "Fast plumbing repairs for leaks, dripping taps, burst pipes, faulty toilets, and pressure problems. Most repairs fixed first visit. 12-month guarantee across all Peterborough PE postcodes.",
      seoTitle: "Plumbing Repairs Peterborough | Fast, Reliable & Affordable",
      seoDescription:
        "Fast plumbing repairs in Peterborough — leaking taps, burst pipes, toilets, and more. Most repairs fixed on the first visit. Transparent pricing, 12-month guarantee.",
      content: `<h2>Plumbing Repairs in Peterborough — Fast, Honest, and Affordable</h2>
<p>A dripping tap might seem trivial, but left unrepaired it wastes up to 5,500 litres of water a year — money flowing straight down the drain. A slow leak behind a wall causes mould, damp, and structural damage long before you notice it. Whatever the issue, our experienced plumbers diagnose and fix plumbing problems across all Peterborough postcodes (PE1–PE7) quickly and affordably. Our vans carry an extensive stock of common parts, and the vast majority of repairs are completed on the first visit — no waiting around for parts, no return trips, no unnecessary labour charges.</p>

<h2>Repairs We Handle Every Day</h2>
<ul>
<li><strong>Dripping and leaking taps</strong> — kitchen, bathroom, utility, and outside. Washer replacement, ceramic cartridge replacement, or full tap replacement</li>
<li><strong>Running toilet cisterns</strong> — fill valve, float valve, flapper, or siphon replacement</li>
<li><strong>Toilet base leaks</strong> — pan connector replacement or failed toilet seal</li>
<li><strong>Weak or double flush</strong> — flush valve or siphon repair</li>
<li><strong>Burst and leaking pipes</strong> — copper, plastic (Speedfit, Hep2O), lead, and iron pipework</li>
<li><strong>Radiator leaks</strong> — radiator valve, bleed valve, or tail fitting leaks</li>
<li><strong>Shower pump failure</strong> — pump replacement on gravity-fed systems</li>
<li><strong>Thermostatic shower valve repair</strong> — cartridge or diverter replacement</li>
<li><strong>Overflow pipe running constantly</strong> — ball valve or float arm adjustment and replacement</li>
<li><strong>Leaking waste pipes</strong> — under sinks, baths, or showers</li>
<li><strong>Immersion heater replacement</strong> — element or thermostat swap</li>
<li><strong>Stopcock replacement</strong> — seized, leaking, or faulty isolation valves</li>
<li><strong>Water pressure problems</strong> — diagnosing and resolving low or variable pressure</li>
<li><strong>Pipework repairs following freeze damage</strong></li>
<li><strong>Ball valve repairs in cold water storage tanks</strong></li>
</ul>

<h2>How We Diagnose and Fix Plumbing Problems</h2>
<p>We keep the process simple and transparent — no drama, no guesswork:</p>
<ol>
<li><strong>Book a convenient time</strong> — <a href="/contact">online</a> or by phone. Same-week appointments typically available across all PE postcodes</li>
<li><strong>Diagnosis</strong> — our plumber inspects the problem carefully and explains exactly what's causing it in plain English. No jargon, no scare tactics</li>
<li><strong>Written quote before we start</strong> — you know exactly what it will cost before we pick up a tool. We never start work without your approval</li>
<li><strong>Repair completed</strong> — most repairs take between 30 minutes and 2 hours. We carry out a full check of the fix, clean up the area, and test before we leave</li>
<li><strong>12-month guarantee</strong> — all our repair work is covered by our standard workmanship guarantee</li>
</ol>

<h2>Common Plumbing Problems — What They Mean and What to Do</h2>
<p>Not sure what's wrong? Here's a quick guide to common symptoms:</p>
<ul>
<li><strong>Dripping tap after turning off</strong> — worn washer (older taps) or damaged ceramic cartridge (modern taps). A straightforward repair that stops wasting water and money</li>
<li><strong>Toilet that won't stop running</strong> — faulty fill valve, worn flapper, or a float valve set too high. A running toilet can waste up to 400 litres a day — significant on a metered supply</li>
<li><strong>Low water pressure at taps and showers</strong> — could be a partially closed stopcock, a blocked aerator, scale build-up in the valve, or a supply issue from the mains. We'll identify the cause precisely</li>
<li><strong>Banging or hammering pipes</strong> — water hammer caused by fast-closing valves or loose pipework. Usually resolved by fitting a water hammer arrestor or re-securing the pipework</li>
<li><strong>Damp patch on a ceiling or wall</strong> — almost certainly a slow leak in the pipework above or behind. The sooner it's found and fixed, the less damage results. For hidden leaks behind surfaces, see our <a href="/services/damp-leak-detection">leak detection service</a></li>
<li><strong>Overflow pipe dripping outside</strong> — the ballcock or float valve in the cold water tank or toilet cistern is stuck or needs adjustment. Easy to fix, important not to ignore</li>
</ul>

<h2>Repair vs Replace — Honest Advice</h2>
<p>Not every repair is worth making. If a tap is old, corroded, and the internal components are no longer available, replacing it may be more cost-effective than repeated repairs. If a boiler is over 15 years old and breaking down regularly, the honest advice is often to consider replacement rather than spending money on parts that will fail again.</p>
<p>We'll always give you a straight assessment of whether repair or replacement makes more sense for your specific situation — and we'll never recommend unnecessary work just to increase the invoice.</p>

<h2>First-Visit Fix Rate</h2>
<p>Our engineers' vans carry an extensive stock of the most commonly needed repair parts:</p>
<ul>
<li>Tap washers and ceramic cartridges (all common sizes)</li>
<li>Toilet fill valves, flappers, and flush valves</li>
<li>Radiator valves and TRV heads</li>
<li>Pipe fittings — push-fit, compression, and solder ring (copper and plastic)</li>
<li>Flexible connectors and isolating valves</li>
<li>PTFE tape, jointing compound, and silicone sealant</li>
<li>Overflow valves and float arms</li>
</ul>
<p>Over 90% of routine plumbing repairs are completed on the first visit. For unusual or specialist parts, we'll order them and return as quickly as possible — usually the next working day.</p>

<h2>Plumbing Repair Pricing — 2026</h2>
<ul>
<li><strong>Dripping tap repair (washer/cartridge)</strong> — from £60</li>
<li><strong>Running toilet repair (fill valve/flapper)</strong> — from £70</li>
<li><strong>Radiator valve replacement</strong> — from £80</li>
<li><strong>Burst pipe repair (accessible)</strong> — from £100</li>
<li><strong>Stopcock replacement</strong> — from £120</li>
</ul>
<p>All prices include labour. Parts used are charged at cost price. No hidden call-out fees. Every repair comes with our 12-month workmanship guarantee as standard.</p>

<h2>Areas We Cover for Plumbing Repairs</h2>
<p>We carry out plumbing repairs across all Peterborough postcodes and surrounding areas:</p>
<ul>
<li>Peterborough city centre (PE1) — same-day slots often available</li>
<li><a href="/areas/orton">Orton (PE2)</a>, <a href="/areas/bretton">Bretton (PE3)</a>, <a href="/areas/werrington">Werrington (PE4)</a></li>
<li><a href="/areas/hampton">Hampton (PE7)</a>, <a href="/areas/yaxley">Yaxley (PE7)</a>, <a href="/areas/whittlesey">Whittlesey</a></li>
<li><a href="/areas/market-deeping">Market Deeping (PE6)</a>, <a href="/areas/stamford">Stamford (PE9)</a></li>
<li>Eye, Thorney, Sawtry, Ramsey, and surrounding villages</li>
</ul>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Had a dripping kitchen tap that I'd been ignoring for months. Engineer arrived on time, diagnosed it immediately, and had it fixed in 30 minutes. Fair price, friendly service. Will definitely use again.&rdquo;</p>
<p><strong>— Sandra M., Peterborough PE1 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Woke up to find a leak under the kitchen sink. Called at 8am and they had someone with me by 11am. Pipe replaced, area cleaned up, and all done within an hour. Really impressed with the speed and the price.&rdquo;</p>
<p><strong>— Tony B., Orton PE2 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Repairs?</h2>
<ul>
<li><strong>30+ years fixing Peterborough plumbing problems</strong> — thousands of repairs completed</li>
<li><strong>Most repairs completed on the first visit</strong> — fully stocked vans</li>
<li><strong>Transparent pricing</strong> — quoted before we start, no hidden fees</li>
<li><strong>Honest advice</strong> — we tell you whether to repair or replace, without upselling</li>
<li><strong>12-month workmanship guarantee</strong> on all repairs</li>
<li><strong>Clean, tidy work</strong> — we always leave your home as we found it</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified reviews</li>
</ul>`,
      faqs: [
        { q: "How much does a plumbing repair cost in Peterborough?", a: "Costs vary depending on the fault. A dripping tap repair starts from £60, a running toilet from £70, and more involved jobs like pipe replacement or stopcock fitting from £100–£150. We always provide a clear written quote before starting — no hidden call-out charges. Parts are charged at cost price." },
        { q: "Can you fix my leaking tap?", a: "Yes — leaking taps are our most common repair. In most cases we fix the issue within 30–45 minutes by replacing the washer or ceramic cartridge. If the tap body itself is damaged or the cartridge is no longer available, we'll recommend and fit a cost-effective replacement. We carry a wide range of cartridges in the van." },
        { q: "My toilet keeps running — is it serious?", a: "A constantly running toilet wastes up to 400 litres of water a day, which is very significant on a metered supply. It's usually caused by a worn fill valve, flapper, or float valve set too high — all quick and affordable fixes. We'd always recommend getting it sorted promptly rather than accepting the ongoing water waste." },
        { q: "Can you fix the problem on the first visit?", a: "In over 90% of cases, yes. Our vans carry an extensive range of common parts including tap cartridges, washers, fill valves, flappers, radiator valves, pipe fittings, and flexible connectors. Only highly specialist or unusual parts occasionally require a follow-up visit, and we'll order them and return as quickly as possible." },
        { q: "Do you repair lead pipes?", a: "We can carry out emergency repairs to lead pipework to stop leaks, but we strongly recommend replacing lead pipes with modern copper or plastic (Speedfit/Hep2O) as a priority. Lead in the water supply is a known health risk, and lead pipes in older Peterborough properties are a common finding. We'll advise on the most cost-effective replacement approach for your property." },
        { q: "Do you offer a guarantee on repair work?", a: "Yes — all our repair work comes with a 12-month workmanship guarantee as standard. If the same fault reoccurs within 12 months due to our workmanship, we'll return and fix it at no charge. Parts we supply carry their own manufacturer guarantee separately." },
        { q: "My water pressure is very low — what's causing it?", a: "Low water pressure can have several causes: a partially closed stopcock (check it's fully open), a blocked or scaled aerator on taps or shower heads (unscrew and clean), a faulty pressure reducing valve, scale build-up within pipes, or a supply issue from the mains. We'll methodically diagnose the exact cause and fix it — or advise you to contact your water provider if it's a mains supply problem." },
      ],
    },
  },

  // ── 8. DAMP & LEAK DETECTION ──────────────────────────────────────────────
  {
    slug: "damp-leak-detection",
    data: {
      heroSubheading:
        "Pinpoint hidden leaks and damp without unnecessary damage. Thermal imaging, acoustic detection, and moisture mapping. Insurance-ready reports across all Peterborough postcodes.",
      shortDescription:
        "Advanced non-invasive leak detection and damp investigation — thermal imaging, acoustic equipment, and moisture mapping. Detailed reports for insurance claims across Peterborough.",
      seoTitle: "Damp & Leak Detection Peterborough | Thermal Imaging & Non-Invasive",
      seoDescription:
        "Non-invasive damp and leak detection in Peterborough. Thermal imaging, acoustic detection, moisture mapping. Same-visit repair. Insurance reports provided.",
      content: `<h2>Damp &amp; Leak Detection in Peterborough</h2>
<p>A hidden leak behind a wall or under a floor can cause thousands of pounds of damage before you see a single external sign. By the time a damp patch appears on your ceiling or mould starts growing in the corner of a room, the water may have been running for weeks. Our specialist leak detection service uses advanced, non-invasive professional equipment to pinpoint the exact source of water ingress — without ripping up floors or pulling down walls. Once we've found the leak, we can usually carry out the repair on the same visit.</p>
<p>We cover all Peterborough postcodes (PE1–PE7) and serve homeowners, landlords, letting agents, and property management companies across the Peterborough area.</p>

<h2>Our Detection Equipment and Methods</h2>
<p>We use a combination of professional detection techniques, choosing the right tool for each situation:</p>
<ul>
<li><strong>Thermal imaging cameras (FLIR)</strong> — detect temperature differences caused by evaporating moisture behind walls, under floors, and in ceilings. Particularly effective for underfloor heating leaks and pipe leaks within solid walls</li>
<li><strong>Acoustic listening devices</strong> — amplify the sound of pressurised water escaping from pipes through concrete, timber, screed, and masonry. Can locate a pinhole leak under a concrete slab to within centimetres</li>
<li><strong>Moisture meters and mapping</strong> — systematic moisture readings across walls and floors to map the full extent of damp and trace it back to its source</li>
<li><strong>Tracer gas detection (hydrogen/nitrogen)</strong> — a safe, non-toxic gas mixture is introduced into the pipework under pressure and detected at the surface above the leak point. Highly accurate for buried and concealed pipes</li>
<li><strong>Fluorescent dye testing</strong> — dye traces the flow path of water through waste pipes, drains, and appliance connections to identify the exact source</li>
<li><strong>Pressure testing</strong> — isolates sections of pipework and monitors for pressure drops over time to confirm the presence and location of a leak</li>
<li><strong>Borescope inspection</strong> — a miniature camera fed through small access points to visually inspect inside cavities and wall voids without large-scale opening up</li>
</ul>

<h2>Warning Signs of a Hidden Leak</h2>
<p>These are the most common signs that suggest hidden water damage in your property — don't ignore them:</p>
<ul>
<li>Damp patches appearing on walls, ceilings, or floors with no obvious external cause</li>
<li>Mould or mildew growing in corners, behind furniture, or on external walls</li>
<li>A persistent musty or earthy smell in one area of the house</li>
<li>Water bills that have increased without any change in usage — a leak of just 1 litre per minute adds over £500 to an annual metered water bill</li>
<li>Loss of water pressure or reduced flow at taps and showers</li>
<li>The sound of running water when all taps, appliances, and toilets are turned off</li>
<li>Warm or hot spots on floors (potential underfloor heating pipe failure)</li>
<li>Lifting, bubbling, or buckling of floor tiles or engineered flooring</li>
<li>Peeling paint or wallpaper, particularly if the wall isn't on an external face</li>
<li>A water meter that continues to turn when all outlets are closed</li>
</ul>

<h2>Why Professional Detection Saves Money</h2>
<p>The instinctive response to a suspected leak is to start opening up — pulling up floorboards, chipping away plaster. Without the right equipment, this approach typically causes more damage than the leak itself, and there's no guarantee you'll even find it. A leak in a pressurised pipe under a concrete floor can migrate several metres from its source before appearing at the surface — meaning you could destroy a large area of flooring without getting close to the problem.</p>
<p>Our non-invasive methods pinpoint the exact leak location, meaning any access required for repair is minimal, targeted, and as small as possible. The investigation cost is almost always recovered many times over in avoided unnecessary damage.</p>

<h2>Insurance Claims — Detailed Professional Reports</h2>
<p>Many home insurance policies cover escape of water — but insurers typically require evidence that the source of the damage has been professionally identified before they'll process a claim. We provide a detailed written report covering:</p>
<ul>
<li>Description of survey methodology and equipment used</li>
<li>Thermal imaging photographs with annotations</li>
<li>Moisture meter readings with reference mapping</li>
<li>Confirmed location of the leak or moisture source</li>
<li>Estimated extent of damage to building fabric</li>
<li>Recommended remedial works with estimated costs</li>
</ul>
<p>Our reports are accepted by all major UK insurers and can be submitted directly by you or your loss adjuster.</p>

<h2>Types of Damp — Not All Damp Is a Leak</h2>
<p>Our investigation covers all causes of damp, not just plumbing leaks — because the wrong diagnosis leads to the wrong treatment:</p>
<ul>
<li><strong>Plumbing leak</strong> — a pipe, joint, or fitting failure within the building fabric causing localised or spreading damp. Our primary area of investigation</li>
<li><strong>Rising damp</strong> — groundwater rising through the base of walls due to a failed or absent damp-proof course. More common in older Peterborough properties pre-1950</li>
<li><strong>Penetrating damp</strong> — rainwater entering through external walls, roof, chimney flashings, or failed window seals</li>
<li><strong>Condensation damp</strong> — moisture from breathing, cooking, showering, and drying clothes that isn't adequately ventilated. The most common cause of mould in modern well-insulated homes</li>
</ul>
<p>Correctly identifying the type of damp is essential — treating rising damp with a plumbing repair, or a plumbing leak with a tanking treatment, wastes money and allows the real problem to continue.</p>

<h2>Find and Fix in a Single Visit</h2>
<p>Once we've pinpointed the leak, we can usually carry out the <a href="/services/plumbing-repairs">repair</a> immediately on the same visit — saving you the cost and disruption of booking a separate plumbing appointment. Whether it's a failed pipe joint, a corroded section of copper, a failed compression fitting, or a cracked underfloor heating pipe, our engineers carry the tools and materials to fix most leaks on the spot.</p>

<h2>Areas We Cover for Leak Detection</h2>
<p>We carry out leak detection surveys across all Peterborough postcodes and surrounding areas:</p>
<ul>
<li>Peterborough city centre (PE1)</li>
<li><a href="/areas/orton">Orton (PE2)</a>, <a href="/areas/bretton">Bretton (PE3)</a>, <a href="/areas/werrington">Werrington (PE4)</a></li>
<li><a href="/areas/hampton">Hampton (PE7)</a>, <a href="/areas/yaxley">Yaxley (PE7)</a></li>
<li><a href="/areas/market-deeping">Market Deeping (PE6)</a>, <a href="/areas/stamford">Stamford (PE9)</a>, <a href="/areas/whittlesey">Whittlesey</a></li>
</ul>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Water stain appeared on my ceiling with no obvious cause. The engineer found the source using thermal imaging within 20 minutes — a pinhole in a pipe inside the wall above. Repaired on the same visit and a detailed report provided for my insurance. Exceptional service.&rdquo;</p>
<p><strong>— Michelle T., Peterborough PE1 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Suspected an underfloor heating leak. The team used acoustic equipment to pinpoint it to within a small section of floor — only a tiny area needed opening up. Saved me from ripping up the whole floor. Couldn't recommend more highly.&rdquo;</p>
<p><strong>— Ian F., Hampton PE7 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Leak Detection?</h2>
<ul>
<li><strong>FLIR thermal imaging and acoustic detection equipment</strong> — professional-grade tools, not consumer moisture meters</li>
<li><strong>Non-invasive methods</strong> — minimal disruption, targeted access only where needed</li>
<li><strong>Find and fix in a single visit</strong> — most leaks repaired immediately on location</li>
<li><strong>Detailed insurance-ready reports</strong> — accepted by all major UK insurers</li>
<li><strong>All types of damp investigated</strong> — not just plumbing leaks</li>
<li><strong>30+ years of Peterborough plumbing experience</strong></li>
<li><strong>12-month guarantee</strong> on all repair work</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified reviews</li>
</ul>`,
      faqs: [
        { q: "How do you detect a hidden leak without damaging my property?", a: "We use a combination of FLIR thermal imaging cameras (which detect temperature changes caused by moisture), acoustic listening devices (which amplify the sound of pressurised water escaping from pipes), and moisture meters. Together these methods can locate a hidden leak to within centimetres — without opening up walls or floors. Where a small access point is needed for the repair, we keep it as small as possible." },
        { q: "What are the signs of a hidden leak?", a: "Key warning signs include: unexplained damp patches on walls or ceilings, mould growing in corners or behind furniture, a musty smell in one room, water bills increasing without a change in usage, loss of water pressure, the sound of running water with all outlets off, warm spots on floors (underfloor heating), lifting or bubbling floor tiles, and a water meter that won't stop turning when all outlets are closed." },
        { q: "Can you detect leaks under concrete floors?", a: "Yes. Acoustic listening equipment is specifically designed to locate pressurised pipe leaks through solid concrete, screed, and masonry — and can pinpoint the location to within centimetres. We also use tracer gas (a safe hydrogen/nitrogen mixture) introduced into the pipework, which rises to the surface directly above the leak point. This is particularly effective for underfloor heating leaks." },
        { q: "Can you repair the leak once it's found?", a: "Yes — in most cases we carry out the repair on the same visit, immediately after locating the leak. This saves the cost and disruption of a second booking. For more complex repairs (e.g. extensive underfloor heating pipework replacement or a leak deep within a concrete slab), we'll provide a clear written quote and schedule the work as promptly as possible." },
        { q: "Will your report support an insurance claim?", a: "Yes. We provide a detailed written report including thermal imaging photographs, moisture meter readings, a confirmed leak location, and estimated repair costs. This format is accepted by all major UK home insurers as evidence for an escape-of-water claim. Your loss adjuster can contact us directly if they need additional information." },
        { q: "Is my damp a plumbing leak or something else?", a: "Not all damp is caused by plumbing. Rising damp, penetrating damp (rainwater entering through external walls or roof), and condensation all produce similar visible signs but have completely different causes and solutions. Our investigation covers all possible sources — we don't just assume it's a plumbing problem. Correct identification is essential to avoid wasting money on the wrong treatment." },
        { q: "How much does a leak detection survey cost?", a: "Our leak detection survey cost depends on the size of the property and complexity of the investigation. We'll confirm pricing when you call or book online. If we locate the leak and carry out the repair on the same visit, the repair cost is quoted separately and approved by you before we proceed." },
      ],
    },
  },

  // ── 9. DRAIN BLOCKAGES ────────────────────────────────────────────────────
  {
    slug: "drain-blockages",
    data: {
      heroSubheading:
        "Professional drain unblocking and clearance 7 days a week across Peterborough. High-pressure jetting, CCTV surveys, and drain repairs. Most blockages cleared on the first visit.",
      shortDescription:
        "Professional drain unblocking and clearance 7 days a week. High-pressure jetting, CCTV surveys, and drain repairs — most blockages cleared first visit across all Peterborough PE postcodes.",
      seoTitle: "Drain Unblocking Peterborough | Same-Day Clearance | 7 Days a Week",
      seoDescription:
        "Professional drain unblocking in Peterborough. Blocked sinks, toilets, outside drains. High-pressure jetting and CCTV surveys. Available 7 days a week.",
      content: `<h2>Drain Unblocking &amp; Clearance in Peterborough</h2>
<p>A blocked drain is more than an inconvenience — it's a health hazard. Sewage backflow, foul odours, and overflowing wastewater can make a Peterborough home or business uninhabitable until the problem is resolved. Our professional drain clearance team operates 7 days a week across all Peterborough postcodes (PE1–PE7), using high-pressure water jetting, electro-mechanical equipment, and CCTV cameras to get your drains flowing freely — typically on the first visit.</p>

<h2>Drain Services We Provide</h2>
<ul>
<li><strong>Blocked kitchen sink clearance</strong> — grease, fat, food waste, and soap build-up</li>
<li><strong>Blocked toilet unblocking</strong> — paper, wipes, and foreign object blockages</li>
<li><strong>Blocked bath and shower waste clearance</strong> — hair and soap scum build-up</li>
<li><strong>Outside drain and manhole clearance</strong></li>
<li><strong>High-pressure water jetting</strong> — 3,500 PSI jetting for thorough pipe cleaning</li>
<li><strong>CCTV drain surveys</strong> — high-resolution camera inspection with recorded footage and written report</li>
<li><strong>Tree root removal</strong> from drain lines using electro-mechanical cutting heads</li>
<li><strong>Drain relining (no-dig repair)</strong> — cured-in-place pipe lining for structural repairs without excavation</li>
<li><strong>Drain patch repairs</strong> — for localised cracks or displaced joints</li>
<li><strong>Excavation and drain replacement</strong> — for severely collapsed sections</li>
<li><strong>Gutter and downpipe clearance</strong></li>
<li><strong>Soakaway assessment and clearance</strong></li>
<li><strong>Commercial kitchen grease trap cleaning</strong></li>
</ul>

<h2>How We Unblock Drains</h2>
<p>We use the most appropriate method for each situation:</p>
<ul>
<li><strong>Mechanical rodding</strong> — flexible rods break through soft blockages in straight drain runs. Fast and effective for most domestic blockages within a few metres of the access point</li>
<li><strong>High-pressure water jetting (3,500 PSI)</strong> — a powerful jet of water scours the full bore of the pipe, removing grease, sludge, scale, and soft root ingress. This is the most thorough method — it doesn't just clear the blockage, it cleans the pipe. We use this for recurring blockages, grease-laden kitchen drains, and all outside drain clearance</li>
<li><strong>Electro-mechanical cutting</strong> — a rotating cutting head clears stubborn blockages including hardened grease, tree roots, and solidified waste. Particularly effective in drains where jetting alone isn't sufficient</li>
<li><strong>CCTV inspection</strong> — a high-resolution camera is fed through the drainage system to locate and identify the exact nature of blockages, damage, or root ingress. Essential for diagnosing recurring problems or planning structural repairs</li>
</ul>

<h2>Common Causes of Blocked Drains in Peterborough</h2>
<p>Understanding the cause helps you prevent recurrence:</p>
<ul>
<li><strong>Fat, oil, and grease (FOG)</strong> — poured down the kitchen sink when warm, it cools, solidifies, and gradually narrows the pipe until it blocks completely. The number one cause of kitchen drain blockages in Peterborough homes</li>
<li><strong>Wet wipes and sanitary products</strong> — unlike toilet paper, these don't break down in water. Even products labelled "flushable" can cause blockages and accumulate in the sewer network</li>
<li><strong>Hair and soap scum</strong> — builds up progressively in shower and bath wastes, forming a dense mat that eventually stops flow</li>
<li><strong>Food waste</strong> — rice, pasta, coffee grounds, and vegetable peelings swell in water and clump together downstream</li>
<li><strong>Tree root ingress</strong> — tree roots seek out moisture and can penetrate cracks and joints in older clay drain pipes. Particularly common in Peterborough's older housing stock with mature garden trees</li>
<li><strong>Collapsed or displaced drain pipes</strong> — older clay drainage (pre-1970s) can crack, subside, or shift over time, causing recurring blockages and eventual structural failure</li>
<li><strong>Foreign objects</strong> — children's toys, cotton buds, nappies, and other items that shouldn't be flushed</li>
</ul>

<h2>CCTV Drain Surveys in Peterborough</h2>
<p>If your drains block repeatedly, drain slowly, or you're experiencing sewage smells without an obvious cause, a CCTV survey identifies exactly what's happening inside your drainage system. We feed a self-levelling, high-resolution drain camera through your drainage pipes and record the full footage to a tablet. The survey identifies:</p>
<ul>
<li>The exact location and nature of blockages</li>
<li>Root ingress — how far in and how severe</li>
<li>Cracked, fractured, or collapsed pipe sections</li>
<li>Displaced joints and settlement</li>
<li>Incorrect gradients causing standing water</li>
<li>Scale or grease build-up on pipe walls</li>
</ul>
<p>You receive a written report with still images from the footage, a clear explanation of findings, and our recommendations for repair. CCTV surveys are also highly recommended before purchasing a property — particularly older Peterborough homes with clay drainage. Consider combining with our <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a>.</p>

<h2>Drain Repairs — No-Dig Options Available</h2>
<p>If the survey reveals structural damage to your drainage, we offer three repair approaches depending on the severity:</p>
<ul>
<li><strong>Patch lining</strong> — a localised resin patch is cured inside the pipe at the crack or joint failure point. No excavation, minimal disruption. Suitable for isolated defects</li>
<li><strong>Full drain relining (CIPP)</strong> — a full-length resin liner is installed and cured inside the existing pipe, creating a new pipe within the old one. No excavation required — the drain is effectively reborn without digging up your garden or driveway</li>
<li><strong>Excavation and replacement</strong> — where the pipe is too severely damaged or misaligned for lining, we excavate and replace the affected section with modern PVC drainage</li>
</ul>

<h2>Prevention — How to Keep Your Drains Clear</h2>
<ul>
<li>Never pour fat, oil, or grease down the sink. Let it cool, then bin it in a sealed container</li>
<li>Use a drain guard in the shower and bath to catch hair before it enters the waste pipe</li>
<li>Only flush toilet paper — never wipes (even "flushable" ones), cotton buds, nappies, or sanitary products</li>
<li>Run hot water down the kitchen sink for 30 seconds after washing up to help clear residual grease</li>
<li>If you have mature trees near your drainage runs, book an annual CCTV check to catch root ingress early</li>
</ul>

<h2>Drain Clearance Pricing — 2026</h2>
<ul>
<li><strong>Blocked sink or toilet (rodding)</strong> — from £80</li>
<li><strong>High-pressure water jetting (domestic)</strong> — from £120</li>
<li><strong>CCTV drain survey with report</strong> — from £150</li>
<li><strong>Drain relining</strong> — quoted on survey findings</li>
</ul>
<p>Standard domestic blockage clearance is priced as a fixed fee — not hourly. We confirm the price before we start. Landlords with multiple properties can ask about our discounted drain maintenance rates.</p>

<h2>Areas We Cover for Drain Clearance</h2>
<p>We clear blocked drains 7 days a week across all Peterborough postcodes and surrounding areas, including <a href="/areas/orton">Orton</a>, <a href="/areas/werrington">Werrington</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/market-deeping">Market Deeping</a>, <a href="/areas/yaxley">Yaxley</a>, <a href="/areas/whittlesey">Whittlesey</a>, and <a href="/areas/stamford">Stamford</a>. Emergency drain clearance is available for sewage backflow and flooding situations.</p>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Outside drain backing up into the garden. The team arrived the same day, cleared it with high-pressure jetting, and put a camera down to check for damage. All done and dusted in under two hours. Really efficient.&rdquo;</p>
<p><strong>— Pete A., Werrington PE4 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Kitchen sink had been slow-draining for months. One visit with the jetting equipment and it flows perfectly. Should have called sooner. Very reasonable price and friendly engineer.&rdquo;</p>
<p><strong>— Diane L., Hampton PE7 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Drain Clearance?</h2>
<ul>
<li><strong>Professional high-pressure jetting equipment</strong> — 3,500 PSI for thorough pipe cleaning, not just blockage removal</li>
<li><strong>CCTV drain surveys</strong> with written reports and still images</li>
<li><strong>Most blockages cleared on the first visit</strong></li>
<li><strong>Available 7 days a week</strong> with emergency response for sewage situations</li>
<li><strong>No-dig drain repair options</strong> — CIPP lining and patch repairs</li>
<li><strong>Fixed pricing on standard clearance</strong> — no hourly billing surprises</li>
<li><strong>30+ years of local drain knowledge</strong> across Peterborough's drainage network</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified reviews</li>
</ul>`,
      faqs: [
        { q: "How quickly can you unblock my drain in Peterborough?", a: "We're available 7 days a week and offer same-day appointments for drain clearance in most cases. For genuine emergencies like sewage backflow or flooding, we provide an urgent response — call us and we'll prioritise your situation. Most domestic drain blockages are cleared within 1–2 hours of our engineer arriving." },
        { q: "What causes blocked drains in Peterborough homes?", a: "The most common causes are fat and grease build-up in kitchen drains, wet wipes and sanitary products in toilets, hair and soap scum in shower wastes, food waste, and tree root ingress in older clay drainage — particularly common in Peterborough's older housing stock. We'll identify the cause and advise on preventing recurrence." },
        { q: "What is high-pressure water jetting and is it better than rodding?", a: "High-pressure water jetting (3,500 PSI) fires a powerful jet of water through the pipe, cleaning the full bore rather than just clearing the blockage. Unlike rodding, which only breaks through the obstruction, jetting removes grease, scale, and debris from the pipe walls — leaving it genuinely clean. Jetting is the most thorough and lasting method for most blockage types." },
        { q: "Do you offer CCTV drain surveys?", a: "Yes. We use high-resolution drain cameras to inspect your full drainage system, identify the cause and location of blockages or damage, and produce a written report with still images and recommendations. A CCTV survey is particularly valuable for recurring blockages, suspected structural damage, tree root ingress, or before buying a property." },
        { q: "How much does drain unblocking cost in Peterborough?", a: "Standard domestic blockage clearance by rodding starts from £80. High-pressure water jetting starts from £120. CCTV surveys start from £150. We price standard blockage clearance as a fixed fee — not hourly — and confirm the cost before starting. Drain lining and repair costs are quoted based on survey findings." },
        { q: "Can you repair a damaged or collapsed drain?", a: "Yes. Depending on the extent of the damage, we offer three options: patch lining (for isolated defects), full CIPP drain relining (no excavation — a new pipe is created inside the old one), or excavation and replacement for severely collapsed sections. We'll recommend the most cost-effective solution based on the CCTV survey findings." },
        { q: "How can I stop my drains blocking again?", a: "The key steps: never pour fat or grease down the kitchen sink; use a drain guard in the shower and bath to catch hair; only flush toilet paper (never wipes or sanitary products); run hot water down the sink after washing up; and if you have mature trees near drain runs, book an annual CCTV check to catch root ingress before it becomes a blockage." },
      ],
    },
  },

  // ── 10. PRE-PURCHASE PLUMBING SURVEY ─────────────────────────────────────
  {
    slug: "pre-purchase-plumbing-survey",
    data: {
      heroSubheading:
        "Know exactly what you're buying before you commit. Detailed plumbing and heating survey covering boilers, drains, pipework, and water supply. Written report with traffic-light ratings across Peterborough.",
      shortDescription:
        "Pre-purchase plumbing surveys for Peterborough home buyers. Boiler, heating, drainage, and pipework inspection with detailed written report and repair cost estimates.",
      seoTitle: "Pre-Purchase Plumbing Survey Peterborough | Home Buyer Report",
      seoDescription:
        "Pre-purchase plumbing surveys in Peterborough. Boiler, heating, drainage, and pipework inspection. Detailed written report with cost estimates — book within days.",
      content: `<h2>Pre-Purchase Plumbing Surveys in Peterborough</h2>
<p>Buying a house is likely the largest financial decision you'll ever make — and standard property surveys don't tell you nearly enough about the plumbing. A RICS HomeBuyer Report or Building Survey covers the structure, roof, and damp — but they'll typically note whether there's a boiler and little more. They won't test the heating system, measure water pressure, identify lead pipework, inspect the drainage, or assess the condition of individual plumbing components. That gap can cost you dearly.</p>
<p>A failing boiler, lead supply pipes, corroded central heating, cracked drains, or an ageing unvented cylinder can each cost £2,000–£10,000+ to put right after you've moved in. Our dedicated pre-purchase plumbing survey gives you the full picture before you exchange — real information, real estimated costs, and real negotiating power.</p>

<h2>What We Inspect — Full Property Coverage</h2>
<p>Our survey covers every plumbing and heating system in the property:</p>
<ul>
<li><strong>Boiler</strong> — manufacturer, model, age, efficiency rating (ErP), service history, condition of flue and controls, estimated remaining serviceable life, and cost to replace if near end of life</li>
<li><strong>Central heating system</strong> — all radiators tested for heat output and cold spots, system pressure, pump condition, pipework material and visible condition, zone valves, and controls</li>
<li><strong>Hot water system</strong> — cylinder type (vented/unvented), age and condition, thermostat settings, immersion heater, and temperature output at taps</li>
<li><strong>Cold water supply</strong> — mains pressure measurement, incoming supply pipe material (identifying lead pipes), internal stopcock location and operation, and loft tank condition if present</li>
<li><strong>Bathroom plumbing</strong> — all taps (operation and dripping), toilet cistern mechanism, shower type and temperature performance, waste connections, and sealant condition</li>
<li><strong>Kitchen plumbing</strong> — sink, taps, waste connection, dishwasher and washing machine supplies and wastes</li>
<li><strong>Drainage</strong> — internal waste pipes (condition and flow), external inspection chambers and manholes opened and inspected, and overall drainage condition assessed</li>
<li><strong>Gas pipework</strong> — visual inspection for condition, meter installation, appliance connections, and ventilation. Full <a href="/services/gas-safety-certificates">gas safety certificate</a> can be arranged if required</li>
<li><strong>Lead pipework identification</strong> — systematic check for lead supply pipes, which are still present in a significant proportion of Peterborough's pre-1970s housing stock</li>
<li><strong>Water pressure testing</strong> — measured at multiple points using calibrated pressure gauges to identify supply constraints or internal resistance</li>
</ul>

<h2>Why Standard Surveys Aren't Enough</h2>
<p>The gap in standard property surveys is well-established in the industry. RICS surveyors are not plumbing specialists — they typically make a visual observation of the boiler and note its approximate age, record whether water flowed from a few taps, and move on. They won't carry out a combustion analysis on the boiler, test the heating system under load, measure water pressure, or open drainage chambers.</p>
<p>Our survey is carried out by experienced plumbing engineers who know exactly what to look for and can estimate repair costs with accuracy. It's especially valuable for:</p>
<ul>
<li><strong>Pre-1970s properties</strong> — most likely to have lead pipework, outdated drainage, and ageing boilers</li>
<li><strong>Former rental properties</strong> — maintenance may have been minimal; compliance certificates may be missing</li>
<li><strong>Properties where the seller can't provide service records</strong> — meaning the boiler history is unknown</li>
<li><strong>Properties with an older boiler</strong> — knowing the remaining life expectancy before you commit is critical</li>
<li><strong>Any property where you want complete confidence before exchange</strong></li>
</ul>

<h2>Your Survey Report — Traffic-Light System</h2>
<p>After the inspection, you receive a comprehensive written report within 24 hours of the survey. The report uses a clear traffic-light rating for every area inspected:</p>
<ul>
<li><strong>Green</strong> — satisfactory condition; no action required</li>
<li><strong>Amber</strong> — minor issues or items requiring attention within 12 months; estimated cost included</li>
<li><strong>Red</strong> — significant defect requiring immediate attention or major cost; full explanation and estimated cost to repair or replace</li>
</ul>
<p>The report includes:</p>
<ul>
<li>Written assessment of every plumbing and heating component</li>
<li>Photographs documenting all significant findings</li>
<li>Estimated costs for all amber and red items — from our own current pricing, not guesses</li>
<li>Prioritised list of recommended works (immediate, short-term, and long-term)</li>
<li>Notes on any compliance issues (missing gas safety certificates, unregistered boiler installations)</li>
</ul>

<h2>Using the Report to Negotiate</h2>
<p>Our pre-purchase survey report is a genuine negotiating tool. Buyers regularly use our findings to:</p>
<ul>
<li><strong>Negotiate a lower purchase price</strong> — if the boiler needs replacing at £3,000 or the drains need lining at £2,500, these are legitimate grounds to reduce your offer</li>
<li><strong>Request pre-completion repairs</strong> — some sellers agree to fix issues before exchange rather than reduce the price</li>
<li><strong>Make an informed decision</strong> — some findings may change your view on the property entirely. Better to discover significant problems now than after you've moved in</li>
<li><strong>Plan your renovation budget accurately</strong> — knowing the plumbing costs upfront allows you to budget realistically for the whole project</li>
</ul>

<h2>Add a CCTV Drain Survey for Complete Coverage</h2>
<p>For older properties (pre-1970s), homes with mature trees nearby, or properties where the seller has no record of drain work, we strongly recommend adding a CCTV drain survey to your plumbing inspection. Tree root ingress and cracked clay drain pipes are common in Peterborough's older housing stock and can cost £1,500–£8,000 to repair. A CCTV survey adds approximately 30 minutes to the inspection visit and provides photographic evidence of the full drainage condition underground — something no standard survey covers.</p>

<h2>Survey Pricing — Peterborough 2026</h2>
<ul>
<li><strong>Standard survey (2–4 bedroom property)</strong> — fixed fee; contact us for current pricing and availability</li>
<li><strong>CCTV drain survey add-on</strong> — from £150 (added to any plumbing survey)</li>
<li><strong>Larger properties or complex systems</strong> — quoted individually after discussion</li>
</ul>
<p>We can usually schedule a survey within 2–3 working days of booking — important when you're working to exchange deadlines. Call us or <a href="/contact">book online</a> and tell us your timeline; we'll do our best to accommodate urgent requests.</p>

<h2>Areas We Cover for Pre-Purchase Surveys</h2>
<p>We carry out pre-purchase plumbing surveys across all Peterborough postcodes and the wider area, including <a href="/areas/orton">Orton</a>, <a href="/areas/werrington">Werrington</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/market-deeping">Market Deeping</a>, <a href="/areas/yaxley">Yaxley</a>, <a href="/areas/stamford">Stamford</a>, and surrounding villages. If you're buying a property anywhere in the Peterborough area, we can carry out the survey.</p>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Used Peterborough Plumbers for a pre-purchase survey on a 1960s semi. The report flagged lead pipework and a boiler with less than 2 years left. We used the estimated costs to negotiate £4,500 off the asking price. Easily the best money we spent in the whole buying process.&rdquo;</p>
<p><strong>— Chris and Helen W., buying in Peterborough PE3 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Really thorough survey — the engineer spent nearly 2 hours at the property, checked everything, and the report was with us the next morning. Professional, detailed, and excellent value. Gave us complete confidence going into exchange.&rdquo;</p>
<p><strong>— Priya S., buying in Orton PE2 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Your Survey?</h2>
<ul>
<li><strong>30+ years of Peterborough plumbing experience</strong> — we know the common issues in local housing stock</li>
<li><strong>Comprehensive coverage</strong> — boiler, heating, water supply, hot water, drainage, gas, and lead pipe identification</li>
<li><strong>Clear traffic-light report with photographs</strong> — easy to understand and act on</li>
<li><strong>Accurate cost estimates</strong> — from our own current pricing, not guesswork</li>
<li><strong>Report delivered within 24 hours</strong> of the survey</li>
<li><strong>Usually available within 2–3 working days</strong> of booking</li>
<li><strong>Optional CCTV drain survey add-on</strong></li>
<li><strong>4.6-star Google rating</strong> from over 120 verified Peterborough reviews</li>
</ul>`,
      faqs: [
        { q: "Why do I need a plumbing survey when I'm already getting a structural survey?", a: "Standard property surveys (HomeBuyer Reports and Building Surveys) cover structure, roof, and damp — but they don't test the heating system, measure water pressure, identify lead pipework, inspect drainage chambers, or assess individual plumbing components. A failing boiler, lead supply pipes, or a cracked drain can each cost £2,000–£10,000+ to fix after you've moved in. Our survey fills that gap with real findings and accurate estimated costs." },
        { q: "How long does a pre-purchase plumbing survey take?", a: "A thorough survey of a typical 2–4 bedroom Peterborough property takes 1.5 to 2.5 hours. Larger homes with more complex systems take longer. Adding a CCTV drain survey extends the visit by approximately 30 minutes. We'll confirm the expected duration when you book." },
        { q: "How soon will I receive the report?", a: "We deliver your written survey report within 24 hours of completing the inspection — usually the same evening or the following morning. The report is emailed as a PDF, formatted for easy sharing with solicitors, mortgage brokers, or other parties in the transaction." },
        { q: "Can the survey help me negotiate the purchase price?", a: "Yes — this is one of the most valuable uses of the report. Buyers regularly use our findings and cost estimates to negotiate reductions in asking price or to require the seller to carry out repairs before exchange. If the boiler is near end of life or the drains need relining, these are quantifiable costs that support a legitimate price negotiation." },
        { q: "Should I also get a CCTV drain survey?", a: "We recommend a CCTV drain survey for all pre-1970s properties and any property with mature trees in the garden or nearby. Tree root ingress and cracked clay drainage are common in Peterborough's older housing stock and can be expensive to repair. It adds around 30 minutes and £150 to the survey cost — a small outlay for potentially significant peace of mind." },
        { q: "How quickly can you carry out the survey?", a: "We can typically schedule a survey within 2–3 working days of booking. If you're working to a tight exchange deadline, contact us directly and we'll do our best to accommodate your timeline — including weekend surveys when necessary." },
        { q: "What happens if the survey finds serious problems?", a: "Our report clearly identifies all findings with a traffic-light rating (green/amber/red) and provides estimated costs for any amber or red items. You then have clear options: negotiate a price reduction, request the seller makes repairs before exchange, factor the costs into your renovation budget, or reconsider the purchase if the issues are too significant. The decision is always yours — our job is to give you the full picture." },
      ],
    },
  },
];

async function main() {
  for (const { slug, data } of updates) {
    const updated = await prisma.service.update({ where: { slug }, data });
    console.log(`✓ Updated: ${slug} (id: ${updated.id})`);
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
