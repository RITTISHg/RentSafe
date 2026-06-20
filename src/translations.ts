export interface UIStrings {
  appTitle: string;
  appSubtitle: string;
  intakeTitle: string;
  intakeSubtitle: string;
  locationLabel: string;
  tenancyStatusLabel: string;
  tenureLabel: string;
  verbalOption: string;
  writtenOption: string;
  registeredOption: string;
  lessThanYear: string;
  oneToThreeYears: string;
  moreThanThreeYears: string;
  presetTitle: string;
  chatPlaceholder: string;
  sendInquiry: string;
  clearCase: string;
  counselorTitle: string;
  planTab: string;
  statuteTab: string;
  referralsTab: string;
  disclaimerTab: string;
  searchPlaceholder: string;
  noMatches: string;
  factDisclaimer: string;
  urgencyCritical: string;
  urgencyUrgent: string;
  urgencyModerate: string;
  urgencyGeneral: string;
  documentsHeading: string;
  avoidHeading: string;
  referralsHeading: string;
  letterHeading: string;
  copyBtn: string;
  copiedBtn: string;
  mainActLabel: string;
  keySectionsLabel: string;
  faqHeading: string;
  rightsTip: string;
  crisisSummary: string;
  actionTimelineTitle: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  scenarios: Array<{
    tag: string;
    label: string;
    text: string;
  }>;
}

export const translations: { en: UIStrings; ta: UIStrings } = {
  en: {
    appTitle: "RentSafe",
    appSubtitle: "Instantly translate tenant distress into a structured, action-ready legal safety roadmap under Tamil Nadu Tenant Laws.",
    intakeTitle: "Tenant Case Intake Variables",
    intakeSubtitle: "Modify these parameters to dynamically adjust your legal notice requirements and match local tribunals instantly.",
    locationLabel: "Location District",
    tenancyStatusLabel: "Tenancy Agreement Type",
    tenureLabel: "Lease Duration",
    verbalOption: "Verbal Agreement (No Signed Deed)",
    writtenOption: "Written Agreement (Unregistered)",
    registeredOption: "Written & Registered (TNRRRLT Registered)",
    lessThanYear: "Less than 1 Year",
    oneToThreeYears: "1 to 3 Years",
    moreThanThreeYears: "More than 3 Years",
    presetTitle: "Common Urgent Scenarios (Click to consult)",
    chatPlaceholder: "Describe what is happening (e.g., 'Landlord cut my electricity supply')...",
    sendInquiry: "Send",
    clearCase: "Reset Case File",
    counselorTitle: "AI Stable Housing Counselor",
    planTab: "Stability Roadmap",
    statuteTab: "Deed & Statute Explorer",
    referralsTab: "Mediation Helpline Map",
    disclaimerTab: "Legal Disclaimer",
    searchPlaceholder: "Search legal guidelines, sections, or FAQs...",
    noMatches: "No exact rulebook match found. Try searching keyword 'eviction', 'deposit', or 'lockout'.",
    factDisclaimer: "RentSafe offers general informational reference based on Tamil Nadu housing codes. This does not constitute formally certified advocacy or attorney counsel.",
    urgencyCritical: "CRITICAL (Next 24 Hours)",
    urgencyUrgent: "URGENT (Next 48 Hours)",
    urgencyModerate: "MODERATE (Next 7 Days)",
    urgencyGeneral: "GENERAL ENQUIRY",
    documentsHeading: "Official Documents to Gather Immediately",
    avoidHeading: "Forbidden Actions to Avoid (To Protect Your Case)",
    referralsHeading: "State Legal Aid & Helpline Referral Channels",
    letterHeading: "Recommended Letter Template / Response Draft",
    copyBtn: "Copy Response Body",
    copiedBtn: "Copied!",
    mainActLabel: "Governing Law / Regulation Act",
    keySectionsLabel: "Key Section Rights & Obligations",
    faqHeading: "Frequently Asked Questions",
    rightsTip: "Strategic Defense Tip",
    crisisSummary: "Primary Situation Summary",
    actionTimelineTitle: "Procedural Response Timeline Buffer",
    priorityHigh: "High Priority",
    priorityMedium: "Medium Priority",
    priorityLow: "Low Priority",
    scenarios: [
      {
        tag: "Sudden Eviction",
        label: "Landlord wants me to vacate in 3 days",
        text: "My landlord suddenly informed me verbally to vacate the house in 3 days. We do not have a written agreement, and I have paid rent on time every month. What are my options under Tamil Nadu law?"
      },
      {
        tag: "Utility Harassment",
        label: "Water/power supply cut off",
        text: "My landlord cut off our water supply and threatened to cut the electricity because of a disagreement. How can I get my services restored immediately?"
      },
      {
        tag: "Excessive Rent Hike",
        label: "Demanding 30% rent increase",
        text: "My current rental agreement finished, and now the landlord is suddenly demanding a 30% rent amount hike from next month. Can they increase it this high without notice?"
      },
      {
        tag: "Deposit Dispute",
        label: "Refusing to refund security deposit",
        text: "I vacated the apartment last month after giving proper 1-month notice. Now the landlord refuses to return my advance/security deposit of ₹50,000, claiming general painting charges."
      }
    ]
  },
  ta: {
    appTitle: "ரெண்ட்-சேஃப் (RentSafe)",
    appSubtitle: "தமிழ்நாடு வாடகைதாரர் சட்டங்களின் கீழ் குத்தகைதாரர்களின் இன்னல்களை உடனடியாக ஒரு கட்டமைக்கப்பட்ட, நடவடிக்கைக்கான சட்டப் பாதுகாப்பாக மாற்றுகிறது.",
    intakeTitle: "வாடகைதாரர் வழக்குத் தகவல் மாறிகள்",
    intakeSubtitle: "உங்கள் தற்போதைய வாடகை நிலவரத்திற்கு ஏற்ப சட்டப்பூர்வ பாதுகாப்பு, நோட்டீஸ் வரம்புகள் மற்றும் உள்ளூர் மன்றங்களை மாற்றியமைக்க இவற்றைப் புதுப்பிக்கவும்.",
    locationLabel: "வாழும் மாவட்டம்",
    tenancyStatusLabel: "வாடகை ஒப்பந்த வகை",
    tenureLabel: "வாழ்ந்த கால அளவு",
    verbalOption: "வாய்மொழி உடன்படிக்கை (பதிவு செய்யப்படாத பத்திரம்)",
    writtenOption: "எழுத்துப்பூர்வ ஒப்பந்தம் (பதிவு செய்யப்படாத பத்திரம்)",
    registeredOption: "முறையாக பதிவு செய்யப்பட்ட ஒப்பந்தம் (TNRRRLT சட்டம்)",
    lessThanYear: "1 வருடத்திற்கும் குறைவாக",
    oneToThreeYears: "1 முதல் 3 ஆண்டுகள்",
    moreThanThreeYears: "3 ஆண்டுகளுக்கு மேல்",
    presetTitle: "பொதுவான அவசர நிகழ்வுகள் (ஆலோசனைக்கு கிளிக் செய்க)",
    chatPlaceholder: "நடக்கும் சூழ்நிலையை விவரிக்கவும் (எ.கா. 'வீட்டு உரிமையாளர் எனது மின்சாரத்தை துண்டித்துவிட்டார்')...",
    sendInquiry: "அனுப்பு",
    clearCase: "வழக்குக் கோப்பை மீட்டமை",
    counselorTitle: "AI வாடகை பாதுகாப்பு நிபுணர்",
    planTab: "பாதுகாப்பு செயல் திட்டம்",
    statuteTab: "சட்ட விதிகளின் தொகுப்பு",
    referralsTab: "காவல் & சட்ட உதவி மையங்கள்",
    disclaimerTab: "சட்ட மறுப்புரை",
    searchPlaceholder: "சட்டப்பிரிவுகள் அல்லது அடிக்கடி கேட்கப்படும் கேள்விகளைத் தேடுங்கள்...",
    noMatches: "சட்ட நூலில் சரியான பொருத்தம் எதுவும் கிடைக்கவில்லை. 'வெளியேற்றம்', 'டெபாசிட்', அல்லது 'பூட்டு' போன்ற முக்கிய வார்த்தைகளை பயன்படுத்துங்கள்.",
    factDisclaimer: "தமிழ்நாடு வீட்டுவசதி குறியீடுகளின் அடிப்படையில் பொதுவான தகவல்களை RentSafe வழங்குகிறது. இது அங்கீகரிக்கப்பட்ட வழக்கறிஞர் ஆலோசனையாகாது.",
    urgencyCritical: "அதி அவசரம் (அடுத்த 24 மணி நேரம்)",
    urgencyUrgent: "அவசரம் (அடுத்த 48 மணி நேரம்)",
    urgencyModerate: "மிதமான அவசரம் (அடுத்த 7 நாட்கள்)",
    urgencyGeneral: "பொதுவான விசாரணை",
    documentsHeading: "உடனடியாகத் திரட்ட வேண்டிய முக்கிய ஆவணங்கள்",
    avoidHeading: "தவிர்க்க வேண்டிய பொதுவான தவறான நடவடிக்கைகள்",
    referralsHeading: "அரசு இலவச சட்ட உதவி மற்றும் அவசர உதவி எண்கள்",
    letterHeading: "பரிந்துரைக்கப்பட்ட வரைவுக் கடிதம் / வீட்டு உரிமையாளருக்கான பதில்",
    copyBtn: "கடித நகலை எடு",
    copiedBtn: "நகலெடுக்கப்பட்டது!",
    mainActLabel: "பொருந்தும் சட்டப்பிரிவு (Regulation Act)",
    keySectionsLabel: "முக்கிய அடிப்படை உரிமைகள் மற்றும் விளக்கங்கள்",
    faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள் மற்றும் பதில்கள்",
    rightsTip: "சட்டப்பூர்வ பாதுகாப்பு அறிவுரை",
    crisisSummary: "தற்போதைய சூழ்நிலையின் சுருக்கம்",
    actionTimelineTitle: "படிப்படியான கால அவகாச செயல்பாடு",
    priorityHigh: "உயர் முன்னுரிமை",
    priorityMedium: "நடுத்தர முன்னுரிமை",
    priorityLow: "குறைந்த முன்னுரிமை",
    scenarios: [
      {
        tag: "திடீர் வெளியேற்றம்",
        label: "3 நாட்களில் வீட்டை காலி செய்யச் சொல்கிறார்",
        text: "எனது வீட்டு உரிமையாளர் வாய்மொழியாக 3 நாட்களில் வீட்டை காலி செய்யச் சொல்லியுள்ளார். எங்களிடம் எழுத்துப்பூர்வ ஒப்பந்தம் இல்லை, ஆனால் நான் ஒவ்வொரு மாதமும் வாடகையைச் சரியாகச் செலுத்தி வருகிறேன். தமிழ்நாட்டுச் சட்டப்படி எனது வழிகள் என்ன?"
      },
      {
        tag: "துன்புறுத்தல்",
        label: "தண்ணீர் அல்லது மின்சாரத் துண்டிப்பு",
        text: "கருத்து வேறுபாடு காரணமாக எனது வீட்டு உரிமையாளர் எனது தண்ணீர் சேவையைத் துண்டித்து விட்டார், மேலும் மின்சாரத்தையும் துண்டிப்பதாக மிரட்டுகிறார். உடனடியாக எனது சேவைகளை எவ்வாறு மீட்டெடுப்பது?"
      },
      {
        tag: "அதிகப்படியான வாடகை உயர்வு",
        label: "திடீரென 30% வாடகை உயர்வு",
        text: "எனது தற்போதைய வாடகை ஒப்பந்தம் முடிவடைந்தது, இப்போது வீட்டு உரிமையாளர் திடீரென அடுத்த மாதத்திலிருந்து 30% வாடகை உயர்வை கோருகிறார். முன்னறிவிப்பு இன்றி இவ்வளவு அதிகமாக வாடகையை உயர்த்த முடியுமா?"
      },
      {
        tag: "முன்பணத் தகராறு",
        label: "அட்வான்ஸ் தொகையைத் தர மறுத்தல்",
        text: "முறையான 1 மாத நோட்டீஸ் அளித்த பிறகு நான் வீட்டை காலி செய்தேன். ஆனால், தற்போது வீட்டு உரிமையாளர் பெயிண்டிங் கட்டணம் என்று கூறி எனது முன்பணம் ₹50,000 திரும்பத் தர மறுக்கிறார்."
      }
    ]
  }
};
