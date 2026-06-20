import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { TAMIL_NADU_LEGAL_TOPICS, REFERRALS_DATABASE, getGeneralReferrals } from "./src/server_knowledge.js";
import { ActionPlan, CrisisType } from "./src/types.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Resolve paths safely for ESM and CJS alignment
let currentFilename = "";
try {
  if (typeof __filename !== "undefined") {
    currentFilename = __filename;
  } else if (import.meta && import.meta.url) {
    currentFilename = fileURLToPath(import.meta.url);
  }
} catch (e) {
  // Ignored fallback
}

let currentDirname = "";
try {
  if (typeof __dirname !== "undefined") {
    currentDirname = __dirname;
  } else if (currentFilename) {
    currentDirname = path.dirname(currentFilename);
  }
} catch (e) {
  // Ignored fallback
}

// Initialize Gemini Client Lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// 1. Endpoint: Retrieve local law guidelines
app.get("/api/guideline-explorer", (req, res) => {
  res.json({
    topics: TAMIL_NADU_LEGAL_TOPICS,
    referrals: REFERRALS_DATABASE
  });
});

// Dynamic default action plan generators for fallback
function generateFallbackPlan(crisisType: CrisisType, district: string, agreement: string, language: string = "en"): ActionPlan {
  const topic = TAMIL_NADU_LEGAL_TOPICS.find(t => t.id === crisisType) || TAMIL_NADU_LEGAL_TOPICS[0];
  const refs = getGeneralReferrals(district);
  
  const isTa = language === "ta";
  
  const plan: ActionPlan = {
    crisisType: crisisType,
    urgency: crisisType === "lockout" || crisisType === "harassment" ? "critical_24h" : "moderate_7d",
    summary: isTa
      ? `உங்கள் பிரச்சனை '${topic.titleTa || topic.title}' பற்றியது. தற்போதைய தமிழ்நாடு சட்டங்களின் கீழ், உங்களுக்கு குறிப்பிட்ட பாதுகாப்பு நடைமுறைகள் உள்ளன.`
      : `Your situation regards ${topic.title.toLowerCase()}. Under current Tamil Nadu laws, you have specific procedural protections.`,
    tenantRights: isTa && topic.keySectionsTa
      ? topic.keySectionsTa.map(s => `${s.section}: ${s.right} - ${s.explanation}`)
      : topic.keySections.map(s => `${s.section}: ${s.right} - ${s.explanation}`),
    timelineSteps: isTa ? [
      {
        timeframe: "உடனடியாக (அடுத்த 4 மணி நேரத்தில்)",
        title: "வீட்டை விட்டு தானாக வெளியேற வேண்டாம், அனைத்தையும் ஆவணப்படுத்துங்கள்",
        description: "பூட்டுதல் அல்லது பழுதுபார்ப்பு தேவைகளின் புகைப்பட ஆதாரங்களை எடுக்கவும். பூட்டுகளின் நிலை, மீட்டர் பெட்டி, உரையாடல்கள் ஆகியவற்றின் பதிவைப் பேணவும்.",
        priority: "high"
      },
      {
        timeframe: "24 மணி நேரத்திற்குள்",
        title: "எழுத்துப்பூர்வ தகராறு கடிதத்தை எழுதுங்கள் மற்றும் சாட்சிகளைச் சேர்க்கவும்",
        description: "சட்ட விதிகளை (எ.கா. TNRRRLT சட்டம் 2017) மேற்கோள் காட்டி எழுத்துப்பூர்வமாக செய்தி அனுப்பவும். உடல்ரீதியான அல்லது வாய்மொழி வாக்குவாதங்களைத் தவிர்க்கவும்.",
        priority: "high"
      },
      {
        timeframe: "48 மணி நேரத்திற்குள்",
        title: "மனு தாக்கல் செய்யவும் / புகார் விளக்கவும்",
        description: "உள்ளூர் வாடகை அதிகாரியிடம் அவசர விண்ணப்பத்தைச் சமர்ப்பிக்கவும் அல்லது உங்கள் மாவட்ட சட்ட சேவைகள் ஆணையத்தை அணுகவும்.",
        priority: "medium"
      }
    ] : [
      {
        timeframe: "Immediate (Next 4 hours)",
        title: "Do not leave premises voluntarily, document everything",
        description: "Take high-quality photo evidence of lockouts or repair needs. Maintain written record of lock states, meter boxes, and conversations.",
        priority: "high"
      },
      {
        timeframe: "Within 24 Hours",
        title: "Draft written dispute letter & engage witnesses",
        description: "Send a written reply/WhatsApp citing relevant rules (e.g. TNRRRLT Act 2017). Avoid any physical or verbal altercation.",
        priority: "high"
      },
      {
        timeframe: "Within 48 Hours",
        title: "Submit grievance / File petition",
        description: "Apply to the local Rent Authority or consult your district Legal Services Authority for mediation and formal filings.",
        priority: "medium"
      }
    ],
    documentsToGather: isTa ? [
      "எழுத்துப்பூர்வ வாடகை ஒப்பந்தம் அல்லது வரைவு மின்னஞ்சல்கள்",
      "கடந்த 6 மாத வாடகை ரசீதுகள் அல்லது வங்கி பரிமாற்ற அறிக்கைகள்",
      "வாட்ஸ்அப் செய்திகள், எஸ்எம்எஸ் அல்லது நோட்டீஸ் புகைப்படங்கள்",
      "பழுதடைந்த கதவு, குழாய்கள் அல்லது சேதமடைந்த இடங்களின் புகைப்படங்கள்"
    ] : [
      "Any written rental agreements or draft emails",
      "Rent receipts or bank transfer statements of past 6 months",
      "Screenshots of landlord texts, WhatsApp messages, or notice emails",
      "Photos of lock states, broken plumbing, or structural faults"
    ],
    actionsToAvoid: isTa ? [
      "அதிகாரிகள் இல்லாமல் வீட்டை உடைத்து பலவந்தமாக நுழையத் முற்பட வேண்டாம்",
      "வாடகை நீதிமன்றத்தின் முறையான அனுமதி இன்றி வாடகை தருவதை நிறுத்த வேண்டாம்",
      "மிரட்டலின் கீழ் வெற்று ஆவணங்களிலோ அல்லது காலி செய்யும் கடிதங்களிலோ கையெழுத்திட வேண்டாம்"
    ] : [
      "No physical altercation or forceful entries without authorities present",
      "Never stop paying rent without formal approval of the Rent Court or Authority",
      "Do not sign any vacant documents/vacating agreement letters under coercion"
    ],
    referrals: refs,
    letterTemplate: {
      title: isTa ? "சட்டவிரோத இடையூறுக்கு எதிரான பதில் கடிதம்" : "Notice Against Illegal Disruption / Demand for Rights",
      recipient: isTa ? "வீட்டு உரிமையாளர்" : "The Landlord",
      subject: isTa 
        ? `TNRRRLT சட்டம், 2017 இன் படி வாடகை குடியிருப்புக்கான சட்டபூர்வ நடவடிக்கை கோரல்`
        : `Notice for proper process under TNRRRLT Act, 2017 regarding tenancy at your premises`,
      body: isTa ? `மதிப்பிற்குரிய வீட்டு உரிமையாளர் அவர்களுக்கு,\n\nநமது குடியிருப்பு வாடகை தொடர்பாக நான் இந்த கடிதத்தை எழுதுகிறேன். நமது வாடகை ஒப்பந்தம் தமிழ்நாடு வாடகைதாரர்கள் மற்றும் வீட்டு உரிமையாளர்கள் உரிமைகள் மற்றும் பொறுப்புகள் ஒழுங்குமுறைச் சட்டம், 2017 (TNRRRLT Act) இன் விதிகளுக்கு உட்பட்டது என்பதை தாங்கள் அறிவீர்கள்.\n\nஇச்சட்டத்தின் பிரிவு 21 இன் படி, வாடகை நீதிமன்றத்தின் முறையான உத்தரவு இல்லாமல் ஒரு குத்தகைதாரரை வெளியேற்ற முடியாது. மேலும், பிரிவு 20 இன் படி குடிநீர், மின்சாரம் போன்ற அத்தியாவசிய சேவைகளை துண்டிப்பது கடுமையான குற்றமாகும்.\n\nஎனவே சட்டம் மற்றும் ஒப்பந்த விதிகளுக்கு உட்பட்டு நமது பிரச்சினைகளை பேசித் தீர்க்குமாறு கேட்டுக்கொள்கிறேன். எனது நியாயமான வாடகையை உரிய முறையில் செலுத்த நான் தயாராக உள்ளேன். தயவுசெய்து சட்டத்திற்குப் புறம்பான நடவடிக்கைகளைத் தவிர்க்கவும்.\n\nநன்றியுடன்,\nஉங்கள் குத்தகைதாரர்`
        : `Dear Landlord,\n\nI am writing in reference to the immediate tenancy of the premises. As you are aware, our tenancy is governed by the provisions of the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act).\n\nUnder Section 21 of the Act, a tenant cannot be evicted without an explicit order from the Rent Court. Additionally, Section 20 prohibits any disruption to essential services like water and electricity. \n\nI request that we resolve any pending concerns mutually as law-abiding citizens. I am ready to arrange payment transfers of any legitimate dues. Kindly desist from any non-procedural actions.\n\nThank you,\nYour Tenant`
    }
  };

  return plan;
}

// 2. Endpoint: AI-guided housing stability counselor
app.post("/api/chat", async (req, res) => {
  const { messages, userInput, contextState } = req.body;
  const district = contextState?.district || "Chennai";
  const agreement = contextState?.agreement || "verbal";
  const duration = contextState?.duration || "1year";
  const language = contextState?.language || "en";
  const isTa = language === "ta";

  const gemini = getGeminiClient();

  // If no Gemini API Key is injected, fall back to our expert rule-engine response
  if (!gemini) {
    console.info("Gemini client not initialized. Generating advanced legal-grounded local response.");
    // Evaluate the user input to figure out the most suitable category
    let inferredCrisis: CrisisType = "general";
    const textLower = (userInput + " " + (messages?.[messages.length - 1]?.text || "")).toLowerCase();
    
    if (textLower.includes("evict") || textLower.includes("leave") || textLower.includes("vacate") || textLower.includes("notice") || textLower.includes("வெளியேற்ற") || textLower.includes("நோட்டீஸ்")) {
      inferredCrisis = "eviction_notice";
    } else if (textLower.includes("lock") || textLower.includes("key") || textLower.includes("outside") || textLower.includes("locked") || textLower.includes("பூட்டு") || textLower.includes("பூட்டி")) {
      inferredCrisis = "lockout";
    } else if (textLower.includes("water") || textLower.includes("current") || textLower.includes("power") || textLower.includes("cut") || textLower.includes("harass") || textLower.includes("threat") || textLower.includes("தண்ணீர்") || textLower.includes("மின்சாரம்") || textLower.includes("துண்டிப்பு")) {
      inferredCrisis = "harassment";
    } else if (textLower.includes("increase") || textLower.includes("rent") || textLower.includes("money") || textLower.includes("price") || textLower.includes("hike") || textLower.includes("வாடகை உயர்வு") || textLower.includes("பணம்")) {
      inferredCrisis = "rent_hike";
    } else if (textLower.includes("deposit") || textLower.includes("advance") || textLower.includes("withhold") || textLower.includes("return") || textLower.includes("அட்வான்ஸ்") || textLower.includes("முன்பணம்")) {
      inferredCrisis = "deposit_withholding";
    }

    const plan = generateFallbackPlan(inferredCrisis, district, agreement, language);

    let reply = "";
    if (isTa) {
      reply = `**${district}** இல் உள்ள வாடகை வீடு தொடர்பாக நீங்கள் விவரித்தவற்றின் அடிப்படையில், **தமிழ்நாடு வாடகைதாரர்கள் மற்றும் வீட்டு உரிமையாளர்கள் உரிமைகள் மற்றும் பொறுப்புகள் சட்டம் (TNRRRLT), 2017** இன் கீழ் உங்களுக்கு வலுவான சட்டப்பூர்வ உரிமைகள் உள்ளன.\n\n`;
      if (inferredCrisis === "eviction_notice") {
        reply += `**TNRRRLT சட்டம் 2017 பிரிவு 21 இன் கீழ்**, வாடகை நீதிமன்றத்தின் முறையான வெளியேற்ற ஆணை இல்லாமல் உங்களை வீட்டு உரிமையாளர் வெளியேற்ற முடியாது. சில நாட்களுக்குள் காலி செய்யச் சொல்லும் வாய்மொழி அல்லது குறுஞ்செய்தி மிரட்டல்கள் சட்டப்பூர்வமாக செல்லுபடியாகாது. உங்கள் ஒப்பந்தம் **${agreement}** வகையாக இருப்பதால், எழுத்துப்பூர்வமான முறையான ஒப்பந்தத்தை மேற்கொள்ளவும், வாடகை செலுத்தியதற்கான ரசீதை பாதுகாக்கவும் பக்கத்தில் உள்ள 'செயல் திட்டம்' (Action Plan) பகுதியை சரிபார்க்கவும். உங்களைப் பாதுகாக்க தொடர்ந்து வாடகையை வங்கி மூலம் செலுத்தவும்.`;
      } else if (inferredCrisis === "lockout") {
        reply += `⚠️ **அவசரம்:** சட்டவிரோதமாக உங்களை வெளியே பூட்டுவது கடுமையான விதிமீறல் ஆகும். **TNRRRLT சட்டம் 2017 இன் பிரிவு 20 இன் படி**, நீதிமன்ற அனுமதியின்றி உங்களை வெளியே பூட்டவோ அல்லது வாடகையை நிறுத்தவோ வீட்டு உரிமையாளருக்கு அதிகாரம் இல்லை. அவ்வாறு செய்தால், உடனடியாக **காவல் உதவிக்கு (100)** தொடர்பு கொண்டு புகார் செய்யவும், வாடகை அதிகாரியிடம் அவசர மனுவை தயார் செய்யவும்.`;
      } else if (inferredCrisis === "harassment") {
        reply += `**TNRRRLT சட்டம் 2017 இன் பிரிவு 20 இன் கீழ்**, தண்ணீர், மின்சாரம் அல்லது பாதுகாப்பு பூட்டுகளைத் துண்டிப்பது சட்டவிரோதமானது. மனு தாக்கல் செய்த 24 மணி நேரத்திற்குள் அத்தியாவசிய சேவைகளை மீட்டமைக்க வாடகை அதிகாரி உத்தரவிட முடியும். நீங்கள் மேலும் உதவிக்கு **மாநில சட்ட சேவைகள் ஆணையத்தை** 044-25342834 இல் தொடர்பு கொள்ளலாம்.`;
      } else if (inferredCrisis === "rent_hike") {
        reply += `**TNRRRLT சட்டம் 2017 பிரிவு 8 மற்றும் 9 இன் கீழ்**, வாடகை ஒப்பந்தத்தில் குறிப்பிடப்பட்ட விதிமுறைகளின்படியே வாடகை உயர்த்தப்பட வேண்டும். ஒப்பந்தம் முடிந்திருந்தால், வீட்டு உரிமையாளர் 3 மாதங்களுக்கு முன்பு எழுத்துப்பூர்வமாக முறையான அறிவிப்பை தர வேண்டும். உங்களுக்கு இதில் உடன்படவில்லை என்றால், 15 நாட்களுக்குள் உங்கள் ஆட்சேபனையை பதிவு செய்ய வேண்டும், தவறினால் அது ஒப்புக்கொண்டதாகக் கருதப்படும்.`;
      } else if (inferredCrisis === "deposit_withholding") {
        reply += `**TNRRRLT சட்டம் 2017 பிரிவு 11 இன் படி**, முன்பணம் (Deposit) அதிகபட்சமாக **மூன்று மாத வாடகை** மட்டுமே இருக்க வேண்டும். நீங்கள் காலி செய்த ஒரு மாதத்திற்குள் முன்பணத்தை வீட்டு உரிமையாளர் திருப்பித் தந்துவிட வேண்டும். ஒப்பந்தத்தில் முன்கூட்டியே எழுதப்படாத பட்சத்தில், பொதுவான பெயிண்டிங் கட்டணம் என்று அட்வான்சில் பிடிக்க முடியாது.`;
      } else {
        reply += `மேலும் தகுந்த ஆலோசனை வழங்க உங்கள் சூழ்நிலை குறித்து விரிவாகக் கூறவும். உதாரணத்திற்கு:\n1. உங்களுக்கு ஏதேனும் நோட்டீஸ் தரப்பட்டுள்ளதா?\n2. தண்ணீர் அல்லது மின்சாரத் துண்டிப்பு ஏதேனும் உள்ளதா?`;
      }
      reply += `\n\n*குறிப்பு: Gemini API ரகசிய விசை வழங்கப்படாததால், உள்ளூர் தமிழ்நாடு சட்ட விதிகளின் அடிப்படையில் தானியங்கி சட்ட உதவிக் கருவி செயல்படுத்தப்பட்டு உங்கள் செயல் திட்டம் தயாரிக்கப்பட்டுள்ளது.*`;
    } else {
      reply = `Based on what you've described regarding your rental in **${district}**, you may have substantial rights under the **Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants (TNRRRLT) Act, 2017**.\n\n`;
      if (inferredCrisis === "eviction_notice") {
        reply += `Under **Section 21 of the TNRRRLT Act 2017**, your landlord cannot evict you without obtaining a possession order from the Rent Court. Verbal or brief text deadlines of a few days are not legally binding evictions. Since your agreement type is **${agreement}**, please check the detailed Action Plan generated on the side with steps to request a formal agreement and secure rent receipt logs as required under the Act. To protect your tenure, please continue sending rent via bank transaction.`;
      } else if (inferredCrisis === "lockout") {
        reply += `⚠️ **URGENT:** An illegal lockout is a severe direct violation. Under **Section 20 of the TNRRRLT Act 2017**, a landlord is strictly forbidden from disrupting occupancy or locking you out without court execution. If they have done so or are threatening to do so, please contact the local **Police helpline (100)** immediately, file a complaint, and prepare to file an urgent restoration petition with the district Rent Authority.`;
      } else if (inferredCrisis === "harassment") {
        reply += `Under **Section 20 of the TNRRRLT Act 2017**, any disconnection of essential supplies like water, power, or sanitary hookups is illegal. The Rent Authority can issue an order within 24 hours of filing to restore your services and levy penalties on the landlord. You may also consult the **State Legal Services Authority** at 044-25342834 for quick mediation.`;
      } else if (inferredCrisis === "rent_hike") {
        reply += `Under **Section 8 and 9 of the TNRRRLT Act 2017**, rent increases must follow the terms written in your agreement. If the agreement term has concluded, your landlord must deliver a written contract renewal or a 3-month written notice proposing any hike. If you disagree, you must record your written dissent within 15 days to avoid 'deemed consent'.`;
      } else if (inferredCrisis === "deposit_withholding") {
        reply += `Under **Section 11 of the TNRRRLT Act 2017**, security deposits for residential spaces are legally capped at a maximum of **three months' rent**. The landlord is required by law to refund your remaining deposit back to you within one month of taking back possession. General painting deductions are unauthorized unless explicitly agreed in the written contract.`;
      } else {
        reply += `Please let me know more details about what is happening so I can give specific guidance. Let me know:\n1. Have you received any written notices?\n2. Is there any active threat to your utilities?`;
      }
      reply += `\n\n*Note: Since NO Gemini API key was provided in your secrets, I have activated our local legal expert rule-engine based on verified Tamil Nadu legal codex to formulate your action plan instantly.*`;
    }

    return res.json({
      reply,
      plan
    });
  }

  // If Gemini API Key IS provided, utilize Gemini Model
  try {
    const chatHistory = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" as const : "model" as const,
      parts: [{ text: m.text }]
    }));

    const userLanguageInstruction = isTa 
      ? "\n- LANGUAGE RULE (IMPORTANT): The user prefers TAMIL (தமிழ்). Please respond in clear, grammatically correct, warm, and highly supportive modern Tamil language. The 'reply', 'summary', 'tenantRights', 'timelineSteps' (all 'title' and 'description' keys), 'documentsToGather', and 'actionsToAvoid' MUST be written in Tamil, while keeping specific section names or acronyms (like TNRRRLT Act, Section 21) understandable or paired with their English identifiers for legal recognition."
      : "\n- LANGUAGE RULE (IMPORTANT): Respond in clear and supportive English.";

    // System instruction combining Tamil Nadu Tenant knowledge
    const systemInstruction = `You are RentSafe, an AI housing guidance assistant specialized in renters' rights in Tamil Nadu, India.
Your mission is to help renters understand their structural legal rights under the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants (TNRRRLT) Act, 2017 and older acts.

CONTEXT FOR CURRENT SESSION:
- Renter's District: ${district}
- Written Tenancy Agreement: ${agreement} (either "written" or "verbal")
- Resided Duration: ${duration}

TAMIL NADU TENANCY LAWS TO ENFORCE:
1. TNRRRLT Act, 2017 (In force from Feb 2019):
   - Mandatory registration of all rental contracts under written agreement (Section 4).
   - Residential security deposit is capped at a maximum of three months' rent (Section 11). Must be refunded within 1 month.
   - Landlords are prohibited from cutting off water, power, elevators, safety switches (Section 20). Rent Authority can order immediate restoration in 24 hours and levy penalty.
   - Landlord cannot fetch vacant possession/eviction without an official Rent Court eviction decree (Section 21). Specific grounds are required (non-payment, own use, damages, subletting).
2. Transfer of Property Act, 1882 Section 106: Requires 15 days written legal notice to terminate periodic tenancies if not written otherwise.

GUIDELINES:
- Tone: Empathetic, supportive, calm, legal-adjacent advisor.${userLanguageInstruction}
- SAFETY RULE (CRITICAL): Always use soft "may have rights" framing (e.g. "you may have protection under...", "it appears that..."). NEVER say "you qualify", "you are guaranteed to win", "your landlord is definitely in violation".
- CITATIONS: Always cite specific sections (e.g. "Section 21 of TNRRRLT Act, 2017") whenever discussing rights.
- EMERGENCY: If user mentions physical threats or lockout, advise them to immediately contact the local Police helpline (100/112) first.
- Human-in-the-Loop disclaimer: Remind them that RentSafe provides general educational guidance and they must consult a real lawyer or the Legal Services Authority before formal filings.

JSON OUTPUT REQUIREMENT:
You must return your output strictly block-conforming to this JSON schema:
{
  "reply": "Warm, conversational chat reply answering the user directly, citing laws with soft framing.",
  "plan": {
    "crisisType": "eviction_notice" | "lockout" | "harassment" | "maintenance_dispute" | "rent_hike" | "deposit_withholding" | "general",
    "urgency": "critical_24h" | "urgent_48h" | "moderate_7d" | "general",
    "summary": "1-sentence summary of renter situation and primary rights.",
    "tenantRights": ["Citations + explanation of 2-3 specific rights"],
    "timelineSteps": [
      {
        "timeframe": "Immediate (Next 4 hours)",
        "title": "Action title",
        "description": "Specific action guideline description.",
        "priority": "high"
      },
      ...
    ],
    "documentsToGather": ["3-4 documents renter needs to collect"],
    "actionsToAvoid": ["3-4 errors renter must keep clear of"]
  }
}
If the user's message is just general greet and we don't have enough details yet to form a concrete action plan, you can set the "plan" property to null. Once they describe a crisis, generate a robust plan!`;

    const chatResponse = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...chatHistory, { role: "user" as const, parts: [{ text: userInput }] }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "Empathetic text response answering the user."
            },
            plan: {
              type: Type.OBJECT,
              description: "The complete structured action plan, if applicable, otherwise null.",
              properties: {
                crisisType: {
                  type: Type.STRING,
                  enum: ["eviction_notice", "lockout", "harassment", "maintenance_dispute", "rent_hike", "deposit_withholding", "general"]
                },
                urgency: {
                  type: Type.STRING,
                  enum: ["critical_24h", "urgent_48h", "moderate_7d", "general"]
                },
                summary: { type: Type.STRING },
                tenantRights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                timelineSteps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      timeframe: { type: Type.STRING },
                      title: { type: Type.STRING },
                      description: { type: Type.STRING },
                      priority: { type: Type.STRING, enum: ["high", "medium", "low"] }
                    },
                    required: ["timeframe", "title", "description", "priority"]
                  }
                },
                documentsToGather: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                actionsToAvoid: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["crisisType", "urgency", "summary", "tenantRights", "timelineSteps", "documentsToGather", "actionsToAvoid"]
            }
          },
          required: ["reply"]
        }
      }
    });

    const parsedData = JSON.parse(chatResponse.text || "{}");
    
    // Add referrals and sample letter template to the plan if it was generated
    if (parsedData.plan) {
      parsedData.plan.referrals = getGeneralReferrals(district);
      parsedData.plan.letterTemplate = {
        title: parsedData.plan.crisisType === "eviction_notice" ? "Reply to Unprocedural Eviction notice" : "Demand Notice for Tenancy compliance",
        recipient: "The Landlord",
        subject: `Dispute Resolution Demand regarding premises tenancy under Tamil Nadu Regulation Act, 2017`,
        body: `Dear Landlord,\n\nI am writing with respect to our discussion / communication on the state of my tenancy. This communication aims to establish procedurally valid solutions as governed by the Tamil Nadu Regulation of Rights and Responsibilities of Landlords and Tenants Act, 2017 (TNRRRLT Act).\n\nUnder the provisions of the law, specifically Sections 20/21 or Section 11, we are mutual parties to statutory rights and compliance. I wish to maintain a peaceful, compliant, and legally structured arrangement. In the event of any disputes, I request we initiate appropriate consultations with the local Rent Court or District mediation cell, rather than taking direct or self-help measures.\n\nThank you,\nYour Tenant`
      }
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini route error:", error);
    res.status(500).json({ error: "Failed to generate AI stability guide response. " + error.message });
  }
});

// Setup static serving/Vite Dev Server
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server loaded as Express middleware");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static assets from dist folder in production mode");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RentSafe full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic();
