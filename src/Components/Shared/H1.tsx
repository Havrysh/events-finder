import React from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: ClassNameValue;
};

export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={cn("text-3xl lg:text-6xl font-bold tracking-tight", className)}
    >
      {children}
    </h1>
  );
}
