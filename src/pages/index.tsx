import Ads from "@/components/products/ads";
import ProductCard from "@/components/products/product-card";
import { products } from "@/services/mock";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col overflow-hidden">
      <ScrollShadow className="bg-default-100 dark:bg-default-50 grow h-[calc(100vh-65px)] overflow-x-hidden">
        <div className="p-8 flex flex-col gap-8">
          <Ads />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {products.map((product) => (
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
