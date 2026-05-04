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
          case "reel-script": prompt = `Write viral Reel scripts (Hook, Body, CTA) for: ${input}. Keep it punchy and short.`; break;
          case "hook-gen": prompt = `Generate scroll-stopping hooks for social media about: ${input}.`; break;
          case "hashtag-gen": prompt = `Generate trending hashtags for: ${input}. Categorize them by size.`; break;
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

        const isStructuredNeeded = ["insta-caption", "reel-script", "flirty-msg", "sorry-msg", "breakup-msg", "shayari-gen", "festival-caption", "chat-reply", "bio-gen", "hook-gen"].includes(tool.id);
        const isGujaratiNeeded = ["flirty-msg", "sorry-msg", "breakup-msg", "shayari-gen", "festival-caption", "chat-reply"].includes(tool.id);

        if (prompt) {
          if (isStructuredNeeded) {
            const schema = {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "Short descriptive heading (2-4 words)" },
                  message: { type: Type.STRING, description: isGujaratiNeeded ? "Core content in natural Gujarati (max 2 lines)" : "Core content (max 2 lines)" },
                  meaning: { type: Type.STRING, description: isGujaratiNeeded ? "Simple English translation (1 line)" : "Short explanation of why this works (1 line)" }
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
    const text = encodeURIComponent(`Check out this result from OmniTools: \n\n${result}`);
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
            {structuredResults.length > 0 && (
              <div id="results-anchor" className="space-y-6">
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
            {/* ... other result rendering ... */}
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

            {/* Related Tools */}
            <div className="bg-primary/5 rounded-3xl p-10 text-center space-y-6">
              <h3 className="text-2xl font-bold">Want more free utilities?</h3>
              <p className="text-slate-500">Explore our collection of creator, business, and daily utility tools.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {tools.filter(t => t.id !== tool.id).slice(0, 3).map(t => (
                  <Link key={t.id} to={t.path} className="px-6 py-2 rounded-full bg-white dark:bg-slate-800 text-sm font-semibold hover:text-primary transition-colors shadow-sm">
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
