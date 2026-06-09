import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { cn } from "@/lib/utils";

export function MathInline({ math, className }: { math: string; className?: string }) {
  return (
    <span className={cn("text-gray-200", className)}>
      <InlineMath math={math} />
    </span>
  );
}

export function MathDisplay({ math, className }: { math: string; className?: string }) {
  return (
    <div className={cn("text-gray-200 my-4 text-center overflow-x-auto", className)}>
      <BlockMath math={math} />
    </div>
  );
}
