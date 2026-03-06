/**
 * seed-new-guides.ts
 * Inserts 5 new guides into the database to strengthen weak content clusters.
 *
 * Run with:
 *   npx tsx prisma/seed-new-guides.ts
 *
 * Safe to re-run — uses upsert on slug.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newGuides = [
  // ─── 1. Drain Blockages cluster ──────────────────────────────────────────────
  {
    slug: "signs-drain-blocked",
    name: "Signs Your Drain Is Blocked — What to Look For",
    excerpt:
      "Blocked drains rarely happen without warning. Learn the early signs of a blocked drain so you can act before a minor problem becomes a major plumbing emergency.",
    category: "diy",
    readTime: 5,
    publishedAt: new Date("2026-03-01"),
    content: `
<h2>Why Spotting a Blocked Drain Early Matters</h2>
<p>A partially blocked drain will give you plenty of warning before it causes serious damage to your Peterborough home. The earlier you catch the signs, the cheaper and simpler the fix. Left untreated, a blocked drain can lead to sewage backing up, damp in your walls, and cracked pipes — all of which cost far more to put right.</p>

<h2>The 8 Warning Signs of a Blocked Drain</h2>

<h3>1. Slow Draining Sinks, Baths, or Showers</h3>
<p>If water is pooling and draining away slowly rather than emptying quickly, there is a partial blockage somewhere in the pipe. Hair, soap scum, and grease are the most common culprits in bathroom and kitchen drains.</p>

<h3>2. Gurgling Sounds</h3>
<p>A gurgling noise from your plughole or toilet after water drains away is a strong indicator of a partial blockage. The sound is caused by air being displaced as water forces its way through a restricted pipe.</p>

<h3>3. Unpleasant Smells</h3>
<p>A bad smell — usually damp, musty, or sewage-like — rising from a drain is caused by food waste, grease, or organic matter rotting inside the pipe. This is one of the earliest and most reliable signs of a developing blockage.</p>

<h3>4. Water Rising Up in Toilets or Sinks</h3>
<p>If water bubbles up in your toilet when you run the sink, or rises in a shower when you flush the toilet, the blockage is in a shared section of pipe further down the drainage system. This needs professional attention promptly.</p>

<h3>5. Toilet Flushing Poorly</h3>
<p>A toilet that does not flush with normal force, or that takes two flushes to clear waste, may have a partial blockage in the toilet trap or waste pipe. Do not ignore this — it will worsen over time.</p>

<h3>6. Water Pooling Around Outdoor Drains</h3>
<p>Standing water around external drain covers after rain, or water that drains much more slowly than usual, indicates a blockage in your external drainage system. Leaves, silt, and tree roots are common causes in Peterborough gardens.</p>

<h3>7. Multiple Drains Blocked Simultaneously</h3>
<p>If more than one drain in your home is slow or blocked at the same time, the problem is almost certainly in the main sewer line rather than an individual appliance pipe. This requires drain jetting or CCTV inspection by a professional.</p>

<h3>8. Raised Toilet Water Level</h3>
<p>A toilet where the water level sits noticeably higher than normal in the bowl — without any recent overflow — suggests a blockage downstream of the toilet trap.</p>

<h2>Common Causes of Blocked Drains in Peterborough Homes</h2>
<ul>
  <li><strong>Hair and soap:</strong> The most common cause of bathroom drain blockages.</li>
  <li><strong>Grease and fat:</strong> Poured down kitchen sinks, fat solidifies inside pipes as it cools.</li>
  <li><strong>Wet wipes and sanitary products:</strong> Even "flushable" wipes should never go down the toilet.</li>
  <li><strong>Tree roots:</strong> Common in older Peterborough streets where mature trees grow close to drainage runs.</li>
  <li><strong>Collapsed pipes:</strong> More likely in older properties with clay or cast-iron drainage.</li>
  <li><strong>Hard water scale:</strong> Peterborough has moderately hard water, which can build up inside pipes over time.</li>
</ul>

<h2>DIY Checks You Can Do First</h2>
<ol>
  <li>Pour a full kettle of boiling water slowly down the affected drain — this dissolves grease and soap.</li>
  <li>Try a cup plunger directly over the plughole with firm push-pull strokes.</li>
  <li>Use a bicarbonate of soda and white vinegar flush: pour half a cup of each, cover for 20 minutes, then flush with hot water.</li>
  <li>For kitchen sinks, check under the sink and clean the P-trap (U-bend) — this often collects debris.</li>
</ol>

<h2>When to Call a Professional Plumber</h2>
<p>You should call a qualified plumber in Peterborough if:</p>
<ul>
  <li>DIY methods have not cleared the blockage after two attempts.</li>
  <li>Multiple drains in the house are slow or blocked.</li>
  <li>You can smell sewage inside the property.</li>
  <li>Water is backing up into sinks, toilets, or shower trays.</li>
  <li>The problem keeps returning despite clearing it.</li>
</ul>
<p>Professional drain jetting — using high-pressure water — will clear even the most stubborn blockages quickly and safely, without damaging your pipes.</p>

<h2>Peterborough Drain Blockage Service</h2>
<p>Our engineers serve all Peterborough postcodes (PE1–PE7) and surrounding towns including Werrington, Bretton, Orton, Hampton, Yaxley, Whittlesey, Market Deeping, and Stamford. We offer same-day call-outs for urgent drain problems, and all work comes with a clear upfront quote before we start.</p>
    `.trim(),
  },

  // ─── 2. Damp & Leak Detection cluster ────────────────────────────────────────
  {
    slug: "hidden-water-leak-signs",
    name: "Hidden Water Leak Warning Signs — How to Detect a Leak Early",
    excerpt:
      "A hidden water leak can cause thousands of pounds of damage before it becomes visible. Here are the warning signs every Peterborough homeowner should know.",
    category: "diy",
    readTime: 6,
    publishedAt: new Date("2026-03-01"),
    content: `
<h2>Why Hidden Leaks Are So Damaging</h2>
<p>Unlike a burst pipe, a hidden water leak may go unnoticed for weeks or months. During that time it can saturate wall insulation, rot timber joists, cause mould growth, undermine plaster, and dramatically increase your water bill. Early detection is the difference between a simple repair and an expensive rebuild.</p>

<h2>10 Warning Signs of a Hidden Water Leak</h2>

<h3>1. Unexplained Rise in Your Water Bill</h3>
<p>If your water usage and habits have not changed but your bill has gone up significantly, a hidden leak is the most likely explanation. Even a small drip wastes hundreds of litres per day.</p>

<h3>2. Damp Patches on Walls or Ceilings</h3>
<p>Yellow or brown staining on walls or ceilings — particularly spreading or reappearing after decoration — almost always indicates water tracking through the structure from a leaking pipe nearby.</p>

<h3>3. Peeling or Bubbling Paint and Wallpaper</h3>
<p>Paint or wallpaper that bubbles, lifts, or peels without any obvious cause is a sign of moisture behind the surface. Check both exterior and interior walls near where pipes are likely to run.</p>

<h3>4. Musty or Damp Smell in Rooms</h3>
<p>A persistent musty smell — especially in rooms where windows are not causing condensation — is caused by mould or damp material. This is a strong indicator of a slow leak somewhere in the building fabric.</p>

<h3>5. Warm Spots on the Floor</h3>
<p>If you have underfloor heating pipework, a warm patch on a solid floor that does not correspond to a heating zone could indicate a leaking underfloor pipe. This is relatively common in Peterborough's newer-build estates in Hampton and Orton.</p>

<h3>6. Reduced Water Pressure</h3>
<p>A noticeable drop in pressure at taps or showers — without a known cause such as supply works — can indicate water is escaping the system through a leak before it reaches your fixtures.</p>

<h3>7. Sound of Running Water When Nothing Is On</h3>
<p>If you can hear the sound of water running — trickling or hissing — when all taps and appliances are turned off, this is a significant warning sign. Turn off everything in the house, go to the quietest point, and listen carefully near floors and walls.</p>

<h3>8. Mould or Mildew Growth</h3>
<p>Mould growing in unusual places — not just bathroom grout, but on walls, behind furniture, or in corners of rooms — suggests sustained moisture is feeding it. Mould needs persistent dampness to grow.</p>

<h3>9. Soft or Damaged Flooring</h3>
<p>Timber floors that feel soft or bouncy, tiles that have loosened, or carpet that feels damp underfoot can all indicate a leak in the subfloor or beneath a screed.</p>

<h3>10. The Water Meter Test</h3>
<p>Turn off every water-using appliance and tap in the house, then go to your external water meter and watch the dial. If the meter is still moving, water is flowing somewhere inside your property — and you have a leak.</p>

<h2>Where Hidden Leaks Most Commonly Occur</h2>
<ul>
  <li><strong>Behind tiled shower or bath panels:</strong> Grout and silicone sealant deteriorate over time, allowing water into the wall cavity.</li>
  <li><strong>Under kitchen and bathroom sinks:</strong> Waste pipe joints and supply connections can weep slowly for months.</li>
  <li><strong>In the loft or ceiling void:</strong> Cold-water storage tanks and overflow pipes are often not inspected for years.</li>
  <li><strong>Beneath concrete floors:</strong> Supply pipes running below ground-floor slabs can corrode or fracture.</li>
  <li><strong>Behind radiator connections:</strong> Union nut joints on older radiators can drip slowly without causing visible puddles on hard floors.</li>
</ul>

<h2>DIY Checks Before Calling a Plumber</h2>
<ol>
  <li>Do the water meter test described above.</li>
  <li>Check under sinks and around the base of toilets for any moisture.</li>
  <li>Inspect the visible section of any waste pipes under baths and showers.</li>
  <li>Look in the loft at the cold water tank and check for any water staining on the boarding around it.</li>
  <li>Feel along the back of kitchen and bathroom base units for any dampness.</li>
</ol>

<h2>When to Call a Leak Detection Specialist</h2>
<p>If you cannot locate the source of the leak through the above checks, a professional leak detection service will use specialist equipment — including acoustic listening devices, thermal imaging cameras, and tracer gas — to find the exact location of a hidden leak without unnecessary damage to your property.</p>
<p>Early professional detection is always cheaper than discovering a leak after it has caused structural damage. Our engineers cover all Peterborough postcodes and can typically attend the same day for suspected active leaks.</p>
    `.trim(),
  },

  // ─── 3. Landlord / Gas Safety cluster ────────────────────────────────────────
  {
    slug: "landlord-plumbing-checklist",
    name: "Landlord Plumbing Safety Checklist — UK Legal Obligations",
    excerpt:
      "A complete checklist of plumbing and gas safety obligations for landlords in the UK, including what you must do annually, what to check between tenancies, and how to avoid costly compliance failures.",
    category: "costs",
    readTime: 7,
    publishedAt: new Date("2026-03-01"),
    content: `
<h2>Landlord Plumbing and Gas Obligations — The Basics</h2>
<p>As a landlord in Peterborough or anywhere in the UK, you have a legal duty to ensure that the plumbing and gas systems in your rental property are safe and in good working order. Failure to comply can result in fines, invalidated insurance, and in the most serious cases, criminal prosecution.</p>
<p>This checklist covers what you must do annually, what to arrange between tenancies, and what to check regularly throughout a tenancy.</p>

<h2>Annual Legal Requirements</h2>

<h3>1. Gas Safety Certificate (CP12)</h3>
<p>This is your most critical annual obligation. Under the Gas Safety (Installation and Use) Regulations 1998, you must have all gas appliances, flues, and pipework inspected by a Gas Safe registered engineer every 12 months. You must:</p>
<ul>
  <li>Provide a copy of the valid certificate to existing tenants within 28 days of the annual check.</li>
  <li>Provide a copy to new tenants before they move in.</li>
  <li>Retain records of all gas safety checks for at least two years.</li>
</ul>
<p>The cost of a gas safety certificate in Peterborough typically ranges from £60 to £120 depending on the number of gas appliances.</p>

<h3>2. Boiler Service</h3>
<p>While not a strict legal requirement in addition to the CP12, most boiler manufacturers require an annual service to keep the warranty valid. A service also ensures the boiler operates safely and efficiently, reducing the risk of mid-tenancy breakdowns — which you will be liable to repair promptly under the Landlord and Tenant Act 1985.</p>

<h2>Every Tenancy Change — Recommended Checks</h2>
<h3>3. Drain and Waste Pipe Inspection</h3>
<p>Check all waste pipes, sink U-bends, and the toilet waste connection for signs of leaking joints, cracks, or blockages. Replace any worn seals and clear any build-up before the new tenancy starts.</p>

<h3>4. Stopcock and Isolation Valves</h3>
<p>Test the main stopcock and all isolation valves to confirm they turn freely. Document the location of the stopcock in your tenancy check-in notes so tenants can act quickly in an emergency.</p>

<h3>5. Hot and Cold Water System Check</h3>
<p>Run all taps and showers to confirm adequate pressure and that hot water reaches correct temperatures. Under HSG274, landlords with properties containing thermostatic mixing valves or cold water storage tanks have specific Legionella control obligations.</p>

<h3>6. Radiator and Heating System Inspection</h3>
<p>Bleed all radiators and check that the heating system heats evenly. Check all radiator valve connections and the boiler pressure gauge. A cold radiator at the beginning of a tenancy creates an immediate maintenance complaint.</p>

<h2>Ongoing Obligations During a Tenancy</h2>

<h3>7. Respond to Repairs Promptly</h3>
<p>Under the Landlord and Tenant Act 1985, you are responsible for keeping in repair and proper working order all installations for the supply of water, gas, electricity, and for heating water. Delays in responding to plumbing reports — especially water leaks, loss of heating, or no hot water — may constitute a breach of your obligations.</p>

<h3>8. No Hot Water — Respond Within 24 Hours</h3>
<p>Loss of heating or hot water during the colder months (October to April) must be treated as an urgent repair. Courts have consistently held that failure to restore these services quickly amounts to a breach of the implied repairing covenant.</p>

<h3>9. Keep Records</h3>
<p>Maintain records of all maintenance requests, repairs carried out, engineer visits, and certificates. Good records protect you if a dispute arises with a tenant or if you need to demonstrate compliance to a local authority.</p>

<h2>HMO-Specific Additional Requirements</h2>
<p>If your property is a House in Multiple Occupation (HMO), you have additional obligations:</p>
<ul>
  <li>More frequent gas safety checks may be required under your licence conditions.</li>
  <li>The number of bathrooms and WCs must be adequate for the number of occupants under HMO licensing standards.</li>
  <li>Hot water must be available to all bathrooms and kitchens used by occupants.</li>
</ul>

<h2>Cost Summary for Peterborough Landlords</h2>
<ul>
  <li><strong>Gas safety certificate:</strong> £60–£120 per year</li>
  <li><strong>Annual boiler service:</strong> £70–£120</li>
  <li><strong>Drain inspection and clearance:</strong> £80–£200 depending on severity</li>
  <li><strong>Emergency plumbing call-out:</strong> £80–£150 call-out + labour</li>
  <li><strong>Boiler replacement (if required):</strong> £1,500–£3,500</li>
</ul>

<h2>Find a Qualified Plumber and Gas Engineer in Peterborough</h2>
<p>All gas work must be carried out by a Gas Safe registered engineer. You can verify registration at gassaferegister.co.uk. Our team of qualified engineers covers all Peterborough postcodes (PE1–PE7) and surrounding areas including Stamford and Market Deeping, and offers priority servicing for landlord contracts.</p>
    `.trim(),
  },

  // ─── 4. Boiler cluster ────────────────────────────────────────────────────────
  {
    slug: "boiler-pressure-low",
    name: "Why Your Boiler Keeps Losing Pressure — Causes and Fixes",
    excerpt:
      "If your boiler keeps dropping below 1 bar of pressure, something is wrong. This guide explains the common causes, what you can fix yourself, and when to call a Gas Safe engineer.",
    category: "boilers",
    readTime: 6,
    publishedAt: new Date("2026-03-01"),
    content: `
<h2>What Does Boiler Pressure Actually Mean?</h2>
<p>The pressure gauge on your boiler shows the pressure of the water inside your sealed central heating system. A healthy system should sit between 1 and 1.5 bar when cold, rising to around 2 bar when the heating is running. If the needle drops below 1 bar, most modern boilers will lock out and stop working — displaying a fault code — to protect themselves from damage.</p>

<h2>The Right Pressure for Your Boiler</h2>
<ul>
  <li><strong>Cold system:</strong> 1.0 to 1.5 bar</li>
  <li><strong>Heating running:</strong> 1.5 to 2.0 bar</li>
  <li><strong>Too low (below 1 bar):</strong> Boiler may lock out</li>
  <li><strong>Too high (above 3 bar):</strong> Pressure relief valve will open — also a problem</li>
</ul>

<h2>Common Causes of Boiler Pressure Loss</h2>

<h3>1. You Have Recently Bled a Radiator</h3>
<p>Bleeding a radiator releases air — but also a small amount of water — from the system. This is the most common and most harmless cause of a pressure drop. Simply repressurise using the filling loop and the system will return to normal.</p>

<h3>2. A Small Leak Somewhere in the System</h3>
<p>If the pressure drops repeatedly — every few days or weeks — without you having bled any radiators, there is almost certainly a small leak somewhere in the system. Common leak points include:</p>
<ul>
  <li>Radiator valve connections and union nuts</li>
  <li>The pressure relief valve (PRV) — sometimes leaks slightly when under stress</li>
  <li>Pipework joints, particularly in older properties</li>
  <li>The boiler heat exchanger — this is a more serious internal leak</li>
</ul>
<p>Even a small drip that evaporates before forming a puddle can cause regular pressure loss. Look for damp patches, staining, or salt deposits around all visible pipework and radiator valves.</p>

<h3>3. A Faulty Pressure Relief Valve (PRV)</h3>
<p>The pressure relief valve is a safety device that opens if the system pressure gets too high. Over time, the valve seat can corrode and allow water to weep continuously — causing gradual pressure loss. You may notice a small drip from the copper overflow pipe that exits through an outside wall.</p>

<h3>4. A Faulty Expansion Vessel</h3>
<p>The expansion vessel absorbs the extra volume of water that expands as it heats up. If the internal diaphragm in the vessel splits or the pre-charge pressure has dropped, the system pressure will behave abnormally — often rising too high when hot, then dropping sharply when cold. This is one of the most common causes of recurring pressure problems in boilers more than 8–10 years old.</p>

<h3>5. A Leaking Heat Exchanger</h3>
<p>If water is leaking inside the boiler itself — often through a cracked heat exchanger — the pressure will drop and you may notice a damp smell or visible signs of corrosion around the boiler casing. This is a serious fault requiring a Gas Safe engineer.</p>

<h2>What You Can Do Yourself</h2>
<ol>
  <li><strong>Repressurise the system:</strong> Use the filling loop to bring the pressure back to 1.5 bar. See our guide on how to repressurise your boiler for step-by-step instructions.</li>
  <li><strong>Check all visible radiator valves:</strong> Look for damp joints, white salt deposits, or weeping connections — dry with a cloth and check again 24 hours later.</li>
  <li><strong>Inspect the overflow pipe outside:</strong> If water is dripping from a small copper pipe exiting through an exterior wall, the PRV may be weeping.</li>
  <li><strong>Monitor how quickly the pressure drops:</strong> If it drops within 24–48 hours of being topped up, the leak is significant and needs professional attention. If it holds for several weeks, you may just be losing a tiny amount of water through a very small weep.</li>
</ol>

<h2>When You Must Call a Gas Safe Engineer</h2>
<ul>
  <li>Pressure drops within hours or days of being topped up.</li>
  <li>You cannot locate any visible leak but pressure keeps falling.</li>
  <li>The boiler is showing fault codes (e.g. E119 on Worcester Bosch, F1 on Vaillant).</li>
  <li>There is any sign of water inside or underneath the boiler casing.</li>
  <li>You suspect the expansion vessel needs recharging or replacing.</li>
</ul>
<p>Never attempt to open the boiler casing or work on internal boiler components yourself. All gas boiler work must be carried out by a Gas Safe registered engineer.</p>

<h2>Boiler Pressure Problems in Peterborough</h2>
<p>Our qualified Gas Safe engineers attend properties across all Peterborough postcodes (PE1–PE7) and surrounding areas including Werrington, Bretton, Hampton, Orton, Yaxley, Whittlesey, Stamford, and Market Deeping. We carry common replacement parts including expansion vessels and PRVs on the van, so most pressure faults are resolved in a single visit.</p>
    `.trim(),
  },

  // ─── 5. Emergency cluster ─────────────────────────────────────────────────────
  {
    slug: "no-hot-water-emergency",
    name: "No Hot Water? Step-by-Step Guide to Finding and Fixing the Problem",
    excerpt:
      "Woken up to no hot water? This guide walks you through the most common causes — from a tripped boiler to a faulty diverter valve — and tells you exactly when to call a plumber.",
    category: "emergencies",
    readTime: 6,
    publishedAt: new Date("2026-03-01"),
    content: `
<h2>Start Here — Quick Checks Before Anything Else</h2>
<p>Before calling a plumber, work through these checks in order. Most no-hot-water situations have a straightforward cause that you can identify in five minutes.</p>

<h3>Check 1: Is the boiler on?</h3>
<p>Check the boiler display. Is it showing a fault code, a flashing light, or is it completely blank? If the display is blank, check the boiler is plugged in and the fuse in the spur switch has not blown.</p>

<h3>Check 2: Is the pressure too low?</h3>
<p>Look at the pressure gauge on the boiler. If it reads below 1 bar, the boiler has likely locked out due to low pressure. See our guide on how to repressurise your boiler — this often restores both heating and hot water immediately.</p>

<h3>Check 3: Is the pilot light out? (older boilers)</h3>
<p>On older non-condensing boilers, a blown pilot light will stop both heating and hot water. Follow the manufacturer's instructions to relight it — usually a button on the boiler body. If it will not stay lit, call a Gas Safe engineer.</p>

<h3>Check 4: Check the thermostat settings</h3>
<p>Confirm your programmer or smart thermostat is set correctly for hot water. It is surprisingly common for a schedule to have been accidentally changed — particularly after a power cut resets some older programmers.</p>

<h3>Check 5: Is it affecting heating too?</h3>
<p>This distinction matters for diagnosis (see below).</p>

<h2>No Hot Water BUT Heating Is Working Fine</h2>
<p>If your radiators are warming up normally but you have no hot water from taps or showers, the problem is most likely in the hot water circuit specifically — not the boiler overall. Likely causes:</p>

<h3>Faulty Diverter Valve (Combi Boilers)</h3>
<p>Combi boilers use a diverter valve to switch flow between the heating circuit and the hot water circuit. If this valve sticks or fails, the boiler may heat the radiators but fail to deliver hot water to the taps. You may also notice the hot water runs briefly then goes cold. This is a relatively common fault requiring a Gas Safe engineer to replace the valve.</p>

<h3>Hot Water Cylinder Not Heating (System Boilers)</h3>
<p>If you have a system boiler with a hot water cylinder, check the cylinder thermostat and the immersion heater. The motorised valve that directs hot water to the cylinder may have failed. Check the cylinder is warm to the touch — if it is stone cold despite the heating working, the motorised valve or the cylinder stat is likely at fault.</p>

<h3>Scale Build-Up in the Heat Exchanger</h3>
<p>In hard water areas like Peterborough, limescale builds up inside the boiler heat exchanger over time. This restricts hot water flow particularly at the hot water taps (you may notice hot water at low flow but cold at high flow). A power flush or descaling treatment can address this.</p>

<h2>No Hot Water AND No Heating</h2>
<p>If both heating and hot water have stopped working, the issue is most likely with the boiler itself. Check the boiler display for a fault code and consult the manufacturer's troubleshooting guide — many fault codes point to specific components. Common causes include:</p>
<ul>
  <li>Low system pressure (top up using the filling loop)</li>
  <li>Frozen condensate pipe (in very cold weather — the white plastic pipe exiting the boiler outside may have frozen)</li>
  <li>Ignition failure (the boiler is trying to fire but cannot ignite the gas)</li>
  <li>Fan or pump failure</li>
  <li>Gas supply interrupted (check if other gas appliances are working)</li>
</ul>

<h2>Frozen Condensate Pipe — A Winter-Specific Problem</h2>
<p>Modern condensing boilers produce acidic condensate water which drains away through a plastic pipe. In very cold weather — which does happen in Peterborough winters — this pipe can freeze, causing the boiler to lock out. You will usually see a fault code and the pipe will visibly frost over.</p>
<p>To thaw it yourself: pour warm (not boiling) water along the length of the pipe outdoors. Once cleared, reset the boiler. Consider insulating the pipe to prevent a repeat.</p>

<h2>When to Call an Emergency Plumber in Peterborough</h2>
<p>Call a professional immediately if:</p>
<ul>
  <li>You can smell gas near the boiler — evacuate and call the National Gas Emergency line on 0800 111 999 before calling a plumber.</li>
  <li>The boiler is making unusual banging, popping, or hissing noises.</li>
  <li>There is any sign of water around or inside the boiler casing.</li>
  <li>You have tried repressurising and resetting and the boiler still will not fire.</li>
  <li>You have no hot water or heating with young children, elderly occupants, or medical conditions in the property.</li>
  <li>You are a landlord — loss of hot water and heating is a legally urgent repair under the Landlord and Tenant Act 1985.</li>
</ul>

<h2>Emergency Plumbing in Peterborough</h2>
<p>Our qualified Gas Safe engineers are available for same-day call-outs across all Peterborough postcodes (PE1–PE7) and surrounding areas including Werrington, Bretton, Orton, Hampton, Yaxley, Whittlesey, Stamford, and Market Deeping. We carry replacement diverter valves, thermostats, and motorised valves on every van — most no-hot-water faults are resolved in a single visit.</p>
    `.trim(),
  },
];

async function main() {
  console.log("Seeding 5 new guides...\n");

  for (const guide of newGuides) {
    await prisma.guide.upsert({
      where: { slug: guide.slug },
      update: {
        name: guide.name,
        excerpt: guide.excerpt,
        category: guide.category,
        readTime: guide.readTime,
        content: guide.content,
        updatedAt: new Date(),
      },
      create: {
        slug: guide.slug,
        name: guide.name,
        excerpt: guide.excerpt,
        category: guide.category,
        readTime: guide.readTime,
        content: guide.content,
        publishedAt: guide.publishedAt,
        updatedAt: new Date(),
      },
    });
    console.log(`  ✓ ${guide.slug}`);
  }

  console.log("\nDone. 5 guides seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
