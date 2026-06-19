import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merger
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format ISO date → "10 Jun 2025"
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Estimate read time from content string
export function readTime(content = "") {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// Capitalise first letter
export function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}