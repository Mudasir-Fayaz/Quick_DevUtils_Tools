import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Unit Converter",
  description: "Unit Converter helps convert between various units of measurement such as length, weight, and temperature. This tool makes it easy to switch between metric, imperial, and other measurement systems for a wide range of units like meters to feet, kilograms to pounds, or Celsius to Fahrenheit.",
  keywords: "unit converter, length converter, weight converter, temperature converter, measurement converter, convert units, metric converter, imperial converter, unit conversion",
};

const ToolDetail = () => {
  const slug = "unit-converter";

  if (!slug) {
    notFound();
  }

  return (
    <>
      <RenderTool slug={slug} />
    </>
  );
};

export default ToolDetail;