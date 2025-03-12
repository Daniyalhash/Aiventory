"use client";
// app/dashboard/page.tsx
import InsightsOver from "@/components/InsightsOver"
import Product_Benchmark_Section from "@/components/ProductBenchmarkSection";
import LowStockSuggestionSection from "@/components/LowStockSuggestionSection";

import "@/styles/insights.css";

export default function Insights() {
  const handleReload = () => {
    window.location.reload();
  };

    return (
      <div className="InsightPage">
   <InsightsOver onRefresh={handleReload} />
  <Product_Benchmark_Section />
      <LowStockSuggestionSection />


      </div>
    );
  }
  