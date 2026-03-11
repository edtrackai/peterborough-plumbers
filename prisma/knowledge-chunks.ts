// Handbook knowledge chunks for RAG
// Each chunk = one searchable unit of knowledge

export const KNOWLEDGE_CHUNKS = [
  // ── GENERAL PLUMBING ─────────────────────────────────────────────────────
  {
    section: '7.1',
    title: 'General Plumbing Repairs',
    content: `SERVICE: General Plumbing Repairs
SCOPE: Dripping taps, leaking tap bases, loose taps, stop-tap issues, isolation-valve issues, leaking pipe joints, trap leaks, visible pipe leaks, overflows, minor plumbing faults, visible fitting failures.

WHAT RESIDENT CAN DO:
- Identify where the leak is visible
- Isolate water at a local valve or stop tap if they know how
- Avoid using the faulty fitting
- Place a towel or bucket to catch drips
- Clean a tap aerator (unscrew spout tip, rinse mesh, refit)
- Describe whether drip is from spout or base

WHAT RESIDENT MUST NOT DO:
- Remove fittings they are not confident with
- Keep tightening random joints hoping to stop a leak
- Open walls, floors, or ceilings
- Attempt hidden leak repairs
- Anything involving gas equipment

TRIAGE QUESTIONS:
- What exactly is leaking or not working?
- Is the leak from the fitting itself, the base, or from below?
- Is the leak constant or only when in use?
- Can you send a photo?
- Have you managed to turn the water off locally?
- Is it just one fitting or more than one?

WHEN TO BOOK:
- Customer doesn't want to do the check
- Leak is ongoing
- Isolation is unclear
- Fitting needs opening or replacing
- Problem is recurring
- There is water damage risk`,
  },

  // ── TAPS / TOILETS / BASINS ───────────────────────────────────────────────
  {
    section: '7.2',
    title: 'Taps, Toilets, Basins, Sinks and Wastes',
    content: `SERVICE: Taps, Toilets, Basins, Sinks and Wastes
SCOPE: Dripping taps, taps not turning, mixer tap faults, loose taps, leaking basin wastes, leaking sink traps, toilet not flushing, toilet continuously running, toilet fill problems, slow-draining basins, waste pipe smells, overflow issues.

WHAT RESIDENT CAN DO:
- Send photos or video
- Describe whether the issue is visible, intermittent, or constant
- Stop using the fitting
- Remove visible hair or debris from a basin plug area
- Use a simple plunger on a locally blocked sink
- Flush once to demonstrate the fault

WHAT RESIDENT MUST NOT DO:
- Dismantle toilet internals unless very confident
- Use aggressive chemical drain products as a first response
- Force seized fittings
- Keep using a leaking toilet that is damaging the floor
- Ignore a continuously running toilet for days

TRIAGE QUESTIONS:
- Is it leaking, blocked, not flushing, or running continuously?
- Is water going onto the floor?
- Is it one toilet or all toilets?
- Is the sink slow or completely blocked?
- Does it smell?
- Is the issue under the basin or sink, or above?

WHEN TO BOOK:
- Toilet running continuously
- Floor leak
- Repeated blockage
- Trap or waste leak
- Customer uncomfortable doing anything
- Issue not resolved by basic visible steps`,
  },

  // ── SHOWERS & BATHS ───────────────────────────────────────────────────────
  {
    section: '7.3',
    title: 'Showers and Baths',
    content: `SERVICE: Showers and Baths
SCOPE: Shower not getting hot enough, shower leaking, shower tray or waste leak, poor shower pressure, shower valve fault, bath waste leak, bath tap issue, shower hose or head replacement, shower not draining, bath overflow issue.

WHAT RESIDENT CAN DO:
- Stop using the shower if it is causing a leak
- Send photo or video
- Note whether the leak only happens when the shower is on
- Clean a shower head (soak in white vinegar solution overnight)
- Replace a simple hose or shower head if confident
- Note whether pressure is low on hot only, cold only, or both

WHAT RESIDENT MUST NOT DO:
- Remove concealed shower valves
- Open walls or trays
- Ignore leaks dripping into ceilings below
- Alter temperature controls on safety devices blindly

TRIAGE QUESTIONS:
- Is it leaking only when the shower is used?
- Is there any water showing below the bathroom — ceiling below?
- Is it a temperature issue, pressure issue, leak, or blockage?
- Is it just the shower or also taps elsewhere?
- Can you send a photo or short video?

WHEN TO BOOK:
- Ceiling leak
- Hidden leak suspected
- Valve issue
- Poor temperature not linked to a simple setting
- Repeated shower tray or waste issue
- Customer doesn't want to attempt anything`,
  },

  // ── LEAKS & BURST PIPES ───────────────────────────────────────────────────
  {
    section: '7.4',
    title: 'Leaks and Burst Pipes',
    content: `SERVICE: Leaks and Burst Pipes
SCOPE: Visible pipe leak, burst pipe, leaking joint, hidden leak, ceiling leak, wall leak, floor leak, leak under sink, leak under bath, outside pipe leak, suspected frost damage.

WHAT RESIDENT CAN DO:
- Turn off the local valve or main stop tap if known
- Stop using the affected fitting or area
- Move belongings away from the water
- Place towels or buckets
- Send photos or video
- Describe when the leak gets worse — all the time or when using a fitting

WHAT RESIDENT MUST NOT DO:
- Cut into walls, ceilings, or floors
- Keep using a leaking shower or bath when water is going through the ceiling
- Apply random sealants as a permanent repair
- Ignore leaks near electrical fittings

PRECAUTION MESSAGES:
- "Please stop using that fitting for now."
- "If you know where the stop tap is, turn the water off."
- "Keep clear of any electrics near the leak."
- "Place a bucket or towels underneath for now."

TRIAGE QUESTIONS:
- Where is the water showing?
- Is the leak constant or only when something is used?
- Has the ceiling started sagging or bubbling?
- Is it hot water, cold water, or unknown?
- Is any electrical fitting nearby?
- Can you send a photo or video?

BOOK URGENTLY WHEN:
- Active ceiling leak
- Burst pipe
- Major leak
- Leak near electrics
- Customer cannot isolate water
- Damage spreading quickly`,
  },

  // ── DRAINAGE & BLOCKAGES ──────────────────────────────────────────────────
  {
    section: '7.5',
    title: 'Drainage and Blockages',
    content: `SERVICE: Drainage and Blockages
SCOPE: Blocked sink, blocked bath waste, blocked shower waste, blocked toilet, repeated drainage issue, foul smell, slow draining, backflow, outside gully issue, shared drain suspicion, soil-stack issues.

WHAT RESIDENT CAN DO:
- Say which fixtures are affected — one or several
- Remove visible hair or debris from local waste grilles
- Use a simple plunger for a locally blocked sink or basin
- Stop using overflowing fixtures
- Send video if water is backing up

WHAT RESIDENT MUST NOT DO:
- Keep pouring chemicals into recurring blockages
- Continue using a backing-up toilet
- Open dangerous external drainage points without training
- Assume every blockage is local when multiple fixtures are affected

TRIAGE QUESTIONS:
- Is it one fixture or several?
- Is it slow draining or fully blocked?
- Is there a smell?
- Is anything backing up elsewhere?
- Is it internal only or also outside?
- Is the toilet involved?

RED FLAGS — BOOK URGENTLY:
- Sewage backflow
- Overflowing foul water
- Blockage affecting multiple fixtures
- Hazardous external drainage condition`,
  },

  // ── HOT WATER SYSTEMS ─────────────────────────────────────────────────────
  {
    section: '7.6',
    title: 'Hot Water Systems — Vented and General',
    content: `SERVICE: Hot Water Systems (Vented / General)
SCOPE: No hot water, intermittent hot water, hot water takes too long, cylinder not reheating, immersion fallback, programmer timing issues, cylinder thermostat issues.

WHAT RESIDENT CAN DO:
- Confirm whether they have a combi or a separate hot water cylinder
- Check timer or programmer settings
- Say whether heating works but hot water does not
- Say whether hot water is hot anywhere in the house
- Send photo of controls

WHAT RESIDENT MUST NOT DO:
- Interfere with cylinder safety components
- Remove covers or controls they do not understand
- Assume every hot water issue is a boiler issue

TRIAGE QUESTIONS:
- Do you have a combi or a separate hot water cylinder?
- Do you have heating as normal?
- Is there no hot water at all or just not very hot?
- Is the problem all day or at certain times?
- Can you send a photo of the controls?

WHEN TO BOOK:
- Hot water still not working after basic setting checks
- Cylinder timing seems correct but no result
- Repeated hot-water failure
- Suspected valve, thermostat, or cylinder fault
- Customer not comfortable checking settings`,
  },

  // ── UNVENTED CYLINDERS ────────────────────────────────────────────────────
  {
    section: '7.7',
    title: 'Unvented Hot Water Cylinders',
    content: `SERVICE: Unvented Hot Water Cylinders
SCOPE: Hot water discharge from pipe, tundish discharge, pressure or safety-device concerns, no hot water from unvented cylinder, expansion or safety-related issues.

IMPORTANT: Unvented cylinders operate at mains pressure and include multiple safety devices. These MUST be handled by a qualified engineer with G3 unvented qualification. No DIY.

WHAT RESIDENT CAN DO:
- Identify whether hot water is discharging visibly — dripping or flowing from a pipe
- Switch the heater off if there is a discharge fault
- Send a photo or video
- Stop further tampering
- Report whether there is hot water or not

WHAT RESIDENT MUST NEVER DO:
- Remove or adjust any safety component
- Interfere with discharge pipework
- Cap or block discharge pipes
- Keep using the system normally while discharge continues
- Attempt to re-pressurise or adjust the expansion vessel

TRIAGE QUESTIONS:
- Is hot water coming out of a discharge pipe or tundish?
- Do you still have hot water?
- Is the discharge continuous or occasional?
- Can you send a photo or video?
- Have you switched the heater off?

BOOK URGENTLY WHEN:
- Hot water discharging from any pipe
- Visible safety discharge
- No hot water on an unvented system

EMERGENCY MESSAGE:
"Please switch the heater off and don't adjust any components. This needs urgent attention from a qualified engineer."`,
  },

  // ── CENTRAL HEATING ───────────────────────────────────────────────────────
  {
    section: '7.8',
    title: 'Central Heating Systems',
    content: `SERVICE: Central Heating Systems
SCOPE: No heating, some radiators cold, upstairs or downstairs imbalance, system pressure changes, heating not following programme, zone issues, circulation issues, pump, valve, or control faults.

WHAT RESIDENT CAN DO:
- Check thermostat setting — is it calling for heat?
- Check timer or programme
- Say whether heating and hot water are both affected or just one
- Say if only some radiators are cold
- Bleed a radiator if confident and physically able
- Send photos of controls

WHAT RESIDENT MUST NOT DO:
- Open up heating controls or junction boxes
- Drain and refill the system without knowing the procedure
- Assume the boiler is broken when only one radiator is cold
- Interfere with motorised valves or pumps

TRIAGE QUESTIONS:
- Do you have hot water as normal?
- Are all radiators affected or only some?
- Is the thermostat calling for heat?
- Has the boiler pressure dropped?
- Did the issue start suddenly or gradually?

WHEN TO BOOK:
- Heating still not working after thermostat or timer check
- Only some zones heating
- Repeated pressure drop
- Possible pump, valve, or control fault
- Customer doesn't want to bleed or check anything`,
  },

  // ── RADIATORS & VALVES ────────────────────────────────────────────────────
  {
    section: '7.9',
    title: 'Radiators, Valves, Air and Balancing',
    content: `SERVICE: Radiators, Valves, Air and Balancing
SCOPE: Cold radiator, warm at bottom only, warm at top only, noisy radiator, leaking radiator, leaking TRV, stuck radiator valve, towel rail not heating.

BLEEDING A RADIATOR (resident can do):
1. Turn heating off and let radiators cool slightly.
2. Place a cloth beneath the bleed valve (top corner of radiator).
3. Open with a radiator key — quarter turn anti-clockwise.
4. Air hisses out. When water dribbles, close the valve.
5. Check boiler pressure — bleeding drops pressure. Top up to 1–1.5 bar if needed.

STUCK TRV (resident can check):
- Remove the TRV head (unscrews or unclips).
- The brass pin underneath should spring up and down freely.
- If stuck down, the radiator won't get hot.
- Gently tap with pliers to free it.

WHAT RESIDENT CAN DO:
- Say whether it is one radiator or many
- Describe whether radiator is cold at top, bottom, or all over
- Bleed a radiator if confident and safe
- Place a towel beneath a minor valve drip
- Send a photo

WHAT RESIDENT MUST NOT DO:
- Force seized valves
- Remove a radiator
- Start draining the system
- Ignore an active leak

TRIAGE QUESTIONS:
- Is it one radiator or all?
- Is it cold at the top, bottom, or all over?
- Is the valve leaking?
- Have you bled it before?
- Is the boiler pressure normal?

WHEN TO BOOK:
- Radiator leak
- Valve fault
- Repeated cold radiator after bleed
- Customer elderly, physically unable, or uncomfortable
- Issue appears system-wide`,
  },

  // ── BOILERS ───────────────────────────────────────────────────────────────
  {
    section: '7.10',
    title: 'Boilers — Service, Repair, Breakdown, Error Codes',
    content: `SERVICE: Boilers
SCOPE: Boiler service (annual), boiler breakdown, error code, warning light, no power, no heating, no hot water, low pressure, pilot light issues, frozen condensate pipe, repeated lockout, boiler replacement routing.

BOILER SEVERITY CLASSIFICATION:
- GREEN: Power/settings issue, low pressure, frozen condensate, simple user setting
- AMBER: Error remains after basic checks, repeated pressure drop, no heating/hot water unresolved, repeated lockout
- RED: Gas smell, CO alarm, severe safety concern — EMERGENCY ROUTE IMMEDIATELY

COMMON ERROR CODES:
- Vaillant F22: Low pressure — check gauge, repressurise to 1–1.5 bar
- Vaillant F28: Ignition failure — check gas supply, try reset once
- Vaillant F75: Pressure sensor fault — needs engineer
- Worcester EA: Ignition lockout — try reset once, if repeats needs engineer
- Worcester E9: Overheat/low pressure — check pressure, if repeats needs engineer

WHAT RESIDENT CAN SAFELY DO:
- Check if there is power — display lit? Wall switch on?
- Check breaker in consumer unit — switch on once if tripped
- Check thermostat is set above room temperature and timer is on
- Note the exact error code on the display
- Send a photo of the display
- Check the pressure gauge — should be 1–1.5 bar when cold
- Repressurise via filling loop if manufacturer's manual instructs — fill to 1–1.5 bar with heating off
- Gently thaw an accessible frozen condensate pipe using warm water — never boiling
- Follow manufacturer's guide for a user-level reset — try once only

WHAT RESIDENT MUST NOT DO:
- Open the boiler casing
- Repair any internal boiler component
- Touch gas-side components — gas valve, burner, gas pipe
- Keep resetting the boiler endlessly after repeated lockouts
- Continue using a boiler they suspect is unsafe

FROZEN CONDENSATE PIPE (resident can do):
- Locate the white or grey plastic pipe running from boiler to external drain
- Identify the freeze point — usually most exposed external section
- Apply warm (not boiling) water along the frozen section
- Once thawed, reset the boiler

BOILER TRIAGE QUESTIONS:
- Do you smell gas? (If yes → EMERGENCY immediately)
- Is the carbon monoxide alarm going off? (If yes → EMERGENCY)
- What is the exact error code?
- Is the screen blank or lit?
- Do you have no heating, no hot water, or both?
- Is the pressure low — below 1 bar?
- Have you checked the power switch and breaker?
- Do you have a combi or a separate cylinder?
- Can you send a photo of the display?

WHEN TO BOOK:
- Error remains after basic user checks
- Repeated lockouts
- Repeated pressure drop
- No response from heating or hot water
- Customer not comfortable doing checks`,
  },

  // ── GAS SAFETY / CP12 ─────────────────────────────────────────────────────
  {
    section: '7.11',
    title: 'Gas Safety and Landlord CP12 Certificates',
    content: `SERVICE: Gas Safety and Landlord CP12 Certificates
SCOPE: Landlord gas safety check (CP12), annual gas safety record, gas appliance safety, flue safety, tenant or landlord responsibility routing.

LEGAL CONTEXT:
- Gas Safety (Installation and Use) Regulations 1998
- ALL gas work must be done by a Gas Safe registered engineer
- Landlords MUST have annual gas safety check done by Gas Safe engineer
- Records must be kept for 2 years
- Existing tenants must receive a copy within 28 days
- New tenants must receive a copy before move-in
- Responsibilities cannot be transferred to the tenant

CP12 PRICING: From £65 | Boiler Service + CP12 bundle: From £110

WHAT BOT SHOULD DO:
- Confirm whether the enquirer is a landlord, letting agent, or tenant
- If landlord or agent: proceed to book the CP12 check — collect property address and preferred slot
- If tenant reporting a fault: advise them to contact their landlord or managing agent first

TRIAGE QUESTIONS:
- Is this for a landlord, letting agent, or tenant?
- Is the property occupied?
- Is this for an annual gas safety check or a fault?
- What is the address and preferred slot?

WHAT BOT MUST NOT DO:
- Give legal advice beyond the core official duties
- Suggest tenants can take over the landlord's legal responsibility
- Suggest any non-Gas Safe person can do gas work`,
  },

  // ── BATHROOM / KITCHEN INSTALLATION ──────────────────────────────────────
  {
    section: '7.12',
    title: 'Bathroom and Kitchen Plumbing Installations',
    content: `SERVICE: Bathroom and Kitchen Plumbing Installations
SCOPE: New bathroom plumbing, bathroom refit, kitchen sink and tap plumbing, appliance water connection, waste relocation, pipe reroutes, sanitaryware installation, bath replacement, shower installation plumbing.

NOTIFICATION REQUIREMENTS (WaterSafe):
Certain planned work must be notified to the water supplier before starting:
- A bath over 230 litres capacity
- A bidet with upward spray or flexible hose
- Pumps or boosters over 12 litres per minute
- Some garden irrigation systems
- Large pools or ponds

TRIAGE QUESTIONS:
- Is this a repair or a new installation?
- What exactly are you changing?
- Is it a bathroom, kitchen, or utility area?
- Are you moving pipework or just replacing existing items in the same positions?
- Can you send photos of the current setup?

WHEN TO BOOK A SURVEY / VISIT:
- Any planned alteration — not just a like-for-like swap
- Bathroom refit
- Kitchen plumbing change
- Shower or bath replacement
- Major reroute
- Uncertain scope

BOT RESPONSE FOR INSTALLATION ENQUIRIES:
"That sounds like something we'd want to survey first to give you an accurate quote. Can you send a couple of photos and let me know your postcode? I can get that process started for you."`,
  },

  // ── OUTSIDE TAPS / EXTERNAL ───────────────────────────────────────────────
  {
    section: '7.13',
    title: 'Outside Taps, External Plumbing and Water Supply',
    content: `SERVICE: Outside Taps and External Plumbing
SCOPE: Outside tap repair or replacement, external pipe leak, supply pipe concern, outside stop tap routing, irrigation queries, external water-feed issues.

IMPORTANT: External supply pipes from the property boundary to the house are the owner's responsibility. From the main to the boundary is Anglian Water's responsibility.

WHAT RESIDENT CAN DO:
- Send a photo
- Describe whether the leak is at the tap or below ground
- Isolate water if safe and known via internal stop tap
- Avoid using the outside tap

WHAT RESIDENT MUST NOT DO:
- Dig blindly
- Assume underground leaks are simple DIY repairs
- Modify external water systems without proper advice

TRIAGE QUESTIONS:
- Is the leak at the tap itself or elsewhere?
- Is the problem above ground or below ground?
- Is it a simple replacement or a bigger issue?
- Can you send a photo?

WATER COMPANY: Anglian Water serves Peterborough. Phone: 03457 145 145
If it is the water company's responsibility: advise customer to contact Anglian Water directly.`,
  },

  // ── ELECTRICAL CROSSOVER ──────────────────────────────────────────────────
  {
    section: '7.14',
    title: 'Electrical Crossover and Controls',
    content: `SERVICE: Electrical Crossover and Controls
SCOPE: Boiler breaker tripping, controls not powering, programmer or display dead, heating-control issue that may be electrical, electric shower routing.

IMPORTANT RULES:
- If breaker trips once: customer can try resetting it once
- If breaker trips again immediately: do NOT advise further resets — electrical fault, needs engineer
- Electric showers are mains-voltage appliances — faults should be assessed by a qualified electrician
- Dead programmer or controls: within a heating engineer's scope if part of heating system wiring

WHAT RESIDENT CAN DO:
- Check whether the breaker is off
- Switch it on once
- Report whether it trips again
- Send a photo of controls

WHAT RESIDENT MUST NOT DO:
- Keep resetting a repeatedly tripping circuit
- Open electrical control panels
- Dismantle boiler electrics`,
  },

  // ── EMERGENCY PROTOCOLS ───────────────────────────────────────────────────
  {
    section: '10',
    title: 'Emergency Rules and Protocols',
    content: `EMERGENCY PROTOCOLS — FOLLOW EXACTLY

GAS SMELL / CO ALARM / UNSAFE BOILER:
"Please turn the boiler off, open windows, leave the property, and call the National Gas Emergency Service on 0800 111 999. Don't switch any lights or electrics on or off. Stay outside until they've checked it."
→ After giving this message, do not troubleshoot further.

WATER LEAKING NEAR ELECTRICS:
"Please stop using that area if you can safely do so. If you know where the stop tap is, turn the water off. Keep well clear of any electrics near the leak. Don't touch any wet switches or sockets."

UNVENTED HOT WATER DISCHARGE:
"Please switch the heater off and don't adjust any components. This needs urgent attention from a qualified engineer."

SEWAGE BACKFLOW / FOUL OVERFLOW:
"Please stop using the affected fixtures for now and avoid the area. This needs urgent attendance."

BURST PIPE / ACTIVE MAJOR LEAK:
"Please turn the water off at the stop tap if you can safely do so, and stop using the affected area. We'll treat this as urgent."

NO HEATING + VULNERABLE OCCUPANT IN COLD WEATHER:
"I understand — let me prioritise this. Can you send your name and postcode? I'll check our earliest available slot as an urgent booking."

HUMAN HANDOFF MESSAGE:
"I'm going to get one of the team to pick this up for you directly. They'll message you here shortly."

HUMAN HANDOFF TRIGGERS:
- Customer smells gas or CO alarm is sounding
- Severe flooding beyond basic advice
- Customer is angry, distressed, or making a complaint
- Vulnerable occupant with no heating in cold weather
- Legal complaint or liability issue raised
- Customer explicitly asks to speak to a person
- Situation is beyond classification`,
  },

  // ── PETERBOROUGH LOCAL KNOWLEDGE ─────────────────────────────────────────
  {
    section: '17',
    title: 'Peterborough Local Knowledge and Pricing',
    content: `COMPANY DETAILS:
- Name: Peterborough Plumbers
- Address: 3 Saville Road, Peterborough PE3 7PR
- Email: info@peterboroughplumbers.com
- Gas Safe Registered: Yes (Reg: 123456)
- Experience: 50+ years combined, 4.6-star Google rating (120+ reviews)

SERVICE AREA — POSTCODES COVERED:
- PE1: Peterborough city centre, Eastgate, New England, Millfield
- PE2: Orton Waterville, Orton Goldhay, Orton Southgate, The Ortons
- PE3: Bretton, Westwood, Ravensthorpe, Longthorpe, Walton
- PE4: Werrington, Glinton, Northborough, Peakirk, Newborough
- PE6: Market Deeping, Deeping St James, Crowland
- PE7: Hampton, Hampton Vale, Yaxley, Farcet, Whittlesey, Stanground
- PE9: Stamford and surrounding Lincolnshire villages

LOCAL CONTACTS:
- Water supply issues: Anglian Water — 03457 145 145
- Gas emergencies: National Gas Emergency Service — 0800 111 999 (24/7) — Cadent Gas operates the network

PRICING (only share if customer asks — never volunteer unprompted):
- Boiler Service: From £79
- Gas Safety Certificate (CP12): From £65
- Boiler Service + CP12 Bundle: From £110
- Landlord Portfolio: Tailored pricing
- Boiler Repair: Quote on assessment
- Central Heating: Quote on assessment
- Bathroom Installation: Quote on survey
- Plumbing Repairs: Quote on assessment
- Drain Blockages: Quote on assessment
- Damp and Leak Detection: Quote on assessment

PRICING RULES:
- Pricing agent NEVER volunteers — only shares when customer directly asks
- Never invent or estimate prices beyond the above published rates
- For anything showing "Quote on assessment" — say we provide free no-obligation quotes`,
  },

  // ── DIY BOUNDARIES ────────────────────────────────────────────────────────
  {
    section: '8',
    title: 'Resident DIY Boundaries — What Is Safe',
    content: `WHAT RESIDENT CAN SAFELY DO:
- Visible observation and basic identification
- Send a photo or video
- Turn off local isolation valve or main stop tap if they know where it is
- Stop using the faulty fitting
- Simple plunger for a locally blocked sink or basin
- Remove visible hair or debris from waste grilles
- Clean a tap aerator or shower head
- Basic thermostat or programmer setting checks
- Check boiler pressure gauge
- Repressurise boiler via filling loop ONLY if manufacturer's manual instructs and customer is confident — fill to 1–1.5 bar cold
- Bleed a radiator if comfortable and physically able
- Send a photo of an error code
- Gently thaw a frozen condensate pipe with warm (not boiling) water

WHAT RESIDENT MUST NEVER DO:
- Any gas work whatsoever
- Open the boiler casing
- Repair internal boiler components
- Make the final gas connection to the boiler
- Touch unvented cylinder safety components
- Attempt hidden leak repairs
- Major drainage work
- Electrical troubleshooting beyond a single breaker reset
- Drain and refill a heating system
- Open walls, ceilings, or floors
- Any task they are not confident doing

IF CUSTOMER CAN DO IT BUT DOESN'T WANT TO:
Never push. Always respect the decision.
"No problem, you don't need to do that."
"In that case we can just arrange a visit."
"That's absolutely fine — I'll get this booked in."`,
  },

  // ── SPECIALIST SYSTEMS ────────────────────────────────────────────────────
  {
    section: '7.15',
    title: 'Specialist Heating Systems — Heat Pumps, Solar Thermal',
    content: `SERVICE: Specialist and Other Heating Technologies
SCOPE: Heat pumps (air source, ground source), warm-air heating, solar thermal, biomass boilers, micro-CHP, specialist or unfamiliar systems.

BOT RULE: Do not apply standard boiler troubleshooting to specialist systems. These require specific training and equipment.

BOT RESPONSE:
"That sounds like a specialist heating system. I just want to make sure we route this correctly. Can you send a photo of the unit and controls? I'll check whether our engineers cover that system or point you in the right direction."

IF COMPANY DOES NOT SERVICE IT:
"We don't currently service that type of system, but I can help you find a specialist if you'd like."`,
  },
]
