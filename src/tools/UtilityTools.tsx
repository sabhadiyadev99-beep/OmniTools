import React, { useState } from "react";
import { Copy, Check, Hash, Shield, RefreshCw, QrCode, Download, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { QRCodeSVG } from "qrcode.react";

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let res = "";
    for (let i = 0; i < length; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(res);
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-semibold flex justify-between">
          <span>Password Length: {length}</span>
        </label>
        <input 
          type="range" min="8" max="64" value={length} 
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" 
        />
      </div>
      
      <button 
        onClick={generate}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
      >
        <RefreshCw size={20} /> Generate Password
      </button>

      {password && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-4 border border-slate-200 dark:border-slate-700">
          <code className="text-lg font-mono text-primary break-all">{password}</code>
          <button onClick={copy} className="p-2 text-slate-500 hover:text-primary transition-colors shrink-0">
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
          </button>
        </div>
      )}
    </div>
  );
}

export function QRCodeGenerator() {
  const [value, setValue] = useState("https://omnitools.com");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <label className="text-sm font-semibold">Enter URL or Text:</label>
        <input 
          type="text" value={value} onChange={(e) => setValue(e.target.value)}
          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 ring-primary transition-all"
        />
        <button 
          onClick={handleDownload}
          className="w-full py-4 border-2 border-primary text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Download size={20} /> Download PNG
        </button>
      </div>

      <div className="flex justify-center bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl">
        <QRCodeSVG 
          id="qr-code-svg"
          value={value} size={200} 
          fgColor="currentColor" 
          className="text-slate-900 dark:text-white"
          includeMargin
        />
      </div>
    </div>
  );
}

export function ImageCompressor() {
  const [original, setOriginal] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [loading, setLoading] = useState(false);

  const compress = (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        setCompressed(dataUrl);
        setLoading(false);
      };
    };
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-8">
      <div className={cn(
        "border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center transition-colors",
        "hover:border-primary/50 group"
      )}>
        <input 
          type="file" accept="image/*" className="hidden" id="img-upload" 
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setOriginal(file);
              compress(file);
            }
          }}
        />
        <label htmlFor="img-upload" className="cursor-pointer space-y-4 block">
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-all">
            <Upload size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Click to upload image</p>
            <p className="text-sm text-slate-500">Compress JPG/PNG instantly (Client-side)</p>
          </div>
        </label>
      </div>

      {original && (
        <div className="space-y-4">
           <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
              <span className="text-sm font-medium">{original.name}</span>
              <span className="text-xs text-slate-500">{(original.size / 1024 / 1024).toFixed(2)} MB</span>
           </div>
           
           {loading ? (
             <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" size={32} /></div>
           ) : compressed && (
             <div className="space-y-4">
                <img src={compressed} alt="Compressed" className="w-full rounded-2xl border border-slate-200 dark:border-slate-700" />
                <a 
                  href={compressed} download={`compressed-${original.name}`}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download Compressed Image
                </a>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

export function TextToEmoji() {
  // Logic is in ToolDetailPage (AI based for better results)
  return null;
}
