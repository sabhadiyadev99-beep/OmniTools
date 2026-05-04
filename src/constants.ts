import { 
  Instagram, 
  Video, 
  Zap, 
  Hash, 
  User, 
  Briefcase, 
  MessageSquare, 
  Store, 
  Reply, 
  FileText, 
  Heart, 
  Flame, 
  Frown, 
  Scissors, 
  Music, 
  Calendar, 
  Smile, 
  QrCode, 
  Image as ImageIcon, 
  Lock 
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  category: "Creator" | "Business" | "Relationship" | "Utility";
  description: string;
  icon: any;
  path: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export const tools: Tool[] = [
  // Creator Tools
  {
    id: "insta-caption",
    name: "Instagram Caption Generator",
    category: "Creator",
    description: "Generate engaging captions for your Instagram posts instantly.",
    icon: Instagram,
    path: "/creator/instagram-caption-generator",
    seoTitle: "Free Instagram Caption Generator | OmniTools",
    seoDescription: "Create viral Instagram captions with our AI-powered generator. Boost your engagement today.",
    keywords: ["instagram marketing", "social media growth", "viral captions", "engagement tips", "content creator tools"]
  },
  {
    id: "reel-script",
    name: "Reel Script Generator",
    category: "Creator",
    description: "Viral hook + body + CTA for your next short-form video.",
    icon: Video,
    path: "/creator/reel-script-generator",
    seoTitle: "Viral Reel Script Generator | Short Video Scripts",
    seoDescription: "Professional scripts for Reels and TikToks. Hook your audience with ease.",
    keywords: ["tiktok scripts", "video marketing", "content hooks", "short form video", "viral video ideas"]
  },
  {
    id: "hook-gen",
    name: "Hook Generator",
    category: "Creator",
    description: "Stop the scroll with powerful opening lines for your content.",
    icon: Zap,
    path: "/creator/hook-generator",
    seoTitle: "Powerful Hook Generator for Social Media",
    seoDescription: "Get more views with scroll-stopping hooks for YouTube, Instagram, and more.",
    keywords: ["copywriting hooks", "headline generator", "attention grabbing", "sales hooks", "marketing copy"]
  },
  {
    id: "hashtag-gen",
    name: "Hashtag Generator",
    category: "Creator",
    description: "Discover trending and relevant hashtags for better reach.",
    icon: Hash,
    path: "/creator/hashtag-generator",
    seoTitle: "Smart Hashtag Generator | Viral Hashtags",
    seoDescription: "Find the best hashtags to grow your social media presence organically.",
    keywords: ["hashtag strategy", "instagram growth", "seo for social media", "trending tags", "tag finder"]
  },
  {
    id: "bio-gen",
    name: "Bio Generator",
    category: "Creator",
    description: "Craft a professional and catchy bio for any social platform.",
    icon: User,
    path: "/creator/bio-generator",
    seoTitle: "Professional Bio Generator | Social Media Bios",
    seoDescription: "Optimize your profile with a bio that converts followers into fans.",
    keywords: ["profile optimization", "brand bio", "instagram bio ideas", "professional summary", "about me generator"]
  },

  // Business Tools
  {
    id: "offer-msg",
    name: "Offer Message Generator",
    category: "Business",
    description: "Create persuasive sales messages that close deals.",
    icon: Briefcase,
    path: "/business/offer-message-generator",
    seoTitle: "Sales Offer Message Generator | Fast & Effective",
    seoDescription: "Write high-converting sales offers for emails, LinkedIn, or cold calling.",
    keywords: ["sales funnel", "cold email template", "closing deals", "business growth", "outreach message"]
  },
  {
    id: "wa-broadcast",
    name: "WhatsApp Broadcast Generator",
    category: "Business",
    description: "Send professional broadcast messages to your customers.",
    icon: MessageSquare,
    path: "/business/whatsapp-broadcast-generator",
    seoTitle: "WhatsApp Business Message Generator",
    seoDescription: "Create professional WhatsApp broadcast templates for your customers.",
    keywords: ["whatsapp marketing", "customer retention", "broadcast lists", "business automation", "support messages"]
  },
  {
    id: "biz-name",
    name: "Business Name Generator",
    category: "Business",
    description: "Unique and catchy names for your next startup or brand.",
    icon: Store,
    path: "/business/business-name-generator",
    seoTitle: "Free Brand & Business Name Generator",
    seoDescription: "Find the perfect name for your business with our AI naming tool.",
    keywords: ["startup names", "branding", "domain name ideas", "company naming", "identity design"]
  },
  {
    id: "review-reply",
    name: "Review Reply Generator",
    category: "Business",
    description: "Professional replies to customer reviews (Good or Bad).",
    icon: Reply,
    path: "/business/review-reply-generator",
    seoTitle: "AI Review Reply Generator | Customer Support",
    seoDescription: "Respond to customer reviews professionally and improve your business reputation.",
    keywords: ["reputation management", "customer service", "google reviews", "rating response", "feedback loop"]
  },
  {
    id: "invoice-gen",
    name: "Invoice Generator",
    category: "Business",
    description: "Simple, clean, and downloadable PDF invoices for free.",
    icon: FileText,
    path: "/business/invoice-builder",
    seoTitle: "Simple Online Invoice Generator | PDF Export",
    seoDescription: "Create and download professional PDF invoices in seconds. No login required.",
    keywords: ["freelance tools", "billing software", "pdf invoice", "accounting basics", "tax forms"]
  },

  // Relationship Tools
  {
    id: "chat-reply",
    name: "Chat Reply Generator",
    category: "Relationship",
    description: "Never leave them on read again with clever chat replies.",
    icon: MessageSquare,
    path: "/fun/chat-reply-generator",
    seoTitle: "Clever Chat Reply Generator | Relationship Tips",
    seoDescription: "Get the perfect response for any conversation or situation.",
    keywords: ["conversation starters", "texting tips", "social skills", "relationship advice", "chatting hacks"]
  },
  {
    id: "flirty-msg",
    name: "Flirty Message Generator",
    category: "Relationship",
    description: "Sweet and spicy messages for your crush or partner.",
    icon: Flame,
    path: "/fun/flirty-message-generator",
    seoTitle: "Flirty Message Generator | Romantic Quotes",
    seoDescription: "Spice things up with creative flirty messages for your partner.",
    keywords: ["pick up lines", "romance", "dating tips", "love quotes", "creative texting"]
  },
  {
    id: "sorry-msg",
    name: "Sorry Message Generator",
    category: "Relationship",
    description: "Sincere apologies to fix things when you've messed up.",
    icon: Frown,
    path: "/fun/sorry-message-generator",
    seoTitle: "Apology Message Generator | Sincere Sorry Notes",
    seoDescription: "Find the right words to apologize and make amends effectively.",
    keywords: ["apology letters", "resolving conflict", "emotional intelligence", "fixing relationships", "sincere notes"]
  },
  {
    id: "breakup-msg",
    name: "Breakup Message Generator",
    category: "Relationship",
    description: "Kind and clear ways to end a relationship respectfully.",
    icon: Scissors,
    path: "/fun/breakup-message-generator",
    seoTitle: "Kind Breakup Message Generator | Relationship Closure",
    seoDescription: "End things respectfully with our guided breakup message creator.",
    keywords: ["ending relationships", "closure", "mental health", "kind messages", "moving on"]
  },
  {
    id: "shayari-gen",
    name: "Shayari Generator",
    category: "Relationship",
    description: "Beautiful Shayari and poetic lines for every mood.",
    icon: Music,
    path: "/fun/shayari-generator",
    seoTitle: "AI Shayari Generator | Romantic & Sad Shayari",
    seoDescription: "Generate original Shayari in Hindi/English for any occasion.",
    keywords: ["poetry", "hindi shayari", "creative writing", "emotional shayari", "love poetry"]
  },

  // Utility Tools
  {
    id: "festival-caption",
    name: "Festival Caption Generator",
    category: "Utility",
    description: "Celebration-ready captions for every holiday and festival.",
    icon: Calendar,
    path: "/utility/festival-caption-generator",
    seoTitle: "Festival & holiday Caption Generator",
    seoDescription: "Get the perfect caption for Diwali, Christmas, Holi, and more.",
    keywords: ["holiday marketing", "celebration quotes", "event planning", "seasonal content", "social media calendar"]
  },
  {
    id: "text-emoji",
    name: "Text to Emoji Converter",
    category: "Utility",
    description: "Express your text purely through relevant emojis.",
    icon: Smile,
    path: "/utility/text-to-emoji",
    seoTitle: "Text to Emoji Converter | Emojify Your Text",
    seoDescription: "Turn your sentences into fun emoji-only messages instantly.",
    keywords: ["fun texting", "emoji art", "visual communication", "creative text", "emoji translator"]
  },
  {
    id: "qr-gen",
    name: "QR Code Generator",
    category: "Utility",
    description: "Create custom QR codes for links, text, or Wi-Fi.",
    icon: QrCode,
    path: "/utility/qr-code-generator",
    seoTitle: "Free Online QR Code Generator | No Expiry",
    seoDescription: "Generate high-quality QR codes for your business or personal use.",
    keywords: ["qr marketing", "contactless", "business links", "dynamic qr", "scan to web"]
  },
  {
    id: "img-compressor",
    name: "Image Compressor",
    category: "Utility",
    description: "Reduce image file size without losing much quality.",
    icon: ImageIcon,
    path: "/utility/image-compressor",
    seoTitle: "Free Image Compressor | Shrink Images Online",
    seoDescription: "Compress PNG and JPG images directly in your browser for free.",
    keywords: ["web performance", "optimize images", "file size reducer", "fast loading", "image tools"]
  },
  {
    id: "pass-gen",
    name: "Password Generator",
    category: "Utility",
    description: "Ultra-secure random passwords to keep you safe online.",
    icon: Lock,
    path: "/utility/password-generator",
    seoTitle: "Secure Password Generator | Strong Passwords",
    seoDescription: "Generate complex, unhackable passwords instantly.",
    keywords: ["cybersecurity", "privacy", "secure login", "random pass", "data protection"]
  },
];
