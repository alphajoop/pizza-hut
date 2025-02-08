import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Pizza {
  id: number;
  name: string;
  image: string;
  description?: string;
}

const pizzaVariants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 10, scale: 0.9 }
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
};

function App() {
  const [selectedPizza, setSelectedPizza] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const pizzas: Pizza[] = [
    {
      id: 1,
      name: "Guardian Love Classic",
      image: "pizza-1.jpg",
      description: "Our signature classic pizza with premium toppings"
    },
    {
      id: 2,
      name: "Guardian Love Spéciale",
      image: "pizza-2.jpg",
      description: "A special blend of unique flavors"
    },
    {
      id: 3,
      name: "Guardian Love Végétarienne",
      image: "pizza-3.jpg",
      description: "Fresh vegetables and premium cheese"
    },
    {
      id: 4,
      name: "Guardian Love Suprême",
      image: "pizza-4.jpg",
      description: "The ultimate pizza experience"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <nav className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-16">
          <motion.img 
            src="logo.png" 
            alt="Pizza Logo" 
            className="w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
          <div className="flex gap-4 sm:gap-8 text-sm sm:text-base">
            {["Menu", "Order", "Online"].map((item) => (
              <motion.button
                key={item}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-3 py-2 hover:text-orange-500 hover:bg-white/80 rounded-full transition-all duration-300 font-medium"
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
            >
              Sign up
            </motion.button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base sm:text-lg font-medium text-orange-500 tracking-wide">
                Today's pizza day
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
                Guardian Love
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                {pizzas[selectedPizza].description || 
                  "Est sed sapien vestibulum ultrices massa. Aliquet quis faucibus vel ut mauris tellus sapien ligula amet."}
              </p>
            </motion.div>

            <div className="flex items-center gap-4 sm:gap-6">
              {pizzas.map((pizza, index) => (
                <motion.div
                  key={pizza.id}
                  className={`relative cursor-pointer rounded-full overflow-hidden
                    ${selectedPizza === index ? 'ring-4 ring-orange-500 ring-opacity-50' : 'hover:ring-2 hover:ring-orange-300'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovered(index)}
                  onHoverEnd={() => setIsHovered(null)}
                  onClick={() => setSelectedPizza(index)}
                >
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className={`object-cover transition-all duration-300
                      ${selectedPizza === index 
                        ? 'scale-110 w-20 h-20 sm:w-28 sm:h-28' 
                        : 'scale-100 w-16 h-16 sm:w-24 sm:h-24'}`}
                  />
                  {isHovered === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-md"
                    >
                      {pizza.name}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 z-50">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-full filter blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPizza}
                variants={pizzaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <motion.img
                  src={pizzas[selectedPizza].image}
                  alt={pizzas[selectedPizza].name}
                  className="w-full rounded-full shadow-2xl hover:shadow-orange-500/20 transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;