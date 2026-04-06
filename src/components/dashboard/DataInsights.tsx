import { Lightbulb, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryStats, Product } from "@/hooks/useProducts";

interface Props {
  products: Product[];
  categoryStats: CategoryStats[];
  avgPrice: number;
  highValueCategory: string;
}

export function DataInsights({ products, categoryStats, avgPrice, highValueCategory }: Props) {
  const mostProducts = categoryStats.length
    ? categoryStats.reduce((a, b) => (a.count > b.count ? a : b))
    : null;

  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating.rate, 0) / products.length).toFixed(2)
    : "0";

  const highPriced = products.filter((p) => p.price > avgPrice).length;
  const lowPriced = products.length - highPriced;

  const insights = [
    {
      icon: Lightbulb,
      title: "Main Insight",
      color: "blue" as const,
      text: `The store carries ${products.length} products across ${categoryStats.length} categories. "${mostProducts?.name}" leads with ${mostProducts?.count} products, while "${highValueCategory}" commands the highest average price, indicating a premium segment.`,
    },
    {
      icon: TrendingUp,
      title: "Pricing & Rating Trends",
      color: "teal" as const,
      text: `Product prices average $${avgPrice.toFixed(2)}, with ${highPriced} products above average and ${lowPriced} below. The mean customer rating sits at ${avgRating}/5, showing generally strong product satisfaction. Price fluctuations across product IDs suggest varied sourcing and positioning strategies.`,
    },
    {
      icon: Target,
      title: "Business Recommendations",
      color: "purple" as const,
      text: `Consider expanding the "${highValueCategory}" category to capitalize on its premium pricing. For categories with lower average prices, bundling or upselling strategies could improve revenue. Focus marketing on products rated above 4.0 to leverage social proof and drive conversions.`,
    },
  ];

  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Data Insights</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 md:grid-cols-3">
        {insights.map(({ icon: Icon, title, color, text }) => (
          <div key={title} className={`kpi-gradient-${color} rounded-xl p-5`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`kpi-icon-${color} p-2 rounded-lg`}>
                <Icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
