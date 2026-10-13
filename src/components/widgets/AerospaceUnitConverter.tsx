import React, { useState } from 'react';
import { ArrowRightLeft, Calculator, CheckCircle2 } from 'lucide-react';
import SoundManager from '../../utils/audio';

type ConversionCategory = 'distance' | 'altitude' | 'airspeed' | 'angles' | 'angular-velocity';

interface ConversionRule {
  fromUnit: string;
  toUnit: string;
  convert: (val: number) => number;
  reverse: (val: number) => number;
  formula: string;
}

const RULES: Record<ConversionCategory, ConversionRule> = {
  distance: {
    fromUnit: 'Metres (m)',
    toUnit: 'Kilometres (km)',
    convert: (m) => m / 1000,
    reverse: (km) => km * 1000,
    formula: '1 km = 1,000 m'
  },
  altitude: {
    fromUnit: 'Feet (ft)',
    toUnit: 'Metres (m)',
    convert: (ft) => ft * 0.3048,
    reverse: (m) => m / 0.3048,
    formula: '1 ft = 0.3048 m'
  },
  airspeed: {
    fromUnit: 'Knots (kts)',
    toUnit: 'Metres / sec (m/s)',
    convert: (kts) => kts * 0.514444,
    reverse: (ms) => ms / 0.514444,
    formula: '1 kt = 0.5144 m/s'
  },
  angles: {
    fromUnit: 'Degrees (°)',
    toUnit: 'Radians (rad)',
    convert: (deg) => (deg * Math.PI) / 180,
    reverse: (rad) => (rad * 180) / Math.PI,
    formula: 'rad = deg × (π / 180)'
  },
  'angular-velocity': {
    fromUnit: 'RPM (rev/min)',
    toUnit: 'Rev / sec (Hz / RPS)',
    convert: (rpm) => rpm / 60,
    reverse: (rps) => rps * 60,
    formula: '1 RPS = RPM / 60'
  }
};

export default function AerospaceUnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>('airspeed');
  const [inputValue, setInputValue] = useState<string>('120');
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');

  const rule = RULES[category];
  const numVal = parseFloat(inputValue);
  const isValid = !isNaN(numVal);

  const result = isValid
    ? direction === 'forward'
      ? rule.convert(numVal)
      : rule.reverse(numVal)
    : 0;

  const handleSwap = () => {
    SoundManager.playClick();
    setDirection(direction === 'forward' ? 'reverse' : 'forward');
  };

  const fromLabel = direction === 'forward' ? rule.fromUnit : rule.toUnit;
  const toLabel = direction === 'forward' ? rule.toUnit : rule.fromUnit;

  return (
    <div className="p-6 rounded-2xl bg-surface border border-border shadow-xl relative overflow-hidden technical-corner">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-5">
        <div className="flex items-center gap-2">
          <Calculator size={18} className="text-primary" />
          <h3 className="font-display font-bold text-sm tracking-wide text-text-primary uppercase">
            Aerospace Unit Converter
          </h3>
        </div>
        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
          ISO_AERO_STD
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[11px]">
        {(Object.keys(RULES) as ConversionCategory[]).map((catKey) => {
          const isSelected = category === catKey;
          return (
            <button
              key={catKey}
              type="button"
              onClick={() => {
                SoundManager.playClick();
                setCategory(catKey);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer capitalize ${
                isSelected
                  ? 'border-primary bg-primary/15 text-primary font-bold shadow-sm'
                  : 'border-border bg-surface-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {catKey.replace('-', ' ')}
            </button>
          );
        })}
      </div>

      {/* Input and Output Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3 mb-5 font-mono">
        {/* Input */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-text-secondary block">
            Input ({fromLabel})
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-surface-elevated border border-border focus:border-primary/60 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-text-primary outline-none transition-colors"
            placeholder="Enter value..."
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center pt-4 sm:pt-0">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap conversion direction"
            className="p-2.5 rounded-xl border border-border bg-surface-elevated hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowRightLeft size={16} />
          </button>
        </div>

        {/* Output */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-text-secondary block">
            Result ({toLabel})
          </label>
          <div className="w-full bg-primary/10 border border-primary/30 rounded-xl px-3.5 py-2.5 text-sm font-bold text-primary flex items-center justify-between">
            <span>{isValid ? Number(result.toFixed(4)) : '—'}</span>
            <CheckCircle2 size={15} className="text-primary/70 shrink-0" />
          </div>
        </div>
      </div>

      {/* Formula Footer */}
      <div className="pt-3 border-t border-border flex items-center justify-between font-mono text-[10px] text-text-secondary">
        <span>Conversion standard: <strong className="text-text-primary">{rule.formula}</strong></span>
        <span>Precision: 4 decimal places</span>
      </div>
    </div>
  );
}
