import React from 'react';

interface VolumetricCloudLayersProps {
  timeOfDay?: 'day' | 'sunset' | 'space';
}

export default function VolumetricCloudLayers({ timeOfDay = 'day' }: VolumetricCloudLayersProps) {
  if (timeOfDay === 'space') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[#090D16]" />
        {/* Subtle crisp star speckles */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(1px 1px at 20px 30px, #FFFDF7, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 140px 70px, #A7D8F5, rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 190px, #FFFDF7, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 400px 320px, #BCEAF0, rgba(0,0,0,0))',
            backgroundSize: '350px 350px'
          }} 
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Calm, readable sky background — gentle and unobtrusive */}
      <div className="absolute inset-0 bg-[#F4F8FC]" />

      {/* Very subtle engineering grid pattern for crisp technical feel */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#0284C7 1px, transparent 1px), linear-gradient(90deg, #0284C7 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gentle, soft clouds on extreme edges only — never washing out center text */}
      <div className="absolute -top-10 -left-20 w-80 h-40 bg-white/70 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-40 -right-20 w-80 h-40 bg-white/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-32 bg-white/50 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
