export interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  heroHeading: string;
  heroSubheading: string;
  content: string;
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  sortOrder: number;
  image?: string;
  heroImage?: string;
}

export const services: Service[] = [
  {
    name: "Boiler Service",
    slug: "boiler-service",
    image: "/images/homepage/boiler-service.png",
    heroImage: "/images/services/boiler-service-peterborough-gas-safe.webp",
    shortDescription:
      "Annual boiler servicing from £79 by Gas Safe registered engineers. All major brands, 21-point inspection, written service record, same-week appointments across Peterborough.",
    heroHeading: "Boiler Service in Peterborough — Gas Safe Engineers",
    heroSubheading:
      "Fixed-price annual boiler service from £79 by Gas Safe registered engineers. All major brands covered. No hidden fees, no call-out charges. Same-week appointments across Peterborough PE1–PE7.",
    content: `<h2>Professional Boiler Servicing in Peterborough</h2>
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
<p>For boiler breakdowns requiring urgent attention, our <a href="/services/emergency-plumber">24/7 emergency plumber service</a> is available around the clock across all Peterborough postcodes. Call us any time.</p>`,
    faqs: [
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
    ],
    seoTitle: "Boiler Service Peterborough | From £79 | Gas Safe Registered Engineers",
    seoDescription:
      "Annual boiler service in Peterborough from £79. Gas Safe registered engineers, all major brands — Worcester Bosch, Vaillant, Baxi. No hidden fees. Same-week appointments.",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Gas Safety Certificates",
    slug: "gas-safety-certificates",
    image: "/images/homepage/gas-safety-certificate.png",
    shortDescription:
      "Landlord gas safety certificates (CP12) and domestic gas safety checks by qualified Gas Safe engineers.",
    heroHeading: "Gas Safety Certificates in Peterborough",
    heroSubheading:
      "Legal gas safety inspections for landlords and homeowners. CP12 certificates issued by Gas Safe registered engineers.",
    content: `<h2>Gas Safety Certificates &amp; CP12 Inspections in Peterborough</h2>
<p>Whether you're a landlord with a portfolio of rental properties or a homeowner who wants peace of mind, a gas safety certificate confirms that every gas appliance in your property is operating safely. Our Gas Safe registered engineers (Reg: 123456) carry out thorough CP12 inspections across Peterborough — with certificates issued on the day of your inspection.</p>
<p>We work with private landlords, letting agents, housing associations, and homeowners throughout Peterborough and the surrounding villages. If you need a reliable, qualified engineer who turns up on time and gets the job done properly, you're in the right place.</p>

<h3>What We Inspect During a Gas Safety Check</h3>
<p>Every inspection follows the procedures set out by the Health and Safety Executive and Gas Safe Register. Our engineers check:</p>
<ul>
<li>All gas appliances — boilers, gas fires, cookers, hobs, and water heaters</li>
<li>Gas pipework, joints, and connections for leaks or deterioration</li>
<li>Flue terminals and chimney paths to confirm safe removal of combustion gases</li>
<li>Ventilation in rooms where gas appliances are installed</li>
<li>Gas pressure and burner performance on each appliance</li>
<li>Safety devices, thermocouples, and flame failure controls</li>
<li>Carbon monoxide risk assessment</li>
</ul>
<p>If we find a fault, we'll explain the issue clearly and provide an honest quote for any repair work needed. We never pressure you into unnecessary repairs.</p>

<h3>Landlord Gas Safety — Your Legal Obligations</h3>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, every landlord in England and Wales must have a valid Gas Safety Certificate (CP12) for each rental property. This isn't optional — it's the law, and it applies whether you let a single flat or manage a large portfolio.</p>
<p>Key requirements landlords need to know:</p>
<ul>
<li><strong>Annual renewal</strong> — certificates must be renewed every 12 months before the expiry date</li>
<li><strong>Tenant notification</strong> — a copy of the CP12 must be given to existing tenants within 28 days, or to new tenants before they move in</li>
<li><strong>Record keeping</strong> — you must keep records of each certificate for at least 2 years</li>
<li><strong>Qualified engineer only</strong> — inspections must be carried out by a Gas Safe registered engineer</li>
</ul>
<p>Failure to comply can result in fines of up to £6,000, a criminal record, imprisonment of up to 6 months, and invalidation of your landlord insurance. If a tenant is harmed due to an unsafe gas appliance, the consequences are even more serious.</p>

<h3>Gas Safety Certificates for Homeowners</h3>
<p>While homeowners aren't legally required to hold a CP12, there are good reasons to book a gas safety check. If your boiler, cooker, or gas fire hasn't been inspected in over a year, you could be at risk from carbon monoxide — a colourless, odourless gas responsible for around 40 deaths a year in the UK.</p>
<p>A gas safety check gives you confidence that your appliances are burning correctly and your family is safe. It's especially worthwhile if you've recently moved into a property and don't know the service history of the gas appliances.</p>

<h3>What Happens After the Inspection?</h3>
<p>Once our engineer has completed the inspection, you'll receive your CP12 certificate on the same day. The certificate details:</p>
<ul>
<li>Each gas appliance inspected, including make, model, and location</li>
<li>The results of safety checks carried out on each appliance</li>
<li>Whether each appliance has passed or failed</li>
<li>Any defects found and remedial action taken or recommended</li>
<li>The engineer's Gas Safe registration number and signature</li>
</ul>
<p>We provide both a physical copy and a digital PDF sent to your email, so landlords can easily share certificates with tenants and letting agents.</p>

<h3>Gas Safety Certificate Pricing</h3>
<p>Our CP12 inspections start from just £60 for a single appliance, with competitive rates for properties with multiple gas appliances. We also offer discounted packages for landlords who combine a gas safety certificate with an <a href="/services/boiler-service">annual boiler service</a> — a popular choice that saves you time and money.</p>
<p>For landlords with multiple properties, we offer portfolio pricing with priority scheduling and annual reminders so you never miss a renewal date. Get in touch to discuss rates for your portfolio.</p>

<h3>Areas We Cover</h3>
<p>We carry out gas safety inspections across Peterborough and the surrounding areas, including the city centre (PE1), Fletton, Stanground, Orton Waterville, Orton Longueville, Werrington, Bretton, Hampton, Yaxley, Market Deeping, Whittlesey, and Stamford. As a local business with over 30 years in the trade, we're usually able to offer appointments within a few days — and same-day inspections when you need them urgently.</p>

<h3>Why Choose Peterborough Plumbers for Your Gas Safety Certificate?</h3>
<ul>
<li>Gas Safe registered engineers (Reg: 123456) — fully qualified and insured</li>
<li>30+ years serving Peterborough landlords and homeowners</li>
<li>Certificates issued on the day — no waiting around</li>
<li>Digital and physical copies provided</li>
<li>Competitive pricing from £60 with multi-property discounts</li>
<li>Annual renewal reminders so you stay compliant</li>
<li>4.6-star Google rating from over 120 satisfied customers</li>
<li>Honest, no-pressure approach if repairs are needed</li>
</ul>

<h3>Combine with a Boiler Service and Save</h3>
<p>Many of our Peterborough landlords book a <a href="/services/boiler-service">boiler service</a> at the same time as their CP12 inspection. It makes sense — the engineer is already on site, so you save on call-out time and get both jobs done in a single visit. Ask about our combined rates when you <a href="/book">book online</a> or call us on 01234 567890.</p>`,
    faqs: [
      {
        q: "How often do I need a gas safety certificate?",
        a: "Landlords are legally required to obtain a new gas safety certificate every 12 months for each rental property. The inspection must be completed before the previous certificate expires. Homeowners aren't legally required to have one, but we recommend an annual check for safety.",
      },
      {
        q: "What happens if I don't have a gas safety certificate?",
        a: "Operating without a valid CP12 is a criminal offence for landlords. Penalties include fines of up to £6,000, imprisonment of up to 6 months, and your landlord insurance may be void. If a tenant is harmed due to an unsafe gas appliance, you could face manslaughter charges.",
      },
      {
        q: "How long does the inspection take?",
        a: "A typical gas safety inspection takes 30 to 60 minutes, depending on the number of gas appliances in the property. A single-appliance check is usually around 20 to 30 minutes.",
      },
      {
        q: "How much does a gas safety certificate cost in Peterborough?",
        a: "Our CP12 inspections start from £60 for a single appliance. We offer discounted rates for multiple appliances and landlords with several properties. We also offer bundle pricing when combined with an annual boiler service.",
      },
      {
        q: "Do I get the certificate on the same day?",
        a: "Yes. Provided all appliances pass the inspection, you'll receive your CP12 certificate on the day of the visit. We provide both a physical copy and a digital PDF by email.",
      },
      {
        q: "Can you send renewal reminders?",
        a: "Absolutely. We keep a record of your certificate dates and send reminders before they're due for renewal. This is especially popular with landlords managing multiple properties who need to stay on top of compliance.",
      },
    ],
    seoTitle: "Gas Safety Certificates Peterborough | CP12 | Landlord Inspections",
    seoDescription:
      "Gas safety certificates (CP12) in Peterborough. Legal landlord inspections by Gas Safe registered engineers. Same-day certificates available.",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Central Heating Services",
    slug: "central-heating-services",
    image: "/images/homepage/central-heating-service.png",
    shortDescription:
      "Full central heating installation, repair, and maintenance including radiators, thermostats, and pipework.",
    heroHeading: "Central Heating Services in Peterborough",
    heroSubheading:
      "From new installations to repairs and power flushing, we keep Peterborough homes warm and comfortable.",
    content: `<h2>Central Heating Services Across Peterborough</h2>
<p>A reliable central heating system is essential for any Peterborough home. Whether you need a brand-new installation, a repair to your existing system, or routine maintenance to keep things running smoothly, our experienced engineers deliver results you can depend on. With over 30 years in the trade, we've installed and maintained heating systems in thousands of homes across Peterborough and the surrounding areas.</p>

<h3>What We Offer</h3>
<p>Our central heating services cover everything from a single radiator replacement to a complete system installation. Here's what we can help with:</p>
<ul>
<li>Full central heating system design and installation</li>
<li>Boiler replacements and upgrades (combi, system, and conventional)</li>
<li>Radiator installation, repositioning, and balancing</li>
<li>Thermostat upgrades and smart control fitting (Nest, Hive, Tado)</li>
<li>Power flushing and system cleaning to restore efficiency</li>
<li>Pipework repairs, modifications, and extensions</li>
<li>Underfloor heating installation</li>
<li>Thermostatic radiator valve (TRV) fitting</li>
<li>Magnetic filter installation to protect your boiler</li>
<li>Heating system fault diagnosis and repair</li>
</ul>

<h3>New Central Heating Installations</h3>
<p>If your property doesn't have central heating, or your existing system is beyond economical repair, we can design and install a complete system tailored to your home. We'll assess the size and layout of your property, recommend the right boiler and radiator configuration, and carry out the installation with minimal disruption.</p>
<p>We install systems from leading manufacturers including Worcester Bosch, Vaillant, Baxi, and Ideal. All installations are carried out by our Gas Safe registered engineers (Reg: 123456) and come with a full manufacturer's warranty plus our own 12-month workmanship guarantee.</p>

<h3>Central Heating Repairs</h3>
<p>Cold radiators, noisy pipes, uneven heating, and boiler pressure drops are all signs that something isn't right with your central heating. Our engineers diagnose and fix faults quickly, with most repairs completed on the first visit. Common issues we deal with include:</p>
<ul>
<li>Radiators cold at the top (trapped air) or bottom (sludge build-up)</li>
<li>Boiler losing pressure repeatedly</li>
<li>Banging, gurgling, or whistling noises in the system</li>
<li>Thermostat not controlling the heating properly</li>
<li>Leaking radiator valves or pipework joints</li>
<li>Pump failure or circulation problems</li>
</ul>
<p>If you're not sure what's wrong, don't worry — we'll diagnose the issue and explain your options clearly before carrying out any work.</p>

<h3>Power Flushing</h3>
<p>Over time, central heating systems build up sludge, rust, and limescale that reduce efficiency and cause breakdowns. A power flush forces clean water through your entire system at high velocity, removing debris from radiators, pipework, and the boiler heat exchanger.</p>
<p>After a power flush, you'll typically notice radiators heating up faster, more even heat distribution, and a quieter system. It's particularly worthwhile if you're having a new boiler installed — fitting a new boiler onto a dirty system can void the manufacturer's warranty and shorten the boiler's lifespan.</p>

<h3>Smart Heating Controls</h3>
<p>Upgrading to a smart thermostat can reduce your heating bills by 10–15% by learning your routine and only heating your home when needed. We install and configure all major smart heating brands including Nest, Hive, Tado, and Honeywell Evohome. We'll connect everything to your phone so you can control your heating from anywhere.</p>

<h3>Central Heating Pricing</h3>
<p>Repair costs depend on the fault, but we offer transparent, competitive pricing with no hidden call-out charges. We'll always provide a clear quote before starting work. For larger projects like full installations, we provide a free, no-obligation written quote after surveying your property.</p>
<p>We also offer combined packages — if your heating system needs a <a href="/services/boiler-service">boiler service</a> alongside repairs, we can often do both in a single visit and save you money.</p>

<h3>Areas We Cover</h3>
<p>We provide central heating services across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. As a local company, we typically offer appointments within a few days — and priority slots for customers without heating during the colder months.</p>

<h3>Why Choose Peterborough Plumbers for Central Heating?</h3>
<ul>
<li>Gas Safe registered engineers (Reg: 123456)</li>
<li>30+ years installing and maintaining heating systems in Peterborough</li>
<li>All major boiler and radiator brands supplied and fitted</li>
<li>Smart thermostat installation and setup included</li>
<li>Power flushing with magnetic filter protection</li>
<li>12-month workmanship guarantee on all installations</li>
<li>Free, no-obligation quotes for larger projects</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>

<h3>Keep Your Heating Running Efficiently</h3>
<p>Regular maintenance prevents costly breakdowns and keeps your energy bills low. If your heating hasn't been serviced recently, or you've noticed any changes in performance, <a href="/book">book a heating check</a> or call us on 01234 567890. We'll make sure your system is ready for the cold weather.</p>`,
    faqs: [
      {
        q: "How long does a new central heating installation take?",
        a: "A full central heating system installation typically takes 2 to 5 days depending on the size of the property, the number of radiators, and the complexity of the pipework. We'll give you a clear timeline before we start.",
      },
      {
        q: "What is a power flush and do I need one?",
        a: "A power flush cleans your central heating system by removing sludge, rust, and debris that build up over time. You likely need one if your radiators have cold spots, your system is noisy, or you're having a new boiler installed. It restores efficiency and protects your boiler.",
      },
      {
        q: "Should I upgrade my thermostat?",
        a: "Upgrading to a smart thermostat can save you 10–15% on heating bills by learning your routine and heating your home only when needed. We install Nest, Hive, Tado, and Honeywell. The investment usually pays for itself within the first winter.",
      },
      {
        q: "How much does a central heating installation cost in Peterborough?",
        a: "Costs depend on the size of your property and the system specification. We provide free, no-obligation quotes after surveying your home. All our quotes are fully itemised with no hidden fees.",
      },
      {
        q: "Why are some of my radiators cold?",
        a: "Radiators cold at the top usually need bleeding to release trapped air. Radiators cold at the bottom typically have sludge build-up and may need a power flush. If only some radiators heat up, the system may need balancing. Our engineers can diagnose and fix the issue quickly.",
      },
      {
        q: "Do you install underfloor heating?",
        a: "Yes, we install both wet (hydronic) and electric underfloor heating systems. Wet systems are more efficient for whole-house heating and connect to your existing boiler. We'll advise on the best option for your property and flooring type.",
      },
    ],
    seoTitle: "Central Heating Services Peterborough | Installation & Repair",
    seoDescription:
      "Central heating installation, repair, and maintenance in Peterborough. Radiators, boilers, thermostats, and power flushing by experienced engineers.",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Bathroom Installations",
    slug: "bathroom-installations",
    image: "/images/homepage/bathroom-installation-service.png",
    shortDescription:
      "Complete bathroom design and installation including suites, showers, tiling, and plumbing work.",
    heroHeading: "Bathroom Installations in Peterborough",
    heroSubheading:
      "Transform your bathroom with our complete design and installation service. Quality craftsmanship from start to finish.",
    content: `<h2>Bathroom Installations in Peterborough — From Design to Finish</h2>
<p>Your bathroom should be a space you enjoy using every day. Whether you're replacing a tired suite, creating a modern wet room, or converting a spare room into an en-suite, our team handles every aspect of the project from first consultation to final finish. With over 30 years of experience fitting bathrooms across Peterborough, we know how to deliver quality results on time and within budget.</p>

<h3>What We Offer</h3>
<p>We provide a complete bathroom installation service — no need to coordinate multiple trades. Our team covers:</p>
<ul>
<li>Full bathroom suite supply and installation</li>
<li>Walk-in shower enclosures and wet room conversions</li>
<li>Bath replacements, repositioning, and freestanding bath fitting</li>
<li>Wall and floor tiling (ceramic, porcelain, natural stone)</li>
<li>Vanity units, fitted furniture, and bespoke storage</li>
<li>Underfloor heating (electric and wet systems)</li>
<li>Accessible bathrooms and mobility adaptations</li>
<li>En-suite and cloakroom conversions</li>
<li>Plumbing, waste, and drainage connections</li>
<li>Electrical work (extractor fans, lighting, heated towel rails)</li>
<li>Plastering, painting, and decorating</li>
</ul>

<h3>Our Installation Process</h3>
<p>We keep things straightforward so you know exactly what to expect:</p>
<ul>
<li><strong>1. Free consultation</strong> — we visit your home, discuss your ideas, take measurements, and understand your budget</li>
<li><strong>2. Design and quote</strong> — we provide a detailed written quote with a clear breakdown of costs, timelines, and specifications</li>
<li><strong>3. Material selection</strong> — we can supply everything, or you're welcome to choose your own suite, tiles, and fittings. We'll advise on quality and compatibility</li>
<li><strong>4. Strip-out and preparation</strong> — we carefully remove the old bathroom, check for any hidden issues, and prepare walls, floors, and pipework</li>
<li><strong>5. Installation</strong> — plumbing, tiling, electrics, and fitting are carried out by our experienced team in the right order to avoid delays</li>
<li><strong>6. Final finish and sign-off</strong> — we complete all decorating, seal every joint, test all plumbing, and walk you through the finished bathroom</li>
</ul>

<h3>Wet Rooms and Walk-In Showers</h3>
<p>Wet rooms are increasingly popular in Peterborough homes — they're stylish, easy to clean, and ideal for smaller bathrooms where space is tight. Our wet room installations include full tanking and waterproofing to BS 5385 standards, gradient floor formation for drainage, and high-quality tiling throughout. We also install frameless glass screens and linear drains for a sleek, contemporary look.</p>

<h3>Accessible Bathrooms and Mobility Adaptations</h3>
<p>If you or a family member has mobility needs, we can adapt your bathroom to make it safer and more comfortable. This includes level-access showers, grab rails, raised toilets, non-slip flooring, and wider doorways. We work sensitively and always prioritise dignity and independence in our designs.</p>

<h3>Brands We Work With</h3>
<p>We supply and install products from leading bathroom brands including Roca, Ideal Standard, Crosswater, Burlington, Merlyn, and RAK Ceramics. Whether you prefer a classic look or a contemporary design, we'll help you find the right products to match your style and budget.</p>

<h3>Bathroom Installation Pricing</h3>
<p>Every bathroom is different, so we provide tailored quotes based on your specific requirements. A straightforward suite replacement typically starts from around £2,500 including labour and materials, while a full renovation with tiling and new layout can range from £4,000 to £8,000+. We'll give you a fully itemised quote with no hidden fees — what we quote is what you pay.</p>
<p>We also offer flexible payment options for larger projects. Ask us about spreading the cost when you <a href="/book">book your free consultation</a>.</p>

<h3>Areas We Cover</h3>
<p>We carry out bathroom installations across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. As a local business, we're never far away — and we always protect your home during the work.</p>

<h3>Why Choose Peterborough Plumbers for Your Bathroom?</h3>
<ul>
<li>30+ years fitting bathrooms across Peterborough</li>
<li>Complete service — plumbing, tiling, electrics, and decorating under one roof</li>
<li>Free home consultation and detailed written quote</li>
<li>Quality brands supplied, or happy to fit your own choices</li>
<li>Fully waterproofed wet room and shower installations</li>
<li>Accessible bathroom specialists</li>
<li>12-month workmanship guarantee on every installation</li>
<li>4.6-star Google rating from over 120 satisfied customers</li>
</ul>

<h3>Ready to Transform Your Bathroom?</h3>
<p>Whether you have a clear vision or need help with ideas, we're here to help. <a href="/book">Book a free consultation</a> or call us on 01234 567890 to discuss your project. We'll visit your home, talk through your options, and provide a no-obligation quote.</p>`,
    faqs: [
      {
        q: "How long does a bathroom installation take?",
        a: "A complete bathroom installation typically takes 5 to 10 working days depending on the scope of work. A straightforward suite replacement may take 5 days, while a full renovation with layout changes and tiling could take up to 10 days. We'll confirm the timeline in your quote.",
      },
      {
        q: "Do you supply the bathroom suite?",
        a: "We can supply all materials and fittings from leading brands, or we're happy to install products you've chosen yourself. If you're sourcing your own, we'll advise on compatibility and quality before you buy to avoid any issues during installation.",
      },
      {
        q: "Do I need building regulations approval?",
        a: "Most bathroom renovations don't require planning permission. However, electrical work in bathrooms must comply with Part P of the Building Regulations, and structural changes may need approval. We handle all compliance and will advise during our initial consultation.",
      },
      {
        q: "How much does a bathroom installation cost in Peterborough?",
        a: "A straightforward suite replacement starts from around £2,500. Full renovations with new tiling, layout changes, and fixtures typically range from £4,000 to £8,000+. We provide detailed, itemised quotes with no hidden fees after visiting your home.",
      },
      {
        q: "Can you install a wet room?",
        a: "Yes, wet room installations are one of our specialities. We carry out full tanking and waterproofing, gradient floor formation, and high-quality tiling. Wet rooms are ideal for smaller bathrooms and accessible designs.",
      },
      {
        q: "Will there be much disruption during the installation?",
        a: "We minimise disruption as much as possible. We protect floors and stairs with dust sheets, keep the work area tidy, and clean up each day. If your only bathroom is being fitted, we'll prioritise getting the toilet and shower working as quickly as possible.",
      },
    ],
    seoTitle: "Bathroom Installations Peterborough | Design & Fitting Service",
    seoDescription:
      "Professional bathroom installations in Peterborough. Complete design, supply, and fitting service. Showers, suites, wet rooms, and tiling.",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "Landlord Services",
    slug: "landlord-services",
    shortDescription:
      "Comprehensive plumbing and gas services for landlords including CP12, maintenance contracts, and tenant call-outs.",
    heroHeading: "Landlord Plumbing Services in Peterborough",
    heroSubheading:
      "Reliable, compliant plumbing and gas services for Peterborough landlords. CP12 certificates, maintenance, and emergency cover.",
    content: `<h2>Landlord Plumbing &amp; Gas Services in Peterborough</h2>
<p>Managing rental properties comes with legal obligations and practical challenges. From annual <a href="/services/gas-safety-certificates">gas safety certificates</a> to emergency tenant call-outs, Peterborough Plumbers provides a reliable, comprehensive service designed specifically for landlords and letting agents. We've been supporting Peterborough landlords for over 30 years — whether you manage a single property or a portfolio of 50+.</p>

<h3>What We Provide for Landlords</h3>
<ul>
<li>Annual Gas Safety Certificates (CP12) — legal requirement for all rental properties</li>
<li><a href="/services/boiler-service">Boiler servicing</a> and maintenance</li>
<li>Emergency plumbing call-outs for tenants</li>
<li>Pre-tenancy and end-of-tenancy plumbing inspections</li>
<li>Planned maintenance contracts with priority scheduling</li>
<li>Boiler replacements and <a href="/services/central-heating-services">heating system upgrades</a></li>
<li>Multi-property discounts and portfolio pricing</li>
<li>Direct tenant liaison — we coordinate access and appointments</li>
<li><a href="/services/bathroom-installations">Bathroom refurbishments</a> between tenancies</li>
<li>Void property plumbing checks and winterisation</li>
</ul>

<h3>Gas Safety Compliance — Your Legal Obligation</h3>
<p>Under the Gas Safety (Installation and Use) Regulations 1998, landlords must have a valid Gas Safety Certificate (CP12) for every rental property with gas appliances. Certificates must be renewed annually, and a copy must be provided to tenants within 28 days of the inspection — or before they move in for new tenancies.</p>
<p>Failure to comply can result in fines of up to £6,000, imprisonment, and invalidation of your landlord insurance. We take the hassle out of compliance with:</p>
<ul>
<li>Automatic renewal reminders sent before your certificate expires</li>
<li>Flexible scheduling including evenings and weekends to suit tenants</li>
<li>Certificates issued on the day of inspection — digital and physical copies</li>
<li>Direct liaison with tenants to arrange access</li>
</ul>
<p>Need a CP12? Visit our dedicated <a href="/services/gas-safety-certificates">gas safety certificates</a> page for full details and pricing.</p>

<h3>Emergency Cover for Your Tenants</h3>
<p>When a tenant calls with a burst pipe at midnight, you need a plumber you can trust to respond quickly and fix the problem properly. Our <a href="/services/emergency-plumber">emergency plumbing service</a> is available 24/7 across Peterborough. We'll deal directly with your tenant, keep you informed, and send you a clear invoice afterwards — no surprises.</p>

<h3>Planned Maintenance Contracts</h3>
<p>For landlords who want peace of mind, we offer annual maintenance contracts that cover your legal requirements and help prevent costly emergency repairs. A typical contract includes:</p>
<ul>
<li>Annual gas safety certificate (CP12)</li>
<li>Annual boiler service</li>
<li>Priority response for emergency call-outs</li>
<li>Discounted labour rates for any additional work</li>
<li>Annual plumbing health check covering taps, toilets, and pipework</li>
</ul>
<p>Contracts are tailored to your portfolio — whether that's a single flat or dozens of properties across Peterborough. The cost is predictable, and you'll never miss a compliance deadline.</p>

<h3>Between-Tenancy Services</h3>
<p>When a tenant moves out, there's often plumbing work needed before the next one moves in. We offer fast-turnaround services including:</p>
<ul>
<li>Full plumbing inspection and condition report</li>
<li>Tap, toilet, and shower repairs or replacements</li>
<li>Bathroom refreshes and budget refurbishments</li>
<li>Boiler check and heating system test</li>
<li>Drain clearance and descaling</li>
</ul>

<h3>Landlord Pricing</h3>
<p>We offer competitive, transparent pricing for landlords. CP12 certificates start from £60, boiler services from £79, and we provide multi-property discounts for portfolios of 3 or more properties. All pricing is confirmed upfront with no hidden call-out charges.</p>
<p>For maintenance contracts, we'll put together a tailored package based on your properties and requirements. <a href="/book">Get in touch</a> for a no-obligation quote.</p>

<h3>Areas We Cover</h3>
<p>We serve landlords across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. Wherever your rental properties are in the Peterborough area, we can help.</p>

<h3>Why Peterborough Landlords Choose Us</h3>
<ul>
<li>Gas Safe registered engineers (Reg: 123456)</li>
<li>30+ years supporting Peterborough landlords and letting agents</li>
<li>Automatic CP12 renewal reminders — never miss a deadline</li>
<li>Direct tenant liaison for hassle-free appointments</li>
<li>24/7 emergency cover for urgent tenant issues</li>
<li>Multi-property discounts and tailored maintenance contracts</li>
<li>All certificates and invoices sent digitally for easy record keeping</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "Do you offer multi-property discounts?",
        a: "Yes. We offer discounted rates for landlords with 3 or more properties. The more properties on your account, the better the rate. Contact us with your portfolio details for a tailored quote.",
      },
      {
        q: "Can you deal directly with my tenants?",
        a: "Absolutely. We can coordinate access and appointments directly with your tenants, keeping you informed at every stage via email or phone. This is included as standard — no extra charge.",
      },
      {
        q: "What certificates do landlords legally need?",
        a: "At minimum, landlords need an annual Gas Safety Certificate (CP12), an Energy Performance Certificate (EPC), and an Electrical Installation Condition Report (EICR) every 5 years. We provide CP12 certificates and can advise on the other requirements.",
      },
      {
        q: "Do you offer maintenance contracts?",
        a: "Yes. Our landlord maintenance contracts typically include an annual CP12, boiler service, priority emergency response, and discounted labour rates. Contracts are tailored to your portfolio and provide predictable annual costs.",
      },
      {
        q: "How quickly can you respond to tenant emergencies?",
        a: "We aim to reach emergency call-outs within 1 hour across the Peterborough area. For non-urgent tenant issues, we typically book appointments within 2–3 working days.",
      },
      {
        q: "Can you handle void property preparation?",
        a: "Yes. We carry out full plumbing inspections, repairs, and bathroom refreshes between tenancies. We work to tight turnaround times to help minimise your void periods and get the property ready for the next tenant.",
      },
    ],
    seoTitle: "Landlord Plumbing Services Peterborough | CP12 & Maintenance",
    seoDescription:
      "Landlord plumbing and gas services in Peterborough. Gas safety certificates, boiler servicing, maintenance contracts, and emergency cover.",
    featured: false,
    sortOrder: 5,
  },
  {
    name: "Emergency Plumber Service",
    slug: "emergency-plumber",
    image: "/images/homepage/emergency-plumbing.png",
    shortDescription:
      "24/7 emergency plumbing service for burst pipes, leaks, boiler breakdowns, and blocked drains in Peterborough.",
    heroHeading: "Emergency Plumber in Peterborough",
    heroSubheading:
      "Plumbing emergencies don't wait. Neither do we. Fast response times across Peterborough and surrounding areas.",
    content: `<h2>24/7 Emergency Plumber in Peterborough</h2>
<p>A plumbing emergency won't wait until Monday morning — and neither will we. When you've got water pouring through your ceiling, a boiler that's given up in the middle of winter, or a drain backing up into your kitchen, you need someone you can rely on to pick up the phone and get to you fast. Peterborough Plumbers provides a genuine 24/7 emergency response across Peterborough and the surrounding areas, with an experienced engineer typically at your door within the hour.</p>

<h3>Emergencies We Handle</h3>
<p>Our emergency team deals with urgent plumbing and heating problems every day. Common call-outs include:</p>
<ul>
<li>Burst pipes and major water leaks</li>
<li>Boiler breakdowns — no heating or hot water</li>
<li>Blocked or overflowing drains and toilets</li>
<li>Gas leaks (always call the National Gas Emergency line first: <strong>0800 111 999</strong>)</li>
<li>Toilet and cistern failures</li>
<li>Uncontrollable leaks from tanks, cylinders, or header tanks</li>
<li>Frozen and burst pipes during winter</li>
<li>Leaking radiator valves or pipework joints</li>
<li>Sewage backflow and drain collapses</li>
<li>Water heater failures</li>
</ul>

<h3>How Our Emergency Service Works</h3>
<ul>
<li><strong>1. Call us any time</strong> — our emergency line is open 24 hours a day, 7 days a week, 365 days a year on 01234 567890</li>
<li><strong>2. Speak to a real person</strong> — no call centres or automated menus. You'll speak directly to our team who can assess the urgency and dispatch an engineer</li>
<li><strong>3. Engineer dispatched</strong> — for genuine emergencies in Peterborough, we aim to reach you within 1 hour</li>
<li><strong>4. Pricing confirmed on arrival</strong> — we'll assess the situation and confirm the cost before starting any work. No surprises</li>
<li><strong>5. First-visit fix</strong> — our vans carry a comprehensive range of parts and materials, so most emergencies are resolved on the first visit</li>
</ul>

<h3>What to Do While You Wait</h3>
<p>While you're waiting for our engineer, there are steps you can take to limit the damage:</p>
<ul>
<li><strong>Burst pipe or major leak</strong> — turn off the water at the stopcock (usually under the kitchen sink or near the front door). Turn off your central heating and open taps to drain the system</li>
<li><strong>Blocked drain overflowing</strong> — don't pour water down any connected sinks or toilets. If it's an outside drain, keep clear as it may contain sewage</li>
<li><strong>Boiler breakdown</strong> — check the pressure gauge (should read between 1 and 1.5 bar). Try resetting the boiler using the reset button. If it doesn't restart, leave it off and call us</li>
<li><strong>Gas smell</strong> — open all doors and windows immediately. Don't turn on or off any electrical switches. Leave the property and call the National Gas Emergency line on <strong>0800 111 999</strong>, then call us</li>
<li><strong>Frozen pipes</strong> — gently warm the pipe with a hot water bottle or hairdryer. Never use a blowtorch or open flame. Turn off the water at the stopcock as a precaution in case the pipe has already cracked</li>
</ul>

<h3>Emergency Plumber Pricing</h3>
<p>We believe in transparent pricing, even in an emergency. Our standard emergency call-out covers the first hour of labour plus travel. We'll always confirm the price before we start work, and there are no hidden charges.</p>
<p>During normal working hours (8am–6pm, Monday to Friday), emergency rates are the same as our standard rates. Out-of-hours rates (evenings, weekends, and bank holidays) carry a modest premium, which we'll confirm when you call. Parts and materials are charged at cost price — we don't mark up.</p>

<h3>Areas We Cover for Emergencies</h3>
<p>Our emergency response covers the whole of Peterborough and the surrounding areas, including the city centre (PE1), Fletton, Stanground, Orton Waterville, Orton Longueville, Werrington, Bretton, Hampton, Yaxley, Market Deeping, Whittlesey, and Stamford. We know the local area inside out, so we can get to you quickly without delays.</p>

<h3>Landlord Emergency Cover</h3>
<p>If you're a landlord with tenants reporting a plumbing emergency, we can deal directly with your tenants, coordinate access, and keep you informed throughout. Many of our <a href="/services/landlord-services">landlord clients</a> include emergency cover in their maintenance contracts for predictable costs and priority response. Ask us about our landlord emergency packages.</p>

<h3>Why Choose Peterborough Plumbers for Emergencies?</h3>
<ul>
<li>Genuine 24/7 availability — call any time, day or night</li>
<li>Aim to reach you within 1 hour across Peterborough</li>
<li>Speak to a real person, not a call centre</li>
<li>Gas Safe registered engineers (Reg: 123456)</li>
<li>Transparent pricing confirmed before work starts</li>
<li>Fully stocked vans — most emergencies fixed on the first visit</li>
<li>30+ years of emergency plumbing experience in Peterborough</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>

<h3>Don't Wait — Call Now</h3>
<p>If you have a plumbing emergency in Peterborough, call us now on <strong>01234 567890</strong>. We're ready to help 24 hours a day, 7 days a week. You can also <a href="/book">book online</a> for non-urgent repairs, or message us on WhatsApp for a quick response.</p>`,
    faqs: [
      {
        q: "How quickly can you respond to an emergency?",
        a: "We aim to reach you within 1 hour for genuine emergencies across the Peterborough area. Response times may vary during periods of very high demand, but we always prioritise the most urgent situations first.",
      },
      {
        q: "Do you charge extra for emergency call-outs?",
        a: "During normal working hours (8am–6pm, Monday to Friday), our emergency rates are the same as standard rates. Out-of-hours calls (evenings, weekends, bank holidays) carry a modest premium. We always confirm the price before starting any work.",
      },
      {
        q: "What should I do while waiting for a plumber?",
        a: "Turn off the water at the stopcock (usually under the kitchen sink) to minimise damage. If you smell gas, open windows, don't use any electrical switches, leave the property, and call the National Gas Emergency line on 0800 111 999.",
      },
      {
        q: "Can you fix the problem on the first visit?",
        a: "In most cases, yes. Our vans carry a comprehensive range of common parts, fittings, and materials. For unusual or specialist parts, we may need to return the following day, but we'll always make the situation safe on the first visit.",
      },
      {
        q: "Do you provide emergency cover for landlords?",
        a: "Yes. We offer landlord emergency packages with priority response and direct tenant liaison. Many Peterborough landlords include this in their annual maintenance contracts. Contact us for details.",
      },
      {
        q: "What counts as a plumbing emergency?",
        a: "A plumbing emergency is any situation that poses an immediate risk to safety or property — burst pipes, major leaks, boiler breakdowns in cold weather, gas leaks, sewage backflow, or uncontrollable water flow. If you're not sure, call us and we'll advise.",
      },
    ],
    seoTitle: "Emergency Plumber Peterborough | 24/7 Fast Response",
    seoDescription:
      "24/7 emergency plumber in Peterborough. Burst pipes, boiler breakdowns, leaks, and blocked drains. Fast response by experienced engineers.",
    featured: true,
    sortOrder: 6,
  },
  {
    name: "Plumbing Installation",
    slug: "plumbing-installation",
    shortDescription:
      "Professional plumbing installations for kitchens, bathrooms, appliances, and new-build properties.",
    heroHeading: "Plumbing Installation Services in Peterborough",
    heroSubheading:
      "Expert plumbing installations for homes and commercial properties across Peterborough.",
    content: `<h2>Plumbing Installation Services in Peterborough</h2>
<p>Whether you're fitting a new kitchen, renovating a bathroom, connecting appliances, or extending your home, you need a plumber who installs things properly the first time. Our experienced plumbers handle all types of domestic plumbing installations across Peterborough — from a simple outside tap to full pipework for new-build extensions. Everything is fitted to building regulations and tested before we leave.</p>

<h3>What We Install</h3>
<ul>
<li>Kitchen sinks, taps, and waste connections</li>
<li>Dishwasher and washing machine plumbing</li>
<li>Bathroom suites — baths, showers, basins, and toilets</li>
<li>Toilet and cistern replacements</li>
<li>Water softener and filtration systems</li>
<li>Outside taps and garden plumbing</li>
<li>Pipework for extensions, loft conversions, and new builds</li>
<li>Unvented hot water cylinders</li>
<li>Cold water storage tanks</li>
<li>Mains water upgrades and stopcock replacements</li>
<li>Waste and soil pipe connections</li>
</ul>

<h3>Kitchen Plumbing Installations</h3>
<p>New kitchen? We'll install your sink, taps, dishwasher, and washing machine connections to fit your kitchen layout perfectly. If you're moving the position of your sink or adding an island with a prep sink, we can extend or reroute pipework and waste connections to suit. We work alongside kitchen fitters to make sure the plumbing is done at the right stage, avoiding delays and rework.</p>

<h3>Bathroom Plumbing Installations</h3>
<p>For <a href="/services/bathroom-installations">full bathroom installations</a> we offer a complete service including tiling and finishing. But if you just need the plumbing side — connecting a new bath, shower, basin, or toilet — we can do that too. We install all types of showers including electric, mixer, thermostatic, and power showers, as well as wet room drainage and concealed cisterns.</p>

<h3>New Build and Extension Plumbing</h3>
<p>Building an extension or loft conversion? We carry out first and second fix plumbing for residential projects across Peterborough. This includes running hot and cold supply pipework, waste connections, radiator drops for <a href="/services/central-heating-services">central heating</a>, and connecting new bathrooms, en-suites, or utility rooms. We work to your architect's plans and coordinate with other trades on site.</p>

<h3>Appliance Installations</h3>
<p>Connecting domestic appliances isn't always as simple as screwing on a hose. If your existing plumbing doesn't have the right connections, valves, or waste arrangements, we'll modify or extend the pipework so everything fits properly and meets regulations. This includes:</p>
<ul>
<li>Dishwashers and washing machines (including stacking setups)</li>
<li>American-style fridge freezers with water and ice dispensers</li>
<li>Water softeners and drinking water filtration systems</li>
<li>Waste disposal units</li>
</ul>

<h3>Our Installation Standards</h3>
<p>Every installation we carry out follows current Water Regulations (formerly Water Bylaws) and building regulations where applicable. We use quality materials from trusted suppliers, and every joint and connection is pressure tested before we leave. All pipework is neatly run and clipped — we take pride in work that looks professional, not just work that functions.</p>

<h3>Plumbing Installation Pricing</h3>
<p>Costs depend on the type of installation and the amount of pipework involved. Simple appliance connections start from around £80, while larger projects like full bathroom plumbing or extension pipework are quoted individually after we assess the job. We provide clear, written quotes with no hidden fees — and we'll never start work until you've approved the price.</p>
<p>Need a quote? <a href="/book">Book a free assessment</a> or call us on 01234 567890.</p>

<h3>Areas We Cover</h3>
<p>We carry out plumbing installations across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford.</p>

<h3>Why Choose Peterborough Plumbers for Installations?</h3>
<ul>
<li>30+ years of installation experience across Peterborough</li>
<li>All work compliant with Water Regulations and building standards</li>
<li>Every connection pressure tested before we leave</li>
<li>Quality materials from trusted suppliers</li>
<li>12-month workmanship guarantee on all installations</li>
<li>Clean, tidy work — we protect your home and clean up after ourselves</li>
<li>Happy to work alongside kitchen fitters, builders, and other trades</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "Can you install a dishwasher or washing machine?",
        a: "Yes, we install all types of domestic appliances that require plumbing connections. If the existing plumbing doesn't have the right valves or waste connections, we'll modify the pipework to suit. This includes stacking setups and utility room installations.",
      },
      {
        q: "Do you provide the materials?",
        a: "We can supply all necessary materials and fittings from trusted suppliers, or we're happy to work with products you've already purchased. We'll confirm what's needed during our initial assessment and advise on quality and compatibility.",
      },
      {
        q: "Is there a guarantee on installation work?",
        a: "Yes, all our installation work comes with a 12-month workmanship guarantee as standard. Manufacturer warranties on products we supply are separate and typically longer.",
      },
      {
        q: "Can you do plumbing for a house extension?",
        a: "Yes. We carry out first and second fix plumbing for extensions, loft conversions, and new builds. This includes hot and cold supply pipework, waste connections, heating drops, and connecting new bathrooms or utility rooms.",
      },
      {
        q: "How much does a plumbing installation cost?",
        a: "Costs depend on the complexity. Simple appliance connections start from around £80. Larger projects like bathroom plumbing or extension pipework are quoted individually after assessment. We provide clear, itemised quotes with no hidden fees.",
      },
      {
        q: "Do you install outside taps?",
        a: "Yes, outside tap installation is one of our most popular jobs. We fit frost-resistant taps with isolating valves so you can turn off the outside supply in winter. The installation is quick, typically taking around an hour.",
      },
    ],
    seoTitle: "Plumbing Installation Peterborough | Kitchen & Bathroom Fitting",
    seoDescription:
      "Professional plumbing installation services in Peterborough. Kitchens, bathrooms, appliances, and new builds. Quality guaranteed.",
    featured: false,
    sortOrder: 7,
  },
  {
    name: "Plumbing Repairs",
    slug: "plumbing-repairs",
    image: "/images/homepage/plumbing-repairs.png",
    shortDescription:
      "Fast, reliable plumbing repairs for leaks, dripping taps, faulty toilets, and pipework issues.",
    heroHeading: "Plumbing Repairs in Peterborough",
    heroSubheading:
      "From dripping taps to faulty pipework, we fix plumbing problems quickly and affordably.",
    content: `<h2>Plumbing Repairs in Peterborough — Fast, Honest, Affordable</h2>
<p>A dripping tap might seem like a small problem, but left alone it wastes thousands of litres of water a year. A leaking pipe behind a wall can cause damp, mould, and structural damage before you even notice it. Whatever the issue — big or small — our experienced plumbers diagnose and fix plumbing problems across Peterborough quickly and affordably. Most repairs are completed on the first visit.</p>

<h3>Repairs We Handle Every Day</h3>
<ul>
<li>Leaking and dripping taps (kitchen, bathroom, and garden)</li>
<li>Toilet repairs — running cisterns, phantom flushing, weak flush, leaking bases</li>
<li>Burst and leaking pipes (copper, plastic, and lead)</li>
<li>Radiator leaks, cold radiators, and valve replacements</li>
<li>Ball valve and float valve repairs in cold water tanks</li>
<li>Shower pump failures, mixer valve repairs, and temperature issues</li>
<li>Overflow pipe running constantly</li>
<li>Leaking waste pipes under sinks and baths</li>
<li>Immersion heater replacements</li>
<li>Stopcock replacements (seized or leaking)</li>
<li>Pipework repairs following freeze damage</li>
<li>Water pressure problems</li>
</ul>

<h3>How We Work</h3>
<p>We keep things simple and transparent:</p>
<ul>
<li><strong>1. Book a convenient time</strong> — <a href="/book">online</a> or by calling 01234 567890</li>
<li><strong>2. We diagnose the problem</strong> — our plumber will inspect the issue and explain what needs fixing in plain English</li>
<li><strong>3. Price confirmed before we start</strong> — you'll know exactly what it costs before we pick up a tool. No surprises</li>
<li><strong>4. Repair completed</strong> — most repairs take 30 minutes to 2 hours. We test everything and clean up before we leave</li>
<li><strong>5. 12-month guarantee</strong> — all repair work is guaranteed for 12 months as standard</li>
</ul>

<h3>First-Visit Fix Rate</h3>
<p>Our vans carry a comprehensive stock of common parts including tap cartridges, washers, valves, cistern components, pipe fittings, flexible connectors, and sealants. This means the vast majority of repairs are completed on the first visit — no waiting for parts, no return trips, no extra charges.</p>

<h3>Common Plumbing Problems and What They Mean</h3>
<p>Not sure what's wrong? Here's a quick guide to common symptoms:</p>
<ul>
<li><strong>Dripping tap</strong> — usually a worn washer or ceramic cartridge. Cheap to fix, and stops wasting water and money</li>
<li><strong>Toilet won't stop running</strong> — typically a faulty fill valve or flapper. Left unfixed, it can waste up to 400 litres a day</li>
<li><strong>Low water pressure</strong> — could be a partially closed stopcock, a blockage, or an issue with the mains supply. We'll identify the cause</li>
<li><strong>Banging pipes</strong> — often caused by water hammer, loose pipework, or high pressure. Usually a straightforward fix</li>
<li><strong>Damp patch on ceiling or wall</strong> — likely a slow leak in the pipework above. The sooner it's fixed, the less damage it causes. For hidden leaks, see our <a href="/services/damp-leak-detection">damp and leak detection</a> service</li>
</ul>

<h3>Plumbing Repair Pricing</h3>
<p>We charge fair, transparent rates. Minor repairs like tap washers or toilet adjustments are very affordable. More involved work like replacing a section of pipework or fitting a new stopcock costs more but is always quoted upfront. There are no hidden call-out charges — the price we quote is the price you pay.</p>
<p>If a repair isn't worth doing — for example, if a tap is so old that a replacement would be more cost-effective — we'll tell you honestly and give you options rather than pushing unnecessary work.</p>

<h3>Emergency Plumbing Repairs</h3>
<p>Some repairs can't wait. If you have a burst pipe, a major leak, or no water supply, our <a href="/services/emergency-plumber">emergency plumbing service</a> is available 24/7 across Peterborough. We aim to reach you within the hour and make the situation safe on the first visit.</p>

<h3>Areas We Cover</h3>
<p>We carry out plumbing repairs across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. We're a local business — not a national call centre — so you'll always speak to someone who knows the area.</p>

<h3>Why Choose Peterborough Plumbers for Repairs?</h3>
<ul>
<li>30+ years fixing plumbing problems across Peterborough</li>
<li>Most repairs completed on the first visit</li>
<li>Transparent pricing — no hidden fees or unnecessary upselling</li>
<li>Fully stocked vans with common parts and spares</li>
<li>12-month workmanship guarantee on all repairs</li>
<li>Clean, tidy work — we always leave your home as we found it</li>
<li>Honest advice — if it's not worth repairing, we'll say so</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "How much does a plumbing repair cost?",
        a: "Costs vary depending on the issue. Minor repairs like tap washers are very affordable, while more involved work like pipe replacements or stopcock fitting costs more. We always provide a clear quote before starting work — no hidden fees.",
      },
      {
        q: "Can you fix my leaking tap?",
        a: "Yes, leaking taps are one of our most common repairs. In most cases we can fix the issue within an hour by replacing the washer or ceramic cartridge. If the tap itself is beyond repair, we'll recommend a cost-effective replacement.",
      },
      {
        q: "Do you offer a guarantee on repairs?",
        a: "Yes, all our repair work comes with a 12-month workmanship guarantee as standard. If the same fault reoccurs within that period, we'll fix it at no extra charge.",
      },
      {
        q: "Can you fix the problem on the first visit?",
        a: "In the vast majority of cases, yes. Our vans carry a comprehensive stock of common parts including tap cartridges, washers, valves, pipe fittings, and cistern components. Only unusual or specialist parts may require a follow-up visit.",
      },
      {
        q: "My toilet keeps running — is that serious?",
        a: "A running toilet can waste up to 400 litres of water a day, which will show on your water bill. It's usually caused by a faulty fill valve or flapper and is a quick, affordable fix. Don't ignore it — book a repair sooner rather than later.",
      },
      {
        q: "Do you repair lead pipes?",
        a: "We can repair lead pipework in the short term, but we strongly recommend replacing lead pipes with modern copper or plastic pipework for health and safety reasons. We'll advise on the best course of action for your property.",
      },
    ],
    seoTitle: "Plumbing Repairs Peterborough | Fast & Reliable Fix",
    seoDescription:
      "Fast plumbing repairs in Peterborough. Leaking taps, burst pipes, toilet repairs, and more. Most repairs fixed on the first visit.",
    featured: true,
    sortOrder: 8,
  },
  {
    name: "Damp & Leak Detection",
    slug: "damp-leak-detection",
    shortDescription:
      "Advanced leak detection and damp investigation services to find hidden water damage without destructive methods.",
    heroHeading: "Damp & Leak Detection in Peterborough",
    heroSubheading:
      "Find the source of leaks and damp quickly with our advanced detection equipment. Non-invasive and accurate.",
    content: `<h2>Damp &amp; Leak Detection in Peterborough</h2>
<p>A hidden leak behind a wall or under a floor can cause thousands of pounds of damage before you see a single sign of it. Damp patches, mould, musty smells, and unexplained increases in your water bill are all warning signs that something isn't right. Our specialist leak detection service uses advanced, non-invasive equipment to pinpoint the exact source of water ingress — without ripping up your floors or walls.</p>

<h3>Our Detection Methods</h3>
<p>We use a combination of professional techniques to locate leaks accurately and quickly:</p>
<ul>
<li><strong>Thermal imaging cameras</strong> — detect temperature differences caused by moisture behind walls, under floors, and in ceilings</li>
<li><strong>Acoustic listening equipment</strong> — amplifies the sound of pressurised water escaping from pipes, even through concrete and timber</li>
<li><strong>Moisture mapping</strong> — systematic readings across walls and floors to map the full extent of damp and trace it back to its source</li>
<li><strong>Tracer gas detection</strong> — a safe, non-toxic gas is introduced into the pipework and detected at the leak point above ground</li>
<li><strong>Dye testing</strong> — fluorescent dye traces the flow path of water to identify waste pipe leaks and drainage issues</li>
<li><strong>Pressure testing</strong> — isolates sections of pipework and tests for pressure drops that indicate a leak</li>
</ul>
<p>Each method has its strengths, and we'll choose the right combination based on your situation. In most cases, we can locate the leak within a single visit.</p>

<h3>Signs You May Have a Hidden Leak</h3>
<p>Not all leaks are obvious. Here are the common warning signs that suggest hidden water damage in your property:</p>
<ul>
<li>Damp patches appearing on walls, ceilings, or floors with no obvious cause</li>
<li>Mould or mildew growth, particularly in corners or behind furniture</li>
<li>A persistent musty or damp smell in certain rooms</li>
<li>Water bills that have increased without a change in usage</li>
<li>Loss of water pressure in taps or showers</li>
<li>Sounds of running water when no taps or appliances are in use</li>
<li>Warm spots on floors (possible underfloor heating pipe leak)</li>
<li>Lifting or buckling of flooring</li>
<li>Peeling paint or wallpaper</li>
</ul>
<p>If you've noticed any of these signs, don't delay. The longer a hidden leak goes unfixed, the more damage it causes — and the more expensive the repair becomes.</p>

<h3>Why Professional Detection Matters</h3>
<p>It's tempting to start pulling up floorboards or chipping away plaster to try and find a leak yourself. But without the right equipment, you'll often cause more damage than the leak itself — and you might not even find it. Our non-invasive methods pinpoint the exact location with minimal disruption, meaning repairs are targeted, affordable, and quick.</p>
<p>Professional detection is also essential for insurance claims. Many insurers require evidence that the source of water damage has been professionally identified before they'll approve a claim. We provide a detailed report with photographs and thermal images that you can submit directly to your insurer.</p>

<h3>Detect and Repair in One Visit</h3>
<p>Once we've found the leak, we can usually carry out the <a href="/services/plumbing-repairs">repair</a> immediately — saving you the cost and disruption of a second visit. Whether it's a failed pipe joint, a cracked fitting, or a corroded section of pipework, our plumbers have the skills and materials to fix it on the spot.</p>
<p>For more complex situations — such as underfloor heating leaks or leaks within a concrete slab — we'll explain your options clearly and provide a written quote for the repair work.</p>

<h3>Damp Investigation</h3>
<p>Not all damp is caused by leaking pipes. Rising damp, penetrating damp, and condensation all look similar but have very different causes and solutions. Our damp investigation identifies the true source of the problem so you can address it properly rather than wasting money on the wrong treatment.</p>
<ul>
<li><strong>Rising damp</strong> — moisture from the ground rising through walls due to a failed or missing damp-proof course</li>
<li><strong>Penetrating damp</strong> — water entering through external walls, roofs, or windows due to defective building fabric</li>
<li><strong>Condensation damp</strong> — moisture from daily living (cooking, showering, drying clothes) that isn't ventilated properly</li>
<li><strong>Plumbing leaks</strong> — hidden pipe or waste leaks causing localised damp patches</li>
</ul>

<h3>Leak Detection Pricing</h3>
<p>Our standard leak detection survey covers a thorough investigation using multiple detection methods, and includes a detailed report with our findings. If we locate the leak and can repair it on the same visit, we'll quote the repair cost separately and only proceed with your approval.</p>
<p>Pricing depends on the complexity and size of the property, but we'll always confirm costs before we start. <a href="/book">Book a leak detection survey</a> or call us on 01234 567890.</p>

<h3>Areas We Cover</h3>
<p>We carry out leak detection across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford.</p>

<h3>Why Choose Peterborough Plumbers for Leak Detection?</h3>
<ul>
<li>Advanced non-invasive detection equipment — no unnecessary damage</li>
<li>30+ years of plumbing experience in Peterborough</li>
<li>Detect and repair in a single visit where possible</li>
<li>Detailed reports suitable for insurance claims</li>
<li>Damp investigation covering all causes, not just leaks</li>
<li>Transparent pricing with no hidden fees</li>
<li>12-month guarantee on all repair work</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "How do you detect hidden leaks?",
        a: "We use a combination of thermal imaging cameras, acoustic listening devices, moisture meters, tracer gas, and dye testing to locate leaks without causing damage to your property. The method depends on the type of leak and the construction of your home.",
      },
      {
        q: "What are the signs of a hidden leak?",
        a: "Common signs include unexplained damp patches on walls or ceilings, mould growth, musty smells, rising water bills, loss of water pressure, warm spots on floors, and sounds of running water when nothing is turned on.",
      },
      {
        q: "Can you repair the leak once found?",
        a: "Yes, in most cases we can locate and repair the leak on the same visit, saving you time and the cost of a second appointment. For more complex repairs, we'll provide a clear quote before proceeding.",
      },
      {
        q: "Is your detection method non-invasive?",
        a: "Yes. All our primary detection methods are non-invasive — we don't need to rip up floors or walls to find the leak. Occasionally, a small access point may be needed for the repair itself, but we always minimise disruption.",
      },
      {
        q: "Will your report help with an insurance claim?",
        a: "Yes. We provide a detailed report with photographs and thermal images showing the location and cause of the leak. This is suitable for submission to your insurer as evidence for a water damage claim.",
      },
      {
        q: "Is my damp caused by a leak or something else?",
        a: "Not all damp is caused by plumbing leaks. It could be rising damp, penetrating damp, or condensation. Our investigation covers all possible causes and identifies the true source so you can fix the right problem. We'll explain our findings clearly and recommend the best course of action.",
      },
    ],
    seoTitle: "Damp & Leak Detection Peterborough | Non-Invasive Methods",
    seoDescription:
      "Professional damp and leak detection in Peterborough. Thermal imaging, acoustic detection, and moisture mapping. Non-invasive and accurate.",
    featured: false,
    sortOrder: 9,
  },
  {
    name: "Drain Blockages",
    slug: "drain-blockages",
    shortDescription:
      "Professional drain unblocking and clearance for sinks, toilets, outside drains, and sewer lines.",
    heroHeading: "Drain Unblocking in Peterborough",
    heroSubheading:
      "Fast, effective drain clearance for domestic and commercial properties. Available 7 days a week.",
    content: `<h2>Drain Unblocking &amp; Clearance in Peterborough</h2>
<p>A blocked drain is more than just an inconvenience — it's a health hazard. Sewage backflow, foul smells, and overflowing water can make your home or business unusable until the problem is fixed. Our drain clearance team deals with blocked drains across Peterborough 7 days a week, using professional equipment to get your drains flowing freely — usually within the same visit.</p>

<h3>Drain Services We Provide</h3>
<ul>
<li>Blocked kitchen sink and basin clearance</li>
<li>Blocked toilet unblocking</li>
<li>Outside drain and manhole clearance</li>
<li>High-pressure water jetting</li>
<li>CCTV drain surveys and inspection</li>
<li>Tree root removal from drain lines</li>
<li>Drain repairs, relining, and patch repairs</li>
<li>Shower and bath waste clearance</li>
<li>Grease trap cleaning for commercial kitchens</li>
<li>Soakaway clearance and testing</li>
<li>Gutter and downpipe clearance</li>
</ul>

<h3>How We Unblock Drains</h3>
<p>We use a range of professional techniques depending on the severity and location of the blockage:</p>
<ul>
<li><strong>Mechanical rodding</strong> — flexible drain rods break through blockages in straight runs of pipework. Effective for most domestic blockages</li>
<li><strong>High-pressure water jetting</strong> — a powerful jet of water scours the inside of the pipe, clearing grease, sludge, roots, and scale. This is the most thorough method and leaves pipes genuinely clean</li>
<li><strong>Electro-mechanical cleaning</strong> — a rotating cutting head clears stubborn blockages including tree roots and solidite deposits</li>
<li><strong>CCTV inspection</strong> — a camera is fed into the drain to identify the exact location and cause of the problem. Essential for recurring blockages and structural issues</li>
</ul>

<h3>Common Causes of Blocked Drains</h3>
<p>Understanding what causes blockages can help you prevent them. The most common causes we see in Peterborough homes include:</p>
<ul>
<li><strong>Fat, oil, and grease (FOG)</strong> — poured down the kitchen sink, it solidifies in the pipe and gradually narrows the bore until it blocks completely</li>
<li><strong>Wet wipes and sanitary products</strong> — these don't break down like toilet paper and are the single biggest cause of toilet blockages</li>
<li><strong>Hair and soap scum</strong> — builds up in shower and bath wastes over time</li>
<li><strong>Food waste</strong> — rice, pasta, and coffee grounds swell in water and clump together</li>
<li><strong>Tree root ingress</strong> — roots seek out moisture and can penetrate joints in older clay pipes</li>
<li><strong>Collapsed or displaced pipes</strong> — older clay drainage can crack, collapse, or shift over time, causing recurring blockages</li>
</ul>

<h3>CCTV Drain Surveys</h3>
<p>If your drains keep blocking or you're experiencing slow drainage, a CCTV survey can identify the root cause. We feed a high-resolution camera through your drainage system and record the footage, identifying blockages, damage, root ingress, displaced joints, and other defects. You'll receive a report with findings and recommendations.</p>
<p>CCTV surveys are also valuable before buying a property. If you're purchasing a home in Peterborough, consider combining a drain survey with our <a href="/services/pre-purchase-plumbing-survey">pre-purchase plumbing survey</a> for complete peace of mind.</p>

<h3>Drain Repairs</h3>
<p>If the blockage has been caused by structural damage to the pipework — a cracked pipe, a displaced joint, or a collapsed section — we can carry out repairs on site. Options include:</p>
<ul>
<li><strong>Patch repair</strong> — a localised fix for a single crack or joint failure</li>
<li><strong>Drain relining</strong> — a resin liner is cured inside the existing pipe, creating a new pipe within the old one. No excavation needed</li>
<li><strong>Excavation and replacement</strong> — for severely damaged or collapsed drains that can't be relined</li>
</ul>

<h3>Prevention Tips</h3>
<p>We don't just clear blockages — we'll help you prevent them coming back:</p>
<ul>
<li>Never pour fat, oil, or grease down the sink — let it cool and bin it</li>
<li>Use drain guards in showers and baths to catch hair</li>
<li>Only flush toilet paper — nothing else, including "flushable" wipes</li>
<li>Run hot water down the kitchen sink after washing up to help clear residual grease</li>
<li>Have outside drains inspected annually if you have mature trees nearby</li>
</ul>

<h3>Drain Unblocking Pricing</h3>
<p>Most domestic drain blockages are cleared at a fixed price that we confirm before starting work. High-pressure jetting and CCTV surveys are priced separately depending on the extent of the drainage system. We don't charge by the hour for standard unblocking — you'll know the cost upfront.</p>
<p>For <a href="/services/landlord-services">landlords</a> with multiple properties, we offer discounted rates for regular drain maintenance. <a href="/book">Book online</a> or call 01234 567890.</p>

<h3>Areas We Cover</h3>
<p>We clear blocked drains across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. Available 7 days a week, with <a href="/services/emergency-plumber">emergency response</a> for sewage backflow and flooding.</p>

<h3>Why Choose Peterborough Plumbers for Drain Clearance?</h3>
<ul>
<li>30+ years clearing drains across Peterborough</li>
<li>Professional high-pressure jetting and CCTV equipment</li>
<li>Most blockages cleared on the same visit</li>
<li>Fixed-price unblocking — no hourly charges for standard jobs</li>
<li>Available 7 days a week with emergency response</li>
<li>Honest prevention advice to stop blockages recurring</li>
<li>Drain repairs and relining available on site</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "How quickly can you unblock my drain?",
        a: "Most drain blockages can be cleared within 1 to 2 hours of our arrival. We carry professional equipment in our vans and are available 7 days a week. For emergencies like sewage backflow, we offer same-day response.",
      },
      {
        q: "What causes blocked drains?",
        a: "The most common causes are fat and grease build-up, wet wipes and sanitary products, hair, food waste, tree root ingress, and collapsed pipework. We'll identify the cause and advise on how to prevent it happening again.",
      },
      {
        q: "Do you offer CCTV drain surveys?",
        a: "Yes. We use high-resolution CCTV cameras to inspect drains and identify the exact cause and location of blockages or structural damage. You'll receive a recorded survey with a report and recommendations. It's especially useful for recurring problems or pre-purchase inspections.",
      },
      {
        q: "How much does drain unblocking cost in Peterborough?",
        a: "Most domestic drain blockages are cleared at a fixed price that we confirm before starting. We don't charge by the hour for standard unblocking. CCTV surveys and jetting are priced based on the extent of the system. Contact us for a quote.",
      },
      {
        q: "Can you fix a collapsed drain?",
        a: "Yes. Depending on the severity, we can carry out patch repairs, drain relining (no excavation), or full excavation and replacement. We'll assess the damage with CCTV and recommend the most cost-effective solution.",
      },
      {
        q: "How can I prevent blocked drains?",
        a: "Never pour fat or grease down the sink, use drain guards to catch hair, only flush toilet paper, and have outside drains checked annually if you have mature trees nearby. These simple steps prevent the majority of blockages.",
      },
    ],
    seoTitle: "Drain Unblocking Peterborough | Fast Drain Clearance Service",
    seoDescription:
      "Professional drain unblocking in Peterborough. Blocked sinks, toilets, outside drains. High-pressure jetting and CCTV surveys available.",
    featured: false,
    sortOrder: 10,
  },
  {
    name: "Pre-Purchase Plumbing Survey",
    slug: "pre-purchase-plumbing-survey",
    shortDescription:
      "Detailed plumbing survey before buying a property. Identify hidden issues and avoid costly surprises.",
    heroHeading: "Pre-Purchase Plumbing Surveys in Peterborough",
    heroSubheading:
      "Know exactly what you're buying. Our detailed plumbing survey uncovers hidden issues before you commit.",
    content: `<h2>Pre-Purchase Plumbing Surveys in Peterborough</h2>
<p>Buying a house is one of the biggest financial decisions you'll make. A standard property survey checks the structure, roof, and damp — but it barely scratches the surface when it comes to plumbing. A failed boiler, lead pipework, or a cracked drain can easily cost £3,000–£10,000+ to fix, and you won't know about it until you've moved in. Our dedicated plumbing survey gives you the full picture before you commit.</p>

<h3>What We Inspect</h3>
<p>Our survey covers every aspect of the property's plumbing and heating systems:</p>
<ul>
<li><strong>Boiler</strong> — age, condition, efficiency rating, service history, and estimated remaining lifespan</li>
<li><strong>Central heating</strong> — radiators, pipework, pump, controls, and overall system condition</li>
<li><strong>Hot water system</strong> — cylinder condition, immersion heater, unvented systems, and temperature output</li>
<li><strong>Cold water supply</strong> — mains supply, internal stopcock, pipework material (including lead identification), and water pressure</li>
<li><strong>Bathroom plumbing</strong> — taps, toilets, showers, baths, waste connections, and sealant condition</li>
<li><strong>Kitchen plumbing</strong> — sink, taps, dishwasher and washing machine connections, and waste pipework</li>
<li><strong>Drainage</strong> — internal waste pipes, external drains, manholes, and overall drainage condition</li>
<li><strong>Water pressure and flow rates</strong> — measured at multiple points to identify supply issues</li>
<li><strong>Gas safety</strong> — visual inspection of gas pipework, appliance connections, and ventilation. A full <a href="/services/gas-safety-certificates">gas safety certificate</a> can be arranged separately if needed</li>
<li><strong>Lead pipework</strong> — identification of any lead supply pipes or internal lead pipework that should be replaced</li>
</ul>

<h3>Why Standard Surveys Aren't Enough</h3>
<p>A RICS HomeBuyer Report or Building Survey will mention plumbing in passing — typically noting whether there's a boiler and whether they spotted any obvious leaks. But they won't test the heating system, check water pressure, identify the pipework material, inspect drainage, or assess the condition of individual components. That's not a criticism of surveyors — it's simply outside their scope.</p>
<p>Our plumbing survey fills that gap. It's carried out by experienced plumbing engineers who know exactly what to look for and can estimate repair costs accurately. It's especially valuable for:</p>
<ul>
<li>Older properties (pre-1970s) that may have lead pipes, outdated boilers, or ageing drainage</li>
<li>Properties that have been rented out (maintenance may have been minimal)</li>
<li>Properties where the seller can't provide boiler service records or certificates</li>
<li>Any property where you want complete confidence in the plumbing condition before you buy</li>
</ul>

<h3>Your Detailed Report</h3>
<p>After the inspection, you'll receive a comprehensive written report covering:</p>
<ul>
<li>The condition of every plumbing and heating component inspected</li>
<li>A traffic-light rating system (green, amber, red) for each area so you can see issues at a glance</li>
<li>Estimated costs for any remedial work required — with clear explanations of urgency</li>
<li>Photographs documenting key findings</li>
<li>Recommendations for immediate, short-term, and long-term work</li>
</ul>
<p>This report gives you genuine negotiating power. If the boiler is on its last legs or the drainage needs replacing, you can use our estimated repair costs to negotiate a lower purchase price — or request the seller makes repairs before completion.</p>

<h3>Combine with a Drain Survey</h3>
<p>For older properties or homes with mature trees nearby, we strongly recommend adding a CCTV <a href="/services/drain-blockages">drain survey</a> to your plumbing inspection. Tree root ingress and cracked clay pipes are common in Peterborough's older housing stock and can cost thousands to repair. A camera survey takes around 30 minutes and gives you a clear picture of the drainage condition underground.</p>

<h3>Plumbing Survey Pricing</h3>
<p>Our standard pre-purchase plumbing survey covers a typical 2–4 bedroom property and includes a detailed written report. Larger properties or those with complex systems are quoted individually. We can usually carry out the survey within a few days of booking — important when you're working to exchange deadlines.</p>
<p><a href="/book">Book your plumbing survey</a> or call us on 01234 567890 for pricing and availability.</p>

<h3>Areas We Cover</h3>
<p>We carry out pre-purchase plumbing surveys across Peterborough and the surrounding areas, including the city centre (PE1), Orton, Werrington, Hampton, Bretton, Fletton, Stanground, Yaxley, Market Deeping, Whittlesey, and Stamford. If you're buying a property in the Peterborough area, we can help.</p>

<h3>Why Choose Peterborough Plumbers for Your Survey?</h3>
<ul>
<li>30+ years of plumbing experience — we know what to look for in Peterborough properties</li>
<li>Comprehensive inspection covering boiler, heating, water supply, drainage, and gas</li>
<li>Detailed written report with photographs and estimated repair costs</li>
<li>Traffic-light rating system for easy understanding</li>
<li>Fast turnaround — usually within a few days of booking</li>
<li>Reports accepted by solicitors and mortgage lenders</li>
<li>Optional CCTV drain survey add-on</li>
<li>4.6-star Google rating from over 120 reviews</li>
</ul>`,
    faqs: [
      {
        q: "Why do I need a plumbing survey when buying a house?",
        a: "Standard property surveys don't check plumbing in detail. Hidden issues like lead pipes, failing boilers, corroded pipework, or cracked drains can cost thousands to fix. A plumbing survey gives you the full picture and real negotiating power before you commit to the purchase.",
      },
      {
        q: "How long does a plumbing survey take?",
        a: "A thorough plumbing survey typically takes 1.5 to 3 hours depending on the size and age of the property. Adding a CCTV drain survey adds approximately 30 minutes.",
      },
      {
        q: "Can the survey help with price negotiation?",
        a: "Absolutely. Our report includes estimated repair costs for any issues found. Buyers regularly use this to negotiate thousands off the asking price or to require the seller to carry out repairs before completion.",
      },
      {
        q: "What's included in the report?",
        a: "You'll receive a comprehensive written report covering every plumbing and heating component, with a traffic-light rating system, photographs, estimated repair costs, and recommendations for immediate and future work.",
      },
      {
        q: "Should I also get a drain survey?",
        a: "We recommend a CCTV drain survey for older properties (pre-1970s) or homes with mature trees nearby. Tree root ingress and cracked clay drainage pipes are common in Peterborough and can be expensive to repair. It's a small additional cost for significant peace of mind.",
      },
      {
        q: "How soon can you carry out the survey?",
        a: "We can usually schedule a survey within 2–3 working days. If you're working to a tight exchange deadline, let us know and we'll do our best to accommodate your timeline.",
      },
    ],
    seoTitle: "Pre-Purchase Plumbing Survey Peterborough | Home Buyer Checks",
    seoDescription:
      "Pre-purchase plumbing surveys in Peterborough. Detailed inspection of boilers, heating, drains, and pipework before you buy. Written report included.",
    featured: false,
    sortOrder: 11,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
