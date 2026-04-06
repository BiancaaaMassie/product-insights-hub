import { Package, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KpiCardsProps {
  totalProducts: number;
  avgPrice: number;
  highValueCategory: string;
}

const kpis = [
  { key: "total", label: "Total Products", icon: Package, color: "blue" },
  { key: "avg", label: "Average Price", icon: DollarSign, color: "teal" },
  { key: "high", label: "High-Value Category", icon: TrendingUp, color: "purple" },
] as const;

export function KpiCards({ totalProducts, avgPrice, highValueCategory }: KpiCardsProps) {
  const values: Record<string, string> = {
    total: totalProducts.toString(),
    avg: `$${avgPrice.toFixed(2)}`,
    high: highValueCategory,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {kpis.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className={`kpi-gradient-${color} border-none shadow-sm hover:shadow-md transition-shadow`}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`kpi-icon-${color} p-3 rounded-xl`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
              <p className="text-2xl font-bold text-foreground capitalize">{values[key]}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
