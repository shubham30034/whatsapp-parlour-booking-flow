'use client';

export default function SkinModal({ isOpen, onClose, onConfirm }) {
  const [selected, setSelected] = useState(null);

  if (!isOpen) return null;

  const SKIN_TYPES = [
    { id: 'normal', label: 'Normal' },
    { id: 'dry', label: 'Dry' },
    { id: 'oily', label: 'Oily' },
    { id: 'combination', label: 'Comb.' },
    { id: 'sensitive', label: 'Sens.' },
    { id: 'unsure', label: 'Not Sure' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-[#FDFCFB] w-full max-w-lg p-8 md:p-12 shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <header className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B7E74] mb-2">Consultation</p>
          <h2 className="text-[32px] font-bold tracking-tighter leading-none">
            Your <span className="italic font-serif font-light">Skin Portrait</span>
          </h2>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {SKIN_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`py-4 px-2 border transition-all duration-300 rounded-[2px] text-[11px] font-black uppercase tracking-widest
                ${selected === type.id 
                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-lg' 
                  : 'bg-white border-[#F1F1F1] text-[#1A1A1A] hover:border-[#8B7E74]'}`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => onConfirm(selected)}
          className={`w-full py-5 text-[12px] font-black uppercase tracking-[0.3em] transition-all
            ${selected ? 'bg-[#8B7E74] text-white shadow-xl' : 'bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed'}`}
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );
}