import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { tools } from "@/src/constants";
import { AdPlaceholder } from "@/src/components/AdPlaceholder";
import { cn } from "@/src/lib/utils";
import { ChevronRight, ArrowLeft, Copy, RotateCcw, Share2, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import canvasConfetti from "canvas-confetti";
import { generateContent, generateStructuredContent, Type } from "@/src/services/gemini";
import { ResultCard, GeneratedOption } from "@/src/components/ResultCard";

// Dynamic Tool Components will be defined later
import { PasswordGenerator } from "@/src/tools/UtilityTools";
import { QRCodeGenerator } from "@/src/tools/UtilityTools";
import { ImageCompressor } from "@/src/tools/UtilityTools";
import { TextToEmoji } from "@/src/tools/UtilityTools";
import { InvoiceGenerator } from "@/src/tools/BusinessTools";

import { getStaticSeo } from "@/src/lib/seoContent";

export default function ToolDetailPage() {
  const { category, toolId } = useParams();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [structuredResults, setStructuredResults] = useState<GeneratedOption[]>([]);
  const [seoContent, setSeoContent] = useState<{ 
    intro: string; 
    steps: string[]; 
    features: string[]; 
    faqs: { q: string; a: string }[]; 
    detailedGuide: string;
    faqSchema: any;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const tool = tools.find(t => t.path.includes(`${category}/${toolId}`));

  React.useEffect(() => {
    if (tool) {
      window.scrollTo(0, 0);
      loadSeoContent();
    }
  }, [toolId]);

  const loadSeoContent = async () => {
    if (!tool) return;
    
    // 1. Check static data first for MAX SPEED
    const staticData = getStaticSeo(tool.id);
    if (staticData) {
      setSeoContent({
        intro: staticData.intro,
        steps: staticData.steps,
        features: staticData.features || ["100% Free", "Privacy focused", "Fast & Reliable"],
        faqs: staticData.faqs || [{ q: `Why use ${tool.name}?`, a: "It is fast, free, and reliable for all users." }],
        detailedGuide: staticData.detailedGuide || `### About ${tool.name}\n${tool.description}. This tool is designed to help you achieve your goals faster and with more professional results.`,
        faqSchema: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (staticData.faqs || []).map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        })
      });
      return;
    }

    // 2. Fallback to Gemini only if static content is missing
    try {
      const schema = {
        type: Type.OBJECT,
        properties: {
          intro: { type: Type.STRING, description: "A concise professional introduction (50-60 words) about the tool's core value." },
          steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 clear, short steps on how to use the tool." },
          features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 essential features." },
          detailedGuide: { type: Type.STRING, description: "A comprehensive 300-word expert guide. Use markdown formatting for subheadings." },
          faqSchema: { type: Type.STRING, description: "A valid, compact stringified JSON-LD for and FAQPage schema based on the generated FAQs. DO NOT include the <script> tags, just the raw JSON string." },
          faqs: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                q: { type: Type.STRING },
                a: { type: Type.STRING }
              }
            }, 
            description: "3 helpful FAQs related to the tool." 
          }
        },
        required: ["intro", "steps", "features", "faqs", "detailedGuide", "faqSchema"]
      };

      const prompt = `Act as a senior SEO content writer. Generate high-ranking educational content for '${tool.name}' (${tool.description}). 
      
      CRITICAL: Return ONLY raw JSON. Do NOT include explanations.
      Keywords: ${tool.keywords.slice(0, 5).join(", ")}.
      
      Requirements:
      - intro: 50-60 words summary.
      - steps: 3 clear short steps.
      - features: 3 bullet points.
      - detailedGuide: 250-300 words of expert advice. Use Markdown headings (###).
      - faqSchema: Valid compact JSON-LD string (FAQPage).
      - faqs: 3 concise Q&A pairs.`;

      const res = await generateStructuredContent(prompt, schema);
      setSeoContent(res);
    } catch (err) {
      console.error("SEO Gen Error:", err);
      // Final fallback to generic content so the page is never empty
      setSeoContent({
        intro: `Master the art of ${tool.name} with our easy-to-use digital utility. Whether you are a professional or a beginner, our tool is designed to provide maximum efficiency and results.`,
        steps: ["Input your data", "Click generate", "Download or copy results"],
        features: ["100% Free", "Privacy focused", "Fast & Reliable"],
        faqs: [{ q: `Why use ${tool.name}?`, a: "It saves time and provides professional grade results instantly." }],
        detailedGuide: `### Discover ${tool.name}\n${tool.description}. Using this tool regularly can improve your workflow and productivity. Our AI-backed systems ensure you get the highest quality output every time.`,
        faqSchema: null
      });
    }
  };

  if (!tool) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold">Tool Not Found</h2>
        <Link to="/" className="text-primary flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!input && !["pass-gen", "qr-gen", "img-compressor"].includes(tool.id)) return;
    
    setIsLoading(true);
    setIsCopied(false);
    setResult("");
    setStructuredResults([]);
    
    try {
      // AI Tools Handling
      if (tool.category !== "Utility" || ["festival-caption", "text-emoji"].includes(tool.id)) {
        let prompt = "";
        switch(tool.id) {
          case "insta-caption": prompt = `Write engaging Instagram captions for: ${input}. Include relevant emojis and hashtags.`; break;
          case "funny-insta-caption": prompt = `Write hilarious and witty Instagram captions for: ${input}. Make them funny and relatble. Include relevant emojis.`; break;
          case "short-insta-caption": prompt = `Write short, punchy, and catchy Instagram captions for: ${input}. Keep them under 10 words. Include emojis.`; break;
          case "reel-caption": prompt = `Write engaging and catchy captions for an Instagram Reel about: ${input}. Include relevant emojis and hashtags.`; break;
          case "boy-insta-caption": prompt = `Write cool, bold, and stylish Instagram captions for boys about: ${input}. Include attitude and confidence. Use emojis.`; break;
          case "girl-insta-caption": prompt = `Write cute, classy, and stylish Instagram captions for girls about: ${input}. Include elegance and confidence. Use emojis.`; break;
          case "attitude-insta-caption": prompt = `Write bold, savage, and powerful attitude captions for Instagram about: ${input}. Include confidence and boss vibes. Use emojis.`; break;
          case "love-insta-caption": prompt = `Write beautiful, catchy, and emotional love captions for Instagram about: ${input}. Include romantic and cute vibes. Use emojis.`; break;
          case "sad-insta-caption": prompt = `Write deep, emotional, and relatable sad captions for Instagram about: ${input}. Include feelings of heartbreak or loneliness. Use emojis.`; break;
          case "gym-insta-caption": prompt = `Write powerful, motivational, and high-energy gym captions for Instagram about: ${input}. Include fitness goals and grind vibes. Use emojis and hashtags.`; break;
          case "travel-insta-caption": prompt = `Write fresh, catchy, and creative travel Instagram captions for: ${input}. Include vibes like beach, mountains, or city. Include relevant emojis and hashtags.`; break;
          case "motivational-insta-caption": prompt = `Write powerful, inspiring, and engaging motivational Instagram captions for: ${input}. Include success mindset and positive grind vibes. Use emojis.`; break;
          case "aesthetic-insta-caption": prompt = `Write clean, stylish, minimalist, and aesthetic Instagram captions for: ${input}. Include trendy and moody vibes. Use carefully selected emojis.`; break;
          case "cool-insta-caption": prompt = `Write stylish, catchy, and creative cool Instagram captions for: ${input}. Include trendy vibes and social media slang where appropriate. Use emojis.`; break;
          case "selfie-insta-caption": prompt = `Write catchy, creative, and unique Instagram captions for a selfie about: ${input}. Include funny, cute, and confident vibes. Use emojis.`; break;
          case "couple-insta-caption": prompt = `Write beautiful, romantic, cute, and funny Instagram captions for a couple photo about: ${input}. Include relationship goals and sweet vibes. Use emojis.`; break;
          case "friendship-insta-caption": prompt = `Write fun, short, meaningful, and catchy Instagram captions for a photo with friends about: ${input}. Include squad goals and bestie vibes. Use emojis.`; break;
          case "hindi-insta-caption": prompt = `Write catchy, emotional, and stylish Hindi captions for Instagram about: ${input}. Provide various moods like funny, romantic, or attitude. Use Hindi script and include relevant emojis.`; break;
          case "english-insta-caption": prompt = `Write clean, catchy, and natural English Instagram captions for: ${input}. Include various vibes like cool, funny, or emotional. Use emojis.`; break;
          case "one-word-insta-caption": prompt = `Generate powerful, catchy, and creative ONE-WORD Instagram captions for: ${input}. Provide a diverse list of high-impact single words.`; break;
          case "savage-insta-caption": prompt = `Write bold, witty, and savage Instagram captions for: ${input}. Include attitude, boss vibes, and confidence. Use emojis.`; break;
          case "trending-insta-caption": prompt = `Write catchy, simple, and engaging Instagram captions that match current trends for: ${input}. Include viral vibes and social media slang where appropriate. Use emojis.`; break;
          case "viral-reel-caption": prompt = `Write high-engagement, viral Instagram Reel captions for: ${input}. Include a strong hook, engaging body, and clear CTA. Use emojis and keep it punchy.`; break;
          case "post-insta-caption": prompt = `Write engaging, creative, and catchy Instagram post captions for: ${input}. Provide options for various moods and styles. Use emojis.`; break;
          case "reel-script": prompt = `Write viral Reel scripts (Hook, Body, CTA) for: ${input}. Keep it punchy and short.`; break;
          case "hook-gen": prompt = `Generate scroll-stopping hooks for social media about: ${input}.`; break;
          case "hashtag-gen": prompt = `Generate trending hashtags for: ${input}. Categorize them by size.`; break;
          case "free-hashtag-gen": prompt = `Generate high-reach Instagram hashtags for: ${input}. Provide a mix of viral, trending, and niche hashtags. Categorize them into sets or sizes.`; break;
          case "free-hashtags-reels": prompt = `Generate high-reach Instagram Reel hashtags for: ${input}. Provide a mix of viral, trending, and niche hashtags specifically for Reels.`; break;
          case "fitness-hashtags-gen": prompt = `Generate a list of viral and relevant fitness hashtags based on this topic: "${input}". Include popular gym tags, workout tags, and yoga/health tags. Categorize them into sets.`; break;
          case "motivation-hashtags-gen": prompt = `Generate high-reach Instagram motivation hashtags for: ${input}. Provide a mix of viral, trending, and niche tags for success, daily inspiration, study, gym motivation, etc. Categorize them into sets.`; break;
          case "youtube-shorts-hashtags": prompt = `Generate high-performing YouTube Shorts hashtags for: ${input}. Provide a mix of trending, viral, and niche-specific hashtags optimized for the YouTube Shorts algorithm.`; break;
          case "insta-growth-hashtags": prompt = `Generate high-reach Instagram growth hashtags for: ${input}. Provide a mix of viral, trending, and niche-specific hashtags designed to maximize exposure. Categorize them into sets.`; break;
          case "insta-hashtags-free": prompt = `Generate high-performing and relevant Instagram hashtags for: ${input}. Provide a mix of viral, trending, and niche tags to improve reach and engagement. Categorize them into sets or sizes.`; break;
          case "niche-hashtags-insta": prompt = `Generate a list of highly targeted and relevant niche hashtags for: ${input}. Provide a mix of low-competition and medium-competition hashtags specific to this niche. Categorize them into sets.`; break;
          case "popular-insta-hashtags": prompt = `Generate a list of popular and high-performing Instagram hashtags for: ${input}. Provide a mix of trending, viral, and niche hashtags used by top creators. Categorize them into sets or sizes.`; break;
          case "gym-hashtags-gen": prompt = `Generate high-reach Instagram hashtags for gym and fitness content about: ${input}. Provide a mix of viral, trending, and niche gym hashtags.`; break;
          case "travel-hashtags-gen": prompt = `Generate high-reach Instagram travel hashtags for: ${input}. Provide a mix of viral, trending, and niche travel tags for beach, adventure, solo trips, etc.`; break;
          case "business-hashtags-gen": prompt = `Generate high-reach business hashtags for: ${input}. Provide a mix of viral, trending, and niche tags suitable for marketing, small businesses, and startups.`; break;
          case "viral-reel-hashtags": prompt = `Write high-engagement, viral Instagram Reel hashtags for: ${input}. Provide a mix of viral, trending, and niche hashtags. Categorize them into sets or sizes.`; break;
          case "fashion-hashtags-gen": prompt = `Generate a list of viral and relevant hashtags for fashion based on this topic: "${input}". Include popular fashion tags, niche tags, and aesthetic/style tags. Categorize them as if you are giving sets.`; break;
          case "food-hashtags-gen": prompt = `Generate a list of trending and relevant hashtags for food based on this topic: "${input}". Include a mix of popular food tags, niche tags, and specific dish/diet tags. Categorize them into sets.`; break;
          case "bio-gen": prompt = `Write creative and professional social media bios for: ${input}.`; break;
          case "offer-msg": prompt = `Write persuasive sales offer messages for: ${input}. Focus on value and include a clear CTA.`; break;
          case "wa-broadcast": prompt = `Write WhatsApp broadcast messages for a business about: ${input}. Keep it friendly and professional.`; break;
          case "biz-name": prompt = `Suggest unique and catchy business names for a startup related to: ${input}.`; break;
          case "review-reply": prompt = `Write professional replies to this customer review: "${input}". Provide options for both positive and negative tones if applicable.`; break;
          case "chat-reply": prompt = `Suggest clever or thoughtful chat replies to: "${input}". Give options for funny, serious, and friendly.`; break;
          case "flirty-msg": prompt = `Compose sweet and slightly flirty messages about: ${input}. Not too cheesy.`; break;
          case "sorry-msg": prompt = `Write sincere and thoughtful apology messages about: ${input}. Focus on accountability.`; break;
          case "breakup-msg": prompt = `Write sensitive and respectful breakup messages for: ${input}. Ensure closure and kindness.`; break;
          case "shayari-gen": prompt = `Write beautiful original Shayari (in Hindi/Urdu with English translation) about: ${input}.`; break;
          case "festival-caption": prompt = `Write festive captions for the festival of ${input}. Joyful and warm tones.`; break;
          case "text-emoji": prompt = `Translate this text into purely emojis that convey the meaning: ${input}`; break;
        }

        const isStructuredNeeded = ["insta-caption", "funny-insta-caption", "short-insta-caption", "reel-caption", "boy-insta-caption", "girl-insta-caption", "attitude-insta-caption", "love-insta-caption", "sad-insta-caption", "gym-insta-caption", "travel-insta-caption", "motivational-insta-caption", "aesthetic-insta-caption", "cool-insta-caption", "selfie-insta-caption", "couple-insta-caption", "friendship-insta-caption", "hindi-insta-caption", "english-insta-caption", "one-word-insta-caption", "savage-insta-caption", "trending-insta-caption", "viral-reel-caption", "post-insta-caption", "free-hashtag-gen", "free-hashtags-reels", "gym-hashtags-gen", "travel-hashtags-gen", "business-hashtags-gen", "viral-reel-hashtags", "fashion-hashtags-gen", "food-hashtags-gen", "fitness-hashtags-gen", "motivation-hashtags-gen", "youtube-shorts-hashtags", "insta-growth-hashtags", "insta-hashtags-free", "niche-hashtags-insta", "popular-insta-hashtags", "reel-script", "flirty-msg", "sorry-msg", "breakup-msg", "shayari-gen", "festival-caption", "chat-reply", "bio-gen", "hook-gen", "hashtag-gen"].includes(tool.id);
        const isGujaratiNeeded = ["flirty-msg", "sorry-msg", "breakup-msg", "shayari-gen", "festival-caption", "chat-reply"].includes(tool.id);
        const isHindiNeeded = ["hindi-insta-caption"].includes(tool.id);

        if (prompt) {
          if (isStructuredNeeded) {
            const schema = {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Short descriptive heading (2-4 words)" },
                  message: { type: Type.STRING, description: isHindiNeeded ? "Core content in natural Hindi (max 2 lines)" : (isGujaratiNeeded ? "Core content in natural Gujarati (max 2 lines)" : "Core content (max 2 lines)") },
                  meaning: { type: Type.STRING, description: (isHindiNeeded || isGujaratiNeeded) ? "Simple English translation (1 line)" : "Short explanation of why this works (1 line)" }
                },
                required: ["title", "message", "meaning"]
              }
            };

            const fullPrompt = `Generate 3 diverse and creative options for '${tool.name}' based on this input: '${input}'.
            
            CRITICAL: Return ONLY raw JSON. Do NOT include explanations.
            ${isGujaratiNeeded ? "IMPORTANT: The 'message' field MUST be written in natural, fluent Gujarati. 'meaning' must be the English translation." : ""}`;
            const res = await generateStructuredContent(fullPrompt, schema, 1024);
            setStructuredResults(Array.isArray(res) ? res.slice(0, 3) : []);
          } else {
            const res = await generateContent(prompt);
            setResult(res);
            // Scroll to results
            setTimeout(() => {
                const el = document.getElementById("results-anchor");
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setResult("Oops! Something went wrong while generating. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    canvasConfetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#3b82f6", "#60a5fa"]
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this result from ToolVanta: \n\n${result}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Special Utility Handlers
  const renderSpecialTool = () => {
    switch(tool.id) {
      case "pass-gen": return <PasswordGenerator />;
      case "qr-gen": return <QRCodeGenerator />;
      case "img-compressor": return <ImageCompressor />;
      case "invoice-gen": return <InvoiceGenerator />;
      default: return null;
    }
  };

  const isSpecialUtility = ["pass-gen", "qr-gen", "img-compressor", "invoice-gen"].includes(tool.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Helmet>
        <title>{tool.seoTitle}</title>
        <meta name="description" content={tool.seoDescription} />
        {seoContent?.faqSchema && (
          <script type="application/ld+json">
            {seoContent.faqSchema}
          </script>
        )}
        <meta name="keywords" content={tool.keywords.join(", ")} />
      </Helmet>

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="capitalize">{category}</span>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white font-medium">{tool.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8">
        <header className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <tool.icon size={24} />
             </div>
             <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                {tool.name}
             </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            {tool.description}
          </p>
          {seoContent && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-slate-600 dark:text-slate-400 leading-relaxed text-base pt-4 border-t border-slate-100 dark:border-slate-800"
            >
              {seoContent.intro}
            </motion.p>
          )}
        </header>

        <AdPlaceholder />

        <main className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
             <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary" /> Start Using {tool.name}
             </h2>
             {!isSpecialUtility ? (
               <div className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                     {tool.id === "text-emoji" || tool.id === "review-reply" ? "Enter your text:" : "Enter keywords/topic:"}
                   </label>
                   <textarea
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="e.g. Coffee shop, Summer vacation, Product launch..."
                     className={cn(
                       "w-full h-32 p-4 rounded-2xl",
                       "bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800",
                       "focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all",
                       "text-slate-900 dark:text-white placeholder:text-slate-400"
                     )}
                   />
                 </div>

                 <button
                   onClick={handleGenerate}
                   disabled={isLoading || !input}
                   className={cn(
                     "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
                     "bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                   )}
                 >
                   {isLoading ? (
                     <> <Loader2 className="animate-spin" size={20} /> Generating... </>
                   ) : (
                     <> <RotateCcw size={20} /> {result || structuredResults.length > 0 ? "Regenerate" : "Generate Result"} </>
                   )}
                 </button>
               </div>
             ) : (
               renderSpecialTool()
             )}
          </div>

          <AnimatePresence>
            <div id="results-anchor" className="scroll-mt-24">
              {structuredResults.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Generated Options <span className="text-sm font-normal text-slate-500">(3 options)</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {structuredResults.map((opt, idx) => (
                      <ResultCard key={idx} option={opt} index={idx} />
                    ))}
                  </div>
                  <AdPlaceholder label="Results Ad" />
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Your Result</h3>
                      <div className="flex items-center gap-2">
                         <button onClick={handleCopy} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            {isCopied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                         </button>
                         <button onClick={handleShareWhatsApp} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                            <Share2 size={20} />
                         </button>
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-lg">
                      {result}
                    </div>
                  </div>
                  <AdPlaceholder label="Single Result Ad" />
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </main>


        {seoContent && (
          <section className="space-y-16 py-16 border-t border-slate-100 dark:border-slate-800">
            {/* How to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
               <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">How to use <span className="text-primary">{tool.name}</span></h2>
                  <div className="space-y-4">
                    {seoContent.steps.map((step, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">{i+1}</div>
                        <p className="text-slate-600 dark:text-slate-400">{step}</p>
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {seoContent.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                  <AdPlaceholder variant="square" />
               </div>
            </div>

            {/* Detailed SEO Content Section */}
            <div className="space-y-8 py-12 border-t border-slate-100 dark:border-slate-800">
               <h2 className="text-3xl font-bold tracking-tight">Expert Guide: Mastering {tool.name}</h2>
               <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {seoContent.detailedGuide}
               </div>
               <AdPlaceholder className="my-8" />
            </div>

            {/* FAQs */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seoContent.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3">
                    <h4 className="font-bold text-slate-900 dark:text-white">Q: {faq.q}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tools & Search */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 space-y-10">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h3 className="text-3xl font-bold tracking-tight">Explore More Free Tools</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  ToolVanta features 20+ professional utilities. Search for any tool to get started instantly.
                </p>
                
                {/* Internal Search */}
                <div className="relative group max-w-md mx-auto pt-4">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <RotateCcw size={18} className="animate-pulse" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search other tools (e.g. bio, name, font)..."
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase();
                      const elements = document.querySelectorAll('.quick-tool-link');
                      elements.forEach((el: any) => {
                        const name = el.getAttribute('data-tool-name')?.toLowerCase() || "";
                        const keywords = el.getAttribute('data-tool-keywords')?.toLowerCase() || "";
                        if (name.includes(val) || keywords.includes(val)) {
                          el.classList.remove('hidden');
                        } else {
                          el.classList.add('hidden');
                        }
                      });
                    }}
                    className={cn(
                      "w-full pl-12 pr-6 py-4 rounded-2xl",
                      "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all",
                      "text-slate-900 dark:text-white shadow-sm"
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {tools.filter(t => t.id !== tool.id).map(t => (
                  <Link 
                    key={t.id} 
                    to={t.path} 
                    data-tool-name={t.name}
                    data-tool-keywords={t.keywords.join(" ")}
                    className="quick-tool-link group p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <t.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{t.name}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{t.category}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                  Browse All Tools <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
