import { CrisisType, LegalTopic, Referral } from "./types.js";

export const TAMIL_NADU_LEGAL_TOPICS: LegalTopic[] = [
  {
    id: "eviction_notice",
    title: "Eviction Notice & Lockouts",
    titleTa: "வெளியேற்ற நோட்டீஸ் மற்றும் பூட்டுதல் (Eviction Notice & Lockouts)",
    subtitle: "Protections against wrongful eviction and lockouts.",
    subtitleTa: "தவறான வெளியேற்றம் மற்றும் சட்டவிரோத பூட்டுதலுக்கு எதிரான பாதுகாப்புகள்.",
    mainAct: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (Sections 21 & 22)",
    keySections: [
      {
        section: "TNRRRLT Act 2017, Section 21",
        right: "Order of Rent Court Needed for Eviction",
        explanation: "No landlord can evict a tenant or take back possession without an explicit order from the Rent Court. Setting deadlines verbally, sending WhatsApp notices, or sending threat letters has no power of eviction on its own."
      },
      {
        section: "TNRRRLT Act 2017, Section 22",
        right: "Grounds Required for Recovery",
        explanation: "Eviction can only be sought on legal grounds: Non-payment of rent for 2+ months, sub-letting without written permission, causing damage to property, breaking written agreement terms, or landlord's personal need. Simple whim is not a valid ground during an agreement's term."
      },
      {
        section: "Transfer of Property Act 1882, Section 106",
        right: "Notice Period Requirement",
        explanation: "In the absence of a contrarian agreement clause, a landlord must provide a written legal notice at least 15 days in advance (for monthly tenancies) to terminate a tenancy contract."
      }
    ],
    keySectionsTa: [
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 21",
        right: "வெளியேற்றத்திற்கு வாடகை நீதிமன்ற உத்தரவு தேவை",
        explanation: "வாடகை நீதிமன்றத்தின் வெளிப்படையான உத்தரவு இல்லாமல் எந்தவொரு வீட்டு உரிமையாளரும் குத்தகைதாரரை வெளியேற்றவோ அல்லது வீட்டைத் திரும்பப் பெறவோ முடியாது. வாய்மொழியாக காலக்கெடுவை அமைப்பதற்கோ, வாட்ஸ்அப் அறிவிப்புகளை அனுப்புவதற்கோ அல்லது மிரட்டல் கடிதங்களை அனுப்புவதற்கோ சொந்தமாக வெளியேற்றும் அதிகாரம் இல்லை."
      },
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 22",
        right: "வெளியேற்றத்திற்குத் தேவையான சட்டப்பூர்வ காரணங்கள்",
        explanation: "சட்டப்பூர்வ அடிப்படையில் மட்டுமே வெளியேற்றத்தைக் கோர முடியும்: 2+ மாதங்களுக்கு வாடகை தராமை, எழுத்துப்பூர்வ அனுமதியின்றி உள்வாடகைக்கு விடுதல், சொத்துக்கு சேதம் விளைவித்தல், ஒப்பந்த விதிகளை மீறுதல் அல்லது வீட்டு உரிமையாளரின் சொந்த தேவை. ஒப்பந்தக் காலத்தில் சாதாரண விருப்பத்தின் பேரில் வெளியேற்ற முடியாது."
      },
      {
        section: "சொத்துரிமை மாற்றுச் சட்டம் 1882, பிரிவு 106",
        right: "அறிவிப்புக் காலத் தேவை (Notice Period)",
        explanation: "வேறு ஒப்பந்த விதிமுறை இல்லாதபோது, மாதாந்திர வாடகை ஒப்பந்தத்தை ரத்து செய்ய வீட்டு உரிமையாளர் குறைந்தது 15 நாட்களுக்கு முன்பே எழுத்துப்பூர்வமான சட்டப்பூர்வ அறிவிப்பை வழங்க வேண்டும்."
      }
    ],
    faqs: [
      {
        question: "Can my landlord evict me in 3 days if they need the house?",
        answer: "No. Under Section 21 of the TNRRRLT Act 2017, the landlord must follow the due process of law. They cannot verbally force you out or set arbitrary brief deadlines. Even with valid grounds, they must serve written notice as per your agreement (usually 1 or 2 months) and then apply to the Rent Court if you do not vacate.",
        tip: "Keep a written record of all conversations. Do not voluntarily sign any vacant agreement or possession delivery letters."
      },
      {
        question: "What if I do not have a written agreement?",
        answer: "Under the TNRRRLT Act 2017, all tenancies must reside on a registered written agreement. If you have been renting under a verbal agreement, the law requires both parties to register a written agreement. An unregistered tenancy cannot be used easily in Rent Courts, but you are still protected from arbitrary force or lockouts by common civil law.",
        tip: "Offer to sign a standard rental agreement and document all rent paid via bank transfer to prove tenancy."
      }
    ],
    faqsTa: [
      {
        question: "வீட்டு உரிமையாளருக்கு வீடு தேவைப்பட்டால் என்னை 3 நாட்களில் வெளியேற்ற முடியுமா?",
        answer: "இல்லை. TNRRRLT சட்டம் 2017 பிரிவு 21 இன் கீழ், வீட்டு உரிமையாளர் சட்டத்தின்படி முறையான நடைமுறையை பின்பற்ற வேண்டும். அவர்கள் உங்களை வாய்மொழியாக கட்டாயப்படுத்தவோ அல்லது தன்னிச்சையான சுருக்கமான காலக்கெடுவை விதிக்கவோ முடியாது. செல்லுபடியாகும் காரணங்கள் இருந்தாலும், அவர்கள் உங்கள் ஒப்பந்தத்தின்படி எழுத்துப்பூர்வ அறிவிப்பை வழங்க வேண்டும் (பொதுவாக 1 அல்லது 2 மாதங்கள்) பின்னர் நீங்கள் வெளியேறாவிட்டால் வாடகை நீதிமன்றத்தில் மனு தாக்கல் செய்ய வேண்டும்.",
        tip: "அனைத்து உரையாடல்களின் எழுத்துப்பூர்வ பதிவை வைத்திருங்கள். உங்கள் ஒப்புதல் இல்லாமல் வெற்று ஆவணங்களிலோ அல்லது காலி செய்யும் கடிதங்களிலோ கையெழுத்திட வேண்டாம்."
      },
      {
        question: "என்னிடம் எழுத்துப்பூர்வ உடன்படிக்கை இல்லை என்றால் என்ன செய்வது?",
        answer: "TNRRRLT சட்டம் 2017 இன் படி, அனைத்து வாடகைதாரர்களும் பதிவு செய்யப்பட்ட எழுத்துப்பூர்வ ஒப்பந்தத்தைக் கொண்டிருக்க வேண்டும். நீங்கள் வாய்மொழி ஒப்பந்தத்தின் கீழ் வாடகைக்கு இருந்தால், இரு தரப்பினரும் எழுத்துப்பூர்வ ஒப்பந்தத்தை பதிவு செய்ய சட்டம் கோருகிறது. பதிவு செய்யப்படாத ஒப்பந்தத்தை வாடகை நீதிமன்றங்களில் எளிதாகப் பயன்படுத்த முடியாது என்றாலும், பொதுவான சிவில் சட்டத்தின் மூலம் தன்னிச்சையான வெளியேற்றம் அல்லது பூட்டுதல்களிலிருந்து உங்களுக்கு பாதுகாப்பு உள்ளது.",
        tip: "ஒரு நிலையான வாடகை ஒப்பந்தத்தில் கையெழுத்திட முன்வரவும், மேலும் வாடகை செலுத்தியதை நிரூபிக்க வங்கி பரிமாற்றம் மூலம் வாடகையை செலுத்தவும்."
      }
    ]
  },
  {
    id: "harassment",
    title: "Utility Cut-offs & Harassment",
    titleTa: "பயன்பாட்டு துண்டிப்புகள் மற்றும் துன்புறுத்தல் (Utility Cut-offs & Harassment)",
    subtitle: "Stopping physical harassment, lockouts, or termination of basic services.",
    subtitleTa: "அடிப்படை பயன்பாடுகளை துண்டித்தல் அல்லது உடல்ரீதியான துன்புறுத்தல்களை தடுத்தல்.",
    mainAct: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (Section 20)",
    keySections: [
      {
        section: "TNRRRLT Act 2017, Section 20",
        right: "Restoration of Essential Utilities",
        explanation: "Landlords are strictly prohibited from cutting off essential supplies (electricity, water, sewage, safety locks) to force a tenant out. If they do, you can file an application to the Rent Authority, who will investigate and order immediate restoration within 24 hours, alongside a maximum penalty on the landlord."
      },
      {
        section: "TNRRRLT Act 2017, Section 20(3)",
        right: "Rent Authority Penal Action",
        explanation: "The Rent Authority can direct the utility board/municipal board to immediately restore supplies and can impose compensation fines on the landlord for initiating unlawful disruptions."
      }
    ],
    keySectionsTa: [
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 20",
        right: "அத்தியாவசியப் பயன்பாடுகளை மீட்டெடுத்தல் (மின்சாரம், தண்ணீர்)",
        explanation: "ஒரு குத்தகைதாரரை வெளியேற்ற கட்டாயப்படுத்த அத்தியாவசிய விநியோகங்களை (மின்சாரம், தண்ணீர், கழிவுநீர், கதவு பூட்டுக்கள்) துண்டிப்பது வீட்டு உரிமையாளர்களுக்கு முற்றிலும் தடைசெய்யப்பட்டுள்ளது. அவர்கள் அவ்வாறு செய்தால், நீங்கள் வாடகை அதிகாரியிடம் மனு தாக்கல் செய்யலாம், அவர் விசாரித்து 24 மணி நேரத்திற்குள் உடனடி சேவைகளை மீட்டெடுக்க உத்தரவிடுவார்."
      },
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 20(3)",
        right: "வாடகை அதிகாரியின் தண்டனை நடவடிக்கை",
        explanation: "அத்தியாவசிய சேவைகளை உடனடியாக மீட்டெடுக்க வாடகை அதிகாரி மின்சார வாரியம் அல்லது நகராட்சிக்கு உத்தரவிடலாம் மற்றும் சட்டவிரோத இடையூறுகளை ஏற்படுத்தியதற்காக வீட்டு உரிமையாளருக்கு இழப்பீட்டு அபராதம் விதிக்கலாம்."
      }
    ],
    faqs: [
      {
        question: "My landlord cut off my water/electricity supply. What can I do immediately?",
        answer: "First, document the disruption. Take photos/videos of the water valve or the main power switches if possible, and send a WhatsApp/text message to your landlord demanding immediate restoration. If not restored, you can submit an urgent application under Section 20 of the TNRRRLT Act 2017 to your local Rent Authority. Additionally, file a complaint at the local police station.",
        tip: "Do not resort to violence or self-reconnection without documentation, as it could weaken your case. Proceed via local police or Rent Authority."
      }
    ],
    faqsTa: [
      {
        question: "என் வீட்டு உரிமையாளர் எனது தண்ணீர் அல்லது மின்சாரத்தை துண்டித்து விட்டார். நான் என்ன செய்ய வேண்டும்?",
        answer: "முதலில், இந்த இடையூறை ஆவணப்படுத்தவும். பைப் வால்வு அல்லது மெயின் சுவிட்சின் போட்டோ/வீடியோக்களை எடுத்து, உடனடியாக மீட்டமைக்குமாறு வீட்டு உரிமையாளருக்கு வாட்ஸ்அப் மூலம் செய்தி அனுப்பவும். மீட்டெடுக்கப்படாவிட்டால், உங்கள் உள்ளூர் வாடகை அதிகாரியிடம் TNRRRLT சட்டம் 2017 பிரிவு 20 இன் கீழ் அவசர விண்ணப்பத்தை சமர்ப்பிக்கலாம். உள்ளூர் காவல் நிலையத்திலும் புகார் அளிக்கவும்.",
        tip: "ஆவணங்கள் இல்லாமல் வன்முறையிலோ அல்லது சொந்தமாக இணைப்பிலோ ஈடுபட வேண்டாம், இது உங்கள் வழக்கை பலவீனப்படுத்தக்கூடும். போலீஸ் அல்லது வாடகை அதிகாரி மூலம் செல்லவும்."
      }
    ]
  },
  {
    id: "rent_hike",
    title: "Rent Hikes & Agreement Disputes",
    titleTa: "வாடகை உயர்வு மற்றும் ஒப்பந்த தகராறுகள் (Rent Hikes & Agreement Disputes)",
    subtitle: "Rules on how much and when rent can be increased.",
    subtitleTa: "வாடகை எவ்வளவு மற்றும் எப்போது உயர்த்தப்படலாம் என்பதற்கான விதிகள்.",
    mainAct: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (Sections 8, 9 & 10)",
    keySections: [
      {
        section: "TNRRRLT Act 2017, Section 8",
        right: "Rent strictly as per Agreement",
        explanation: "The rent must be increased strictly according to the terms written in your tenancy agreement. If your agreement specifies a 5% increase per year, the landlord cannot demand 20% or flat rate increases."
      },
      {
        section: "TNRRRLT Act 2017, Section 9",
        right: "Landlord must supply Notice 3 months in advance",
        explanation: "If the current agreement period is over, and no revision rate is written, the landlord must give you a written notice proposing a rent increase at least 3 months in advance. You have the right to object or propose counter-offers."
      }
    ],
    keySectionsTa: [
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 8",
        right: "ஒப்பந்தத்தின்படி மட்டுமே வாடகை உயர்வு",
        explanation: "உங்கள் வாடகை ஒப்பந்தத்தில் எழுதப்பட்ட விதிமுறைகளின்படி மட்டுமே வாடகை உயர்த்தப்பட வேண்டும். உங்கள் ஒப்பந்தத்தில் வருடத்திற்கு 5% உயர்வு என்று குறிப்பிடப்பட்டிருந்தால், உரிமையாளர் திடீரென 20% கேட்க முடியாது."
      },
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 9",
        right: "3 மாதங்களுக்கு முன்பே அறிவிப்பு வழங்க வேண்டும்",
        explanation: "தற்போதைய ஒப்பந்தக் காலம் முடிந்து, திருத்தப்பட்ட வாடகை விகிதம் எழுதப்படவில்லை என்றால், வீட்டு உரிமையாளர் வாடகை உயர்வை முன்மொழிந்து குறைந்தது 3 மாதங்களுக்கு முன்பு எழுத்துப்பூர்வ அறிவிப்பைத் தர வேண்டும். ஆட்சேபனை தெரிவிக்க உங்களுக்கு உரிமை உண்டு."
      }
    ],
    faqs: [
      {
        question: "Can my landlord suddenly increase my rent by 50%?",
        answer: "No. Rent increases must either follow your written agreement's pre-agreed terms or be proposed in writing 3 months in advance. Under the TNRRRLT Act, if a tenant does not object to a proposed written rent hike within 3 months, it is deemed accepted. If you disagree, you must write a formal dissent letter/WhatsApp immediately.",
        tip: "Always respond to any rent hike proposal in writing within 15 days to avoid deemed consent issues."
      }
    ],
    faqsTa: [
      {
        question: "என் வீட்டு உரிமையாளர் திடீரென 50% வாடகையை உயர்த்த முடியுமா?",
        answer: "இல்லை. வாடகை உயர்வுகள் உங்கள் எழுத்துப்பூர்வ ஒப்பந்தத்தின் முன் ஒப்புக்கொள்ளப்பட்ட விதிமுறைகளைப் பின்பற்ற வேண்டும் அல்லது 3 மாதங்களுக்கு முன்பே எழுத்துப்பூர்வமாக முன்மொழியப்பட வேண்டும். TNRRRLT சட்டத்தின் கீழ், ஒரு குத்தகைதாரர் 3 மாதங்களுக்குள் முன்மொழியப்பட்ட வாடகை உயர்வை எதிர்க்கவில்லை என்றால், அது ஏற்றுக்கொள்ளப்பட்டதாகக் கருதப்படும். எனவே நீங்கள் உடன்படவில்லை என்றால், உடனடியாக உங்கள் ஆட்சேபனையை எழுத்துப்பூர்வமாகப் பதிவு செய்ய வேண்டும்.",
        tip: "தவறான ஒப்புதலைத் தவிர்க்க, வாடகை உயர்வு முன்மொழிவுக்கு 15 நாட்களுக்குள் எழுத்துப்பூர்வமாக பதிலளிக்கவும்."
      }
    ]
  },
  {
    id: "deposit_withholding",
    title: "Security Deposit Withholding",
    titleTa: "முன்பணத்தை திரும்பப் பெறாமை (Security Deposit Withholding)",
    subtitle: "Limits on deposits and wrongful deduction protections.",
    subtitleTa: "முன்பண வரம்புகள் மற்றும் காரணமற்ற பிடித்தங்களில் இருந்து பாதுகாப்பு.",
    mainAct: "Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (Section 11)",
    keySections: [
      {
        section: "TNRRRLT Act 2017, Section 11",
        right: "Capping of Security Deposit",
        explanation: "For residential premises, the security deposit is legally capped at a maximum of three months' rent. Any demand above this (e.g., standard 10-month Chennai customs) is technically in excess under the newer Act."
      },
      {
        section: "TNRRRLT Act 2017, Section 11(2)",
        right: "Deposit Refund upon Vacating",
        explanation: "The landlord must refund the security deposit to the tenant within one month of taking back possession, after making reasonable, documented deductions for actual damages/unpaid bills. Landlords cannot claim generic 'painting charges' unless pre-committed in the agreement."
      }
    ],
    keySectionsTa: [
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 11",
        right: "அட்வான்ஸ் தொகைக்கான வரம்பு (Deposit Cap)",
        explanation: "பாரம்பரியமான 10 மாத பழக்கத்திற்கு மாறாக, புதிய சட்டத்தின் கீழ் குடியிருப்பு வளாகங்களுக்கான அட்வான்ஸ் தொகை அதிகபட்சமாக மூன்று மாத வாடகையாக மட்டுமே சட்டப்பூர்வமாகக் கட்டுப்படுத்தப்பட்டுள்ளது."
      },
      {
        section: "TNRRRLT சட்டம் 2017, பிரிவு 11(2)",
        right: "வீட்டை காலி செய்யும்போது டெபாசிட் திரும்பப் பெறுதல்",
        explanation: "உண்மையான சேதங்கள்/செலுத்தப்படாத பில்களுக்கு நியாயமான, ஆவணப்படுத்தப்பட்ட பிடித்தங்களைச் செய்த பிறகு, வீட்டு உரிமையாளர் வீட்டைத் திரும்பப் பெற்ற ஒரு மாதத்திற்குள் முன்பணத் தொகையை குத்தகைதாரருக்குத் திரும்பத் தர வேண்டும். தேய்மானம் தவிர்த்து பொதுவான 'பெயிண்டிங் கட்டணம்' என்று தன்னிச்சையாக கழிக்க முடியாது."
      }
    ],
    faqs: [
      {
        question: "My landlord won't refund my security deposit. What are my options?",
        answer: "If the landlord refuses to refund the deposit, first write a demand letter referencing Section 11 of the TNRRRLT Act 2017. Highlight that deductions must be documented. If they still refuse, you can file a petition in the Rent Court to recover the security deposit.",
        tip: "Always take high-quality photos/videos of the entire house on the day you vacate to prove there is no damage beyond normal wear and tear."
      }
    ],
    faqsTa: [
      {
        question: "என் வீட்டு உரிமையாளர் எனது முன்பணத்தை (Advance) திருப்பித் தரவில்லை. எனக்கு என்ன வழிகள் உள்ளன?",
        answer: "உரிமையாளர் டெபாசிட்டைத் திருப்பித் தர மறுத்தால், முதலில் TNRRRLT சட்டம் 2017 இன் பிரிவு 11 ஐக் குறிப்பிட்டு கடிதம் எழுதவும். பிடித்தம் செய்யப்படின் அதற்கான ஆவணத்தைக் கோரவும். அவர்கள் இன்னும் மறுத்தால், முன்பணத்தை மீட்டெடுக்க நீங்கள் வாடகை நீதிமன்றத்தில் மனு தாக்கல் செய்யலாம்.",
        tip: "வீட்டில் எந்தச் சேதமும் இல்லை என்பதை நிரூபிக்க, நீங்கள் வீட்டை காலி செய்யும் நாளில் முழு வீட்டையும் போட்டோ/வீடியோக்களை எடுத்துக்கொள்ள மறக்காதீர்கள்."
      }
    ]
  }
];

export const TAMIL_NADU_DISTRICTS = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Namakkal",
  "Tirupur",
  "Erode",
  "Vellore",
  "Thanjavur",
  "Kancheepuram",
  "Tiruvallur",
  "Tuticorin",
  "Tirunelveli",
  "Other"
];

export const REFERRALS_DATABASE: Referral[] = [
  {
    name: "Tamil Nadu State Legal Services Authority (TNSLSA)",
    type: "Legal Services Authority",
    details: "Provides free legal counseling and courtroom representation to vulnerable tenants, women, and low-income households.",
    phone: "044-25342834",
    address: "High Court Campus, Chennai - 600104",
    district: "Chennai",
    website: "https://tnslsa.tn.gov.in"
  },
  {
    name: "District Legal Services Authority (DLSA) - Coimbatore",
    type: "Legal Services Authority",
    details: "Free legal support, mediation with landlords, and expert lawyer assignment.",
    phone: "0422-2244100",
    address: "District Court Buildings, Coimbatore - 641018",
    district: "Coimbatore"
  },
  {
    name: "District Legal Services Authority (DLSA) - Madurai",
    type: "Legal Services Authority",
    details: "Free legal consultation and mediation services.",
    phone: "0452-2533039",
    address: "District Court Complex, Melur Road, Madurai - 625020",
    district: "Madurai"
  },
  {
    name: "District Legal Services Authority (DLSA) - Salem",
    type: "Legal Services Authority",
    details: "Provides legal guidance on tenancy and lockout disputes.",
    phone: "0427-2413803",
    address: "Combined Court Buildings, Salem - 636007",
    district: "Salem"
  },
  {
    name: "District Legal Services Authority (DLSA) - Trichy",
    type: "Legal Services Authority",
    details: "Free legal advocacy and advice against harassment.",
    phone: "0431-2415115",
    address: "District Court Complex, Cantonment, Tiruchirappalli - 620001",
    district: "Tiruchirappalli"
  },
  {
    name: "District Legal Services Authority (DLSA) - Namakkal",
    type: "Legal Services Authority",
    details: "Assists tenants with notices, disputes, and mediation files.",
    phone: "04286-228115",
    address: "District Court Campus, Namakkal - 637001",
    district: "Namakkal"
  },
  {
    name: "Chief Minister's Special Cell / Helpline",
    type: "NGO Support",
    details: "Public grievance portal of the Government of Tamil Nadu for filing complaints against municipal defaults or severe administrative harassment.",
    phone: "1100",
    website: "https://cmhelpline.tnega.org"
  },
  {
    name: "Police Emergency Helpline",
    type: "Police Helpline",
    details: "Call immediately for active illegal lockouts, physical threats, harassment, or verbal violence.",
    phone: "100",
    address: "Any Local Police Station in Tamil Nadu"
  },
  {
    name: "SNEHA Trust Chennai",
    type: "NGO Support",
    details: "Support and counseling helpline for tenants and families in immense housing distress.",
    phone: "044-24640050",
    address: "Chennai",
    district: "Chennai"
  }
];

export function getGeneralReferrals(district?: string): Referral[] {
  const police = REFERRALS_DATABASE.find(r => r.type === "Police Helpline")!;
  const cmCell = REFERRALS_DATABASE.find(r => r.name.includes("Chief Minister"))!;
  
  // Specific DLSA
  let localDlsa = REFERRALS_DATABASE.find(r => 
    r.type === "Legal Services Authority" && 
    district && r.district?.toLowerCase() === district.toLowerCase()
  );

  // Default state-level
  if (!localDlsa) {
    localDlsa = REFERRALS_DATABASE.find(r => r.name.includes("State Legal Services"))!;
  }

  return [police, localDlsa, cmCell];
}
