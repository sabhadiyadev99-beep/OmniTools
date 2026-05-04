
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

export interface StaticSeoContent {
  intro: string;
  steps: string[];
  features?: string[];
  faqs?: { q: string; a: string }[];
  detailedGuide?: string;
}

export const staticSeoData: Record<string, StaticSeoContent> = {
  "insta-caption": {
    intro: "Stop worrying about what to write under your photos. Our Instagram Caption Generator uses advanced AI to craft creative, engaging, and viral-ready captions for your Instagram posts in seconds. Whether it's a beach photo, a product launch, or a selfie, we've got you covered.",
    steps: [
      "Enter the topic or context of your photo/video.",
      "Click the 'Generate Result' button.",
      "Copy your favorite caption and paste it directly on Instagram."
    ],
    features: [
      "AI-Powered Creativity: Unique captions every time.",
      "Engagement Optimized: Designed to get more likes and comments.",
      "Emoji Integration: Perfectly placed emojis included."
    ],
    faqs: [
      { q: "Is this Instagram caption generator free?", a: "Yes, our tool is 100% free to use with no hidden costs." },
      { q: "Can I use these captions for business accounts?", a: "Absolutely! The captions are designed to be professional yet engaging for all account types." },
      { q: "How many captions can I generate?", a: "You can generate as many as you want. There are no daily limits." }
    ],
    detailedGuide: "### Why Instagram Captions Matter\nIn the world of social media, a photo is only half the story. The caption is what builds the connection, tells the story, and drives engagement. A well-written caption can stop a user from scrolling past and encourage them to leave a comment or share your post.\n\n### How to Write Viral Captions\n1. **Use a Hook:** Start with something that grabs attention immediately.\n2. **Call to Action:** Tell your followers exactly what to do (e.g., 'Double tap if you agree!').\n3. **Emojis:** Use emojis to break up text and add personality.\n\n### Best Practices for 2024\nInstagram algorithms now prioritize posts that generate meaningful conversations. Using our AI generator ensures that your captions aren't just generic—they are tailored to spark interest and interaction among your followers."
  },
  "reel-script": {
    intro: "Creating short-form video content is hard, but writing the script shouldn't be. Our Reel Script Generator helps you create high-impact hooks, engaging bodies, and effective CTAs for Reels, TikToks, and YouTube Shorts.",
    steps: [
      "Describe the goal of your video (e.g., 'How to cook pasta' or 'Outfit check').",
      "Hit 'Generate' to get a structured script.",
      "Follow the hook, body, and CTA format for maximum impact."
    ],
    features: [
      "Structured Format: Hook, Body, and Call to Action included.",
      "Viral Hooks: Opening lines designed to stop the scroll.",
      "Punchy & Short: Optimized for 15-60 second videos."
    ],
    faqs: [
      { q: "Do scripts work for TikTok too?", a: "Yes, these scripts are perfect for any short-form video platform." },
      { q: "Can I edit the generated script?", a: "Definitely. Use the script as a foundation and add your personal touch." }
    ],
    detailedGuide: "### The Secret to Viral Reels\nEverything depends on the first 3 seconds. Our generator focuses heavily on the 'Hook' because if you don't catch the viewer early, they will swipe away. \n\n### Content Pillar Strategy\nUse scripts to build content pillars: Educational, Foundational, and Entertaining. By rotating these scripts, you keep your audience engaged and provide consistent value."
  },
  // Adding more tools...
  "qr-gen": {
    intro: "Generate custom, high-quality QR codes for your business, personal profile, or Wi-Fi network instantly. Our QR Code Generator is fast, reliable, and requires no registration.",
    steps: [
      "Enter the URL or text you want to encode.",
      "The QR code will update automatically.",
      "Download the image and use it anywhere."
    ],
    features: [
      "No Expiry: Your QR codes will work forever.",
      "Instant Generation: No waiting times.",
      "Universal Compatibility: Works with all smartphone cameras."
    ],
    faqs: [
      { q: "Are these QR codes safe?", a: "Yes, they are standard static QR codes that encode your data directly." },
      { q: "Do I need to pay for high resolution?", a: "No, high-quality downloads are included for free." }
    ],
    detailedGuide: "### Innovative Ways to Use QR Codes\n- **Business Cards:** Link to your LinkedIn or Portfolio.\n- **Restaurants:** Digital menus for a contactless experience.\n- **Events:** Link to location maps or registration forms.\n\n### Best Practices\nEnsure your destination URL is mobile-optimized, as most QR codes are scanned via mobile devices."
  },
  "invoice-gen": {
    intro: "Professional invoicing made simple. Create, customize, and download clean PDF invoices for your freelance projects or small business in less than a minute.",
    steps: [
      "Fill in your company details and client info.",
      "Add line items, quantities, and prices.",
      "Customize tax settings and download your PDF."
    ],
    features: [
      "PDF Export: Clean, ready-to-print format.",
      "Local Processing: Your data stays in your browser.",
      "Customizable: Add your logo and specific notes."
    ],
    faqs: [
      { q: "Is my data stored on your servers?", a: "No, we value your privacy. All processing happens locally on your device." },
      { q: "Can I add multiple items?", a: "Yes, you can add as many rows as you need for your invoice." }
    ],
    detailedGuide: "### The Importance of Professional Invoices\nA professional looking invoice not only ensures you get paid on time but also builds trust with your clients. Every invoice should clearly state the payment terms, due date, and detailed breakdown of services rendered."
  },
  "pass-gen": {
    intro: "Protect your online identity with military-grade random passwords. Our Generator creates complex strings that are impossible for hackers to guess.",
    steps: [
       "Choose the length of your password.",
       "Select characters like symbols, numbers, and uppercase.",
       "Copy your secure password instantly."
    ],
    features: [
      "Cryptographically Secure: Truly random generation.",
      "Customizable: Fine-tune character types.",
      "Privacy First: Passwords are never sent to any server."
    ],
    faqs: [
      { q: "What makes a password strong?", a: "A mix of symbols, numbers, and varying cases with at least 12 characters." },
      { q: "Is it safe to use online generators?", a: "Yes, as long as they process data client-side like ours does." }
    ],
    detailedGuide: "### Why Password Security Matters\nWith data breaches becoming common, using the same password for everything is a huge risk. Our tool helps you generate unique, complex passwords for every site, significantly reducing the risk of unauthorized access."
  },
  "hook-gen": {
    intro: "Struggling to get views? The first sentence is everything. Our Hook Generator provides catchy, scroll-stopping opening lines for your videos, blogs, and ads.",
    steps: [
      "Input your topic or target audience.",
      "Generate multiple high-converting hooks.",
      "Use the most provocative or intriguing one."
    ],
    features: [
      "Psychology Based: Uses curiosity and pain points.",
      "Multi-platform: Works for YouTube, TikTok, and LinkedIn.",
      "Instant Inspiration: Never stare at a blank screen again."
    ],
    faqs: [
       { q: "What is a hook?", a: "A hook is the opening statement designed to capture immediate attention." }
    ],
    detailedGuide: "### The Anatomy of a Hook\nA great hook usually does one of three things: creates curiosity, promises a benefit, or challenges a common belief. By mastering the hook, you can double your content's reach without changing anything else."
  },
  "hashtag-gen": {
     intro: "Reach a wider audience by using the right tags. Our Hashtag Generator finds the most relevant and trending tags for your social media niche.",
     steps: [
       "Enter your main keyword (e.g., 'fitness').",
       "Choose from categorized lists of tags.",
       "Copy and paste to boost your post visibility."
     ],
     features: [
       "Niche Specific: Finds tags relevant to your exact topic.",
       "Reach Boost: Designed to get your posts on the Explore page.",
       "Smart Layout: Categories help you stay organized."
     ],
     faqs: [
       { q: "How many hashtags should I use?", a: "For Instagram, 3-5 high-relevance hashtags are currently recommended." }
     ],
     detailedGuide: "### Modern Hashtag Strategy\nGone are the days of using 30 hashtags. Today, quality beats quantity. Use a mix of broad, medium-reach, and niche hashtags to signal the algorithm exactly who your content is for."
  },
  "bio-gen": {
    intro: "Your social media bio is your digital handshake. Our Bio Generator helps you create a professional, witty, or creative first impression for Instagram, Twitter, LinkedIn, and more in just one click.",
    steps: [
      "Enter your profession, hobbies, or brand personality.",
      "Browse through several optimized bio options.",
      "Copy and paste the one that fits your vibe best."
    ],
    features: [
      "Platform Optimized: Formatted for bio character limits.",
      "Style Variety: Choose from Professional, Funny, or Minimal styles.",
      "Keyword Rich: Helps your profile show up in social searches."
    ],
    faqs: [
      { q: "What should I include in my bio?", a: "A clear value proposition, a bit of personality, and a call to action." }
    ],
    detailedGuide: "### Why a Good Bio Matters\nYour bio is often the deciding factor for whether someone follows you or not. It needs to tell the visitor exactly who you are and what they can expect from your content. Use our generator to experiment with different personas until you find the perfect match."
  },
  "biz-name": {
    intro: "Starting a new venture? Our Business Name Generator provides unique, catchy, and domain-ready names for your startup or brand. Brainstorming just got a lot easier.",
    steps: [
      "Input keywords related to your industry or vision.",
      "See a list of creative name suggestions.",
      "Check for name availability and start your brand journey."
    ],
    features: [
      "Catchy & Unique: Moves beyond generic naming conventions.",
      "Industry Relevant: Tailored to your specific market niche.",
      "Short & Memorable: Optimized for brand recall."
    ],
    faqs: [
      { q: "Can I use these for domain names?", a: "Yes, most suggestions are short and designed to work well as URLs." }
    ],
    detailedGuide: "### Choosing the Perfect Name\nA great business name should be easy to spell, easy to say, and easy to remember. Avoid names that are too specific if you plan to expand your services later. Use our suggestions as a starting point for your brand identity."
  },
  "flirty-msg": {
    intro: "Break the ice with style. Our Flirty Message Generator helps you send sweet, playful, and charming messages to your crush or partner, ensuring you always know the right thing to say.",
    steps: [
      "Enter a topic or context (e.g., 'morning', 'coffee', 'date').",
      "Get a selection of flirty and respectful options in Gujarati and English.",
      "Send the one that makes you smile."
    ],
    features: [
      "Bilingual Support: Natural Gujarati and English translations.",
      "Vibe Control: From sweet to slightly spicy but always respectful.",
      "Context Aware: Messages tailored to different times and moods."
    ],
    faqs: [
      { q: "Is it suitable for new relationships?", a: "Yes, we have many 'ice-breaker' options that are friendly and light." }
    ],
    detailedGuide: "### The Art of Flirting via Text\nTexting is about timing and tone. Always keep it respectful and pay attention to the other person's response. Our generator focuses on 'charming' rather than 'cheesy' to help you build a genuine connection."
  },
  "shayari-gen": {
    intro: "Express your soul through poetry. Our Shayari Generator creates original, heart-touching Shayari in Hindi and Gujarati with English meanings for every emotion—whether it is love, sadness, or friendship.",
    steps: [
      "Describe the mood (e.g., 'Dosti', 'Ishq', 'Yaad').",
      "Get poetic lines that resonate with your feelings.",
      "Share these beautiful lines on your status or with friends."
    ],
    features: [
      "Original Poetry: Not just common quotes, but AI-crafted lines.",
      "Multi-Language: Beautifully rendered in native scripts.",
      "Emotional Depth: Captures the essence of traditional Shayaris."
    ],
    faqs: [
      { q: "Can I use these for my WhatsApp status?", a: "Yes, they are formatted perfectly for status updates and reels." }
    ],
    detailedGuide: "### The Tradition of Shayari\nShayari is a rich tradition of expressing deep philosophies through short couplets. Our AI is trained on thousands of classic and modern poems to bring that same rhythmic beauty to your screen."
  },
  "offer-msg": {
    intro: "Turn prospects into customers with powerful, persuasive sales messages. Our Offer Message Generator helps you craft high-converting outreach for email, LinkedIn, and cold messaging.",
    steps: ["Describe your product or service.", "Select a tone (Aggressive, Friendly, or Professional).", "Get a ready-to-use sales template with a clear CTA."],
    features: ["Value-First Approach: Focuses on customer benefits.", "Clear CTA: Every message ends with a strong action step.", "Overcome Objections: Built-in persuasive techniques."],
    faqs: [{ q: "What is an offer message?", a: "A concise message designed to present a specific deal or benefit to a potential client." }],
    detailedGuide: "### Mastering the Art of the Offer\nAn offer message isn't just about selling; it's about solving a problem. Our generator uses proven copywriting frameworks like PAS (Problem-Agitation-Solution) and AIDA to ensure your messages resonate and convert."
  },
  "wa-broadcast": {
    intro: "Communicate with your customers effectively on their favorite platform. Our WhatsApp Broadcast Generator helps you write professional, engaging updates for your business broadcast lists.",
    steps: ["Input your announcement or update.", "Choose a professional or friendly tone.", "Copy and paste into your WhatsApp Business app."],
    features: ["Brevity Optimized: Keeps messages under the reading limit.", "Personalized Feeling: Designed to feel like a 1-on-1 chat.", "Business-Ready: Includes placeholders for links and contact info."],
    faqs: [{ q: "How do I send a broadcast?", a: "Create a list in WhatsApp Business and paste our AI-generated message." }],
    detailedGuide: "### WhatsApp Marketing Best Practices\nEngagement on WhatsApp is 10x higher than email, but it requires a careful touch. Don't spam—provide real value in every broadcast to maintain a high response rate and low block rate."
  },
  "review-reply": {
    intro: "Manage your online reputation with ease. Our Review Reply Generator provides professional, empathetic, and effective responses to both positive and negative customer reviews.",
    steps: ["Paste the customer's review.", "Select a response tone.", "Get a professional reply that handles feedback gracefully."],
    features: ["Crisis Management: Softens negative feedback effectively.", "SEO Friendly: Uses keywords to help your business profile.", "Time Saver: Respond to dozens of reviews in minutes."],
    faqs: [{ q: "Why should I reply to negative reviews?", a: "Replying shows future customers that you care and take feedback seriously." }],
    detailedGuide: "### Reputation Management 101\nYour response to a negative review is often more important than the review itself. It shows the public how you handle conflict. Our generator ensures you stay professional, even when the feedback is tough."
  },
  "chat-reply": {
    intro: "Never get stuck on 'seen' again. Our Chat Reply Generator helps you find the perfect response for any conversation—be it witty, serious, or just friendly.",
    steps: ["Paste the last message you received.", "Choose your intended mood.", "Select from top-rated response options."],
    features: ["Bilingual Support: Natural Gujarati and English options.", "Witty & Clever: Perfect for keeping conversations alive.", "Diverse Tones: From casual friendship to formal replies."],
    faqs: [{ q: "Can it handle group chats?", a: "Yes, it works great for both 1-on-1 and group conversation context." }],
    detailedGuide: "### The Psychology of Digital Conversation\nCommunication through text loses tone and body language. Our generator helps you re-inject that intended tone so your messages are clear and well-received."
  },
  "sorry-msg": {
    intro: "Mending relationships starts with the right words. Our Sorry Message Generator helps you craft sincere, accountable, and thoughtful apologies when you've made a mistake.",
    steps: ["Explain what happened briefly.", "Get multiple options for a sincere apology.", "Choose the one that best reflects your regret."],
    features: ["Accountability Focused: Avoids making excuses.", "Bilingual: Express your feelings in Gujarati or English.", "Relationship Savers: Designed to open a path to forgiveness."],
    faqs: [{ q: "What makes a good apology?", a: "Acknowledging the mistake, expressing regret, and offering to fix it." }],
    detailedGuide: "### How to Apologize Realistically\nA real apology doesn't use the word 'if' (e.g., 'sorry if you felt that way'). It uses 'that' (e.g., 'sorry that I did that'). Our generator follows this principle to ensure your apologies feel genuine."
  },
  "breakup-msg": {
    intro: "Ending things is never easy, but it can be done with kindness. Our Breakup Message Generator helps you provide closure and clarity while maintaining respect for the other person.",
    steps: ["Select the reason or context.", "Get sensitive and clear message drafts.", "End things respectfully with provided closure."],
    features: ["Respectful Closure: Focuses on kindness.", "Clarity: Avoids mixed signals that cause more pain.", "Bilingual Support: Available in Gujarati and English."],
    faqs: [{ q: "Is it okay to break up via text?", a: "Sometimes it's the safest or clearest way, especially in early or long-distance stages." }],
    detailedGuide: "### The Importance of Closure\nClosure helps both parties move on. A clear breakup message, while painful, is often better than 'ghosting' or leaving things ambiguous. Our tool helps you find that difficult middle ground of being firm but kind."
  },
  "festival-caption": {
    intro: "Celebrate every moment with the perfect words. Our Festival Caption Generator provides joyful and warm captions for all major Indian (Diwali, Holi, Navratri) and Global festivals.",
    steps: ["Enter the name of the festival.", "Choose from traditional or modern styles.", "Copy and share with your festive photos."]
  },
  "text-emoji": {
    intro: "Speak the language of the internet. Our Text to Emoji Converter translates your complex sentences into fun, visual emoji strings that convey the perfect vibe.",
    steps: ["Enter your sentence or thought.", "See it transformed into a string of emojis.", "Copy and send to your friends for a fun surprise."]
  },
  "img-compressor": {
    intro: "Speed up your website and save storage space. Our Image Compressor reduces file size in your browser without compromising on visual quality.",
    steps: ["Upload your JPG or PNG image.", "Wait for the compression to finish.", "Download your lightweight image instantly."]
  }
};

export function getStaticSeo(toolId: string): StaticSeoContent | null {
  return staticSeoData[toolId] || null;
}
