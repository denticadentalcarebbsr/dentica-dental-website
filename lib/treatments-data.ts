export interface Treatment {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  image: string | null;
  doctor: string | null;
  doctorSlug: "sambarta" | "anand" | null;
  whatItInvolves: string[];
  whoItsFor: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  jsonLdName: string;
}

export const tier1Treatments: Treatment[] = [
  {
    slug: "esthetic-restoration",
    name: "Esthetic Restoration",
    shortName: "Esthetic Restoration",
    tagline: "Restore beauty and function with natural-looking dental work",
    description:
      "Esthetic restoration combines art and dentistry to repair, reshape, and enhance teeth while perfectly matching your natural smile. From tooth-coloured fillings to ceramic inlays, every restoration is crafted to be virtually invisible.",
    icon: "✦",
    image: "/images/treatments/Better-Esthetic-Restoration.png",
    doctor: null,
    doctorSlug: null,
    whatItInvolves: [
      "Composite bonding for chips, cracks, and gaps",
      "Tooth-coloured ceramic or composite fillings",
      "Inlays and onlays for damaged rear teeth",
      "Colour-matched, high-strength materials for durability and aesthetics",
    ],
    whoItsFor: [
      "Patients with chipped, cracked, or discoloured teeth",
      "Anyone seeking metal-free, natural-looking restorations",
      "Those replacing old silver amalgam fillings",
    ],
    faqs: [
      { q: "How long do esthetic restorations last?", a: "With proper care, composite restorations typically last 7–10 years. Ceramic inlays/onlays can last 15+ years." },
      { q: "Is the procedure painful?", a: "Local anaesthesia ensures the procedure is comfortable. Most patients report minimal sensitivity." },
      { q: "Will it look natural?", a: "Yes — materials are shade-matched to your existing teeth for a seamless, invisible result." },
    ],
    metaTitle: "Esthetic Dental Restoration Bhubaneswar | Dentica",
    metaDescription: "Natural-looking esthetic restorations at Dentica, Bhubaneswar. Tooth-coloured fillings, inlays, composite bonding by specialist team. Book your consultation today.",
    jsonLdName: "Esthetic Dental Restoration",
  },
  {
    slug: "single-session-root-canal",
    name: "Single Session Root Canal",
    shortName: "Root Canal",
    tagline: "Pain-free root canal treatment, completed in a single visit",
    description:
      "Prof.(Dr) Sambarta Das — Root Canal Specialist with 16+ years of experience — uses advanced rotary endodontics to complete your root canal in one comfortable sitting. No multiple trips, no prolonged discomfort.",
    icon: "⚕",
    image: "/images/treatments/service-endo.png",
    doctor: "Prof.(Dr) Sambarta Das",
    doctorSlug: "sambarta",
    whatItInvolves: [
      "Advanced local anaesthesia for complete comfort",
      "Rotary endodontic instruments for precision and speed",
      "Thorough cleaning and shaping of root canals",
      "Biocompatible filling and permanent restoration in a single visit",
    ],
    whoItsFor: [
      "Patients with severe toothache or tooth sensitivity",
      "Those with infected or abscessed teeth",
      "Anyone wanting to save a badly decayed tooth",
      "Patients who want treatment completed quickly",
    ],
    faqs: [
      { q: "Is root canal treatment painful?", a: "Modern root canal therapy performed by Prof.(Dr) Sambarta Das is virtually painless. Advanced anaesthesia techniques ensure complete comfort throughout." },
      { q: "Why single session?", a: "Single-session treatment with rotary endodontics reduces total chair time, lowers infection risk between visits, and gets you back to normal faster." },
      { q: "How long does it take?", a: "Most single-session root canals are completed in 60–90 minutes." },
      { q: "What happens after?", a: "A crown is usually placed over the treated tooth to protect it. Dr. Sambarta will discuss the best restoration option for you." },
    ],
    metaTitle: "Single Session Root Canal Bhubaneswar | Prof.(Dr) Sambarta Das | Dentica",
    metaDescription: "Pain-free single-session root canal by Prof.(Dr) Sambarta Das, Root Canal Specialist with 16+ years experience, at Dentica Bhubaneswar. Call +91 9777231262.",
    jsonLdName: "Root Canal Treatment",
  },
  {
    slug: "orthodontics",
    name: "Orthodontics",
    shortName: "Orthodontics",
    tagline: "Perfectly aligned teeth with expert orthodontic treatment",
    description:
      "Prof.(Dr) Anand Garabadu — Professor, PG Guide, and orthodontist with 2,500+ cases treated — offers comprehensive orthodontic treatment including metal braces, ceramic braces, self-ligating braces, and lingual braces for all ages.",
    icon: "⚡",
    image: "/images/treatments/service-ortho.png",
    doctor: "Prof.(Dr) Anand Garabadu",
    doctorSlug: "anand",
    whatItInvolves: [
      "Comprehensive orthodontic assessment and treatment planning",
      "Metal, ceramic, self-ligating, or lingual braces",
      "Regular monitoring and adjustments",
      "Retention phase to maintain results long-term",
    ],
    whoItsFor: [
      "Children, teenagers, and adults with misaligned teeth",
      "Patients with crowding, spacing, overbite, or underbite",
      "Anyone seeking a straighter, more confident smile",
    ],
    faqs: [
      { q: "How long does orthodontic treatment take?", a: "Typically 12–24 months depending on complexity. Dr. Anand will give you a precise timeline after assessment." },
      { q: "Is orthodontic treatment only for children?", a: "No — adults benefit just as much. We treat patients of all ages at Dentica." },
      { q: "What type of braces are best?", a: "It depends on your case, lifestyle, and preference. Dr. Anand will recommend the most suitable option after examination." },
    ],
    metaTitle: "Orthodontic Treatment Bhubaneswar | Prof.(Dr) Anand Garabadu | Dentica",
    metaDescription: "Expert orthodontics by Prof.(Dr) Anand Garabadu, 2,500+ cases treated, at Dentica Bhubaneswar. Braces for all ages — metal, ceramic, self-ligating, lingual. Book now.",
    jsonLdName: "Orthodontic Treatment",
  },
  {
    slug: "clear-aligners",
    name: "Clear Aligners",
    shortName: "Clear Aligners",
    tagline: "Invisible teeth straightening by Odisha's first Invisalign-certified specialist",
    description:
      "Prof.(Dr) Anand Garabadu — the first Invisalign-certified specialist in Odisha, with clear aligner expertise since 2017 — offers truly invisible teeth straightening that fits seamlessly into your life. No wires, no brackets.",
    icon: "◈",
    image: "/images/treatments/clear-aligners.png",
    doctor: "Prof.(Dr) Anand Garabadu",
    doctorSlug: "anand",
    whatItInvolves: [
      "Digital 3D scan of your teeth (no messy impressions)",
      "Custom series of clear, removable aligners",
      "Fortnightly aligner changes at home",
      "Periodic check-ins with Dr. Anand",
      "Retainers to maintain your new smile",
    ],
    whoItsFor: [
      "Adults and teenagers who want discreet treatment",
      "Professionals who prefer not to wear visible braces",
      "Mild to moderate crowding and alignment cases",
      "Anyone who wants the freedom to eat normally",
    ],
    faqs: [
      { q: "How is Invisalign different from other aligners?", a: "Invisalign uses proprietary SmartTrack material and is backed by the most clinical research of any aligner system. Dr. Anand is Odisha's first certified Invisalign provider." },
      { q: "How long is clear aligner treatment?", a: "Usually 6–18 months depending on the complexity of tooth movements required." },
      { q: "Can I eat and drink with aligners in?", a: "Aligners should be removed before eating or drinking anything other than water." },
      { q: "Are they really invisible?", a: "Yes — most people won't notice you're wearing them. They're designed to be as transparent as possible." },
    ],
    metaTitle: "Invisalign Clear Aligners Bhubaneswar | Prof.(Dr) Anand Garabadu | Dentica",
    metaDescription: "Invisible teeth straightening by Prof.(Dr) Anand Garabadu, Odisha's first Invisalign-certified specialist, at Dentica Bhubaneswar. Clear aligners since 2017. Book today.",
    jsonLdName: "Clear Aligner Orthodontic Treatment",
  },
  {
    slug: "surgical-extraction-impaction",
    name: "Surgical Extraction & Impaction",
    shortName: "Wisdom Tooth Removal",
    tagline: "Safe, precise removal of impacted wisdom teeth",
    description:
      "Impacted wisdom teeth cause pain, crowding, and infection if left untreated. Our specialist team performs surgical extractions with careful technique and proper anaesthesia, ensuring a smooth procedure and fast recovery.",
    icon: "✚",
    image: "/images/treatments/service-general.png",
    doctor: null,
    doctorSlug: null,
    whatItInvolves: [
      "OPG/digital X-ray assessment of tooth position",
      "Local or IV sedation anaesthesia for comfort",
      "Precise surgical extraction with minimal tissue disruption",
      "Suturing and post-operative care instructions",
    ],
    whoItsFor: [
      "Patients with impacted or partially erupted wisdom teeth",
      "Those experiencing pain, swelling, or infection around wisdom teeth",
      "Patients advised extraction before orthodontic treatment",
    ],
    faqs: [
      { q: "How long does recovery take?", a: "Most patients recover fully in 3–7 days. Swelling peaks at 48 hours and subsides quickly." },
      { q: "Is the procedure painful?", a: "Local anaesthesia ensures you feel no pain during the procedure. Post-operative discomfort is managed with prescribed medication." },
      { q: "Do all wisdom teeth need to be removed?", a: "Not always — only impacted or problematic wisdom teeth that are causing or likely to cause issues need removal. We'll advise after examination." },
    ],
    metaTitle: "Wisdom Tooth Removal Bhubaneswar | Surgical Extraction | Dentica",
    metaDescription: "Expert wisdom tooth extraction and surgical impaction treatment at Dentica, Bhubaneswar. Safe, comfortable procedures by specialist team. Book your consultation.",
    jsonLdName: "Surgical Tooth Extraction",
  },
  {
    slug: "smile-designing",
    name: "Smile Designing",
    shortName: "Smile Design",
    tagline: "A custom smile makeover crafted around your face and personality",
    description:
      "Smile designing at Dentica is a comprehensive, customised approach to transforming your smile. Combining veneers, whitening, bonding, and shaping, we design a smile that complements your facial features and boosts your confidence.",
    icon: "◉",
    image: "/images/treatments/service-cosmetic.png",
    doctor: null,
    doctorSlug: null,
    whatItInvolves: [
      "Detailed smile analysis and digital preview",
      "Combination of veneers, whitening, bonding as required",
      "Gum contouring for ideal proportions",
      "Durable, natural-looking ceramic/composite materials",
    ],
    whoItsFor: [
      "Anyone unhappy with the overall appearance of their smile",
      "Patients with stained, uneven, chipped, or gapped teeth",
      "Those preparing for a wedding, event, or life change",
    ],
    faqs: [
      { q: "How long does a smile makeover take?", a: "Most smile designs are completed in 2–4 visits over 2–3 weeks depending on the procedures involved." },
      { q: "Is it permanent?", a: "Veneers and composite bonding are long-lasting but not permanent — they may need replacement after 8–15 years depending on care." },
      { q: "Can I see a preview before committing?", a: "Yes — we offer a digital smile preview before any irreversible treatment begins." },
    ],
    metaTitle: "Smile Designing Bhubaneswar | Smile Makeover | Dentica",
    metaDescription: "Custom smile designing and smile makeover at Dentica, Bhubaneswar. Veneers, whitening, bonding — a complete smile transformation. Book your smile consultation.",
    jsonLdName: "Smile Design Dental Treatment",
  },
  {
    slug: "implants",
    name: "Dental Implants",
    shortName: "Dental Implants",
    tagline: "Permanent, natural-feeling tooth replacement that lasts a lifetime",
    description:
      "Dental implants are the gold standard for replacing missing teeth. A titanium post is placed in the jaw bone, topped with a custom ceramic crown that looks, feels, and functions exactly like a natural tooth.",
    icon: "⬡",
    image: "/images/treatments/service-implant.png",
    doctor: null,
    doctorSlug: null,
    whatItInvolves: [
      "Comprehensive examination with digital X-ray/OPG",
      "Implant placement under local anaesthesia",
      "Healing period (osseointegration) of 3–6 months",
      "Placement of custom crown on the integrated implant",
    ],
    whoItsFor: [
      "Patients with one or more missing teeth",
      "Those who want a permanent solution vs. dentures or bridges",
      "Patients with good bone density and gum health",
    ],
    faqs: [
      { q: "How long do implants last?", a: "With proper care, implants can last 20+ years or a lifetime. The crown on top may need replacement after 10–15 years." },
      { q: "Is the procedure painful?", a: "The procedure is performed under local anaesthesia — you won't feel pain during placement. Post-operative discomfort is typically mild." },
      { q: "Am I a candidate for implants?", a: "Most adults with good oral and general health qualify. A thorough assessment will confirm bone density and suitability." },
    ],
    metaTitle: "Dental Implants Bhubaneswar | Permanent Tooth Replacement | Dentica",
    metaDescription: "Permanent dental implants at Dentica, Bhubaneswar. Natural-looking, titanium implants for single or multiple missing teeth. Book your implant consultation today.",
    jsonLdName: "Dental Implant Placement",
  },
  {
    slug: "full-mouth-rehabilitation-implants",
    name: "Full-Mouth Rehabilitation with Implants",
    shortName: "Full-Mouth Rehab",
    tagline: "Complete reconstruction of a failing or edentulous dentition",
    description:
      "Full-mouth rehabilitation combines dental implants with crowns, bridges, and occlusal therapy to completely restore both function and aesthetics in patients who have lost most or all of their teeth.",
    icon: "⬢",
    image: "/images/treatments/Full-Mouth-Rehabilitation.png",
    doctor: null,
    doctorSlug: null,
    whatItInvolves: [
      "Comprehensive assessment: X-rays, photographs, study models",
      "Strategic implant placement for full-arch support",
      "Temporary prosthesis during healing",
      "Final ceramic or zirconia crowns/bridges on healed implants",
      "Occlusal (bite) refinement for long-term comfort",
    ],
    whoItsFor: [
      "Patients who are fully or mostly edentulous (missing all/most teeth)",
      "Those whose existing dentition is failing beyond individual restoration",
      "Patients seeking an all-on-4 or all-on-6 type restoration",
    ],
    faqs: [
      { q: "What is All-on-4 / All-on-6?", a: "These are implant-supported full-arch restorations that use 4 or 6 implants to support a complete set of teeth — a permanent alternative to full dentures." },
      { q: "How long does full-mouth rehabilitation take?", a: "The full process typically takes 6–12 months including healing time, though temporary teeth are provided from day one." },
      { q: "Is it worth it?", a: "For patients with severe dental deterioration, full-mouth rehabilitation dramatically improves quality of life — eating, speaking, and confidence — with results that last decades." },
    ],
    metaTitle: "Full Mouth Rehabilitation Bhubaneswar | Implants | Dentica",
    metaDescription: "Complete full-mouth rehabilitation with implants at Dentica, Bhubaneswar. All-on-4 / All-on-6 solutions for missing or failing dentition. Book your consultation.",
    jsonLdName: "Full Mouth Dental Rehabilitation",
  },
];

export const tier2Treatments = [
  { name: "Multi-Visit Root Canal", desc: "Complex root canal cases requiring multiple sessions for thorough treatment." },
  { name: "Re-Root Canal Treatment", desc: "Re-treatment of previously root-canal-treated teeth that have become re-infected." },
  { name: "Complete Denture", desc: "Full removable dentures for fully edentulous (toothless) arches." },
  { name: "Cast Partial Denture", desc: "Metal-framework partial dentures for patients missing multiple teeth." },
  { name: "Dental Crown – Metal", desc: "Full-coverage metal crowns for back teeth requiring maximum strength." },
  { name: "Dental Crown – PFM (Porcelain-Fused-to-Metal)", desc: "Metal crowns with a porcelain outer surface for improved aesthetics." },
  { name: "Dental Crown – Zirconia", desc: "All-ceramic zirconia crowns — metal-free, highly aesthetic, and durable." },
  { name: "Dental Crown – E-max", desc: "Lithium disilicate all-ceramic crowns for the most natural-looking restoration." },
  { name: "Flap Surgery", desc: "Periodontal surgery to treat advanced gum disease and access deep tartar deposits." },
  { name: "Gingivectomy", desc: "Removal of excess gum tissue to treat gum disease or improve smile aesthetics." },
  { name: "Frenectomy", desc: "Removal of restrictive frenum tissue that causes gap between teeth or tongue-tie." },
  { name: "Ceramic Braces", desc: "Tooth-coloured ceramic braces for orthodontic treatment with reduced visibility." },
  { name: "Self-Ligating Braces", desc: "Braces with built-in clips instead of elastic ties — faster adjustments, less friction." },
  { name: "Lingual Braces", desc: "Braces fitted on the inner surface of teeth — completely hidden from view." },
  { name: "Space Maintainers", desc: "Devices to hold space for permanent teeth after premature loss of baby teeth." },
  { name: "Apicoectomy", desc: "Surgical removal of the tip of a tooth root to treat persistent infection after root canal." },
  { name: "Cyst Removal", desc: "Surgical excision of jaw cysts detected on OPG/CBCT imaging." },
  { name: "Teeth Whitening", desc: "Professional in-clinic whitening to brighten teeth by several shades safely." },
  { name: "Diastema Closure", desc: "Closing the gap between front teeth using composite bonding or veneers." },
  { name: "Bone Grafting / Sinus Lift", desc: "Bone augmentation procedures to create sufficient bone volume for implant placement." },
];

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return tier1Treatments.find(t => t.slug === slug);
}

export function generateStaticParams() {
  return tier1Treatments.map(t => ({ slug: t.slug }));
}
