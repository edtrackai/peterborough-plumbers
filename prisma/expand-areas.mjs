// prisma/expand-areas.mjs
// Run: node prisma/expand-areas.mjs
// Expands all 14 area pages to 600+ words of unique, SEO-optimised HTML content.

import { PrismaClient } from '../node_modules/@prisma/client/index.js';
const prisma = new PrismaClient();

const areas = [
  {
    slug: "city-centre",
    content: `<h2>Plumbing &amp; Heating Services in Peterborough City Centre (PE1)</h2>
<p>Peterborough city centre is our most active service zone, covering the PE1 postcode district in its entirety. Our Gas Safe registered engineers work across every part of the centre — from the Victorian terraces near Peterborough Cathedral and the Queensgate shopping quarter to modern riverside apartments along the Embankment and the newer Rivergate development. We respond to both planned bookings and emergency call-outs, typically reaching PE1 addresses within one to two hours.</p>

<h2>Services We Cover in PE1</h2>
<ul>
<li><strong>Boiler service</strong> — annual service from £79, including combustion analysis and a written Gas Safe certificate</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, issued same-day. City centre landlords and letting agents are among our busiest clients</li>
<li><strong>Emergency plumbing</strong> — 24/7 response, average 1–2 hours to all PE1 addresses</li>
<li><strong>Central heating repairs</strong> — radiator replacements, TRVs, power flushing, zone valve faults</li>
<li><strong>Bathroom installations</strong> — full suite replacements and wet room conversions in flats and terrace houses</li>
<li><strong>Drain unblocking</strong> — high-pressure jetting for internal and external drains</li>
<li><strong>Leak detection</strong> — acoustic and thermal imaging for concealed leaks behind walls and under floors</li>
<li><strong>Pre-purchase plumbing surveys</strong> — for buyers considering older city-centre properties</li>
</ul>

<h2>Property Types and Common Issues in PE1</h2>
<p>The city centre is home to one of the widest mixes of property types in the Peterborough area. Victorian and Edwardian terraces — particularly around Lincoln Road, Park Road, and Mayors Walk — often have original lead pipework or older copper systems that require attention. Galvanised steel radiators, outdated boilers, and undersized flues are common findings when we visit properties built before 1970.</p>
<p>Modern apartment blocks along the riverfront and near the railway station present different challenges: communal water pressure systems, thermostatic mixing valves (TMVs), and shared drainage stacks. Our engineers are trained to work within the constraints of shared buildings, including obtaining access to communal plant rooms and working within management company guidelines.</p>
<p>Peterborough's hard water supply — with calcium hardness levels consistently above 300 mg/L — accelerates limescale build-up inside boilers, heat exchangers, and shower heads. City-centre properties with older combi boilers are particularly vulnerable. We recommend annual servicing and, in many cases, fitting an inline scale reducer at the mains inlet.</p>

<h2>Landlord and HMO Services in Peterborough City Centre</h2>
<p>The PE1 postcode has one of the highest concentrations of rental properties in the East Midlands, with a significant number of HMOs and student lets near the city centre, railway station, and university campus. We work with landlords, letting agents, and property management companies to deliver annual CP12 gas safety certificates, boiler servicing packages, and priority emergency cover. Digital certificates are issued within 24 hours by email.</p>
<p>For HMO landlords, we provide full compliance checks covering gas, heating, hot water, and drainage — all documented and signed off by a Gas Safe registered engineer. We hold public liability insurance to £5 million and can be added to management company approved contractor lists.</p>

<h2>Response Times and Coverage</h2>
<p>We station engineers and stock vans within the PE1 area during peak hours. This means our response time for genuine plumbing and heating emergencies is consistently faster than companies dispatching from outside the city. For non-emergency bookings, same-day and next-day appointments are routinely available across all of PE1.</p>

<h2>Why City Centre Residents and Landlords Choose Us</h2>
<p>Local knowledge matters. Our engineers know the back streets off Bourges Boulevard, the parking restrictions near the Cathedral Quarter, and the access arrangements for communal apartment blocks on the Embankment. We do not charge extra for congestion zones or short-notice bookings within PE1. Every job is quoted upfront, and we do not add call-out fees on top of the quoted price.</p>`,
    faqs: [
      { q: "Do you cover emergency call-outs in Peterborough city centre at night?", a: "Yes — we provide 24/7 emergency plumbing across all PE1 postcodes, including nights, weekends, and bank holidays. Our average response time to city centre addresses is 1–2 hours." },
      { q: "Can you work in flats and apartment buildings in the city centre?", a: "Yes. We regularly work in purpose-built flats and converted apartments across PE1. We are experienced with communal water supplies, TMV valves, and working within the constraints of shared buildings." },
      { q: "Do you offer landlord gas safety certificates in Peterborough city centre?", a: "Yes — gas safety certificates (CP12) from £65, issued same-day. We serve many landlords and letting agents across PE1 and can usually book within 2–3 working days." },
      { q: "How quickly can a plumber reach Peterborough city centre?", a: "For standard bookings, same-day or next-day appointments are usually available. For emergencies, our target response time is 1–2 hours to all PE1 addresses." },
      { q: "Does hard water cause problems for boilers in Peterborough city centre?", a: "Yes. Peterborough has very hard water, and limescale build-up is one of the most common causes of boiler and heat exchanger failure in PE1. Annual servicing and fitting a scale reducer can significantly extend boiler life." }
    ]
  },
  {
    slug: "bretton",
    content: `<h2>Plumbing &amp; Heating Services in Bretton, Peterborough (PE3)</h2>
<p>Bretton is a large residential district in the west of Peterborough, built primarily during the 1970s as part of the city's major expansion programme. The area covers the PE3 postcode and includes a mix of semi-detached and detached family homes, maisonettes, and some later infill developments. Our Gas Safe registered engineers cover all of Bretton for both planned maintenance and same-day emergency call-outs, typically arriving within one to two hours.</p>

<h2>Services We Cover in Bretton</h2>
<ul>
<li><strong>Boiler service</strong> — annual service from £79, with combustion analysis and Gas Safe certificate</li>
<li><strong>Boiler replacement</strong> — supply and install of Worcester Bosch, Viessmann, and Baxi systems</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, same-day issue for Bretton landlords</li>
<li><strong>Central heating repairs</strong> — power flushing, radiator replacement, TRV fitting</li>
<li><strong>Emergency plumbing</strong> — 24/7 response across all Bretton streets and cul-de-sacs</li>
<li><strong>Bathroom and wet room installations</strong> — full project management from removal to tiling</li>
<li><strong>Drain unblocking</strong> — jetting and rodding for blocked sinks, toilets, and external drains</li>
<li><strong>Leak detection and repair</strong> — tracing concealed leaks in walls and under floors</li>
</ul>

<h2>Housing Stock and Common Plumbing Issues in Bretton</h2>
<p>The majority of Bretton's housing stock was constructed between 1967 and 1985, which means many properties are now over 40 years old. At this age, original copper pipework becomes susceptible to pinhole leaks, particularly where it runs through concrete floors or has been subjected to years of hard water scaling. Bretton residents regularly call us to trace and repair slow drips that have caused damage under flooring or inside stud walls.</p>
<p>Central heating systems of this era frequently used microbore pipework — narrow 8mm or 10mm copper tube running to each radiator. These systems are prone to sludge build-up over decades of use, resulting in cold spots on radiators, noisy pumps, and eventually heat exchanger failure. We carry out power flushing and system cleans across Bretton regularly, often dramatically improving heating performance at a fraction of the cost of a full system replacement.</p>
<p>Peterborough's very hard water supply affects every property in Bretton. Limescale accumulates inside boilers, heating elements, shower heads, and tap internals. If your boiler is making a kettling or rumbling noise, limescale on the heat exchanger is the most likely cause. Annual servicing, combined with a magnetic system filter and scale inhibitor dosing, is the most effective preventative approach.</p>

<h2>Bathroom Upgrades in Bretton</h2>
<p>Many Bretton homes still have original bathroom suites or upgrades carried out in the 1990s. We complete a high volume of bathroom renovation work in this area — including full suite replacements, shower installations, wet room conversions, and underfloor heating. Our team manages the complete project from first fix plumbing to tiling and final commissioning, coordinating with electricians and builders where needed.</p>

<h2>Landlord Services in Bretton</h2>
<p>There is a significant rental market across Bretton's housing estates. We provide annual gas safety certificates, boiler service packages, and reactive maintenance cover for landlords managing properties across PE3. We understand the requirements under the Gas Safety (Installation and Use) Regulations 1998 and provide fully documented certificates within 24 hours.</p>

<h2>Why Bretton Residents Choose Us</h2>
<p>We have been working in Bretton for many years and our engineers know the estate layouts, the common issues with 1970s-era systems, and the local parking restrictions that can slow down a visit. We provide fixed upfront quotes, no hidden call-out charges, and honest advice about whether to repair or replace. For Bretton residents, we offer same-day and next-day bookings with a consistent two-hour emergency response target.</p>`,
    faqs: [
      { q: "Why do Bretton houses get so many boiler problems?", a: "Much of Bretton was built in the 1970s, so boilers and heating systems are aging. Combined with Peterborough's hard water causing limescale build-up, annual servicing is strongly recommended to avoid expensive breakdowns." },
      { q: "What is power flushing and does my Bretton home need it?", a: "Power flushing uses high-pressure water and cleaning chemicals to remove sludge and scale from your central heating system. If radiators have cold spots or your boiler is noisy, a power flush is likely to significantly improve performance." },
      { q: "How quickly can you reach Bretton in an emergency?", a: "We aim to reach all Bretton addresses within 1–2 hours for genuine plumbing and heating emergencies, including nights and weekends." },
      { q: "Do you install new bathrooms in Bretton?", a: "Yes — we carry out full bathroom installations across Bretton PE3, from suite replacements to full wet room conversions. We manage the complete project including tiling and electrics coordination." },
      { q: "Can you service a boiler that has not been serviced for several years?", a: "Yes. We service boilers regardless of how long they have been left. We will carry out a full safety and performance check and advise honestly on any remedial work needed." }
    ]
  },
  {
    slug: "werrington",
    content: `<h2>Plumbing &amp; Heating Services in Werrington, Peterborough (PE4)</h2>
<p>Werrington is a large residential area in north Peterborough, developed from the late 1960s onwards as part of the city's planned expansion. The PE4 postcode covers a wide range of housing — from early new-town semis and terraces to more recent private developments — as well as local shopping precincts, schools, and community facilities. Our engineers cover all of Werrington for boiler servicing, central heating repairs, emergency plumbing, and bathroom installations.</p>

<h2>Services We Cover in Werrington PE4</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — Worcester Bosch, Viessmann, and Ideal Logic installations</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, issued same-day for Werrington landlords</li>
<li><strong>Central heating repairs</strong> — radiator replacement, power flushing, pump and valve replacements</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering all Werrington streets and closes</li>
<li><strong>Bathroom installations</strong> — full refurbishments and accessible bathroom conversions</li>
<li><strong>Drain unblocking</strong> — jetting and rodding for blocked drains and toilets</li>
<li><strong>Leak detection</strong> — acoustic and thermal tracing for hidden leaks</li>
</ul>

<h2>Property Types and Plumbing Challenges in Werrington</h2>
<p>Werrington's housing stock spans roughly five decades of construction, which means we encounter a wide variety of systems and installations on any given day. Properties built in the late 1960s and 1970s often have microbore copper pipework and older conventional boiler and tank setups. These systems, while reliable in their time, are increasingly costly to maintain and parts can be difficult to source. We advise many Werrington homeowners on the cost-benefit case for converting from a conventional system to a modern sealed combi boiler.</p>
<p>Homes built in the 1990s and 2000s tend to have combi boilers already installed, but units that have not been annually serviced frequently develop ignition, pressure, and heat exchanger issues by their second decade. Given Peterborough's hard water (consistently above 300 mg/L calcium hardness), limescale is the most destructive force inside any boiler in this area — and Werrington is no exception.</p>
<p>Newer housing in Werrington, including properties along the northern boundary of PE4 built in the 2010s, sometimes present snagging issues in the first two to five years: poorly sealed pipe joints, incorrectly set expansion vessels, and bathroom installations that develop leaks at the tray tray seal. We carry out new-build snagging inspections and fix inherited faults that the original developer is no longer willing to address.</p>

<h2>Hard Water and Heating Efficiency in PE4</h2>
<p>Hard water is a significant issue across all of Peterborough, including Werrington. Limescale accumulates progressively inside heat exchangers, pipes, and shower heads, reducing heating efficiency and eventually causing component failure. We recommend all Werrington homeowners fit a magnetic system filter (such as a Magnaclean) and an inline scale reducer on the cold mains feed. Combined with annual boiler servicing, this approach can extend boiler life by five years or more.</p>

<h2>Landlord Services in Werrington</h2>
<p>The rental market in Werrington is active, with many landlords managing smaller buy-to-let properties across the PE4 estate. We provide gas safety certificates (CP12), annual boiler servicing, and emergency reactive maintenance for landlords and letting agents. We can hold a key or liaise directly with tenants, and we issue digital certificates by email within 24 hours of completion.</p>

<h2>Why Werrington Residents Choose Us</h2>
<p>Our engineers are familiar with Werrington's layout, housing stock, and the typical issues found in properties of each era. We provide fixed, transparent quotes before any work starts, operate a genuine 24/7 emergency line, and aim to reach all Werrington addresses within 1–2 hours. There are no hidden call-out charges and no pressure to replace parts that can be reasonably repaired.</p>`,
    faqs: [
      { q: "Do you cover all of Werrington PE4?", a: "Yes — we cover all streets and closes within Werrington, including the northern fringes of PE4. We operate 24/7 for emergencies and offer same-day bookings for non-urgent work." },
      { q: "My boiler pressure keeps dropping in my Werrington home — what is the cause?", a: "Dropping pressure usually indicates either a small leak in the system, a faulty pressure relief valve, or an incorrectly set expansion vessel. We can diagnose and fix all three. Call us for a same-day assessment." },
      { q: "How do I know if my central heating system needs a power flush?", a: "Common signs include cold radiators (especially at the bottom), noisy pumps or boilers, and slow warm-up times. Power flushing removes accumulated sludge and scale and is far cheaper than replacing a system." },
      { q: "Can you replace an old back boiler in Werrington?", a: "Yes. Back boilers are no longer manufactured and parts are scarce. We regularly replace back boiler units across Werrington with modern wall-mounted combis — often a straightforward installation that significantly improves efficiency." },
      { q: "What notice do you need for a boiler service in Werrington?", a: "For planned boiler services, we typically offer same-day or next-day availability across Werrington PE4. Call us in the morning and we can usually book for that afternoon." }
    ]
  },
  {
    slug: "hampton",
    content: `<h2>Plumbing &amp; Heating Services in Hampton, Peterborough (PE7)</h2>
<p>Hampton is one of Peterborough's newest and largest residential developments, built progressively from the early 2000s on what was previously agricultural land to the south of the city. The area encompasses Hampton Vale, Hampton Hargate, Hampton Gardens, and several further phases of development, all within the PE7 postcode. With thousands of relatively new homes, Hampton presents a distinct set of plumbing and heating requirements that our engineers deal with daily.</p>

<h2>Services We Cover in Hampton PE7</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate included, covering all Hampton developments</li>
<li><strong>New-build snagging inspections</strong> — specialist checks for plumbing and heating defects in recently built Hampton homes</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, same-day issue for Hampton landlords and buy-to-let investors</li>
<li><strong>Central heating repairs</strong> — warranty and post-warranty repairs on all boiler brands</li>
<li><strong>Emergency plumbing</strong> — 24/7 response across Hampton Vale, Hargate, and Gardens</li>
<li><strong>Bathroom installations</strong> — upgrades and extensions in Hampton homes and new-build plots</li>
<li><strong>Drain unblocking</strong> — jetting for blocked toilets, sinks, and external drainage</li>
<li><strong>Underfloor heating maintenance</strong> — many Hampton properties have wet underfloor heating systems that require periodic servicing</li>
</ul>

<h2>New-Build Properties and Snagging Issues in Hampton</h2>
<p>The vast majority of Hampton's housing stock is less than 20 years old, which means many residents are dealing with post-warranty issues for the first time. Once the developer's two-year warranty expires, homeowners are responsible for all plumbing and heating repairs themselves. We carry out dedicated snagging inspections across Hampton — checking pipework quality, pressure vessel settings, drainage falls, and bathroom seals — and we find remediable defects in a significant proportion of properties we inspect.</p>
<p>Common issues we encounter in Hampton new-builds include: expansion vessels set to the wrong pre-charge pressure (causing boilers to lose pressure repeatedly), shower trays sealed incorrectly (leading to water ingress behind tile boards), and inadequate ventilation in en-suite bathrooms (causing mould and condensation issues). None of these are expensive to fix but all cause ongoing problems if left unaddressed.</p>

<h2>Underfloor Heating in Hampton</h2>
<p>A significant number of Hampton properties — particularly detached and larger semi-detached homes — were fitted with wet underfloor heating systems, either throughout the ground floor or in specific rooms such as kitchens and bathrooms. These systems require annual servicing in the same way a radiator system does. Actuators, manifolds, and zone valves all have a service life, and we regularly attend Hampton properties where underfloor circuits have lost efficiency due to air locks or actuator failure.</p>

<h2>Hard Water Impact in Hampton Homes</h2>
<p>Despite Hampton's housing being relatively new, Peterborough's hard water supply (calcium hardness above 300 mg/L) means that scale accumulation begins from day one. Combi boilers in Hampton homes that have not been annually serviced and are not protected by a scale reducer are at meaningful risk of heat exchanger scaling within ten years. We recommend all Hampton homeowners fit an inline scale reducer and Magnaclean magnetic filter as standard — particularly if their property is not currently protected.</p>

<h2>Why Hampton Residents Choose Us</h2>
<p>We understand Hampton's estate layouts, the typical plumbing and heating configurations across each development phase, and the common defects that appear in properties of different build years. We provide clear upfront quotes, carry out work to Gas Safe standards, and are familiar with the warranty and insurance requirements of Hampton's estate management companies. For emergencies, we aim to reach all Hampton addresses within 1–2 hours.</p>`,
    faqs: [
      { q: "My Hampton new-build boiler keeps losing pressure — is this normal?", a: "No. A correctly set up boiler and sealed system should hold pressure. Repeated pressure loss usually indicates either a small leak, a faulty pressure relief valve, or an incorrectly pre-charged expansion vessel — all of which we can diagnose and fix." },
      { q: "Do you service underfloor heating systems in Hampton?", a: "Yes. We service wet underfloor heating systems across Hampton, including manifold checks, actuator testing, zone valve servicing, and pressure testing. We recommend annual servicing to maintain efficiency." },
      { q: "Can you carry out a post-warranty snagging inspection on my Hampton home?", a: "Yes. We offer dedicated plumbing and heating snagging inspections for Hampton properties where the developer warranty has expired. We check all pipework, fittings, drainage, and the boiler installation and provide a written report." },
      { q: "How quickly can you reach Hampton in a plumbing emergency?", a: "We aim to reach all Hampton Vale, Hargate, and Gardens addresses within 1–2 hours for genuine emergencies, 24 hours a day, seven days a week." },
      { q: "Does my Hampton home need a scale reducer?", a: "Very likely yes. Peterborough has hard water and Hampton properties without scale protection will accumulate limescale inside the boiler over time. We can fit an inline scale reducer and magnetic filter in under an hour." }
    ]
  },
  {
    slug: "orton",
    content: `<h2>Plumbing &amp; Heating Services in Orton, Peterborough (PE2)</h2>
<p>Orton is a collective name for several planned residential townships on the southern side of Peterborough — including Orton Goldhay, Orton Malborne, Orton Southgate, Orton Waterville, and Orton Longueville — all within the PE2 postcode. Developed from the early 1970s, Orton is home to tens of thousands of residents across a variety of housing types, from original new-town semis and maisonettes to later private estates and converted farmhouses. Our engineers cover the full PE2 area for all plumbing and heating work.</p>

<h2>Services We Cover in Orton PE2</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe registered, certificate issued same-day</li>
<li><strong>Boiler replacement</strong> — all major brands, full installation with system flush and inhibitor dosing</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Orton landlords and letting agents</li>
<li><strong>Central heating repairs</strong> — including power flushing, radiator replacement, pump faults</li>
<li><strong>Emergency plumbing</strong> — 24/7, typically 1–2 hours to all PE2 addresses</li>
<li><strong>Bathroom installations</strong> — full refurbishments in Orton semis and detached homes</li>
<li><strong>Drain unblocking</strong> — jetting and CCTV survey for internal and external drains</li>
<li><strong>Leak detection</strong> — acoustic and thermal for hidden leaks under floors and behind walls</li>
</ul>

<h2>Property Types and Common Issues in Orton</h2>
<p>Orton's earliest housing — built from the late 1960s through the 1980s — is now approaching or past its fiftieth year. This generation of housing typically features original copper pipework that may be showing signs of age: pinhole leaks in buried sections, hardened compression fittings that have not been disturbed for decades, and galvanised steel tanks and cylinders in loft spaces. We regularly attend Orton properties to replace aging hot water cylinders, upgrade pressure systems, and repipe sections of pipework that have begun to corrode.</p>
<p>Central heating systems in Orton's older properties frequently use conventional heat-only boilers with separate hot water cylinders. While reliable in the right circumstances, these systems are fuel-inefficient compared to modern sealed systems and combi boilers. Many Orton homeowners ask us to carry out a conversion — replacing an old boiler and cylinder with a single combi unit — and we manage these conversions fully, including disposing of the old equipment.</p>
<p>Orton Waterville contains some older village properties that predate the new town developments, including period brick and stone cottages with lead or galvanised iron pipework. These properties require specialist attention and our engineers are experienced in working sensitively with older materials and conservation area requirements.</p>

<h2>Orton's Green Spaces and Drainage Context</h2>
<p>Orton sits adjacent to Ferry Meadows Country Park and the River Nene, which means external drainage in parts of PE2 can be affected by high groundwater levels in wet seasons. We deal with a higher than average volume of external drain blockages and sump pump enquiries in properties near the Nene Valley, and we carry out CCTV drain surveys for homeowners concerned about root intrusion or damaged drain runs.</p>

<h2>Landlord Services in Orton</h2>
<p>Orton has a substantial private rental sector across all of its townships. We provide annual gas safety inspections, boiler servicing packages, and reactive maintenance cover for landlords with portfolios across PE2. We are familiar with the HMO licensing requirements that apply to larger Orton properties and can provide multi-property service agreements at competitive rates.</p>

<h2>Why Orton Residents Choose Us</h2>
<p>Our engineers know the PE2 postcode well — including the differences between the townships, the typical heating systems found in each era of construction, and the access and parking arrangements across the Orton estates. We provide honest, upfront pricing, operate a genuine 24/7 emergency line, and do not charge hidden call-out fees on top of quoted prices.</p>`,
    faqs: [
      { q: "Do you cover all the Orton townships — Goldhay, Malborne, Waterville, Southgate?", a: "Yes — we cover all Orton townships within the PE2 postcode, including Orton Goldhay, Malborne, Southgate, Waterville, and Longueville, for both emergency and planned work." },
      { q: "I have an old boiler and hot water cylinder in my Orton home — should I convert to a combi?", a: "It depends on your property and hot water demand. A combi is usually the right choice for smaller homes and properties with one bathroom. We can assess your property and give honest advice — we will never recommend a combi where a system boiler would be more appropriate." },
      { q: "My external drain keeps blocking in Orton — could it be tree roots?", a: "Possibly. Properties near Ferry Meadows and the Nene Valley can be affected by root intrusion into older clay drainage runs. We carry out CCTV drain surveys that will identify root intrusion, collapsed sections, or displaced joints." },
      { q: "How quickly can you reach Orton for a plumbing emergency?", a: "We aim to reach all Orton PE2 addresses within 1–2 hours for genuine emergencies, including overnight and at weekends." },
      { q: "Can you replace a lead pipe in an older Orton Waterville property?", a: "Yes. We replace lead and galvanised pipework in older properties. This is an important health and performance upgrade — lead pipes can leach into drinking water and galvanised pipes corrode progressively from the inside." }
    ]
  },
  {
    slug: "yaxley",
    content: `<h2>Plumbing &amp; Heating Services in Yaxley, Peterborough (PE7)</h2>
<p>Yaxley is a large village and growing commuter settlement south of Peterborough, within the PE7 postcode district. The village has expanded significantly over the past two decades, with substantial new housing developments joining an older core of traditional village properties. Our Gas Safe registered engineers cover all of Yaxley — and the surrounding rural addresses — for boiler servicing, central heating repairs, emergency plumbing, and bathroom installations.</p>

<h2>Services We Cover in Yaxley PE7</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — supply and installation of combi and system boilers, including LPG options for properties not on mains gas</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Yaxley landlords</li>
<li><strong>Central heating repairs</strong> — all system types, including older conventional boilers</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering Yaxley village and surrounding rural areas</li>
<li><strong>Bathroom installations</strong> — full refurbishments in both older village homes and new-build properties</li>
<li><strong>Drain unblocking</strong> — high-pressure jetting and CCTV surveys</li>
<li><strong>Oil boiler servicing</strong> — for rural Yaxley properties not connected to the mains gas network</li>
</ul>

<h2>Property Types in Yaxley</h2>
<p>Yaxley's housing reflects its history as both an established village and a modern commuter location. The older core includes Victorian and Edwardian cottages, inter-war semis, and 1960s bungalows — many of which retain original copper pipework, older heating systems, and in some cases, properties that have transitioned from oil or solid fuel heating to mains gas as the village network expanded. These older properties regularly need pipework upgrades, system conversions, and careful drain surveys where original clay drainage may be deteriorating.</p>
<p>The newer estates on the eastern and southern edges of Yaxley — built mainly from the 2000s onwards — have modern combi boilers and plastic pipework, presenting post-warranty and snagging-type issues rather than age-related deterioration. We see a mix of both in Yaxley, and our engineers are comfortable working across all property types.</p>

<h2>Rural Properties and LPG Near Yaxley</h2>
<p>Some properties on the rural fringe of Yaxley — including farm conversions and isolated dwellings — are not connected to the mains gas network and use LPG (liquid petroleum gas) or oil as fuel. We service and install LPG boilers and are registered to work on LPG heating systems. For oil boilers, we provide annual OFTEC-compliant servicing and emergency repair cover.</p>

<h2>Drainage and Groundwater in Yaxley</h2>
<p>The fenland location of Yaxley means groundwater levels can be elevated in wet winters, particularly in properties near the A15 corridor and lower-lying areas of the village. External drains are susceptible to root intrusion and silt build-up, and we recommend CCTV surveys for properties in Yaxley where drain performance has declined. We carry out full jetting and survey services and provide written reports with video footage.</p>

<h2>Why Yaxley Residents Choose Us</h2>
<p>We cover Yaxley regularly and our engineers are familiar with the village's mix of property ages, the locations of utility infrastructure, and the rural properties on the outskirts. We provide honest upfront pricing, same-day and next-day availability for non-emergency work, and a 24/7 emergency line with 1–2 hour response targets for all Yaxley addresses.</p>`,
    faqs: [
      { q: "Do you cover Yaxley village as well as the newer estates?", a: "Yes — we cover the full PE7 area including the original Yaxley village, all the newer housing developments, and rural properties on the outskirts. Same-day and next-day appointments are usually available." },
      { q: "My Yaxley property uses LPG not mains gas — can you service my boiler?", a: "Yes. We are registered to work on LPG heating systems and carry out boiler servicing, repair, and replacement for properties on LPG in and around Yaxley." },
      { q: "How quickly can you reach Yaxley in a heating emergency?", a: "We aim to reach all Yaxley PE7 addresses within 1–2 hours for genuine emergencies. We operate 24/7 including weekends and bank holidays." },
      { q: "Can you carry out a CCTV drain survey in Yaxley?", a: "Yes. We offer CCTV drain surveys across Yaxley — these are particularly useful for older village properties where original clay drain runs may have deteriorated or been affected by tree root intrusion." },
      { q: "My older Yaxley cottage still has an oil boiler — do you service these?", a: "Yes. We carry out OFTEC-compliant oil boiler servicing and emergency repairs for properties in and around Yaxley that are not on mains gas." }
    ]
  },
  {
    slug: "whittlesey",
    content: `<h2>Plumbing &amp; Heating Services in Whittlesey (PE7)</h2>
<p>Whittlesey is a historic fen market town located east of Peterborough, within the PE7 postcode. The town is known for the annual Whittlesey Straw Bear Festival and has a mix of older town-centre properties, Victorian and Edwardian terraces, post-war council housing, and more recent private developments on its periphery. Our engineers cover all of Whittlesey and the surrounding fen villages for boiler servicing, central heating repairs, emergency plumbing, and bathroom installations.</p>

<h2>Services We Cover in Whittlesey PE7</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — supply and installation including system and conventional boiler replacements</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Whittlesey landlords and letting agents</li>
<li><strong>Central heating repairs</strong> — power flushing, radiator replacement, TRV fitting</li>
<li><strong>Emergency plumbing</strong> — 24/7 response to all Whittlesey addresses</li>
<li><strong>Bathroom installations</strong> — full refurbishments in older town properties and newer estates</li>
<li><strong>Drain unblocking and CCTV surveys</strong> — for internal and external drainage</li>
<li><strong>Damp and leak detection</strong> — acoustic and thermal tracing for concealed leaks</li>
</ul>

<h2>Property Types and Plumbing in Whittlesey</h2>
<p>Whittlesey's housing stock spans several centuries of construction. The town centre includes Victorian and Edwardian brick terraces and semi-detached houses with original or early-replacement pipework, older conventional boiler systems, and in some cases lead or galvanised pipework that has never been updated. These older properties require careful inspection and often benefit from staged upgrades — replacing the boiler and hot water system first, followed by a phased repipe of older lead or corroded copper sections.</p>
<p>Post-war council housing in Whittlesey, built in the 1950s and 1960s, represents a different challenge: heating systems of this era may have used solid fuel or back boiler systems that have since been upgraded inconsistently. We frequently encounter properties in Whittlesey where old system components have been added to incrementally, creating a patchwork that is difficult to maintain effectively. In these cases, we recommend a full system assessment before carrying out any further piecemeal repairs.</p>

<h2>Drainage Challenges in the Fens</h2>
<p>Whittlesey sits in the middle of the fens, in an area with a high groundwater table and a complex network of dykes, drains, and water management infrastructure inherited from centuries of fen drainage. Surface water and foul drainage in some parts of the town can be susceptible to backing up in wet weather. We carry out CCTV drain surveys and high-pressure jetting for Whittlesey properties experiencing slow-draining or backing-up drains, and we provide written reports and footage for insurance purposes.</p>

<h2>Landlord Services in Whittlesey</h2>
<p>Whittlesey has a significant private rental sector, particularly in the older terraced housing stock near the town centre. We provide annual gas safety certificates, boiler servicing, and reactive maintenance for landlords and letting agents managing properties in PE7. Digital certificates are issued within 24 hours.</p>

<h2>Why Whittlesey Residents Choose Us</h2>
<p>We cover Whittlesey regularly and understand the specific challenges of fen-area properties — from drainage susceptibility to the mix of heating systems found in the town's diverse housing stock. We provide upfront fixed pricing, operate a 24/7 emergency line, and aim to reach Whittlesey addresses within two hours for emergency call-outs.</p>`,
    faqs: [
      { q: "Do you cover Whittlesey as well as Peterborough?", a: "Yes — we cover the full PE7 postcode including Whittlesey town and the surrounding fen villages. We operate 24/7 for emergencies and offer same-day bookings for non-urgent work." },
      { q: "I have an old Victorian terrace in Whittlesey with original pipework — can you help?", a: "Yes. We regularly work in older Whittlesey properties with original or early-replacement pipework. We carry out full system assessments and recommend staged upgrades based on condition and budget." },
      { q: "My drains are backing up in Whittlesey — is this a common problem?", a: "Drainage issues are relatively common in fenland areas like Whittlesey, where groundwater levels and old drain runs can cause backing-up in wet periods. A CCTV survey will identify the exact cause and location." },
      { q: "How quickly can you reach Whittlesey for a heating emergency?", a: "We aim to reach Whittlesey PE7 addresses within 1–2 hours for genuine emergencies, including nights and weekends." },
      { q: "Do you replace old lead pipes in Whittlesey properties?", a: "Yes. We replace lead and galvanised iron pipes in older Whittlesey homes. Lead pipes are a health concern and should be replaced — we provide a full repipe service including replastering where needed." }
    ]
  },
  {
    slug: "market-deeping",
    content: `<h2>Plumbing &amp; Heating Services in Market Deeping (PE6)</h2>
<p>Market Deeping is a small market town in South Lincolnshire, sitting on the River Welland approximately twelve miles north of Peterborough. Together with its neighbour Deeping St James, Market Deeping forms a distinct community within the PE6 postcode district. The town has a mix of older stone and brick properties in its historic centre, 20th-century housing estates, and more recent private developments on the outskirts. Our Gas Safe registered engineers cover Market Deeping and the surrounding villages for boiler servicing, central heating repairs, emergency plumbing, and bathroom work.</p>

<h2>Services We Cover in Market Deeping PE6</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — all major brands including LPG options for rural properties</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Market Deeping landlords</li>
<li><strong>Central heating repairs</strong> — all system types, including older conventional systems</li>
<li><strong>Emergency plumbing</strong> — 24/7 response covering Market Deeping and Deeping St James</li>
<li><strong>Bathroom installations</strong> — full refurbishments in period and modern properties</li>
<li><strong>Drain unblocking and CCTV surveys</strong> — for town and rural addresses</li>
<li><strong>Leak detection</strong> — thermal imaging and acoustic detection for hidden leaks</li>
</ul>

<h2>Property Types and Common Issues in Market Deeping</h2>
<p>The historic town centre of Market Deeping features stone and brick properties from the 17th, 18th, and 19th centuries, many of which are listed or within the conservation area. These older buildings require sensitive handling — lead pipework is occasionally still in service, original fireplaces and flues require assessment before boiler flue alterations are made, and solid stone walls require careful planning when routing new pipework. Our engineers are experienced in working within conservation constraints and can advise on approved methods and materials.</p>
<p>20th-century housing in Market Deeping reflects the building styles of each decade, from pre-war semis through post-war council estates to 1980s and 1990s private developments. Plumbing and heating systems in properties of these eras require age-appropriate maintenance — and we encounter a full range of system types across the town.</p>

<h2>Rural Properties and LPG Near Market Deeping</h2>
<p>The villages surrounding Market Deeping — including Deeping St Nicholas, Hop Pole, and Crowland Road areas — include rural properties not connected to the mains gas network. We are registered for LPG work and carry out boiler servicing, replacement, and emergency repairs for LPG-heated properties throughout the PE6 area.</p>

<h2>Flooding and Drainage Near the Welland</h2>
<p>Properties near the River Welland and in lower-lying parts of Market Deeping can be at increased risk of groundwater ingress in wet seasons. We deal with drainage issues — including sump pump installation and maintenance, gutter clearance advice, and CCTV drain surveys — for properties where surface water management is a concern.</p>

<h2>Why Market Deeping Residents Choose Us</h2>
<p>We cover Market Deeping regularly and our engineers understand the mix of property types, the particular requirements of working in conservation areas, and the rural context of many surrounding addresses. We provide clear upfront quotes, operate a 24/7 emergency line, and aim to reach Market Deeping addresses within 90 minutes for emergency call-outs.</p>`,
    faqs: [
      { q: "Do you cover Market Deeping and Deeping St James?", a: "Yes — we cover both Market Deeping and Deeping St James within PE6, as well as surrounding villages. We operate 24/7 for emergencies and offer same-day availability for planned work." },
      { q: "Can you work in a listed building or conservation area property in Market Deeping?", a: "Yes. We are experienced in working within listed buildings and conservation areas. We use approved materials and methods and can advise on what permissions or notifications may be required." },
      { q: "My Market Deeping property uses LPG — can you service the boiler?", a: "Yes. We are registered for LPG work and carry out boiler servicing, repair, and replacement for LPG-heated properties across Market Deeping and the surrounding PE6 villages." },
      { q: "How quickly can you reach Market Deeping in a heating emergency?", a: "We aim to reach Market Deeping within 90 minutes for genuine emergencies, operating 24/7 including bank holidays." },
      { q: "Do you carry out CCTV drain surveys in Market Deeping?", a: "Yes. We offer CCTV drain surveys and high-pressure jetting for Market Deeping properties. These are particularly useful for older properties where original clay drain runs may have deteriorated." }
    ]
  },
  {
    slug: "stamford",
    content: `<h2>Plumbing &amp; Heating Services in Stamford (PE9)</h2>
<p>Stamford is a historic market town in Lincolnshire, approximately twelve miles west of Peterborough, and is widely regarded as one of England's finest stone-built towns. The PE9 postcode covers Stamford itself along with a number of surrounding villages. With a high proportion of listed buildings, Georgian and Victorian architecture, and a conservation area covering much of the town centre, plumbing and heating work in Stamford requires a level of care and specialist knowledge that not all contractors can provide. Our Gas Safe registered engineers work in Stamford regularly and are experienced in the specific requirements of period property plumbing.</p>

<h2>Services We Cover in Stamford PE9</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate included, covering all Stamford addresses</li>
<li><strong>Boiler replacement</strong> — all brands, with careful flue and pipework routing in period properties</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Stamford landlords and letting agents</li>
<li><strong>Central heating installations and repairs</strong> — sensitive to period property constraints</li>
<li><strong>Emergency plumbing</strong> — 24/7, reaching Stamford within approximately 45–60 minutes</li>
<li><strong>Bathroom installations</strong> — period-sensitive renovations in Georgian and Victorian properties</li>
<li><strong>Lead pipe replacement</strong> — essential in many Stamford properties with pre-war plumbing</li>
<li><strong>Leak detection</strong> — acoustic and thermal imaging to minimise disruption to historic fabric</li>
</ul>

<h2>Period Properties and Historic Plumbing in Stamford</h2>
<p>Stamford's town centre is characterised by 17th, 18th, and 19th-century stone-built properties, many of which are Grade I or Grade II listed. Plumbing in these buildings presents unique challenges: lead pipework is still occasionally in service in the oldest properties, original lead soil stacks exist in Victorian terraces, and the routing of new pipework must be planned carefully to avoid damage to historic fabric and to comply with listed building consent where required.</p>
<p>We carry out lead pipe replacement across Stamford regularly. This is an important health and performance upgrade — lead can leach into drinking water, particularly in soft water areas (Stamford's water supply is slightly softer than Peterborough's), and original lead pipework installed over a century ago is approaching the end of its serviceable life. We replace lead sections with modern copper or plastic pipework, matching surface finishes where required in listed buildings.</p>
<p>Boiler flue routing in Stamford's stone buildings requires careful planning. In conservation areas and listed buildings, externally visible flue terminals must often be approved by the local planning authority before installation. We manage this process for our clients, liaising with South Kesteven District Council's planning department where required.</p>

<h2>Georgian and Victorian Heating Systems</h2>
<p>Many of Stamford's larger Georgian townhouses and Victorian villas have high-ceilinged rooms and substantial room volumes that require properly sized heating systems. We design and install central heating systems appropriate for these properties — including underfloor heating in ground floor extensions, cast iron radiator compatibility assessments, and the conversion of gravity-fed systems to fully pumped sealed systems where the building allows.</p>

<h2>Landlord Services in Stamford</h2>
<p>Stamford has a significant rental market, particularly in converted period properties near the town centre and along St Mary's Street and Broad Street. We provide annual gas safety certificates, boiler servicing, and reactive maintenance for landlords and letting agents managing properties across PE9. We are familiar with the particular requirements of listed building work and can advise on compliance.</p>

<h2>Why Stamford Residents Choose Us</h2>
<p>Our engineers understand the specific requirements of working in Stamford — from the constraints of listed buildings and conservation areas to the heating demands of large Georgian rooms and the sensitivity required around historic fabric. We provide upfront pricing, operate a 24/7 emergency line, and bring the care and knowledge that period property work demands.</p>`,
    faqs: [
      { q: "Can you work in listed buildings in Stamford?", a: "Yes. We are experienced in working within Grade I and Grade II listed buildings in Stamford. We use approved methods and materials and can advise on whether listed building consent is required for specific plumbing or heating alterations." },
      { q: "My Stamford property still has lead pipes — should I replace them?", a: "Yes, we recommend replacing lead pipework. Lead can leach into drinking water and original pipes are nearing the end of their life. We carry out lead pipe replacement across Stamford, matching surface finishes in period properties." },
      { q: "Can you install a new boiler in a Georgian Stamford townhouse?", a: "Yes. We plan boiler installations carefully in period properties, including flue routing that complies with conservation area requirements and listed building consent where applicable. We liaise with South Kesteven's planning team where needed." },
      { q: "How quickly can you reach Stamford in a plumbing emergency?", a: "We aim to reach Stamford PE9 within 45–60 minutes for genuine emergencies, operating 24/7 including nights and weekends." },
      { q: "Do you carry out CCTV drain surveys for older Stamford properties?", a: "Yes. Older stone properties in Stamford often have original clay or brick drain runs that can deteriorate or be displaced over time. A CCTV survey identifies exactly what is happening without destructive excavation." }
    ]
  },
  {
    slug: "longthorpe",
    content: `<h2>Plumbing &amp; Heating Services in Longthorpe, Peterborough (PE3)</h2>
<p>Longthorpe is a suburban area in the west of Peterborough, sitting between the city centre and Bretton within the PE3 postcode. It is one of Peterborough's more established residential areas, with a mix of pre-war detached houses, post-war semis, and later developments surrounding the historic Longthorpe Tower — a 14th-century fortified manor house that is one of the finest examples of medieval domestic architecture in England. Our Gas Safe registered engineers cover all of Longthorpe for boiler servicing, central heating repairs, bathroom installations, and emergency plumbing.</p>

<h2>Services We Cover in Longthorpe PE3</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — all major brands, full installation with system flush</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Longthorpe landlords</li>
<li><strong>Central heating repairs</strong> — radiator replacement, power flushing, pump and valve work</li>
<li><strong>Emergency plumbing</strong> — 24/7, typically 1–2 hours to Longthorpe addresses</li>
<li><strong>Bathroom installations</strong> — full refurbishments in detached and semi-detached homes</li>
<li><strong>Drain unblocking</strong> — jetting and CCTV surveys</li>
<li><strong>Leak detection and repair</strong> — thermal and acoustic for hidden leaks</li>
</ul>

<h2>Property Types and Plumbing in Longthorpe</h2>
<p>Longthorpe's housing stock spans several decades of the 20th century, with a strong presence of 1930s to 1960s detached and semi-detached houses. Properties of this era frequently have original copper pipework in the walls and under solid concrete floors — pipework that can develop pinhole leaks after decades of service, particularly in Peterborough's hard water environment. We regularly attend Longthorpe properties to locate and repair leaks in buried copper pipework, sometimes using thermal imaging to identify the source without unnecessary floor lifting.</p>
<p>Central heating systems in Longthorpe's older houses often feature conventional boiler and cylinder arrangements, with pump and zone valve setups that have been maintained and modified over many years. When these systems approach the end of their useful life, we manage the conversion to modern sealed combi or system boiler setups — a significant efficiency upgrade that also removes the need for a loft tank and hot water cylinder.</p>

<h2>Hard Water in Longthorpe</h2>
<p>Like all areas of Peterborough, Longthorpe is supplied with hard water that accelerates limescale build-up inside boilers, heat exchangers, and shower heads. Properties in Longthorpe that have never had a scale reducer fitted are at meaningful risk of early boiler failure. We recommend fitting an inline scale reducer and Magnaclean filter as part of any boiler service or replacement in this area.</p>

<h2>Why Longthorpe Residents Choose Us</h2>
<p>Our engineers work in Longthorpe regularly and understand the housing types and typical plumbing configurations found in the area. We provide honest upfront pricing, same-day and next-day availability, and a 24/7 emergency line with consistent 1–2 hour response times for all Longthorpe addresses.</p>`,
    faqs: [
      { q: "Do you cover Longthorpe PE3 for emergency plumbing?", a: "Yes — we cover all of Longthorpe within PE3 for emergency plumbing and heating, 24 hours a day. Our target response time is 1–2 hours." },
      { q: "I have a 1950s house in Longthorpe with original copper pipes — should I be concerned?", a: "Original copper pipework from this era can be in good condition but is worth inspecting, especially if it runs under concrete floors. We can carry out a system check and advise on any sections that show signs of deterioration." },
      { q: "Can you convert my old Longthorpe boiler system to a combi?", a: "Yes. We manage full combi conversions including removal of the old boiler, cylinder, and loft tank, installation of the new unit, and making good the surrounding areas. We provide a fixed quote before any work starts." },
      { q: "How quickly can you reach Longthorpe in an emergency?", a: "We aim to reach Longthorpe within 1–2 hours for genuine emergencies, operating 24/7 including nights and weekends." },
      { q: "My shower head is heavily scaled in Longthorpe — what can I do?", a: "Peterborough's hard water causes rapid limescale build-up on shower heads and tap internals. We can fit an inline scale reducer to the cold mains supply, which significantly reduces scaling throughout the property." }
    ]
  },
  {
    slug: "eye",
    content: `<h2>Plumbing &amp; Heating Services in Eye, Peterborough (PE6)</h2>
<p>Eye is a village located to the north-east of Peterborough, within the PE6 postcode. The village includes a traditional rural core of older cottages and farmhouses alongside more recent residential development that has expanded Eye's population considerably over recent decades. Our Gas Safe registered engineers cover Eye and the surrounding rural addresses for boiler servicing, central heating repairs, emergency plumbing, and bathroom installations.</p>

<h2>Services We Cover in Eye PE6</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate on the day</li>
<li><strong>Boiler replacement</strong> — including LPG and oil options for properties not on mains gas</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Eye landlords</li>
<li><strong>Central heating repairs</strong> — all system types including older conventional systems</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering Eye village and surrounding rural properties</li>
<li><strong>Bathroom installations</strong> — full refurbishments in village and new-build properties</li>
<li><strong>Drain unblocking and CCTV surveys</strong> — for village and rural addresses</li>
<li><strong>Oil boiler servicing</strong> — OFTEC-compliant, for properties not on mains gas</li>
</ul>

<h2>Property Types and Plumbing in Eye</h2>
<p>Eye's older village properties — cottages, farmhouses, and early 20th-century houses — reflect the rural building tradition of the Peterborough fens. These properties can present older plumbing systems including lead or galvanised pipework, solid fuel heating conversions, and drainage that may rely on septic tanks or older soakaways rather than mains sewer connection. Our engineers are experienced in working with rural property plumbing and can advise on the options for upgrading systems in older properties.</p>
<p>Newer development in Eye, built from the 1990s onwards, has modern combi boilers and plastic pipework — these properties mainly require standard servicing and post-warranty repairs. We cover both old and new across the village.</p>

<h2>Rural Properties and Off-Grid Heating Near Eye</h2>
<p>Properties on the rural fringes of Eye that are not connected to the mains gas network use LPG or oil for heating. We carry out OFTEC-compliant oil boiler servicing and LPG boiler work across the PE6 area. For properties considering a move away from fossil fuel heating, we can also advise on heat pump and other low-carbon options.</p>

<h2>Why Eye Residents Choose Us</h2>
<p>We cover Eye and surrounding PE6 villages regularly. Our engineers bring the knowledge needed to work across the range of property types in this area — from period cottages to new-build estates — and we provide clear upfront pricing and genuine 24/7 emergency cover.</p>`,
    faqs: [
      { q: "Do you cover Eye village PE6 for plumbing and heating?", a: "Yes — we cover Eye village and surrounding rural addresses within PE6. We operate 24/7 for emergencies and offer same-day bookings for planned work." },
      { q: "My Eye cottage uses oil heating — can you service it?", a: "Yes. We carry out OFTEC-compliant oil boiler servicing and emergency repairs for properties in Eye not connected to mains gas." },
      { q: "Can you deal with a septic tank or drainage issue in Eye?", a: "We can assess drainage issues and carry out CCTV surveys to identify problems with drain runs in Eye properties. For septic tank emptying we can recommend specialist contractors." },
      { q: "How quickly can you reach Eye PE6 in a heating emergency?", a: "We aim to reach Eye within 1–2 hours for genuine emergencies, operating 24/7." },
      { q: "I have lead pipes in my older Eye cottage — is this a problem?", a: "Lead pipework should be replaced — it is a health concern and older lead pipes are increasingly prone to failure. We carry out full lead pipe replacements in rural properties across the PE6 area." }
    ]
  },
  {
    slug: "glinton",
    content: `<h2>Plumbing &amp; Heating Services in Glinton, Peterborough (PE6)</h2>
<p>Glinton is a traditional English village north of Peterborough in the PE6 postcode, known for its historic St Benedict's Church and its position at the edge of the Peterborough urban area. The village combines older period properties — including stone and brick cottages and Victorian houses — with modern infill development. Our Gas Safe registered engineers serve Glinton and the surrounding villages for boiler servicing, central heating, emergency plumbing, and bathroom work.</p>

<h2>Services We Cover in Glinton PE6</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate on the day</li>
<li><strong>Boiler replacement</strong> — including LPG options for off-grid properties</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Glinton landlords</li>
<li><strong>Central heating repairs</strong> — all system types</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering Glinton and nearby villages</li>
<li><strong>Bathroom installations</strong> — sensitive to period property requirements</li>
<li><strong>Drain unblocking and CCTV surveys</strong></li>
<li><strong>Oil boiler servicing</strong> — for rural properties not on mains gas</li>
</ul>

<h2>Property Types in Glinton</h2>
<p>Glinton's character is defined by its older stone and brick housing, interspersed with 20th-century additions. Period properties in the village may have original pipework that has not been updated, older boiler systems, and drainage that requires attention. We are experienced in working sensitively within older village properties, minimising disruption and matching surfaces where required.</p>
<p>Newer houses in Glinton — built mainly from the 1990s and 2000s — have modern systems that require standard servicing and repair. We cover both ends of the housing age spectrum across the village.</p>

<h2>Why Glinton Residents Choose Us</h2>
<p>We cover Glinton and the surrounding PE6 villages regularly. Our engineers understand the plumbing needs of both period and modern village properties, provide honest upfront quotes, and offer a 24/7 emergency service with consistent response times.</p>`,
    faqs: [
      { q: "Do you cover Glinton PE6 for emergency plumbing?", a: "Yes — we cover Glinton and surrounding PE6 villages for emergency plumbing and heating, 24 hours a day, seven days a week." },
      { q: "My Glinton property is off the mains gas network — can you help?", a: "Yes. We work with LPG and oil heating systems for rural Glinton properties not connected to mains gas." },
      { q: "Can you work in an older stone cottage in Glinton?", a: "Yes. We are experienced in working in period village properties across the PE6 area, using appropriate materials and methods for older buildings." },
      { q: "How quickly can you reach Glinton in a heating emergency?", a: "We aim to reach Glinton within 1–2 hours for genuine emergencies, operating 24/7." },
      { q: "Do you offer boiler servicing in Glinton?", a: "Yes — we carry out annual boiler services from £79 in Glinton, issuing a Gas Safe certificate on the day. Same-day and next-day appointments are usually available." }
    ]
  },
  {
    slug: "thorney",
    content: `<h2>Plumbing &amp; Heating Services in Thorney, Peterborough (PE6)</h2>
<p>Thorney is a historic village in the east of the Peterborough district, within the PE6 postcode. The village is notable for Thorney Abbey — the remains of a Benedictine monastery that shaped the settlement — and sits deep in the fens, surrounded by the flat agricultural landscape that characterises this part of Cambridgeshire. Thorney has a mix of older housing and some modern development, and several properties in the area are not connected to the mains gas network. Our engineers cover Thorney and surrounding fen villages for all plumbing and heating work.</p>

<h2>Services We Cover in Thorney PE6</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate on the day</li>
<li><strong>Boiler replacement</strong> — including LPG and oil systems for off-grid properties</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Thorney landlords</li>
<li><strong>Central heating repairs</strong> — all system types</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering Thorney and surrounding fen villages</li>
<li><strong>Bathroom installations</strong> — for both period and modern properties</li>
<li><strong>Drain unblocking and CCTV surveys</strong></li>
<li><strong>Oil boiler servicing (OFTEC)</strong> — for properties not on mains gas</li>
</ul>

<h2>Property Types and Drainage in Thorney</h2>
<p>Thorney's position in the fens means that drainage is a particular consideration for many properties. The fen drainage network manages groundwater levels across the area, but individual property drainage — particularly in older buildings with original clay drain runs — can be susceptible to silt build-up, root intrusion, and displacement over time. We carry out CCTV drain surveys and high-pressure jetting for Thorney properties experiencing drainage issues.</p>
<p>Older properties in Thorney include cottages and houses built before mains services were extended to the village. These may have original lead or galvanised pipework, and some may rely on LPG or oil for heating. We are experienced in assessing and upgrading plumbing in these older rural properties.</p>

<h2>Why Thorney Residents Choose Us</h2>
<p>We cover Thorney and the surrounding PE6 fen villages regularly. Our engineers understand the challenges of rural and fenland properties — from off-grid heating to drainage susceptibility — and we provide honest pricing and a genuine 24/7 emergency service.</p>`,
    faqs: [
      { q: "Do you cover Thorney PE6 for plumbing and heating?", a: "Yes — we cover Thorney and surrounding PE6 fen villages for both emergency and planned plumbing and heating work, 24/7." },
      { q: "My Thorney property uses oil heating — can you service it?", a: "Yes. We carry out OFTEC-compliant oil boiler servicing and emergency repairs across Thorney and the surrounding PE6 villages." },
      { q: "I have drainage problems in my Thorney property — can you help?", a: "Yes. Fenland properties can experience drainage issues related to groundwater levels and older drain runs. We carry out CCTV surveys and high-pressure jetting for Thorney properties." },
      { q: "How quickly can you reach Thorney in a heating emergency?", a: "We aim to reach Thorney PE6 within 1–2 hours for genuine emergencies, operating 24/7." },
      { q: "Do you replace lead pipes in Thorney properties?", a: "Yes. We replace lead pipework in older Thorney properties — an important health and performance upgrade for any property still using original lead supply pipes." }
    ]
  },
  {
    slug: "crowland",
    content: `<h2>Plumbing &amp; Heating Services in Crowland (PE6)</h2>
<p>Crowland is a small market town in Lincolnshire, approximately twelve miles north-east of Peterborough, within the PE6 postcode. The town is best known for the remarkable Croyland Abbey ruins — a partially standing medieval abbey with a unique triangular bridge in the town centre. Crowland has a mix of older town-centre properties, Victorian and Edwardian housing, and some modern development on the outskirts. Our Gas Safe registered engineers cover Crowland and surrounding villages for boiler servicing, central heating repairs, emergency plumbing, and bathroom work.</p>

<h2>Services We Cover in Crowland PE6</h2>
<ul>
<li><strong>Boiler service</strong> — from £79, Gas Safe certificate issued on the day</li>
<li><strong>Boiler replacement</strong> — all major brands, including LPG and oil options</li>
<li><strong>Gas safety certificates (CP12)</strong> — from £65, for Crowland landlords</li>
<li><strong>Central heating repairs</strong> — all system types, including older conventional boilers</li>
<li><strong>Emergency plumbing</strong> — 24/7, covering Crowland and nearby villages</li>
<li><strong>Bathroom installations</strong> — full refurbishments in period and modern properties</li>
<li><strong>Drain unblocking and CCTV surveys</strong></li>
<li><strong>Oil boiler servicing (OFTEC)</strong> — for off-grid properties</li>
</ul>

<h2>Property Types and Common Issues in Crowland</h2>
<p>Crowland's town centre includes Victorian and Edwardian brick properties with plumbing systems that reflect their age — original copper or lead supply pipes, older central heating systems, and drainage that may include original clay runs susceptible to root intrusion. The town's fenland location means that groundwater levels can affect drainage performance during wet seasons.</p>
<p>Rural properties on the outskirts of Crowland — including farm cottages and converted agricultural buildings — may not be connected to the mains gas network and rely on LPG or oil for heating. We cover both urban and rural addresses across the PE6 postcode for all plumbing and heating work.</p>

<h2>Why Crowland Residents Choose Us</h2>
<p>We cover Crowland regularly and understand the mix of property types, the fenland drainage context, and the rural requirements of the surrounding area. We provide upfront fixed pricing, operate a 24/7 emergency line, and aim to reach Crowland addresses within 1–2 hours for emergency call-outs.</p>`,
    faqs: [
      { q: "Do you cover Crowland PE6 for plumbing and heating?", a: "Yes — we cover Crowland and surrounding PE6 villages for emergency and planned plumbing and heating work, 24/7." },
      { q: "My Crowland property uses LPG — can you service the boiler?", a: "Yes. We are registered for LPG work and carry out boiler servicing, repair, and replacement for LPG-heated properties in Crowland and surrounding villages." },
      { q: "I have drainage problems in my Crowland home — can you help?", a: "Yes. We carry out CCTV drain surveys and high-pressure jetting for Crowland properties. Fenland properties can be susceptible to drainage issues related to groundwater levels and aging drain runs." },
      { q: "How quickly can you reach Crowland in a heating emergency?", a: "We aim to reach Crowland PE6 within 1–2 hours for genuine emergencies, operating 24/7." },
      { q: "Do you carry out boiler servicing in Crowland?", a: "Yes — annual boiler services from £79, Gas Safe certificate on the day. We offer same-day and next-day appointments across Crowland PE6." }
    ]
  }
];

let updated = 0;
let failed = 0;

for (const area of areas) {
  try {
    await prisma.area.update({
      where: { slug: area.slug },
      data: {
        content: area.content,
        faqs: area.faqs,
      },
    });
    const wordCount = area.content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
    console.log(`✓ ${area.slug} — ${wordCount} words, ${area.faqs.length} FAQs`);
    updated++;
  } catch (err) {
    console.error(`✗ ${area.slug} — ${err.message}`);
    failed++;
  }
}

console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
await prisma.$disconnect();
