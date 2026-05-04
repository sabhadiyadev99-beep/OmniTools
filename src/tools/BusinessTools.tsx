import React, { useState } from "react";
import { Download, Plus, Trash2, Printer } from "lucide-react";
import { jsPDF } from "jspdf";
import { cn } from "@/src/lib/utils";

export function InvoiceGenerator() {
  const [items, setItems] = useState([{ desc: "", qty: 1, price: 0 }]);
  const [info, setInfo] = useState({
    billFrom: "", billTo: "", invoiceNo: "INV-" + Date.now().toString().slice(-4), date: new Date().toLocaleDateString()
  });

  const addItem = () => setItems([...items, { desc: "", qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));
  
  const updateItem = (idx: number, field: string, val: any) => {
    const newItems = [...items];
    (newItems[idx] as any)[field] = val;
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("INVOICE", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`Invoice #: ${info.invoiceNo}`, 20, 40);
    doc.text(`Date: ${info.date}`, 20, 45);

    doc.text("BILL FROM:", 20, 60);
    doc.text(info.billFrom, 20, 65);

    doc.text("BILL TO:", 120, 60);
    doc.text(info.billTo, 120, 65);

    // Table Header
    doc.line(20, 80, 190, 80);
    doc.text("Description", 25, 85);
    doc.text("Qty", 120, 85);
    doc.text("Price", 145, 85);
    doc.text("Total", 170, 85);
    doc.line(20, 88, 190, 88);

    let y = 95;
    items.forEach(item => {
      doc.text(item.desc, 25, y);
      doc.text(item.qty.toString(), 120, y);
      doc.text(`$${item.price.toFixed(2)}`, 145, y);
      doc.text(`$${(item.qty * item.price).toFixed(2)}`, 170, y);
      y += 8;
    });

    doc.line(140, y + 2, 190, y + 2);
    doc.setFontSize(12);
    doc.text(`GRAND TOTAL: $${total.toFixed(2)}`, 140, y + 10);

    doc.save(`${info.invoiceNo}.pdf`);
  };

  return (
    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
           <label className="text-sm font-bold opacity-70">Bill From:</label>
           <textarea 
            placeholder="Your Business Name & Address" 
            value={info.billFrom} onChange={e => setInfo({...info, billFrom: e.target.value})}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-24"
           />
        </div>
        <div className="space-y-4">
           <label className="text-sm font-bold opacity-70">Bill To:</label>
           <textarea 
            placeholder="Client Name & Address" 
            value={info.billTo} onChange={e => setInfo({...info, billTo: e.target.value})}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-24"
           />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_60px_100px_60px] gap-2 text-xs font-bold uppercase text-slate-400">
           <span>Description</span>
           <span>Qty</span>
           <span>Price</span>
           <span></span>
        </div>
        
        {items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_60px_100px_40px] gap-2 items-center">
             <input 
              placeholder="Service/Product" 
              value={item.desc} onChange={e => updateItem(idx, "desc", e.target.value)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm"
             />
             <input 
              type="number" value={item.qty} onChange={e => updateItem(idx, "qty", parseInt(e.target.value) || 0)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm"
             />
             <input 
              type="number" value={item.price} onChange={e => updateItem(idx, "price", parseFloat(e.target.value) || 0)}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-none text-sm"
             />
             <button onClick={() => removeItem(idx)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg">
                <Trash2 size={18} />
             </button>
          </div>
        ))}

        <button 
          onClick={addItem}
          className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
        >
          <Plus size={16} /> Add Line Item
        </button>
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="text-2xl font-bold">
            <span className="text-slate-400 font-normal">Total:</span> ${total.toFixed(2)}
         </div>
         <button 
          onClick={downloadPDF}
          className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all"
         >
          <Download size={20} /> Download PDF Invoice
         </button>
      </div>
    </div>
  );
}
