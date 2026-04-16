"use client";

export default function Loader({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[9999]">
      
      <svg viewBox="0 0 100 150" className="w-24 h-36 loader-svg">
        <g className="loader-group">
          <path d="M 50,100 A 35,35 0 0 1 50,0" />
        </g>
        <g className="loader-group delay">
          <path d="M 50,75 A 35,35 0 0 0 50,-25" />
        </g>

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF56A1" />
            <stop offset="100%" stopColor="#FF9350" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}