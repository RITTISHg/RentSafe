import React from "react";
import { TAMIL_NADU_DISTRICTS } from "../server_knowledge";
import { translations } from "../translations";

interface QuickFactIntakeProps {
  district: string;
  setDistrict: (val: string) => void;
  agreement: string;
  setAgreement: (val: string) => void;
  duration: string;
  setDuration: (val: string) => void;
  language: "en" | "ta";
}

export default function QuickFactIntake({
  district,
  setDistrict,
  agreement,
  setAgreement,
  duration,
  setDuration,
  language
}: QuickFactIntakeProps) {
  const t = translations[language];

  // District name overrides for Tamil interface
  const tamilDistricts: Record<string, string> = {
    "Chennai": "சென்னை (Chennai)",
    "Coimbatore": "கோயம்புத்தூர் (Coimbatore)",
    "Madurai": "மதுரை (Madurai)",
    "Trichy": "திருச்சி (Trichy)",
    "Salem": "சேலம் (Salem)",
    "Tirunelveli": "திருநெல்வேலி (Tirunelveli)",
    "Vellore": "வேலூர் (Vellore)",
    "Thoothukudi": "தூத்துக்குடி (Thoothukudi)"
  };

  return (
    <div id="quick-fact-intake" className="bg-white border border-[#E5DFD3] rounded-2xl p-5 mb-4 text-[#2C2A27] shadow-sm transition-all duration-300">
      <div className="flex items-center space-x-2.5 mb-3.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#2C4C38] animate-pulse"></div>
        <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#2C4C38]">
          {t.intakeTitle}
        </h2>
      </div>
      <p className="text-xs text-[#6B6359] mb-4 font-sans leading-relaxed">
        {t.intakeSubtitle}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* District Selection */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="district-select" className="text-[10px] font-bold text-[#6B6359] uppercase tracking-wider font-sans">
            {t.locationLabel}
          </label>
          <select
            id="district-select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5DFD3] rounded-xl p-2.5 text-xs text-[#2C2A27] focus:ring-2 focus:ring-[#2C4C38] focus:border-[#2C4C38] transition-all outline-none"
          >
            {TAMIL_NADU_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {language === "ta" ? (tamilDistricts[dist] || dist) : dist}
              </option>
            ))}
          </select>
        </div>

        {/* Lease Agreement Type */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="agreement-select" className="text-[10px] font-bold text-[#6B6359] uppercase tracking-wider font-sans">
            {t.tenancyStatusLabel}
          </label>
          <select
            id="agreement-select"
            value={agreement}
            onChange={(e) => setAgreement(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5DFD3] rounded-xl p-2.5 text-xs text-[#2C2A27] focus:ring-2 focus:ring-[#2C4C38] focus:border-[#2C4C38] transition-all outline-none"
          >
            <option value="verbal">{t.verbalOption}</option>
            <option value="written">{t.writtenOption}</option>
            <option value="written_registered">{t.registeredOption}</option>
          </select>
        </div>

        {/* Resided Duration */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="duration-select" className="text-[10px] font-bold text-[#6B6359] uppercase tracking-wider font-sans">
            {t.tenureLabel}
          </label>
          <select
            id="duration-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#E5DFD3] rounded-xl p-2.5 text-xs text-[#2C2A27] focus:ring-2 focus:ring-[#2C4C38] focus:border-[#2C4C38] transition-all outline-none"
          >
            <option value="months">{t.lessThanYear}</option>
            <option value="1to3years">{t.oneToThreeYears}</option>
            <option value="plus3years">{t.moreThanThreeYears}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
