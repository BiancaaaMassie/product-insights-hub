import { useState, useEffect } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface CategoryStats {
  name: string;
  count: number;
  totalValue: number;
  avgPrice: number;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categoryStats: CategoryStats[] = Object.values(
    products.reduce<Record<string, CategoryStats>>((acc, p) => {
      if (!acc[p.category]) {
        acc[p.category] = { name: p.category, count: 0, totalValue: 0, avgPrice: 0 };
      }
      acc[p.category].count++;
      acc[p.category].totalValue += p.price;
      return acc;
    }, {})
  ).map((c) => ({ ...c, avgPrice: c.totalValue / c.count }));

  const avgPrice = products.length
    ? products.reduce((s, p) => s + p.price, 0) / products.length
    : 0;

  const highValueCategory = categoryStats.length
    ? categoryStats.reduce((a, b) => (a.avgPrice > b.avgPrice ? a : b)).name
    : "";

  return { products, loading, error, categoryStats, avgPrice, highValueCategory };
}
