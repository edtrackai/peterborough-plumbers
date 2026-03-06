/**
 * seed-wave1-blogs.ts
 * Wave 1 — Top 10 highest-priority blog posts for PeterboroughPlumbers.com
 * Topical Authority Engine: Phase 1
 *
 * Run with:
 *   npx tsx prisma/seed-wave1-blogs.ts
 *
 * Safe to re-run — uses upsert on slug.
 *
 * New categories introduced (String field — no schema change required):
 *   "Drains & Drainage"  — post #4
 *   "Damp & Leaks"       — posts #5, #7
 * Existing categories used: "Boiler & Heating", "Emergency & Repairs",
 *   "Landlord & Legal", "Local Guides"
 *
 * NOTE: Update the blog filter UI (if hardcoded) to include the two new categories
 *   when these posts go live.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const wave1Posts = [
  // ─── 1. Boiler Error Codes ────────────────────────────────────────────────
  {
    slug: "boiler-error-codes-explained",
    title: "Boiler Error Codes Explained: What Common Fault Codes Mean",
    category: "Boiler & Heating",
    excerpt:
      "Your boiler has locked out and is showing a fault code. Here's what the most common codes mean for Worcester Bosch, Vaillant, Baxi, and Ideal boilers — and exactly what to do next.",
    content: `
<h2>What Boiler Error Codes Actually Mean</h2>
<p>Modern boilers display fault codes when something goes wrong — a combination of letters and numbers that points your engineer towards the problem. If your boiler has locked out and is showing a code, it doesn't always mean an expensive repair. Some codes indicate something you can safely resolve yourself. Others require an immediate call to a <a href="/services/boiler-service">Gas Safe registered engineer</a>.</p>
<p>This guide covers the most common fault codes from Worcester Bosch, Vaillant, Baxi, and Ideal boilers — what each one means, what causes it, and what to do next.</p>

<h2>Why Boilers Lock Out and Display Codes</h2>
<p>Boilers have built-in safety systems that monitor combustion, water pressure, flow temperature, and dozens of other parameters in real time. When a reading falls outside safe limits, the boiler locks out — shuts down and refuses to fire — to prevent damage or danger. The error code tells you (and your engineer) which safety limit was triggered.</p>
<p>A lockout is not a fault in itself. It's the boiler doing its job. The fault is whatever caused the lockout — and that's what needs diagnosing. The single most important rule: <strong>do not keep resetting a boiler that keeps relocking with the same code</strong>. Repeated resets mask the problem, delay diagnosis, and in rare cases can create a safety risk.</p>

<h2>Worcester Bosch Error Codes</h2>
<p>Worcester Bosch is the most common boiler brand in UK homes. Here are the codes you're most likely to encounter:</p>
<ul>
<li><strong>EA 338 / E9</strong> — Ignition failure. The boiler attempted to fire and failed. Caused by a faulty ignition lead, dirty or failed flame sensor electrode, blocked flue, or gas supply interruption. One reset attempt is reasonable; if it relocks, call an engineer.</li>
<li><strong>A1</strong> — Low water pressure. The system pressure has dropped below 0.5 bar. Check the pressure gauge on the boiler — if it reads below 1 bar, follow our guide on <a href="/guides/how-to-repressurise-your-boiler">how to repressurise your boiler</a>. If pressure drops again within days, there is a leak in the system that needs finding.</li>
<li><strong>F28 / F29</strong> — Gas valve fault or ignition failure. These codes often indicate a gas supply problem or failed gas valve. Do not attempt repeated resets — call a Gas Safe engineer.</li>
<li><strong>E5</strong> — Overheat stat tripped. The boiler reached an unsafe temperature, typically caused by sludge build-up, an airlock, or a failing pump restricting water flow. Requires an engineer — do not repeatedly reset.</li>
<li><strong>C6</strong> — Fan fault. The fan is not reaching the correct speed to establish safe flue draught before ignition. Engineer required.</li>
</ul>

<h2>Vaillant Error Codes</h2>
<ul>
<li><strong>F75</strong> — Pressure sensor fault. One of the most common Vaillant faults — often caused by a blocked or faulty pressure sensor rather than genuine pressure loss. Requires an engineer to test and replace the sensor if needed.</li>
<li><strong>F22</strong> — Low water pressure. Check the pressure gauge and repressurise to 1–1.5 bar if it reads below 1. Reset and monitor. If it recurs, call an engineer to check for a system leak.</li>
<li><strong>F28</strong> — Ignition failure after three attempts. Gas supply, ignition electrode, or PCB issue. One reset; if it relocks, call an engineer.</li>
<li><strong>F61</strong> — Gas valve regulation fault. Do not reset repeatedly. Call a Gas Safe engineer immediately.</li>
<li><strong>F63</strong> — EEPROM fault (control board error). Usually requires board replacement — an engineer job.</li>
</ul>

<h2>Baxi Error Codes</h2>
<ul>
<li><strong>E1 28H</strong> — Ignition failure. Gas supply, ignition electrode, or PCB fault. Engineer required if it relocks after one reset.</li>
<li><strong>E1 133</strong> — Low water pressure. Repressurise if under 1 bar and reset. If the fault reappears within a week, a system leak is likely.</li>
<li><strong>E1 168H</strong> — Flue safety fault. Possible blockage or fan problem. Do not use the boiler until an engineer has inspected the flue.</li>
<li><strong>E2 193</strong> — NTC flow temperature sensor failure. Requires an engineer.</li>
</ul>

<h2>Ideal Error Codes</h2>
<ul>
<li><strong>L2</strong> — Ignition lockout. As with other brands, can be gas supply, electrodes, or flue. One reset attempt; engineer required if it relocks.</li>
<li><strong>F1</strong> — Low water pressure. Repressurise to 1–1.5 bar and reset. If the fault recurs within days, arrange an inspection.</li>
<li><strong>L5</strong> — Overheat protection activated. Do not attempt to override or repeatedly reset. Engineer required.</li>
<li><strong>F4</strong> — Flow NTC sensor failure. Engineer required.</li>
</ul>

<h2>What You Can Safely Do Yourself</h2>
<p><strong>For pressure codes</strong> (Worcester A1, Vaillant F22, Baxi E1 133, Ideal F1): if the pressure gauge reads below 1 bar, repressurise to 1.2–1.5 bar and press reset. If the boiler runs normally and holds pressure, you're done for now — but book a service to check whether there's a slow underlying leak.</p>
<p><strong>For a single ignition lockout</strong> after a power cut or known gas supply interruption: one reset is reasonable. Hold the reset button for 3–5 seconds, wait for the boiler to attempt ignition, and listen for normal firing. If it fires cleanly and runs, monitor over the next 24 hours. If it relocks — call an engineer.</p>
<p>For <strong>all other codes</strong> — fan faults, overheat stats, gas valve codes, sensor failures, flue faults — do not attempt repeated resets. These require an engineer to diagnose and resolve the root cause before the boiler will run safely.</p>

<h2>When to Call an Engineer Immediately</h2>
<p>Call a <a href="/services/boiler-service">Gas Safe engineer</a> straight away if:</p>
<ul>
<li>The boiler relocks after a reset with the same code</li>
<li>You can smell gas — open windows, leave the property, call the National Gas Emergency line on <strong>0800 111 999</strong> before calling a plumber</li>
<li>The boiler is showing a flue-related code</li>
<li>A CO alarm is sounding alongside the boiler fault</li>
<li>The boiler is making unusual noises in addition to the error code</li>
</ul>
<p>If your boiler is over 10 years old and generating repeated fault codes, it's worth asking your engineer whether <a href="/guides/boiler-replacement-vs-repair">repair or replacement</a> is the more economical path. Our engineers will always give you an honest assessment — no pressure either way. <a href="/book">Book a boiler repair</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I reset my boiler myself?</h3>
<p>Yes — one reset attempt is safe for most codes. Locate the reset button (usually marked with a flame symbol or the word Reset) and hold it for 3–5 seconds. If the boiler fires and runs normally, monitor it over the next 24 hours. If it relocks with the same code, call a Gas Safe engineer rather than resetting again.</p>

<h3>What does F28 mean on a Worcester Bosch boiler?</h3>
<p>F28 on a Worcester Bosch indicates an ignition failure — the boiler attempted to light and couldn't. The most common causes are a faulty ignition lead, a dirty or failed flame sensor electrode, a restricted gas supply, or a blocked flue. One reset is reasonable; if it relocks, a Gas Safe engineer needs to diagnose the root cause.</p>

<h3>Will the error code clear itself?</h3>
<p>Pressure codes (A1, F22, E1 133, F1) will clear once you repressurise and reset — provided there is no underlying leak. Most other codes require either a manual reset or an engineer to fix the fault before the boiler will operate again. Error codes do not clear on their own without the underlying issue being resolved.</p>

<h3>Does an error code mean I need a new boiler?</h3>
<p>Not necessarily. Many common fault codes — ignition failures, pressure faults, sensor failures — are straightforward repairs. However, if your boiler is over 12 years old and generating repair costs regularly, or has a fault with a major component like the heat exchanger, replacement may be more economical long-term. Our engineers will give you the full picture before recommending either option.</p>
    `.trim(),
    seoTitle: "Boiler Error Codes Explained | Worcester, Vaillant, Baxi, Ideal",
    seoDescription:
      "What do boiler fault codes mean? Worcester Bosch, Vaillant, Baxi, and Ideal error codes explained clearly. When to reset, when to call a Gas Safe engineer.",
    status: "Published",
    publishedAt: new Date("2026-03-06"),
  },

  // ─── 2. Low Water Pressure ────────────────────────────────────────────────
  {
    slug: "low-water-pressure-causes-solutions",
    title: "Low Water Pressure at Home: Causes, Diagnosis, and Solutions",
    category: "Emergency & Repairs",
    excerpt:
      "A weak shower or slow-running tap is one of the most common plumbing complaints in UK homes. Here's how to identify which type of pressure problem you have — and what actually fixes it.",
    content: `
<h2>Why Low Water Pressure Is Worth Investigating Properly</h2>
<p>A dribbling tap or weak shower is frustrating, but low water pressure is worth more than a shrug. Left undiagnosed, the underlying cause — a leaking mains pipe, a failing pressure reducing valve, or years of limescale build-up — will get worse. In some cases, it's a symptom of a hidden leak that's quietly damaging your property.</p>
<p>The fix depends entirely on the cause. This guide explains the most common reasons for low pressure, how to tell them apart, and what a plumber will do when they visit.</p>

<h2>Two Systems, Two Different Problems</h2>
<p>Understanding low water pressure starts with recognising that your home's water comes from two sources — and both can fail independently.</p>
<h3>Mains Water Pressure</h3>
<p>Delivered to your property boundary by Anglian Water (the supplier across Peterborough and surrounding areas). Mains pressure varies by location — properties at the end of a supply run, or in higher-elevation areas, naturally receive less pressure than those close to the main supply pipe. If pressure is low at every cold tap in the house, mains supply is often the starting point.</p>
<h3>Internal System Pressure</h3>
<p>The pressure inside your own pipework — affected by the condition of your pipes, isolation valves, a pressure reducing valve (PRV), limescale accumulation, or any leaks within the property boundary. System pressure problems tend to affect specific taps, appliances, or areas of the house rather than everything at once.</p>

<h2>The Seven Most Common Causes</h2>
<h3>1. Shared Mains Supply</h3>
<p>In many Peterborough streets — particularly older areas like the city centre, Bretton, and Orton — multiple properties share a single mains supply pipe. Peak-time usage from multiple households on the same branch drops pressure for everyone. If your pressure is worst in the morning and evening and your neighbours have the same problem, this is likely the cause. Your water supplier is responsible for improving the supply.</p>

<h3>2. Partially Closed Isolation Valve</h3>
<p>If low pressure appeared suddenly, or shortly after plumbing work, check that all isolation valves are fully open. An isolation valve turned 90 degrees to the pipe is closed; in line with the pipe is fully open. This is a common oversight after any work under sinks or near appliances.</p>

<h3>3. Pressure Reducing Valve (PRV) Failure</h3>
<p>Many homes have a PRV fitted to reduce high incoming mains pressure to a safe working level inside the property. PRVs can fail in either direction — set too low, or clogged with debris — causing whole-house pressure to drop significantly. Testing and replacing a PRV is a straightforward job as part of a <a href="/services/plumbing-repairs">plumbing repair</a> call-out.</p>

<h3>4. Limescale and Pipe Narrowing</h3>
<p>Peterborough sits in one of England's hardest water areas — the chalk and limestone geology of Cambridgeshire means dissolved calcium deposits build up inside pipes over years. In older properties with narrow copper or galvanised pipework, this narrowing is enough to restrict flow noticeably. If pressure has declined gradually over years rather than dropping suddenly, limescale is a strong candidate.</p>

<h3>5. A Hidden Leak</h3>
<p>A leak anywhere in your supply pipework — under the floor, behind a wall, or in the mains supply pipe beneath your garden — loses pressure before it reaches your taps. If your water meter is still moving when all taps and appliances are off, there is a leak somewhere in the system. Our <a href="/services/damp-leak-detection">leak detection service</a> can locate it without unnecessary excavation.</p>

<h3>6. Hot Water Only</h3>
<p>If cold taps are fine but hot water is weak, the fault is within your heating system rather than the mains supply. A boiler running below 1 bar of pressure, a failing pump, a partially closed valve on the hot water circuit, or a corroded cylinder are all possible causes.</p>

<h3>7. Supply Pipe Condition</h3>
<p>In older properties, the supply pipe from the street to your property may be old lead or narrow galvanised steel — both of which corrode internally and restrict flow over time. Water suppliers are responsible for the pipe up to your boundary; beyond that, the supply pipe is the homeowner's responsibility.</p>

<h2>How to Diagnose Your Situation</h2>
<p>Work through these checks before calling a plumber:</p>
<ul>
<li><strong>Every tap affected or just some?</strong> All taps suggests mains supply or PRV. One tap or room suggests a localised problem.</li>
<li><strong>Hot and cold, or hot only?</strong> Hot only points to the boiler or cylinder. Both together suggests the mains or whole-house system.</li>
<li><strong>Gradual decline or sudden drop?</strong> Gradual over months or years suggests limescale. Sudden drop suggests a valve, PRV failure, or new leak.</li>
<li><strong>Check your water meter.</strong> Turn off all taps and appliances. If the meter dial or digital display is still moving after 10 minutes, you have a leak.</li>
</ul>

<h2>Solutions: What a Plumber Will Do</h2>
<p>Once the cause is identified, typical fixes include: replacing a failed PRV, opening or replacing a seized isolation valve, fitting a booster pump for persistently low mains pressure, clearing or replacing a corroded supply pipe, or locating and repairing a hidden leak. In most cases, a single visit by our <a href="/services/plumbing-repairs">plumbing repairs</a> team is enough to diagnose and resolve the problem. <a href="/book">Book online</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>What is normal water pressure in a UK home?</h3>
<p>The Water Industry Act requires water suppliers to maintain a minimum mains pressure of 1 bar at your property boundary. Most UK homes comfortably operate between 1 and 3 bar. Anything consistently below 1 bar is below the legal minimum and entitles you to report it to your water supplier for investigation at no charge.</p>

<h3>Can I fit a booster pump myself?</h3>
<p>Booster pumps need to be correctly sized and positioned in your system — typically after the mains stopcock or on the hot water outlet — to comply with the Water Supply (Water Fittings) Regulations 1999. Incorrect installation can create backflow contamination risks or void the manufacturer's warranty. It's a job for a qualified plumber.</p>

<h3>Is low water pressure a landlord's responsibility?</h3>
<p>If the cause is a fault within the rental property — a leaking pipe, failed PRV, or isolation valve problem — yes, the landlord is responsible under the Landlord and Tenant Act 1985. If it's due to insufficient mains supply from the water provider, the landlord should report it to Anglian Water on the tenant's behalf.</p>

<h3>Will the water company fix low pressure for free?</h3>
<p>If the problem lies with the mains supply pipe up to your property boundary, Anglian Water is responsible for it. Report persistent low mains pressure directly to them — if supply falls below the legal minimum, they are obligated to carry out remedial work at no charge. You can check incoming pressure using a pressure gauge fitted to an outside tap or under the kitchen sink.</p>
    `.trim(),
    seoTitle: "Low Water Pressure at Home: Causes and Solutions | UK Guide",
    seoDescription:
      "Low water pressure in your home? Find out the 7 most common causes, how to diagnose which type you have, and what a plumber will do to fix it.",
    status: "Published",
    publishedAt: new Date("2026-03-09"),
  },

  // ─── 3. Water Coming Through Your Ceiling ─────────────────────────────────
  {
    slug: "water-coming-through-ceiling",
    title: "Water Coming Through Your Ceiling: Emergency Steps to Take",
    category: "Emergency & Repairs",
    excerpt:
      "Water dripping or pouring through a ceiling needs immediate action. Every minute matters. Here's what to do first — in the right order — to limit damage and keep your family safe.",
    content: `
<h2>Act Immediately — Every Minute Counts</h2>
<p>Water coming through your ceiling is a home emergency. The longer it runs, the more it spreads through floor joists, ceiling plasterboard, and wall cavities. Acting in the first few minutes can be the difference between a manageable repair and a major structural job. Here's what to do — in order.</p>

<h2>Step 1: Turn Off the Water Supply</h2>
<p>Your first move is to stop water entering the system. Locate your main stopcock — usually found under the kitchen sink, in a downstairs cloakroom, or where the water main enters the property near the front door — and turn it clockwise until it will go no further. This cuts the cold water supply to the whole house.</p>
<p>If you suspect the leak is coming from your heating circuit (a pipe has burst in a ceiling void, or water is running from a radiator above), also turn off your boiler and central heating at the controls.</p>
<p>If you've never located your stopcock, do it now — not when there's a flood. A seized or inaccessible stopcock is useless in an emergency, and getting it replaced or freed is a simple job for our <a href="/services/plumbing-repairs">plumbing repairs</a> team.</p>

<h2>Step 2: Deal With the Electrical Risk</h2>
<p>Water and live electricity are a fatal combination. If water is coming through a ceiling near any light fittings, switches, or sockets — switch off the electricity supply to that circuit immediately at your consumer unit (fuse box). If you can see water actively dripping around or into a light fitting that is still live, leave the room first and switch off at the consumer unit before re-entering.</p>
<p>Do not use any electrical appliances — fans, dehumidifiers, lamps — in the affected room until the area is fully dry and has been checked by a qualified electrician.</p>

<h2>Step 3: Contain the Water and Protect Your Belongings</h2>
<p>Once the electrical risk is managed, focus on limiting damage. Place buckets or large containers under drips. Lay towels or old bedding on the floor to soak up water. Move furniture, electronics, rugs, and valuables out of the wet area.</p>
<p>If the ceiling is visibly bulging — a sign that water is pooling above the plasterboard — keep clear of directly below it. A water-soaked plasterboard ceiling can collapse suddenly under its own weight. If the bulge is growing, pierce the lowest point with a screwdriver to release the pooled water in a controlled way, rather than risk the whole area coming down at once.</p>

<h2>Step 4: Photograph Everything Before You Clean Up</h2>
<p>Before you start mopping up, take photographs and video of the damage as it stands — the wet ceiling, any visible drips, water staining, damaged flooring, and any affected contents. Your insurer will require evidence of the damage as found. Do this before anything is moved or cleaned. Time-stamped photographs significantly strengthen an insurance claim.</p>

<h2>Step 5: Identify the Source</h2>
<p>Where the water is coming from determines the type of repair needed and how urgent the call-out is. The most common sources:</p>
<ul>
<li><strong>Bathroom directly above</strong> — the most common cause. Check for an overflowing bath or sink, a split toilet cistern seal, a leaking shower tray, or water around pipe joints under the floor. Usually visible in the bathroom itself if you look carefully.</li>
<li><strong>Loft space or roof</strong> — if there's no bathroom above the affected ceiling, the water may be from a burst cold water storage tank in the loft, a split tank overflow, or a roof leak during or after heavy rain. Check the loft if it's safe to do so.</li>
<li><strong>Heating pipe in a void</strong> — if the house has been running with the heating on and no water source is directly above, a slow leak in a heating circuit running through a ceiling void is possible. These can drip unnoticed for weeks before saturating the ceiling.</li>
<li><strong>Upstairs flat (leasehold)</strong> — if you're in a ground or lower-floor flat, the source is almost certainly the property above. Contact the occupant or managing agent immediately alongside calling your own emergency plumber.</li>
</ul>

<h2>Step 6: Call an Emergency Plumber</h2>
<p>Once the water supply is off and immediate risks are contained, call an <a href="/services/emergency-plumber">emergency plumber</a>. Be ready to describe: where the water is coming through, what's above that ceiling, whether the water has stopped since you turned off the supply, and whether there's any discolouration (clean water vs brown/dirty water, which may indicate drainage involvement).</p>
<p>Our emergency team covers Peterborough, Stamford, Market Deeping, Whittlesey, and surrounding areas — call 02039514510 or <a href="/book">book online</a> and we'll get to you as quickly as possible.</p>

<h2>After the Emergency: Don't Ignore Hidden Damp</h2>
<p>Once the leak is repaired, visible damage is not necessarily the whole story. Water tracks sideways through floor structures, soaks into wall cavities, and can cause mould weeks later in areas that looked dry at the time. After any significant ceiling leak, a professional <a href="/services/damp-leak-detection">damp and moisture survey</a> will confirm whether any residual moisture remains before you replaster and redecorate. It's far cheaper to check than to redecorate twice.</p>
<p>For a broader guide to managing water damage, read our guide on <a href="/guides/what-to-do-burst-pipe">what to do when a pipe bursts</a>.</p>

<h2>Insurance: Act Quickly and Document Thoroughly</h2>
<p>Most home buildings and contents policies cover escape of water. Report the incident to your insurer as soon as possible — ideally the same day — and provide your photographs, the plumber's repair report, and a written account of when it started and what steps were taken. Delays in reporting or in arranging repairs can give insurers grounds to reduce a settlement. Check your policy schedule for <em>trace and access</em> cover — this covers the cost of finding and accessing a leak source, including opening walls or floors, and is a separate element not included in all policies.</p>

<h2>Frequently Asked Questions</h2>
<h3>Should I open the ceiling myself to find the source?</h3>
<p>No. Unless the ceiling is actively collapsing, leave it intact until an emergency plumber has identified the source. Opening the ceiling prematurely before the source is confirmed makes the investigation harder and the repair more expensive. A plumber will open only what needs to be opened to fix the problem.</p>

<h3>How long does a water-damaged ceiling take to dry?</h3>
<p>A plasterboard ceiling soaked by a significant water ingress typically takes 2–4 weeks to dry naturally, or 1–2 weeks with a dehumidifier running in the room. Check with a damp meter before replastering — plastering over damp plasterboard causes the finish to fail within months.</p>

<h3>Will my insurance cover the plumber's emergency call-out?</h3>
<p>Emergency call-out fees are not always covered — it depends on your specific policy. Check your policy schedule before authorising work, and ask your insurer whether trace and access cover applies. Most policies do cover the repair itself once the source is confirmed and a quote is provided.</p>

<h3>What if the water is brown or smells bad?</h3>
<p>Brown or foul-smelling water through a ceiling suggests the source may be drainage rather than clean water — a blocked or burst soil pipe, an overflowing waste, or a failure in a sanitary fitting. This requires an emergency call-out. Do not attempt to clear or contain it without gloves and appropriate precautions, and wash hands thoroughly after any contact.</p>
    `.trim(),
    seoTitle: "Water Coming Through Your Ceiling | Emergency Steps to Take",
    seoDescription:
      "Water dripping through your ceiling? Act immediately. Step-by-step emergency guide covering what to do first, electrical safety, insurance, and when to call a plumber.",
    status: "Published",
    publishedAt: new Date("2026-03-12"),
  },

  // ─── 4. CCTV Drain Survey Peterborough ───────────────────────────────────
  {
    slug: "cctv-drain-survey-peterborough",
    title: "CCTV Drain Survey in Peterborough: What to Expect",
    category: "Drains & Drainage",
    excerpt:
      "A CCTV drain survey uses a camera to inspect the inside of your drains, revealing blockages, cracks, root intrusion, and collapsed sections invisible from the surface. Here's what to expect and when you need one.",
    content: `
<h2>What Is a CCTV Drain Survey?</h2>
<p>A CCTV drain survey involves feeding a waterproof camera on a flexible rod through your drains to inspect the pipe interior in real time. The camera records video footage and transmits live images to a screen above ground, allowing the engineer to see exactly what's inside without digging anything up.</p>
<p>The result is a clear, documented picture of your drain condition — whether that's a build-up of grease and debris, a section of cracked or collapsed pipe, root intrusion from nearby trees, or a structural problem caused by ground movement. Paired with a written report, it's the definitive way to diagnose a drain problem or satisfy a buyer's or insurer's requirement for evidence.</p>

<h2>When Do You Need a CCTV Drain Survey?</h2>
<p>You don't need a survey every year — but there are specific situations where it's the right tool:</p>
<ul>
<li><strong>Repeated blockages</strong> — if your drains keep blocking despite being cleared, a structural problem (root intrusion, partial collapse, bellied pipe) is likely causing debris to accumulate. A survey identifies the cause rather than just treating the symptom.</li>
<li><strong>Buying a property</strong> — drains are rarely covered in a standard RICS survey. A pre-purchase CCTV survey gives buyers written evidence of the drain condition before exchange, which can be used to negotiate on price or request repairs. This is especially relevant in Peterborough's older stock of 1930s–1960s properties with clay drainage.</li>
<li><strong>Persistent drain odour</strong> — a sewer smell inside the house despite clear drains often indicates a cracked pipe, a displaced joint, or a broken seal allowing gases to enter the building.</li>
<li><strong>Subsidence or ground movement</strong> — in areas with shrinkable clay subsoil (common in parts of Peterborough), ground movement can displace drain joints. A survey confirms whether drains have been affected before any underpinning or structural work proceeds.</li>
<li><strong>Before a building extension</strong> — if a new build or extension will be constructed near existing drains, a pre-work CCTV survey establishes the current condition and protects you if a problem is discovered later.</li>
<li><strong>Insurance investigation</strong> — some insurers require a drain survey report as part of a subsidence or escape-of-water claim investigation.</li>
</ul>

<h2>What Happens on the Day</h2>
<p>Here's what to expect when our <a href="/services/drain-blockages">drain survey team</a> arrives:</p>
<h3>1. Access the Drain</h3>
<p>The engineer identifies the best access point — usually a rodding eye, an external inspection chamber (manhole), or the nearest drain access point to the reported problem. No excavation is needed at this stage.</p>
<h3>2. Run the Camera</h3>
<p>A flexible camera rod is fed into the drain. The camera travels along the pipe, transmitting live footage. The engineer controls the speed and direction, pausing to examine any areas of concern. Drain runs of up to 50 metres can typically be surveyed in a single access.</p>
<h3>3. Record and Annotate</h3>
<p>The entire survey is recorded. The engineer notes the location, depth, and description of any defects found — cracks, root intrusion, displaced joints, debris accumulation, collapsed sections, or incorrect fall gradient.</p>
<h3>4. Clear Blockages If Found</h3>
<p>If a blockage is discovered during the survey, it can often be cleared during the same visit using high-pressure water jetting — avoiding a separate call-out.</p>
<h3>5. Written Report</h3>
<p>You receive a written report with findings, photographs or video stills, and recommendations. This is the document your solicitor, insurer, or buyer may require. It remains on record and can be used as a baseline for future surveys.</p>

<h2>What a Survey Can Find in Peterborough Properties</h2>
<p>Based on our work across the area, the most common findings in Peterborough drain surveys include:</p>
<ul>
<li><strong>Root intrusion</strong> — tree roots entering through joints in clay drain pipes, common in tree-lined areas of Orton, Bretton, and the city centre</li>
<li><strong>Displaced joints</strong> — particularly in older clay drainage where ground movement has shifted pipe sections out of alignment</li>
<li><strong>Grease and fat accumulation</strong> — common in older kitchens and properties with no grease trap</li>
<li><strong>Broken or cracked pipes</strong> — clay pipes in properties built before the 1970s are reaching the end of their expected lifespan</li>
<li><strong>Incorrect gradients</strong> — pipework laid without sufficient fall, causing debris to settle rather than flush through</li>
</ul>

<h2>After the Survey: What Happens Next</h2>
<p>If the survey reveals a problem, your engineer will explain the options clearly — whether that's a patch repair, a section relining (no-dig repair), or in more severe cases, a targeted excavation and replacement. Not every defect needs immediate remediation; the report will indicate severity and whether the issue is likely to worsen.</p>
<p>If the survey finds no significant issues, you have a documented clean bill of health for the drains — useful for property sales, insurance records, and peace of mind.</p>
<p>To book a CCTV drain survey across Peterborough, Stamford, Market Deeping, Yaxley, Whittlesey, and surrounding areas, <a href="/book">book online</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does a CCTV drain survey take?</h3>
<p>A standard domestic CCTV drain survey typically takes 1–2 hours, depending on the number of drain runs, access complexity, and whether any blockages are found. A written report is usually issued within 24–48 hours of the survey.</p>

<h3>Do I need to be at home during the survey?</h3>
<p>Not necessarily — the survey is carried out externally via manholes and rodding eyes. However, it's useful to be present if you want to discuss findings with the engineer in person, or if internal access points need to be used.</p>

<h3>Will a drain survey find problems inside the house?</h3>
<p>A standard external drain survey covers the underground drainage from your property to the public sewer. If you have concerns about internal waste pipes or under-floor drainage, let us know when booking — some internal runs can be accessed via stack pipe rodding points.</p>

<h3>Can I use a drain survey report for a house purchase?</h3>
<p>Yes — a CCTV survey report with video footage and a written findings summary is accepted by solicitors, mortgage lenders, and buyers as evidence of drain condition. If defects are found, the report gives you a documented basis to negotiate with the seller before exchange.</p>
    `.trim(),
    seoTitle: "CCTV Drain Survey Peterborough | What to Expect & When You Need One",
    seoDescription:
      "CCTV drain survey in Peterborough — what it involves, when you need one, what it finds in local properties, and what happens after. Book with Gas Safe registered drainage engineers.",
    status: "Published",
    publishedAt: new Date("2026-03-15"),
  },

  // ─── 5. How Plumbers Find Hidden Leaks ───────────────────────────────────
  {
    slug: "how-plumbers-find-hidden-leaks",
    title: "How Plumbers Find Hidden Leaks Without Digging Up Your Floors",
    category: "Damp & Leaks",
    excerpt:
      "A hidden water leak can run for months before you notice it — quietly damaging floor structures, wall plaster, and even foundations. Modern leak detection uses listening devices, thermal imaging, and tracer gas to find leaks without unnecessary excavation.",
    content: `
<h2>Why Hidden Leaks Are So Damaging</h2>
<p>A visible dripping tap wastes water and costs money. A hidden leak — inside a wall, beneath a concrete floor, or running through a ceiling void — does all of that and more, often for weeks or months before the homeowner has any idea. By the time a damp patch appears on a wall or the floor starts to feel soft, significant structural damage may already have occurred.</p>
<p>In Peterborough's hard water area, pipes also face faster limescale-related degradation and increased stress on joints, making slow hidden leaks a genuine risk in properties over 20–30 years old. Our <a href="/services/damp-leak-detection">damp and leak detection service</a> uses professional equipment to find leaks precisely — minimising the need to open up walls, floors, or ceilings unnecessarily.</p>

<h2>The Traditional Approach and Its Limits</h2>
<p>The old approach to finding a hidden leak was simple: keep looking until you found wet material, then open up walls or floors until you found the pipe. Effective eventually — but potentially destructive and expensive, involving replastering, retiling, and re-flooring areas that weren't the source of the problem. Modern leak detection avoids almost all of this.</p>

<h2>The Four Main Detection Methods</h2>
<h3>1. Acoustic Leak Detection</h3>
<p>Water escaping under pressure produces sound — a hiss or vibration that travels through the surrounding material. Acoustic listening equipment amplifies this sound through sensitive ground microphones and listening rods, allowing an engineer to trace the noise to its strongest point. This method is particularly effective for mains supply pipes running beneath concrete or tarmac, and for heating pipework under screed floors.</p>
<p>The engineer works methodically across the property, narrowing down the location progressively. A skilled operator can pinpoint the leak to within 15–30 cm — meaning excavation, if needed, is targeted rather than exploratory.</p>

<h3>2. Thermal Imaging</h3>
<p>A thermal imaging camera detects differences in surface temperature invisible to the naked eye. A leaking pipe inside a wall or under a floor cools the surrounding material differently from dry areas — creating a temperature signature that shows clearly on a thermal camera screen.</p>
<p>Thermal imaging is fast, non-invasive, and works without any contact with the surface being scanned. It's particularly useful for underfloor heating systems, where a leak in one circuit affects the floor temperature pattern in a way the camera can map precisely. It also works well for identifying the full extent of water spread after a leak — showing how far moisture has tracked beyond the visible damage.</p>

<h3>3. Tracer Gas Detection</h3>
<p>For pipes carrying pressurised water where acoustic or thermal methods can't provide enough precision — such as supply pipes deep in a slab, or beneath heavily insulated floors — tracer gas is injected into the pipe. A hydrogen/nitrogen mix is used (non-toxic, non-flammable). The gas escapes at the leak point and rises through the floor or ground. An engineer using a gas detector probe traces the gas concentration to its highest point, directly above the leak.</p>
<p>Tracer gas is the most precise detection method available and is often used when an initial acoustic survey narrows a leak to a general area but can't pinpoint it to within excavation accuracy.</p>

<h3>4. Moisture Mapping and Damp Meters</h3>
<p>Before and after any leak detection survey, moisture meters are used to map the extent of water damage in surrounding materials. This tells the engineer how far moisture has spread, confirms whether suspected areas are genuinely damp or just cold, and provides a baseline for drying monitoring after the repair.</p>
<p>Moisture mapping is also used independently when there's a damp or mould problem and the source isn't yet clear — to determine whether the moisture is coming from a plumbing leak, condensation, or rising damp.</p>

<h2>What Happens During a Detection Survey</h2>
<p>A typical hidden leak investigation starts with an audit of the property's plumbing system — isolating circuits, checking meter readings, and pressure-testing sections to confirm where pressure is being lost. This narrows the search to a specific system or pipe run before any detection equipment is deployed.</p>
<p>The engineer then uses whichever method (or combination of methods) is best suited to the construction type and pipe location. A full detection survey typically takes 2–4 hours. You receive a written report of findings, the confirmed location of the leak, and a recommended repair method — whether that's a patch repair, a section re-route, or a more significant repair where pipe condition is poor.</p>
<p>Read our guide on <a href="/guides/hidden-water-leak-signs">hidden water leak warning signs</a> to understand what to look for before calling a detection engineer.</p>

<h2>When to Book a Leak Detection Survey</h2>
<p>Contact our <a href="/services/damp-leak-detection">leak detection team</a> if:</p>
<ul>
<li>Your water meter is moving when all appliances and taps are off</li>
<li>You have unexplained damp patches on walls, ceilings, or floors</li>
<li>You can hear running water in a pipe when nothing is turned on</li>
<li>Your boiler keeps losing pressure with no obvious explanation</li>
<li>You've had an insurance claim for escape of water and need an engineer's report</li>
<li>Your water bills have increased with no change in usage</li>
</ul>
<p><a href="/book">Book a detection survey online</a> or call 02039514510. Our engineers cover Peterborough, Stamford, Market Deeping, Yaxley, and Whittlesey.</p>

<h2>Frequently Asked Questions</h2>
<h3>Will the engineer need to open my walls or floor?</h3>
<p>The survey itself is entirely non-invasive. If a leak is found, repair may require access to the pipe — but because detection is precise, any opening is targeted to the minimum necessary. Many leaks in accessible locations are repaired with minimal disruption. Leaks in deep slabs may require a small core drill or a single targeted excavation rather than extensive exploratory work.</p>

<h3>How accurate is acoustic leak detection?</h3>
<p>In the right conditions — a pressurised pipe in solid substrate — acoustic detection can locate a leak to within 15–30 cm. Background noise, pipe depth, and floor material all affect accuracy. On complex surveys, a combination of acoustic and tracer gas methods is used to cross-check results and increase confidence before any floor or wall is opened.</p>

<h3>Does my insurance cover leak detection costs?</h3>
<p>Many home insurance policies include trace and access cover, which pays for the cost of locating a hidden leak (including the cost of cutting into walls or floors to find it) as well as reinstating any surfaces disturbed in the process. Check your policy schedule — trace and access is a separate named benefit, not always included in standard cover. Your insurer may also require a plumber's report confirming the leak location before authorising the repair.</p>

<h3>Can a hidden leak cause structural damage?</h3>
<p>Yes — a slow leak running undetected beneath a concrete slab or within a timber floor structure can undermine foundations, cause floor boarding to rot, promote mould growth in wall cavities, and eventually weaken the structural integrity of the surrounding material. The longer it runs, the more extensive the damage. Early detection and repair is always significantly cheaper than remediation after long-term saturation.</p>
    `.trim(),
    seoTitle: "How Plumbers Find Hidden Leaks | Acoustic, Thermal & Tracer Gas",
    seoDescription:
      "Discover how professional leak detection works — acoustic listening, thermal imaging, and tracer gas methods that find hidden leaks without unnecessary excavation.",
    status: "Published",
    publishedAt: new Date("2026-03-18"),
  },

  // ─── 6. Pre-Purchase Plumbing Survey Guide ────────────────────────────────
  {
    slug: "pre-purchase-plumbing-survey-guide",
    title: "Pre-Purchase Plumbing Survey: What It Is and Why You Need One",
    category: "Local Guides",
    excerpt:
      "A standard homebuyer survey rarely covers the condition of the plumbing and drainage in any meaningful detail. Here's what a specialist pre-purchase plumbing survey does — and why it's worth having before you exchange.",
    content: `
<h2>What a Standard Survey Misses</h2>
<p>When you buy a property, you'll almost certainly have a survey carried out. A RICS homebuyer report or full structural survey will assess the building's condition — roof, walls, floors, windows, and general state of repair. What it won't do is test whether the hot water works, inspect the boiler flue condition, check the drainage under the ground, or tell you whether the pipework is original lead. That's not what those surveys are for.</p>
<p>A <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a> fills that gap. It's a specialist inspection of everything the RICS surveyor walks past — and for buyers purchasing older Peterborough properties, period homes in Stamford, or houses that have been tenanted for years, it's one of the most valuable investments you'll make before exchange.</p>

<h2>What a Pre-Purchase Plumbing Survey Covers</h2>
<p>A thorough plumbing survey covers the complete water and heating installation — both what's visible and what can be inspected without opening up walls or floors:</p>
<ul>
<li><strong>Boiler</strong> — make, age, model, condition, flue integrity, and a functional test of heating and hot water. We note whether it's Gas Safe registered and whether the annual service record is up to date.</li>
<li><strong>All taps, showers, and baths</strong> — tested for flow, temperature, drainage speed, and condition. Mixer showers and thermostatic valves checked for correct operation.</li>
<li><strong>Toilets</strong> — cistern fill, flush mechanism, pan seal, and waste connection.</li>
<li><strong>Visible pipework</strong> — material identification (copper, lead, plastic), condition of joints, evidence of previous repairs or leaks, and any pipework in unheated spaces at risk of freezing.</li>
<li><strong>Water pressure and flow rate</strong> — tested at multiple points to identify low pressure, weak flow, or pressure imbalances between upstairs and downstairs.</li>
<li><strong>Hot water cylinder or thermal store</strong> — condition, age, insulation, and correct operation of controls and safety valves (if applicable).</li>
<li><strong>Radiators</strong> — checked for heating performance, balance, and condition. Cold spots or signs of corrosion noted.</li>
<li><strong>Drainage</strong> — visual inspection of external gullies, manholes, and visible waste pipes. Slow drainage tested at sinks and baths. We can recommend a <a href="/services/drain-blockages">CCTV drain survey</a> if underground drainage condition is uncertain.</li>
<li><strong>Cold water storage tank</strong> (where fitted) — condition, lid, insulation, and ball valve operation.</li>
</ul>

<h2>What It Doesn't Cover</h2>
<p>A plumbing survey is a non-invasive inspection. It doesn't open walls, lift floors, or inspect concealed pipework. Gas supply pipework is visually inspected but a full gas safety test requires a separate CP12 check by a Gas Safe engineer. Drainage beneath the ground requires a separate CCTV survey if detailed condition is needed. These can be arranged at the same time — many buyers combine a plumbing survey with a drain camera inspection for complete peace of mind.</p>

<h2>Who Should Get One</h2>
<p>A pre-purchase plumbing survey is particularly valuable when buying:</p>
<ul>
<li><strong>Any property built before 1970</strong> — original pipework may be lead (for supply) or clay (for drainage), and the boiler may be on its last legs</li>
<li><strong>Tenanted properties</strong> — rented homes are often run on minimal maintenance; problems are easier to spot before you own them</li>
<li><strong>Properties with new or recently replaced bathrooms</strong> — cosmetic renovations can conceal poor workmanship behind new tiles</li>
<li><strong>Properties with extensions or conversions</strong> — plumbing added under permitted development isn't always inspected; connections to the original system may be substandard</li>
<li><strong>Period properties in Stamford</strong> — stone-built Georgian and Victorian homes present specific challenges including old lead pipework, limited access for modern boiler installation, and centuries-old clay drains</li>
</ul>

<h2>The Survey Report</h2>
<p>You receive a written report that describes the condition of each element surveyed, identifies any defects, and categorises them by urgency: immediate action required, action within 6 months, monitor, or satisfactory. Photographs accompany every defect noted.</p>
<p>This report gives you three options: proceed with full knowledge of what you're buying, negotiate a price reduction to reflect any required work, or make completion conditional on the vendor addressing specific items. Your solicitor can reference the report directly in pre-exchange correspondence.</p>

<h2>Peterborough Property Types and What to Look For</h2>
<p>Different parts of Peterborough present different plumbing challenges:</p>
<ul>
<li><strong>City centre period properties (PE1)</strong> — likely to have old clay drainage, possible lead supply pipes, and boilers that have been serviced irregularly</li>
<li><strong>1960s–1970s estates in Bretton, Orton, and Werrington</strong> — original copper pipework ageing, possible asbestos flue materials on older boilers, heating systems that haven't been balanced in decades</li>
<li><strong>New build developments in Hampton and Cardea</strong> — generally sound but worth checking system balance, boiler warranty status, and that all commissioning documentation has been provided</li>
<li><strong>Stamford Georgian and Victorian stock</strong> — stone construction with deep-set pipes, often converted from oil or solid fuel to gas, presenting specific flue routing and pipe access challenges</li>
</ul>

<h2>Booking a Survey</h2>
<p>Surveys are typically carried out within 5–7 days of booking and take between 2 and 4 hours depending on property size. <a href="/book">Book a pre-purchase survey online</a> or call 02039514510 to discuss what's included and whether a combined drain survey is advisable for the specific property.</p>

<h2>Frequently Asked Questions</h2>
<h3>Is a pre-purchase plumbing survey the same as a homebuyer survey?</h3>
<p>No — they are entirely separate. A RICS homebuyer or structural survey covers the building fabric: walls, roof, floors, damp, and structural condition. It is not a functional test of the plumbing or heating installation and rarely involves testing taps, flushing toilets, or assessing boiler condition in any detail. A specialist plumbing survey is the only way to get a proper assessment of the water, heating, and drainage systems.</p>

<h3>Can I get a survey done before my offer is accepted?</h3>
<p>You can arrange a survey at any point — but practically, most buyers arrange them after an offer has been accepted and before exchange. Some buyers on competitive properties carry out a survey before making an offer to give themselves certainty. We can often accommodate short notice surveys in urgent situations.</p>

<h3>What if the survey finds a serious problem?</h3>
<p>A serious defect — a failed boiler, lead pipework throughout, or a collapsed drain — does not automatically mean you should pull out. It gives you documented evidence to either negotiate a reduced purchase price, request the vendor carries out repairs before completion, or walk away with confidence if the cost of remediation is prohibitive. Knowledge is always better than the alternative.</p>

<h3>Do new build properties need a plumbing survey?</h3>
<p>Less commonly, but it can still be worthwhile. New builds in Peterborough frequently have unbalanced heating systems, low pressure issues at the end of supply runs, and boilers that haven't been commissioned with a full service record. Our guide to <a href="/blog/new-build-peterborough-plumbing-guide">new build plumbing checks in Peterborough</a> covers what to look for specifically.</p>
    `.trim(),
    seoTitle: "Pre-Purchase Plumbing Survey: What It Covers and Why You Need One",
    seoDescription:
      "A standard homebuyer survey doesn't test your plumbing. Find out what a specialist pre-purchase plumbing survey covers, who needs one, and what happens with the report.",
    status: "Published",
    publishedAt: new Date("2026-03-21"),
  },

  // ─── 7. Leak Detection Cost ───────────────────────────────────────────────
  {
    slug: "leak-detection-cost-uk",
    title: "How Much Does Leak Detection Cost in the UK?",
    category: "Damp & Leaks",
    excerpt:
      "Leak detection costs vary significantly depending on the type of leak, its location, and the detection method required. Here's a clear guide to what you can expect to pay — and what your insurance may cover.",
    content: `
<h2>Why Leak Detection Costs Vary So Much</h2>
<p>Ask three different plumbers for a leak detection quote without specifying the type of leak and you'll get three very different answers. That's because finding a dripping tap under a sink is nothing like locating a hairline crack in a pressurised pipe buried beneath a concrete floor. The cost reflects the method, the time, and the equipment required — not arbitrary pricing.</p>
<p>This guide breaks down what you can expect to pay for each type of leak detection — and when your insurance should be covering the cost, not you.</p>

<h2>Types of Leak Detection and Typical Costs</h2>

<h3>Simple Visible Leak Investigation (£60–£120 call-out)</h3>
<p>If a leak is suspected but not yet confirmed, a plumber's initial call-out involves a systematic check of accessible pipework, appliance connections, and fittings. If the leak is visible — a dripping joint under a sink, a weeping radiator valve, a loose washing machine connection — the investigation and repair are typically completed in one visit at a standard call-out rate. No specialist equipment needed.</p>

<h3>Acoustic Leak Detection Survey (£200–£400)</h3>
<p>For a hidden leak in underground pipework, beneath a concrete floor, or within a wall cavity, acoustic listening equipment is used to pinpoint the source by tracing sound. A survey of a standard domestic property typically takes 2–4 hours. The fee covers the engineer's time, equipment, and a written report with the confirmed leak location. This is the most common type of specialist leak detection survey.</p>

<h3>Thermal Imaging Survey (£200–£350)</h3>
<p>A thermal camera survey scans floors, walls, and ceilings for temperature anomalies caused by leaking water. Particularly effective for underfloor heating leaks and for mapping the spread of moisture after a leak event. Often combined with acoustic detection on the same visit for a more comprehensive survey, with a combined fee typically in the £300–£450 range.</p>

<h3>Tracer Gas Detection (£350–£600)</h3>
<p>The most precise method — used when acoustic detection has narrowed a leak to a general area but can't pinpoint it to excavation accuracy. A hydrogen/nitrogen gas mix is injected into the pipe and traced to the point of escape using a sensitive probe. Time-consuming and requiring specialist equipment, this carries the highest survey cost — but it almost always avoids the need for extensive exploratory excavation, which saves significantly more in the long run.</p>

<h3>CCTV Drain Survey (£150–£350)</h3>
<p>When the suspected leak is in underground drainage rather than a supply or heating pipe, a <a href="/services/drain-blockages">CCTV drain survey</a> is the appropriate tool. A camera is fed through the drain to inspect the pipe interior. Costs depend on the number of access points and the length of drain run surveyed. A written report and video footage are included.</p>

<h2>What Affects the Cost</h2>
<ul>
<li><strong>Leak type</strong> — mains supply pipe leaks, underfloor heating leaks, underground drainage, and boiler system leaks each require different methods and time</li>
<li><strong>Property size and access</strong> — larger properties with more pipe runs take longer to survey; concrete slab floors require more investigation time than suspended timber</li>
<li><strong>Location in the property</strong> — a leak clearly in one room is quicker to pinpoint than one with no obvious source affecting the whole house</li>
<li><strong>Report requirements</strong> — if you need a full written report for insurance purposes, allow for this in the quote</li>
</ul>

<h2>What Your Insurance Should Cover</h2>
<p>This is the part most homeowners don't know about until they need it. Many home insurance policies include <strong>trace and access cover</strong> — a specific benefit that pays for the cost of finding a hidden leak and reinstating any surfaces disturbed to reach it (cutting into walls, lifting floorboards, breaking up screed). This is separate from the repair cost itself.</p>
<p>Trace and access limits vary by policy — typically £5,000 to £10,000 — but in most cases this is more than sufficient to cover the detection survey, any surface opening required to access the pipe, and reinstatement of the opened area. The repair itself (the new section of pipe, the joints, and the labour to fit them) is usually covered under the escape of water section of your policy.</p>
<p>Check your policy schedule before you book a leak detection survey. If trace and access cover applies, report the suspected leak to your insurer first — they may have preferred contractors, or may require pre-authorisation before specialist work begins.</p>

<h2>When to Call Us</h2>
<p>Our <a href="/services/damp-leak-detection">damp and leak detection</a> team serves Peterborough, Stamford, Market Deeping, Yaxley, and surrounding areas. When you call, we'll discuss the symptoms, recommend the most appropriate detection method, and give you a fixed price for the survey before we start — no open-ended hourly rates. <a href="/book">Book online</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can a plumber find a hidden leak without specialist equipment?</h3>
<p>In some cases — if the leak is audible, if damp patterns clearly point to a location, or if the pipe run is simple enough to pressure-test section by section. But for leaks in concrete floors, behind tiles, or in underground supply pipes, specialist acoustic or tracer gas equipment is required for reliable results. Without it, you risk the engineer opening up areas that don't contain the leak, increasing reinstatement costs significantly.</p>

<h3>Does trace and access cover the cost of replastering or retiling?</h3>
<p>Yes — trace and access specifically includes reinstatement of any surfaces opened to locate the leak. That typically covers cutting and patching plaster, lifting and relaying floorboards, and in some policies, retiling where tiles have been broken to access a pipe. The precise scope depends on your policy wording — review it or ask your insurer before work begins.</p>

<h3>Is there a call-out charge on top of the survey fee?</h3>
<p>At Peterborough Plumbers, no — our survey fees are fixed and all-inclusive. There are no separate call-out charges or parking fees added to the bill. The price quoted is the price you pay.</p>

<h3>What happens if the survey can't find the leak?</h3>
<p>A properly conducted survey with appropriate equipment very rarely fails to identify a leak that is causing measurable pressure loss or visible damp. If an initial method proves inconclusive, a second method (e.g. tracer gas following acoustic) is recommended at an agreed additional cost before any surface is opened. We won't recommend excavation without a confirmed location.</p>
    `.trim(),
    seoTitle: "How Much Does Leak Detection Cost in the UK? | 2026 Price Guide",
    seoDescription:
      "Leak detection costs explained — acoustic surveys, thermal imaging, tracer gas, and CCTV drain surveys. What each costs, what affects the price, and what your insurance covers.",
    status: "Published",
    publishedAt: new Date("2026-03-24"),
  },

  // ─── 8. HMO Plumbing Requirements ────────────────────────────────────────
  {
    slug: "hmo-plumbing-requirements-landlords",
    title: "HMO Plumbing Requirements: What Landlords Must Provide",
    category: "Landlord & Legal",
    excerpt:
      "Houses in multiple occupation have stricter plumbing requirements than standard rentals. Here's what the law requires — bathroom ratios, hot water standards, heating obligations, and gas safety duties — and how to get your property inspection-ready.",
    content: `
<h2>What Makes HMO Plumbing Different</h2>
<p>A standard rental property has one household using the bathrooms, kitchen, and boiler. An HMO (house in multiple occupation) has several unrelated tenants sharing facilities — placing far greater demand on the plumbing and creating legal obligations that go beyond the requirements for a standard let.</p>
<p>Peterborough City Council licences HMOs under its mandatory and selective licensing schemes, and inspections under the Housing Health and Safety Rating System (HHSRS) assess plumbing provision directly. Getting the plumbing wrong — inadequate bathroom provision, insufficient hot water, or failing gas safety — can result in licence refusal, improvement notices, and substantial fines.</p>
<p>Our <a href="/services/landlord-services">landlord plumbing services</a> help HMO landlords across Peterborough meet their obligations efficiently and with documented compliance at every stage.</p>

<h2>Bathroom and Toilet Ratio Requirements</h2>
<p>The minimum acceptable provision of bathroom and toilet facilities in an HMO is set by the government's Management of Houses in Multiple Occupation (England) Regulations 2006 and local licensing conditions, which can be stricter than the national baseline.</p>
<p>As a general guideline, Peterborough City Council (in line with most English councils) applies the following minimum ratios:</p>
<ul>
<li><strong>1 bathroom/shower room and WC</strong> — for up to 4 occupants</li>
<li><strong>2 bathrooms/shower rooms and WCs</strong> — for 5–9 occupants</li>
<li><strong>3 bathrooms/shower rooms and WCs</strong> — for 10–14 occupants</li>
</ul>
<p>Bathrooms and WCs used exclusively by a single household within a shared house do not count towards the shared provision. Always verify the exact requirements with Peterborough City Council's private sector housing team before a licence application — local conditions can exceed the national minimum.</p>

<h2>Hot Water Requirements</h2>
<p>Every bathroom, shower, and kitchen sink in an HMO must have access to an adequate supply of hot water at all times. The HHSRS defines "adequate" in terms of both temperature and flow — hot water must reach at least 50°C at the outlet to prevent Legionella growth, while being delivered safely to prevent scalding risk (typically via thermostatic mixing valves set to 43–46°C at the point of use).</p>
<p>In practice, this means:</p>
<ul>
<li>The hot water system must be capable of supplying all occupants concurrently during peak demand periods — not just one at a time</li>
<li>A combi boiler adequate for a 3-bedroom family home is typically <strong>not</strong> adequate for a 6-person HMO. System boilers with appropriately sized unvented cylinders are more common for larger HMOs</li>
<li>Thermostatic mixing valves (TMVs) are strongly recommended — and often required under HMO licensing conditions — on all bathroom outlets to protect vulnerable occupants from scalding</li>
</ul>
<p>If you're converting a property to an HMO or increasing the number of permitted occupants, the hot water system capacity needs specific assessment. Our team can advise on the appropriate system size and configuration.</p>

<h2>Heating Requirements</h2>
<p>Every habitable room in an HMO must be capable of being heated to at least 18°C when the external temperature is -1°C. In practice, this means a central heating system with adequately sized radiators in every room, or approved fixed electric heating — not portable plug-in heaters, which don't satisfy the requirement.</p>
<p>Heating controls must be accessible to all occupants — shared time controls that one tenant can set to exclude others from the heating schedule are not acceptable. Smart controls that individual rooms or tenants can manage independently are increasingly common in HMOs for this reason.</p>

<h2>Gas Safety Obligations for HMO Landlords</h2>
<p>The gas safety requirements for HMOs are the same as for standard rentals — an annual <a href="/services/gas-safety-certificates">Gas Safety Certificate (CP12)</a> for every gas appliance — but the complexity is greater for several reasons:</p>
<ul>
<li>Tenant changeover is more frequent in HMOs. The CP12 must be provided to every new tenant before they move in, and to existing tenants within 28 days of the annual check</li>
<li>Gas boilers in HMOs are under heavier use and need more frequent servicing attention</li>
<li>Access for annual checks can be harder when multiple tenants occupy the property simultaneously</li>
</ul>
<p>Read our guide on <a href="/blog/landlord-gas-safety-guide">landlord gas safety obligations</a> for a full breakdown of the CP12 requirements and record-keeping rules.</p>

<h2>Water Safety: Legionella Risk Assessment</h2>
<p>HMOs are higher-risk properties for Legionella bacteria growth — which thrives in warm, stagnant water. Landlords of HMOs have a specific duty under the Health and Safety at Work Act 1974 (and associated Approved Code of Practice L8) to carry out a written Legionella risk assessment for the water system and to implement and document control measures.</p>
<p>Practical control measures include: setting the hot water cylinder to maintain 60°C, ensuring all outlets are regularly used (flushing little-used outlets weekly), fitting thermostatic mixing valves, insulating cold water pipes, and checking that any cold water storage tanks are properly covered and maintained.</p>

<h2>Getting Ready for an HMO Licence Inspection</h2>
<p>When the council inspects your property for an HMO licence, they will assess the plumbing provision as part of the HHSRS rating. Issues that commonly cause licence delays or refusals include:</p>
<ul>
<li>Insufficient bathroom provision for the number of permitted occupants</li>
<li>Boiler or hot water system inadequate for occupancy level</li>
<li>Missing or out-of-date gas safety certificate</li>
<li>Lack of TMVs on bath or shower outlets</li>
<li>Heating unavailable in habitable rooms</li>
<li>No written Legionella risk assessment</li>
</ul>
<p>Our <a href="/services/landlord-services">landlord services</a> team can carry out a pre-application plumbing assessment, identify any compliance gaps, and complete all required work under a single contract — giving you documented evidence of compliance before the inspector visits. <a href="/book">Book an assessment online</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does an HMO need a separate boiler from the rest of the house?</h3>
<p>Not necessarily a separate boiler, but the boiler and hot water system must be sized appropriately for the number of occupants. A combi boiler that's adequate for a family home is rarely sufficient for 5+ unrelated tenants. A system boiler with an unvented cylinder, or a commercial-grade combination unit, is typically the right solution for larger HMOs.</p>

<h3>How often does gas safety need to be checked in an HMO?</h3>
<p>Annually — the same as any rented property. A Gas Safety Certificate (CP12) must be obtained every 12 months by a Gas Safe registered engineer, and provided to all tenants. For HMOs with higher turnover, keep a careful log of certificate dates and tenant move-in dates to ensure no tenant occupies the property without a valid, in-date certificate on file.</p>

<h3>Can tenants in an HMO adjust the central heating?</h3>
<p>Yes — and this is an HHSRS requirement. Heating controls must be accessible and usable by all occupants without unreasonable restriction. A single programmer controlled by the landlord or a single tenant that others cannot override does not satisfy this requirement. Zone controls or individual room thermostats are preferred solutions.</p>

<h3>Is a Legionella risk assessment a legal requirement for HMOs?</h3>
<p>Yes. The Health and Safety Executive's Approved Code of Practice L8 requires all landlords with HMOs to carry out a written Legionella risk assessment. It is not required to be carried out by a specialist — a competent person, including the landlord, can complete it — but it must be documented and control measures implemented and recorded. Many landlords have a plumber complete it as part of an annual maintenance visit.</p>
    `.trim(),
    seoTitle: "HMO Plumbing Requirements | What Landlords Must Provide in the UK",
    seoDescription:
      "HMO plumbing requirements explained: bathroom ratios, hot water standards, heating obligations, gas safety, and Legionella duties. A complete guide for UK HMO landlords.",
    status: "Published",
    publishedAt: new Date("2026-03-27"),
  },

  // ─── 9. Bathroom Renovation Peterborough ─────────────────────────────────
  {
    slug: "plan-bathroom-renovation-peterborough",
    title: "How to Plan a Bathroom Renovation in Peterborough",
    category: "Local Guides",
    excerpt:
      "A bathroom renovation is one of the most involved home improvement projects — multiple trades, a tight space, and decisions that are very hard to reverse once the tiles go on. Here's how to plan it properly from the start.",
    content: `
<h2>Start With the Brief, Not the Products</h2>
<p>The most common mistake homeowners make when planning a bathroom renovation is starting with a mood board. Before you decide on tiles, fittings, or finish, get the functional brief right: who uses the bathroom, how many people at peak times, what the room needs to do, and what its limitations are. A beautiful bathroom that doesn't suit how your household actually lives is a renovation you'll regret within a year.</p>
<p>Once the brief is clear, everything else — layout, fixtures, budget, and trades — follows logically from it.</p>

<h2>Layout First: What Can and Can't Move</h2>
<p>Moving plumbing is the most expensive part of any bathroom renovation. Before you fall in love with a layout you've seen online, understand which elements your plumber can reasonably relocate and which come at significant additional cost:</p>
<ul>
<li><strong>Toilet</strong> — the soil pipe (the large-diameter waste pipe carrying WC waste) is the hardest element to move. Relocating the toilet more than a metre or so from the existing soil stack typically requires re-routing the soil pipe through the floor or wall, which adds substantially to the cost. Keeping the toilet in roughly the same position is the single most cost-effective decision in a bathroom refit.</li>
<li><strong>Basin and bath/shower</strong> — these run on smaller-diameter waste pipes and are much easier to reposition. Supply pipes are flexible to route. Moving a basin or repositioning a shower tray is routine.</li>
<li><strong>Bath vs shower enclosure vs wet room</strong> — this is the most significant structural decision. A wet room requires a fully tanked floor and specific drainage — it's not a like-for-like swap with a shower tray. If you're considering a wet room, discuss it with your plumber before anything else is planned. Our guide to <a href="/blog/wet-room-vs-shower-enclosure">wet room vs shower enclosure</a> covers the differences in cost and what's involved.</li>
</ul>

<h2>Which Trades Are Involved — and in What Order</h2>
<p>A bathroom renovation typically involves at least two trades: a plumber and an electrician. Depending on the scope, you may also need a tiler and a plasterer. Getting the order right matters:</p>
<ol>
<li><strong>First fix plumbing</strong> — supply pipes and waste pipes are repositioned or extended to serve the new layout. Boiler may need to be checked for the new shower demand.</li>
<li><strong>First fix electrics</strong> — new circuit for the shower, extractor fan wiring, shaver socket, lighting.</li>
<li><strong>Plastering / waterproofing</strong> — walls skimmed or tanked as needed, cement board behind tiled areas.</li>
<li><strong>Tiling</strong> — walls and floor tiles laid.</li>
<li><strong>Second fix plumbing</strong> — sanitaryware fitted, bath or shower tray and screen fitted, taps and waste connections completed.</li>
<li><strong>Second fix electrics</strong> — sockets, switches, light fittings, and extractor fan connected.</li>
<li><strong>Decoration</strong> — painting, sealant, accessories.</li>
</ol>
<p>Our <a href="/services/bathroom-installations">bathroom installation service</a> coordinates all plumbing elements and can advise on how to sequence other trades effectively. We work with trusted local tilers and electricians if a fully managed installation is preferred.</p>

<h2>What Your Plumber Needs to Know Before Starting</h2>
<p>When you contact us for a bathroom renovation quote, we'll want to know:</p>
<ul>
<li>Whether the toilet position is staying or moving</li>
<li>Whether you're changing from a bath to a shower, adding a shower over a bath, or planning a wet room</li>
<li>Whether the existing shower is electric, mixer, or power shower — and what you'd like it to be</li>
<li>Whether you have a combi boiler or a hot water cylinder (this affects what shower types are suitable)</li>
<li>Whether there's any existing damp, mould, or structural concern in the room</li>
</ul>
<p>For a rough cost guide, see our <a href="/guides/bathroom-installation-cost-peterborough">bathroom installation cost guide for Peterborough</a> — it covers typical pricing for full refits, sanitaryware only, and individual elements like shower installation or bath replacement.</p>

<h2>Peterborough-Specific Considerations</h2>
<p>A few things worth knowing if your property is in the Peterborough area:</p>
<ul>
<li><strong>Hard water</strong> — Peterborough has very hard water. Glass screens and chrome fittings show limescale quickly, and shower heads and taps need regular descaling. A water softener or limescale inhibitor fitted upstream of the bathroom makes a real difference to maintenance. Discuss this when booking your renovation.</li>
<li><strong>1930s–1960s housing in Bretton, Orton, and Werrington</strong> — these properties often have very small original bathrooms with low ceilings and limited pipe access. Some have original lead supply pipes still intact. A pre-renovation plumbing check is worth the time before tiles come off.</li>
<li><strong>Hampton new build properties</strong> — modern bathrooms but sometimes with lower-than-expected mains pressure at the end of supply runs. If shower pressure is disappointing, a pump solution may be needed alongside the renovation.</li>
</ul>

<h2>Budget: Where the Money Goes</h2>
<p>A full bathroom renovation in Peterborough — new sanitaryware, tiling, and all labour — typically runs from £3,500 to £8,000 depending on room size, specification, and whether any layout changes are involved. The biggest variables are: whether the toilet moves, whether a wet room waterproofing system is required, and the specification of fittings. Budget breakdowns by type are in our <a href="/guides/bathroom-installation-cost-peterborough">cost guide</a>. <a href="/book">Book a survey and quote</a> or call 02039514510.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does a bathroom renovation take in Peterborough?</h3>
<p>A straightforward like-for-like bathroom refurbishment — same layout, new sanitaryware and tiles — typically takes 5–7 working days. A full renovation with layout changes, wet room conversion, or complex tiling can take 10–14 days. Our guide to <a href="/blog/bathroom-installation-time-uk">how long a bathroom installation takes</a> covers timelines in more detail.</p>

<h3>Do I need planning permission for a bathroom renovation?</h3>
<p>In most cases, no — internal bathroom work is permitted development. Exceptions include listed buildings (which require listed building consent for any internal alterations), and properties in conservation areas where removing a bath in a principal elevation window may require permission. If your property is in Stamford's conservation area or is listed, check with South Kesteven District Council before starting.</p>

<h3>Can I keep using the bathroom while work is ongoing?</h3>
<p>Realistically, no — once first fix plumbing starts, the bathroom is out of use until second fix is complete. Most renovations run 5–10 days without a functional bathroom. If you have a second WC elsewhere in the property, the disruption is more manageable. For households without a second bathroom, we try to schedule work so the WC is reconnected at the end of each day where possible.</p>

<h3>Should I buy the sanitaryware myself or let my plumber supply it?</h3>
<p>Either works — but if you supply the sanitaryware yourself, make sure it arrives on site before the plumber starts second fix. Delays caused by late delivery extend the job. Also note that we warranty workmanship on supplied sanitaryware, but cannot warranty the products themselves if they're supplied by the customer. For complete peace of mind, we're happy to supply from our trade accounts — often at competitive prices.</p>
    `.trim(),
    seoTitle: "How to Plan a Bathroom Renovation in Peterborough | Full Guide",
    seoDescription:
      "Planning a bathroom renovation in Peterborough? From layout decisions and trade sequencing to costs and local property considerations — a practical guide before you start.",
    status: "Published",
    publishedAt: new Date("2026-03-30"),
  },

  // ─── 10. Carbon Monoxide and Your Boiler ──────────────────────────────────
  {
    slug: "carbon-monoxide-boiler-safety",
    title: "Carbon Monoxide and Your Boiler: What Every Homeowner Needs to Know",
    category: "Boiler & Heating",
    excerpt:
      "Carbon monoxide is colourless, odourless, and responsible for around 40 deaths in UK homes every year. Most are preventable. Here's what causes CO from a boiler, how to protect your household, and what to do if your alarm sounds.",
    content: `
<h2>The Gas You Can't Sense Until It's Too Late</h2>
<p>Carbon monoxide (CO) has no colour, no smell, and no taste. It doesn't irritate your eyes or throat to warn you it's there. By the time most people realise they've been exposed, they're already too unwell to act — which is why it kills around 40 people in UK homes every year and sends over 4,000 to A&E.</p>
<p>The leading domestic source of carbon monoxide is a faulty or poorly maintained gas boiler. The good news is that the combination of an annual <a href="/services/boiler-service">boiler service</a> by a Gas Safe registered engineer and a working CO alarm makes CO poisoning almost entirely preventable in a modern home.</p>

<h2>How Boilers Produce Carbon Monoxide</h2>
<p>A correctly operating gas boiler burns natural gas in a controlled combustion process that produces carbon dioxide (CO₂) and water vapour — both harmless in the quantities produced and safely vented through the flue to outside. Carbon monoxide is produced when combustion is incomplete — when the gas doesn't fully react with sufficient oxygen.</p>
<p>Incomplete combustion can occur when:</p>
<ul>
<li>The heat exchanger is cracked or corroded, allowing combustion products to mix with the water circuit or the room air</li>
<li>The flue is blocked, damaged, or incorrectly fitted — preventing combustion gases from escaping outside</li>
<li>The burner is dirty or damaged, producing an incomplete burn</li>
<li>Ventilation to the boiler cupboard is inadequate, restricting the oxygen supply needed for complete combustion</li>
<li>The boiler is significantly older and has never been properly maintained</li>
</ul>
<p>This is why combustion analysis — testing the CO/CO₂ ratio in the flue gases — is a mandatory part of every boiler service. It's the only way to confirm that the combustion process is safe and that no CO is escaping into the living space.</p>

<h2>Symptoms of Carbon Monoxide Poisoning</h2>
<p>CO poisoning symptoms are often mistaken for flu, a virus, or a bad headache — because CO deprives the body of oxygen in a way that mimics those conditions:</p>
<ul>
<li>Headache — often the first symptom, particularly in the morning or after time in a room with the boiler running</li>
<li>Dizziness or lightheadedness</li>
<li>Nausea or vomiting</li>
<li>Breathlessness or shortness of breath</li>
<li>Confusion or difficulty concentrating</li>
<li>Chest pain</li>
</ul>
<p>A crucial distinction from flu: CO symptoms typically improve when you leave the property and return when you go back inside. If multiple members of a household have similar symptoms at the same time — including pets, which are often affected first — this is a serious warning sign. Get everyone out of the property and call 999.</p>

<h2>Carbon Monoxide Alarms: Where to Fit Them and Which Type to Choose</h2>
<p>Since 1 October 2022, the Smoke and Carbon Monoxide Alarm (England) Regulations 2022 require a CO alarm to be installed in every room of a rented property that contains a fixed combustion appliance (including gas boilers). For owner-occupiers, CO alarms are strongly recommended but not yet legally mandated in England outside rented properties.</p>
<p>Where to position CO alarms:</p>
<ul>
<li>In every room where there is a gas appliance — including the boiler cupboard if it opens into a habitable space</li>
<li>In the main bedroom — CO poisoning is most dangerous during sleep when you can't respond to symptoms</li>
<li>On each floor of the property</li>
</ul>
<p>Choose an alarm certified to British Standard BS EN 50291. Battery-powered alarms are available from £15–£30; mains-wired combined smoke/CO detectors from £40–£70. Alarms have a limited lifespan — typically 5–7 years — after which the sensor degrades and must be replaced, regardless of whether it has ever triggered.</p>

<h2>What to Do If Your CO Alarm Sounds</h2>
<p>If your carbon monoxide alarm activates:</p>
<ol>
<li><strong>Get everyone out of the property immediately</strong> — including pets. Do not stop to collect belongings.</li>
<li><strong>Leave the door open as you leave</strong> — this helps ventilate the property.</li>
<li><strong>Call 999 from outside the property</strong> — do not go back inside. The emergency services will ventilate the building and assess whether it's safe to re-enter.</li>
<li><strong>Seek medical attention</strong> — even if you feel well. CO binds to haemoglobin for hours after exposure. A blood test at A&E can confirm whether you've been exposed.</li>
<li><strong>Do not re-enter until the emergency services have declared the property safe.</strong></li>
<li><strong>Call a Gas Safe registered engineer</strong> — before the boiler or any gas appliance is turned on again. Our <a href="/services/emergency-plumber">emergency team</a> can carry out a safety inspection and combustion analysis before you return to normal use.</li>
</ol>

<h2>The Role of Annual Boiler Servicing</h2>
<p>An annual <a href="/services/boiler-service">boiler service</a> by a Gas Safe registered engineer is the most effective measure available against CO risk from your boiler. During every service our engineers:</p>
<ul>
<li>Carry out full combustion analysis using a calibrated flue gas analyser — measuring CO and CO₂ levels in the flue gases against safe operating parameters</li>
<li>Inspect the heat exchanger for cracks or corrosion</li>
<li>Check the flue and terminal for damage, blockages, or incorrect clearance from openings</li>
<li>Verify adequate ventilation to the appliance</li>
<li>Follow the Gas Industry Unsafe Situations Procedure (GIUSP) if any unsafe condition is found — including immediately advising on making the appliance safe before leaving the property</li>
</ul>
<p>Don't wait for a fault code or a symptom. <a href="/book">Book your annual boiler service</a> now — it takes around an hour and is the single most important thing you can do for your household's safety. Call 02039514510 or book online.</p>

<h2>Landlord Obligations</h2>
<p>Landlords in England are legally required under the Smoke and Carbon Monoxide Alarm (England) Regulations 2022 to install a working CO alarm in every room with a fixed combustion appliance, and to repair or replace any alarm that is reported as faulty. This applies to both private rentals and HMOs. Read our <a href="/blog/landlord-gas-safety-guide">landlord gas safety guide</a> for the full picture on annual gas safety obligations and CP12 requirements alongside CO alarm duties.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can a new boiler produce carbon monoxide?</h3>
<p>Yes — a new boiler can produce CO if the flue is incorrectly installed, if there is inadequate ventilation to the appliance, or if a manufacturing defect causes incomplete combustion. This is why commissioning by a Gas Safe registered engineer (not just installation) is essential, and why the first annual service — typically within 12 months of installation — is required by most manufacturers to validate the warranty.</p>

<h3>How do I know if my CO alarm is working?</h3>
<p>Press the test button monthly to confirm the alarm and sounder are functioning. Note the manufacture date on the back of the unit — if the alarm is more than 5–7 years old (check the manufacturer's stated sensor lifespan), replace it regardless of whether it has ever triggered. An alarm that has passed its sensor expiry date may not detect CO reliably even if the sounder still works.</p>

<h3>What colour is a healthy boiler flame?</h3>
<p>A healthy gas boiler flame is crisp and predominantly blue, sometimes with a small inner cone of lighter blue. A yellow, orange, or flickering flame indicates incomplete combustion and is a warning sign that requires immediate attention from a Gas Safe engineer. Do not continue to use a boiler with a yellow or orange flame.</p>

<h3>Is carbon monoxide only produced by boilers?</h3>
<p>No — any gas appliance can produce CO if faulty: gas fires, gas cookers, gas water heaters, and portable gas heaters. Boilers are the most common source in UK homes because they run for long periods and are often in enclosed spaces. A CO alarm protects against all combustion sources, not just the boiler.</p>
    `.trim(),
    seoTitle: "Carbon Monoxide and Your Boiler | Safety Guide for UK Homeowners",
    seoDescription:
      "Carbon monoxide from a faulty boiler kills 40 people in the UK every year. Learn how CO is produced, the symptoms of poisoning, CO alarm guidance, and how annual servicing protects your family.",
    status: "Published",
    publishedAt: new Date("2026-04-02"),
  },
];

// ─── Seed ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding Wave 1 — 10 blog posts...\n");

  for (const post of wave1Posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: post.status,
        publishedAt: post.publishedAt,
        updatedAt: new Date(),
      },
      create: {
        slug: post.slug,
        title: post.title,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        status: post.status,
        publishedAt: post.publishedAt,
      },
    });
    console.log(`  ✓ ${post.title}`);
  }

  console.log("\nWave 1 complete. 10 posts seeded.\n");
  console.log("NOTE: Two new blog categories were introduced:");
  console.log("  • 'Drains & Drainage' — used by: cctv-drain-survey-peterborough");
  console.log(
    "  • 'Damp & Leaks' — used by: how-plumbers-find-hidden-leaks, leak-detection-cost-uk"
  );
  console.log(
    "  Update the blog filter UI if categories are hardcoded in any component.\n"
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
