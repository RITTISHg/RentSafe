export type CrisisType =
  | "eviction_notice"
  | "lockout"
  | "harassment"
  | "maintenance_dispute"
  | "rent_hike"
  | "deposit_withholding"
  | "general";

export type UrgencyLevel = "critical_24h" | "urgent_48h" | "moderate_7d" | "general";

export interface Referral {
  name: string;
  type: "Rent Authority" | "Rent Tribunal" | "Legal Services Authority" | "Police Helpline" | "NGO Support";
  details: string;
  phone: string;
  address?: string;
  district?: string;
  website?: string;
}

export interface TimelineStep {
  timeframe: string; // e.g. "Immediate (Next 4 hours)", "Within 24 Hours", "Within 48 Hours", "Next 7 Days"
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface LetterTemplate {
  title: string;
  recipient: string;
  subject: string;
  body: string;
}

export interface ActionPlan {
  crisisType: CrisisType;
  urgency: UrgencyLevel;
  summary: string;
  tenantRights: string[]; // Legal citations with plain language explanations
  timelineSteps: TimelineStep[];
  documentsToGather: string[];
  actionsToAvoid: string[];
  referrals: Referral[];
  letterTemplate?: LetterTemplate;
}

export interface Message {
  id: string;
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
  plan?: ActionPlan;
  isEmergencyAlert?: boolean;
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface IntakeQuestion {
  id: string;
  text: string;
  options?: QuestionOption[];
  placeholder?: string;
  category: "district" | "agreement_type" | "notice" | "duration";
}

export interface LegalTopic {
  id: CrisisType;
  title: string;
  subtitle: string;
  mainAct: string;
  keySections: Array<{ section: string; right: string; explanation: string }>;
  faqs: Array<{ question: string; answer: string; tip: string }>;
  titleTa?: string;
  subtitleTa?: string;
  keySectionsTa?: Array<{ section: string; right: string; explanation: string }>;
  faqsTa?: Array<{ question: string; answer: string; tip: string }>;
}
