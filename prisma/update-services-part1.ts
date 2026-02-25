/**
 * Run: npx tsx prisma/update-services-part1.ts
 * Updates: gas-safety-certificates, central-heating-services, bathroom-installations,
 *          landlord-services, emergency-plumber
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updates = [
  // ── 1. GAS SAFETY CERTIFICATES ────────────────────────────────────────────
  {
    slug: "gas-safety-certificates",
    data: {
      heroHeading: "Gas Safety Certificates in Peterborough",
      heroSubheading:
        "Legally compliant CP12 certificates for landlords and homeowners. Gas Safe registered engineers, same-day issue, from £60. All Peterborough postcodes covered — PE1 to PE7.",
      shortDescription:
        "CP12 gas safety certificates for landlords and homeowners by Gas Safe registered engineers. From £60, certificates issued same day, across all Peterborough postcodes.",
      seoTitle: "Gas Safety Certificates Peterborough | CP12 From £60 | Same-Day Issue",
      seoDescription:
        "Gas safety certificates (CP12) in Peterborough from £60. Gas Safe engineers, same-day issue, digital and physical copies. Landlord compliance specialists.",
      content: `<h2>Gas Safety Certificates (CP12) in Peterborough</h2>
<p>A Gas Safety Certificate — officially known as a CP12 — is a legal requirement for every landlord in England and Wales, and an important safety check for any homeowner. Our Gas Safe registered engineers (Reg: 123456) carry out thorough CP12 inspections across all Peterborough postcodes (PE1–PE7), with certificates issued on the day of inspection. We've been supporting Peterborough landlords and homeowners for over 30 years — with transparent pricing, no hidden fees, and zero missed renewals for clients on our reminder system.</p>

<h2>What We Inspect — The CP12 Checklist</h2>
<p>Every inspection follows the procedures set out by the Health and Safety Executive (HSE) and Gas Safe Register. Our engineers check every gas appliance and installation in the property:</p>
<ul>
<li><strong>Boiler</strong> — combustion performance, safety devices, flue integrity, and CO risk assessment</li>
<li><strong>Gas fires and wall heaters</strong> — burner condition, flue draught, and ventilation adequacy</li>
<li><strong>Gas cookers and hobs</strong> — burner operation, ignition, and emergency shut-off</li>
<li><strong>Water heaters</strong> — flue condition, combustion analysis, and safety valve testing</li>
<li><strong>Gas pipework and meter installation</strong> — visual inspection for corrosion, joints, and tightness testing</li>
<li><strong>Flue terminals and chimney paths</strong> — checked for blockages, corrosion, and safe removal of combustion gases</li>
<li><strong>Ventilation</strong> — confirmed adequate in all rooms containing gas appliances</li>
<li><strong>Safety devices</strong> — thermocouples, flame failure devices, and pressure relief valves tested on all appliances</li>
<li><strong>Carbon monoxide risk assessment</strong> — full evaluation across all appliances</li>
</ul>
<p>If we find a fault during the inspection, we'll explain it clearly in plain English and provide a no-obligation written quote for repair work. We never pressure you into unnecessary repairs — and we always make the situation safe before we leave.</p>

<h2>Landlord Gas Safety — Your Legal Obligations in 2026</h2>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, every landlord in England and Wales must hold a valid Gas Safety Certificate (CP12) for each rental property that contains gas appliances. This is a criminal legal requirement — not optional guidance — and it applies whether you let a single room or manage a large portfolio.</p>
<p>Key legal requirements landlords must meet:</p>
<ul>
<li><strong>Annual inspection</strong> — a new CP12 must be obtained before the current certificate expires, every 12 months</li>
<li><strong>Qualified engineer only</strong> — the inspection must be carried out by a Gas Safe registered engineer. Verify any engineer's registration at <strong>gassaferegister.co.uk</strong> before they start work</li>
<li><strong>Tenant notification</strong> — existing tenants must receive a copy of the CP12 within 28 days of the inspection; new tenants must be given a copy before they move in</li>
<li><strong>Record keeping</strong> — you must retain a copy of each CP12 for a minimum of two years</li>
<li><strong>Works notice compliance</strong> — if an appliance is found to be "Immediately Dangerous" (ID) or "At Risk" (AR), it must be taken out of service immediately</li>
</ul>
<p>The penalties for non-compliance are serious: fines of up to £6,000 per offence, a criminal record, imprisonment of up to six months, and potential invalidation of your landlord insurance policy. If a tenant is harmed because of an unsafe gas appliance, you could face manslaughter charges.</p>

<h2>Gas Safety Certificates for Homeowners</h2>
<p>Homeowners aren't legally required to hold a CP12, but there are compelling reasons to book an annual gas safety check. If your boiler, gas fire, or cooker hasn't been professionally inspected in over 12 months, combustion issues may have developed that produce carbon monoxide — a colourless, odourless gas responsible for around 40 deaths and over 4,000 hospital admissions in the UK every year.</p>
<p>A homeowner gas safety check is particularly worthwhile if you've recently moved into a property and don't know the inspection history of the gas appliances, if your boiler is over 10 years old, or if you've recently had any work done to the gas system.</p>

<h2>Gas Safety Certificate Pricing — 2026</h2>
<ul>
<li><strong>Single appliance (e.g. boiler only) — from £60</strong></li>
<li><strong>Two appliances (e.g. boiler + gas fire) — from £75</strong></li>
<li><strong>Three or more appliances — from £90</strong></li>
<li><strong>CP12 + Annual Boiler Service bundle — from £110</strong> (most popular with landlords — save vs. booking separately)</li>
<li><strong>Portfolio pricing</strong> — discounted rates for 3+ properties; contact us for a tailored quote</li>
</ul>
<p>All prices are confirmed before we start. There are no call-out charges, no parking fees, and no hidden extras. Combining your CP12 with an <a href="/services/boiler-service">annual boiler service</a> in a single visit is the most cost-effective approach — the engineer is already on-site and much of the safety checking overlaps.</p>

<h2>What You Receive — The CP12 Certificate</h2>
<p>Once our engineer has completed the inspection, you receive your CP12 certificate on the same day. The certificate details:</p>
<ul>
<li>Every gas appliance inspected — make, model, and location</li>
<li>The results of each safety check carried out on each appliance</li>
<li>Pass or fail status for every appliance</li>
<li>Any defects found, classified by severity (Immediately Dangerous, At Risk, or Advisory Notice)</li>
<li>The engineer's full name, Gas Safe registration number, and signature</li>
<li>Issue date and expiry date (12 months from issue)</li>
</ul>
<p>We provide both a physical copy on the day and a digital PDF by email — making it simple for landlords to forward to tenants, letting agents, or solicitors instantly.</p>

<h2>Our Inspection Process</h2>
<ol>
<li><strong>Book online or by phone</strong> — flexible appointments available weekdays, evenings, and Saturdays across all Peterborough PE postcodes</li>
<li><strong>Confirmation sent immediately</strong> — with engineer details and what to have ready (appliance access, keys, meter location)</li>
<li><strong>Engineer arrives on time</strong> — Gas Safe ID shown on arrival. Inspection typically takes 30–60 minutes depending on the number of appliances</li>
<li><strong>Certificate issued same day</strong> — physical copy handed over and digital PDF emailed within the hour</li>
<li><strong>Annual renewal reminder</strong> — we'll contact you automatically before your certificate expires so you never miss a renewal date</li>
</ol>

<h2>Landlord Portfolio Service — Multiple Properties</h2>
<p>Managing a portfolio of rental properties across Peterborough? We make compliance simple. Our portfolio service includes:</p>
<ul>
<li>A single point of contact for all your properties</li>
<li>Discounted rates for 3+ properties (ask for our portfolio pricing)</li>
<li>Direct liaison with tenants to arrange access — you don't have to coordinate</li>
<li>Staggered scheduling to spread renewals across the year if you prefer</li>
<li>Centralised digital record of all certificates, accessible on request</li>
<li>Automatic renewal reminders 4 weeks before each certificate expires</li>
</ul>
<p>Many of our landlord clients also combine their CP12 with a <a href="/services/landlord-services">full landlord maintenance contract</a> covering boiler servicing, priority emergency cover, and between-tenancy plumbing checks — all at a predictable annual cost.</p>

<h2>Areas We Cover for Gas Safety Certificates</h2>
<p>We carry out CP12 inspections across all Peterborough postcodes and surrounding areas:</p>
<ul>
<li>Peterborough city centre (PE1) — Queensgate, Werrington, Dogsthorpe</li>
<li><a href="/areas/orton">Orton (PE2)</a> — Goldhay, Brimbles, Longueville, Wistow, Waterville</li>
<li><a href="/areas/bretton">Bretton (PE3)</a> — Westwood, Paston, Ravensthorpe, Walton</li>
<li><a href="/areas/werrington">Werrington (PE4)</a> — Glinton, Northborough, Peakirk</li>
<li>Yaxley, Farcet, and Stilton (PE7)</li>
<li><a href="/areas/hampton">Hampton (PE7)</a> — Hampton Vale, Hampton Hargate, Stanground</li>
<li><a href="/areas/market-deeping">Market Deeping and Deeping St James (PE6)</a></li>
<li><a href="/areas/stamford">Stamford (PE9)</a> and surrounding Lincolnshire villages</li>
<li><a href="/areas/whittlesey">Whittlesey (PE7)</a>, Eye, and Thorney</li>
</ul>

<h2>What Our Landlord Customers Say</h2>
<blockquote>
<p>&ldquo;Been using Peterborough Plumbers for my CP12 certificates for four years. They deal directly with my tenants, always turn up when they say, and I get the certificate the same day. Couldn't ask for more — and the portfolio rate is very competitive.&rdquo;</p>
<p><strong>— Mark H., Landlord — 6 properties across Peterborough PE2 &amp; PE4 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Had my inspection done last week. Engineer arrived on time, very thorough, and I had my certificate within an hour of him leaving. Great service from a professional local company.&rdquo;</p>
<p><strong>— Claire B., Homeowner — Werrington PE4 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Your CP12?</h2>
<ul>
<li><strong>Gas Safe registered engineers</strong> — Reg: 123456, fully qualified, ID-checked, and insured</li>
<li><strong>30+ years' experience</strong> — serving Peterborough landlords and homeowners since the 1990s</li>
<li><strong>Same-day certificates</strong> — digital PDF and physical copy issued on the day of inspection</li>
<li><strong>Automatic renewal reminders</strong> — we contact you before your certificate expires so you stay compliant</li>
<li><strong>Direct tenant liaison</strong> — we coordinate access so you don't have to</li>
<li><strong>Transparent pricing from £60</strong> — no hidden fees, no call-out charges</li>
<li><strong>Portfolio discounts</strong> — for landlords with 3+ properties</li>
<li><strong>Bundle savings</strong> — combine with a <a href="/services/boiler-service">boiler service</a> for a single discounted visit</li>
<li><strong>4.6-star Google rating</strong> — over 120 verified reviews from Peterborough landlords and homeowners</li>
</ul>
<p>Need to book a gas safety certificate for a rental property or your own home? <a href="/contact">Get in touch today</a> or call us directly to check availability. Same-week appointments are typically available across all Peterborough postcodes.</p>`,
      faqs: [
        { q: "How often do landlords need a gas safety certificate?", a: "Landlords must obtain a new Gas Safety Certificate (CP12) every 12 months for each rental property that contains gas appliances. The inspection must be completed before the current certificate expires — you cannot wait until it has lapsed. The certificate must then be provided to existing tenants within 28 days, or to new tenants before their tenancy begins. We'll send you an automatic reminder 4 weeks before your renewal is due." },
        { q: "What happens if I don't have a valid gas safety certificate?", a: "Operating a rental property without a valid CP12 is a criminal offence. Penalties include fines of up to £6,000 per offence, imprisonment of up to six months, and a criminal record. Your landlord insurance may also be invalidated, leaving you personally liable for any gas-related incidents. If a tenant is harmed due to an unsafe gas appliance, you could face manslaughter charges. The consequences are severe — never let your certificate lapse." },
        { q: "How long does a gas safety inspection take?", a: "A typical gas safety inspection takes 30 to 60 minutes, depending on the number of gas appliances in the property. A single appliance (e.g. boiler only) usually takes around 30 minutes. A property with a boiler, gas fire, and gas cooker will take closer to 60 minutes. We'll give you an estimated duration when you book." },
        { q: "How much does a gas safety certificate cost in Peterborough?", a: "Our CP12 certificates start from £60 for a single appliance. Properties with two appliances are from £75, and three or more from £90. We offer a discounted bundle rate when you combine a gas safety certificate with an annual boiler service — popular with landlords who need both. Portfolio discounts are available for landlords with 3 or more properties." },
        { q: "Do you issue the certificate on the same day?", a: "Yes. Provided all appliances pass the inspection, you'll receive your CP12 certificate on the day — a physical copy from the engineer and a digital PDF emailed to you within the hour. If a fault is found, we'll explain it clearly and advise on next steps. Most minor issues can be resolved on the same visit." },
        { q: "Can I arrange the certificate directly with my tenant?", a: "Absolutely — and we'd recommend it. We can liaise directly with your tenant to book an appointment time that suits them, confirm access arrangements, and update you when the job is complete. This is included as standard at no extra charge. Many of our landlord clients never have to get involved in the logistics at all." },
        { q: "Do you offer reminder services for renewals?", a: "Yes. We keep a record of your certificate expiry dates and contact you automatically — typically 4 weeks before renewal is due. This is especially useful for landlords managing multiple properties who need to stay on top of compliance without tracking every individual expiry date themselves." },
        { q: "Do homeowners need a gas safety certificate?", a: "Homeowners aren't legally required to hold a CP12, but an annual gas safety check is strongly recommended. Hidden combustion faults can produce carbon monoxide — which is colourless, odourless, and potentially lethal. It's particularly worthwhile if you've moved into a property without knowing the appliance history, if your boiler is over 10 years old, or if you haven't had any gas appliances inspected in the past year." },
      ],
    },
  },

  // ── 2. CENTRAL HEATING SERVICES ───────────────────────────────────────────
  {
    slug: "central-heating-services",
    data: {
      heroSubheading:
        "Complete central heating installation, repair, power flushing, and smart controls across Peterborough PE1–PE7. Gas Safe registered engineers. Free quotes on all new installations.",
      shortDescription:
        "Central heating installation, repair, power flushing, and smart thermostat upgrades by Gas Safe engineers. Free quotes, 12-month workmanship guarantee, across all Peterborough postcodes.",
      seoTitle: "Central Heating Peterborough | Installation, Repair & Power Flushing",
      seoDescription:
        "Central heating installation and repair in Peterborough. Radiators, boilers, power flushing, smart controls. Gas Safe engineers, free quotes, 12-month guarantee.",
      content: `<h2>Central Heating Services Across Peterborough</h2>
<p>A reliable central heating system is essential for any Peterborough home — particularly during the long, cold winters in the Fens. Whether you need a complete new system, a repair to your existing heating, a power flush to restore efficiency, or a smart thermostat upgrade, our Gas Safe registered engineers (Reg: 123456) deliver results you can depend on. With over 30 years serving Peterborough homes and landlords, we've installed and maintained heating systems in thousands of properties across all PE postcodes.</p>

<h2>Central Heating Services We Offer</h2>
<p>We provide a comprehensive range of central heating services for domestic properties:</p>
<ul>
<li><strong>Full central heating system design and installation</strong> — new systems from scratch for unheated properties or complete replacements</li>
<li><strong>Boiler replacements and upgrades</strong> — combi, system, and conventional boilers from all major manufacturers</li>
<li><strong>Radiator installation, repositioning, and replacement</strong> — including designer and vertical radiators</li>
<li><strong>Radiator balancing</strong> — ensuring every room heats evenly and efficiently</li>
<li><strong>Thermostatic radiator valve (TRV) fitting</strong> — room-by-room temperature control</li>
<li><strong>Smart thermostat installation</strong> — Nest, Hive, Tado, Honeywell Evohome, and Drayton Wiser</li>
<li><strong>Power flushing and chemical system cleaning</strong> — restoring efficiency to sludged systems</li>
<li><strong>Magnetic filter installation</strong> — Fernox TF1, Adey MagnaClean, and other brands</li>
<li><strong>Pipework repairs, rerouting, and extensions</strong></li>
<li><strong>Underfloor heating installation</strong> — wet (hydronic) and electric systems</li>
<li><strong>System pressure and fault diagnosis</strong></li>
</ul>

<h2>New Central Heating Installations in Peterborough</h2>
<p>If your property doesn't have central heating, or your existing system is beyond economical repair, we design and install a complete system tailored to your home. Our process starts with a free survey of your property — we assess the size, insulation level, window types, and layout to calculate the correct heat load and specify the right boiler output and radiator sizes. Every component is sized correctly from the start, not guessed.</p>
<p>We install systems from Worcester Bosch, Vaillant, Baxi, Ideal, and Viessmann — all Gas Safe registered and backed by manufacturer warranties of 5–12 years depending on the boiler selected. All our installations come with a 12-month workmanship guarantee as standard.</p>

<h2>Central Heating Repairs</h2>
<p>Cold radiators, noisy pipes, uneven heating, and repeated pressure drops are all signs that something isn't right with your heating system. Our engineers diagnose faults quickly and accurately, with most repairs completed on the first visit. We commonly fix:</p>
<ul>
<li><strong>Radiators cold at the top</strong> — trapped air; resolved by bleeding the radiator</li>
<li><strong>Radiators cold at the bottom</strong> — sludge build-up in the lower section; may require a power flush or chemical cleaner</li>
<li><strong>Boiler losing pressure repeatedly</strong> — usually a leak in the system or a failed pressure relief valve</li>
<li><strong>Banging, gurgling, or kettling noises</strong> — scale on the heat exchanger, sludge build-up, or air in the system</li>
<li><strong>Thermostat not responding correctly</strong> — wiring fault, dead batteries, or a faulty room thermostat</li>
<li><strong>Leaking radiator valves or pipe joints</strong> — valve seal failure or loose compression fittings</li>
<li><strong>Pump failure or poor circulation</strong> — pump replacement or system flushing</li>
<li><strong>Zone valve failures</strong> — motorised valve replacement on S or Y-plan systems</li>
</ul>

<h2>Power Flushing — Restore Your Heating Efficiency</h2>
<p>Over time, central heating systems accumulate magnetite (black sludge), limescale, and corrosion deposits that coat the inside of radiators, pipework, and the boiler heat exchanger. This reduces heat output, causes boiler noise, and shortens boiler life. A professional power flush forces clean water through the entire system at high pressure and velocity, removing debris from every component.</p>
<p>After a power flush, most homeowners notice:</p>
<ul>
<li>Radiators heating to full temperature faster</li>
<li>More even heat distribution throughout the home</li>
<li>Quieter boiler and pipework operation</li>
<li>Reduced gas consumption — up to 15% savings in severely sludged systems</li>
</ul>
<p>A power flush is particularly important when fitting a new boiler onto an existing system. Most boiler manufacturers — including Worcester Bosch and Vaillant — require the system to be flushed as a condition of the warranty. Fitting a new boiler onto a dirty system risks early heat exchanger failure and warranty rejection.</p>
<p>We use Kamco CF90 and Sentinel X400 system cleaners, followed by a Sentinel X100 inhibitor dose to protect the cleaned system from future corrosion. We also fit or check your magnetic filter (Adey MagnaClean or Fernox TF1) as part of every power flush.</p>

<h2>Smart Heating Controls — Upgrade and Save</h2>
<p>Upgrading to a smart thermostat can reduce heating bills by 10–15% by learning your daily routine, responding to whether you're home, and avoiding heating an empty house. We install, configure, and connect all major smart heating brands:</p>
<ul>
<li><strong>Google Nest Learning Thermostat</strong> — self-programs based on your habits; works with Google Assistant</li>
<li><strong>Hive Active Heating</strong> — BG's popular system; straightforward app control; works with Alexa and Google</li>
<li><strong>Tado Smart Thermostat</strong> — geo-fencing turns heating down automatically when you leave home</li>
<li><strong>Honeywell Evohome</strong> — multi-zone system with individual room control via TRVs; best for larger homes</li>
<li><strong>Drayton Wiser</strong> — budget-friendly multi-zone system; excellent value for money</li>
</ul>
<p>We install the hardware, configure the system, connect it to your Wi-Fi, and show you how to use the app. Full smart control from your phone — wherever you are.</p>

<h2>Central Heating Pricing — 2026</h2>
<ul>
<li><strong>Radiator bleed and balance service — from £80</strong></li>
<li><strong>Single radiator replacement — from £150 (supply and fit)</strong></li>
<li><strong>Power flush (average 3-bed home) — from £350</strong></li>
<li><strong>Smart thermostat supply and installation — from £200</strong></li>
<li><strong>Full system installation</strong> — free survey and written quote; typical 3-bed home from £3,500</li>
</ul>
<p>All quotes are provided in writing with a full breakdown before any work starts. No hidden extras, no surprises. For new installations, we provide a free, no-obligation survey and written quote after visiting your property.</p>

<h2>Areas We Cover for Central Heating</h2>
<p>We provide central heating services across all Peterborough postcodes and surrounding areas, including:</p>
<ul>
<li>Peterborough city centre (PE1) — same-day emergency repair slots often available</li>
<li><a href="/areas/orton">Orton (PE2)</a> — Goldhay, Brimbles, Longueville, and Wistow</li>
<li><a href="/areas/bretton">Bretton (PE3)</a> — Westwood, Paston, Ravensthorpe, and Walton</li>
<li><a href="/areas/werrington">Werrington (PE4)</a> — including Glinton and Northborough</li>
<li><a href="/areas/hampton">Hampton (PE7)</a> — Hampton Vale, Hampton Hargate, and Stanground</li>
<li><a href="/areas/yaxley">Yaxley and Farcet (PE7)</a></li>
<li><a href="/areas/market-deeping">Market Deeping (PE6)</a> and Deeping St James</li>
<li><a href="/areas/stamford">Stamford (PE9)</a> and surrounding villages</li>
<li><a href="/areas/whittlesey">Whittlesey (PE7)</a> and Eye</li>
</ul>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Had a full power flush done last month after years of cold radiators. The difference is remarkable — every radiator heats up fully now and the boiler is much quieter. Should have done it years ago. Really professional team.&rdquo;</p>
<p><strong>— James K., Bretton PE3 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;New central heating system installed in our older property. The engineer surveyed the house, explained exactly what he recommended and why, and the installation was completed on time and on budget. Fantastic job — warm house for the first time in years.&rdquo;</p>
<p><strong>— Anita P., Peterborough PE1 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Central Heating?</h2>
<ul>
<li><strong>Gas Safe registered engineers</strong> — Reg: 123456, fully qualified for all gas and heating work</li>
<li><strong>30+ years installing and maintaining Peterborough heating systems</strong></li>
<li><strong>All major boiler brands supplied and fitted</strong> — Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann</li>
<li><strong>Full smart thermostat service</strong> — supply, installation, and setup included</li>
<li><strong>Professional power flushing</strong> with Kamco equipment and Sentinel chemical treatment</li>
<li><strong>Magnetic filter protection</strong> — Adey MagnaClean or Fernox TF1 fitted on every new installation</li>
<li><strong>12-month workmanship guarantee</strong> on all installations and repairs</li>
<li><strong>Free, no-obligation written quotes</strong> for all new installations</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified Peterborough reviews</li>
</ul>`,
      faqs: [
        { q: "How long does a new central heating installation take?", a: "A full central heating installation typically takes 2 to 5 working days, depending on the size of the property and the complexity of the pipework. A 3-bedroom semi-detached with a straightforward layout is usually completed in 3 days. We'll confirm the timeline in your written quote before work begins." },
        { q: "What is power flushing and do I need one?", a: "Power flushing is a professional cleaning process that forces water through your central heating system at high pressure to remove sludge, magnetite, limescale, and corrosion deposits. You likely need one if your radiators have cold spots, your system is noisy, your boiler makes a kettling sound, or you're fitting a new boiler onto an existing system. It restores efficiency, reduces noise, and protects your boiler. Most manufacturers require a system flush when installing a new boiler." },
        { q: "Why are some of my radiators cold?", a: "Radiators cold at the top usually have trapped air — this is fixed by bleeding. Radiators cold at the bottom typically have sludge or magnetite build-up — this may require a power flush or chemical cleaner. If only some radiators heat up, the system may need balancing or a zone valve may have failed. Our engineers diagnose the exact cause and fix it properly." },
        { q: "Which smart thermostat should I choose?", a: "For most Peterborough homes, we recommend the Google Nest Learning Thermostat for its self-programming and energy savings, or the Hive Active Heating for its simplicity and wide compatibility. For larger homes with multiple heating zones, the Honeywell Evohome or Drayton Wiser offer individual room control via smart TRVs. We'll advise on the best option for your specific system during the survey." },
        { q: "How much does central heating installation cost in Peterborough?", a: "A complete new central heating system for a typical 3-bedroom home starts from around £3,500 including boiler, radiators, controls, and installation. The exact cost depends on the number of radiators required, the complexity of the pipework, and the boiler model chosen. We provide free, no-obligation written quotes after surveying your property — with a full itemised breakdown." },
        { q: "Do you install underfloor heating?", a: "Yes. We install both wet (hydronic) underfloor heating that connects to your boiler, and electric underfloor heating for individual rooms. Wet systems are more efficient and economical for whole-house heating. Electric systems are ideal for smaller areas like bathrooms or conservatories. We'll advise on the best option for your property and flooring type." },
        { q: "How do I know if my heating system needs a power flush?", a: "Key signs that a power flush is needed: radiators with cold spots (particularly at the bottom), a boiler making loud banging or kettling noises when firing up, slow heat-up times, high gas bills despite normal usage, or dark water when bleeding radiators. If you're fitting a new boiler, a power flush is strongly recommended — and often required to maintain the warranty." },
        { q: "Do you work on older heating systems?", a: "Yes. We service, repair, and maintain older conventional (heat-only) and system boilers, including non-condensing models that are no longer manufactured. We can also advise on whether upgrading to a modern combi boiler would be more cost-effective than continuing to repair an ageing system." },
      ],
    },
  },

  // ── 3. BATHROOM INSTALLATIONS ─────────────────────────────────────────────
  {
    slug: "bathroom-installations",
    data: {
      heroSubheading:
        "Complete bathroom design and installation from survey to final seal. Suites, wet rooms, en-suites, and accessible bathrooms. 12-month guarantee, free consultation across Peterborough.",
      shortDescription:
        "Complete bathroom installations from design to finish — suites, wet rooms, en-suites, and accessible bathrooms. Free consultation, 12-month guarantee across Peterborough.",
      seoTitle: "Bathroom Installations Peterborough | Full Design & Fitting Service",
      seoDescription:
        "Professional bathroom installations in Peterborough. Complete design, supply, and fitting — suites, wet rooms, en-suites, tiling. Free home consultation, 12-month guarantee.",
      content: `<h2>Bathroom Installations in Peterborough — Design to Final Finish</h2>
<p>Your bathroom should be a space you actually enjoy using every day. Whether you're replacing a tired suite, creating a sleek contemporary wet room, converting a cupboard into a cloakroom, or fitting an accessible bathroom for a family member with mobility needs, our team handles every aspect of the project from first consultation to final silicone bead. With over 30 years fitting bathrooms across Peterborough, we know how to deliver quality results on time, on budget, and with minimal disruption to your home.</p>

<h2>What We Offer — Complete Bathroom Service</h2>
<p>We're a full-service bathroom fitting company — no need to manage multiple trades:</p>
<ul>
<li><strong>Full bathroom suite supply and installation</strong> — bath, toilet, basin, and all fittings</li>
<li><strong>Walk-in shower enclosures</strong> — framed, frameless, and walk-through designs</li>
<li><strong>Wet room installations</strong> — full tanking and waterproofing to BS 5385, gradient floor formation, linear drains</li>
<li><strong>Freestanding bath fitting</strong> — including floor-mounted tap connections and waste</li>
<li><strong>En-suite and cloakroom conversions</strong> — making use of redundant space</li>
<li><strong>Wall and floor tiling</strong> — ceramic, porcelain, natural stone, and large-format tiles</li>
<li><strong>Vanity units and fitted bathroom furniture</strong></li>
<li><strong>Accessible bathrooms</strong> — level-access showers, grab rails, raised toilets, non-slip flooring</li>
<li><strong>Electric underfloor heating</strong> under tiles</li>
<li><strong>Extractor fan installation and wiring</strong></li>
<li><strong>Heated towel rail installation</strong> — electric and central heating connected</li>
<li><strong>Full plastering, painting, and decorating</strong></li>
</ul>

<h2>Our Bathroom Installation Process</h2>
<ol>
<li><strong>Free home consultation</strong> — we visit your home, take detailed measurements, discuss your vision and budget, and advise on what's achievable in your space</li>
<li><strong>Design and written quote</strong> — we provide a fully itemised written quote covering all labour and (optionally) materials, with a clear project timeline</li>
<li><strong>Material selection</strong> — we can supply everything from leading brands, or you can choose your own suite and tiles. We advise on quality and compatibility before you buy</li>
<li><strong>Strip-out and preparation</strong> — the old bathroom is carefully removed, existing plumbing and structure checked, and walls and floors prepared correctly</li>
<li><strong>Installation</strong> — plumbing, tiling, electrics, and fitting carried out in the correct sequence by our experienced team</li>
<li><strong>Final finish and sign-off</strong> — all joints sealed, plumbing tested, electrics certified, and the finished bathroom walked through with you before we consider the job done</li>
</ol>

<h2>Wet Rooms and Walk-In Showers</h2>
<p>Wet rooms are increasingly popular in Peterborough homes — stylish, easy to clean, and accessible for all ages. Our wet room installations are built to last, following BS 5385 Part 4 waterproofing standards:</p>
<ul>
<li><strong>Full tanking of floor and walls</strong> using Wedi board or BAL Tanking Slurry</li>
<li><strong>Gradient floor formation</strong> — correct falls to ensure complete drainage and no pooling</li>
<li><strong>Linear drain installation</strong> — recessed channel drains for a seamless finish</li>
<li><strong>Frameless glass screen options</strong> — bespoke-cut glass panels with chrome or brushed brass fittings</li>
<li><strong>Large-format tiling</strong> — minimises grout lines for a sleek, easy-maintenance finish</li>
</ul>
<p>A properly installed wet room adds genuine value to your property and can last decades without issues — but only if the waterproofing is done correctly. This is where the quality of the installer matters most.</p>

<h2>Accessible Bathrooms and Mobility Adaptations</h2>
<p>We design and fit accessible bathrooms and wet rooms that maintain dignity and independence without compromising on style. Our accessible bathroom installations include:</p>
<ul>
<li>Level-access and zero-threshold wet rooms for wheelchair users</li>
<li>Walk-in bath installation with low-level entry</li>
<li>Strategically positioned grab rails to BS 8300 specification</li>
<li>Raised toilet seats and height-adjustable fittings</li>
<li>Non-slip floor tiles and safety flooring</li>
<li>Wider doorways and turning circles</li>
<li>Wall-mounted basins at accessible heights</li>
<li>Thermostatic shower controls to prevent scalding</li>
</ul>
<p>We work sensitively and always put the user's needs first — creating spaces that are genuinely easy and safe to use.</p>

<h2>Bathroom Brands We Work With</h2>
<p>We supply and install products from leading bathroom manufacturers — or we're happy to install products you've already purchased:</p>
<ul>
<li><strong>Roca</strong> — contemporary and traditional suites, wall-hung WCs, compact options</li>
<li><strong>Ideal Standard</strong> — Tesi, Tonic, Concept Air ranges; excellent quality at mid-market prices</li>
<li><strong>Crosswater</strong> — premium taps, showers, and brassware</li>
<li><strong>Burlington</strong> — classic Edwardian and Victorian-inspired bathroom furniture</li>
<li><strong>Merlyn</strong> — shower enclosures; excellent value and 10-year frame guarantee</li>
<li><strong>Aquadry and Kudos</strong> — walk-in shower trays and enclosures</li>
<li><strong>RAK Ceramics</strong> — large-format porcelain tiles at competitive prices</li>
<li><strong>Grohe and Hansgrohe</strong> — premium thermostatic showers and mixers</li>
</ul>

<h2>Bathroom Installation Pricing — Peterborough 2026</h2>
<ul>
<li><strong>Basic suite replacement (bath, toilet, basin, taps)</strong> — from £2,500 including labour and materials</li>
<li><strong>Full bathroom renovation (new layout, tiling, plumbing, electrics)</strong> — typically £4,000–£8,000 depending on size and specification</li>
<li><strong>Wet room installation</strong> — from £3,500 (waterproofing, gradient floor, tiling, screen)</li>
<li><strong>En-suite installation</strong> — from £2,800 (shower, toilet, basin, tiling)</li>
<li><strong>Accessible bathroom</strong> — free assessment; priced on individual requirements</li>
</ul>
<p>Every quote is fully itemised — you know exactly what you're paying for before any work begins. The price we quote is the price you pay — no surprises at the end of the job.</p>

<h2>Areas We Cover for Bathroom Installations</h2>
<p>We carry out bathroom installations across all Peterborough postcodes:</p>
<ul>
<li>Peterborough city centre (PE1) and all central areas</li>
<li><a href="/areas/orton">Orton (PE2)</a> — Goldhay, Brimbles, Longueville, and Wistow</li>
<li><a href="/areas/bretton">Bretton (PE3)</a> — Westwood, Paston, and Ravensthorpe</li>
<li><a href="/areas/werrington">Werrington (PE4)</a> and Glinton</li>
<li><a href="/areas/hampton">Hampton (PE7)</a> — Hampton Vale and Stanground</li>
<li><a href="/areas/yaxley">Yaxley (PE7)</a> and Whittlesey</li>
<li><a href="/areas/market-deeping">Market Deeping (PE6)</a></li>
<li><a href="/areas/stamford">Stamford (PE9)</a> and surrounding villages</li>
</ul>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Absolutely delighted with our new bathroom. The team managed everything from ripping out the old suite to painting the walls — professional, tidy, and they finished exactly on schedule. The tiling is perfect. Would recommend without hesitation.&rdquo;</p>
<p><strong>— Rachel W., Orton Goldhay PE2 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Had a wet room fitted for my elderly mother. The team was patient, explained every stage, and the finished result is both practical and beautiful. Couldn't have asked for better.&rdquo;</p>
<p><strong>— Tom F., Werrington PE4 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Your Bathroom?</h2>
<ul>
<li><strong>30+ years fitting bathrooms across Peterborough</strong> — thousands of installations completed</li>
<li><strong>Complete service</strong> — plumbing, tiling, electrics, plastering, and decorating under one roof</li>
<li><strong>Free home consultation</strong> and fully itemised written quote — no obligation</li>
<li><strong>All major brands supplied</strong> — or we fit your own choice of products</li>
<li><strong>BS 5385 compliant wet room waterproofing</strong> — built to last</li>
<li><strong>Accessible bathroom specialists</strong> — sensitive and experienced</li>
<li><strong>12-month workmanship guarantee</strong> on every installation</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified customer reviews</li>
</ul>`,
      faqs: [
        { q: "How long does a bathroom installation take?", a: "A straightforward suite replacement typically takes 5–7 working days. A full renovation with layout changes, new tiling throughout, and electrical work usually takes 8–12 working days. We'll confirm the timeline in your written quote. We always prioritise getting the toilet and shower functional as quickly as possible to minimise disruption." },
        { q: "Do you supply the bathroom suite and tiles?", a: "Yes — we can supply everything from leading brands including Roca, Ideal Standard, Crosswater, Merlyn, and RAK Ceramics. We're also very happy to install products you've already chosen or purchased. If you're sourcing your own suite, we'll advise on compatibility and quality before you buy to avoid issues during installation." },
        { q: "How much does a bathroom installation cost in Peterborough?", a: "A standard suite replacement starts from around £2,500 including labour and materials. Full renovations with new tiling, layout changes, and fixtures typically range from £4,000 to £8,000 depending on size and specification. Wet room installations start from £3,500. Every quote is fully itemised after we survey your bathroom — what we quote is what you pay." },
        { q: "What is involved in a wet room installation?", a: "A proper wet room installation involves waterproofing the entire floor and walls (tanking), forming the correct floor gradient for drainage, fitting a linear or point drain, and tiling throughout. We work to BS 5385 Part 4 waterproofing standards. Shortcuts in waterproofing are the most common cause of wet room failures — this is an area where quality of installation matters enormously." },
        { q: "Do you need building regulations approval for a bathroom?", a: "Most bathroom renovations don't require planning permission or building regulations approval. However, electrical work in bathrooms must comply with Part P of the Building Regulations, and any structural changes (e.g. removing walls) may need consent. We handle all relevant compliance and will advise clearly during your consultation." },
        { q: "Can you fit an accessible bathroom for a disability or mobility issue?", a: "Yes — accessible bathroom installations are one of our specialisms. We design and fit level-access wet rooms, walk-in baths, grab rail installations to BS 8300, raised WCs, non-slip flooring, and other adaptations. We approach every accessible bathroom project with care and sensitivity, always prioritising the user's dignity, safety, and independence." },
        { q: "Will there be much disruption during the installation?", a: "We minimise disruption as much as possible. All floors and stairs are protected with dust sheets throughout the project. We clean up thoroughly at the end of each working day. If the bathroom being fitted is your only toilet, we'll prioritise making it usable again as quickly as possible — usually within the first day of installation." },
        { q: "What guarantee do you offer on bathroom installations?", a: "All our bathroom installations come with a 12-month workmanship guarantee as standard. Manufacturer warranties on products we supply are separate and typically run for 5–25 years depending on the product. We'll provide you with all warranty documentation when the job is complete." },
      ],
    },
  },

  // ── 4. LANDLORD SERVICES ──────────────────────────────────────────────────
  {
    slug: "landlord-services",
    data: {
      heroSubheading:
        "Comprehensive plumbing and gas compliance for Peterborough landlords. CP12 certificates, boiler servicing, maintenance contracts, and 24/7 emergency cover. Portfolio discounts available.",
      shortDescription:
        "Complete landlord plumbing and gas services — CP12 certificates, boiler servicing, maintenance contracts, and emergency tenant cover. Portfolio pricing for Peterborough landlords.",
      seoTitle: "Landlord Plumbing Services Peterborough | CP12, Maintenance & Emergency",
      seoDescription:
        "Landlord gas and plumbing services in Peterborough. CP12 certificates, boiler servicing, maintenance contracts, 24/7 emergency cover. Portfolio discounts available.",
      content: `<h2>Landlord Plumbing &amp; Gas Services in Peterborough</h2>
<p>Managing rental properties in Peterborough brings real legal obligations — and the consequences of getting them wrong are serious. From the annual <a href="/services/gas-safety-certificates">gas safety certificate (CP12)</a> to emergency tenant call-outs and between-tenancy repairs, Peterborough Plumbers provides a reliable, fully compliant service designed specifically for landlords and letting agents. We've supported Peterborough landlords for over 30 years, from single-property investors to multi-site portfolio managers — and we make compliance simple, predictable, and stress-free.</p>

<h2>What We Provide for Landlords</h2>
<ul>
<li><strong>Annual Gas Safety Certificates (CP12)</strong> — legal requirement for all rental properties with gas appliances</li>
<li><strong>Annual boiler service</strong> — keeps warranties valid and prevents costly winter breakdowns</li>
<li><strong>24/7 emergency plumbing and heating response</strong> — for urgent tenant call-outs any time of day or night</li>
<li><strong>Pre-tenancy plumbing inspections</strong> — full condition report before new tenants move in</li>
<li><strong>End-of-tenancy plumbing checks</strong> — identifying damage or maintenance needed between tenancies</li>
<li><strong>Planned maintenance contracts</strong> — covering all compliance requirements at a predictable annual cost</li>
<li><strong>Boiler replacements and heating upgrades</strong></li>
<li><strong>Bathroom and kitchen refurbishments</strong> between tenancies</li>
<li><strong>Void property plumbing checks and winterisation</strong></li>
<li><strong>Drain clearance and CCTV surveys</strong></li>
<li><strong>Direct tenant liaison</strong> — we coordinate access and appointments so you don't have to</li>
<li><strong>Portfolio pricing</strong> — discounted rates for 3+ properties</li>
</ul>

<h2>Gas Safety Compliance — Your Legal Obligations</h2>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, every landlord in England and Wales must hold a valid Gas Safety Certificate (CP12) for each rental property that contains gas appliances. The key obligations are:</p>
<ul>
<li><strong>Annual inspection</strong> — carried out by a Gas Safe registered engineer before the current certificate expires</li>
<li><strong>Tenant notification</strong> — existing tenants must receive a copy within 28 days of inspection; new tenants must receive one before moving in</li>
<li><strong>Record keeping</strong> — certificates must be retained for a minimum of two years</li>
<li><strong>Appliance safety</strong> — any appliance classified as "Immediately Dangerous" or "At Risk" must be taken out of service immediately</li>
</ul>
<p>Non-compliance carries penalties of up to £6,000 per offence, imprisonment of up to six months, and potential criminal prosecution. Your landlord insurance may also be invalidated. We provide automatic renewal reminders and flexible scheduling to ensure you never miss a compliance deadline.</p>

<h2>The Renters' Rights Act 2025 — What Landlords Need to Know</h2>
<p>The Renters' Rights Act 2025 (which replaced the Renters Reform Bill) brings additional obligations for landlords in England. While the Act principally addresses tenancy structure and eviction, it reinforces the importance of property maintenance obligations under Section 11 of the Landlord and Tenant Act 1985 — including heating systems and hot water provision. Keeping your plumbing and heating systems in proper working order isn't just best practice; it's a legal requirement, and failure to do so can now result in more robust enforcement action from councils and courts.</p>

<h2>24/7 Emergency Cover for Tenants</h2>
<p>When a tenant calls at midnight with no heating, a burst pipe, or a blocked drain backing up into the kitchen, you need a plumber who will respond quickly and handle it professionally. Our <a href="/services/emergency-plumber">emergency plumbing service</a> is available 24 hours a day, 7 days a week, 365 days a year across Peterborough:</p>
<ul>
<li><strong>Aim to reach your property within 1 hour</strong> for genuine emergencies across PE1–PE7</li>
<li><strong>Direct tenant liaison</strong> — we speak to your tenant, organise access, and handle the situation professionally</li>
<li><strong>You're kept informed</strong> — we'll update you on what we found and what was done</li>
<li><strong>Clear, itemised invoice</strong> — no surprises on the bill</li>
</ul>

<h2>Planned Maintenance Contracts</h2>
<p>Our landlord maintenance contracts are tailored to your portfolio size and requirements. A typical contract includes:</p>
<ul>
<li>Annual Gas Safety Certificate (CP12) for each property</li>
<li>Annual boiler service for each property</li>
<li>Priority response for emergency call-outs — faster than standard booking</li>
<li>Discounted labour rates on any additional work</li>
<li>Annual plumbing health check — taps, toilets, pipework, and drainage</li>
<li>Automatic renewal reminders — we track your compliance deadlines</li>
<li>Digital certificate storage and forwarding to tenants on your behalf</li>
</ul>
<p>Predictable annual costs. Zero missed compliance deadlines. One reliable contractor for everything.</p>

<h2>Between-Tenancy Services</h2>
<p>When a tenant moves out, there's often plumbing work to do before the next one moves in. We work to tight turnaround times to minimise your void period:</p>
<ul>
<li>Full plumbing inspection with written condition report</li>
<li>Tap, toilet, and shower repairs or replacements</li>
<li>Bathroom refreshes and budget refurbishments</li>
<li>Boiler check, heating system test, and service if due</li>
<li>Drain clearance and kitchen waste pipe descaling</li>
<li>Stopcock and isolation valve checks</li>
</ul>

<h2>Landlord Pricing — 2026</h2>
<ul>
<li><strong>Gas Safety Certificate (CP12)</strong> — from £60 per property</li>
<li><strong>Annual Boiler Service</strong> — from £79 per property</li>
<li><strong>CP12 + Boiler Service bundle</strong> — from £110 per property</li>
<li><strong>Portfolio pricing (3+ properties)</strong> — contact us for a tailored annual contract quote</li>
<li><strong>Emergency call-out</strong> — standard rate during business hours; modest out-of-hours premium (confirmed when you call)</li>
</ul>

<h2>Areas We Cover for Landlord Services</h2>
<p>We serve landlords across all Peterborough postcodes (PE1–PE7) and the wider area, including <a href="/areas/orton">Orton</a>, <a href="/areas/werrington">Werrington</a>, <a href="/areas/hampton">Hampton</a>, <a href="/areas/bretton">Bretton</a>, <a href="/areas/market-deeping">Market Deeping</a>, <a href="/areas/yaxley">Yaxley</a>, <a href="/areas/whittlesey">Whittlesey</a>, and <a href="/areas/stamford">Stamford</a>. Wherever your Peterborough rental properties are, we can cover them.</p>

<h2>What Our Landlord Clients Say</h2>
<blockquote>
<p>&ldquo;I manage 12 rental properties across Peterborough and switched to Peterborough Plumbers two years ago. They handle my CP12s, boiler services, and any emergencies directly with tenants. I barely have to get involved — and I've never missed a compliance date since. Highly recommended.&rdquo;</p>
<p><strong>— Richard T., Landlord — 12 properties across PE1, PE2 &amp; PE3 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Had an emergency call-out at 11pm when my tenant reported no heating. Engineer was at the property within 45 minutes and had the boiler running again the same night. Brilliant service.&rdquo;</p>
<p><strong>— Lisa M., Landlord — Orton PE2 ★★★★★</strong></p>
</blockquote>

<h2>Why Peterborough Landlords Choose Us</h2>
<ul>
<li><strong>Gas Safe registered engineers</strong> — Reg: 123456, fully qualified and insured</li>
<li><strong>30+ years supporting Peterborough landlords</strong> — we understand what matters to property investors</li>
<li><strong>Automatic CP12 renewal reminders</strong> — you'll never miss a compliance deadline</li>
<li><strong>Direct tenant liaison</strong> — we handle access and appointments so you don't have to</li>
<li><strong>24/7 emergency cover</strong> — genuine round-the-clock response for tenant emergencies</li>
<li><strong>Portfolio discounts</strong> — competitive rates for multiple properties</li>
<li><strong>Digital record keeping</strong> — all certificates and reports accessible on request</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified Peterborough reviews</li>
</ul>`,
      faqs: [
        { q: "What are a landlord's legal obligations for plumbing and gas?", a: "Landlords must hold a valid Gas Safety Certificate (CP12) for every rental property with gas appliances, renewed annually by a Gas Safe registered engineer. Under Section 11 of the Landlord and Tenant Act 1985, landlords are also legally required to keep the water supply, drainage, heating, and sanitary facilities in proper working order. The Renters' Rights Act 2025 reinforces these obligations with stronger enforcement powers." },
        { q: "Do you offer multi-property discounts?", a: "Yes. We offer discounted rates for landlords with 3 or more properties under management. The savings increase with portfolio size. Contact us with details of your properties for a tailored annual contract quote — covering CP12 certificates, boiler services, and maintenance at a predictable annual cost." },
        { q: "Can you deal directly with my tenants?", a: "Absolutely — and this is one of the most valued parts of our service. We contact your tenant, agree a convenient appointment time, confirm access arrangements, carry out the work, and update you on completion. You receive an invoice and certificate without needing to manage the logistics yourself." },
        { q: "How quickly can you respond to tenant emergencies?", a: "We aim to reach genuine emergencies across the Peterborough area within 1 hour, 24 hours a day, 7 days a week. For non-urgent repairs, we typically book appointments within 2–3 working days. Landlords on our maintenance contracts receive priority booking for both emergencies and routine work." },
        { q: "What's included in a landlord maintenance contract?", a: "Our standard landlord maintenance contract includes: annual Gas Safety Certificate (CP12), annual boiler service, priority emergency response, discounted labour rates for additional work, an annual plumbing health check, automatic renewal reminders, and digital certificate storage. Contracts are tailored to your portfolio size and requirements — contact us for a quote." },
        { q: "Can you handle void property preparation?", a: "Yes. When a tenant moves out, we carry out a full plumbing inspection, fix any issues, and prepare the property for the next tenancy. We work to tight turnaround times to minimise void periods and ensure the property is in good order. We also offer winterisation services for properties that will be empty over winter." },
        { q: "Do you also cover electrical safety certificates (EICR)?", a: "Landlords are required to have an Electrical Installation Condition Report (EICR) every 5 years for rental properties. We don't carry out electrical inspections ourselves, but we work closely with trusted local electricians and can coordinate EICR scheduling alongside your gas safety inspection to minimise tenant disruption." },
      ],
    },
  },

  // ── 5. EMERGENCY PLUMBER ──────────────────────────────────────────────────
  {
    slug: "emergency-plumber",
    data: {
      heroSubheading:
        "Genuine 24/7 emergency plumbing in Peterborough — aim to reach you within 1 hour. Burst pipes, boiler breakdowns, blocked drains, and leaks. Real people answer, day and night.",
      shortDescription:
        "24/7 emergency plumber in Peterborough. Burst pipes, boiler breakdowns, blocked drains, and gas leaks. Aim to reach you within 1 hour — real people answer, day and night.",
      seoTitle: "Emergency Plumber Peterborough | 24/7 | 1-Hour Response",
      seoDescription:
        "24/7 emergency plumber in Peterborough. Burst pipes, boiler breakdowns, blocked drains — aim to reach you within 1 hour. Real engineers, transparent pricing.",
      content: `<h2>24/7 Emergency Plumber in Peterborough</h2>
<p>A plumbing emergency won't wait until Monday morning — and neither will we. When water is pouring through your ceiling, your boiler has given up in the middle of winter, or a drain is backing up into your kitchen, you need someone you can actually trust to answer the phone and get to you fast. Peterborough Plumbers provides a genuine 24-hour, 7-day emergency plumbing and heating service across all Peterborough postcodes (PE1–PE7) and the surrounding areas — with an experienced engineer typically at your door within the hour.</p>
<p>When you call our emergency line, you speak to a real person — a member of our team, not a call centre. They'll assess the urgency, advise you on immediate safety steps, and dispatch the nearest available engineer. Our vans are fully stocked with parts, so most emergency repairs are completed on the first visit.</p>

<h2>Emergency Situations We Handle</h2>
<p>Our emergency team responds to urgent plumbing and heating problems 365 days a year:</p>
<ul>
<li><strong>Burst pipes</strong> — including freeze damage in winter and pressure failure</li>
<li><strong>Major water leaks</strong> — from tanks, cylinders, pipework joints, or appliance connections</li>
<li><strong>No heating or hot water</strong> — boiler breakdowns, pump failure, zone valve faults</li>
<li><strong>Blocked or overflowing drains</strong> — sewage backflow, kitchen drain blockage, outdoor drain flooding</li>
<li><strong>Blocked toilet</strong> — overflowing or completely blocked WC</li>
<li><strong>Frozen and burst pipes</strong> — particularly common in Peterborough's exposed Fenland winters</li>
<li><strong>Leaking radiator valves or pipe joints</strong></li>
<li><strong>Uncontrollable water flow</strong> — broken ballcock, failed cistern inlet valve</li>
<li><strong>Water heater failures</strong> — no hot water from cylinder or combination unit</li>
<li><strong>Sewage backflow</strong> — drainage collapse or blockage causing waste to rise</li>
<li><strong>Gas smell or suspected gas leak</strong> — always call <strong>0800 111 999</strong> first, then us</li>
</ul>

<h2>What to Do While You Wait for Our Engineer</h2>
<p>Taking the right immediate steps can limit damage significantly:</p>
<ul>
<li><strong>Burst pipe or major leak</strong> — turn off the water at the mains stopcock (usually under the kitchen sink or near the front door). Switch off your central heating and open taps to drain the system. Move valuables away from any water ingress</li>
<li><strong>Blocked drain overflowing</strong> — don't use any sinks, toilets, or appliances connected to the affected drain. If sewage is involved, keep the area clear and ventilate the space</li>
<li><strong>No heating or hot water</strong> — check the boiler pressure gauge (should read 1–1.5 bar). Try the boiler reset button once. If it doesn't fire, leave it off and call us. Check your thermostat is set above room temperature and hasn't been accidentally turned down</li>
<li><strong>Gas smell</strong> — open all windows and doors immediately. Do not touch any electrical switches. Leave the property. Call the <strong>National Gas Emergency Service on 0800 111 999</strong> immediately, then call us once you're safely outside</li>
<li><strong>Frozen pipes</strong> — gently apply warmth with a hot water bottle or hairdryer on a low setting. Never use a blowtorch or open flame. Turn off the water at the stopcock as a precaution in case the pipe has already cracked</li>
</ul>

<h2>Our Emergency Response Process</h2>
<ol>
<li><strong>Call our emergency line any time</strong> — answered 24 hours a day, 7 days a week, 365 days a year. A real person picks up</li>
<li><strong>Immediate assessment</strong> — we establish the nature and urgency of the problem and give you safety advice while we dispatch an engineer</li>
<li><strong>Engineer dispatched</strong> — for genuine emergencies across Peterborough, we aim to reach you within 1 hour</li>
<li><strong>Pricing confirmed on arrival</strong> — our engineer assesses the situation and confirms the cost before touching anything. You approve the price before any work starts</li>
<li><strong>Emergency resolved on the first visit</strong> — our vans carry an extensive range of common parts, fittings, and materials. The vast majority of emergencies are fully resolved in a single visit</li>
<li><strong>Report and invoice</strong> — you receive a clear written record of what was found and what was done</li>
</ol>

<h2>Emergency Plumber Pricing — Honest and Transparent</h2>
<p>We believe in transparent pricing, even in an emergency. Our approach:</p>
<ul>
<li><strong>During normal business hours (8am–6pm Mon–Fri)</strong> — emergency rates are the same as our standard labour rates</li>
<li><strong>Out of hours (evenings, weekends, bank holidays)</strong> — a modest out-of-hours premium applies. This is confirmed when you call — before we dispatch an engineer</li>
<li><strong>Parts and materials</strong> — charged at cost price. We don't mark up parts</li>
<li><strong>No hidden call-out fees</strong> — the price confirmed before we start is the price on the invoice</li>
</ul>
<p>We will never use emergency pricing as an excuse to overcharge. We've built our reputation on honest pricing over 30 years — that doesn't change at 2am on a Sunday.</p>

<h2>Emergency Cover for Peterborough Landlords</h2>
<p>Tenant emergencies are one of the biggest headaches in property management. We provide a fully managed emergency service for landlords:</p>
<ul>
<li>Your tenant calls us directly — you give them our number</li>
<li>We assess the situation, attend, and resolve the issue</li>
<li>You're notified on completion with a full report and invoice</li>
<li>We can provide you with a call reference number for your records</li>
</ul>
<p>Landlords on our <a href="/services/landlord-services">maintenance contracts</a> receive priority emergency response with guaranteed response times. Ask about our landlord emergency packages when you get in touch.</p>

<h2>Areas We Cover for Emergency Plumbing</h2>
<p>Our emergency engineers cover all Peterborough postcodes and surrounding areas, responding 24/7 to:</p>
<ul>
<li>Peterborough city centre (PE1) and all central areas</li>
<li><a href="/areas/orton">Orton (PE2)</a> — Goldhay, Brimbles, Longueville</li>
<li><a href="/areas/bretton">Bretton (PE3)</a> — Westwood and Paston</li>
<li><a href="/areas/werrington">Werrington (PE4)</a> and Glinton</li>
<li><a href="/areas/hampton">Hampton (PE7)</a> — Hampton Vale and Stanground</li>
<li><a href="/areas/yaxley">Yaxley (PE7)</a>, Farcet, and Stilton</li>
<li><a href="/areas/market-deeping">Market Deeping (PE6)</a></li>
<li><a href="/areas/stamford">Stamford (PE9)</a></li>
<li><a href="/areas/whittlesey">Whittlesey (PE7)</a> and Eye</li>
</ul>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Burst pipe at 10pm on a Friday. Called and an engineer was at my house within 50 minutes. He fixed the pipe, dried out what he could, and explained everything clearly. Outstanding response — couldn't have asked for better at that time of night.&rdquo;</p>
<p><strong>— Phil R., Hampton PE7 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;No heating on the coldest night of the year with my kids at home. Called at 7am and the engineer arrived by 8:15. Boiler fixed by 9am. Brilliant service and the price was completely fair.&rdquo;</p>
<p><strong>— Karen D., Orton PE2 ★★★★★</strong></p>
</blockquote>

<h2>Why Choose Peterborough Plumbers for Emergencies?</h2>
<ul>
<li><strong>Genuine 24/7 availability</strong> — call any time. A real person answers, not a machine</li>
<li><strong>Aim to reach you within 1 hour</strong> across all Peterborough PE postcodes</li>
<li><strong>Gas Safe registered engineers</strong> — Reg: 123456</li>
<li><strong>Fully stocked vans</strong> — most emergencies resolved on the first visit</li>
<li><strong>Transparent pricing</strong> — confirmed before work starts, even at 3am</li>
<li><strong>30+ years of emergency experience</strong> in Peterborough homes and rental properties</li>
<li><strong>Landlord emergency packages</strong> available with priority response</li>
<li><strong>4.6-star Google rating</strong> from over 120 verified reviews</li>
</ul>`,
      faqs: [
        { q: "How quickly can you respond to a plumbing emergency in Peterborough?", a: "For genuine emergencies across the Peterborough PE1–PE7 area, we aim to reach you within 1 hour of your call. Response times can vary during exceptionally busy periods, but we always prioritise the most urgent situations — flooding, no heating in cold weather, sewage backflow — first. Our emergency line is answered 24 hours a day, 7 days a week, 365 days a year." },
        { q: "Do you charge extra for out-of-hours emergency call-outs?", a: "During normal business hours (8am–6pm, Monday to Friday), our emergency rates are the same as our standard labour rates. Evening, weekend, and bank holiday call-outs carry a modest out-of-hours premium. This is always confirmed when you call — before we dispatch an engineer — so there are no surprises when you receive the invoice." },
        { q: "What should I do if I have a gas leak?", a: "If you smell gas or suspect a gas leak: open all windows and doors immediately; do not touch any electrical switches (including lights) — a spark can ignite gas; extinguish any open flames; leave the property; call the National Gas Emergency Service on 0800 111 999 (available 24/7, free to call). Once you're safely outside and have called the gas emergency line, call us and we'll attend as soon as the property has been made safe by the gas network." },
        { q: "What should I do if a pipe bursts?", a: "Turn off the water at the mains stopcock immediately — this is usually found under the kitchen sink, near the front door, or in the airing cupboard. Switch off your central heating. Open all cold taps to drain the system and reduce water pressure. Move valuables and electronics away from any water ingress. Then call us — our engineer will be with you as quickly as possible." },
        { q: "Can you fix the problem on the first visit?", a: "In the vast majority of cases, yes. Our emergency vans carry an extensive range of common plumbing and heating parts — pipe fittings, valves, tap cartridges, cistern components, pump spares, pressure relief valves, and more. For unusual or highly specialist parts, we'll make the situation safe on the first visit and return with the part the following day." },
        { q: "What counts as a plumbing emergency?", a: "A plumbing emergency is any situation that poses an immediate risk to safety, health, or significant property damage if not addressed promptly: burst pipes, major leaks, total loss of heating in cold weather, sewage backflow, blocked toilets with no alternative, suspected gas leaks, or uncontrollable water flow. If you're unsure whether your situation qualifies, call us anyway — we'll assess it and advise." },
        { q: "Do you provide emergency cover for landlords?", a: "Yes. We offer a fully managed emergency response for landlords — your tenant calls us directly, we attend and resolve the issue, and you receive a full report and invoice on completion. Landlords on our maintenance contracts receive priority emergency response with guaranteed response times. Contact us about our landlord emergency packages." },
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
