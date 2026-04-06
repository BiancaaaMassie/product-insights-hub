import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { CategoryBarChart } from "@/components/dashboard/CategoryBarChart";
import { ValuePieChart } from "@/components/dashboard/ValuePieChart";
import { PriceTrendChart } from "@/components/dashboard/PriceTrendChart";
import { ProductTable } from "@/components/dashboard/ProductTable";
import { DataInsights } from "@/components/dashboard/DataInsights";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const { products, loading, error, categoryStats, avgPrice, highValueCategory } = useProducts();

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <p className="font-medium">Failed to load data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 border-b border-border px-4 lg:px-6 bg-card">
            <SidebarTrigger />
            <div>
              <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
              <p className="text-xs text-muted-foreground">Product analytics overview</p>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
            {loading ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-28 rounded-xl" />
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-80 rounded-xl" />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <KpiCards
                  totalProducts={products.length}
                  avgPrice={avgPrice}
                  highValueCategory={highValueCategory}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <CategoryBarChart data={categoryStats} />
                  <ValuePieChart data={categoryStats} />
                </div>

                <PriceTrendChart products={products} />
                <ProductTable products={products} />
                <DataInsights
                  products={products}
                  categoryStats={categoryStats}
                  avgPrice={avgPrice}
                  highValueCategory={highValueCategory}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
