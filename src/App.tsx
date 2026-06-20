import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Send,
  AlertOctagon,
  BookOpen,
  Calendar,
  Sparkles,
  PhoneCall,
  Search,
  Scale,
  RefreshCw,
  FileText,
  CheckCircle,
  XCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  User,
  Clock,
  Check
} from "lucide-react";
import { Message, ActionPlan, LegalTopic, Referral } from "./types";
import QuickFactIntake from "./components/QuickFactIntake";
import { translations } from "./translations";

export default function App() {
  // Multilingual state switcher
  const [language, setLanguage] = useState<"en" | "ta">("en");
  const t = translations[language];

  // Session Configuration & Tenant attributes
  const [district, setDistrict] = useState("Chennai");
  const [agreement, setAgreement] = useState("verbal");
  const [duration, setDuration] = useState("1year");

  // Legal Database Explorer states (retrieved during App mount)
  const [topics, setTopics] = useState<LegalTopic[]>([]);
  const [allReferrals, setAllReferrals] = useState<Referral[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState<string>("eviction_notice");

  // Chat & AI Engine states
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<ActionPlan | null>(null);

  // Tab State for right panel
  const [activeTab, setActiveTab] = useState<"plan" | "act-explorer" | "referrals">("plan");

  // Utilities
  const [copySuccessMap, setCopySuccessMap] = useState<{ [key: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load Legal guidelines from backend explorer on mount
  useEffect(() => {
    fetch("/api/guideline-explorer")
      .then((res) => res.json())
      .then((data) => {
        if (data.topics) setTopics(data.topics);
        if (data.referrals) setAllReferrals(data.referrals);
      })
      .catch((err) => console.error("Error loading guidelines:", err));
  }, []);

  // Update dynamic welcome message whenever language changes without losing user's thread
  useEffect(() => {
    if (messages.length <= 1) {
      const welcomeText = language === "ta"
        ? "வணக்கம்! 🙏 நான் **ரெண்ட்-சேஃப் (RentSafe)**, உங்கள் AI-மூலம் இயங்கும் வாடகை பாதுகாப்பு மற்றும் தமிழ்நாடு குத்தகைதாரர் உரிமைகள் வழிகாட்டி. மாவட்ட அளவிலான விதிகள் மற்றும் நீதிமன்றங்களின் அடிப்படையில் உங்களுக்குத் தேவையான ஒரு தனிப்பயனாக்கப்பட்ட பாதுகாப்பு திட்டத்தைத் தயாரிக்க நான் உதவுகிறேன்.\n\nஉங்களின் தற்போதைய தகவல்களுக்கு ஏற்ப பரிந்துரைகளைத் தனிப்பயனாக்க மேலே உள்ள **முகப்புத் தகவல் மாறிகள்** குழுவைப் பயன்படுத்தவும், பிறகு ஏதேனும் ஒரு அவசரத் தொல்லைத் தட்டைக் கிளிக் செய்யவும் அல்லது உங்கள் பிரச்சனையை எனக்குத் தெளிவுபடுத்த எழுதி அனுப்பவும்."
        : "Vanakkam! 🙏 I am **RentSafe**, your AI-powered housing stability counselor and tenant rights guide. I help tenants in Tamil Nadu understand their legal rights and prepare an actionable, step-by-step custom stability plan.\n\nUse the **Quick Fact Intake** panel above to tailor recommendations to your district and tenure, then choose a preset concern below or tell me exactly what you are facing.";
      
      setMessages([
        {
          id: "welcome",
          sender: "assistant",
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [language]);

  // Sync scroll on chat updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || userInput;
    if (!textToSend.trim()) return;

    // Append User Message
    const userMessageId = `user-${Date.now()}`;
    const newUserMessage: Message = {
      id: userMessageId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    if (!customText) setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(newUserMessage),
          userInput: textToSend,
          contextState: {
            district,
            agreement,
            duration,
            language // Pass language to customize Gemini/fallback engine output
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to dispatch counselor inquiry");
      }

      const data = await response.json();
      const assistantMessageId = `bot-${Date.now()}`;
      const hasPlan = data.plan;

      const newBotMessage: Message = {
        id: assistantMessageId,
        sender: "assistant",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        plan: hasPlan ? data.plan : undefined,
        isEmergencyAlert: textToSend.toLowerCase().includes("lockout") || textToSend.toLowerCase().includes("threat") || textToSend.toLowerCase().includes("பூட்டு") || textToSend.toLowerCase().includes("மிரட்டல்")
      };

      setMessages((prev) => [...prev, newBotMessage]);

      if (hasPlan) {
        setCurrentPlan(data.plan);
        setActiveTab("plan"); // Auto switch tab to show the customized roadmap
      }
    } catch (error) {
      console.error("Chat dispute process error:", error);
      // Fallback message
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "system",
          text: language === "ta" 
            ? "நிலையான தொடர்புச் சோதனையில் சிக்கல் ஏற்பட்டது. தயவுசெய்து வீட்டை விட்டு தானாக வெளியேற வேண்டாம் அல்லது அவசரப்பட்டு எதிலும் கையெழுத்திட வேண்டாம். உங்கள் கேள்வியை மீண்டும் சமர்ப்பிக்க முயற்சிக்கவும்."
            : "Standard communication check failed. Under legal guidelines, please ensure that you do not voluntarily abandon the premises or sign sudden papers. Try submitting your query again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePresetClick = (presetText: string) => {
    handleSendMessage(presetText);
  };

  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccessMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopySuccessMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Filter local guidelines by search query
  const filteredTopics = topics.filter((topic) => {
    const q = searchQuery.toLowerCase();
    const titleVal = (language === "ta" ? topic.titleTa || topic.title : topic.title).toLowerCase();
    const actVal = topic.mainAct.toLowerCase();
    const matchingSections = topic.keySections.some(s => s.right.toLowerCase().includes(q) || s.explanation.toLowerCase().includes(q));
    return titleVal.includes(q) || actVal.includes(q) || matchingSections;
  });

  return (
    <div id="app-root" className="min-h-screen bg-[#FBF9F6] text-[#2C2A27] flex flex-col font-sans leading-relaxed selection:bg-[#EAE2D5]">
      {/* HEADER SECTION */}
      <header className="border-b border-[#E5DFD3] bg-[#FCFAF7] sticky top-0 z-50 py-3.5 px-4 shadow-sm bg-opacity-95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#2C4C38] flex items-center justify-center shadow-md">
              <Shield className="w-5.5 h-5.5 text-[#FBF9F6]" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="font-display font-bold text-lg tracking-tight text-[#2C4C38]">{t.appTitle}</h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F5F2EB] border border-[#E5DFD3] text-[#6B6359] tracking-wider">
                  TN Tenancy Act 2017
                </span>
              </div>
              <p className="text-xs text-[#6B6359] leading-tight">
                {t.appSubtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Elegant Language Switcher toggling state between EN and TA */}
            <div id="language-switcher" className="bg-[#FAF8F5] border border-[#E5DFD3] p-1 rounded-xl flex items-center space-x-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === "en"
                    ? "bg-[#2C4C38] text-white shadow-sm"
                    : "text-[#6B6359] hover:text-[#2C2A27]"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("ta")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === "ta"
                    ? "bg-[#2C4C38] text-white shadow-sm"
                    : "text-[#6B6359] hover:text-[#2C2A27]"
                }`}
              >
                தமிழ்
              </button>
            </div>

            <span className="flex items-center space-x-1.5 bg-[#FDF3F2] border border-[#F5C2BE] px-3.5 py-1.5 rounded-xl text-xs text-[#9A342B] font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C84F46] animate-ping"></span>
              <span>{language === "ta" ? "அவசர உதவி: 100" : "Emergency Help: Dial 100"}</span>
            </span>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK BANNER */}
      <div className="bg-[#2C4C38] border-b border-[#203728] px-4 py-2 text-center text-xs text-[#F1EFEA] font-medium tracking-wide">
        ✨ {language === "ta" 
          ? "தமிழ்நாடு வாடகைதாரர்கள் உரிமைகள் சட்டம், 2017 மற்றும் சட்டப்பிரிவுகளின் வழிகாட்டுதல். இது வழக்கறிஞர் ஆலோசனையல்ல."
          : "Grounded strictly in the Tamil Nadu Buildings Act, 1960 & TNRRRLT Act, 2017 instructions. General education reference only."}
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE USER FORM & CONVERSATIONAL CONSOLE (SPAN 7) */}
        <div className="lg:col-span-7 flex flex-col space-y-4 h-full">
          
          {/* Section 1: Custom Tenant Attributes Intake */}
          <QuickFactIntake
            district={district}
            setDistrict={setDistrict}
            agreement={agreement}
            setAgreement={setAgreement}
            duration={duration}
            setDuration={setDuration}
            language={language}
          />

          {/* Section 2: Conversational Counselor Area */}
          <div className="bg-white border border-[#E5DFD3] rounded-2xl flex flex-col shadow-sm flex-1 max-h-[660px] min-h-[500px]">
            {/* Header of Chat panel */}
            <div className="border-b border-[#E5DFD3] px-5 py-4 flex items-center justify-between bg-[#FCFAF7] rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-[#2C4C38]/5 border border-[#2C4C38]/10 text-[#2C4C38]">
                  <Sparkles className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-sm text-[#2C2A27]">{t.counselorTitle}</h2>
                  <p className="text-[10px] text-[#6B6359] font-mono tracking-wide">
                    {language === "ta" ? "சக குத்தகைதாரர் அரட்டை" : "Active session"}: {district} ({agreement === "verbal" ? t.verbalOption : agreement === "written" ? t.writtenOption : t.registeredOption})
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const welcomeText = language === "ta"
                    ? "அரட்டை மீட்டமைக்கப்பட்டது. உங்கள் சூழ்நிலையை விவரிக்கவும், தமிழ்நாடு வாடகைதாரர்கள் சட்டங்களின்படி உங்களுக்குத் தேவையான செயல் திட்டங்களை நான் உருவாக்குகிறேன்."
                    : "Session has been reset. Let me know your situation and I will formulate the relevant legal guidelines under the TNRRRLT Act.";
                  setMessages([
                    {
                      id: `welcome-${Date.now()}`,
                      sender: "assistant",
                      text: welcomeText,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ]);
                  setCurrentPlan(null);
                }}
                className="text-xs text-[#6B6359] hover:text-[#2C2A27] flex items-center space-x-1.5 border border-[#E5DFD3] bg-[#FCFAF7] px-3 py-1.5 rounded-xl hover:bg-[#F5F2EB] transition-all font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.clearCase}</span>
              </button>
            </div>

            {/* Chat message streams */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[#2C2A27]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm flex gap-3 shadow-none ${
                      m.sender === "user"
                        ? "bg-[#2C4C38] text-white rounded-tr-none"
                        : m.sender === "system"
                        ? "bg-[#FDF3F2] border border-[#F5C2BE] text-[#9A342B] rounded-tl-none"
                        : "bg-[#F5F2EB] border border-[#E5DFD3] text-[#2C2A27] rounded-tl-none"
                    }`}
                  >
                    {/* Icon for Sender */}
                    <div className="flex-shrink-0 mt-0.5">
                      {m.sender === "user" ? (
                        <div className="w-6 h-6 rounded-full bg-[#1E3527] flex items-center justify-center text-xs font-semibold text-white">
                          <User className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#E5DFD3] flex items-center justify-center text-xs text-[#2C4C38]">
                          <Shield className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1 select-text">
                      {/* Message text */}
                      <div className="max-w-none text-xs md:text-sm whitespace-pre-line leading-relaxed">
                        {m.text}
                      </div>

                      {/* Display Alert indicators if utility block or lockout is present */}
                      {m.isEmergencyAlert && (
                        <div className="mt-2.5 bg-[#FDF3F2] border border-[#F5C2BE] p-3 rounded-xl flex items-start space-x-2 text-[#9A342B] text-xs">
                          <AlertOctagon className="w-4 h-4 text-[#C84F46] flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block text-[#9A342B] mb-0.5">
                              {language === "ta" ? "கவனம் - சட்டப்பூர்வ அச்சுறுத்தல் கண்டறியப்பட்டது:" : "Active Hostility Flagged:"}
                            </span>
                            {language === "ta" 
                              ? "நில உரிமையாளர் உங்களை வெளியேற்ற மிரட்டினாலோ, மின்சாரம்/நீர் துண்டிப்பு செய்தாலோ, உடனடியாக காவல் மற்றும் மாவட்ட வாடகை அதிகாரியிடம் முறையிடவும்." 
                              : "If your landlord initiates sudden pressure tactics, restricts entry, or cuts off utilties, obtain photos immediately and contact Tamil Nadu Police हेल्पलाइन (100) first."}
                          </div>
                        </div>
                      )}

                      <span className={`block text-[10px] text-right mt-1 font-mono ${m.sender === "user" ? "text-emerald-200" : "text-[#8C8375]"}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#F5F2EB] border border-[#E5DFD3] rounded-2xl rounded-tl-none p-4 space-y-2 max-w-[150px] flex items-center space-x-2.5">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-[#2C4C38] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#2C4C38] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-[#2C4C38] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-[11px] text-[#2C4C38] font-bold font-mono">
                      {language === "ta" ? "ஆலோசிக்கிறது..." : "Analyzing..."}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Area: Quick queries click tags */}
            <div className="border-t border-[#E5DFD3] p-4 bg-[#FCFAF7] rounded-b-2xl space-y-3.5">
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#6B6359] uppercase tracking-wider font-bold block">
                  {t.presetTitle}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {t.scenarios.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetClick(preset.text)}
                      className="text-[11px] bg-white border border-[#E5DFD3] rounded-xl py-1.5 px-3 hover:bg-[#FAF8F5] hover:border-[#2C4C38] transition-all cursor-pointer text-[#2C2A27] font-medium text-left shadow-none"
                    >
                      <span className="text-[#2C4C38] font-bold block text-[9px] uppercase tracking-wide">
                        {preset.tag}
                      </span>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Text Bar input */}
              <div className="flex items-center space-x-2 bg-white border border-[#E5DFD3] rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-[#2C4C38] transition-all">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder={t.chatPlaceholder}
                  className="flex-1 bg-transparent border-0 outline-none px-2 text-xs md:text-sm text-[#2C2A27] placeholder-[#8C8375]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-[#2C4C38] hover:bg-[#1E3527] text-white transition-all cursor-pointer flex items-center justify-center shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC ACTION PLAN & LOCAL LAW DICTIONARY TABS (SPAN 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Navigation Tab selection for right display */}
          <div className="bg-[#F5F2EB] border border-[#E5DFD3] rounded-2xl p-1.5 flex space-x-1 shadow-sm">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-bold tracking-wide transition-all uppercase flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#2C4C38] text-white shadow-sm"
                  : "text-[#6B6359] hover:text-[#2C2A27] hover:bg-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.planTab}</span>
              {currentPlan && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("act-explorer")}
              className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-bold tracking-wide transition-all uppercase flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === "act-explorer"
                  ? "bg-[#2C4C38] text-white shadow-sm"
                  : "text-[#6B6359] hover:text-[#2C2A27] hover:bg-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.statuteTab}</span>
            </button>
            <button
              onClick={() => setActiveTab("referrals")}
              className={`flex-1 py-2 px-2 rounded-xl text-[11px] font-bold tracking-wide transition-all uppercase flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === "referrals"
                  ? "bg-[#2C4C38] text-white shadow-sm"
                  : "text-[#6B6359] hover:text-[#2C2A27] hover:bg-white"
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t.referralsTab}</span>
            </button>
          </div>

          {/* DYNAMIC CARD SCROLLING VIEW CONTAINER */}
          <div className="bg-white border border-[#E5DFD3] rounded-2xl p-5 overflow-y-auto max-h-[780px] min-h-[580px] flex flex-col shadow-sm">
            
            {/* TAB CONTENTS: 1. STABILITY ROADMAP PLAN */}
            {activeTab === "plan" && (
              <div className="space-y-5 flex-1 flex flex-col">
                <div className="border-b border-[#E5DFD3] pb-3.5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-[#2C4C38] text-base">{t.planTab}</h3>
                    <p className="text-[10px] text-[#6B6359] mt-0.5 font-mono">
                      {language === "ta" 
                        ? `${district} வட்டாரப் பகுதிக்குத் தயாரிக்கப்பட்டது`
                        : `Targeted guideline output for district: ${district}`}
                    </p>
                  </div>
                  {currentPlan ? (
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase border ${
                      currentPlan.urgency === "critical_24h"
                        ? "bg-[#FDF3F2] text-[#9A342B] border-[#F5C2BE]"
                        : "bg-[#FFF9E6] text-[#7C5A14] border-[#E5D2A3]"
                    }`}>
                      {language === "ta" ? "அவசரம்" : "Urgency"}: {
                        currentPlan.urgency === "critical_24h" ? t.urgencyCritical :
                        currentPlan.urgency === "urgent_48h" ? t.urgencyUrgent :
                        currentPlan.urgency === "moderate_7d" ? t.urgencyModerate : t.urgencyGeneral
                      }
                    </span>
                  ) : null}
                </div>

                {!currentPlan ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E5DFD3] flex items-center justify-center text-[#6B6359]">
                      <Calendar className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#2C2A27]">
                        {language === "ta" ? "செயல் திட்டம் இன்னும் தயார் செய்யப்படவில்லை" : "Stability roadmap not compiled yet"}
                      </p>
                      <p className="text-xs text-[#6B6359] mt-1.5 max-w-[280px] mx-auto leading-relaxed font-sans">
                        {language === "ta" 
                          ? "உங்களுக்கு வாடகை உயர்வு, வெளியேற்றம் அல்லது மின்சாரத் துண்டிப்பு போன்ற விவகாரங்களில் ஆலோசனைகள் பெற இடது பக்க உரையாடல் பெட்டியில் கேள்விகளை விவரிக்கவும்!"
                          : "Interact with our AI Counselor to compile a step-by-step stability roadmap under Tamil Nadu tenancy laws."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Urgency warning banner */}
                    <div className="bg-[#FAF8F5] border border-[#E5DFD3] p-4 rounded-xl space-y-1 text-xs">
                      <span className="font-bold text-[#2C4C38] text-xs block">{t.crisisSummary}:</span>
                      <p className="text-[#6B6359] italic">"{currentPlan.summary}"</p>
                    </div>

                    {/* Step-by-Step Chronological Timeline */}
                    <div className="space-y-4">
                      <h4 className="text-xs uppercase text-[#2C4C38] tracking-widest font-mono font-bold flex items-center space-x-1.5 border-b border-[#E5DFD3] pb-2">
                        <Clock className="w-4 h-4" />
                        <span>{t.actionTimelineTitle}</span>
                      </h4>
                      
                      <div className="space-y-5 border-l-2 border-[#E5DFD3] pl-4 ml-2">
                        {currentPlan.timelineSteps.map((step, idx) => (
                          <div key={idx} className="relative space-y-1">
                            {/* Dot mark */}
                            <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#2C4C38] border-2 border-white shadow-sm"></span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F2EB] text-[#6B6359] border border-[#E5DFD3]">
                                {step.timeframe}
                              </span>
                              <span className={`text-[9px] uppercase font-bold tracking-wide ${
                                step.priority === "high" ? "text-[#C84F46]" : "text-[#D9822B]"
                              }`}>
                                {step.priority === "high" ? t.priorityHigh : step.priority === "medium" ? t.priorityMedium : t.priorityLow}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-[#2C2A27]">{step.title}</h5>
                            <p className="text-xs text-[#6B6359] leading-relaxed font-sans">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Renters rights references in target plan */}
                    <div className="space-y-3">
                      <h4 className="text-xs uppercase text-[#2C4C38] tracking-widest font-mono font-bold flex items-center space-x-1.5 border-b border-[#E5DFD3] pb-2">
                        <Scale className="w-4 h-4" />
                        <span>{language === "ta" ? "பொருந்தும் வாடகைதாரர் உரிமைகள் சட்டப்பிரிவு" : "Tenancy Protections Applied"}</span>
                      </h4>
                      <ul className="space-y-2">
                        {currentPlan.tenantRights.map((right, idx) => (
                          <li key={idx} className="bg-[#FCFAF7] border border-[#E5DFD3] p-3 rounded-xl text-[#2C2A27] text-xs flex items-start space-x-2.5 shadow-none">
                            <span className="text-[10px] text-[#2C4C38] font-bold font-mono mt-0.5 px-1.5 py-0.5 rounded bg-[#F5F2EB] border border-[#E5DFD3]">
                              #{idx + 1}
                            </span>
                            <span className="leading-relaxed font-sans">{right}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to gather / What to avoid columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Gather file evidence list */}
                      <div className="space-y-2.5 bg-[#FAF8F5]/60 border border-[#E5DFD3] p-4 rounded-xl">
                        <h5 className="text-xs font-bold text-[#2C4C38] flex items-center space-x-1 pb-1 border-b border-[#E5DFD3]">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.documentsHeading}</span>
                        </h5>
                        <ul className="space-y-1.5 mt-2">
                          {currentPlan.documentsToGather.map((item, idx) => (
                            <li key={idx} className="text-xs text-[#2C2A27] flex items-start space-x-1">
                              <span className="text-emerald-700 font-bold mr-1">•</span>
                              <span className="font-sans leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Displaced list metrics */}
                      <div className="space-y-2.5 bg-[#FDF3F2] border border-[#F5C2BE] p-4 rounded-xl">
                        <h5 className="text-xs font-bold text-[#9A342B] flex items-center space-x-1 pb-1 border-b border-[#F5C2BE]">
                          <XCircle className="w-3.5 h-3.5 text-[#C84F46]" />
                          <span>{t.avoidHeading}</span>
                        </h5>
                        <ul className="space-y-1.5 mt-2">
                          {currentPlan.actionsToAvoid.map((item, idx) => (
                            <li key={idx} className="text-xs text-[#2C2A27] flex items-start space-x-1">
                              <span className="text-[#C84F46] font-bold mr-1">•</span>
                              <span className="font-sans leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Printable/Copyable Rent dispute Letter template helper */}
                    {currentPlan.letterTemplate && (
                      <div className="border border-[#E5DFD3] rounded-2xl bg-[#FCFAF7] p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-[#2C4C38]" />
                            <h5 className="text-xs font-bold text-[#2C4C38] font-mono">{t.letterHeading}</h5>
                          </div>
                          <button
                            onClick={() => triggerCopy(currentPlan.letterTemplate!.body, "formal_letter")}
                            className="bg-[#2C4C38] text-white hover:bg-[#1E3527] transition-all rounded-xl px-3 py-1.5 text-[10px] font-bold flex items-center space-x-1 shadow-sm"
                          >
                            {copySuccessMap["formal_letter"] ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-300" />
                                <span>{t.copiedBtn}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{t.copyBtn}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-[#6B6359] leading-relaxed font-sans">
                          {language === "ta" 
                            ? "இந்த கடித வரைவை நகலெடுத்து, உங்கள் பெயர், கையொப்பத் தேதி போன்ற விவரங்களுடன் வீட்டு உரிமையாளருக்கு முறையான ஆவணமாக அனுப்பலாம்."
                            : "Challenge an unprocedural lock or vacate demand politely in writing. Modify this letter with proper dates and names."}
                        </p>
                        
                        <div className="bg-white border border-[#E5DFD3] p-4 rounded-xl text-xs font-mono text-[#2C2A27] max-h-[200px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                          <strong>{currentPlan.letterTemplate.title}</strong>{"\n"}
                          To: {currentPlan.letterTemplate.recipient}{"\n"}
                          Subject: {currentPlan.letterTemplate.subject}{"\n\n"}
                          {currentPlan.letterTemplate.body}
                        </div>
                      </div>
                    )}

                    {/* Tenant support message disclaimer container */}
                    <div className="bg-[#FFF9E6] border border-[#E5D2A3] p-4 rounded-xl text-xs text-[#7C5A14] leading-relaxed font-serif">
                      <strong>⚠️ {language === "ta" ? "பாதுகாப்பு மறுப்புரை எச்சரிக்கை:" : "Disclaimer Notice Checklist:"}</strong> {t.factDisclaimer}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENTS: 2. TN ACT EXPLORER LAW DICTIONARY */}
            {activeTab === "act-explorer" && (
              <div className="space-y-4 flex-1 flex flex-col">
                <div>
                  <h3 className="font-display font-semibold text-[#2C4C38] text-base">{t.statuteTab}</h3>
                  <p className="text-xs text-[#6B6359] mt-0.5">
                    {language === "ta" 
                      ? "தமிழ்நாடு வாடகைதாரர் சட்டம், 2017 இன் அசல் பிரிவுகள் மற்றும் அடிக்கடி கேட்கப்படும் கேள்விகளின் தரவுத்தளம்."
                      : "Grounded codified lookup database of the Tamil Nadu Rent Control Act & TNRRRLT Act, 2017."}
                  </p>
                </div>

                {/* Law library search input */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#8C8375]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-[#FAF8F5] border border-[#E5DFD3] rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#2C2A27] outline-none focus:ring-2 focus:ring-[#2C4C38] transition-all"
                  />
                </div>

                {/* Grid layout filter items */}
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  {/* Topic list selections */}
                  <div className="md:w-1/3 flex flex-row md:flex-col overflow-auto md:overflow-visible gap-1.5 md:border-r border-[#E5DFD3] md:pr-3">
                    {filteredTopics.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTopicId(t.id)}
                        className={`text-left py-2 px-3 rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap md:whitespace-normal block ${
                          selectedTopicId === t.id
                            ? "bg-[#FAF8F5] text-[#2C4C38] border-l-4 border-[#2C4C38]"
                            : "text-[#6B6359] hover:text-[#2C2A27] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        {language === "ta" ? t.titleTa || t.title : t.title}
                      </button>
                    ))}
                    {filteredTopics.length === 0 && (
                      <p className="text-[11px] text-[#8C8375] italic p-2">{t.noMatches}</p>
                    )}
                  </div>

                  {/* Topic Details body container */}
                  <div className="flex-1 space-y-4 min-h-[300px]">
                    {topics
                      .filter((topic) => topic.id === selectedTopicId)
                      .map((topic) => {
                        const titleText = language === "ta" ? topic.titleTa || topic.title : topic.title;
                        const subtitleText = language === "ta" ? topic.subtitleTa || topic.subtitle : topic.subtitle;
                        const sectionsList = language === "ta" ? topic.keySectionsTa || topic.keySections : topic.keySections;
                        const faqsList = language === "ta" ? topic.faqsTa || topic.faqs : topic.faqs;

                        return (
                          <div key={topic.id} className="space-y-4">
                            <div className="border-b border-[#E5DFD3] pb-3">
                              <h4 className="text-sm font-bold text-[#2C4C38]">{titleText}</h4>
                              <p className="text-xs text-[#6B6359] mt-1 font-sans">{subtitleText}</p>
                              <span className="text-[10px] font-bold font-mono text-[#2C4C38] block mt-2.5 bg-[#FAF8F5] border border-[#E5DFD3] px-2.5 py-1.5 rounded-xl">
                                {t.mainActLabel}: {topic.mainAct}
                              </span>
                            </div>

                            {/* Key sections display */}
                            <div className="space-y-2.5">
                              <h5 className="text-[10px] uppercase font-mono text-[#6B6359] font-bold tracking-wider">{t.keySectionsLabel}</h5>
                              {sectionsList.map((sec, i) => (
                                <div key={i} className="bg-[#FCFAF7] border border-[#E5DFD3] p-3 rounded-xl space-y-1 text-xs">
                                  <span className="font-mono text-[#2C4C38] font-bold block">{sec.section}</span>
                                  <h6 className="font-bold text-[#2C2A27]">{sec.right}</h6>
                                  <p className="text-[#6B6359] leading-relaxed font-sans mt-0.5">{sec.explanation}</p>
                                </div>
                              ))}
                            </div>

                            {/* Topic FAQs */}
                            <div className="space-y-2.5">
                              <h5 className="text-[10px] uppercase font-mono text-[#6B6359] font-bold tracking-wider">{t.faqHeading}</h5>
                              {faqsList.map((faq, idx) => (
                                <div key={idx} className="bg-[#F5F2EB]/40 border border-[#E5DFD3] p-3.5 rounded-xl space-y-2 text-xs">
                                  <span className="font-bold text-[#2C4C38] block">Q: {faq.question}</span>
                                  <p className="text-[#6B6359] leading-relaxed font-sans">A: {faq.answer}</p>
                                  <span className="text-[10px] text-[#2C4C38] block bg-white p-2 rounded-lg border border-[#E5DFD3] font-mono leading-relaxed shadow-sm">
                                    💡 <strong>{t.rightsTip}:</strong> {faq.tip}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENTS: 3. NEAREST SUPPORT & HELP REGISTRAR */}
            {activeTab === "referrals" && (
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="font-display font-semibold text-[#2C4C38] text-base">{t.referralsTab}</h3>
                  <p className="text-xs text-[#6B6359] mt-0.5">
                    {language === "ta" 
                      ? "மாவட்ட வாரியாக நியமிக்கப்பட்ட வாடகை அதிகாரிகள், இலவச சட்ட உதவி மையங்கள் மற்றும் அரசு உதவி எண் அடைவு."
                      : "Free directory of District Legal Services authorities, Police offices, and state administrative bodies."}
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-[#FFF9E6] border border-[#E5D2A3] p-4 rounded-xl text-xs text-[#7C5A14] leading-relaxed font-serif">
                    📌 <strong>{language === "ta" ? "முக்கிய குறிப்பு:" : "Strategic Notice:"}</strong> {
                      language === "ta"
                        ? "தமிழ்நாடு வாடகை ஒழுங்குமுறைச் சட்டம் 2017 இன் பிரிவு 20 மற்றும் 21 இன் கீழ், வாடகை அச்சுறுத்தல்/முறைகேடு போன்ற புகார்களை அந்தந்த மாவட்ட வாடகை அதிகாரிக்கு (Rent Authority / RDO) மட்டுமே நேரடியாகச் சமர்ப்பிக்க முடியும்."
                        : "Under Section 20/21 of the TNRRRLT Act 2017, all tenant harassment/interruption filings are submitted to the Rent Authority (Sub-Collector/RDO) of your respective district area."
                    }
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {allReferrals.map((ref, idx) => {
                      const isEmergency = ref.type === "Police Helpline";
                      return (
                        <div
                          key={idx}
                          className={`border rounded-2xl p-4 space-y-2.5 text-xs transition-colors ${
                            isEmergency
                              ? "bg-[#FDF3F2] border-[#F5C2BE] text-[#9A342B]"
                              : "bg-[#FCFAF7] border-[#E5DFD3] text-[#2C2A27]"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded-lg tracking-wider font-bold ${
                                isEmergency
                                  ? "bg-[#C84F46] text-white"
                                  : "bg-[#2C4C38]/10 text-[#2C4C38]"
                              }`}>
                                {isEmergency && language === "ta" ? "காவல்/அவசர உதவி எண்" : ref.type}
                              </span>
                              <h4 className="font-bold text-[#2C2A27] mt-1.5">{ref.name}</h4>
                              {ref.district && (
                                <span className="text-[9px] font-mono text-[#6B6359] block mt-0.5">
                                  {language === "ta" ? "பகுதி வரம்பு" : "Location Jurisdiction"}: {ref.district}
                                </span>
                              )}
                            </div>
                            
                            <a
                              href={`tel:${ref.phone}`}
                              className="bg-[#2C4C38] hover:bg-[#1E3527] text-white rounded-xl p-2.5 flex items-center justify-center transition-all shadow-sm"
                              title={`Call ${ref.name}`}
                            >
                              <PhoneCall className="w-3.5 h-3.5" />
                            </a>
                          </div>

                          <p className="text-xs text-[#6B6359] leading-relaxed font-sans">{ref.details}</p>

                          <div className="border-t border-[#E5DFD3] pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#6B6359]">
                            {ref.phone && (
                              <span>
                                📞 {language === "ta" ? "தொலைபேசி" : "Phone"}: <strong>{ref.phone}</strong>
                              </span>
                            )}
                            {ref.address && (
                              <span>
                                📍 {language === "ta" ? "முகவரி" : "Address"}: {ref.address}
                              </span>
                            )}
                            {ref.website && (
                              <a
                                href={ref.website}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#2C4C38] hover:underline font-bold flex items-center space-x-0.5"
                              >
                                <span>{language === "ta" ? "இணையதளம்" : "Official Site"}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-[#FCFAF7] border-t border-[#E5DFD3] text-center py-4 px-4 text-[#8C8375] text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="font-sans">
            © {new Date().getFullYear()} {language === "ta" ? "ரெண்ட்-சேஃப் (RentSafe) — தமிழ்நாடு வாடகைதாரர் நல பாதுகாப்பு தளம்." : "RentSafe — Developed in strict compliance with Tamil Nadu Tenancy Codes."}
          </p>
          <div className="flex space-x-4">
            <span className="text-[10px] text-[#8C8375] font-mono">{language === "ta" ? "அனைத்து விவாதங்களும் கிளையன்ட்-மட்டும் பகிரக்கூடியவை." : "No personal data stored. Fully sandboxed and offline-first."}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
