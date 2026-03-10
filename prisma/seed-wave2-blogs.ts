/**
 * seed-wave2-blogs.ts
 * Wave 2 — Posts 11–25 of the Topical Authority Engine
 *
 * Run with:
 *   npx tsx prisma/seed-wave2-blogs.ts
 *
 * New category introduced: "Bathrooms" — posts #6 and #7
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const wave2Posts = [
  // ─── 1. Blocked Drain vs Blocked Sewer ───────────────────────────────────
  {
    slug: "blocked-drain-vs-blocked-sewer",
    title: "Blocked Drain vs Blocked Sewer: How to Tell the Difference",
    category: "Drains & Drainage",
    excerpt:
      "A blocked drain and a blocked sewer are two different problems with different causes, different responsible parties, and different solutions. Here's how to tell which one you have.",
    content: `
<h2>Why the Distinction Matters</h2>
<p>When water backs up in your sink, toilet, or outside gully, the instinct is to call a plumber immediately. That's usually the right call — but understanding whether you have a blocked drain or a blocked sewer affects who fixes it, how quickly, and importantly, who pays. In some cases, the problem isn't yours to resolve at all.</p>

<h2>The Difference Between a Drain and a Sewer</h2>
<p>A <strong>drain</strong> carries wastewater from a single property. Everything from your kitchen sink, bath, toilets, and washing machine runs through your private drains until it reaches the public sewer. Your private drains are entirely your responsibility — from the fittings inside the house to the point where they connect to the main sewer, typically under the pavement or road outside.</p>
<p>A <strong>sewer</strong> is a shared pipe that collects wastewater from multiple properties and carries it to the treatment works. Since the Water Industry Act 2011, most sewers in England are the responsibility of the regional water and sewerage company — in Peterborough, that's Anglian Water. You are not responsible for a blocked shared sewer, and you should not pay to have it cleared.</p>
<p>The boundary between your drain and the public sewer is the point where your private pipe connects to the shared one — usually around the edge of your property or just beyond it.</p>

<h2>Signs It's Your Private Drain</h2>
<p>The clearest sign of a private drain blockage is that the problem is confined to your property. If water backs up in your kitchen but your neighbour's drains are fine, the blockage is in your private drainage. Other signs include:</p>
<ul>
<li>A single fixture slow to drain — just the bath, or just the kitchen sink, while others work normally</li>
<li>Gurgling from a waste pipe or drain that corresponds to use of one specific appliance</li>
<li>A smell from one drain in particular rather than throughout the property</li>
<li>Water backing up through a ground-floor drain when you run water upstairs</li>
</ul>
<p>Most private drain blockages are caused by accumulated grease and food waste in kitchen pipes, hair and soap residue in bathroom wastes, or physical objects flushed down toilets. Our <a href="/guides/how-to-unblock-a-drain">guide to unblocking a drain</a> covers what you can try yourself and when to call a plumber.</p>

<h2>Signs It's the Shared Sewer</h2>
<p>If the problem is affecting multiple properties simultaneously, the shared sewer is the likely cause. Indicators include:</p>
<ul>
<li>Your neighbours have the same drainage problem at the same time</li>
<li>The outside inspection chamber (manhole) is overflowing or backed up</li>
<li>All drains in your property are slow or blocked at the same time, with no obvious single source</li>
<li>Raw sewage appearing in your garden or outside drain — particularly if it affects adjacent properties</li>
</ul>
<p>If you suspect a shared sewer blockage, report it to Anglian Water directly on 03457 145 145. They are legally obligated to investigate and clear blockages in the public sewer network at no charge to you.</p>

<h2>The Complication: Shared Private Drains</h2>
<p>There's a third scenario that causes confusion — a private shared drain. This is a drain serving more than one property but which was not adopted by the water company under the 2011 Act. These remain the joint responsibility of the properties they serve, meaning you and your neighbours share the cost of clearing and maintaining them.</p>
<p>If you're unsure whether a drain is shared or adopted, Anglian Water can provide drainage maps showing the extent of the public sewer network. Your conveyancing solicitor should also have noted any shared drainage arrangements when you bought the property.</p>

<h2>Inspection Chambers: A Quick Check</h2>
<p>The fastest way to get information is to lift the nearest external inspection chamber (manhole) on your property. If it's full of standing water or sewage, the blockage is likely downstream of that point — either in a shared sewer section or further along your private drain. If it's empty and clear, the blockage is between the chamber and the house, squarely on your private pipework.</p>
<p>Not sure where your inspection chambers are? Our <a href="/services/drain-blockages">drainage team</a> can locate, lift, and assess external chambers as part of any call-out. If the blockage appears to involve the shared network, we'll document the findings so you can report to Anglian Water with evidence. <a href="/book">Book online</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Who is responsible for a drain under my driveway?</h3>
<p>If the drain only serves your property, it's your responsibility regardless of where it runs — including under your driveway, garden, or even under the pavement to the sewer connection point. The public sewer begins where your drain meets the shared network, which is often slightly beyond your property boundary.</p>

<h3>My neighbour and I share a drain — who pays to clear it?</h3>
<p>If the drain was not adopted by Anglian Water under the 2011 Act, it remains a private shared drain and both parties share maintenance responsibility. Costs are typically split equally. It's worth checking with Anglian Water whether the drain qualifies for adoption — many post-2011 adoptions are still being processed and yours may now be a public sewer.</p>

<h3>Can Anglian Water refuse to clear a blocked sewer?</h3>
<p>No — if a blockage is confirmed to be in the public sewer network, Anglian Water is legally obligated to clear it under the Water Industry Act 1991. If they fail to respond within a reasonable time and sewage is escaping onto your property, you can escalate to the Consumer Council for Water (CCW).</p>

<h3>Can I use drain unblocker chemicals on a shared drain?</h3>
<p>Chemical drain cleaners are generally ineffective on anything beyond minor household waste blockages, and can damage older clay drain pipes. For any blockage beyond a single sink waste, mechanical or jetting clearance from a qualified drainage engineer is more effective and far less likely to cause collateral pipe damage.</p>
    `.trim(),
    seoTitle: "Blocked Drain vs Blocked Sewer | How to Tell the Difference",
    seoDescription:
      "Is it your drain or the shared sewer? Learn how to identify which one is blocked, who is responsible for fixing it, and what to do next.",
    status: "Published",
    publishedAt: new Date("2026-04-05"),
  },

  // ─── 2. Tree Root Drain Damage ────────────────────────────────────────────
  {
    slug: "tree-root-drain-damage",
    title: "Tree Root Drain Damage: Signs, Risks, and Solutions",
    category: "Drains & Drainage",
    excerpt:
      "Tree roots are one of the most common causes of serious drain damage in UK properties — and one of the least expected. Here's how roots get into drains, what damage they cause, and what can be done about it.",
    content: `
<h2>How Tree Roots Get Into Drains</h2>
<p>Drain pipes aren't designed to keep roots out indefinitely. Clay pipes — fitted in the vast majority of Peterborough properties built before the 1970s — are joined in sections with flexible collars or simple push-fit joints. Over decades these joints can shift slightly, leaving a hair-thin gap. That's all a root needs. Tree roots follow moisture and nutrients, and a drain carrying wastewater is an irresistible source of both.</p>
<p>Once a root finds the gap, it exploits it. Roots grow into the pipe interior, branching outward and thickening over time. What starts as a thin tendril becomes a mesh of roots that traps waste, causes blockages, and eventually applies enough mechanical force to crack or collapse the pipe entirely.</p>

<h2>Which Trees Cause the Most Problems</h2>
<p>Any tree close to drain runs is a potential risk, but some species are particularly aggressive in their root behaviour:</p>
<ul>
<li><strong>Poplar and willow</strong> — the highest-risk species. Their roots travel long distances in search of water and are aggressive at exploiting any pipe joint weakness.</li>
<li><strong>Oak</strong> — slower growing but roots spread extremely wide; older oaks in mature gardens can threaten drains 20–30 metres away.</li>
<li><strong>Sycamore and ash</strong> — common street and garden trees with prolific surface root networks.</li>
<li><strong>Bamboo</strong> — invasive roots that can penetrate even sound pipes at joints.</li>
</ul>
<p>In Peterborough, mature tree coverage in older residential streets across Orton, Bretton, Werrington, and the city centre means root intrusion is one of the most frequent findings in <a href="/blog/cctv-drain-survey-peterborough">CCTV drain surveys</a> on pre-1970s properties.</p>

<h2>Signs of Root Intrusion in Your Drains</h2>
<p>Root damage rarely announces itself dramatically at first. The early signs are subtle and easy to mistake for ordinary drain behaviour:</p>
<ul>
<li><strong>Recurring blockages</strong> — the drain clears when jetted but blocks again within weeks. Roots continue trapping debris even after clearing.</li>
<li><strong>Slow draining across multiple fixtures</strong> — not just one sink but a general sluggishness throughout the system</li>
<li><strong>Gurgling sounds</strong> from drain pipes and toilets when water is running elsewhere in the house</li>
<li><strong>Sewer smell</strong> inside the property — roots and the debris they trap create ideal conditions for bacterial growth</li>
<li><strong>Subsidence or soft patches in the garden</strong> near drain runs — a sign that a pipe has collapsed and the surrounding ground is being undermined</li>
</ul>
<p>The only way to confirm root intrusion is a <a href="/blog/what-happens-cctv-drain-survey">CCTV drain survey</a>. A camera inspection shows root presence, density, location, and the condition of the pipe around it.</p>

<h2>What Can Be Done: The Four Options</h2>
<h3>1. High-Pressure Water Jetting</h3>
<p>For lighter root intrusion where the pipe is still structurally sound, high-pressure jetting can cut through and flush out root masses. This clears the blockage immediately — but roots will regrow within months to years unless the entry point is sealed. Jetting is a treatment, not a cure.</p>

<h3>2. Mechanical Root Cutting</h3>
<p>A rotating cutting head on a flexible rod is used to remove root growth more thoroughly than jetting alone. Combined with jetting to flush debris, this is more effective for heavier root masses. Again, it doesn't address the underlying crack or joint gap.</p>

<h3>3. Pipe Relining (No-Dig Repair)</h3>
<p>The most cost-effective long-term solution where the pipe structure is intact enough to support it. A flexible liner impregnated with resin is fed into the drain and inflated against the pipe wall. Once cured, it forms a smooth, jointless inner pipe within the original — sealing the entry points and preventing regrowth without any excavation. Our <a href="/services/drain-blockages">drainage team</a> carries out pipe relining across Peterborough.</p>

<h3>4. Excavation and Replacement</h3>
<p>Where a pipe has collapsed or is too damaged to reline, a targeted excavation and section replacement is necessary. Because <a href="/blog/cctv-drain-survey-peterborough">CCTV surveys</a> identify the exact location and extent of damage, excavation is precise — a 1–3 metre section rather than exploratory trenching.</p>

<h2>Prevention: Can You Stop Roots Reaching Your Drains?</h2>
<p>Once a mature tree is established near a drain run, there's little practical way to prevent root spread without removing the tree. The more sustainable approach is to monitor drains in properties with mature trees — a CCTV survey every 5–10 years on at-risk drains catches problems early, when jetting or relining is sufficient, rather than discovering them when a collapse has already occurred.</p>
<p><a href="/book">Book a drain survey</a> or call 01733797074 to discuss whether your property is at risk.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I claim on my home insurance for root damage to drains?</h3>
<p>It depends on your policy. Most standard home insurance policies cover sudden, unexpected escape of water but not gradual deterioration — and root damage is typically classed as gradual. Some policies include accidental damage to underground pipes or specific drain cover. Check your policy schedule. A CCTV survey report documenting the root damage will be required by any insurer if a claim is to be considered.</p>

<h3>How far do tree roots travel to reach drains?</h3>
<p>Root spread is broadly proportional to the tree's canopy spread — a large mature oak with a 15-metre canopy can have roots extending 15–20 metres from the trunk. Willows and poplars are particularly wide-ranging and have been documented causing drain damage 30+ metres from the parent tree. Trees on neighbouring land or the public highway can affect your drainage just as much as trees in your own garden.</p>

<h3>Does removing the tree fix the problem?</h3>
<p>Removing the tree stops new root growth but does not remove existing roots already inside the pipe. Existing root masses will dry out and shrink over 1–2 years, which sometimes resolves minor blockage issues — but the entry point remains open and debris will still accumulate. A pipe reline is still recommended after tree removal to seal the entry points.</p>

<h3>How quickly do roots regrow after jetting?</h3>
<p>In most cases, fine root regrowth is visible within 6–12 months of jetting. Whether it causes a new blockage depends on the volume of debris passing through the drain. Properties with mature trees near drain runs and histories of root intrusion typically need jetting or mechanical clearing every 1–2 years unless the entry points are permanently sealed by relining.</p>
    `.trim(),
    seoTitle: "Tree Root Drain Damage: Signs, Risks & Solutions | UK Guide",
    seoDescription:
      "Tree roots in your drains? Find out how roots cause drain damage, the signs to look for, and the four solutions from jetting to pipe relining and replacement.",
    status: "Published",
    publishedAt: new Date("2026-04-08"),
  },

  // ─── 3. What Happens During a CCTV Survey ────────────────────────────────
  {
    slug: "what-happens-cctv-drain-survey",
    title: "What Happens During a CCTV Drain Survey? Step-by-Step",
    category: "Drains & Drainage",
    excerpt:
      "A CCTV drain survey sends a camera through your pipes to inspect their condition from the inside. Here's exactly what happens from the moment the engineer arrives to the written report in your hands.",
    content: `
<h2>Before the Engineer Arrives</h2>
<p>A CCTV drain survey requires no preparation on your part other than knowing where your external inspection chambers (manholes) are — or at least roughly where your drain runs leave the house. If you have drainage plans from when you bought the property, having them available is useful but not essential. Our engineers locate access points as part of the survey.</p>
<p>You don't need to clear drains beforehand or avoid running water in the hours before the visit. Normal household use is fine.</p>

<h2>Step 1: Locate and Access the Drain</h2>
<p>The engineer's first task is to identify the best point to introduce the camera. For most domestic surveys, this is an external inspection chamber — a manhole cover in the garden, driveway, or near the house wall. The chamber is lifted and the internal condition noted: is it clear, partially blocked, or backing up? This first observation alone tells the engineer a lot about where any blockage is likely to be.</p>
<p>Where no external access exists, internal access points — a rodding eye behind a toilet, a cleanout on the soil stack — may be used. The engineer will explain the access plan before any work begins.</p>

<h2>Step 2: Introduce the Camera</h2>
<p>The camera unit — a waterproof head mounted on a flexible push-rod or self-propelled crawler, depending on the pipe diameter — is fed into the drain. For standard 100mm domestic drain pipes, a push-rod camera on a reel is used. For larger pipes (150mm+), a self-propelled crawler can navigate bends and junctions independently.</p>
<p>The camera transmits a live colour video feed to a monitor above ground. A built-in LED ring light illuminates the pipe interior. The engineer controls the speed of travel, pausing or reversing as needed to examine any area more closely.</p>

<h2>Step 3: The Survey Run</h2>
<p>The camera travels the length of each drain run being surveyed. As it moves, the engineer narrates findings and the recording system logs the distance from the access point — so that any defect can be referenced to an exact location. A typical domestic drain run of 15–25 metres takes 15–30 minutes to survey thoroughly.</p>
<p>The engineer is looking for:</p>
<ul>
<li><strong>Root intrusion</strong> — visible as a mesh or fringe of root growth entering through joints or cracks</li>
<li><strong>Displaced or open joints</strong> — sections where pipe segments have moved apart, creating a gap or step</li>
<li><strong>Cracks and fractures</strong> — ranging from hairline surface cracks to open fractures in the pipe wall</li>
<li><strong>Collapsed sections</strong> — where the pipe has deformed or completely failed, causing a partial or total obstruction</li>
<li><strong>Debris accumulation</strong> — grease, sediment, or physical objects partially or fully blocking the pipe</li>
<li><strong>Incorrect gradients</strong> — where the pipe sags or has inadequate fall, causing slow flow and debris settlement</li>
<li><strong>Pipe condition</strong> — general assessment of the material (clay, plastic, cast iron), age, and overall structural integrity</li>
</ul>

<h2>Step 4: Clearing Blockages Found During the Survey</h2>
<p>If a blockage is discovered during the camera run, it's usually possible to clear it during the same visit using high-pressure water jetting — rather than booking a separate appointment. The engineer will discuss this with you before proceeding and confirm whether any additional cost applies.</p>
<p>In some cases, the blockage is too severe for jetting alone, or the pipe condition suggests that jetting would risk further damage. In these situations, the engineer will recommend the appropriate next step and provide a written quote.</p>

<h2>Step 5: Review and Discuss Findings</h2>
<p>After completing the survey run, the engineer will walk you through the footage on the monitor, pointing out any defects found. This is your opportunity to ask questions before the written report is issued. A good engineer will explain clearly what each finding means in plain language — not drain survey jargon — and give an honest assessment of urgency.</p>
<p>Not every defect requires immediate action. Open joints in an otherwise sound pipe may be suitable for monitoring rather than immediate repair. A collapsed section obstructing flow needs addressing promptly. The conversation after the survey is as valuable as the footage itself.</p>

<h2>Step 6: The Written Report</h2>
<p>You receive a written report typically within 24–48 hours of the survey, containing:</p>
<ul>
<li>A description of the drain runs surveyed, with access point locations</li>
<li>A schedule of defects — each finding described, located by distance from the access point, and categorised by severity</li>
<li>Photographic stills from the footage illustrating each defect</li>
<li>Recommendations for remediation, with urgency classification</li>
<li>Video footage on request</li>
</ul>
<p>This report is a formal technical document — acceptable to solicitors for property transactions, to insurers for claims, and to local authorities when drainage questions arise during planning applications.</p>
<p>To book a CCTV drain survey across Peterborough and surrounding areas, <a href="/book">book online</a> or call 01733797074. For more on when a survey is the right tool, read our overview of <a href="/blog/cctv-drain-survey-peterborough">CCTV drain surveys in Peterborough</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does a CCTV drain survey take?</h3>
<p>A standard domestic CCTV survey covering the main drain runs from a property typically takes 1–2 hours on site. Larger properties with multiple drain runs, or surveys that include clearing a found blockage, will take longer. The written report is issued within 24–48 hours of the visit.</p>

<h3>Does the survey cover internal waste pipes as well?</h3>
<p>A standard external drain survey covers underground drainage from the property to the public sewer connection. Internal waste pipes — under sinks, behind baths, within stud walls — are generally not accessible by camera without removing fixtures. If you have a specific concern about an internal pipe, let us know when booking and we'll advise on the best approach.</p>

<h3>What size pipes can be surveyed?</h3>
<p>Domestic CCTV cameras work in pipes from 75mm to 225mm diameter — covering all standard residential drain and sewer pipe sizes. Larger commercial or combined sewer pipes use different equipment. If you're unsure whether your pipe size is within range, our team can confirm when you call.</p>

<h3>Can I watch the survey while it's happening?</h3>
<p>Yes — the engineer's monitor is positioned above ground and you're welcome to watch the live feed throughout the survey. Most customers find this helpful, particularly when the engineer is explaining what the camera is showing in real time. You don't need to watch if you'd prefer not to — the report will capture all findings either way.</p>
    `.trim(),
    seoTitle: "What Happens During a CCTV Drain Survey? Step-by-Step Guide",
    seoDescription:
      "Exactly what to expect from a CCTV drain survey — from accessing the drain to the written report. A step-by-step guide for UK homeowners.",
    status: "Published",
    publishedAt: new Date("2026-04-11"),
  },

  // ─── 4. Rising Damp vs Plumbing Leak ─────────────────────────────────────
  {
    slug: "rising-damp-vs-plumbing-leak",
    title: "Rising Damp vs Plumbing Leak: Why Homeowners Confuse Them",
    category: "Damp & Leaks",
    excerpt:
      "Damp on a ground-floor wall is often blamed on rising damp — but plumbing leaks cause the same symptoms and are far more common. Getting the diagnosis right before you spend money on treatment is essential.",
    content: `
<h2>The Most Expensive Misdiagnosis in a Home</h2>
<p>Rising damp is one of the most over-diagnosed problems in UK housing. Studies have repeatedly found that a significant proportion of properties diagnosed with rising damp are actually suffering from condensation, penetrating damp, or — particularly relevant here — a plumbing leak. The consequences of misdiagnosis are significant: rising damp treatment involves hacking off plaster, injecting a damp proof course, and replastering — a costly and disruptive job that does nothing if the moisture source is actually a leaking pipe.</p>
<p>Before any treatment is commissioned, the source of moisture needs to be correctly identified. This guide explains how to distinguish between genuine rising damp and a plumbing-related moisture problem — and what each one looks like in practice.</p>

<h2>What Rising Damp Actually Is</h2>
<p>Rising damp is the upward movement of groundwater through the pores of masonry — brickwork, mortar, and plaster — by capillary action. It occurs when the damp proof course (DPC) in a wall has failed, been bridged by external ground levels or render, or is absent entirely (common in properties built before 1875).</p>
<p>Genuine rising damp has specific characteristics: it appears at low level on ground-floor walls, rarely rises above 1 metre, and produces a characteristic "tide mark" of salt crystallisation (efflorescence) at the upper edge of the damp zone as water evaporates and leaves mineral deposits behind. It tends to be consistent — present throughout the year — rather than episodic.</p>

<h2>What a Plumbing Leak Looks Like</h2>
<p>A leaking supply pipe, waste pipe, or heating circuit can produce damp patches that look superficially identical to rising damp — particularly when the leak is slow and the moisture is spreading gradually through masonry rather than pooling visibly. Plumbing-related damp tends to:</p>
<ul>
<li>Appear in localised patches that don't follow the low-level tide mark pattern</li>
<li>Sometimes appear at higher levels — on first-floor walls, ceilings, or in unexpected locations</li>
<li>Worsen or improve depending on when water-using appliances are in use</li>
<li>Present alongside increased water bills or a meter that moves with everything turned off</li>
<li>Produce wet patches rather than tide marks — the mineralisation pattern of true rising damp takes years to develop</li>
</ul>

<h2>Key Tests to Help Distinguish Them</h2>
<h3>The Polythene Test</h3>
<p>Tape a sheet of polythene (or a piece of aluminium foil) tightly to the damp wall and leave it for 24–48 hours. When you remove it: if the back of the sheet (against the wall) is wet, moisture is coming from within the wall — consistent with rising damp or a hidden pipe leak. If the front of the sheet (facing the room) is wet or condensation has formed on it, the problem is condensation from the room air, not damp from the wall.</p>

<h3>Watch Whether It Correlates with Appliance Use</h3>
<p>Observe whether the damp patch grows or becomes wetter in the hours after a shower, bath, or dishwasher cycle. If there's a correlation, a slow leak from a nearby waste or supply pipe is the most likely cause.</p>

<h3>Check Your Water Meter</h3>
<p>Turn off all taps and appliances and check whether the water meter is still moving. A meter showing movement with everything off confirms a live leak somewhere in the system — which may be the source of the damp.</p>

<h2>Why Getting It Right Matters</h2>
<p>Rising damp treatment for a wall that's actually suffering from a pipe leak will fail. The plaster will continue to deteriorate, the moisture will continue to spread, and you'll have spent thousands on a treatment that addressed the wrong problem. Conversely, a plumber investigating a "leak" that is actually rising damp won't find anything wrong with the pipes — wasting a call-out fee and leaving the actual problem untreated.</p>
<p>Our <a href="/services/damp-leak-detection">damp and leak detection service</a> uses moisture mapping, thermal imaging, and acoustic equipment to determine the moisture source before any treatment is recommended. Read our guide on <a href="/blog/how-plumbers-find-hidden-leaks">how plumbers find hidden leaks</a> for more on the detection process.</p>

<h2>When to Call a Plumber vs a Damp Specialist</h2>
<p>If a water meter test confirms a live leak, call a plumber first — the leak needs to be found and repaired before any damp assessment makes sense. If the meter is static and the damp pattern is consistent with rising damp (low level, tide mark, no appliance correlation), a specialist damp surveyor is the appropriate first step. If you're unsure, a combined moisture survey — using a plumber with leak detection equipment — will give you a definitive answer without guessing. <a href="/book">Book a survey</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can rising damp and a plumbing leak exist at the same time?</h3>
<p>Yes — and this is precisely why diagnosis needs to be thorough. A house may have a genuine failed DPC and also a leaking pipe. If the plumbing leak is fixed but the DPC failure isn't addressed, damp will continue. A proper investigation establishes all moisture sources before any remediation is planned.</p>

<h3>Is rising damp always on ground-floor walls?</h3>
<p>Yes — genuine rising damp is limited to ground floor level, typically reaching no higher than 1 metre above floor level. Damp appearing on upper floors, ceilings, or in walls not in contact with the ground is not rising damp. It is either penetrating damp (rain or roof water), condensation, or a plumbing leak.</p>

<h3>Can a plumbing leak cause mould?</h3>
<p>Yes. A slow leak that keeps masonry or plasterboard consistently damp creates ideal conditions for mould growth — particularly black mould (Aspergillus/Cladosporium) in areas with limited air movement. Treating the mould without fixing the leak source is futile; it will return within weeks.</p>

<h3>My damp report says rising damp. Should I trust it?</h3>
<p>A damp diagnosis should always be supported by evidence — not just a damp meter reading. Many damp meters read elevated moisture in plaster containing hygroscopic salts, which hold moisture from the air regardless of whether there's any current rising damp. Request a full explanation of the evidence behind the diagnosis before commissioning treatment. If in doubt, a second opinion from a surveyor who also rules out plumbing sources is worth having.</p>
    `.trim(),
    seoTitle: "Rising Damp vs Plumbing Leak | How to Tell the Difference",
    seoDescription:
      "Rising damp and plumbing leaks produce similar damp patches — but the fix is completely different. Learn how to tell them apart before spending money on the wrong treatment.",
    status: "Published",
    publishedAt: new Date("2026-04-14"),
  },

  // ─── 5. Mould vs Condensation vs Damp ────────────────────────────────────
  {
    slug: "mould-condensation-damp-difference",
    title: "Mould, Condensation, or Damp? How to Tell Which Problem You Have",
    category: "Damp & Leaks",
    excerpt:
      "Black mould on walls, water on windows, and damp patches on ceilings are all moisture problems — but they have different causes and different solutions. Treating the wrong one wastes time and money.",
    content: `
<h2>Three Different Problems, Often Confused</h2>
<p>Moisture problems in UK homes are extremely common — but lumping them all under "damp" leads to incorrect diagnosis and ineffective treatment. Mould, condensation, and structural damp are related (they all involve excess moisture) but they have different origins, appear in different places, and need different solutions. Getting the right diagnosis first saves a significant amount of time and money.</p>

<h2>Condensation: The Most Common Cause of Damp in UK Homes</h2>
<p>Condensation occurs when warm, humid air meets a cold surface — a window, an external wall, or a cold corner behind furniture — and the moisture in the air deposits as water. It's the same process as a cold glass "sweating" on a warm day. In homes it's driven by everyday activities: cooking, showering, drying laundry indoors, and breathing all add water vapour to the air.</p>
<p>Condensation is most visible as:</p>
<ul>
<li>Water droplets or streaming on windows, especially in the morning</li>
<li>Damp patches in cold corners, particularly behind wardrobes against external walls</li>
<li>Black mould appearing on window frames, sealant, and wall corners</li>
<li>A general feeling of clamminess or a musty smell in poorly ventilated rooms</li>
</ul>
<p>Condensation is worst in winter (cold surfaces, more time indoors, heating on), gets better in summer, and typically affects the same spots every year. It's a ventilation and insulation problem — not a structural defect and not a plumbing problem.</p>

<h2>Structural Damp: Rising and Penetrating</h2>
<p>Structural damp refers to moisture entering the building through the fabric — either rising from the ground through failed damp proofing (rising damp) or entering through the walls, roof, or windows from outside (penetrating damp).</p>
<p><strong>Rising damp</strong> appears low on ground-floor walls as a tide mark of salt crystallisation, reaching up to about 1 metre. It's consistent throughout the year and often has a characteristic musty smell. It's caused by a failed or absent damp proof course. See our more detailed guide on <a href="/blog/rising-damp-vs-plumbing-leak">rising damp vs plumbing leaks</a> for how to distinguish them.</p>
<p><strong>Penetrating damp</strong> appears on external walls, around windows, or on ceilings below flat roofs. It typically worsens in wet weather and improves in dry spells. It's caused by cracked render, failed pointing, leaking gutters, defective flashings, or damaged roof coverings. It's a building maintenance issue — not a plumbing or ventilation problem.</p>

<h2>Plumbing Leak Damp</h2>
<p>A leaking pipe — supply, waste, or heating — introduces moisture into the building fabric in ways that closely mimic both condensation and structural damp. A slow leak from a concealed pipe can saturate plasterboard or masonry over weeks before it becomes visible. Leak-related damp typically:</p>
<ul>
<li>Appears in unexpected locations — a ceiling below a bathroom, a wall beside a radiator pipe route</li>
<li>May correlate with appliance use (gets wetter after showers, baths, or dishwasher cycles)</li>
<li>Does not follow the tide mark pattern of rising damp</li>
<li>May be accompanied by a moving water meter even when all appliances are off</li>
</ul>
<p>Our <a href="/services/damp-leak-detection">damp and leak detection service</a> uses thermal imaging and acoustic detection to identify plumbing sources before any structural remediation is considered. It's far better to confirm a leak is not present before commissioning expensive damp treatment. Read our guide on <a href="/blog/how-plumbers-find-hidden-leaks">how plumbers find hidden leaks</a> for more detail on detection methods.</p>

<h2>Mould: A Symptom, Not a Cause</h2>
<p>Black mould — typically Aspergillus niger or Cladosporium species — is a symptom of excess surface moisture, not an independent problem. It grows wherever a surface remains damp enough to support fungal growth. This means it appears on:</p>
<ul>
<li>Window frames and sealant — caused by condensation</li>
<li>Cold wall corners and ceiling edges — caused by condensation from poor insulation or ventilation</li>
<li>Behind furniture — caused by condensation from restricted air movement against cold walls</li>
<li>Around leaking pipes or damp-affected areas — caused by structural or plumbing-related moisture</li>
</ul>
<p>Treating mould with biocidal sprays without addressing the moisture source is a short-term fix. The mould will return within weeks. Solving the moisture source first is the only effective approach.</p>

<h2>A Simple Diagnostic Framework</h2>
<ul>
<li><strong>Water on windows, mould on frames, musty smell in winter</strong> → condensation. Fix: ventilation improvement, extractor fans, reducing indoor humidity sources.</li>
<li><strong>Tide mark on ground-floor wall, consistent year-round</strong> → likely rising damp. Fix: investigate DPC condition, rule out plumbing sources first.</li>
<li><strong>Damp patch on wall worsening in rain or wet weather</strong> → penetrating damp. Fix: building envelope — gutters, render, pointing, flashings.</li>
<li><strong>Damp patch near bathroom, kitchen, or radiator pipework, possibly correlating with appliance use</strong> → rule out a plumbing leak first. Fix: <a href="/book">book a leak detection survey</a>.</li>
</ul>

<h2>Frequently Asked Questions</h2>
<h3>Is black mould dangerous to health?</h3>
<p>Prolonged exposure to mould spores can cause or worsen respiratory conditions — particularly in children, the elderly, and those with asthma or compromised immune systems. Mould in habitable rooms should be addressed promptly. Surface mould on non-porous surfaces (glass, painted walls) can be treated with dilute bleach or specialist mould remover, but recurring mould requires addressing the moisture source.</p>

<h3>Does a dehumidifier fix damp?</h3>
<p>A dehumidifier reduces airborne humidity and can help with condensation-related damp significantly. It does nothing for structural damp (rising or penetrating) or plumbing leaks — both of which introduce moisture into the building fabric rather than the air. If damp patches don't improve significantly with a dehumidifier running, the source is structural or a pipe, not condensation.</p>

<h3>How can I tell if it's condensation or a leak behind the tiles?</h3>
<p>Use the polythene test: tape a piece of plastic sheeting tightly to the suspected area for 48 hours. Moisture on the wall-side of the sheet indicates moisture coming from within the wall — possible pipe leak. Moisture on the room-side indicates condensation forming on a cold surface. A thermal imaging camera can give a more definitive answer where a pipe leak is suspected behind tiled surfaces.</p>

<h3>Who should I call first — a plumber or a damp specialist?</h3>
<p>If there's any chance the moisture source is a plumbing leak (unexpected location, appliance correlation, moving water meter), call a plumber with leak detection capability first. Confirming no active leak is present takes a few hours and saves potentially spending thousands on damp treatment that won't work if a pipe is the true cause.</p>
    `.trim(),
    seoTitle: "Mould, Condensation, or Damp? How to Tell the Difference",
    seoDescription:
      "Black mould, wet walls, and damp patches — learn how to identify whether you have condensation, rising damp, penetrating damp, or a plumbing leak. The right diagnosis saves money.",
    status: "Published",
    publishedAt: new Date("2026-04-17"),
  },

  // ─── 6. Walk-In Shower vs Bath ────────────────────────────────────────────
  {
    slug: "walk-in-shower-vs-bath-home-value",
    title: "Walk-In Shower vs Bath: Which Adds More Value to Your Home?",
    category: "Bathrooms",
    excerpt:
      "One of the most common bathroom renovation questions is whether removing the bath for a walk-in shower will hurt the property value. The honest answer depends on your home, your buyers, and what you already have.",
    content: `
<h2>The Question Everyone Asks Before a Bathroom Refit</h2>
<p>You want a walk-in shower. Your bathroom is small. The bath takes up most of the space and you haven't used it in years. It seems obvious. But before the tiles come off, the question every estate agent, architect, and plumber gets asked is: will removing the bath devalue the house?</p>
<p>The answer is nuanced — and understanding the nuance before you book the job saves you from either an unnecessary worry or a decision you later regret.</p>

<h2>When Removing the Bath Is Fine</h2>
<p>Removing the only bath in a property is a meaningful decision for buyers with young children — bathing small children in a shower tray is not practical, and families actively look for at least one bath when buying. However, this concern doesn't apply equally to all properties:</p>
<ul>
<li><strong>One-bedroom flats and studio apartments</strong> — buyers are almost exclusively single occupants or couples without children. A well-designed walk-in shower is a genuine selling point over a cramped bath in these properties.</li>
<li><strong>Properties with two or more bathrooms</strong> — if one bathroom retains a bath, removing it from an en-suite or secondary bathroom is entirely reasonable. Buyers understand that not every bathroom needs one.</li>
<li><strong>Properties marketed to downsizers</strong> — older buyers often actively prefer a level-access shower over a bath, particularly in Peterborough's growing retirement-age demographic. A well-executed walk-in shower can be a positive differentiator.</li>
</ul>

<h2>When Keeping the Bath Makes More Sense</h2>
<ul>
<li><strong>If it's the only bathroom in a family home (3+ bedrooms)</strong> — the pool of buyers willing to accept bath removal narrows significantly. You may sell for less or take longer.</li>
<li><strong>If the bath is in good condition</strong> — replacing a functional bath with a shower tray of the same footprint delivers less perceived value than a wholesale bathroom upgrade.</li>
<li><strong>If local comparables have baths</strong> — buyers compare your property to similar homes in the same area. If every other 3-bedroom semi in your street has a bath, yours will stand out for the wrong reason.</li>
</ul>

<h2>Walk-In Shower as Addition, Not Just Replacement</h2>
<p>The highest-value approach, where space allows, is to add a walk-in shower alongside the bath rather than replacing it. A bathroom redesign that retains the bath while adding a separate shower enclosure or wet area gives buyers both options — and typically returns more value than either element alone.</p>
<p>In smaller bathrooms where this isn't possible, an over-bath shower with a quality screen is a compromise worth considering: it satisfies buyers who want a bath and gives you the shower experience without sacrificing floor space.</p>

<h2>What Matters More Than Bath vs Shower</h2>
<p>In practice, buyers respond most strongly to the overall condition and quality of a bathroom, not to whether it has a bath or shower. A clean, well-tiled, well-lit bathroom with quality fittings will sell faster and for more than a dated bathroom with original 1980s suite — regardless of what sanitaryware it contains.</p>
<p>If you're renovating primarily for resale, focus on condition, finish, and functionality over the bath/shower decision. If you're renovating for your own enjoyment and plan to stay 5+ years, install what suits your household and don't overthink the resale angle.</p>
<p>For cost guidance on bathroom renovations, see our <a href="/guides/bathroom-installation-cost-peterborough">bathroom installation cost guide</a>. Ready to plan? Read our full guide to <a href="/blog/plan-bathroom-renovation-peterborough">planning a bathroom renovation in Peterborough</a>. Our <a href="/services/bathroom-installations">bathroom installations team</a> can advise on the best layout for your specific property. <a href="/book">Book a survey and quote</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>How much value does a walk-in shower add?</h3>
<p>There's no reliable UK-wide figure — it depends entirely on property type, buyer demographic, and what's being replaced. A well-executed walk-in shower in a one-bedroom flat or en-suite is likely to be positively perceived. Removing the only bath from a family home is more likely to reduce buyer appeal than add it. Focus on overall bathroom quality rather than specific feature additions.</p>

<h3>Does a freestanding bath add value?</h3>
<p>In the right context — a spacious bathroom in a higher-end property — a freestanding bath is a desirable feature. In a standard 3-piece bathroom in a mid-range semi-detached, the premium it commands is modest and depends heavily on execution. A poorly fitted freestanding bath in a cluttered room is less appealing than a well-fitted built-in bath in a clean, well-tiled space.</p>

<h3>What type of shower is best for adding value?</h3>
<p>A mains-fed thermostatic mixer shower or a power shower (on a gravity-fed system) with a quality fixed head is perceived as premium by buyers. Electric showers are functional but generally perceived as a budget fitting. If your bathroom renovation is partly motivated by resale, a thermostatic mixer with both a fixed head and a handheld attachment is worth the investment. Our guide on <a href="/blog/how-to-choose-shower-uk-bathroom">choosing a shower for a UK bathroom</a> covers types and costs in detail.</p>

<h3>How long does it take to replace a bath with a walk-in shower?</h3>
<p>Removing a bath and fitting a shower tray, screen, and new shower fitting typically takes 2–3 days including any tiling. If the floor needs levelling or tanking for a wet room installation, allow an additional 1–2 days. Our <a href="/blog/bathroom-installation-time-uk">guide to bathroom installation timelines</a> covers the full range of bathroom renovation durations.</p>
    `.trim(),
    seoTitle: "Walk-In Shower vs Bath: Which Adds More Value to Your Home?",
    seoDescription:
      "Should you remove the bath for a walk-in shower? The honest answer on whether it helps or hurts property value — and when it doesn't matter at all.",
    status: "Published",
    publishedAt: new Date("2026-04-20"),
  },

  // ─── 7. En-Suite Bathroom Cost ────────────────────────────────────────────
  {
    slug: "en-suite-bathroom-cost-uk",
    title: "En-Suite Bathroom: How Much Does It Cost and What's Involved?",
    category: "Bathrooms",
    excerpt:
      "Adding an en-suite to a bedroom is one of the most popular home improvements in the UK — and one of the most frequently mispriced. Here's what it actually costs and what drives the price up or down.",
    content: `
<h2>What You're Actually Paying For</h2>
<p>An en-suite is not just a bathroom in a smaller room. It's a complete installation project — plumbing supply and waste pipes routed to a new location, waterproofing, electrics for lighting and extractor, tiling, and fitting of sanitaryware — all within the constraints of an existing bedroom space. The cost reflects the number of trades involved and the complexity of getting services to a location that previously had none.</p>
<p>Understanding what drives the cost helps you budget accurately and avoid the surprise of a quote that's significantly higher than the figure you found online.</p>

<h2>Typical En-Suite Costs in the UK (2026)</h2>
<p>For a standard en-suite installation — shower enclosure, toilet, and basin — in an existing bedroom with reasonable access for pipework, expect to budget in the following ranges:</p>
<ul>
<li><strong>Basic en-suite (shower, toilet, basin — standard fittings)</strong>: £3,500–£5,500</li>
<li><strong>Mid-range en-suite (quality fittings, full tiling, heated towel rail)</strong>: £5,500–£8,000</li>
<li><strong>Premium en-suite (walk-in shower, feature tiles, bespoke storage)</strong>: £8,000–£12,000+</li>
</ul>
<p>These figures include all labour (plumber, electrician, tiler) and a mid-range sanitaryware specification. They assume the en-suite is being created from part of an existing bedroom or a landing space — not a structural extension. VAT is included.</p>

<h2>What Drives the Cost Up</h2>
<h3>Pipework Distance</h3>
<p>The further the en-suite is from the existing soil stack or waste connection, the more pipework is needed. A master bedroom directly above or adjacent to the family bathroom is the most cost-effective scenario. A bedroom at the opposite end of the house may require significant new waste pipe routing — adding cost and potential disruption to other rooms.</p>

<h3>Soil Pipe Access</h3>
<p>Adding a toilet to an en-suite requires a connection to the soil stack (the main vertical waste pipe carrying toilet waste). If the stack runs through an adjacent wall, this is straightforward. If the stack is on the other side of the house, the options are: run a new soil pipe (disruptive and expensive), use a macerator/Saniflo unit (more flexible routing but higher ongoing maintenance), or position the en-suite without a toilet (wet room or shower room only).</p>

<h3>Floor Structure</h3>
<p>En-suites in properties with timber suspended floors require additional waterproofing measures and often a floor build-up to accommodate drainage falls. Properties with concrete floors are generally simpler to waterproof for wet room installations.</p>

<h3>Electrical Work</h3>
<p>A new lighting circuit, an extractor fan (required by Building Regulations for internal en-suites without a window), and potentially a new shower circuit all add to the electrical cost. In older properties, the consumer unit may need upgrading to accommodate additional circuits.</p>

<h2>Planning Permission and Building Regulations</h2>
<p>Adding an en-suite within an existing house does not require planning permission in most cases — it's an internal alteration and is permitted development. Building Regulations approval is required for: new drainage connections, structural changes (removing walls), electrical work (which must be notified and certified by a Part P competent electrician), and in some cases ventilation provisions.</p>
<p>Your plumber and electrician will handle the Building Regulations notifications relevant to their work. Ensure both trades are appropriately certified — a Gas Safe registered plumber for any gas heating connections, and a Part P registered electrician for the electrical installation.</p>

<h2>Does an En-Suite Add Property Value?</h2>
<p>Generally yes — particularly in properties with 3+ bedrooms where only one bathroom currently exists. Adding an en-suite to the master bedroom adds a sought-after feature for buyers and can return 50–70% of its cost in added value in the right market. In Peterborough's competitive family home market, a master bedroom with en-suite commands a clear premium over an equivalent property without one.</p>
<p>The return is lower in properties that already have two bathrooms, or in areas where buyer demographics are less family-oriented.</p>
<p>To plan your en-suite project, read our guide on <a href="/blog/plan-bathroom-renovation-peterborough">planning a bathroom renovation in Peterborough</a>, or <a href="/book">book a survey and quote</a> with our <a href="/services/bathroom-installations">bathroom installations team</a>. Call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can I add an en-suite without planning permission?</h3>
<p>In almost all cases, yes — adding an en-suite within the existing footprint of a house is an internal alteration that doesn't require planning permission. Exceptions include listed buildings (listed building consent required for any internal alterations) and properties where a previous permitted development right has been removed by a planning condition. Check with your local planning authority if you're uncertain.</p>

<h3>Can I use a macerator instead of connecting to the soil stack?</h3>
<p>Yes — a macerator (such as a Saniflo unit) pumps macerating waste horizontally or vertically to connect to any convenient soil or waste pipe, without needing direct fall to the soil stack. This makes toilet installation possible in locations otherwise impractical for conventional drainage. The trade-off is higher maintenance (the pump requires periodic service and the macerator blade wears over time) and more restricted use (no sanitary waste that doesn't macerate).</p>

<h3>How long does an en-suite installation take?</h3>
<p>A standard en-suite installation typically takes 5–8 working days, depending on the complexity of pipework routing, the extent of tiling, and whether structural work is involved. Add 1–2 days for wet room installations requiring full floor tanking. The room is unavailable for use throughout the installation.</p>

<h3>What size does an en-suite need to be?</h3>
<p>The minimum practical size for an en-suite with shower, toilet, and basin is approximately 1.5m x 2.0m (3 m²). A shower-only en-suite (no toilet) can be accommodated in even less space. Any smaller and fitting all three elements becomes a compromise — consider whether a shower room without a toilet is more appropriate for the available space.</p>
    `.trim(),
    seoTitle: "En-Suite Bathroom Cost UK 2026 | What It Costs and What's Involved",
    seoDescription:
      "How much does an en-suite bathroom cost in the UK? Realistic price ranges, what drives the cost, planning and building regs, and whether it adds property value.",
    status: "Published",
    publishedAt: new Date("2026-04-23"),
  },

  // ─── 8. Hot Water But No Heating ─────────────────────────────────────────
  {
    slug: "hot-water-no-heating-fault",
    title: "Hot Water But No Heating: What's Wrong With Your Boiler?",
    category: "Boiler & Heating",
    excerpt:
      "When you have hot water at the tap but your radiators stay cold, the boiler is working — the fault is in the system that tells it which function to run. Here's how to diagnose the most common causes.",
    content: `
<h2>Why This Specific Symptom Matters</h2>
<p>Hot water working but heating not working is a distinctive fault pattern — and a useful one, because it tells you the boiler itself is functioning. The heat exchanger is operating, the burner is firing, gas is reaching the appliance. The problem is somewhere in the system that directs hot water to the radiators rather than (or as well as) the domestic hot water circuit.</p>
<p>Understanding the three most common causes of this symptom can save you a call-out fee — some are fixable without an engineer at all.</p>

<h2>Check the Timer and Programmer First</h2>
<p>Before assuming a fault, check your heating controls. The most common cause of heating not working while hot water functions is simply a programmer or timer that has lost its settings — after a power cut, a clock change, or a battery replacement. If your programmer is set to heat hot water only, or if the heating schedule has been cleared, the boiler will correctly produce hot water and correctly not heat the radiators.</p>
<p>Check that the heating is set to "on" or scheduled to run at the current time. Try switching it to "continuous" or "all day" temporarily to see if the radiators respond. If they heat up when the programmer is overridden, the fault is in the timer or thermostat settings — not in the boiler or pipework.</p>
<p>Also check the room thermostat. If it's set below the current room temperature, the heating won't fire even when the programmer says it should. Turn it up to its maximum setting temporarily to test.</p>

<h2>Diverter Valve Fault (Combi Boilers)</h2>
<p>On a combi boiler, a diverter valve directs heat from the heat exchanger to either the central heating circuit or the domestic hot water circuit — never both simultaneously. Hot water is prioritised: when you open a hot tap, the diverter switches to DHW and diverts heat away from the radiators.</p>
<p>If the diverter valve becomes stuck in the domestic hot water position — a common failure mode, particularly in older combi boilers — you get hot water at the tap but the radiators never receive heat, regardless of what the programmer says. The valve is physically unable to switch over.</p>
<p>A diverter valve fault is confirmed by an engineer using a combination of system testing and visual inspection. Replacement is a standard repair — typically 1–2 hours' labour plus the cost of the valve. It's one of the most common <a href="/services/boiler-service">boiler repairs</a> carried out on Worcester Bosch, Vaillant, and Baxi combi boilers over 7 years old.</p>

<h2>Motorised Zone Valve Fault (System Boilers)</h2>
<p>System boilers use motorised zone valves to direct heated water to different circuits — typically one valve for the heating zone and one for the hot water cylinder. If the motorised valve serving the heating zone fails in the closed position, hot water will continue to be heated normally (its valve is open) while the central heating circuit receives no flow.</p>
<p>Zone valve failure is audible in some cases — a clicking or buzzing sound from the airing cupboard or wherever the valves are located when the heating is called for. An engineer can test zone valve operation electrically and mechanically; replacement is straightforward and relatively inexpensive.</p>

<h2>Pump Failure</h2>
<p>If the circulating pump fails, water doesn't flow through the radiator circuit — even though the boiler may fire and produce heat for the hot water cylinder. If your hot water comes from a cylinder that relies on the boiler's heat exchanger rather than the pump circuit, you'll have hot water but cold radiators. Listen near the boiler when heating is called for — a completely silent pump (when you'd normally hear a low hum) may indicate pump failure.</p>

<h2>When to Call</h2>
<p>If checking the timer, programmer, and room thermostat settings doesn't resolve the issue, the fault requires an engineer — whether it's a diverter valve, zone valve, or pump. These are all parts inside a sealed system and are not DIY repairs. Our <a href="/services/central-heating-services">central heating team</a> diagnoses and repairs all these faults across Peterborough. <a href="/book">Book online</a> or call 01733797074. See also our guide to <a href="/guides/central-heating-not-working">diagnosing central heating problems</a> for a broader fault-finding framework.</p>

<h2>Frequently Asked Questions</h2>
<h3>Could my thermostat be the reason heating isn't working?</h3>
<p>Yes — a faulty room thermostat that reads the room temperature as higher than it actually is will prevent the heating from firing, even with the programmer correctly set. If you suspect the thermostat, replace the batteries first (a common fix), then test by turning the setpoint to its maximum. If the heating fires at maximum but not at normal settings, the thermostat needs calibrating or replacing.</p>

<h3>How much does a diverter valve replacement cost?</h3>
<p>A diverter valve replacement on a standard combi boiler typically costs £150–£300 including parts and labour, depending on boiler make and model. Some older boilers have diverter valves that are no longer available new, requiring a refurbished part or a boiler replacement decision. An engineer can advise on parts availability after diagnosis.</p>

<h3>Will the heating work if I turn off the hot water?</h3>
<p>On a combi boiler with a stuck diverter valve, turning off the DHW (if the boiler controls allow it) may release the valve back to the central heating position temporarily — giving you a clue that the diverter is the issue. This is a diagnostic test rather than a solution; the valve needs replacing.</p>

<h3>Is this fault urgent?</h3>
<p>Hot water but no heating is inconvenient but not usually an emergency — provided the property is not at risk of frozen pipes and there are no vulnerable occupants. In cold weather with young children or elderly residents, treat it as a priority repair. Our <a href="/services/emergency-plumber">emergency team</a> is available for urgent heating call-outs across Peterborough.</p>
    `.trim(),
    seoTitle: "Hot Water But No Heating | Causes and Fixes for Your Boiler",
    seoDescription:
      "Have hot water but no heating? Learn the three most common causes — diverter valve, zone valve, and programmer faults — and how to diagnose which one you have.",
    status: "Published",
    publishedAt: new Date("2026-04-26"),
  },

  // ─── 9. Frozen Pipe: How to Thaw ─────────────────────────────────────────
  {
    slug: "frozen-pipe-how-to-thaw",
    title: "Frozen Pipe: How to Thaw It Safely and What to Do Next",
    category: "Emergency & Repairs",
    excerpt:
      "A frozen pipe needs careful handling — thaw it incorrectly and you'll make a burst worse. Here's the safe method, what to watch for, and what to do if the pipe has already cracked.",
    content: `
<h2>Before You Thaw: Turn Off the Water</h2>
<p>The first thing to do when you suspect a frozen pipe is to turn off the water at the main stopcock — not to start thawing. Here's why: a frozen pipe may already have a crack. Ice expands as it freezes, and the pressure inside a blocked pipe can be enough to split copper or plastic. You won't know the pipe has cracked until the ice melts and water starts escaping. If the water is still on when that happens, you have a burst pipe flooding your property.</p>
<p>Turn off the stopcock first. Then thaw. Then restore the water supply cautiously, checking for leaks as pressure returns.</p>

<h2>How to Locate the Frozen Section</h2>
<p>Frozen pipes don't always announce their location obviously. Signs include: a tap that produces no water or only a trickle despite the stopcock being open, a toilet that won't refill, or a section of pipe in an exposed area (loft, garage, external wall) that feels hard and cold compared to surrounding sections.</p>
<p>Pipes most at risk are those in unheated spaces: loft runs near the cold water tank, pipes along external walls with inadequate insulation, pipes in garages or outbuildings, and any outdoor tap supply pipe. Start your investigation in these locations.</p>

<h2>Safe Thawing Methods</h2>
<h3>Hairdryer</h3>
<p>The most practical domestic tool for thawing a frozen pipe. Work from the tap end (the outlet) back towards the frozen section — this allows water to escape as the ice melts rather than building up pressure behind the thawing section. Keep the dryer moving; don't hold it stationary on one point. Works well on copper and plastic pipes in accessible locations.</p>

<h3>Warm Towels or Hot Water Bottle</h3>
<p>For pipes in awkward locations where a hairdryer can't reach safely, wrapping the frozen section in towels soaked in warm (not boiling) water or applying a hot water bottle is effective if slower. Replace the towels or bottle as they cool. Patience matters here — thawing slowly is safer than applying direct heat.</p>

<h3>Warm Air in the Space</h3>
<p>For a frozen loft pipe or a frozen section in an enclosed space, placing a fan heater or portable radiator in the space and letting the ambient temperature rise is a gentle, effective approach. Takes longer but avoids direct heat application to the pipe.</p>

<h2>What Not to Do</h2>
<ul>
<li><strong>Never use a naked flame</strong> — a blowtorch, candle, or gas lighter directly on a pipe is a fire risk and will cause localised overheating that can fail solder joints or cause plastic pipes to deform</li>
<li><strong>Never pour boiling water directly onto a pipe</strong> — the thermal shock can crack a pipe that's already under ice-expansion stress</li>
<li><strong>Don't force water through with a pump</strong> — if a section is fully frozen, additional pressure behind it risks splitting the pipe</li>
</ul>

<h2>How to Tell If the Pipe Has Already Burst</h2>
<p>As the pipe thaws, watch for: water beginning to drip or flow from a joint or section of pipe that didn't previously drip, a bulge or visible deformation in the pipe wall, or water beginning to appear on walls, ceilings, or floors near the frozen section. If any of these appear as the pipe thaws with the stopcock closed, you have a cracked or burst pipe that needs immediate repair before the water is restored.</p>
<p>At this point, call an <a href="/services/emergency-plumber">emergency plumber</a> — do not restore the water supply until the damaged section is repaired. Read our guide to <a href="/blog/water-coming-through-ceiling">water coming through your ceiling</a> if the damage has affected the floor above.</p>

<h2>After Thawing: Preventing a Repeat</h2>
<p>Once the pipe is thawed and confirmed intact, the work isn't finished. The conditions that caused it to freeze will cause it to freeze again in the next cold snap. Our guide to <a href="/blog/prepare-plumbing-for-winter">preparing your plumbing for winter</a> covers insulation, frost protection settings, and the other steps that make frozen pipes unlikely to recur. Our <a href="/guides/how-to-prevent-frozen-pipes">guide on preventing frozen pipes</a> has more detail on lagging and frost protection measures.</p>
<p>If the frozen pipe is in a loft, garage, or other unheated space and isn't easily insulated, our <a href="/services/plumbing-repairs">plumbing repairs</a> team can re-route the pipe through a more protected route or install appropriate lagging. <a href="/book">Book online</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does it take to thaw a frozen pipe?</h3>
<p>With a hairdryer applied carefully, a short frozen section of 30–60 cm typically thaws within 20–40 minutes. Longer frozen runs or pipes in very cold locations (deep loft, exposed outside wall) can take considerably longer. Do not rush — slow and steady thawing is safer than aggressive heat.</p>

<h3>Can a frozen pipe burst even after thawing?</h3>
<p>Yes — a pipe can have a hairline crack from ice expansion that is held closed while ice is present, then opens and leaks once the pipe is fully thawed. This is why turning off the stopcock before thawing and carefully restoring the supply in stages is important. Watch the pipe and surrounding area carefully for 30 minutes after restoring water to confirm there are no leaks.</p>

<h3>Is a frozen pipe covered by home insurance?</h3>
<p>Damage caused by a burst frozen pipe — water damage to floors, ceilings, contents — is typically covered under the escape of water section of a standard home buildings and contents policy. The cost of repairing the pipe itself is usually not covered (it's considered a maintenance item). Document the damage before clearing up, and report to your insurer promptly.</p>

<h3>Can I prevent outdoor taps from freezing?</h3>
<p>Yes — turn off the outdoor tap supply using its indoor isolation valve and drain the tap by opening it after isolation. For added protection, fit an insulating cover over the outdoor tap body itself. If your outdoor tap doesn't have an indoor isolation valve, fitting one is a straightforward job that makes winterisation much easier. Ask us to add one on a routine call-out.</p>
    `.trim(),
    seoTitle: "Frozen Pipe: How to Thaw It Safely | Step-by-Step UK Guide",
    seoDescription:
      "Safe methods for thawing a frozen pipe — hairdryer, warm towels, what NOT to do — and how to check if it's already burst before turning the water back on.",
    status: "Published",
    publishedAt: new Date("2026-04-29"),
  },

  // ─── 10. No Heating This Winter Peterborough ─────────────────────────────
  {
    slug: "no-heating-winter-emergency-peterborough",
    title: "No Heating This Winter? Emergency Steps and Who to Call in Peterborough",
    category: "Emergency & Repairs",
    excerpt:
      "Heating failure in cold weather needs to be diagnosed and fixed quickly — but a few checks first can tell you whether you need an emergency call-out or just a thermostat reset.",
    content: `
<h2>Don't Call an Engineer Before Checking These First</h2>
<p>A heating engineer call-out in cold weather is in high demand and rightly costs a premium. Before you call, spend five minutes on the checks below — roughly 30% of winter "no heating" calls turn out to be a settings issue, a tripped boiler, or a pressure problem that homeowners can resolve themselves.</p>

<h3>1. Check the Boiler Display</h3>
<p>Is the boiler showing a fault code or a lockout light? If it's displaying a code, see our guide to <a href="/blog/boiler-error-codes-explained">boiler error codes</a> — some codes indicate a pressure issue you can fix yourself in under 10 minutes. A pressure below 1 bar is the most common cause of winter lockouts. Check the gauge on the boiler front panel; if it reads below 1 bar, <a href="/guides/how-to-repressurise-your-boiler">repressurising the boiler</a> will often restore heating immediately.</p>

<h3>2. Check the Thermostat and Programmer</h3>
<p>Is the room thermostat set above the current room temperature? Is the programmer set to heating "on" and not overridden to "off"? After power cuts (common in cold weather), programmers sometimes lose their schedules. Try switching the heating to "continuous" temporarily to isolate whether the issue is the controls rather than the boiler.</p>

<h3>3. Check the Condensate Pipe</h3>
<p>Modern condensing boilers have a plastic condensate pipe — typically a grey or white 20–32mm pipe exiting through an external wall — that carries acidic water produced during condensation from the boiler to a drain. In freezing weather, this pipe can ice up and cause the boiler to lock out with a "condensate blockage" warning. Pouring warm (not boiling) water over the external section of the pipe and resetting the boiler often clears this immediately. It's one of the most common winter boiler faults in Peterborough given the area's typical January and February temperatures.</p>

<h3>4. Check the Gas Supply</h3>
<p>Is your gas meter reading normally? Do other gas appliances work (gas hob, gas fire)? If no gas appliances are working, there may be a supply interruption. Check whether neighbours are affected, then call Cadent Gas (the network operator) on 0800 111 999.</p>

<h2>When It's a Genuine Emergency</h2>
<p>Once you've worked through the basic checks and the heating still isn't working, it's time to call an engineer. Treat it as urgent if:</p>
<ul>
<li>There are young children, elderly, or medically vulnerable occupants in the property</li>
<li>External temperatures are forecast below zero overnight</li>
<li>The property has been cold for more than 12–24 hours and pipes may be at risk of freezing</li>
<li>You are a tenant — your landlord has a legal obligation to restore heating within a reasonable timeframe (typically 24 hours in cold weather)</li>
</ul>

<h2>Keeping Warm While You Wait</h2>
<p>If an engineer can't attend immediately:</p>
<ul>
<li>Electric fan heaters or plug-in oil-filled radiators are the fastest source of supplemental heat — keep them in the rooms you're using rather than trying to heat the whole house</li>
<li>Close off unused rooms to concentrate retained heat where you need it</li>
<li>Keep the property at least 12°C — this is the threshold below which pipe freezing becomes a risk in unheated spaces</li>
<li>If temperatures are forecast to drop below zero, leave cupboard doors open to allow warm air to reach pipes under sinks on external walls</li>
</ul>

<h2>Our Emergency Heating Service in Peterborough</h2>
<p>Our <a href="/services/emergency-plumber">emergency call-out team</a> covers all Peterborough postcodes (PE1–PE7) and surrounding areas including Stamford, Market Deeping, Yaxley, and Whittlesey. We carry common replacement parts — diverter valves, pressure sensors, motorised valves, condensate trap components — on every van, meaning most winter heating faults are resolved in a single visit. Call 01733797074 or <a href="/book">book online</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>How quickly must a landlord fix a heating failure?</h3>
<p>Under the Landlord and Tenant Act 1985, landlords must keep heating systems in good working order. There's no fixed legal timeframe but the courts and housing tribunals consistently expect heating to be restored within 24 hours in cold weather when vulnerable occupants are present, and within a few days in other circumstances. If your landlord is unresponsive, contact your local council's private sector housing team — they have enforcement powers for hazardous housing conditions.</p>

<h3>My boiler fires but the radiators are cold — is that an emergency?</h3>
<p>If the boiler is firing but radiators aren't heating, the issue is likely a diverter valve, zone valve, pump, or thermostat fault rather than a boiler failure. See our guide on <a href="/blog/hot-water-no-heating-fault">hot water but no heating</a> for a breakdown of these specific faults. It's still worth arranging a repair promptly in cold weather but it's not usually a same-day emergency unless pipes are at risk.</p>

<h3>Can I bleed radiators to restore heating?</h3>
<p>Bleeding radiators removes trapped air — the cause of radiators that are hot at the bottom but cold at the top, or slow to heat. It won't restore heating if the boiler isn't firing or if a valve or pump has failed. If all radiators are completely cold and the boiler isn't responding to the programmer, bleeding won't help. Our guide on <a href="/guides/how-to-bleed-a-radiator">how to bleed a radiator</a> explains when it's the right step.</p>

<h3>Will my home insurance cover a hotel if my heating fails in winter?</h3>
<p>Some home insurance policies include alternative accommodation cover for uninhabitable conditions. Heating failure alone rarely qualifies unless the property temperature poses a demonstrable safety risk (frozen pipes imminent, vulnerable occupants). Check your policy schedule — and for tenants, the obligation lies with the landlord, not your own insurance.</p>
    `.trim(),
    seoTitle: "No Heating in Winter | Emergency Steps and Peterborough Call-Out",
    seoDescription:
      "Heating not working in cold weather? Check these things first before calling an engineer — and when it IS an emergency, who to call in Peterborough.",
    status: "Published",
    publishedAt: new Date("2026-05-02"),
  },

  // ─── 11. Before Your HMO Licence: Plumbing Checklist ─────────────────────
  {
    slug: "hmo-licence-plumbing-checklist",
    title: "Before Your HMO Licence: A Plumbing Checklist for Landlords",
    category: "Landlord & Legal",
    excerpt:
      "An HMO licence inspection will assess your plumbing provision directly. Here's the plumbing checklist to work through before the council visits — so you're not scrambling to fix things under pressure.",
    content: `
<h2>Why Plumbing Is Inspected in HMO Licensing</h2>
<p>Peterborough City Council's HMO licensing inspection assesses properties against the Housing Health and Safety Rating System (HHSRS). Plumbing provision sits directly within several HHSRS hazard categories — personal hygiene, food safety, excess cold, and water supply — meaning deficiencies in bathroom provision, hot water, or heating can generate a Category 1 hazard rating, which blocks licence approval and can trigger an improvement notice.</p>
<p>The most effective approach is a pre-application plumbing audit — working through the checklist below before you submit and before the inspector visits. Our <a href="/services/landlord-services">landlord services team</a> carries out pre-application assessments across Peterborough.</p>

<h2>The Pre-Licence Plumbing Checklist</h2>

<h3>Bathroom and Toilet Provision</h3>
<ul>
<li>Count of bathrooms/shower rooms and separate WCs vs number of permitted occupants. Minimum ratios: 1 bathroom per 1–4 occupants, 2 per 5–9 occupants (check current Peterborough local conditions — they may exceed the national minimum)</li>
<li>Every bathroom has a working shower or bath in good functional condition</li>
<li>Every WC flushes correctly and has a properly seated pan seal</li>
<li>All waste connections drain freely — no slow drainage or blockages</li>
<li>Extractor fans fitted in bathrooms without openable windows (Building Regs requirement)</li>
</ul>

<h3>Hot Water Supply</h3>
<ul>
<li>Hot water reaches every bathroom, shower, and kitchen sink in the property</li>
<li>Hot water cylinder or combi boiler is sized for the number of occupants — not just a family-sized unit repurposed for 6+ tenants</li>
<li>Hot water temperature at cylinder: minimum 60°C (Legionella control)</li>
<li>Thermostatic mixing valves (TMVs) fitted to all bath and shower outlets delivering water at a safe 43–46°C at point of use — particularly important for HMOs with vulnerable occupants</li>
<li>No dead legs (long sections of pipework that rarely have water flowing through them — Legionella risk)</li>
</ul>

<h3>Heating</h3>
<ul>
<li>Every habitable room has adequate fixed heating capable of achieving 18°C at -1°C external temperature</li>
<li>Heating controls accessible to all occupants — no single-point control that one tenant can use to deny heat to others</li>
<li>No reliance on portable plug-in heaters as primary heating</li>
</ul>

<h3>Gas Safety</h3>
<ul>
<li>Current Gas Safety Certificate (CP12) in date — issued within the past 12 months by a Gas Safe registered engineer</li>
<li>Copies of the certificate available to provide to all tenants</li>
<li>Annual boiler service up to date and documented</li>
<li>No unsafe gas appliances or pipework — all visible pipework in good condition</li>
</ul>

<h3>Water Safety and Legionella</h3>
<ul>
<li>Written Legionella risk assessment completed and on file</li>
<li>Control measures documented and implemented (cylinder temperature, flushing protocol for little-used outlets, tank and pipe condition checks)</li>
<li>Cold water storage tanks (if present) covered, clean, and free of debris</li>
</ul>

<h3>Cold Water Supply</h3>
<ul>
<li>Adequate water pressure at all outlets — not just one floor or one area of the property</li>
<li>Mains stopcock accessible and operational</li>
<li>Individual isolation valves accessible for maintenance without disrupting all tenants</li>
</ul>

<h2>Common Failures That Block Licence Approval</h2>
<p>Based on local inspection patterns, the issues that most frequently delay or block HMO licence approval on plumbing grounds include:</p>
<ul>
<li>Insufficient bathroom provision for the number of occupants</li>
<li>No current Gas Safety Certificate — this is an automatic block</li>
<li>Hot water system undersized for occupancy level</li>
<li>No written Legionella risk assessment</li>
<li>No TMVs on bath/shower outlets</li>
<li>Extractor fans absent or non-functional in bathrooms</li>
</ul>
<p>All of these are fixable — but fixing them takes time. A gas safety check can be arranged quickly; a new hot water system may take several weeks. Start the audit as early as possible before your intended application date.</p>

<h2>Booking a Pre-Application Assessment</h2>
<p>Our <a href="/services/landlord-services">landlord services team</a> carries out pre-HMO-licence plumbing assessments across Peterborough — visiting the property, working through the relevant compliance requirements, and providing a written report of any gaps alongside a remediation plan. This gives you time to complete any required work before the council inspector visits. <a href="/book">Book an assessment online</a> or call 01733797074.</p>
<p>For a full overview of what HMOs require, read our guide to <a href="/blog/hmo-plumbing-requirements-landlords">HMO plumbing requirements</a>. For gas safety certificate requirements, see our <a href="/blog/landlord-gas-safety-guide">landlord gas safety guide</a>.</p>

<h2>Frequently Asked Questions</h2>
<h3>How far in advance should I carry out the plumbing audit?</h3>
<p>Allow at least 6–8 weeks before your intended licence application date. A gas safety certificate can typically be arranged within a week. Hot water system upgrades or significant plumbing work may take 2–4 weeks to complete after a survey and quote. Booking an assessment 8 weeks out gives you adequate time to address any findings without rushing or delaying the application.</p>

<h3>What if the inspector finds a problem I didn't know about?</h3>
<p>If the council inspector identifies a plumbing issue during the licensing inspection, they will typically issue an Improvement Notice specifying the required work and a timeframe for completion. The licence application is held pending evidence of completion. It's far better to identify and resolve issues before the inspection than to receive an Improvement Notice — the council is less flexible on timelines once formal enforcement action has been initiated.</p>

<h3>Do all HMOs need a licence in Peterborough?</h3>
<p>Mandatory HMO licensing applies to properties occupied by 5 or more people from 2 or more separate households. Peterborough City Council also operates additional and selective licensing schemes covering smaller HMOs in certain areas. Check the council's current licensing register to confirm whether your specific property requires a licence under any scheme.</p>

<h3>Can I use the same Gas Safety Certificate for multiple rooms/units within the HMO?</h3>
<p>Yes — a single CP12 certificate covering all gas appliances in the property is issued per property, not per room or unit. However, every tenant in the HMO must receive a copy within 28 days of the check being completed. Keep a distribution record showing when each tenant received their copy.</p>
    `.trim(),
    seoTitle: "HMO Licence Plumbing Checklist | What to Fix Before the Inspection",
    seoDescription:
      "Pre-HMO licence plumbing checklist for Peterborough landlords. Bathroom ratios, gas safety, hot water, Legionella, and what commonly blocks licence approval.",
    status: "Published",
    publishedAt: new Date("2026-05-05"),
  },

  // ─── 12. Buying Old House Peterborough: Plumbing Red Flags ───────────────
  {
    slug: "buying-old-house-peterborough-plumbing",
    title: "Buying an Old House in Peterborough? Plumbing Red Flags to Look For",
    category: "Local Guides",
    excerpt:
      "Peterborough's pre-1970s housing stock — from city centre Victorians to 1960s estates in Bretton and Orton — carries specific plumbing risks that a standard homebuyer survey won't tell you about. Here's what to look for.",
    content: `
<h2>What "Old" Means in Peterborough's Housing Stock</h2>
<p>Peterborough has a diverse housing mix. The city centre and inner suburbs have Victorian and Edwardian terraces from before 1910. The post-war development of Bretton, Orton, and Werrington in the 1960s and 70s created large estates of semi-detached and detached housing. Market Deeping, Yaxley, and the villages have a mix of pre-war cottages and 1970s bungalows. Stamford's Georgian and Victorian core is among the most attractive — and most challenging — building stock in the area.</p>
<p>Each era of construction has its own plumbing characteristics, and a property that looks sound and well-maintained externally can have a plumbing system that's operating on borrowed time. A standard RICS homebuyer survey won't test a single tap or inspect a single joint. That's what a <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a> is for.</p>

<h2>Lead Pipes: The Silent Risk in Pre-1970 Properties</h2>
<p>Properties built before around 1970 may have lead supply pipework — either the mains supply pipe from the street (the "communication pipe") or internal distribution pipework. Lead was the standard material for domestic supply pipes until copper became the norm in the 1950s and 60s.</p>
<p>Lead pipework is a health concern — the WHO has no safe level of lead exposure for children — and Anglian Water's ongoing pipe replacement programme has replaced much of the public network. However, the private supply pipe from your property boundary to the house may still be lead, and so may internal pipework, particularly in pre-1950 properties.</p>
<p>At a viewing, look under the kitchen sink at the rising main — if the pipe has a dull grey colour and is soft enough to scratch with a fingernail, it's likely lead. Confirm with a plumber as part of a survey. Lead pipe replacement is not prohibitively expensive — a new MDPE supply pipe from boundary to house typically costs £600–£1,500 — but it should be factored into your purchase price negotiation.</p>

<h2>Clay Drainage: What to Expect</h2>
<p>Properties built before the 1970s almost universally have clay drainage — ceramic pipes joined in sections with flexible collars or simple butt joints. Clay is durable when intact, but the joints are vulnerable to ground movement, root intrusion, and displacement over time.</p>
<p>The condition of clay drainage in a 60-year-old property varies enormously depending on local ground conditions, tree coverage, and whether any previous work has been done. In Peterborough, tree-lined streets in Orton, Bretton, and the city centre are higher risk for root intrusion. A CCTV drain survey is the only way to assess clay drainage condition without guessing. Consider it non-negotiable on any pre-1970 purchase.</p>

<h2>Original Copper Pipework: When to Be Concerned</h2>
<p>Copper pipework from the 1960s and 70s is reaching 50–60 years of age. In Peterborough's hard water area, limescale accumulation inside old copper can reduce flow and increase pressure on pipe walls. More significant is the risk of dezincification in older brass fittings and valves — a corrosion process that causes fittings to fail suddenly.</p>
<p>Old copper in otherwise good condition, with no evidence of previous leaks or repairs, may last another 20+ years. Old copper with a history of pinhole leaks, visible green verdigris around joints, or signs of repeated patching is a more concerning finding. Ask whether the vendor has any history of plumbing leaks or repairs — and look for evidence of patched ceilings or previously damp plaster.</p>

<h2>Boilers in Older Properties</h2>
<p>Many older Peterborough properties still have boilers installed in the 2000s or earlier — some running into their third decade. Any boiler over 12 years old should be factored into the purchase as a near-term replacement cost. A boiler survey forms part of a full <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a> and will confirm age, service history, flue condition, and likely remaining lifespan.</p>
<p>Particularly look for: lack of a service record (common in rented properties), condensate pipes not present (pre-2005 non-condensing boilers are significantly less efficient), and non-standard flue configurations common in older conversions.</p>

<h2>What to Check at a Viewing</h2>
<ul>
<li>Run hot and cold taps in every room — note pressure and temperature</li>
<li>Flush every toilet — does the cistern refill fully and stop?</li>
<li>Check under kitchen and bathroom sinks for signs of previous leaks (water staining on cabinet floors and bases)</li>
<li>Look at the boiler — note the make, model, and year if visible. Check for a service sticker</li>
<li>Look at the cold water supply pipe rising from the floor under the kitchen sink — lead or copper?</li>
<li>Check ceilings below bathrooms for historic water staining</li>
<li>Look for patches of newer plaster on walls at low level (possible previous rising damp repair)</li>
</ul>

<h2>The Cost of Getting It Wrong</h2>
<p>A pre-purchase plumbing survey typically costs £300–£500 for a medium-sized property. The cost of buying a house with undetected lead pipework, a collapsed drain, or an imminent boiler failure runs into thousands — and is entirely on you once contracts have exchanged. The survey cost is one of the best-value investments available in the buying process. <a href="/book">Book a survey</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Will my mortgage lender flag plumbing problems?</h3>
<p>A mortgage valuation survey is not a detailed property inspection — it assesses value, not condition. It will not test the plumbing and is unlikely to flag a failing drain or old lead pipework. Only a specialist plumbing survey provides meaningful information about the water and drainage systems.</p>

<h3>Can I negotiate a price reduction based on a plumbing survey?</h3>
<p>Yes — and this is one of the primary reasons buyers commission surveys. A written report documenting specific defects (lead pipework, CCTV evidence of a cracked drain, a boiler past its economic life) gives you a documented, professional basis for requesting either a price reduction or specific remediation before completion. Vendors who have already accepted an offer generally prefer to negotiate rather than lose the sale.</p>

<h3>Is Peterborough a high-risk area for clay drain problems?</h3>
<p>Above average. The combination of mature tree coverage in older residential areas, Cambridgeshire's shrinkable clay subsoil (which causes seasonal ground movement), and a large proportion of pre-1970 housing makes Peterborough a higher-risk area for drain displacement and root intrusion than areas with predominantly modern drainage. A CCTV survey on any pre-1970 purchase is a sensible investment.</p>

<h3>How do I find out if a supply pipe is lead?</h3>
<p>Look under the kitchen sink at the rising main. Lead pipe is dull grey, slightly softer than copper, and will leave a grey mark if you scratch it with a coin. Copper is brighter (orange-gold when clean) and hard. Your water supplier (Anglian Water) can also confirm whether the communication pipe (from the street to your boundary) has been replaced as part of their lead reduction programme.</p>
    `.trim(),
    seoTitle: "Buying an Old House in Peterborough? Plumbing Red Flags to Check",
    seoDescription:
      "Pre-1970s Peterborough properties carry specific plumbing risks — lead pipes, clay drains, ageing boilers. Here's what to look for before you exchange contracts.",
    status: "Published",
    publishedAt: new Date("2026-05-08"),
  },

  // ─── 13. Pre-Purchase Survey Cost ────────────────────────────────────────
  {
    slug: "pre-purchase-plumbing-survey-cost",
    title: "How Much Does a Pre-Purchase Plumbing Survey Cost?",
    category: "Local Guides",
    excerpt:
      "A pre-purchase plumbing survey is one of the most cost-effective investments in the home-buying process. Here's what it costs, what affects the price, and why it's worth it.",
    content: `
<h2>Why Costs Vary</h2>
<p>A pre-purchase plumbing survey is a specialist inspection — not a quick visual check. The price reflects the engineer's time, expertise, the extent of testing carried out, and the quality of the written report. Quotes that seem unusually cheap often involve a walk-through with a damp meter rather than a proper functional assessment. Understanding what should be included helps you compare quotes accurately.</p>

<h2>Typical Pre-Purchase Plumbing Survey Costs (Peterborough, 2026)</h2>
<ul>
<li><strong>1–2 bedroom flat or small terraced house</strong>: £250–£350</li>
<li><strong>3–4 bedroom semi-detached or detached</strong>: £350–£500</li>
<li><strong>Large detached, 5+ bedrooms</strong>: £500–£700</li>
<li><strong>Period or listed property (additional complexity)</strong>: £500–£800</li>
<li><strong>Add CCTV drain survey</strong>: £150–£300 additional (highly recommended for pre-1970 properties)</li>
</ul>
<p>These figures include the on-site inspection, functional testing of all plumbing and heating elements, and a written report with photographs. Travel within the Peterborough area is included. VAT is included in the above ranges.</p>

<h2>What's Included in a Proper Survey</h2>
<p>A thorough survey — not just a damp meter walk-round — should cover:</p>
<ul>
<li>All taps tested for flow, pressure, and temperature</li>
<li>All toilets flushed and cistern fill assessed</li>
<li>Boiler age, make, model, service history, and functional test</li>
<li>Visible pipework assessed for material and condition</li>
<li>Water pressure tested at multiple points</li>
<li>Radiators tested for heat output</li>
<li>Cold water storage tank (where present) inspected</li>
<li>External drainage and inspection chambers visually assessed</li>
<li>Written report with defect schedule and urgency classification</li>
</ul>
<p>For what the report covers in detail, see our guide to <a href="/blog/pre-purchase-plumbing-survey-guide">pre-purchase plumbing surveys</a>.</p>

<h2>When a CCTV Drain Survey Is Also Needed</h2>
<p>The standard plumbing survey covers visible drainage — external gullies, manhole condition, and drainage flow rates. It does not inspect underground pipes by camera. For any property built before 1970, or any property with mature trees near the drain runs, a <a href="/blog/cctv-drain-survey-peterborough">CCTV drain survey</a> carried out at the same time is strongly advisable.</p>
<p>Combining both surveys in one visit is more cost-effective than booking them separately. The combined cost for a standard 3-bedroom property is typically £500–£700 in total — and can reveal issues (cracked drains, root intrusion, collapsed sections) that completely change the negotiating position before exchange.</p>

<h2>Is It Worth the Cost?</h2>
<p>Consider what you're protecting. The cost of lead pipework replacement: £600–£1,500. A boiler replacement: £2,500–£4,000. A collapsed drain repair: £1,500–£5,000. A section of re-laid drainage after root damage: £1,000–£3,000. Any one of these hidden defects, undisclosed because no one looked, leaves you paying from your own pocket after exchange.</p>
<p>A pre-purchase survey typically costs less than 0.1% of a property's purchase price. It gives you documented evidence of any defects before you commit, the ability to negotiate, and the confidence to proceed — or the information to walk away. For older Peterborough properties, it's rarely a purchase where the survey doesn't earn its fee several times over.</p>
<p>To discuss the right survey type for a specific property, <a href="/book">book online</a> or call 01733797074. Our <a href="/services/pre-purchase-plumbing-survey">pre-purchase survey service</a> covers Peterborough, Stamford, Market Deeping, Yaxley, and Whittlesey.</p>

<h2>Frequently Asked Questions</h2>
<h3>When in the buying process should I book the survey?</h3>
<p>After your offer is accepted and before you instruct your solicitor to exchange contracts. The survey findings may affect the price you agree to pay or conditions you attach to the purchase — so it needs to happen before you're legally committed. Most buyers commission a plumbing survey at the same time as their RICS homebuyer or structural survey.</p>

<h3>Can I share the survey report with my solicitor?</h3>
<p>Yes — and in some cases your solicitor may reference specific findings in pre-exchange correspondence or request a vendor's written response to material defects. The report is your document to use as you see fit. Ensure the report is addressed to you as the prospective buyer, not to the vendor or agent.</p>

<h3>Does the survey cover the electrics?</h3>
<p>No — a plumbing survey covers water supply, drainage, heating, and gas appliances. The electrical installation is covered by a separate EICR (Electrical Installation Condition Report) carried out by a qualified electrician. Both are worth having on older properties.</p>

<h3>What if the vendor won't allow a survey?</h3>
<p>A vendor has no obligation to allow access for a buyer's survey before exchange — though refusing is a yellow flag in itself. In practice, most vendors grant access because a refusal makes buyers nervous and can stall or lose the sale. If access is genuinely refused, factor the unknown condition of the plumbing system into your offer price accordingly.</p>
    `.trim(),
    seoTitle: "Pre-Purchase Plumbing Survey Cost | 2026 Price Guide",
    seoDescription:
      "How much does a pre-purchase plumbing survey cost in Peterborough? Typical price ranges, what's included, when to add a CCTV drain survey, and why it's worth every penny.",
    status: "Published",
    publishedAt: new Date("2026-05-11"),
  },

  // ─── 14. Thermal Imaging Leak Detection ───────────────────────────────────
  {
    slug: "thermal-imaging-leak-detection",
    title: "Thermal Imaging Leak Detection: How It Works and When You Need It",
    category: "Damp & Leaks",
    excerpt:
      "Thermal imaging cameras detect temperature differences invisible to the naked eye — making them one of the most powerful tools for finding hidden leaks, damp, and failing underfloor heating circuits without any surface damage.",
    content: `
<h2>What a Thermal Camera Actually Detects</h2>
<p>A thermal imaging camera doesn't see through walls. It measures the surface temperature of whatever it's pointed at and renders that as a colour-mapped image — warmer areas shown in reds and yellows, cooler areas in blues and greens. The key to leak detection is that water behaves differently from dry building material: a wet section of wall, floor, or ceiling has different thermal mass and evaporative characteristics from a dry section, creating a detectable temperature difference at the surface.</p>
<p>This temperature difference is subtle — often less than 1°C — which is why specialist thermal cameras with millikelvin sensitivity are needed, rather than consumer-grade devices. When used by a trained operator who understands what they're looking for, a thermal camera can reveal:</p>
<ul>
<li>Moisture spread within walls, floors, and ceilings from any water source</li>
<li>The route of pipes concealed within floor screeds or wall plaster (warm pipes show as warm lines)</li>
<li>Leaks in underfloor heating circuits (a break in the circuit shows as a cool gap in an otherwise warm floor pattern)</li>
<li>The extent of water saturation following a leak event — including moisture that has tracked sideways beyond the visible damage area</li>
<li>Cold bridges and insulation gaps (relevant to condensation diagnosis)</li>
</ul>

<h2>Best Use Cases for Thermal Imaging</h2>
<h3>Underfloor Heating Leaks</h3>
<p>Thermal imaging is the method of choice for underfloor heating circuit leaks. A wet underfloor heating system loses pressure slowly, often without any visible surface signs. A thermal camera scan of the floor with the heating running shows the full pattern of circuit coverage — and a leak in one circuit appears as a cool anomaly or a localised warm area (from the escaping heated water) in an otherwise regular pattern. The exact location of the leak can be identified to within 20–30 cm, allowing targeted core drilling rather than lifting the entire floor.</p>

<h3>Pipe Leaks Behind Tiles and Plaster</h3>
<p>In tiled bathrooms, kitchens, and wet rooms, finding a leaking supply or waste pipe without removing tiles has traditionally been impossible. Thermal imaging changes this: a leaking hot water pipe behind tiles creates a warm anomaly on the tile surface. A leaking cold water pipe creates a cooler, wetter patch as moisture evaporates from the tile face. Neither requires a single tile to be removed for detection — though access to the surface from the room side is required.</p>

<h3>Mapping Moisture Extent After a Leak Event</h3>
<p>After a significant water ingress — a burst pipe, a ceiling leak, flooding — it's often unclear how far moisture has tracked through the building structure. Thermal imaging maps moisture spread comprehensively, showing wet areas that aren't yet visible as damp patches but will cause mould and structural damage if not dried. This is valuable both for insurance claim documentation and for directing drying equipment efficiently. See our guide on <a href="/blog/how-plumbers-find-hidden-leaks">how plumbers find hidden leaks</a> for the full toolkit used in detection surveys.</p>

<h2>What Thermal Imaging Can't Do</h2>
<p>Thermal imaging is a surface measurement tool. It detects temperature anomalies at the surface of what it's scanning — it does not see through solid materials or detect dry pipes that aren't currently leaking. Limitations include:</p>
<ul>
<li>Cannot detect a leak in a pipe that has been off (dry) for several hours — no temperature differential to measure</li>
<li>Works best when there's a temperature differential between the leak source and surrounding material. Works poorly in conditions where ambient temperature is uniform throughout</li>
<li>Cannot pinpoint depth of a leak — only surface location. Combined with acoustic detection for precise depth measurement where needed</li>
<li>High-spec cameras needed: consumer thermal cameras (<£1,000) lack the sensitivity for reliable leak detection</li>
</ul>

<h2>Thermal Imaging as Part of a Combined Survey</h2>
<p>On complex leak detection cases, thermal imaging is typically used alongside acoustic detection — each method providing information the other can't. Acoustic pinpoints the sound of water escaping under pressure; thermal imaging maps the moisture spread from that point. Together they provide a comprehensive picture: confirmed leak location, confirmed moisture extent, and the data needed to direct any targeted opening-up accurately.</p>
<p>Our <a href="/services/damp-leak-detection">damp and leak detection surveys</a> use both methods where the case calls for it — combined with moisture meter mapping and tracer gas where depth accuracy is critical. <a href="/book">Book a detection survey</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Does thermal imaging work through tiles?</h3>
<p>Yes — ceramic and porcelain tiles conduct heat and transfer surface temperature accurately to the tile face, provided the camera is used with correct thermal conditions (heating running for underfloor circuits, or pipe actively carrying water for supply pipe leaks). Thick natural stone tiles conduct heat less uniformly and may reduce image clarity, though the method still works with careful technique.</p>

<h3>Can I hire a thermal camera and do it myself?</h3>
<p>Consumer-grade thermal cameras (£200–£800) are available to hire but lack the millikelvin sensitivity needed for reliable detection of subtle temperature differences from moisture or concealed pipes. More importantly, thermal imaging for leak detection requires trained interpretation — a temperature anomaly on a wall has multiple possible causes, and misinterpretation leads to incorrect diagnosis. For a reliable result, a specialist operator with a calibrated professional-grade camera is needed.</p>

<h3>Is thermal imaging used for building surveys?</h3>
<p>Yes — thermal imaging is increasingly used as a supplementary tool in structural surveys, particularly for identifying heat loss, missing insulation, and condensation risk. Some RICS surveyors offer thermal imaging as an add-on. For plumbing leak detection specifically, a plumber with thermal imaging equipment combines the structural image interpretation with the plumbing system knowledge needed to act on what the camera finds.</p>

<h3>How much does a thermal imaging leak survey cost?</h3>
<p>A thermal imaging survey as part of a combined leak detection assessment typically costs £200–£400 for a domestic property, depending on the scope. See our detailed cost guide at <a href="/blog/leak-detection-cost-uk">how much does leak detection cost in the UK</a> for a breakdown by survey type.</p>
    `.trim(),
    seoTitle: "Thermal Imaging Leak Detection | How It Works and When You Need It",
    seoDescription:
      "How thermal imaging cameras detect hidden leaks, damp, and failing underfloor heating circuits — without lifting a single floor tile. A guide for UK homeowners.",
    status: "Published",
    publishedAt: new Date("2026-05-14"),
  },

  // ─── 15. Why Is My Radiator Making Noise? ────────────────────────────────
  {
    slug: "radiator-making-noise-causes",
    title: "Why Is My Radiator Making Noise? Banging, Gurgling, and Clicking Explained",
    category: "Boiler & Heating",
    excerpt:
      "Radiator noises are one of the most common heating complaints in UK homes — and different noises mean very different things. Here's how to identify the cause from the sound.",
    content: `
<h2>Different Noises, Different Causes</h2>
<p>A noisy radiator is usually telling you something specific. The type of noise — banging, gurgling, clicking, hissing, or kettling — points to a distinct underlying cause, and the fix varies from a five-minute bleed to a system power flush or boiler repair. Getting the diagnosis right from the sound saves time and avoids treating the wrong problem.</p>

<h2>Banging or Knocking</h2>
<p>A loud banging noise from a radiator or the pipes near it is usually one of three things:</p>
<h3>Water Hammer</h3>
<p>Water hammer is a hydraulic shockwave — caused when a fast-closing valve (a TRV turning off abruptly, a thermostatic mixing valve) creates a pressure wave that travels back through the pipework and strikes a fitting or pipe support. It sounds like a sharp knock or bang, often occurring when the heating turns off. Fitting a pressure-reducing device or adjusting valve closing speed resolves it in most cases. An engineer job.</p>
<h3>Thermal Expansion</h3>
<p>As pipework heats up, it expands — and if it's routed through a tight gap in a floorboard, joist notch, or wall sleeve, it creates a banging or creaking noise as it moves. Usually harmless — but the noise can be startling and intrusive if the pipe is directly under a floor. A plumber can fit a pipe clip or sleeve to eliminate the contact point.</p>
<h3>Kettling from the Boiler</h3>
<p>A deep banging or rumbling that seems to come from the boiler rather than the radiator is kettling — water boiling inside the heat exchanger due to limescale restricting flow. In Peterborough's hard water area this is particularly common. Kettling is a boiler problem rather than a radiator problem and warrants an engineering assessment. A <a href="/blog/what-is-power-flush">power flush</a> of the system may be recommended.</p>

<h2>Gurgling or Bubbling</h2>
<p>Gurgling sounds — a liquid, watery sound inside the radiator or pipework — are almost always air in the system. Air enters central heating circuits through several routes: during initial filling, through a leaking valve, or through the automatic air vent on the boiler if it's faulty.</p>
<p>The fix for air in radiators is bleeding — releasing trapped air through the bleed valve (the small square peg on the side or top of the radiator) until water flows and the air hiss stops. See our guide on <a href="/guides/how-to-bleed-a-radiator">how to bleed a radiator</a>. If radiators need frequent bleeding — more than once or twice per season — there's an ongoing air ingress issue that needs investigating. A system inhibitor top-up may also be needed.</p>
<p>Persistent gurgling after bleeding can also indicate a more significant problem: low system pressure, a failing auto air vent on the boiler, or a leak that's drawing in air as water escapes. Our <a href="/services/central-heating-services">central heating team</a> can diagnose persistent gurgling as part of a system assessment.</p>

<h2>Clicking or Ticking</h2>
<p>A regular clicking or ticking from a radiator, especially as it heats up or cools down, is almost always <strong>normal</strong>. It's the sound of the radiator metal (steel or aluminium) expanding and contracting as its temperature changes. In a radiator that's heating up from cold, a rhythmic tick every few seconds is entirely benign. No action is needed.</p>
<p>If the clicking is louder, more irregular, and accompanied by a hot water drip or staining around a valve, it's worth checking whether a valve is leaking and the noise is associated with water movement past a partially closed seat.</p>

<h2>Hissing</h2>
<p>A continuous hissing from a radiator or TRV (thermostatic radiator valve) usually indicates a valve that's partially open and allowing water to flow past a restriction — or a bleed valve that hasn't been closed fully after bleeding. Check the bleed valve is firmly closed and that the TRV head turns smoothly through its full range. A hissing pressure relief valve on the boiler itself is a more urgent matter — it indicates the system is over-pressurised and the PRV is releasing. Check the boiler pressure gauge; if it reads above 2.5–3 bar with the heating running, call an engineer.</p>

<h2>All Radiators Noisy: System-Wide Problem</h2>
<p>If the noise is coming from multiple radiators throughout the house rather than one specific unit, the problem is systemic rather than localised. The most common causes of system-wide noise are sludge and magnetite accumulation in the circuit (the primary driver for recommending a <a href="/blog/what-is-power-flush">power flush</a>), or air throughout the system from a leak or recent re-pressurisation. See our guide on <a href="/guides/radiators-not-heating-up">radiators not heating up properly</a> for related symptoms.</p>
<p>For a central heating assessment or power flush across Peterborough, <a href="/book">book online</a> or call 01733797074.</p>

<h2>Frequently Asked Questions</h2>
<h3>Is a noisy radiator dangerous?</h3>
<p>In almost all cases, no. Air in radiators, thermal expansion clicks, and minor kettling are inconvenient rather than dangerous. A hissing pressure relief valve on the boiler is the exception — over-pressure in a sealed system requires prompt attention. If the boiler pressure gauge is above 3 bar with the heating running and the PRV is releasing, switch the heating off and call an engineer the same day.</p>

<h3>Can I fix a noisy radiator myself?</h3>
<p>Bleeding a radiator is a safe DIY task — the bleed key is inexpensive and the process takes under five minutes. See our step-by-step guide on <a href="/guides/how-to-bleed-a-radiator">how to bleed a radiator</a>. Other noises — water hammer, kettling, valve issues, system-wide gurgling — benefit from a professional assessment to avoid misdiagnosis.</p>

<h3>Why does only one radiator make noise?</h3>
<p>A single noisy radiator usually has a localised cause: trapped air (bleed it), a faulty or partially closed TRV, a loose pipe clip allowing thermal movement, or a leaking valve. Start with bleeding. If the noise persists after bleeding, check that the TRV head moves freely and the valve seat isn't partially blocked.</p>

<h3>Should I turn the noisy radiator off?</h3>
<p>For gurgling due to air: bleeding is better than turning it off — switching it off may make the air more difficult to purge later. For a radiator that is clearly leaking around a valve: closing the TRV and the lockshield valve to isolate that radiator while you arrange a repair is the right approach. This doesn't affect the rest of the heating circuit.</p>
    `.trim(),
    seoTitle: "Why Is My Radiator Making Noise? Banging, Gurgling & Clicking Causes",
    seoDescription:
      "Different radiator noises mean different problems. Find out what banging, gurgling, clicking, hissing, and kettling mean — and what to do about each one.",
    status: "Published",
    publishedAt: new Date("2026-05-17"),
  },
];

// ─── Seed ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding Wave 2 — 15 blog posts...\n");

  for (const post of wave2Posts) {
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

  console.log("\nWave 2 complete. 15 posts seeded.");
  console.log("\nNew category introduced:");
  console.log("  • 'Bathrooms' — used by: walk-in-shower-vs-bath-home-value, en-suite-bathroom-cost-uk\n");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
