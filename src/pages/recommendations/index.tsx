import PageTitle from "@/components/page-title";
import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/interfaces";
import { ScrollShadow } from "@heroui/scroll-shadow";
import {
  SparkleIcon,
  TrendUpIcon,
  UserIcon,
  HeartIcon,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

// Dados mockados de produtos recomendados
const mockRecommendedProducts: IProduct[] = [
  {
    id: "rec-1",
    name: "Wireless Gaming Mouse",
    description: "High precision wireless gaming mouse with RGB lighting",
    price: 149.99,
    category: "Electronics",
    quantityInStock: 25,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-2",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 299.99,
    category: "Electronics",
    quantityInStock: 15,
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-3",
    name: "Noise Cancelling Headphones",
    description: "Premium wireless headphones with active noise cancellation",
    price: 349.99,
    category: "Audio",
    quantityInStock: 30,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-4",
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor",
    price: 399.99,
    category: "Wearables",
    quantityInStock: 20,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-5",
    name: "Portable SSD 1TB",
    description: "Ultra-fast portable solid state drive",
    price: 189.99,
    category: "Storage",
    quantityInStock: 40,
    imageUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "rec-6",
    name: "USB-C Hub",
    description: "Multi-port USB-C adapter with HDMI and card reader",
    price: 79.99,
    category: "Accessories",
    quantityInStock: 50,
    imageUrl: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    createdAt: new Date().toISOString(),
  },
];

const mockPersonalizedProducts: IProduct[] = [
  {
    id: "pers-1",
    name: "Ergonomic Office Chair",
    description: "Comfortable chair with lumbar support for long work sessions",
    price: 459.99,
    category: "Furniture",
    quantityInStock: 12,
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pers-2",
    name: "4K Webcam",
    description: "Professional webcam with auto-focus and low-light correction",
    price: 199.99,
    category: "Electronics",
    quantityInStock: 18,
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pers-3",
    name: "Standing Desk",
    description: "Adjustable height standing desk with memory presets",
    price: 599.99,
    category: "Furniture",
    quantityInStock: 8,
    imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pers-4",
    name: "LED Desk Lamp",
    description: "Smart LED lamp with adjustable color temperature",
    price: 89.99,
    category: "Lighting",
    quantityInStock: 35,
    imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pers-5",
    name: "Laptop Stand",
    description: "Aluminum laptop stand with cooling design",
    price: 49.99,
    category: "Accessories",
    quantityInStock: 45,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "pers-6",
    name: "Cable Management Kit",
    description: "Complete solution for organizing desk cables",
    price: 29.99,
    category: "Accessories",
    quantityInStock: 60,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    createdAt: new Date().toISOString(),
  },
];

const mockTrendingProducts: IProduct[] = [
  {
    id: "trend-1",
    name: "Wireless Earbuds Pro",
    description: "True wireless earbuds with spatial audio",
    price: 249.99,
    category: "Audio",
    quantityInStock: 22,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "trend-2",
    name: "Portable Monitor 15.6\"",
    description: "USB-C portable monitor for dual screen setup",
    price: 299.99,
    category: "Monitors",
    quantityInStock: 14,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "trend-3",
    name: "Gaming Chair RGB",
    description: "Professional gaming chair with RGB lighting",
    price: 499.99,
    category: "Furniture",
    quantityInStock: 10,
    imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "trend-4",
    name: "Smartphone Gimbal",
    description: "3-axis stabilizer for professional mobile videos",
    price: 159.99,
    category: "Photography",
    quantityInStock: 28,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "trend-5",
    name: "Wireless Charger Pad",
    description: "Fast wireless charging station for multiple devices",
    price: 69.99,
    category: "Accessories",
    quantityInStock: 55,
    imageUrl: "https://images.unsplash.com/photo-1591290619762-d0e56e6d7b0b?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "trend-6",
    name: "Smart Light Bulbs",
    description: "WiFi enabled color changing LED bulbs - 4 pack",
    price: 79.99,
    category: "Smart Home",
    quantityInStock: 40,
    imageUrl: "https://images.unsplash.com/photo-1558089687-4d8f4c6d8f0a?w=400",
    createdAt: new Date().toISOString(),
  },
];

const mockFavoritesProducts: IProduct[] = [
  {
    id: "fav-1",
    name: "Bluetooth Speaker",
    description: "Waterproof portable speaker with 360° sound",
    price: 129.99,
    category: "Audio",
    quantityInStock: 33,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fav-2",
    name: "Fitness Tracker",
    description: "Activity tracker with sleep monitoring",
    price: 89.99,
    category: "Wearables",
    quantityInStock: 42,
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fav-3",
    name: "Action Camera 4K",
    description: "Ultra HD action camera with stabilization",
    price: 279.99,
    category: "Photography",
    quantityInStock: 16,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fav-4",
    name: "Gaming Mouse Pad XXL",
    description: "Extended gaming mouse pad with RGB edges",
    price: 39.99,
    category: "Accessories",
    quantityInStock: 70,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fav-5",
    name: "Backlit Keyboard Wired",
    description: "RGB backlit keyboard with macro keys",
    price: 119.99,
    category: "Electronics",
    quantityInStock: 24,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fav-6",
    name: "Monitor Arm Mount",
    description: "Adjustable monitor arm with cable management",
    price: 99.99,
    category: "Accessories",
    quantityInStock: 19,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    createdAt: new Date().toISOString(),
  },
];

export default function RecommendationsPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col overflow-hidden dark:bg-default-50/50">
      <ScrollShadow className="bg-default-100 dark:bg-default-50/50 grow h-[calc(100vh-65px)] overflow-x-hidden">
        <div className="p-8 flex flex-col gap-16">
          <div>
            <PageTitle title="Recommendations For You" />
            <p className="text-default-600 mt-2">
              Discover products curated just for you based on your preferences
              and browsing history
            </p>
          </div>

          {/* Seção: Recomendado para você */}
          <div>
            <div className="flex flex-row gap-4 items-center mb-6">
              <SparkleIcon size={32} weight="fill" className="text-primary-500" />
              <h2 className="text-2xl font-bold">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {mockRecommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Seção: Baseado no seu perfil */}
          <div>
            <div className="flex flex-row gap-4 items-center mb-6">
              <UserIcon size={32} weight="fill" className="text-primary-500" />
              <h2 className="text-2xl font-bold">Based On Your Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {mockPersonalizedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Seção: Trending agora */}
          <div>
            <div className="flex flex-row gap-4 items-center mb-6">
              <TrendUpIcon size={32} weight="fill" className="text-primary-500" />
              <h2 className="text-2xl font-bold">Trending Right Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {mockTrendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={() => navigate(`/products/${product.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Seção: Favoritos semelhantes */}
          <div>
            <div className="flex flex-row gap-4 items-center mb-6">
              <HeartIcon size={32} weight="fill" className="text-primary-500" />
              <h2 className="text-2xl font-bold">Similar To Your Favorites</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {mockFavoritesProducts.map((product) => (
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
