import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CategoryStats } from "@/hooks/useProducts";

const COLORS = [
  "hsl(217 91% 50%)",
  "hsl(190 80% 42%)",
  "hsl(262 60% 55%)",
  "hsl(25 90% 55%)",
  "hsl(150 60% 42%)",
];

export function ValuePieChart({ data }: { data: CategoryStats[] }) {
  const pieData = data.map((c) => ({
    name: c.name,
    value: parseFloat(c.totalValue.toFixed(2)),
  }));

  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Value Distribution by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) => `${name.slice(0, 10)}… ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: number) => `$${val.toFixed(2)}`}
              contentStyle={{ borderRadius: "0.5rem", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
