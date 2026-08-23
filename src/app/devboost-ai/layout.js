import { generateMetadata } from "@/lib/seo-utils";

export const metadata = generateMetadata({
  title: "DevBoost AI - AI Code Optimizer",
  description:
    "Use DevBoost AI, a powerful AI-powered code optimization tool built by Nishitha Reddy Musku. Optimize your code for better performance, readability, and efficiency with artificial intelligence.",
  path: "/devboost-ai",
  keywords: [
    "DevBoost AI",
    "AI Code Optimizer",
    "Code Optimization Tool",
    "AI Powered Code Review",
    "Code Performance Optimization",
    "React Native Code Optimizer",
    "Free AI Code Tool",
  ],
  type: "website",
});

export default function DevBoostAILayout({ children }) {
  return children;
}