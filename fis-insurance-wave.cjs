// FIS insurance-pain content cluster (16 pages). Run from FIS site root: node fis-insurance-wave.cjs
const fs = require('fs');
const path = require('path');
if (!fs.existsSync('pages')) { console.log('ERROR: run from FIS site root'); process.exit(1); }

const CALC = '/pages/florida-wind-mitigation-savings-calculator.html';
const HUB = '/pages/impact-windows-insurance-and-grants-florida.html';

// ---------- template discovery ----------
const files = fs.readdirSync('pages').filter(f => f.endsWith('.html'));
const tplFile = files.find(f => { const s = fs.readFileSync(path.join('pages', f), 'utf8'); return s.includes('<h1') && /<footer/i.test(s); });
if (!tplFile) { console.log('ERROR: no template page found'); process.exit(1); }
const TPL = fs.readFileSync(path.join('pages', tplFile), 'utf8');
const h1End = TPL.indexOf('</h1>') + 5;
const footIdx = TPL.lastIndexOf('<footer');
if (footIdx < h1End) { console.log('ERROR: footer marker missing'); process.exit(1); }
const TOP0 = TPL.slice(0, h1End);
const TAIL = TPL.slice(footIdx);

const CTA = '<div style="margin:34px 0;padding:20px 22px;border-left:4px solid #c8102e;background:rgba(200,16,46,.06);border-radius:0 8px 8px 0"><p style="margin:0 0 10px;font-weight:800;font-size:17px">See what your report is costing you</p><p style="margin:0">Our free <a href="' + CALC + '"><strong>Wind Mitigation Savings Calculator</strong></a> estimates your unclaimed credits in about a minute &mdash; no account required.</p></div>';

const P = [

['why-did-my-florida-home-insurance-go-up',
'Why Did My Florida Home Insurance Go Up? The Real Reasons Explained',
'Why Did My Florida Home Insurance Go Up in 2026? The Real Reasons | Florida Impact Shield',
'Your Florida premium jumped again and nothing changed about your house. Here is what actually drives Florida rate increases, and the levers you personally control.',
'Opening your renewal notice in Florida has become an annual exercise in disbelief. Nothing about your house changed, you filed no claims, and the number went up anyway. The reasons are structural, and understanding them matters &mdash; because a few of the factors driving your bill are outside your control, and a few are entirely within it.',
[['The forces pushing Florida rates up', [
'Florida sits in the most hurricane-exposed insurance market in the country, and carriers price accordingly. When a major storm makes landfall anywhere in the state, losses ripple across every policyholder, not just those in the damage path.',
'Reinsurance is the piece most homeowners never hear about. Your insurer buys its own insurance from global reinsurers, and when those costs rise &mdash; driven by worldwide catastrophe losses, not just Florida ones &mdash; the increase flows straight through to your premium. Reinsurance has been one of the single largest cost drivers in the Florida market.',
'Litigation costs have historically been a major factor as well. Florida generated a disproportionate share of the nation\u2019s property insurance lawsuits relative to its share of claims, and reform efforts in recent years targeted exactly that imbalance. Whether those reforms translate into consumer savings has been the central question in the market.',
'Then simple economics: rebuilding costs more than it used to. Materials, labor and the cost to make you whole after a loss have all climbed, and insurers price the replacement cost of your home, not what you paid for it.']],
['Why your specific policy went up', [
'Beyond market-wide pressure, individual factors matter: the age of your roof (many carriers now impose age limits or require inspections), your home\u2019s construction era, your county, your claims history, your credit-based insurance score in states where it applies, and whether your carrier is re-underwriting its book to shed risk.',
'One factor catches homeowners repeatedly: an expired wind mitigation inspection. Reports are generally valid for five years, and when yours lapses without renewal, credits you were receiving can quietly disappear from your policy at the next renewal.']],
['What you actually control', [
'You cannot fix reinsurance markets or Florida\u2019s exposure. You can control what your home documents to the carrier, and that is where real money lives.',
'The wind mitigation credits are the largest homeowner-controlled lever on a Florida policy, and opening protection is typically the biggest single credit within them. Impact-rated windows and doors on every opening move you from the least-credited category to the most-credited one.',
'The other controllable levers: raising your deductible if you have the reserves to absorb it, bundling policies, verifying your dwelling coverage is not inflated beyond actual replacement cost, refreshing an expired wind mitigation inspection, and shopping the market rather than auto-renewing &mdash; carriers price the same home very differently.']]],
[['Why is Florida home insurance so expensive?','Hurricane exposure, reinsurance costs, historically high litigation volume, and rising rebuilding costs combine to make Florida the most expensive property insurance market in the country. Most of these are market-wide forces rather than anything about your individual home.'],
['My premium went up but I had no claims. Why?','Rate increases are usually driven by market-wide costs, not your personal claims history. Carrier re-underwriting, roof age thresholds, and expired wind mitigation reports also commonly cause increases on claim-free policies.'],
['What is the single biggest discount available on a Florida policy?','Wind mitigation credits, and within them opening protection is typically the largest. It requires impact-rated protection on every opening, verified by a certified inspection.'],
['Can I do anything to lower my premium this year?','Yes: refresh an expired wind mitigation inspection, verify your dwelling coverage matches actual replacement cost, consider a higher deductible, shop multiple carriers, and pursue opening protection for the largest structural credit.']]
],

['how-to-lower-florida-home-insurance',
'How to Lower Your Florida Home Insurance: The Complete 2026 Playbook',
'How to Lower Florida Home Insurance in 2026: 11 Proven Ways | Florida Impact Shield',
'Eleven concrete ways Florida homeowners lower their premium, ranked by impact: wind mitigation credits, deductible strategy, coverage audits, shopping, and what genuinely moves the number.',
'Most advice about lowering home insurance was written for states where a hurricane is a rumor. In Florida the math is different, the credits are different, and the biggest lever is one most homeowners never claim. Here is the playbook ranked by what actually moves your premium.',
[['The heavy hitters', [
'<strong>1. Claim every wind mitigation credit.</strong> Florida law requires insurers to discount premiums for construction features that reduce wind damage. A certified inspector documents them on a standard form, and your carrier applies credits for what is verified. If your inspection is expired or was never done, you may be paying for credits you already qualify for.',
'<strong>2. Add opening protection.</strong> This is typically the largest single wind mitigation credit available. It requires impact-rated windows and doors on every opening &mdash; partial coverage usually earns nothing, because one unprotected opening is all a storm needs. This is the only major credit you can earn without touching your roof.',
'<strong>3. Address roof age and attachment.</strong> Roof covering, deck attachment, roof-to-wall attachment and roof geometry all carry credits, and many carriers now decline or surcharge older roofs outright. If your roof is nearing replacement, timing it to capture the credits is worth planning.']],
['The moderate levers', [
'<strong>4. Raise your deductible</strong> if you hold the reserves to absorb it &mdash; and understand Florida hurricane deductibles are percentage-based, so a 2 percent deductible on a $400,000 home is $8,000 out of pocket before coverage responds.',
'<strong>5. Audit your dwelling coverage.</strong> Coverage should reflect the cost to rebuild, not market value or purchase price. Homeowners are frequently over-insured relative to actual replacement cost.',
'<strong>6. Shop the market annually.</strong> Carriers price identical homes very differently, and loyalty is not rewarded in this market. An independent agent can quote multiple carriers at once.',
'<strong>7. Bundle auto and home</strong> where the combined price actually beats separate best-in-class policies &mdash; check the math rather than assuming.']],
['The smaller adjustments', [
'<strong>8. Security and safety systems</strong> &mdash; monitored alarms, water leak detection and similar devices carry modest credits with many carriers.',
'<strong>9. Pay annually</strong> rather than monthly where installment fees apply.',
'<strong>10. Improve your insurance score</strong> where it is used, since it factors into pricing in many cases.',
'<strong>11. Ask directly what discounts exist.</strong> Carriers do not volunteer every available credit, and agents apply what they are told about. Senior discounts, new-buyer credits and claims-free credits often go unclaimed.']],
['Putting them in order', [
'If you do one thing, get a current wind mitigation inspection &mdash; it costs relatively little and can reveal credits you already qualify for. If you do two, price opening protection for your home, because it is the largest credit and it compounds with energy savings, noise reduction and storm safety.',
'The rest are worth doing, but they trim. The wind mitigation credits restructure what you pay for the life of the home.']]],
[['What is the fastest way to lower my Florida home insurance?','Getting a current wind mitigation inspection and confirming every earned credit is applied is usually the fastest, since it can reveal discounts you already qualify for without any construction.'],
['Do impact windows really lower insurance in Florida?','Opening protection is typically the largest wind mitigation credit available on a Florida policy. Actual savings vary by carrier, county and home, but it is the most significant homeowner-controlled discount.'],
['Is it worth raising my hurricane deductible?','Only if you can comfortably absorb the out-of-pocket amount. Florida hurricane deductibles are percentage-based, so a 2 percent deductible on a $400,000 home means $8,000 before coverage applies.'],
['Should I shop for insurance every year in Florida?','Yes. Carriers reprice frequently and differently, and renewal loyalty is not rewarded. An independent agent quoting multiple carriers annually is standard practice for Florida homeowners.']]
],

['wind-mitigation-inspection-what-to-expect',
'Wind Mitigation Inspection: What to Expect, What It Costs, What It Saves',
'Florida Wind Mitigation Inspection 2026: Cost, Process & Savings | Florida Impact Shield',
'What happens during a Florida wind mitigation inspection, what the inspector checks, what it costs, how long it stays valid, and how much it can save on your premium.',
'A wind mitigation inspection is the cheapest thing a Florida homeowner can do that might meaningfully lower their premium. It takes under an hour, costs a fraction of what it typically saves, and produces the single document that determines your largest available discounts. Here is exactly how it works.',
[['What the inspector actually checks', [
'The inspection documents seven categories on Florida\u2019s standard form: building code compliance era, roof covering and its permit dates, roof deck attachment (nail size and spacing), roof-to-wall attachment (toe nails, clips, single wraps or double wraps), roof geometry (hip roofs earn more credit than gable), secondary water resistance, and opening protection.',
'The inspector will need attic access to photograph the deck attachment and roof-to-wall connections, and will photograph every window and door to document protection. Nothing is destructive &mdash; they photograph and measure what exists.']],
['Cost, timing and validity', [
'Wind mitigation inspections in Florida commonly run in the low hundreds of dollars, and many independent agents can point you to inspectors or occasionally arrange them at reduced cost. The inspection typically takes 30 to 60 minutes for a standard home.',
'Reports are generally valid for five years. This matters more than most homeowners realize: when a report lapses, credits tied to it can quietly disappear at the next renewal. If your last inspection was over five years ago and your premium rose, an expired report may be part of the reason.']],
['Reading the result &mdash; and what to do about it', [
'The line that matters most for most homeowners is opening protection. If it reads None, the largest credit on the form is unclaimed, and it is the one category you can change without roof work.',
'Roof-to-wall reading Toe Nail is the weakest category and common in older homes. Roof deck attachment is graded A through D, with D strongest. Secondary water resistance is a yes or no.',
'If you make improvements after your inspection &mdash; adding impact windows, for example &mdash; you need a new inspection to claim the improved credits. Carriers do not apply them automatically, and many will apply the credit from the date the new report is received.']]],
[['How much does a wind mitigation inspection cost in Florida?','Typically in the low hundreds of dollars. Many homeowners recover the cost through the first year of credits, and some agents can arrange inspections at reduced cost.'],
['How long does a wind mitigation report last?','Generally five years in Florida. When a report expires without renewal, associated credits can drop off at your next renewal, causing an unexplained premium increase.'],
['Do I need a new inspection after installing impact windows?','Yes. Credits are not applied automatically. A new certified inspection documenting the protection must be submitted to your carrier, which is how the opening protection credit gets claimed.'],
['What if my inspection shows no credits at all?','Then you have a clear roadmap. Opening protection is usually the largest credit available and the only major one achievable without roof work, which is why most homeowners start there.']]
],

['how-to-read-your-wind-mitigation-report',
'How to Read Your Wind Mitigation Report: Every Line Decoded',
'How to Read a Florida Wind Mitigation Report: Line-by-Line Guide | Florida Impact Shield',
'Your wind mit report is full of codes nobody explains. Here is every line decoded in plain English, and which ones are costing you the most money.',
'You paid for a wind mitigation inspection, received a form covered in categories and letter grades, and understood almost none of it. That form determines the largest discounts on your Florida policy. Here is what each line means and which ones matter most.',
[['The seven categories', [
'<strong>Building Code:</strong> whether your home was built to the strengthened Florida codes. Homes permitted after the 2002 Florida Building Code generally start with better baseline credits.',
'<strong>Roof Covering:</strong> whether your roof meets current code requirements, verified by permit dates or product approval. Non-compliant coverings limit other credits.',
'<strong>Roof Deck Attachment:</strong> graded A through D based on nail size and spacing. A is the weakest (older staples or widely spaced short nails); D is the strongest.',
'<strong>Roof to Wall Attachment:</strong> toe nails (weakest), clips, single wraps, or double wraps (strongest). This describes how your roof structure connects to the walls.']],
['The categories that move the most money', [
'<strong>Roof Geometry:</strong> hip roofs (sloping on all sides) earn better credit than gable roofs, because they shed wind more effectively. You cannot change this without a rebuild.',
'<strong>Secondary Water Resistance (SWR):</strong> a sealed barrier under the roof covering. Yes or no.',
'<strong>Opening Protection:</strong> the category most homeowners are missing and typically the largest single credit on the form. Rated by whether all openings carry impact-rated protection, and at what standard.']],
['What to do with what you find', [
'Read your opening protection line first. If it says None or N, the biggest available credit is unclaimed, and it is the only major category you can change without roof work.',
'If roof-to-wall shows toe nails and you are planning roof work anyway, ask the contractor about retrofitting straps or clips while the structure is exposed &mdash; the incremental cost during an existing project is far lower than as a standalone job.',
'And check the report date. Over five years old means expired, which means credits may already have dropped off your policy.']]],
[['What does "Opening Protection: None" mean on my report?','It means no verified impact-rated protection on your windows and doors, so the largest wind mitigation credit is unclaimed. It is also the only major category you can change without roof work.'],
['What is the difference between clips and wraps on a wind mit report?','They describe how your roof connects to your walls. Toe nails are weakest, clips are better, and single or double wraps are strongest &mdash; with credits improving accordingly.'],
['Does roof shape really affect my insurance?','Yes. Hip roofs, which slope on all sides, shed wind more effectively than gable roofs and earn better credit. It is not something you can change short of a structural rebuild.'],
['My report is six years old. Is it still good?','No. Wind mitigation reports are generally valid for five years, and expired reports can cause credits to silently drop off at renewal. A fresh inspection may restore them.']]
],

['citizens-insurance-non-renewal-what-to-do',
'Citizens Non-Renewal or Depopulation: What to Do Next',
'Citizens Insurance Non-Renewal in Florida: Your Options Explained | Florida Impact Shield',
'Got a non-renewal or depopulation notice from Citizens? What it means, your options, deadlines that matter, and how to make your home more attractive to carriers.',
'A notice from Citizens &mdash; whether non-renewal, a depopulation takeout offer, or an eligibility change &mdash; sets a clock running. Understanding what the notice actually says and what your options are, before the deadline, is the difference between a smooth transition and a coverage gap.',
[['What the notice means', [
'Citizens was created as Florida\u2019s insurer of last resort, and state policy has consistently aimed to move policyholders into the private market when private coverage is available. Depopulation is that mechanism: private carriers offer to take over policies, and policyholders receive notices with a decision window.',
'A takeout offer is not automatically bad. Private carriers sometimes offer comparable or better coverage, and Citizens policies carry their own limitations. But the offers vary widely, and the deadline to respond is real.',
'A true non-renewal is different and usually tied to eligibility rules or the condition of the home &mdash; commonly roof age or condition, or failure to complete required inspections.']],
['Your options and the clock', [
'Read the notice for the response deadline first, then compare the takeout offer against Citizens coverage line by line: premium, deductibles (especially hurricane), coverage limits, exclusions, and the carrier\u2019s financial strength rating.',
'Work with an independent agent who can quote multiple carriers rather than accepting or declining in isolation. The takeout offer is one option, not the only one.',
'Do not let coverage lapse. If you carry a mortgage, a lapse triggers force-placed insurance from your lender, which is typically far more expensive and covers less.']],
['Making your home attractive to carriers', [
'The homes that get offers, and get better pricing, are the ones documenting reduced risk. Roof age and condition dominate underwriting decisions in Florida right now, and opening protection is the largest wind mitigation credit &mdash; a home with impact-rated windows and doors on every opening reads very differently to an underwriter than one without.',
'A current wind mitigation inspection is essential here. Without it, carriers price you on assumptions rather than verified features, and assumptions are never in your favor.']]],
[['What happens if I ignore a Citizens depopulation notice?','You risk being moved automatically or losing eligibility depending on the notice type. Read the deadline, compare the offer against your current coverage, and respond before the date rather than defaulting.'],
['Is a private takeout offer better than staying with Citizens?','It depends entirely on the offer. Compare premium, hurricane deductible, coverage limits, exclusions and the carrier\u2019s financial rating. Some takeouts are better; some are worse. An independent agent can quote alternatives.'],
['Why did Citizens non-renew my policy?','Common causes include eligibility rule changes, roof age or condition, and required inspections not completed. The notice should state the reason, and roof-related underwriting is the most frequent driver in Florida.'],
['How do I make my home easier to insure in Florida?','Document reduced risk: a current wind mitigation inspection, a roof in good condition and within age limits, and opening protection on every window and door &mdash; the largest wind mitigation credit available.']]
],

['what-lowers-florida-home-insurance-premiums-ranked',
'What Actually Lowers a Florida Home Insurance Premium, Ranked',
'What Lowers Florida Home Insurance? Every Factor Ranked by Impact | Florida Impact Shield',
'Every factor that lowers a Florida homeowners premium, honestly ranked from structural changes worth thousands to small credits worth a little.',
'Advice about lowering home insurance tends to arrive as an undifferentiated list where installing a smart doorbell sits beside replacing your roof. In Florida the gap between the top and bottom of that list is enormous. Here is the honest ranking.',
[['Tier one: structural, worth the most', [
'<strong>Opening protection on every window and door.</strong> Typically the largest single wind mitigation credit available on a Florida policy. It is all-or-nothing on most policies &mdash; every opening must carry rated protection &mdash; and it is the only tier-one item achievable without roof work.',
'<strong>Roof covering, age and code compliance.</strong> Roof condition drives underwriting decisions in Florida more than any other single feature, and a roof outside carrier age limits can mean non-renewal rather than merely higher pricing.',
'<strong>Roof-to-wall attachment.</strong> Moving from toe nails to clips or wraps improves a significant credit, most economically done during roof replacement when the structure is already exposed.']],
['Tier two: meaningful adjustments', [
'<strong>A current wind mitigation inspection.</strong> Not a change to your home at all, just documentation &mdash; and it frequently reveals credits you already qualify for. Highest return per dollar on this entire list.',
'<strong>Shopping carriers annually.</strong> Identical homes get materially different quotes across carriers. Loyalty earns nothing in this market.',
'<strong>Deductible strategy.</strong> Raising your deductible lowers premium immediately, but Florida hurricane deductibles are percentage-based &mdash; know the dollar figure before choosing.',
'<strong>Coverage audit.</strong> Dwelling coverage should equal rebuild cost, not market value. Over-insurance is common and expensive.']],
['Tier three: real but small', [
'Monitored alarm systems, water leak detection devices, bundling policies, annual payment instead of installments, claims-free and new-purchase credits, and insurance score improvements. All legitimate, none transformative.',
'The honest summary: tier one changes what your home fundamentally is to an underwriter. Tier two makes sure you are being priced accurately. Tier three trims the edges. Most homeowners spend their attention on tier three and never touch tier one.']]],
[['What is the biggest home insurance discount in Florida?','Wind mitigation credits, and within them opening protection is typically the largest single credit. It requires impact-rated protection on every opening verified by a certified inspection.'],
['Does a security system lower Florida home insurance much?','It usually earns a modest credit. Legitimate, but small compared to wind mitigation credits, which address the risk Florida carriers actually price for.'],
['Is bundling home and auto worth it in Florida?','Sometimes. Compare the bundled total against the best separate policies rather than assuming &mdash; the bundle discount does not always beat shopping each line individually.'],
['What should I do first to lower my premium?','Get a current wind mitigation inspection. It costs relatively little, may reveal credits you already qualify for, and tells you exactly which structural improvements would pay.']]
],

['opening-protection-explained-florida',
'Opening Protection Explained: The Biggest Credit on Your Florida Policy',
'Opening Protection in Florida: What It Means & What It Saves | Florida Impact Shield',
'What opening protection means on a Florida wind mitigation report, why it is the largest credit available, why partial coverage usually earns nothing, and what qualifies.',
'Of the seven categories on a Florida wind mitigation report, one consistently carries the most weight and is most commonly unclaimed: opening protection. Understanding why insurers price it so heavily explains both the physics of hurricane damage and the size of the discount.',
[['Why insurers care so much about openings', [
'A sealed building envelope handles wind. A breached one does not. When a window or door fails in a hurricane, wind enters and pressurizes the interior, pushing outward on the roof and walls at the same moment external wind pulls on them. That combination is what removes roofs.',
'This is why a single unprotected opening compromises the whole structure, and why insurers treat opening protection as close to binary. The credit reflects a genuine step-change in how your house behaves in a storm, not a marginal improvement.']],
['What actually qualifies', [
'Protection must be rated to the appropriate impact standard and must cover every opening: windows, exterior doors, sliding glass doors, skylights, and garage doors. Garage doors are the most commonly overlooked, and a failed garage door is a documented pathway to catastrophic pressurization.',
'Both approaches qualify: impact-rated windows and doors, or code-approved shutters and panels covering everything. Impact glazing is permanent and requires no action when a storm approaches; shutters cost less upfront but must be deployed every time.',
'What does not qualify: plywood, non-rated screens, decorative shutters, and partial coverage that leaves any opening unprotected.']],
['The all-or-nothing problem', [
'Most carriers require every opening rated before the opening protection credit applies. This surprises homeowners who protect the front of the house or the largest windows and expect proportional savings &mdash; the discount is generally not prorated.',
'The practical implication for planning: an itemized quote covering every opening is worth more than a cheaper partial project, because the partial project may earn no credit at all while costing most of the money. When comparing bids, confirm every opening is included and every product carries documented ratings, since the inspector will need that documentation to certify the credit.']]],
[['What counts as opening protection in Florida?','Impact-rated windows and doors, or code-approved shutters and panels, covering every opening including windows, exterior doors, sliders, skylights and garage doors. Plywood and decorative shutters do not qualify.'],
['Do I get partial credit for protecting some windows?','Usually not. Most carriers require all openings rated before the credit applies, which is why partial projects often earn nothing despite substantial cost.'],
['Are shutters as good as impact windows for the discount?','For credit purposes, code-approved shutters covering every opening can qualify. The practical difference is deployment &mdash; impact glazing is always in place, shutters must be installed before every storm.'],
['Does my garage door need protection too?','Yes, and it is the most commonly missed opening. A failed garage door is a major pathway to interior pressurization, and carriers treat it as part of the envelope.']]
],

['florida-hurricane-deductible-explained',
'Your Florida Hurricane Deductible: What It Really Costs You',
'Florida Hurricane Deductible Explained: Percentages, Triggers & Costs | Florida Impact Shield',
'Florida hurricane deductibles are percentage-based, not flat. What that means in real dollars, when they trigger, how they differ from your standard deductible, and how to choose.',
'Most Florida homeowners can recite their standard deductible and have no idea what their hurricane deductible actually costs in dollars. The difference matters enormously, because hurricane deductibles are calculated as a percentage of your dwelling coverage rather than a flat amount.',
[['How the percentage works', [
'A hurricane deductible is typically expressed as a percentage of Coverage A, your dwelling limit &mdash; commonly 2 percent, 5 percent or 10 percent. On a home insured for $400,000, a 2 percent hurricane deductible is $8,000 out of pocket before your policy responds. At 5 percent it is $20,000.',
'That is per hurricane event, and it applies separately from your standard all-other-perils deductible, which might be a flat $1,000 or $2,500 and covers non-hurricane claims.']],
['When it triggers', [
'Hurricane deductibles apply to damage from a storm the National Hurricane Center has declared a hurricane, generally covering a window that begins when hurricane warnings are issued and extends for a defined period after the storm ends. Damage outside that window falls under your standard deductible.',
'This is why documentation and timing matter after a storm, and why claims filed for damage near the boundary of that window sometimes involve disputes about which deductible applies.']],
['Choosing your percentage', [
'A higher hurricane deductible lowers your premium immediately, which makes it tempting when rates rise. The honest test: could you write that check tomorrow without borrowing? If not, the savings are borrowed against a bill you cannot pay.',
'Two things reduce the sting. First, opening protection and other wind mitigation credits lower the premium without raising your exposure, which is the better trade when available. Second, hardened homes suffer smaller losses in the first place, meaning fewer claims where the deductible bites at all.',
'Run the numbers on your own dwelling limit before your next renewal so the figure is not a surprise during a storm.']]],
[['How much is a 2 percent hurricane deductible in Florida?','Two percent of your dwelling coverage. On a home insured for $400,000, that is $8,000 out of pocket before coverage applies to hurricane damage.'],
['Is the hurricane deductible separate from my regular deductible?','Yes. The hurricane deductible applies to declared hurricane events; your standard all-other-perils deductible applies to everything else and is usually a flat dollar amount.'],
['Does the hurricane deductible apply to every storm?','It applies to storms declared hurricanes by the National Hurricane Center, within a defined window around the event. Tropical storm or unrelated wind damage typically falls under the standard deductible.'],
['Should I raise my hurricane deductible to save money?','Only if you could pay the full amount immediately without borrowing. Wind mitigation credits lower premium without increasing your out-of-pocket exposure, which is generally the better first move.']]
],

['florida-home-insurance-older-homes',
'Insuring an Older Florida Home: Why It Is Hard and What Helps',
'Florida Home Insurance for Older Homes: Coverage Options & Fixes | Florida Impact Shield',
'Older Florida homes face non-renewals, surcharges and coverage refusals. Why underwriters treat pre-code homes differently and the upgrades that change the conversation.',
'If your Florida home was built before the 2002 Florida Building Code &mdash; and especially before 1994 &mdash; you have probably noticed that insurance is harder to get, more expensive to keep, and more likely to be non-renewed. That is not bad luck. It is underwriting.',
[['Why age drives underwriting', [
'Florida strengthened its building codes substantially after Hurricane Andrew, and again with the statewide code that took effect in the early 2000s. Homes built to those later standards perform measurably better in storms, and insurers price that difference.',
'Older homes typically carry original non-impact glazing, weaker roof-to-wall connections, roof deck attachment in the lower grades, and roof coverings that may not meet current requirements. Each shows up as a missing credit, and together they define a risk profile carriers increasingly decline.',
'Add plumbing, wiring and roof age &mdash; the four-point inspection categories &mdash; and older homes accumulate reasons for a carrier to say no.']],
['What actually changes the conversation', [
'Roof first, because roof age and condition are the dominant underwriting factors in Florida right now. Many carriers impose hard age limits regardless of condition.',
'Then opening protection, because it is the largest wind mitigation credit and it moves your home from the weakest category to the strongest one on the form. For an older home, this is the single most effective way to look materially different to an underwriter without a full renovation.',
'Then the four-point items where relevant: electrical panels, plumbing supply lines and water heater age. These are pass-fail issues for many carriers rather than pricing adjustments.']],
['Practical strategy', [
'Get a current wind mitigation inspection and a four-point inspection so you know exactly what an underwriter sees. Guessing is expensive.',
'Work with an independent agent who knows which carriers actively write older homes, since appetite varies enormously and one carrier\u2019s decline is another\u2019s ordinary policy.',
'Sequence improvements by underwriting weight rather than by cost: roof, openings, then four-point items. And document everything with permits and product approvals, because undocumented improvements earn nothing.']]],
[['Why do insurers refuse older Florida homes?','Pre-code construction performs worse in storms &mdash; non-impact glazing, weaker roof connections, older roof coverings &mdash; and roof, electrical and plumbing age compound the risk. Many carriers decline rather than price it.'],
['What upgrade helps an older Florida home most?','Roof condition first, then opening protection. Opening protection is the largest wind mitigation credit and the most effective way to change how an underwriter sees a pre-code home short of major renovation.'],
['What is a four-point inspection?','An assessment of roof, electrical, plumbing and HVAC systems, commonly required for older homes. Unlike wind mitigation, it is often pass-fail for carrier eligibility rather than a pricing adjustment.'],
['Can I get insurance on a 1970s Florida home?','Usually yes, but carrier appetite varies widely. An independent agent who knows which carriers write older homes, plus documented wind mitigation improvements, makes the difference.']]
],

['florida-insurance-savings-impact-windows-worth-it',
'Are Impact Windows Worth It Just for the Insurance Savings?',
'Are Impact Windows Worth It for Insurance Savings in Florida? Honest Math | Florida Impact Shield',
'An honest look at whether impact windows pay for themselves on insurance alone, what the payback period really looks like, and the benefits that change the math.',
'Impact windows are frequently sold on insurance savings alone, and the honest answer is more nuanced than either the sales pitch or the skeptics suggest. Here is the real math, including the parts that rarely appear in a quote.',
[['The insurance side, honestly', [
'Opening protection is typically the largest wind mitigation credit available on a Florida policy, and homeowners in high-wind counties with high premiums see the largest dollar reductions. But savings scale with your premium: someone paying $9,000 a year in a coastal county sees a very different number than someone paying $1,800 inland.',
'On insurance alone, payback periods commonly run years rather than months. If your premium is modest and your home already has partial protection, insurance savings by themselves may not justify the project. That is the honest version, and any contractor promising otherwise is selling rather than advising.']],
['What changes the math', [
'<strong>Grants.</strong> Florida has operated matching-grant programs for wind mitigation improvements, which can substantially reduce out-of-pocket cost when funding is available. Program status and funding rounds change, so verify current availability before planning around it.',
'<strong>Energy costs.</strong> Impact windows are typically insulated units replacing single-pane glass in older homes, and Florida cooling loads are significant year-round.',
'<strong>Insurability itself.</strong> In a market where carriers decline homes outright, the ability to obtain coverage at all has value that no payback calculation captures.',
'<strong>Resale.</strong> Impact protection is a documented feature Florida buyers actively look for, and it transfers with the home.']],
['The honest verdict', [
'If you are deciding on insurance savings alone, run your actual numbers rather than a generic percentage &mdash; that is exactly what our calculator is for. High premium, high-wind county, and no current protection is the profile where insurance alone can justify the project.',
'For most homeowners the accurate framing is that insurance savings substantially offset a project justified by several things at once: storm safety, insurability, comfort, noise, energy and resale. Windows that never need boarding before a storm have value that does not appear on any spreadsheet.']]],
[['Do impact windows pay for themselves in insurance savings?','Sometimes, over a period of years, and most often for homeowners with high premiums in high-wind counties. For many homes, insurance savings substantially offset rather than fully cover the cost.'],
['How long is the payback period on impact windows in Florida?','It varies with your premium and project cost, commonly running several years on insurance savings alone. Grants, energy savings and resale value shorten the effective payback considerably.'],
['Is it cheaper to use shutters for the insurance discount?','Shutters generally cost less upfront and can earn the same credit when they cover every opening to code. The tradeoff is deployment before every storm and no energy or noise benefits.'],
['What if I only replace some windows?','Most carriers require every opening protected before the credit applies, so partial projects often earn no insurance credit while still costing substantially. Plan for full coverage if the credit matters.']]
],
];

// ---------- build ----------
let made = 0, skipped = 0;
const slugs = P.map(p => p[0]);

function related(slug) {
  const others = slugs.filter(s => s !== slug).sort(() => 0.5 - Math.random()).slice(0, 4);
  const titles = {};
  P.forEach(p => titles[p[0]] = p[1]);
  return '<h2 style="font-size:22px;margin:38px 0 12px">Related insurance guides</h2><ul style="margin:0 0 4px 20px">' +
    others.map(s => '<li style="margin-bottom:8px"><a href="/pages/' + s + '.html">' + titles[s] + '</a></li>').join('') +
    '</ul><p style="margin:14px 0 0"><a href="' + HUB + '">See all insurance and grant guides &rarr;</a></p>';
}

for (const [slug, h1, metaTitle, metaDesc, intro, sections, faq] of P) {
  const file = path.join('pages', slug + '.html');
  if (fs.existsSync(file)) { console.log('exists, skipping: ' + slug); skipped++; continue; }
  const url = 'https://www.floridaimpactshield.com/pages/' + slug + '.html';
  let top = TOP0;
  top = top.replace(/<title>[\s\S]*?<\/title>/, '<title>' + metaTitle + '</title>');
  top = top.replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="' + metaDesc + '">');
  top = top.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="' + url + '">');
  top = top.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="' + url + '">');
  top = top.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, '<meta property="og:title" content="' + metaTitle + '">');
  top = top.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, '<meta property="og:description" content="' + metaDesc + '">');
  top = top.replace(/(<h1[^>]*>)[\s\S]*$/, '$1' + h1);

  let body = '</h1>\n<main style="max-width:820px;margin:0 auto;padding:12px 20px 52px;line-height:1.75">\n';
  body += '<p style="font-size:17px;margin:0 0 20px">' + intro + '</p>\n';
  sections.forEach((sec, i) => {
    body += '<h2 style="font-size:24px;margin:34px 0 12px">' + sec[0] + '</h2>\n';
    sec[1].forEach(p => { body += '<p style="margin:0 0 15px">' + p + '</p>\n'; });
    if (i === 0) body += CTA;
  });
  body += '<h2 style="font-size:24px;margin:34px 0 12px">Frequently asked questions</h2>\n<div itemscope itemtype="https://schema.org/FAQPage">\n';
  faq.forEach(([q, a]) => {
    body += '<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question" style="margin-bottom:16px"><p itemprop="name" style="font-weight:700;margin:0 0 4px">' + q + '</p><div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"><p itemprop="text" style="margin:0">' + a + '</p></div></div>\n';
  });
  body += '</div>\n';
  body += CTA;
  body += related(slug);
  body += '\n</main>\n';

  fs.writeFileSync(file, top + body + TAIL, 'utf8');
  console.log('created: /pages/' + slug + '.html');
  made++;
}

// sitemap
if (fs.existsSync('sitemap.xml')) {
  let sm = fs.readFileSync('sitemap.xml', 'utf8');
  let add = 0;
  for (const s of slugs) {
    const loc = 'https://www.floridaimpactshield.com/pages/' + s + '.html';
    if (sm.indexOf(loc) !== -1) continue;
    sm = sm.replace('</urlset>', '<url><loc>' + loc + '</loc><lastmod>2026-07-21</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>');
    add++;
  }
  fs.writeFileSync('sitemap.xml', sm, 'utf8');
  console.log('sitemap: +' + add + ' URLs');
}

console.log('DONE (' + made + ' created, ' + skipped + ' skipped). Next: node fis-links.cjs --go  then  npx vercel --prod');
