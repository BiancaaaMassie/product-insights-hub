import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Product } from "@/hooks/useProducts";

export function PriceTrendChart({ products }: { products: Product[] }) {
  const data = products.map((p) => ({ id: p.id, price: p.price }));

  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Price Trend by Product ID</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" />
            <XAxis dataKey="id" tick={{ fontSize: 12 }} label={{ value: "Product ID", position: "insideBottom", offset: -4, fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} label={{ value: "Price ($)", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <Tooltip
              formatter={(val: number) => `$${val.toFixed(2)}`}
              contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Line type="monotone" dataKey="price" stroke="hsl(190 80% 42%)" strokeWidth={2} dot={{ r: 3, fill: "hsl(190 80% 42%)" }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
