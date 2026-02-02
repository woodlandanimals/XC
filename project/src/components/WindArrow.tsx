import React from 'react';

interface WindArrowProps {
  direction: number;  // Meteorological wind direction (where wind comes FROM)
  size?: number;
  className?: string;
}

/**
 * Wind arrow that points in the direction the wind is BLOWING (not where it comes from).
 * Meteorological convention: wind direction indicates where wind comes FROM.
 * So a 270° wind (West wind) comes FROM the west and blows TO the east.
 * We add 180° to show the direction the wind is traveling.
 */
const WindArrow: React.FC<WindArrowProps> = ({ direction, size = 14, className = '' }) => {
  // Add 180° to convert from "coming from" to "going to"
  const rotationDegrees = direction + 180;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{
        transform: `rotate(${rotationDegrees}deg)`,
        transition: 'transform 0.2s ease'
      }}
    >
      {/* Arrow pointing up (north) by default, rotation makes it point in wind direction */}
      <path
        d="M12 2L6 14h4v8h4v-8h4L12 2z"
        fill="currentColor"
      />
    </svg>
  );
};

export default WindArrow;
