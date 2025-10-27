import { IProduct } from "@/interfaces";
export const products: IProduct[] = [
  {
    id: "p1",
    name: "Edifier Wireless Headphones W600BT",
    imageUrl:
      "https://edifier.com.br/media/catalog/product/cache/eba5f2f163b55172c022905d0dc2efd7/f/o/fone-bluetooth-edifier-w600bt-pret_1.jpg",
    category: "Electronics",
    quantityInStock: 50,
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 39.99,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "p2",
    name: "Sencor Sirius 2 Mini Black Bluetooth Speaker",
    imageUrl:
      "https://www.sencor.com/Sencor/media/static-media/6770caad-d0be-4d0d-b5f0-01bbc4c1c555@w600.webp",
    category: "Electronics",
    quantityInStock: 30,
    description: "High-quality portable speaker with deep bass.",
    price: 199.99,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "p3",
    name: "Smartwatch X-Watch Preto XSWUQPI001A",
    imageUrl:
      "https://images.tcdn.com.br/img/img_prod/1087072/relogio_smartwatch_x_watch_preto_com_alexa_1460_1_acdfd0a488affed854938b88c640670c.jpg",
    category: "Electronics",
    quantityInStock: 20,
    description: "Feature-rich smartwatch with health tracking.",
    price: 299.99,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "p4",
    name: "Elite Power Laptop Stand with Wireless Charger",
    imageUrl:
      "https://alogic.co/cdn/shop/files/Alogic_Elite_Power_Laptop_Stand_With_Wireless_Charger_Black_1.webp?v=1751890807",
    category: "Accessories",
    quantityInStock: 75,
    description: "Ergonomic aluminum laptop stand for better posture.",
    price: 49.99,
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "p5",
    name: "UGREEN Hub USB C 4 portas",
    imageUrl: "https://m.media-amazon.com/images/I/61KRLch6voL.jpg",
    category: "Accessories",
    quantityInStock: 100,
    description:
      "Hub USB C estendido: este hub adaptador fino USB-C preenche a lacuna entre USB-A e USB-C para conectar dispositivos mais antigos ao seu novo laptop USB C, expanda a única porta tipo C ou thunderbolt 3 em 4 portas USB 3.0 fêmeas padrão. 5 Gbps de alta velocidade: Hub USB C 4 portas suportam transferência de dados super rápida de até 5 Gbps - 10X mais rápido que USB 2.0. Você pode transferir fotos, vídeos e arquivos grandes em segundos, economizando seu tempo precioso.",
    price: 39.99,
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "p6",
    name: "Keychron Q1 QMK Custom Mechanical Keyboard",
    imageUrl:
      "https://keychron.ph/cdn/shop/products/Keychron-Q1-custom-mechanical-keyboard-green-version-red_3b2b5520-b8f2-42b4-a769-629cc2fb3084.jpg",
    category: "Electronics",
    quantityInStock: 40,
    description:
      "Keychron Q1 is a fully customized 75% layout mechanical keyboard packed with all premium features and unlimited possibilities. RGB backlit mechanical keyboard with blue switches.",
    price: 129.99,
    createdAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "p7",
    name: "Wireless Mouse M185 SWIFT GREY 2.4GHZ Logitech",
    imageUrl:
      "https://www.lojamundi.com.br/imagens/produtos/Wireless-Mouse-M185-SWIFT-GREY-2.4GHZ-Logitech.jpg",
    category: "Electronics",
    quantityInStock: 60,
    description: "Ergonomic wireless mouse with adjustable DPI.",
    price: 34.99,
    createdAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "p8",
    name: "Apple Phone Silicone Case",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT233?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=L0k2OWM4cGRyZzBTVVMwTnB2NEZmd2tuVHYzMERCZURia3c5SzJFOTlPalpQUlZGaitSQjJVekdLRWQ5QlBiN2pwVWYxQWxURXh2M0VKZnNpT1ZIYnc",
    category: "Accessories",
    quantityInStock: 150,
    description: "Durable silicone phone case with shock absorption.",
    price: 19.99,
    createdAt: "2024-01-18T10:00:00Z",
    cartedQuantity: 1,
  },
  {
    id: "p9",
    name: "Anker PowerCore Portable Charger",
    imageUrl:
      "https://i5.walmartimages.com/seo/Anker-PowerCore-Select-10000-Portable-Charger-Black-Ultra-Compact-High-Speed-Charging-Technology-Phone-Charger-for-iPhone-Samsung-and-More_621e9d8d-b4b2-4e15-b4cd-b439561ec4d0.c822834630c31c13416f2aacb33ddd5e.jpeg",
    category: "Electronics",
    quantityInStock: 80,
    description: "20000mAh power bank with fast charging support.",
    price: 44.99,
    createdAt: "2024-01-18T10:00:00Z",
    cartedQuantity: 3,
  },
  {
    id: "p10",
    name: 'Gamer Monitor PCFort T2703-200 27" 1ms 200hz',
    imageUrl:
      "https://images.tcdn.com.br/img/img_prod/740836/monitor_gamer_pcfort_t2703_200_27_1ms_200hz_led_full_hd_100_srgb_freesync_gsync_display_port_hdmi_dv_23949_1_f8f7555b22ce74e6784de4ac7661f352.jpg",
    category: "Electronics",
    quantityInStock: 25,
    description: "27-inch 4K monitor with HDR support.",
    price: 399.99,
    createdAt: "2024-01-19T10:00:00Z",
    cartedQuantity: 2,
  },
];

export const cart = products.filter(
  (product) => product.cartedQuantity && product.cartedQuantity > 0,
);
