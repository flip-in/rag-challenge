import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Excerpt } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  console.log('sleeping for', ms)
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function highlightText(originalText: string, replacements: Excerpt[]) {
  // Loop through each replacement object
  for (const replacement of replacements) {
    const content = replacement.content;
    const weight = replacement.weight;

    // Escape special characters for safe usage in HTML
    const escapedContent = content.replace(/["&<>]/g, (char: string) => {
      switch (char) {
        case '"': return '&quot;';
        case '&': return '&amp;';
        case '<': return '&lt;';
        case '>': return '&gt;';
        default: return char;
      }
    });

    // Create inline style based on weight
    let inlineStyle;
    if (weight >= 1 && weight <= 2) {
      inlineStyle = 'background-color: rgb(254,249,195,0.9);';
    } else if (weight > 2 && weight <= 4) {
      inlineStyle = 'background-color: rgb(234,179,8,0.4);';
    } else if (weight === 5) {
      inlineStyle = ' background-color: rgb(252 165 165 / var(--tw-bg-opacity);';
    } else {
      throw new Error("Invalid weight value. Weight must be between 1 and 5.");
    }

    // Use regex to find all occurrences (case-sensitive)
    const regex = new RegExp(content, 'g');

    // Replace with span tag, escaped content, and inline style
    originalText = originalText.replace(regex, `<span style="${inlineStyle}">${escapedContent}</span>`);
  }
  return originalText;
}