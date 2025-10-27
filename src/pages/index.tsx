import Ads from "@/components/products/ads";
import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/interfaces";
import api from "@/services/api";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get<IProduct[]>("/products");
      return res.data;
    },
  });

  return (
    <section className="flex flex-col overflow-hidden dark:bg-default-50/60">
      <ScrollShadow className="bg-default-100 dark:bg-default-50/60 grow h-[calc(100vh-65px)] overflow-x-hidden">
        <div className="p-8 flex flex-col gap-8">
          <Ads />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-xl flex flex-col"
                  >
                    <div className="w-full h-48 bg-default-300 rounded-lg mb-4"></div>
                    <div className="h-6 bg-default-300 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-default-300 rounded w-1/2"></div>
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard
                    product={product}
                    onPress={() => navigate(`/products/${product.id}`)}
                  />
                ))}
          </div>
        </div>
      </ScrollShadow>
    </section>
  );
}
