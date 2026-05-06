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
    seoTitle: "Free Instagram Caption Generator | ToolVanta",
    seoDescription: "Create viral Instagram captions with our AI-powered generator. Boost your engagement today.",
    keywords: ["instagram marketing", "social media growth", "viral captions", "engagement tips", "content creator tools"]
  },
  {
    id: "funny-insta-caption",
    name: "Funny Instagram Captions Generator",
    category: "Creator",
    description: "Create funny and witty Instagram captions instantly.",
    icon: Instagram,
    path: "/creator/funny-instagram-caption-generator",
    seoTitle: "Free Funny Instagram Captions Generator Online",
    seoDescription: "Create funny Instagram captions instantly with our free tool. Perfect for reels, memes, and posts. No login needed.",
    keywords: ["funny captions", "instagram humor", "witty captions", "meme captions", "social media jokes"]
  },
  {
    id: "short-insta-caption",
    name: "Short Instagram Captions Generator",
    category: "Creator",
    description: "Create quick and catchy short Instagram captions instantly.",
    icon: Instagram,
    path: "/creator/short-instagram-caption-generator",
    seoTitle: "Short Instagram Captions – Free & Instant Tool",
    seoDescription: "Create catchy short Instagram captions instantly with our free tool. Perfect for selfies, travel, and daily posts. No login needed.",
    keywords: ["short captions", "insta captions", "catchy captions", "quick captions", "social media tips"]
   },
   {
    id: "reel-caption",
    name: "Captions for Reels Generator",
    category: "Creator",
    description: "Create catchy and engaging captions for your Instagram Reels.",
    icon: Instagram,
    path: "/creator/captions-for-reels-generator",
    seoTitle: "Captions for Reels – Free Instagram Caption Generator",
    seoDescription: "Create catchy and engaging captions for your Instagram Reels instantly with our free tool. Boost your engagement today. No login needed.",
    keywords: ["reel captions", "instagram reels", "catchy captions", "engagement boost", "short video captions"]
  },
  {
    id: "boy-insta-caption",
    name: "Captions for Boys Generator",
    category: "Creator",
    description: "Create the perfect captions for boys instantly.",
    icon: Instagram,
    path: "/creator/captions-for-boys-generator",
    seoTitle: "Captions for Boys – Free Instagram Caption Generator",
    seoDescription: "Create the perfect captions for boys instantly with our free tool. Whether you want something cool, funny, or bold, get ready-to-use ideas instantly. No login needed.",
    keywords: ["boys captions", "cool captions", "attitude captions", "boys attitude", "social media for boys"]
  },
  {
    id: "girl-insta-caption",
    name: "Captions for Girls Generator",
    category: "Creator",
    description: "Create perfect and classy captions for girls instantly.",
    icon: Instagram,
    path: "/creator/captions-for-girls-generator",
    seoTitle: "Captions for Girls – Free Instagram Caption Generator",
    seoDescription: "Create the perfect captions for girls instantly with our free tool. Whether you want something cute, bold, classy, or funny, get ready-to-use ideas instantly. No login needed.",
    keywords: ["girls captions", "cute captions", "classy captions", "girls attitude", "social media for girls"]
  },
  {
    id: "attitude-insta-caption",
    name: "Attitude Instagram Captions Generator",
    category: "Creator",
    description: "Create bold and catchy attitude captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/attitude-instagram-caption-generator",
    seoTitle: "Attitude Captions Instagram – Free Generator Tool",
    seoDescription: "Create bold and catchy attitude captions for Instagram instantly with our free tool. Show your confidence and style. No login needed.",
    keywords: ["attitude captions", "savage captions", "boss captions", "bold captions", "instagram confidence"]
  },
  {
    id: "love-insta-caption",
    name: "Love Instagram Captions Generator",
    category: "Creator",
    description: "Create beautiful and romantic love captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/love-instagram-caption-generator",
    seoTitle: "Love Captions Instagram Generator (Free & Instant)",
    seoDescription: "Create beautiful, catchy, and emotional love captions for Instagram instantly with our free tool. Perfect for couples, anniversaries, and crushes. No login needed.",
    keywords: ["love captions", "romantic captions", "couple captions", "cute captions", "instagram romance"]
  },
  {
    id: "sad-insta-caption",
    name: "Sad Instagram Captions Generator",
    category: "Creator",
    description: "Create deep and emotional sad captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/sad-instagram-caption-generator",
    seoTitle: "Sad Captions Instagram Generator",
    seoDescription: "Create deep and emotional sad captions for Instagram instantly with our free tool. Perfect for breakup, lonely mood, and emotional stories. No login needed.",
    keywords: ["sad captions", "emotional captions", "lonely captions", "heartbreak captions", "instagram mood"]
  },
  {
    id: "gym-insta-caption",
    name: "Gym Instagram Captions Generator",
    category: "Creator",
    description: "Create powerful and motivational gym captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/gym-instagram-caption-generator",
    seoTitle: "Free Gym Captions Instagram Generator",
    seoDescription: "Create powerful and motivational gym captions for Instagram instantly with our free tool. Perfect for workout flex, progress pics, and motivation. No login needed.",
    keywords: ["gym captions", "fitness motivation", "workout captions", "fitness quotes", "workout progress"]
  },
  {
    id: "travel-insta-caption",
    name: "Travel Instagram Captions Generator",
    category: "Creator",
    description: "Create fresh and catchy travel captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/travel-instagram-caption-generator",
    seoTitle: "Free Travel Captions for Instagram",
    seoDescription: "Create fresh and catchy travel captions for Instagram instantly with our free tool. Perfect for beach shots, mountain views, and city vibes. No login needed.",
    keywords: ["travel captions", "adventure captions", "beach captions", "mountain captions", "instagram explore"]
  },
  {
    id: "motivational-insta-caption",
    name: "Motivational Instagram Captions Generator",
    category: "Creator",
    description: "Create powerful and inspiring motivational captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/motivational-instagram-caption-generator",
    seoTitle: "Motivational Captions Instagram Generator",
    seoDescription: "Create powerful and inspiring motivational captions for Instagram instantly with our free tool. Perfect for fitness, success, and daily hustle. No login needed.",
    keywords: ["motivational captions", "inspirational captions", "success quotes", "hustle captions", "instagram focus"]
  },
  {
    id: "aesthetic-insta-caption",
    name: "Aesthetic Instagram Captions Generator",
    category: "Creator",
    description: "Create clean, stylish, and aesthetic captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/aesthetic-instagram-caption-generator",
    seoTitle: "Aesthetic Captions Instagram Generator (Free Tool)",
    seoDescription: "Create clean, stylish, and aesthetic captions for Instagram instantly with our free tool. Perfect for selfies, mood shots, and trendy posts. No login needed.",
    keywords: ["aesthetic captions", "minimal captions", "trendy captions", "moody captions", "instagram vibe"]
  },
  {
    id: "cool-insta-caption",
    name: "Cool Instagram Captions Generator",
    category: "Creator",
    description: "Create stylish, catchy, and creative captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/cool-instagram-caption-generator",
    seoTitle: "Cool Captions for Instagram – Instant Caption Generator",
    seoDescription: "Create stylish, catchy, and creative cool captions for Instagram instantly with our free tool. Stand out from the crowd. No login needed.",
    keywords: ["cool captions", "stylish captions", "catchy captions", "creative captions", "instagram trends"]
  },
  {
    id: "selfie-insta-caption",
    name: "Selfie Instagram Captions Generator",
    category: "Creator",
    description: "Create catchy and unique captions for your selfies instantly.",
    icon: Instagram,
    path: "/creator/selfie-instagram-caption-generator",
    seoTitle: "Selfie Captions Instagram Generator – Free & Instant",
    seoDescription: "Create catchy and unique captions for your selfies instantly with our free tool. Perfect for funny, cool, or aesthetic vibes. No login needed.",
    keywords: ["selfie captions", "cute captions", "savage captions", "mirror selfie", "instagram smile"]
  },
  {
    id: "couple-insta-caption",
    name: "Couple Instagram Captions Generator",
    category: "Creator",
    description: "Create romantic, cute, and funny captions for couple photos instantly.",
    icon: Instagram,
    path: "/creator/couple-instagram-caption-generator",
    seoTitle: "Couple Captions Instagram Generator (Free & Instant)",
    seoDescription: "Create romantic, cute, and funny captions for couple photos instantly with our free tool. Perfect for anniversaries, dates, and cute selfies. No login needed.",
    keywords: ["couple captions", "romantic captions", "love quotes", "relationship goals", "instagram love"]
  },
  {
    id: "friendship-insta-caption",
    name: "Friendship Instagram Captions Generator",
    category: "Creator",
    description: "Create fun, short, and meaningful captions for your best friend photos instantly.",
    icon: Instagram,
    path: "/creator/friendship-instagram-caption-generator",
    seoTitle: "Friendship Captions Instagram – Free Generator",
    seoDescription: "Create fun, short, and meaningful captions for your friend photos instantly with our free tool. Perfect for selfies, group pics, and birthdays. No login needed.",
    keywords: ["friendship captions", "best friend quotes", "squad goals", "bff captions", "instagram friends"]
  },
  {
    id: "hindi-insta-caption",
    name: "Hindi Instagram Captions Generator",
    category: "Creator",
    description: "Create catchy, emotional, and stylish Hindi captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/hindi-instagram-caption-generator",
    seoTitle: "Hindi Captions for Instagram – Free Caption Generator",
    seoDescription: "Create catchy, emotional, and stylish Hindi captions for Instagram instantly with our free tool. Perfect for students and creators. No login needed.",
    keywords: ["hindi captions", "hindi status", "desi captions", "hindi funny captions", "hindi love quotes"]
  },
  {
    id: "english-insta-caption",
    name: "English Instagram Captions Generator",
    category: "Creator",
    description: "Create clean, catchy, and natural English captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/english-instagram-caption-generator",
    seoTitle: "Free English Captions for Instagram Generator",
    seoDescription: "Create clean, catchy, and natural English captions for Instagram instantly with our free tool. Perfect for selfies, travel, and lifestyle. No login needed.",
    keywords: ["english captions", "instagram captions english", "caption generator english", "best captions english", "instagram status english"]
  },
  {
    id: "one-word-insta-caption",
    name: "One Word Instagram Captions Generator",
    category: "Creator",
    description: "Create powerful and catchy one-word captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/one-word-instagram-caption-generator",
    seoTitle: "One Word Captions Instagram Generator – Impactful & Short",
    seoDescription: "Create powerful and catchy one-word captions for Instagram instantly with our free tool. Perfect for impact and minimalism. No login needed.",
    keywords: ["one word captions", "short captions", "minimalist captions", "punchy captions", "instagram vibes"]
  },
  {
    id: "savage-insta-caption",
    name: "Savage Instagram Captions Generator",
    category: "Creator",
    description: "Create bold, witty, and savage captions for Instagram instantly.",
    icon: Instagram,
    path: "/creator/savage-instagram-caption-generator",
    seoTitle: "Savage Captions Instagram Generator (Free & Instant)",
    seoDescription: "Create bold, witty, and savage captions for Instagram instantly with our free tool. Perfect for attitude, gym, and breakup posts. No login needed.",
    keywords: ["savage captions", "attitude captions", "cool captions", "bold captions", "instagram boss"]
  },
  {
    id: "trending-insta-caption",
    name: "Trending Instagram Captions Generator",
    category: "Creator",
    description: "Create catchy, simple, and engaging captions that match current trends instantly.",
    icon: Instagram,
    path: "/creator/trending-instagram-caption-generator",
    seoTitle: "Trending Captions Instagram – Free Generator Tool",
    seoDescription: "Create catchy, simple, and engaging captions that match current trends instantly with our free tool. Perfect for viral posts. No login needed.",
    keywords: ["trending captions", "viral captions", "instagram trends", "popular captions", "instagram engagement"]
  },
  {
    id: "viral-reel-caption",
    name: "Viral Reel Captions Generator",
    category: "Creator",
    description: "Create high-engagement captions for Reels instantly to boost views and reach.",
    icon: Instagram,
    path: "/creator/viral-reel-captions-generator",
    seoTitle: "Generate Viral Captions for Reels Instantly",
    seoDescription: "Create viral and engaging captions for your Reels instantly with our free tool. Perfect for gym, travel, and lifestyle videos. No login needed.",
    keywords: ["reel captions", "viral captions", "instagram reels", "engagement captions", "short video captions"]
  },
  {
    id: "post-insta-caption",
    name: "Instagram Post Captions Generator",
    category: "Creator",
    description: "Create ready-to-use captions for any Instagram post instantly.",
    icon: Instagram,
    path: "/creator/instagram-post-captions-generator",
    seoTitle: "Free Captions for Instagram Post Generator",
    seoDescription: "Create ready-to-use captions for your Instagram posts instantly with our free tool. Perfect for travel, gym, and business posts. No login needed.",
    keywords: ["instagram post captions", "post captions", "photo captions", "best captions", "instagram statuses"]
  },
  {
    id: "free-hashtag-gen",
    name: "Free Hashtag Generator",
    category: "Creator",
    description: "Find the best hashtags to improve reach, engagement, and discoverability instantly.",
    icon: Hash,
    path: "/creator/free-hashtag-generator",
    seoTitle: "Free Hashtag Generator for Instagram – Boost Reach",
    seoDescription: "Find the best hashtags to improve your Instagram post reach and discoverability with our free tool. Mix of trending and niche tags. No login needed.",
    keywords: ["instagram hashtags", "free hashtag generator", "best hashtags", "hashtag finder", "grow instagram"]
  },
  {
    id: "free-hashtags-reels",
    name: "Free Hashtags for Reels Generator",
    category: "Creator",
    description: "Generate the best hashtags for Reels in seconds to improve discoverability and reach.",
    icon: Hash,
    path: "/creator/free-hashtags-reels-generator",
    seoTitle: "Free Hashtags for Reels Generator – Boost Discoverability",
    seoDescription: "Generate the best hashtags for your Reels in seconds with our free tool. Reach the right audience and go viral. No login needed.",
    keywords: ["hashtags for reels", "reel hashtags", "viral reel tags", "best instagram hashtags", "hashtag generator"]
  },
  {
    id: "viral-reel-hashtags",
    name: "Find Viral Hashtags for Reels",
    category: "Creator",
    description: "Find viral hashtags for reels based on your content to boost visibility and engagement.",
    icon: Hash,
    path: "/creator/find-viral-hashtags-for-reels",
    seoTitle: "Find Viral Hashtags for Reels Instantly - Free Tool",
    seoDescription: "Find viral and trending hashtags for your Reels instantly with our free tool. Boost visibility and engagement. No login needed.",
    keywords: ["viral reels", "reel hashtags", "trending tags", "instagram growth", "hashtag finder"]
  },
  {
    id: "gym-hashtags-gen",
    name: "Best Hashtags for Gym Generator",
    category: "Creator",
    description: "Find the best hashtags for gym and fitness content in seconds.",
    icon: Hash,
    path: "/creator/best-gym-hashtags-generator",
    seoTitle: "Best Hashtags for Gym – Free Hashtag Tool",
    seoDescription: "Find the best and trending hashtags for your gym and fitness posts instantly with our free tool. Boost visibility and reach. No login needed.",
    keywords: ["gym hashtags", "fitness hashtags", "workout tags", "bodybuilding hashtags", "instagram fitness"]
  },
  {
    id: "travel-hashtags-gen",
    name: "Best Hashtags for Travel Generator",
    category: "Creator",
    description: "Find the most effective and trending hashtags for travel in seconds.",
    icon: Hash,
    path: "/creator/best-travel-hashtags-generator",
    seoTitle: "Find the Best Hashtags for Travel Instantly - Free Tool",
    seoDescription: "Find the best and trending hashtags for your travel posts and reels instantly with our free tool. Perfect for solo trips, beaches, and adventures.",
    keywords: ["travel hashtags", "vacation tags", "adventure hashtags", "wanderlust hashtags", "instagram travel"]
  },
  {
    id: "business-hashtags-gen",
    name: "Free Hashtags for Business",
    category: "Creator",
    description: "Instantly find the best hashtags for your business to improve reach and engagement.",
    icon: Hash,
    path: "/creator/free-business-hashtags-generator",
    seoTitle: "Free Hashtags for Business – Instant Generator",
    seoDescription: "Quickly find the best hashtags for your business with our free generator. Reach more customers and grow your brand online. No login required.",
    keywords: ["business hashtags", "marketing tags", "small business growth", "freelance hashtags", "startup hashtags"]
  },
  {
    id: "fashion-hashtags-gen",
    name: "Best Hashtags for Fashion Generator",
    category: "Creator",
    description: "Find the most relevant and trending hashtags for fashion content in seconds.",
    icon: Hash,
    path: "/creator/best-fashion-hashtags-generator",
    seoTitle: "Find the Best Hashtags for Fashion Instantly - Free Tool",
    seoDescription: "Find the best and trending hashtags for your fashion posts, OOTD, and reels instantly with our free tool. Boost likes and reach. No login needed.",
    keywords: ["fashion hashtags", "ootd tags", "streetwear hashtags", "style tips hashtags", "instagram fashion"]
  },
  {
    id: "food-hashtags-gen",
    name: "Free Hashtags for Food Generator",
    category: "Creator",
    description: "Instantly find trending and relevant hashtags for food posts and reels.",
    icon: Hash,
    path: "/creator/free-food-hashtags-generator",
    seoTitle: "Free Hashtags for Food Generator - Boost Your Food Posts",
    seoDescription: "Get the best and trending hashtags for your food posts, recipes, and reels instantly with our free tool. Boost visibility and reach. No login needed.",
    keywords: ["food hashtags", "recipe tags", "cooking hashtags", "foodie hashtags", "instagram food"]
  },
  {
    id: "fitness-hashtags-gen",
    name: "Free Fitness Hashtags Generator",
    category: "Creator",
    description: "Generate the best and trending hashtags for fitness content instantly to boost reach.",
    icon: Hash,
    path: "/creator/free-fitness-hashtags-generator",
    seoTitle: "Free Fitness Hashtags Generator Online",
    seoDescription: "Get trending hashtags for fitness instantly. Boost reach on Instagram and grow faster with our free online hashtag tool.",
    keywords: ["fitness hashtags", "gym hashtags", "workout tags", "yoga hashtags", "instagram fitness"]
  },
  {
    id: "motivation-hashtags-gen",
    name: "Best Hashtags for Motivation",
    category: "Creator",
    description: "Find fresh, trending, and relevant hashtags for motivation in seconds.",
    icon: Hash,
    path: "/creator/best-motivation-hashtags-generator",
    seoTitle: "Best Hashtags for Motivation – Free Hashtag Tool",
    seoDescription: "Find the best and trending hashtags for your motivational posts and reels instantly with our free tool. Boost visibility and reach. No login needed.",
    keywords: ["motivation hashtags", "success hashtags", "study motivation", "daily inspiration", "instagram motivation"]
  },
  {
    id: "youtube-shorts-hashtags",
    name: "Hashtags for YouTube Shorts",
    category: "Creator",
    description: "Find trending and relevant hashtags for your YouTube Shorts to increase views and reach.",
    icon: Hash,
    path: "/creator/youtube-shorts-hashtags-generator",
    seoTitle: "Hashtags for YouTube Shorts – Free Online Tool",
    seoDescription: "Instantly find trending and relevant hashtags for your YouTube Shorts. Boost views and improve visibility with our free hashtag generator. No login needed.",
    keywords: ["youtube shorts hashtags", "shorts tags", "trending shorts hashtags", "viral shorts tags", "youtube video tags"]
  },
  {
    id: "insta-growth-hashtags",
    name: "Free Hashtags for Instagram Growth",
    category: "Creator",
    description: "Get powerful hashtags designed specifically to improve your Instagram reach and growth.",
    icon: Hash,
    path: "/creator/free-instagram-growth-hashtags",
    seoTitle: "Free Hashtags for Instagram Growth - Boost Your Reach",
    seoDescription: "Instantly find the best hashtags for Instagram growth. Boost your reach and engagement with our free tool. No login required.",
    keywords: ["instagram growth hashtags", "insta reach tags", "viral instagram hashtags", "growth tags", "instagram marketing"]
  },
  {
    id: "popular-insta-hashtags",
    name: "Popular Hashtags Instagram Tool",
    category: "Creator",
    description: "Instantly find trending and high-performing hashtags for your Instagram posts and reels.",
    icon: Hash,
    path: "/creator/popular-hashtags-instagram-tool",
    seoTitle: "Popular Hashtags Instagram Tool (Free & Instant)",
    seoDescription: "Find trending and high-performing hashtags in seconds. Boost your reach and growth with our free Popular Hashtags Instagram Tool. No login needed.",
    keywords: ["popular instagram hashtags", "trending hashtags instagram", "instagram tags", "insta hashtags", "viral hashtags"]
  },
  {
    id: "insta-hashtags-free",
    name: "Instagram Hashtags Generator Free",
    category: "Creator",
    description: "Get the best and trending hashtags in seconds to increase reach and discovery on Instagram.",
    icon: Hash,
    path: "/creator/instagram-hashtags-generator-free",
    seoTitle: "Instagram Hashtags Generator Free Tool - Instant Reach",
    seoDescription: "Get trending and relevant Instagram hashtags for free. Boost your reach and improve discovery with our instant hashtag generator. No login needed.",
    keywords: ["instagram hashtag generator", "free hashtags", "insta tags", "viral hashtags generator", "instagram growth tool"]
  },
  {
    id: "niche-hashtags-insta",
    name: "Niche Hashtags Instagram Generator",
    category: "Creator",
    description: "Find highly targeted and relevant niche hashtags for your Instagram posts and reels.",
    icon: Hash,
    path: "/creator/niche-hashtags-instagram-generator",
    seoTitle: "Niche Hashtags Instagram Generator (Free Tool) - Instant Reach",
    seoDescription: "Find targeted and relevant niche hashtags for Instagram. Boost your reach and engagement with our free Niche Hashtags Instagram Generator. No login needed.",
    keywords: ["niche hashtags instagram", "targeted hashtags", "insta niche tags", "specific hashtags", "instagram growth"]
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
