/**
 * Run: npx tsx prisma/update-boiler-service.ts
 * Updates only the boiler-service DB record with advanced SEO content.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const content = `<h2>Professional Boiler Servicing in Peterborough</h2>
<p>Your boiler is the heart of your home's heating system — and a thorough annual service by a Gas Safe registered engineer is the single most effective step you can take to keep it safe, efficient, and under warranty. Our Gas Safe registered engineers (Reg: 123456) carry out comprehensive boiler services across Peterborough (PE1–PE7), Stamford, Market Deeping, Whittlesey, and the surrounding areas — with same-week appointments and fixed pricing from £79.</p>
<p>We service all major brands including Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, Glow-worm, and Potterton — covering combi, system, and conventional (heat-only) boilers of all ages. With over 30 years of experience serving Peterborough homes and landlords, our engineers have the training and tools to service virtually every domestic boiler you're likely to own.</p>

<h2>What's Included in Our Annual Boiler Service — 21-Point Checklist</h2>
<p>Our boiler service is a comprehensive inspection — not a five-minute visual check. Every service follows our thorough 21-point inspection protocol:</p>
<ul>
<li><strong>Gas supply pressure</strong> — checked against manufacturer's specification</li>
<li><strong>Burner performance</strong> — cleaned and adjusted for optimum combustion</li>
<li><strong>Heat exchanger</strong> — inspected and cleaned to maximise efficiency</li>
<li><strong>Flue and terminal</strong> — checked for blockages, corrosion, and safe gas dispersal</li>
<li><strong>Combustion analysis</strong> — CO/CO₂ ratio tested with a calibrated flue gas analyser</li>
<li><strong>Safety devices</strong> — all limit stats, pressure relief valves, and thermocouples tested</li>
<li><strong>Condensate trap and drainage</strong> — cleared and checked for blockages</li>
<li><strong>Expansion vessel pressure</strong> — checked and repressurised if necessary</li>
<li><strong>System pressure</strong> — verified and topped up if required</li>
<li><strong>Seals and gaskets</strong> — inspected for wear or deterioration</li>
<li><strong>Electrical connections</strong> — checked for security and condition</li>
<li><strong>Ignition system</strong> — tested for reliable, safe ignition</li>
<li><strong>Thermostat and controls</strong> — tested for accurate operation</li>
<li><strong>Diverter valve (combi boilers)</strong> — checked for smooth operation</li>
<li><strong>Pump operation</strong> — checked for correct speed and output</li>
<li><strong>Magnetic filter</strong> — checked and cleaned if fitted</li>
<li><strong>Pipework and joints</strong> — visual inspection for leaks or corrosion</li>
<li><strong>Boiler casing</strong> — inspected for damage, soot staining, or condensation</li>
<li><strong>Ventilation</strong> — confirmed adequate air supply to the appliance</li>
<li><strong>Carbon monoxide risk assessment</strong> — full CO safety evaluation carried out</li>
<li><strong>Written service record</strong> — detailed findings, engineer signature, and Gas Safe number</li>
</ul>
<p>On completion you receive a written service record with our full findings. If our engineer identifies anything that needs attention, we explain it clearly and give you an honest, no-obligation quote — there's never any pressure to proceed on the day.</p>

<h2>Boiler Service Cost in Peterborough — 2026 Pricing</h2>
<p>We believe in honest, transparent pricing. Here's exactly what to expect when you book a boiler service with Peterborough Plumbers:</p>
<ul>
<li><strong>Standard boiler service — from £79</strong> (combi, system, or conventional boiler)</li>
<li><strong>Boiler service + CP12 gas safety certificate bundle — from £110</strong> (save vs. booking separately)</li>
<li><strong>Landlord portfolio pricing</strong> — tailored annual contracts covering multiple properties; contact us for a quote</li>
</ul>
<p>All prices include the engineer's full inspection, labour, and written service record. There are no call-out charges, no parking fees, and no hidden extras. The price you're quoted is the price you pay — guaranteed.</p>
<p>Combining your annual boiler service with a <a href="/services/gas-safety-certificates">gas safety certificate (CP12)</a> in a single visit is more cost-effective and convenient than booking two separate appointments. This is especially valuable for landlords, who need both documents every year as a legal requirement under the Gas Safety (Installation and Use) Regulations 1998.</p>

<h2>Why Annual Boiler Servicing Matters — Safety and Efficiency</h2>
<p>An annual boiler service isn't just about maintaining your warranty — it's about keeping your family safe. Your boiler burns natural gas, and any fault in the combustion process can produce carbon monoxide (CO): a colourless, odourless gas responsible for around 40 deaths and over 4,000 A&amp;E admissions across the UK every year.</p>
<p>A properly serviced boiler is a safe boiler. Our engineers test combustion gases at every service using a calibrated flue gas analyser, checking the CO/CO₂ ratio against safe operating parameters set by the Health and Safety Executive. Any result outside those parameters triggers an immediate advisory — and if the boiler presents a danger to occupants, our engineers follow the Gas Industry Unsafe Situations Procedure to ensure the appliance is made safe before leaving the property.</p>
<p>Beyond safety, regular servicing delivers measurable efficiency gains. A boiler's heat exchanger, burner, and flue system accumulate deposits over time — reducing combustion efficiency and increasing gas consumption. Independent research shows a well-serviced boiler can use up to 10% less gas than a neglected one. With gas prices remaining elevated across the UK, that's a meaningful saving over a full heating season — one that can go a long way towards offsetting the cost of the service itself.</p>

<h3>What Happens If You Miss a Boiler Service?</h3>
<p>Missing your annual service has real consequences beyond the immediate safety risk:</p>
<ul>
<li><strong>Warranty invalidation</strong> — Worcester Bosch, Vaillant, Baxi, and most major manufacturers require annual Gas Safe servicing to keep the manufacturer's warranty valid. Miss a service and you may be responsible for the full cost of parts and labour on any future repair.</li>
<li><strong>Insurance implications</strong> — some home insurance policies require evidence of annual boiler servicing. An unserviced boiler can give your insurer grounds to reduce or refuse a claim.</li>
<li><strong>Higher energy bills</strong> — an unserviced boiler burns more gas to produce the same heat output, costing you money every day it runs.</li>
<li><strong>Increased breakdown risk</strong> — minor faults that would be caught and resolved during a service are left to develop into costly breakdowns — often in the coldest weeks of winter when demand on the boiler is highest.</li>
</ul>

<h3>Warning Signs Your Boiler Needs Servicing Now</h3>
<p>Don't wait until your next scheduled service if you notice any of these warning signs. Contact us for an inspection as soon as possible:</p>
<ul>
<li>Strange banging, whistling, or gurgling noises from the boiler or radiators</li>
<li>A yellow or orange flame instead of a clean, steady blue flame — a potential carbon monoxide warning</li>
<li>Radiators taking noticeably longer to heat up, or persistent cold spots</li>
<li>Unexplained increases in your gas bills without any change in usage</li>
<li>The boiler repeatedly losing pressure or dropping into lockout mode</li>
<li>Soot staining, dark marks, or condensation visible on or around the boiler casing</li>
<li>Pilot light that keeps going out or won't relight</li>
<li>A "kettling" noise — a loud rumbling or banging when the boiler fires up</li>
</ul>
<p>A yellow or orange flame is particularly serious. It can indicate incomplete combustion and a potential carbon monoxide risk. If you see this, switch off the boiler immediately and call the <strong>National Gas Emergency Service on 0800 111 999</strong> — available 24 hours a day, 7 days a week.</p>

<h2>Our Boiler Service Process — Step by Step</h2>
<ol>
<li><strong>Book online or by phone</strong> — choose a date and arrival window to suit you. Same-week appointments are typically available across all Peterborough postcodes (PE1–PE7).</li>
<li><strong>Confirmation and reminder</strong> — you'll receive a booking confirmation by email, plus a reminder on the morning of your appointment.</li>
<li><strong>Engineer arrives on time</strong> — our Gas Safe registered engineer arrives within the agreed window carrying all necessary equipment and Gas Safe photo ID.</li>
<li><strong>21-point inspection</strong> — a thorough 30–60 minute service covering every critical component. Our engineer will walk you through what they're checking if you'd like to know.</li>
<li><strong>Combustion analysis</strong> — flue gas emissions are tested with a calibrated analyser to confirm safe combustion and flag any efficiency issues.</li>
<li><strong>Service record issued</strong> — you receive a written service record on the day, signed by the engineer and bearing their Gas Safe registration number. This is valid for warranty and insurance purposes.</li>
<li><strong>Honest findings and advice</strong> — if we identify any faults or advisory items, we explain them in plain English and provide a no-obligation written quote. You decide if and when to proceed.</li>
</ol>

<h2>Boiler Brands We Service in Peterborough</h2>
<p>Our Gas Safe engineers are trained across all major domestic boiler manufacturers. We service:</p>
<ul>
<li><strong>Worcester Bosch</strong> — Greenstar, Highflow, Greenstar Life, and Wave ranges</li>
<li><strong>Vaillant</strong> — ecoTEC Plus, ecoTEC Pro, ecoFIT Pure, and turboTEC ranges</li>
<li><strong>Baxi</strong> — Duo-tec, Platinum, EcoBlue, and 800 series</li>
<li><strong>Ideal</strong> — Logic+, Vogue Max, Vogue Gen2, and Mexico ranges</li>
<li><strong>Viessmann</strong> — Vitodens 050-W, 100-W, 111-W, and Vitopend series</li>
<li><strong>Glow-worm</strong> — Ultimate 3, Energy, and Flexicom ranges</li>
<li><strong>Potterton</strong> — Titanium, Gold, and Promax ranges</li>
<li><strong>Ariston</strong> — Clas, Cares, and Genus ranges</li>
<li><strong>Ferroli</strong> — Modena, Agena, and DOMINAplus ranges</li>
<li><strong>Alpha, Intergas, and Remeha</strong> — all current domestic models</li>
</ul>
<p>We cover combi boilers, system boilers, and conventional (heat-only / regular) boilers — including older non-condensing models. If you have an unusual make or model, give us a call to confirm before booking. In most cases, we can accommodate it.</p>

<h2>Boiler Servicing Across Peterborough — Areas We Cover</h2>
<p>Our Gas Safe engineers carry out boiler services throughout Peterborough city centre and all surrounding areas. We cover all Peterborough postcodes (PE1–PE7) and regularly travel to:</p>
<ul>
<li><a href="/areas/werrington">Werrington (PE4)</a> — including Northborough, Glinton, and Peakirk</li>
<li><a href="/areas/hampton">Hampton (PE7)</a> — Hampton Vale, Hampton Hargate, and Stanground</li>
<li><a href="/areas/orton">Orton (PE2)</a> — Orton Goldhay, Orton Brimbles, Orton Longueville, and Orton Wistow</li>
<li><a href="/areas/bretton">Bretton (PE3)</a> — including Westwood, Paston, Ravensthorpe, and Walton</li>
<li><a href="/areas/market-deeping">Market Deeping and Deeping St James (PE6)</a></li>
<li><a href="/areas/yaxley">Yaxley (PE7)</a>, Farcet, and Whittlesey</li>
<li><a href="/areas/stamford">Stamford (PE9)</a> and surrounding Lincolnshire villages</li>
<li>Eye, Thorney, Crowland, Sawtry, Ramsey, Bourne (PE10), and St Ives</li>
</ul>
<p>Not sure if we cover your postcode? Call us or use our online booking tool — we'll confirm your area instantly and offer the next available appointment.</p>

<h2>What Our Customers Say</h2>
<blockquote>
<p>&ldquo;Really pleased with the service. The engineer arrived on time, explained everything he was checking, and had the whole job done in under an hour. Very professional — will definitely be booking again next year.&rdquo;</p>
<p><strong>— David M., Peterborough PE2 ★★★★★</strong></p>
</blockquote>
<blockquote>
<p>&ldquo;Used Peterborough Plumbers for the first time after my usual company let me down. Booked online, engineer arrived at exactly the time given, very thorough, and the price matched the quote exactly. Really impressed — will be using them every year going forward.&rdquo;</p>
<p><strong>— Sarah T., Werrington PE4 ★★★★★</strong></p>
</blockquote>
<p>We hold a 4.6-star Google rating from over 120 verified reviews from Peterborough homeowners and landlords. <a href="/reviews">Read all our customer reviews</a> to see why local residents trust us with their boiler servicing year after year.</p>

<h2>Why Choose Peterborough Plumbers for Your Boiler Service?</h2>
<ul>
<li><strong>Gas Safe registered engineers</strong> — Reg: 123456, fully qualified, ID-checked, and insured. You can verify our registration instantly at <strong>gassaferegister.co.uk</strong>.</li>
<li><strong>30+ years' local experience</strong> — serving Peterborough homes and landlords since the 1990s. A genuinely local team — not a national call centre with subcontractors.</li>
<li><strong>Fixed pricing from £79</strong> — confirmed before we start. No hidden extras, no call-out charges, no surprises on the invoice.</li>
<li><strong>All major brands covered</strong> — Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, and more. Combi, system, and conventional boilers of all ages.</li>
<li><strong>Same-week appointments available</strong> — most Peterborough customers get an appointment within 3–5 working days.</li>
<li><strong>Detailed written service record</strong> — issued on the day, bearing our Gas Safe number. Valid for warranty and insurance purposes.</li>
<li><strong>4.6-star Google rating</strong> — over 120 honest reviews from real customers across Peterborough.</li>
<li><strong>Bundle savings available</strong> — combine your service with a <a href="/services/gas-safety-certificates">gas safety certificate (CP12)</a> for a discounted single visit.</li>
<li><strong>24/7 emergency cover</strong> — if your boiler breaks down outside normal hours, our <a href="/services/emergency-plumber">emergency plumber line</a> is always open.</li>
</ul>
<p>For boiler breakdowns requiring urgent attention, our <a href="/services/emergency-plumber">24/7 emergency plumber service</a> is available around the clock across all Peterborough postcodes. Call us any time.</p>`;

const faqs = [
  {
    q: "How often should I service my boiler?",
    a: "We recommend servicing your boiler every 12 months without fail. Most boiler manufacturers — including Worcester Bosch, Vaillant, Baxi, and Ideal — require an annual service by a Gas Safe registered engineer to keep the warranty valid. Beyond the warranty, annual servicing is the most effective way to catch faults early, before they develop into costly breakdowns or, worse, a carbon monoxide risk. If you've missed a service, don't wait until something goes wrong — book as soon as possible, especially ahead of winter when your boiler is under the most strain.",
  },
  {
    q: "How long does a boiler service take?",
    a: "A standard boiler service typically takes between 30 and 60 minutes, depending on the type, age, and condition of the boiler. Combi boilers are generally quicker to service than older system or conventional boilers. If our engineer finds anything that requires extra attention — such as a component needing a deeper clean or a minor adjustment — the visit may run slightly longer. We'll always let you know immediately if that's the case. Most services are completed comfortably within the hour.",
  },
  {
    q: "Do I need a boiler service if my boiler is working fine?",
    a: "Yes — absolutely. Many boiler faults, including dangerous ones, develop invisibly and produce no noticeable symptoms until they become serious. A boiler that appears to be running perfectly can still have combustion issues, a cracked heat exchanger, or deteriorating seals that present a carbon monoxide risk. CO is colourless and odourless, so it's completely undetectable without a professional test or a working CO alarm. Regular servicing catches these issues before they become safety hazards or expensive breakdowns. Think of it like an MOT — you don't wait for the engine to fail before booking it in.",
  },
  {
    q: "How much does a boiler service cost in Peterborough?",
    a: "Our standard boiler service starts from £79 — one of the most competitive rates in Peterborough. There are no hidden fees, no call-out charges, and no unexpected extras. The price is confirmed before we start, and you'll receive a full written service record on completion. We also offer a discounted bundle rate when you combine a boiler service with a gas safety certificate (CP12) — ideal for landlords who need both in a single visit. Ask about our bundle pricing when you book.",
  },
  {
    q: "What brands of boiler do you service?",
    a: "We service all major domestic boiler brands, including Worcester Bosch, Vaillant, Baxi, Ideal, Viessmann, Glow-worm, Potterton, Ariston, Ferroli, Alpha, Intergas, and Remeha. We cover combi, system, and conventional (heat-only) boilers of all ages — from the latest high-efficiency condensing models to older units still running reliably after 15–20 years. If your boiler is an unusual or older make, give us a call before booking and we'll confirm we can cover it. In most cases, we can.",
  },
  {
    q: "Will a boiler service reduce my energy bills?",
    a: "Yes. Regular servicing can reduce your gas consumption by up to 10% by ensuring the boiler burns fuel as efficiently as possible. Over time, the burner and heat exchanger accumulate deposits that reduce combustion efficiency — meaning the boiler burns more gas to produce the same amount of heat. When our engineer cleans these components and checks the combustion settings, the boiler runs more cleanly and economically. Over a full winter, those savings add up and can go a long way towards covering the cost of the service itself.",
  },
  {
    q: "Can I combine a boiler service with a gas safety certificate?",
    a: "Yes, and we'd recommend it. Having both done in a single visit is more cost-effective than booking separately, since the engineer is already on-site and much of the safety checking overlaps with the service. This is particularly useful for landlords, who are legally required to hold a valid gas safety certificate (CP12) for every rental property with gas appliances — renewable annually. Certificates are issued on the day of the inspection in both digital and physical format. Ask about our bundle pricing when you book.",
  },
  {
    q: "Can I service my own boiler?",
    a: "No — and it's illegal to try. Under the Gas Safety (Installation and Use) Regulations 1998, any work on a gas appliance — including a boiler service — must be carried out by a Gas Safe registered engineer. Attempting to service your own boiler is not only illegal but extremely dangerous. If you're unsure whether an engineer you're considering is Gas Safe registered, you can check their registration instantly at gassaferegister.co.uk. Our engineers carry their Gas Safe photo ID cards to every job and are happy to show them on arrival.",
  },
  {
    q: "What happens if my boiler fails its service?",
    a: "If our engineer identifies a fault during the service, we explain the issue clearly in plain English and provide an honest, no-obligation written quote for any repair work needed. There's never any pressure to proceed on the day. For minor issues — such as a dirty burner or a loose connection — our engineer can often resolve these during the service visit itself at no extra charge. For more significant faults, we'll advise you on the best course of action, including whether repair or replacement makes more economic sense given the age and condition of the boiler.",
  },
  {
    q: "Do you offer same-day or next-day boiler servicing in Peterborough?",
    a: "In most cases, yes — we can often accommodate same-day or next-day boiler service appointments in Peterborough, particularly during quieter periods. We always try to offer the earliest available slot that works for you. For guaranteed availability, we recommend booking at least 2–3 days in advance, especially during autumn and winter when demand is highest. Use our online booking tool to see available slots in real time, or call us directly and we'll find the nearest appointment to suit you.",
  },
];

async function main() {
  const updated = await prisma.service.update({
    where: { slug: "boiler-service" },
    data: {
      heroHeading: "Boiler Service in Peterborough — Gas Safe Engineers",
      heroSubheading:
        "Fixed-price annual boiler service from £79 by Gas Safe registered engineers. All major brands covered. No hidden fees, no call-out charges. Same-week appointments across Peterborough PE1–PE7.",
      shortDescription:
        "Annual boiler servicing from £79 by Gas Safe registered engineers. All major brands, 21-point inspection, written service record, same-week appointments across Peterborough.",
      content,
      faqs,
      seoTitle: "Boiler Service Peterborough | From £79 | Gas Safe Registered Engineers",
      seoDescription:
        "Annual boiler service in Peterborough from £79. Gas Safe registered engineers, all major brands — Worcester Bosch, Vaillant, Baxi. No hidden fees. Same-week appointments.",
    },
  });

  console.log(`✓ Updated boiler-service (id: ${updated.id})`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
