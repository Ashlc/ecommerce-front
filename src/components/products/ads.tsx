import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Ads = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const colorOptions = ["bg-primary-500", "bg-slate-600", "bg-pink-500"];

  const gradientOptions = [
    "from-primary-300 via-cyan-500 to-teal-800",
    "from-slate-400 via-slate-700 to-slate-900",
    "from-fuchsia-400 via-pink-600 to-rose-900",
  ];

  const advertisements = [
    { title: "Samsung Galaxy S21", price: 799.99, cta: "10% off" },
    { title: "Apple iPhone 13", price: 899.99, cta: "Free Shipping" },
    { title: "Google Pixel 6", price: 699.99, cta: "15% off" },
  ];

  const variants = {
    enter: { opacity: 0, y: 16 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  } as const;

  const ad = advertisements[currentIndex];

  return (
    <div
      className={`h-64 bg-radial-[at_50%_75%] ${gradientOptions[currentIndex]} transition-colors duration-500 rounded-xl flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex flex-col gap-4 items-center justify-center"
        >
          <p className="font-medium text-xl font-heading">{ad.title}</p>
          <p className="font-bold text-4xl">${ad.price}</p>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0}}
            transition={{ duration: 0.3 }}
            className={`text-lg px-4 py-1 ${colorOptions[currentIndex]} rounded-full`}
          >
            {ad.cta}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            aria-label={`Show ad ${index + 1}`}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white dark:bg-primary-900" : "bg-default-900/20"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Ads;
