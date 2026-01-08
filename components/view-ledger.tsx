// "use client";
// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { 
//   Lock, ShieldCheck, Globe, Check, Copy, 
//   Menu, X, LayoutDashboard, QrCode, Search,
//   ChevronRight, Database, Fingerprint, Camera, 
//   Upload, ChevronDown, ChevronUp, ExternalLink,
//   Printer, Download
// } from "lucide-react";
// import { useParams, useRouter } from "next/navigation";
// import { useLedgers } from "../hooks"; 
// import { APPNAME } from "../const";
// import toast from "react-hot-toast";
// import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

// export default function PublicViewPage() {
//   const router = useRouter();
//   const { id } = useParams();
  
//   const [ledger, setLedger] = useState<any>(null);
//   const [mainledgers, setMainLedgers] = useState<any[]>([]);
//   const [isMain, setIsMain] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showControls, setShowControls] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const [copiedSgid, setCopiedSgid] = useState(false);

//   const { getLedegerById,lookupAccount } = useLedgers();
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (id) fetchData(id as string);
//   }, [id]);

//   const fetchData = async (targetId: string) => {
//     setLoading(true);
//     const data = await getLedegerById(targetId);
//     if (data.success) {
//       if (data.isMain) {
//         setIsMain(true);
//         setMainLedgers(data.data || []);
//       } else {
//         setIsMain(false);
//         setLedger(data.data);
//       }
//     } else {
//       toast.error("Invalid Security Gate");
//     }
//     setLoading(false);
//   };

//   const handleCopySgid = (sgid: string) => {
//     navigator.clipboard.writeText(sgid);
//     setCopiedSgid(true);
//     toast.success("Identity Reference Copied");
//     setTimeout(() => setCopiedSgid(false), 2000);
//   };

//   // --- SCANNING LOGIC ---
//   const handleScanResult = (decodedText: string) => {
//     const parts = decodedText.split('/');
//     const extractedId = parts[parts.length - 1];
//     setIsScannerOpen(false);
//     router.push(`/view-ledger/${extractedId}`);
//   };

//   const startCamera = () => {
//     setIsScannerOpen(true);
//     setTimeout(() => {
//       const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
//       scanner.render(handleScanResult, (err) => console.log(err));
//     }, 100);
//   };

//   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const html5QrCode = new Html5Qrcode("reader-hidden");
//     try {
//       const result = await html5QrCode.scanFile(file, true);
//       handleScanResult(result);
//     } catch (err) {
//       toast.error("No valid OneID QR found in image");
//     }
//   };

//   const EmptyStateScanner = () => (
//     <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-in fade-in zoom-in duration-500">
//       <div className="relative">
//         <div className="absolute -inset-8 bg-orange-500/10 rounded-full animate-pulse" />
//         <div className="w-32 h-32 bg-zinc-950 flex items-center justify-center rounded-3xl shadow-2xl relative z-10 border border-white/10">
//           <QrCode size={60} className="text-orange-500" />
//         </div>
//       </div>
//       <div className="text-center space-y-2">
//         <h2 className="text-4xl font-black italic tracking-tighter uppercase">Gate_Entry</h2>
//         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Scan QR to decrypt identity node</p>
//       </div>
//       <div className="flex gap-4">
//         <button onClick={startCamera} className="flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-800 transition-all rounded-sm">
//           <Camera size={18} /> Open Lens
//         </button>
//         <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-8 py-4 bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all rounded-sm">
//           <Upload size={18} /> Upload Snap
//         </button>
//       </div>
//       <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
//       <div id="reader-hidden" className="hidden"></div>
//     </div>
//   );

//   if (loading) return (
//     <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center space-y-4 font-mono">
//         <div className="w-12 h-12 border-4 border-zinc-200 border-t-orange-800 rounded-full animate-spin" />
//         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Decrypting_Node...</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-zinc-50/50 text-zinc-950 font-sans p-4 md:p-12 relative overflow-hidden">
      
//       {isScannerOpen && (
//         <div className="fixed inset-0 z-[200] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6">
//           <button onClick={() => setIsScannerOpen(false)} className="absolute top-8 right-8 text-white hover:text-orange-500 transition-colors">
//             <X size={32} />
//           </button>
//           <div className="w-full max-w-md bg-white p-4 rounded-2xl overflow-hidden shadow-2xl">
//             <div id="reader" className="w-full"></div>
//           </div>
//         </div>
//       )}

//       {/* --- FLOATING CONTROLS --- */}
//       <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 print:hidden">
//         {showControls && (
//           <div className="bg-zinc-950 text-white p-2 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-1 animate-in slide-in-from-bottom-4 duration-300">
//             <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
//               <LayoutDashboard size={16} className="text-orange-500" /> Dashboard
//             </button>
//             <div className="h-px bg-white/5 mx-4" />
//             <button onClick={startCamera} className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
//               <QrCode size={16} className="text-orange-500" /> Snap New
//             </button>
//           </div>
//         )}
//         <button onClick={() => setShowControls(!showControls)} className="w-14 h-14 bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-800 transition-all border border-white/20">
//           {showControls ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       <div className="max-w-5xl mx-auto space-y-8">
//         {!id ? <EmptyStateScanner /> : (
//           <>
//             <div className="flex items-center justify-center gap-3 py-4 bg-zinc-950 text-white rounded-full shadow-xl shadow-zinc-200/50 print:hidden">
//                 <ShieldCheck size={14} className="text-orange-500" />
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified_Registry_Node // {isMain ? "Vault_Cluster" : "Single_Identity"}</span>
//             </div>

//             {isMain ? (
//               <div className="space-y-8 animate-in fade-in duration-700">
//                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//                   <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Vault_Cluster.</h1>
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
//                     <input 
//                       type="text" placeholder="FILTER_NODES..." value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="bg-white border border-zinc-200 py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none w-full md:w-80 shadow-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {mainledgers.filter(l => `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())).map((l) => (
//                     <div key={l.id} className={`bg-white border transition-all ${expandedId === l.id ? 'border-orange-800 shadow-xl' : 'border-zinc-200 hover:border-zinc-400'}`}>
//                       <div className="p-6 flex items-center justify-between cursor-pointer group" onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}>
//                         <div className="flex items-center gap-6">
//                           <Fingerprint size={24} className={expandedId === l.id ? 'text-orange-800' : 'text-zinc-300'} />
//                           <div>
//                             <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{l.bank?.name}</p>
//                             <h3 className="text-sm font-bold uppercase tracking-widest">{l.firstName} {l.lastName}</h3>
//                             {/* ALIAS ADDED HERE FOR VISIBILITY WHEN COLLAPSED */}
//                             <p className="text-[10px] font-bold text-orange-800 uppercase mt-1">Alias: {l.alias || "UNNAMED"}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-4">
//                            <button onClick={(e) => { e.stopPropagation(); router.push(`/view-ledger/${l.SGId}`); }} className="hidden md:flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950">
//                              View Certificate <ExternalLink size={12} />
//                            </button>
//                            {expandedId === l.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                         </div>
//                       </div>

//                       {expandedId === l.id && (
//                         <div className="px-6 pb-6 pt-2 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in slide-in-from-top-2 duration-300 border-t border-zinc-50">
//                            <div className="space-y-1">
//                              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Sequence</p>
//                              <p className="text-xs font-mono font-bold tracking-widest">{l.accountNumber}</p>
//                            </div>
//                            <div className="space-y-1">
//                              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Node_Alias</p>
//                              <p className="text-xs font-bold uppercase">{l.alias || "UNNAMED"}</p>
//                            </div>
//                            <div className="space-y-1">
//                              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">System_SGID</p>
//                              <p className="text-xs font-mono font-bold text-orange-800">{l.SGId}</p>
//                            </div>
//                            <div className="flex items-end justify-end">
//                               <button onClick={() => router.push(`/view-ledger/${l.SGId}`)} className="w-full bg-zinc-950 text-white py-3 px-6 text-[9px] font-black uppercase tracking-widest hover:bg-orange-800 transition-colors">
//                                 Full Decryption
//                               </button>
//                            </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               /* --- ROBUST SINGLE VIEW (CERTIFICATE) --- */
//               <div className="space-y-6 animate-in zoom-in-95 duration-500">
//                 {/* Certificate Controls (Print/Download) */}
//                 <div className="flex justify-end gap-3 print:hidden">
//                   <button onClick={() => window.print()} className="flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-widest hover:border-zinc-950 transition-all shadow-sm">
//                     <Printer size={16} /> Print Node
//                   </button>
//                   <button onClick={() => window.print()} className="flex items-center gap-3 px-6 py-3 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-800 transition-all shadow-xl">
//                     <Download size={16} /> Save PDF
//                   </button>
//                 </div>

//                 <div id="print-area" className="bg-white border border-zinc-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative">
//                   <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
//                     <Lock size={400} />
//                   </div>

//                   {/* Header */}
//                   <div className="p-12 border-b border-zinc-100 flex justify-between items-start relative z-10">
//                     <div className="space-y-6">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-orange-800 flex items-center justify-center rounded-sm">
//                           <Lock size={16} className="text-white" />
//                         </div>
//                         <span className="text-xs font-black uppercase tracking-[0.4em]">{APPNAME}_Vault</span>
//                       </div>
//                       <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
//                         Identity <br/> Verification.
//                       </h1>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Issue_Date</p>
//                       <p className="text-xs font-bold uppercase">{new Date(ledger?.createdAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   {/* Body */}
//                   <div className="p-12 space-y-12 relative z-10">
//                     <div className="space-y-8">
//                       <div className="space-y-1">
//                         <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-800">Legal_Beneficiary</h3>
//                         <p className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
//                           {ledger?.firstName} {ledger?.lastName}
//                         </p>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-50">
//                         <div className="space-y-1">
//                           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Institutional_Origin</h3>
//                           <p className="text-lg font-bold uppercase">{ledger?.bank?.name || "N/A"}</p>
//                         </div>
//                         <div className="space-y-1">
//                           <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Account_Sequence</h3>
//                           <p className="text-lg font-mono font-bold tracking-[0.2em]">{ledger?.accountNumber}</p>
//                         </div>
//                       </div>

//                       <div className="space-y-4 pt-8 border-t border-zinc-100">
//                         <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cryptographic_SGID</h3>
//                         <div onClick={() => handleCopySgid(ledger?.SGId)} className="flex items-center justify-between gap-4 bg-zinc-50 p-6 rounded-sm border border-zinc-100 group cursor-pointer hover:border-zinc-950 transition-all">
//                           <code className="text-xl font-mono font-bold text-zinc-900 tracking-tighter">{ledger?.SGId}</code>
//                           <div className="flex items-center gap-3">
//                             <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${copiedSgid ? 'text-orange-800' : 'text-zinc-400'}`}>
//                               {copiedSgid ? <Check size={12} /> : <Copy size={12} />} 
//                               {copiedSgid ? "Copied" : "Copy Ref"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Security Footer */}
//                   <div className="bg-zinc-950 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 print:bg-zinc-50 print:text-zinc-950">
//                     <div className="flex items-center gap-6">
//                       <div className="flex flex-col">
//                         <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Security_Hash</span>
//                         <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest truncate max-w-[150px]">
//                           {ledger?.id?.slice(0, 16)}_VALID
//                         </span>
//                       </div>
//                       <div className="h-8 w-px bg-zinc-800 print:bg-zinc-200" />
//                       <div className="flex items-center gap-4 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
//                         <ShieldCheck size={16} /> Verified Node
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 opacity-50 text-[9px] font-black uppercase tracking-widest font-mono">
//                       <Globe size={14} /> OneID_Global_Registry_Validated
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* Footer Info */}
//         <div className="flex flex-col items-center gap-4 py-8 opacity-40">
//            <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em]">
//               <span>Privacy_Protocol</span>
//               <div className="w-1 h-1 bg-zinc-400 rounded-full" />
//               <span>Encrypted_Data_Node</span>
//               <div className="w-1 h-1 bg-zinc-400 rounded-full" />
//               <span>Realtime_Verification</span>
//            </div>
//            <p className="text-[8px] font-mono text-zinc-400">GEN_SEC_REF: {id?.slice(0, 8) || "GATE"}-{new Date().getFullYear()}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState, useMemo, useRef, memo } from "react";
import { 
  Lock, ShieldCheck, Globe, Check, Copy, 
  Menu, X, LayoutDashboard, QrCode, Search,
  ChevronRight, Database, Fingerprint, Camera, 
  Upload, ChevronDown, ChevronUp, ExternalLink,
  Printer, Download, Hash,
  SearchIcon
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useLedgers } from "../hooks"; 
import { APPNAME, DOMAIN } from "../const";
import toast from "react-hot-toast";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { updateQueryUrl } from "@/utils";

export default function PublicViewPage() {
  const router = useRouter();
  const { id:_id } = useParams();
const [id,setId]=useState(null)
  useEffect(()=>{
    if(_id){
      setId(_id)
    }
  },[_id])
  
  const [ledger, setLedger] = useState<any>(null);
  const [mainledgers, setMainLedgers] = useState<any[]>([]);
  const [isMain, setIsMain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualId, setManualId] = useState(""); // State for the manual input
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [copiedSgid, setCopiedSgid] = useState(false);

  const { getLedegerById, lookupAccount } = useLedgers();
  const fileInputRef = useRef<HTMLInputElement>(null);
const isSGId = useMemo(()=>{
 return !!id?.startsWith("SG")

},[id])
  useEffect(() => {
    if (id) fetchData(id as string);
  }, [id]);

  const fetchData = async (targetId: string) => {
    setLoading(true);
    try {
      let data: any;
      
      // CHANGE: If ID does not start with SG, use lookupAccountNumber
      if (!targetId.startsWith("SG") && targetId !== "main") {
        data = await lookupAccount(targetId);
      } else {
        data = await getLedegerById(targetId);
      }

      if (data.success) {
        if (data.isMain) {
          setIsMain(true);
          setMainLedgers(data.data || []);
        } else {
          setIsMain(false);
          setLedger(data.data);
        }
      } else {
        toast.error("Invalid Security Gate / Account");
      }
      return data
    } catch (err) {
      toast.error("Handshake failed");
    }finally{

      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    if (!manualId.trim()) return;
   let d = await fetchData(manualId.trim())
   if(d.success){
let url = new URL(window.location.href)
    updateQueryUrl(url+`/${manualId}`)
        
      setId(manualId)
    
   }
    // router.push(`/view-ledger/${manualId.trim()}`);
  };

  const handleCopySgid = (sgid: string) => {
    navigator.clipboard.writeText(sgid);
    setCopiedSgid(true);
    toast.success("Identity Reference Copied");
    setTimeout(() => setCopiedSgid(false), 2000);
  };

  // --- SCANNING LOGIC ---
  const handleScanResult = (decodedText: string) => {
    const parts = decodedText.split('/');
    const extractedId = parts[parts.length - 1];
    setIsScannerOpen(false);
    router.push(`/view-ledger/${extractedId}`);
  };

  const startCamera = () => {
    setIsScannerOpen(true);
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
      scanner.render(handleScanResult, (err) => console.log(err));
    }, 100);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const html5QrCode = new Html5Qrcode("reader-hidden");
    try {
      const result = await html5QrCode.scanFile(file, true);
      handleScanResult(result);
    } catch (err) {
      toast.error("No valid OneID QR found in image");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center space-y-4 font-mono">
        <div className="w-12 h-12 border-4 border-zinc-200 border-t-orange-800 rounded-full animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Decrypting_Node...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-950 font-sans p-4 md:p-12 relative overflow-hidden">
      
      {isScannerOpen && (
        <div className="fixed inset-0 z-[200] bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <button onClick={() => setIsScannerOpen(false)} className="absolute top-8 right-8 text-white hover:text-orange-500 transition-colors">
            <X size={32} />
          </button>
          <div className="w-full max-w-md bg-white p-4 rounded-2xl overflow-hidden shadow-2xl">
            <div id="reader" className="w-full"></div>
          </div>
        </div>
      )}

      {/* --- FLOATING CONTROLS --- */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 print:hidden">
        {showControls && (
          <div className="bg-zinc-950 text-white p-2 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-1 animate-in slide-in-from-bottom-4 duration-300">
            <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
              <LayoutDashboard size={16} className="text-orange-500" /> Dashboard
            </button>
            <div className="h-px bg-white/5 mx-4" />
            <button onClick={startCamera} className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
              <QrCode size={16} className="text-orange-500" /> Snap New
            </button>
               <button onClick={() => router.push('/view-ledger')} className="flex items-center gap-3 px-6 py-4 hover:bg-white/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest">
              <SearchIcon size={16} className="text-orange-500" /> Search
            </button>
          </div>
        )}
        <button onClick={() => setShowControls(!showControls)} className="w-14 h-14 bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-orange-800 transition-all border border-white/20">
          {showControls ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {!id ? (
          /* --- MODIFIED EMPTY STATE WITH MANUAL INPUT --- */
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-in fade-in zoom-in duration-500 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute -inset-8 bg-orange-500/10 rounded-full animate-pulse" />
              <div className="w-32 h-32 bg-zinc-950 flex items-center justify-center rounded-3xl shadow-2xl relative z-10 border border-white/10">
                <QrCode size={60} className="text-orange-500" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase">Gate_Entry</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Decrypt node via optics or sequence</p>
            </div>

            {/* NEW: Manual Account Input */}
            <form onSubmit={handleManualSubmit} className="w-full relative group">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-800 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="INPUT ACCOUNT NUMBER..."
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                className="w-full bg-white border border-zinc-200 py-5 pl-12 pr-12 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-zinc-950 shadow-sm transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-950 transition-colors">
                <ChevronRight size={20} />
              </button>
            </form>

            <div className="flex items-center gap-4 w-full opacity-20">
              <div className="h-px bg-zinc-950 flex-1" />
              <span className="text-[8px] font-black uppercase">Or</span>
              <div className="h-px bg-zinc-950 flex-1" />
            </div>

            <div className="flex gap-4 w-full">
              <button onClick={startCamera} className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-800 transition-all rounded-sm">
                <Camera size={18} /> Open Lens
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all rounded-sm">
                <Upload size={18} /> Upload
              </button>
            </div>
            <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
            <div id="reader-hidden" className="hidden"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 py-4 bg-zinc-950 text-white rounded-full shadow-xl shadow-zinc-200/50 print:hidden">
                <ShieldCheck size={14} className="text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified_Registry_Node // {isMain ? "Vault_Cluster" : "Single_Identity"}</span>
            </div>

            {isMain ? (
              <div className="space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Vault_Cluster.</h1>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input 
                      type="text" placeholder="FILTER_NODES..." value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white border border-zinc-200 py-4 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none w-full md:w-80 shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {mainledgers.filter(l => `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())).map((l) => (
                    <div key={l.id} className={`bg-white border transition-all ${expandedId === l.id ? 'border-orange-800 shadow-xl' : 'border-zinc-200 hover:border-zinc-400'}`}>
                      <div className="p-6 flex items-center justify-between cursor-pointer group" onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}>
                        <div className="flex items-center gap-6">
                          <Fingerprint size={24} className={expandedId === l.id ? 'text-orange-800' : 'text-zinc-300'} />
                          <div>
                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{l.bank?.name}</p>
                            <h3 className="text-sm font-bold uppercase tracking-widest">{l.firstName} {l.lastName}</h3>
                            <p className="text-[10px] font-bold text-orange-800 uppercase mt-1">Alias: {l.alias || "UNNAMED"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <button onClick={(e) => { e.stopPropagation(); router.push(`/view-ledger/${l.SGId}`); }} className="hidden md:flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-950">
                             View Certificate <ExternalLink size={12} />
                           </button>
                           {expandedId === l.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>

                      {expandedId === l.id && (
                        <div className="px-6 pb-6 pt-2 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in slide-in-from-top-2 duration-300 border-t border-zinc-50">
                           <div className="space-y-1">
                             <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Sequence</p>
                             <p className="text-xs font-mono font-bold tracking-widest">{l.accountNumber}</p>
                           </div>
                           <div className="space-y-1">
                             <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Node_Alias</p>
                             <p className="text-xs font-bold uppercase">{l.alias || "UNNAMED"}</p>
                           </div>
                           <div className="space-y-1">
                             <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">System_SGID</p>
                             <p className="text-xs font-mono font-bold text-orange-800">{l.SGId}</p>
                           </div>
                           <div className="flex items-end justify-end">
                              <button onClick={() => router.push(`/view-ledger/${l.SGId}`)} className="w-full bg-zinc-950 text-white py-3 px-6 text-[9px] font-black uppercase tracking-widest hover:bg-orange-800 transition-colors">
                                Full Decryption
                              </button>
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* --- ROBUST SINGLE VIEW (CERTIFICATE) --- */
              <div className="space-y-6 animate-in zoom-in-95 duration-500">
                <div className="flex justify-end gap-3 print:hidden">
                  <button onClick={() => window.print()} className="flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-widest hover:border-zinc-950 transition-all shadow-sm">
                    <Printer size={16} /> Print Node
                  </button>
                  <button onClick={() => window.print()} className="flex items-center gap-3 px-6 py-3 bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-800 transition-all shadow-xl">
                    <Download size={16} /> Save PDF
                  </button>
                </div>

                <div id="print-area" className="bg-white border border-zinc-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <Lock size={400} />
                  </div>

                  <div className="p-12 border-b border-zinc-100 flex justify-between items-start relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-800 flex items-center justify-center rounded-sm">
                          <Lock size={16} className="text-white" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.4em]">{APPNAME}_Vault</span>
                      </div>
                      <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                      
                       { 
                       isSGId?
                       <>
                       Identity <br/> Verification.
                       </>:
                       <>
                       Account <br/> Lookup.
                       </>
                       
                       }
                      </h1>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Issue_Date</p>
                      <p className="text-xs font-bold uppercase">{new Date(ledger?.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="p-12 space-y-12 relative z-10">
                    <div className="space-y-8">
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-800">Legal_Beneficiary</h3>
                        <p className="text-4xl md:text-6xl font-black tracking-tight uppercase leading-none">
                          {ledger?.firstName} {ledger?.lastName}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-50">
                        <div className="space-y-1">
                          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Institutional_Origin</h3>
                          <p className="text-lg font-bold uppercase">{ledger?.bank?.name || "N/A"}</p>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Account_Sequence</h3>
                          <p className="text-lg font-mono font-bold tracking-[0.2em]">{ledger?.accountNumber}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-8 border-t border-zinc-100">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Cryptographic_SGID</h3>
                        <div onClick={() => handleCopySgid(ledger?.SGId)} className="flex items-center justify-between gap-4 bg-zinc-50 p-6 rounded-sm border border-zinc-100 group cursor-pointer hover:border-zinc-950 transition-all">
                          <code className="text-xl font-mono font-bold text-zinc-900 tracking-tighter">{ledger?.SGId}</code>
                          <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${copiedSgid ? 'text-orange-800' : 'text-zinc-400'}`}>
                              {copiedSgid ? <Check size={12} /> : <Copy size={12} />} 
                              {copiedSgid ? "Copied" : "Copy Ref"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 print:bg-zinc-50 print:text-zinc-950">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Security_Hash</span>
                        <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest truncate max-w-[150px]">
                          {ledger?.id?.slice(0, 16)}_VALID
                        </span>
                      </div>
                      <div className="h-8 w-px bg-zinc-800 print:bg-zinc-200" />
                      <div className="flex items-center gap-4 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldCheck size={16} /> Verified Node
                      </div>
                    </div>
                    <div className="flex items-center gap-4 opacity-50 text-[9px] font-black uppercase tracking-widest font-mono">
                      <Globe size={14} /> OneID_Global_Registry_Validated
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col items-center gap-4 py-8 opacity-40">
           <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em]">
              <span>Privacy_Protocol</span>
              <div className="w-1 h-1 bg-zinc-400 rounded-full" />
              <span>Encrypted_Data_Node</span>
              <div className="w-1 h-1 bg-zinc-400 rounded-full" />
              <span>Realtime_Verification</span>
           </div>
           <p className="text-[8px] font-mono text-zinc-400">GEN_SEC_REF: {id?.slice(0, 8) || "GATE"}-{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}