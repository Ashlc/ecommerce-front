import Ads from "@/components/products/ads";
import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/interfaces";
import api from "@/services/api";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { ChartLineUpIcon, SealCheckIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const { data: arrivals = [], isLoading: isLoadingArrivals } = useQuery({
    queryKey: ["arrivals"],
    queryFn: async () => {
      const res = await api.get<IProduct[]>("/catalog/new-arrivals");
      return res.data;
    },
  });

  const { data: highlights = [], isLoading: isLoadingHighlights } = useQuery({
    queryKey: ["highlights"],
    queryFn: async () => {
      const res = await api.get<IProduct[]>("/catalog/highlights");
      return res.data;
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get<IProduct[]>("/products");
      return res.data;
    },
  });
  return (
    <section className="flex flex-col overflow-hidden dark:bg-default-50/50">
      <ScrollShadow className="bg-default-100 dark:bg-default-50/50 grow h-[calc(100vh-65px)] overflow-x-hidden">
        <div className="p-8 flex flex-col gap-16">
          <Ads />
          <div>
            <div className="flex flex-row gap-4">
              <SealCheckIcon size={32} className="text-primary-500" />
              <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {isLoadingArrivals
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
                : (arrivals || []).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onPress={() => navigate(`/products/${product.id}`)}
                    />
                  ))}
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-4">
              <ChartLineUpIcon size={32} className="text-primary-500" />
              <h2 className="text-2xl font-bold mb-6">Trending</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {isLoadingHighlights
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
                : (highlights || []).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onPress={() => navigate(`/products/${product.id}`)}
                    />
                  ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
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
                : (products || []).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onPress={() => navigate(`/products/${product.id}`)}
                    />
                  ))}
            </div>
          </div>
        </div>
      </ScrollShadow>
    </section>
  );
}
