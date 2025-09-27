import React from 'react';
export function ParticleBackground() {
  return <div className="absolute inset-0 overflow-hidden">
      {Array.from({
      length: 50
    }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.5 + 0.1;
      return <div key={i} className="absolute rounded-full bg-white" style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: opacity
      }} />;
    })}
    </div>;
}