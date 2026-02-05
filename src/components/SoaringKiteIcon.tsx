import React from 'react';

interface SoaringKiteIconProps {
  className?: string;
}

const SoaringKiteIcon: React.FC<SoaringKiteIconProps> = ({ className = "w-5 h-5" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3 L18 12 L12 15 L6 12 Z" fill="currentColor" opacity="0.3" />
      <path d="M12 3 L18 12 L12 15 L6 12 Z" />
      <line x1="12" y1="15" x2="12" y2="21" />
      <path d="M10 18 L12 17 L14 18" />
      <path d="M11 20 L12 19 L13 20" />
    </svg>
  );
};

export default SoaringKiteIcon;
