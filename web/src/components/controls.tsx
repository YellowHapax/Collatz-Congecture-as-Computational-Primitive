import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  formatValue?: (val: number) => string;
}

export function Slider({ label, value, min, max, step = 0.01, onChange, formatValue }: SliderProps) {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex justify-between items-center text-xs font-mono text-gray-400">
        <label>{label}</label>
        <span>{formatValue ? formatValue(value) : value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-400"
      />
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-xs font-mono text-gray-400 group-hover:text-gray-300 transition-colors">
        {label}
      </span>
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
        />
        <div className={cn(
          "block w-10 h-6 border rounded-full transition-colors",
          checked ? "bg-indigo-600 border-indigo-500" : "bg-gray-800 border-gray-700"
        )}></div>
        <div className={cn(
          "dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
          checked ? "transform translate-x-4" : ""
        )}></div>
      </div>
    </label>
  );
}

export function Button({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 bg-gray-800 border border-gray-700 text-sm font-mono text-gray-300 rounded hover:bg-gray-700 hover:text-white transition-colors active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}
